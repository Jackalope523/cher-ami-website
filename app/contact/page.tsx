'use client';

import Link from 'next/link';
import Mail from '@/public/mail.svg';
import Check from '@/public/check-black.svg';
import X from '@/public/x-black.svg';
import Image from 'next/image';
import { useState } from 'react';

export default function AccountDeletionHelp() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/support-ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_from: email,
          email_subject: subject,
          email_body: content,
        }),
      });

      if (!res.ok) throw new Error('Failed to send email');

      setEmail('');
      setSubject('');
      setContent('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-[600px] mx-auto px-5 py-24">
      <div className="flex flex-col items-center">
        <h1 className="text-[2.5rem] text-[#242832] font-semibold mb-6">
          Contact us
        </h1>
        <p className="text-[1rem] text-[#242832] font-normal">
          Please leave us your questions or requests for Cher Ami.
        </p>
        <p className="text-[1rem] text-[#242832] font-normal mb-12">
          We will do our best to respond in a timely manner.
        </p>

        <form
          className="flex flex-col gap-8 mb-16 w-full"
          onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-[1rem] text-[#242832] font-semibold">
              Email*
            </label>
            <input
              id="email"
              name="email"
              required
              maxLength={320}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 border-2 border-[#DEDBD5] rounded-xl"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between">
              <label
                htmlFor="subject"
                className="text-[1rem] text-[#242832] font-semibold">
                Subject*
              </label>
              <p className="text-[1rem] text-[#242832] font-semibold">
                {subject.length}/70
              </p>
            </div>
            <input
              id="subject"
              name="subject"
              required
              maxLength={70}
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="px-4 py-3 border-2 border-[#DEDBD5] rounded-xl"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between">
              <label
                htmlFor="content"
                className="text-[1rem] text-[#242832] font-semibold">
                Describe your problem or request*
              </label>
              <p className="text-[1rem] text-[#242832] font-semibold">
                {content.length}/2000
              </p>
            </div>
            <textarea
              id="content"
              name="content"
              required
              maxLength={2000}
              placeholder="Write here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="py-3 focus:outline-none"
              rows={6}
            />
          </div>
          <button
            type="submit"
            className="bg-[#C15F3C] text-[#FFFFFF] font-medium rounded-[0.875rem] px-6 py-4">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
