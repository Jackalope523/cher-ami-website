import { NextRequest, NextResponse } from 'next/server';

const IS_DEV = process.env.NODE_ENV === 'development';
const OS_BASE = 'https://api.onesignal.com';

function osHeaders() {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Key ${process.env.ONE_SIGNAL_API_KEY}`,
  };
}

// The database is the record for the two preference flags and the server is its
// only writer. OneSignal still owns delivery, so the subscription itself — and
// the one-click unsubscribe that goes with it — stays there.
function serverHeaders() {
  return {
    'Content-Type': 'application/json',
    'Authorization': `key ${process.env.CHER_AMI_API_KEY}`,
  };
}

function serverUrl(externalId: string) {
  return `${process.env.CHER_AMI_API_URL}/website/preferences/${externalId}`;
}

async function setPreferences(
  externalId: string,
  preferences: { reminders: boolean; marketing: boolean }
) {
  return fetch(serverUrl(externalId), {
    method: 'PUT',
    headers: serverHeaders(),
    body: JSON.stringify({
      reminders: preferences.reminders,
      marketing: preferences.marketing,
    }),
  });
}

// Read the OneSignal subscription, which the server doesn't mirror. Failures are
// not fatal: the preference switches still work without it.
async function readSubscription(externalId: string) {
  const appId = process.env.ONE_SIGNAL_APP_ID;

  try {
    const res = await fetch(
      `${OS_BASE}/apps/${appId}/users/by/external_id/${externalId}`,
      { headers: osHeaders() }
    );

    if (!res.ok) return { subscriptionId: null, enabled: false };

    const data = await res.json();
    const emailSub = data.subscriptions?.find((s: { type: string }) => s.type === 'Email');

    return {
      subscriptionId: emailSub?.id ?? null,
      enabled: emailSub?.enabled ?? false,
    };
  } catch {
    return { subscriptionId: null, enabled: false };
  }
}

// GET /api/preferences?external_id={id}
export async function GET(request: NextRequest) {
  const externalId = request.nextUrl.searchParams.get('external_id');

  if (!externalId) {
    return NextResponse.json({ error: 'Missing external id' }, { status: 400 });
  }

  if (IS_DEV) {
    return NextResponse.json({
      subscriptionId: 'dev-subscription-id',
      email: 'd•••@thecherami.com',
      enabled: true,
      preferences: { reminders: true, marketing: false },
    });
  }

  const res = await fetch(serverUrl(externalId), { headers: serverHeaders() });

  if (!res.ok) {
    return NextResponse.json({ error: 'User not found' }, { status: res.status });
  }

  const data = await res.json();
  const subscription = await readSubscription(externalId);

  return NextResponse.json({
    subscriptionId: subscription.subscriptionId,
    // Masked by the server — the full address is never sent to the browser.
    email: data.maskedEmail ?? null,
    enabled: subscription.enabled,
    preferences: {
      reminders: data.reminders,
      marketing: data.marketing,
    },
  });
}

// PATCH /api/preferences — update the preference flags
export async function PATCH(request: NextRequest) {
  const { externalId, preferences } = await request.json();

  if (!externalId) {
    return NextResponse.json({ error: 'Missing external id' }, { status: 400 });
  }

  if (IS_DEV) {
    console.log('[dev] PATCH preferences for', externalId, preferences);
    return NextResponse.json({ success: true });
  }

  const res = await setPreferences(externalId, preferences);

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to update preferences' }, { status: res.status });
  }

  return NextResponse.json({ success: true });
}

// DELETE /api/preferences — unsubscribe from everything
export async function DELETE(request: NextRequest) {
  const { externalId, subscriptionId, notificationId, unsubscribeToken } = await request.json();

  if (!subscriptionId && !notificationId) {
    return NextResponse.json({ error: 'Missing subscription id' }, { status: 400 });
  }

  if (IS_DEV) {
    console.log('[dev] DELETE (unsubscribe) subscription', subscriptionId);
    return NextResponse.json({ success: true });
  }

  const appId = process.env.ONE_SIGNAL_APP_ID;

  // The token route is the one-click unsubscribe from an email; without it, fall
  // back to disabling the subscription directly.
  const res =
    notificationId && unsubscribeToken
      ? await fetch(
          `${OS_BASE}/apps/${appId}/notifications/${notificationId}/unsubscribe?token=${unsubscribeToken}`,
          { method: 'POST' }
        )
      : await fetch(`${OS_BASE}/apps/${appId}/subscriptions/${subscriptionId}`, {
          method: 'PATCH',
          headers: osHeaders(),
          body: JSON.stringify({ subscription: { enabled: false } }),
        });

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to unsubscribe' }, { status: res.status });
  }

  // Mirror into the database, so the app agrees and no later sync turns the
  // flags back on. A failure here is worth surfacing: silently disagreeing is
  // how someone who opted out ends up back on the list.
  if (externalId) {
    const mirrored = await setPreferences(externalId, {
      reminders: false,
      marketing: false,
    });

    if (!mirrored.ok) {
      return NextResponse.json(
        { error: 'Unsubscribed, but preferences did not save. Please try again.' },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ success: true });
}

// POST /api/preferences — resubscribe
export async function POST(request: NextRequest) {
  const { externalId, subscriptionId } = await request.json();

  if (!subscriptionId) {
    return NextResponse.json({ error: 'Missing subscription id' }, { status: 400 });
  }

  if (IS_DEV) {
    console.log('[dev] POST (resubscribe) subscription', subscriptionId);
    return NextResponse.json({ success: true });
  }

  const appId = process.env.ONE_SIGNAL_APP_ID;
  const res = await fetch(`${OS_BASE}/apps/${appId}/subscriptions/${subscriptionId}`, {
    method: 'PATCH',
    headers: osHeaders(),
    body: JSON.stringify({ subscription: { enabled: true } }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to resubscribe' }, { status: res.status });
  }

  if (externalId) {
    await setPreferences(externalId, { reminders: true, marketing: true });
  }

  return NextResponse.json({ success: true });
}
