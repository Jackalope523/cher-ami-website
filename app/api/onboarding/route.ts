import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const CHER_AMI_API_URL = process.env.CHER_AMI_API_URL;
  const CHER_AMI_API_KEY = process.env.CHER_AMI_API_KEY;

  const formData = await request.formData();

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

  const data = await res.json();
  return NextResponse.json(data);
}
