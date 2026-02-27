'use client';

import Link from 'next/link';
import Mail from '@/public/mail.svg';
import Check from '@/public/check-black.svg';
import X from '@/public/x-black.svg';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export type EmailPreferences = {

}

export default function PreferencesClient() {
  const searchParams = useSearchParams();

  const [notificationId, setNotificationId] = useState('');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  const [reason, setReason] = useState('none');
  const [preferences, setPreferences] = useState<Record<string, '1' | '0'>>();

  const [subscribed, setSubscribed] = useState(true);

  useEffect(() => {
    setNotificationId(searchParams.get('notification_id') || '');
    setEmail(searchParams.get('email') || '');
    setToken(searchParams.get('token') || '');
    
  }, [searchParams]);
  
  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/preferences', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          notification_id: notificationId,
          email,
          token,
          preferences
        }),
      });

      if (!res.ok) throw new Error('Failed to send unsubscribe');

      setSubscribed(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          preferences
        }),
      });

      if (!res.ok) throw new Error('Failed to send resubscribe');

      setSubscribed(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-[600px] mx-auto px-5 py-24">
      {subscribed ? (
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-[2.5rem] text-[#242832] font-semibold text-center">
            Unsubscribe from email notifications?
          </h1>
          <p className="text-[1rem] text-[#242832] font-normal">
            If you wish to stop receiving emails from us, you can easily unsubscribe by clicking the 'Unsubscribe All' button below.
            We respect your preferences and will ensure that you no longer receive our newsletters. We will still send you necessary emails related to your account, billing, and support.
          </p>
  
          <form
            className="flex flex-col gap-4 mb-16 w-full"
            onSubmit={handleUnsubscribe}>
            <p className="text-[1rem] text-[#242832] font-semibold">
              Please select a reason for unsubscribing
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-1.5">
                <input
                  type="radio"
                  name="reason"
                  id="not interested"
                  value="not interested"
                  checked={reason === 'not interested'}
                  onChange={(e) => setReason(e.target.value)}
                />
                <label
                  htmlFor="not interested"
                  className="text-[1rem] text-[#242832]">
                    I don't want to receive these emails anymore.
                </label>
              </div>
              <div className="flex flex-row gap-1.5">
                <input
                  type="radio"
                  name="reason"
                  id="too many"
                  value="too many"
                  checked={reason === 'too many'}
                  onChange={(e) => setReason(e.target.value)}
                />
                <label
                  htmlFor="too many"
                  className="text-[1rem] text-[#242832]">
                    Too many emails cluttering my inbox.
                </label>
              </div>
              <div className="flex flex-row gap-1.5">
                <input
                  type="radio"
                  name="reason"
                  id="other"
                  value="other"
                  checked={reason === 'other'}
                  onChange={(e) => setReason(e.target.value)}
                />
                <label
                  htmlFor="other"
                  className="text-[1rem] text-[#242832]">
                    Other.
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="bg-[#C15F3C] text-[#FFFFFF] font-medium rounded-[0.875rem]    
                          px-6 py-4 mt-8">
              Unsubscribe from all
            </button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-[2.5rem] text-[#242832] font-semibold text-center">
            You've successfully unsubscribed!
          </h1>
          <p className="text-[1rem] text-[#242832] font-normal">
            Didn't mean to unsubscribe?
          </p>
  
          <form
            className="flex flex-col gap-8 mb-16 w-full"
            onSubmit={handleSubscribe}>
            <button
              type="submit"
              className="bg-[#C15F3C] text-[#FFFFFF] font-medium rounded-[0.875rem] px-6 py-4">
              Resubscribe
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
