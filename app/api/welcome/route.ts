import { NextRequest, NextResponse } from 'next/server';

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

  return NextResponse.json({});
}