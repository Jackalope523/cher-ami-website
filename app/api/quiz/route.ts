import { QuizAnswers } from '@/app/quiz/QuizShell';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const ONE_SIGNAL_API_KEY = process.env.ONE_SIGNAL_API_KEY;
  const ONE_SIGNAL_APP_ID = process.env.ONE_SIGNAL_APP_ID;

  const answers: QuizAnswers = await request.json();
  
  const response = await fetch(`https://api.onesignal.com/apps/${ONE_SIGNAL_APP_ID}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `key ${ONE_SIGNAL_API_KEY}`,
    },
    body: JSON.stringify({
      app_id: ONE_SIGNAL_APP_ID,
      email_from_address: "hello@thecherami.com",
      email_to: ["hello@thecherami.com"],
      email_subject: 'New Quiz Result',
      email_body: `<p>${JSON.stringify(answers)}</p>`,
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