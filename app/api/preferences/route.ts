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
  const email = request.nextUrl.searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Missing email' }, { status: 400 });
  }

  if (IS_DEV) {
    return NextResponse.json({
      subscriptionId: 'dev-subscription-id',
      enabled: true,
      preferences: {
        issue_reminders: true,
        post_reminders: true,
        marketing: false,
      },
    });
  }

  const appId = process.env.ONE_SIGNAL_APP_ID;
  const res = await fetch(
    `${OS_BASE}/apps/${appId}/users/by/email/${encodeURIComponent(email)}`,
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
    enabled: emailSub?.enabled ?? false,
    preferences: {
      issue_reminders: tags.pref_issue_reminders !== '0',
      post_reminders: tags.pref_post_reminders !== '0',
      marketing: tags.pref_marketing !== '0',
    },
  });
}

// PATCH /api/preferences — update preference tags
export async function PATCH(request: NextRequest) {
  const { email, preferences } = await request.json();

  if (!email) {
    return NextResponse.json({ error: 'Missing email' }, { status: 400 });
  }

  if (IS_DEV) {
    console.log('[dev] PATCH preferences for', email, preferences);
    return NextResponse.json({ success: true });
  }

  const appId = process.env.ONE_SIGNAL_APP_ID;
  const res = await fetch(
    `${OS_BASE}/apps/${appId}/users/by/email/${encodeURIComponent(email)}`,
    {
      method: 'PATCH',
      headers: osHeaders(),
      body: JSON.stringify({
        properties: {
          tags: {
            pref_issue_reminders: preferences.issue_reminders ? '1' : '0',
            pref_post_reminders: preferences.post_reminders ? '1' : '0',
            pref_marketing: preferences.marketing ? '1' : '0',
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
  const { subscriptionId, email, reason } = await request.json();

  if (!subscriptionId) {
    return NextResponse.json({ error: 'Missing subscription ID' }, { status: 400 });
  }

  if (IS_DEV) {
    console.log('[dev] DELETE (unsubscribe) subscription', subscriptionId, { email, reason });
    return NextResponse.json({ success: true });
  }

  const appId = process.env.ONE_SIGNAL_APP_ID;

  const res = await fetch(
    `${OS_BASE}/apps/${appId}/subscriptions/${subscriptionId}`,
    {
      method: 'PATCH',
      headers: osHeaders(),
      body: JSON.stringify({ subscription: { enabled: false } }),
    }
  );

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to unsubscribe' }, { status: res.status });
  }

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

  return NextResponse.json({ success: true });
}

// POST /api/preferences — resubscribe (re-enable subscription)
export async function POST(request: NextRequest) {
  const { subscriptionId } = await request.json();

  if (!subscriptionId) {
    return NextResponse.json({ error: 'Missing subscription ID' }, { status: 400 });
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
      headers: osHeaders(),
      body: JSON.stringify({ subscription: { enabled: true } }),
    }
  );

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to resubscribe' }, { status: res.status });
  }

  return NextResponse.json({ success: true });
}
