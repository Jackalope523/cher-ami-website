import { NextRequest, NextResponse } from 'next/server';

type EventFields = {
  actionSource: string;
  eventId: string;
  eventName: string;
  eventTime: number;
  clientIP: string;
  clientUA: string;
}

export async function POST(request: NextRequest) {
  const PINTEREST_AD_ID = process.env.PINTEREST_AD_ID;
  const PINTEREST_API_KEY = process.env.PINTEREST_API_KEY;

  const fields: EventFields = await request.json();

  const data = {
    "data": [
      {
        "action_source": fields.actionSource,
        "event_id": fields.eventId,
        "event_name": fields.eventName,
        "event_time": fields.eventTime,
        "event_source_url": "thecherami.com",
        "user_data": {
          "client_ip_address": fields.clientIP,
          "client_user_agent": fields.clientUA,
        },
        "custom_data": {}
      }
    ]
  };

  await fetch(`https://api.pinterest.com/v5/ad_accounts/${PINTEREST_AD_ID}/events?test=true`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${PINTEREST_API_KEY}`,
      },
      body: JSON.stringify(data),
  });

  return;
}