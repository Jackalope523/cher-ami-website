import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const ONE_SIGNAL_API_KEY = process.env.ONE_SIGNAL_API_KEY;
  const ONE_SIGNAL_APP_ID = process.env.ONE_SIGNAL_APP_ID;

  const json_body = await request.json();

  const {
    email_from,
    email_subject,
    email_body,
  } = json_body;

  const response = await fetch("https://api.onesignal.com/notifications?c=email", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `key ${ONE_SIGNAL_API_KEY}`,
    },
    body: JSON.stringify({
      app_id: ONE_SIGNAL_APP_ID,
      email_from_address: "help@thecherami.com",
      // email_from_name: "Support Tickets",
      email_to: ["help@thecherami.com"],      
      email_reply_to_address: `${email_from}`,
      email_subject: `${email_subject}`,
      email_body: `<p>${email_body}</p>`,
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