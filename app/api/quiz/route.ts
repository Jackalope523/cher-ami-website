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
    },
    body: JSON.stringify({
      properties: {
        tags: {
          'q_name': answers.name,
          'q_reason': answers.reason,
          'q_receiver': answers.receiver,
          'q_circle': answers.who,
        }
      },
      subscriptions: [
        {
          type: 'Email',
          token: answers.email,
          enabled: true,
        }
      ]
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