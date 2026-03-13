'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Toggle from '@/components/Toggle';

type Preferences = {
  reminders: boolean;
  marketing: boolean;
};

type State =
  | { type: 'loading' }
  | { type: 'error' }
  | { type: 'ready'; subscriptionId: string; email: string; enabled: boolean; preferences: Preferences }
  | { type: 'unsubscribed'; subscriptionId: string; email: string; preferences: Preferences };

const UNSUBSCRIBE_REASONS = [
  "Too many emails",
  "Not relevant to me",
  "I stopped using the app",
  "I prefer app notifications",
  "Other",
];

const PREF_LABELS: { key: keyof Preferences; label: string; description: string }[] = [
  {
    key: 'reminders',
    label: 'Issue & Post Reminders',
    description: 'Reminders for issues and to add photos.',
  },
  {
    key: 'marketing',
    label: 'Marketing & Communications',
    description: 'Product updates, tips, and special offers from Cher Ami.',
  },
];

export default function PreferencesClient() {
  const searchParams = useSearchParams();
  const externalId = searchParams.get('external_id') || '';
  const notificationId = searchParams.get("notification_id");
  const unsubscribeToken = searchParams.get("token");

  const [state, setState] = useState<State>({ type: 'loading' });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [unsubscribing, setUnsubscribing] = useState(false);
  const [resubscribing, setResubscribing] = useState(false);
  const [unsubscribeReason, setUnsubscribeReason] = useState<string | null>(null);

  useEffect(() => {
    if (!externalId) {
      setState({ type: 'error' });
      return;
    }

    fetch(`/api/preferences?external_id=${encodeURIComponent(externalId)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setState({ type: 'error' });
          return;
        }
        const base = {
          email: data.email,
          subscriptionId: data.subscriptionId,
          preferences: data.preferences as Preferences,
        };
        if (!data.enabled) {
          setState({ type: 'unsubscribed', ...base });
        } else {
          setState({ type: 'ready', enabled: true, ...base });
        }
      })
      .catch(() => setState({ type: 'error' }));
  }, [externalId]);

  const handleSave = async () => {
    if (state.type !== 'ready') return;
    setSaving(true);
    try {
      const res = await fetch('/api/preferences', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ externalId, preferences: state.preferences }),
      });
      if (!res.ok) throw new Error();
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      // silently fail — could add error toast here
    } finally {
      setSaving(false);
    }
  };

  const handleUnsubscribeAll = async () => {
    if (state.type !== 'ready') return;
    setUnsubscribing(true);
    try {
      const res = await fetch('/api/preferences', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subscriptionId: state.subscriptionId,
          notificationId,
          unsubscribeToken,
          email: state.email,
          reason: unsubscribeReason,
        }),
      });
      if (!res.ok) throw new Error();
      setState({ type: 'unsubscribed', subscriptionId: state.subscriptionId, email: state.email, preferences: state.preferences });
    } catch {
      // silently fail
    } finally {
      setUnsubscribing(false);
    }
  };

  const handleResubscribe = async () => {
    if (state.type !== 'unsubscribed') return;
    setResubscribing(true);
    try {
      const res = await fetch('/api/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: state.email }),
      });
      if (!res.ok) throw new Error();
      setState({ type: 'ready', subscriptionId: state.subscriptionId, email: state.email, enabled: true, preferences: state.preferences });
    } catch {
      // silently fail
    } finally {
      setResubscribing(false);
    }
  };

  const setPreference = (key: keyof Preferences, value: boolean) => {
    if (state.type !== 'ready') return;
    setState({ ...state, preferences: { ...state.preferences, [key]: value } });
    setSaved(false);
  };

  if (state.type === 'loading') {
    return (
      <div className="max-w-[560px] mx-auto px-5 py-24 flex justify-center">
        <div className="w-6 h-6 border-2 border-[#C15F3C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (state.type === 'error') {
    return (
      <div className="max-w-[560px] mx-auto px-5 py-24 text-center">
        <p className="text-[#242832] text-base">
          Something went wrong. Please try again using the link in your email.
        </p>
      </div>
    );
  }

  if (state.type === 'unsubscribed') {
    return (
      <div className="max-w-[560px] mx-auto px-5 py-24 flex flex-col items-center gap-5 text-center">
        <h1 className="text-[2rem] font-semibold text-[#242832]">
          You&apos;ve been unsubscribed.
        </h1>
        <p className="text-[#242832] text-base">
          You&apos;ll no longer receive emails from Cher Ami.
        </p>
        <p className="text-[#5A5A5A] text-sm">
          Unsubscribed by mistake?
        </p>
        <button
          onClick={handleResubscribe}
          disabled={resubscribing}
          className="mt-2 px-6 py-3 bg-[#C15F3C] text-white font-medium rounded-[0.875rem] disabled:opacity-60">
          {resubscribing ? 'Resubscribing…' : 'Resubscribe'}
        </button>
      </div>
    );
  }

  // state.type === 'ready'
  return (
    <div className="max-w-[560px] mx-auto px-5 py-24">
      <div className="mb-8">
        <h1 className="text-[2rem] font-semibold text-[#242832] mb-2">
          Email Preferences
        </h1>
        <p className="text-[#5A5A5A] text-sm">
          Managing preferences for <span className="font-medium text-[#242832]">{state.email}</span>
        </p>
      </div>

      <div className="flex flex-col divide-y divide-[#EBEBEB]">
        {PREF_LABELS.map(({ key, label, description }) => (
          <div key={key} className="flex items-start justify-between gap-4 py-5">
            <div className="flex flex-col gap-0.5">
              <label
                htmlFor={key}
                className="text-[#242832] font-medium text-base cursor-pointer">
                {label}
              </label>
              <p className="text-[#5A5A5A] text-sm">{description}</p>
            </div>
            <Toggle
              id={key}
              checked={state.preferences[key]}
              onChange={(v) => setPreference(key, v)}
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="mt-6 w-full px-6 py-4 bg-[#242832] text-white font-medium rounded-[0.875rem] disabled:opacity-60">
        {saving ? 'Saving…' : saved ? 'Saved!' : 'Save Preferences'}
      </button>

      <div className="mt-10 pt-8 border-t border-[#EBEBEB]">
        <p className="text-[#242832] font-medium text-sm mb-1">Unsubscribe from all</p>
        <p className="text-[#5A5A5A] text-sm mb-4">
          Stop receiving all emails from Cher Ami. We&apos;ll still send essential account and billing emails.
        </p>
        <p className="text-[#5A5A5A] text-xs mb-2">Reason (optional)</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {UNSUBSCRIBE_REASONS.map((reason) => (
            <button
              key={reason}
              type="button"
              onClick={() => setUnsubscribeReason(unsubscribeReason === reason ? null : reason)}
              className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                unsubscribeReason === reason
                  ? 'bg-[#242832] text-white border-[#242832]'
                  : 'text-[#5A5A5A] border-[#D9D9D9] hover:border-[#242832] hover:text-[#242832]'
              }`}>
              {reason}
            </button>
          ))}
        </div>
        <button
          onClick={handleUnsubscribeAll}
          disabled={unsubscribing}
          className="px-5 py-2.5 text-sm font-medium text-[#C15F3C] border border-[#C15F3C] rounded-[0.875rem] disabled:opacity-60 hover:bg-[#C15F3C] hover:text-white transition-colors">
          {unsubscribing ? 'Unsubscribing…' : 'Unsubscribe from all'}
        </button>
      </div>
    </div>
  );
}
