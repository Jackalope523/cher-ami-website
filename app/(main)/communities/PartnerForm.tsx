'use client';

import posthog from 'posthog-js';
import Link from 'next/link';
import { useState } from 'react';

export default function PartnerForm() {
  const [name, setName] = useState('');
  const [community, setCommunity] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);

    try {
      const res = await fetch('/api/support-ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_from: email,
          email_subject: `Community partnership: ${community}`,
          email_body:
            `Name: ${name}\n` +
            `Role: ${role || 'Not provided'}\n` +
            `Community: ${community}\n\n` +
            `${message || 'No message provided.'}`,
        }),
      });

      if (!res.ok) throw new Error('Failed to send partner inquiry');

      posthog.capture('community_partner_form_submitted', { community, role });
      setSubmitted(true);
    } catch (err) {
      posthog.captureException(err);
      console.error(err);
      setError(true);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col gap-4 w-full max-w-[600px] p-8 bg-[#F4F1EA] rounded-[32px] items-center text-center">
        <h3 className="text-[1.75rem] text-[#C15F3C] font-semibold">
          You&apos;re on the list
        </h3>
        <p className="text-[1rem] text-[#242832] font-normal">
          Thank you, {name.split(' ')[0] || 'friend'}. A real human will get back
          to you, usually within a day, with your partner kit.
        </p>
        <p className="text-[1rem] text-[#242832] font-normal">
          Want a head start? Print the family flyer and it can be on your notice
          board today.
        </p>
        <Link
          href="/communities/flyer"
          className="py-3 px-5 bg-[#C15F3C] hover:bg-[#b05637] active:bg-[#b05637] rounded-[12px] shadow-md">
          <p className="text-[1rem] text-white font-medium text-center">
            Print the family flyer
          </p>
        </Link>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-6 w-full max-w-[600px]"
      onSubmit={handleSubmit}>
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex flex-col gap-1.5 flex-1">
          <label
            htmlFor="partner-name"
            className="text-[1rem] text-[#242832] font-semibold">
            Your name*
          </label>
          <input
            id="partner-name"
            name="name"
            required
            maxLength={100}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-3 border-2 border-[#DEDBD5] rounded-xl w-full"
          />
        </div>
        <div className="flex flex-col gap-1.5 flex-1">
          <label
            htmlFor="partner-role"
            className="text-[1rem] text-[#242832] font-semibold">
            Your role
          </label>
          <input
            id="partner-role"
            name="role"
            maxLength={100}
            type="text"
            placeholder="Activities Director, ED..."
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="px-4 py-3 border-2 border-[#DEDBD5] rounded-xl w-full"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="partner-community"
          className="text-[1rem] text-[#242832] font-semibold">
          Community name*
        </label>
        <input
          id="partner-community"
          name="community"
          required
          maxLength={200}
          type="text"
          value={community}
          onChange={(e) => setCommunity(e.target.value)}
          className="px-4 py-3 border-2 border-[#DEDBD5] rounded-xl"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="partner-email"
          className="text-[1rem] text-[#242832] font-semibold">
          Work email*
        </label>
        <input
          id="partner-email"
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
        <label
          htmlFor="partner-message"
          className="text-[1rem] text-[#242832] font-semibold">
          Anything we should know?
        </label>
        <textarea
          id="partner-message"
          name="message"
          maxLength={2000}
          placeholder="Number of residents, questions, whether you'd like a printed sample..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="px-4 py-3 border-2 border-[#DEDBD5] rounded-xl"
          rows={4}
        />
      </div>
      <button
        type="submit"
        className="bg-[#C15F3C] hover:bg-[#b05637] active:bg-[#b05637] text-[#FFFFFF] font-medium rounded-[0.875rem] px-6 py-4 cursor-pointer">
        Get the partner kit
      </button>
      {error && (
        <p className="text-[0.9rem] text-[#B3261E] text-center">
          Something went wrong sending your request. Please try again, or email
          us directly at partners@thecherami.com.
        </p>
      )}
      <p className="text-[0.75rem] text-[#676D7B] text-center">
        Prefer email? Write to partners@thecherami.com. We&apos;ll only use your
        details to set up your community.
      </p>
    </form>
  );
}
