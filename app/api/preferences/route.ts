import { NextRequest, NextResponse } from 'next/server';

const IS_DEV = process.env.NODE_ENV === 'development';
const OS_BASE = 'https://api.onesignal.com';

function osHeaders() {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Key ${process.env.ONE_SIGNAL_API_KEY}`,
  };
}

// GET /api/preferences?email={email}
export async function GET(request: NextRequest) {
  const externalId = request.nextUrl.searchParams.get('external_id');

  if (!externalId) {
    return NextResponse.json({ error: 'Missing external id' }, { status: 400 });
  }

  if (IS_DEV) {
    return NextResponse.json({
      subscriptionId: 'dev-subscription-id',
      email: 'dev@thecherami.com',
      enabled: true,
      preferences: {
        reminders: true,
        marketing: false,
      },
    });
  }

  const appId = process.env.ONE_SIGNAL_APP_ID;
  const res = await fetch(
    `${OS_BASE}/apps/${appId}/users/by/external_id/${externalId}`,
    { headers: osHeaders() }
  );

  if (!res.ok) {
    return NextResponse.json({ error: 'User not found' }, { status: res.status });
  }

  const data = await res.json();
  const tags = data.properties?.tags ?? {};
  const emailSub = data.subscriptions?.find((s: { type: string }) => s.type === 'Email');

  return NextResponse.json({
    subscriptionId: emailSub?.id ?? null,
    email: emailSub?.token ?? null,
    enabled: emailSub?.enabled ?? false,
    preferences: {
      reminders: tags.email_reminders !== '0',
      marketing: tags.email_marketing !== '0',
    },
  });
}

// PATCH /api/preferences — update preference tags
export async function PATCH(request: NextRequest) {
  const { externalId, preferences } = await request.json();

  if (!externalId) {
    return NextResponse.json({ error: 'Missing external id' }, { status: 400 });
  }

  if (IS_DEV) {
    console.log('[dev] PATCH preferences for', externalId, preferences);
    return NextResponse.json({ success: true });
  }

  const appId = process.env.ONE_SIGNAL_APP_ID;
  const res = await fetch(
    `${OS_BASE}/apps/${appId}/users/by/external_id/${externalId}`,
    {
      method: 'PATCH',
      headers: osHeaders(),
      body: JSON.stringify({
        properties: {
          tags: {
            email_reminders: preferences.reminders ? '1' : '0',
            email_marketing: preferences.marketing ? '1' : '0',
          },
        },
      }),
    }
  );

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to update preferences' }, { status: res.status });
  }

  return NextResponse.json({ success: true });
}

// DELETE /api/preferences — unsubscribe from all (disable subscription)
export async function DELETE(request: NextRequest) {
  const { subscriptionId, notificationId, unsubscribeToken, email, reason } = await request.json();

  if (!subscriptionId) {
    return NextResponse.json({ error: 'Missing subscription id' }, { status: 400 });
  }

  if (IS_DEV) {
    console.log('[dev] DELETE (unsubscribe) subscription', subscriptionId, { reason });
    return NextResponse.json({ success: true });
  }

  const appId = process.env.ONE_SIGNAL_APP_ID;

  var res;

  if (notificationId && unsubscribeToken) {
    res = await fetch(
      `${OS_BASE}/apps/${appId}/notifications/${notificationId}/unsubscribe?token=${unsubscribeToken}`,
      {
        method: 'POST',
      }
    );
  } else {
    res = await fetch(
      `${OS_BASE}/apps/${appId}/notifications/${notificationId}/unsubscribe?token=${unsubscribeToken}`,
      {
        method: 'POST',
      }
    );
  }

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to unsubscribe' }, { status: res.status });
  }

  if (reason) {
    // Fire feedback email — non-blocking, failure is silent
    fetch(`${OS_BASE}/notifications?c=email`, {
      method: 'POST',
      headers: osHeaders(),
      body: JSON.stringify({
        app_id: appId,
        email_from_address: 'help@thecherami.com',
        email_to: ['help@thecherami.com'],
        email_subject: 'Unsubscribe: Email Preferences',
        email_body: `
          <p>From: ${email ?? 'Unknown'}</p><br />
          <p>Time: ${new Date().toUTCString()}</p><br />
          <p>Reason: ${reason ?? 'Not provided'}</p>
        `,
      }),
    }).catch(() => {});
  }

  return NextResponse.json({ success: true });
}

// POST /api/preferences — resubscribe (re-enable subscription)
export async function POST(request: NextRequest) {
  const { subscriptionId } = await request.json();

  if (!subscriptionId) {
    return NextResponse.json({ error: 'Missing subscription id' }, { status: 400 });
  }

  if (IS_DEV) {
    console.log('[dev] POST (resubscribe) subscription', subscriptionId);
    return NextResponse.json({ success: true });
  }

  const appId = process.env.ONE_SIGNAL_APP_ID;
  const res = await fetch(
    `${OS_BASE}/apps/${appId}/subscriptions/${subscriptionId}`,
    {
      method: 'PATCH',
      body: JSON.stringify({ subscription: { enabled: true } }),
    }
  );

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to resubscribe' }, { status: res.status });
  }

  return NextResponse.json({ success: true });
}
