import { NextRequest, NextResponse } from 'next/server';
import { getPostHogClient } from '@/lib/posthog-server';

export async function POST(request: NextRequest) {
  const ONE_SIGNAL_API_KEY = process.env.ONE_SIGNAL_API_KEY;
  const ONE_SIGNAL_APP_ID = process.env.ONE_SIGNAL_APP_ID;
  const CHER_AMI_API_URL = process.env.CHER_AMI_API_URL;
  const CHER_AMI_API_KEY = process.env.CHER_AMI_API_KEY;

  const { email, military } = await request.json();

  await fetch(`${CHER_AMI_API_URL}/website/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `key ${CHER_AMI_API_KEY}`,
      },
      body: JSON.stringify({ email }),
  });

  const posthog = getPostHogClient();
  posthog.identify({ distinctId: email, properties: { email } });
  posthog.capture({
    distinctId: email,
    event: 'welcome_email_submitted',
    properties: { military: !!military },
  });
  await posthog.shutdown();

  return NextResponse.json({});
}