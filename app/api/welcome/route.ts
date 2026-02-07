import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const ONE_SIGNAL_API_KEY = process.env.ONE_SIGNAL_API_KEY;
  const ONE_SIGNAL_APP_ID = process.env.ONE_SIGNAL_APP_ID;

  const { email, military } = await request.json();

  var tags: any = {
    'entry': 'web',
  }

  if (military) {
    tags['military'] = '1';
  }
  
  const response = await fetch("https://api.onesignal.com/notifications?c=email", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `key ${ONE_SIGNAL_API_KEY}`,
    },
    body: JSON.stringify({
      app_id: ONE_SIGNAL_APP_ID,
      email_to: [email],
      email_subject: 'Welcome!',
      template_id: '21bd2cb8-022e-4151-be65-ea80356ae8e0' // welcome-v1
    }),
  });

  const data = await response.json();

    if (!response.ok) {
  console.log("FAILURE!!!!");
  console.log("HTTP status:", response.status);
  console.log("OneSignal errors:", data.errors);
    throw new Error(`Response status: ${response.status}`);
  }

  return NextResponse.json(data);
}