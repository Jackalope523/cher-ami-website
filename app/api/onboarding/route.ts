import { NextRequest, NextResponse } from 'next/server';
import { getPostHogClient } from '@/lib/posthog-server';

export async function POST(request: NextRequest) {
  const CHER_AMI_API_URL = process.env.CHER_AMI_API_URL;
  const CHER_AMI_API_KEY = process.env.CHER_AMI_API_KEY;

  const formData = await request.formData();
  const email = formData.get('Email') as string | null;
  const firstName = formData.get('FirstName') as string | null;
  const lastName = formData.get('LastName') as string | null;
  const recipientName = formData.get('RecipientName') as string | null;
  const hasImage = formData.has('Image');

  const res = await fetch(`${CHER_AMI_API_URL}/website/onboarding`, {
    method: 'POST',
    headers: {
      'Authorization': `key ${CHER_AMI_API_KEY}`,
    },
    body: formData,
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to onboard' }, { status: res.status });
  }

  const posthog = getPostHogClient();
  const distinctId = email ?? 'anonymous';
  if (email) {
    posthog.identify({ distinctId: email, properties: { email, first_name: firstName, last_name: lastName } });
  }
  posthog.capture({
    distinctId,
    event: 'onboarding_submitted',
    properties: { has_image: hasImage, has_recipient_name: !!recipientName },
  });
  await posthog.shutdown();

  const data = await res.json();
  return NextResponse.json(data);
}
