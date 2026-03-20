'use client';

import { useState, useEffect } from 'react';
import { useAddRecipientMutation, useGetPaymentMethodQuery, useConfigQuery, useSetupIntentMutation, useGetSelfQuery } from '@/lib/hooks';
import { useToast, ToastType } from '@/components/app/ToastProvider';
import { getStripe } from '@/lib/stripe';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useQueryClient } from '@tanstack/react-query';

interface ShipItStepProps {
  recipientName: string;
  onNext: () => void;
}

function PaymentForm({ onPaymentConfirmed }: { onPaymentConfirmed: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const showToast = useToast();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  async function handleConfirm() {
    if (!stripe || !elements) return;

    setLoading(true);
    const { error } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/app/getting-started`,
      },
      redirect: 'if_required',
    });

    if (error) {
      showToast(error.message || 'Payment setup failed.', ToastType.Error);
      setLoading(false);
    } else {
      await queryClient.invalidateQueries({ queryKey: ['PaymentMethod'] });
      onPaymentConfirmed();
    }
  }

  return (
    <div className="mt-6">
      <div className="flex items-center gap-2 mb-4">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C15F3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" />
        </svg>
        <p className="text-sm font-semibold text-[#242832]">Payment method</p>
      </div>
      <p className="text-sm text-[#868581] mb-4">$12.99/month per recipient. Free shipping. Cancel anytime.</p>
      <PaymentElement />
      <button
        onClick={handleConfirm}
        disabled={!stripe || loading}
        className={`w-full py-4 rounded-[14px] border-2 text-base font-medium transition-colors mt-4 ${
          !stripe || loading
            ? 'bg-[#ECEDEF] border-[#ECEDEF] text-[#A8ABB3]'
            : 'bg-[#C15F3C] border-[#C15F3C] text-white hover:bg-[#a8512f]'
        }`}>
        {loading ? 'Processing...' : 'Start Subscription'}
      </button>
    </div>
  );
}

export default function ShipItStep({ recipientName, onNext }: ShipItStepProps) {
  const showToast = useToast();
  const selfQuery = useGetSelfQuery();
  const paymentQuery = useGetPaymentMethodQuery();
  const configQuery = useConfigQuery();

  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('US');
  const [isVeteran, setIsVeteran] = useState(false);

  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const isBillingExempt = selfQuery.data?.isBillingExempt ?? false;
  const hasPayment = paymentQuery.data !== null && paymentQuery.data !== undefined;
  const needsPayment = !hasPayment && !isBillingExempt;

  const setupIntentMutation = useSetupIntentMutation(
    (data) => setClientSecret(data.clientSecret),
    () => showToast('Failed to initialize payment.', ToastType.Error),
  );

  useEffect(() => {
    if (needsPayment && !clientSecret) {
      setupIntentMutation.mutate('post');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [needsPayment]);

  const addRecipientMutation = useAddRecipientMutation(
    () => {
      showToast('Recipient added!', ToastType.Success);
      onNext();
    },
    () => showToast('Failed to add recipient.', ToastType.Error),
  );

  const formValid = addressLine1 && city && state && postalCode;

  function handleSubmitRecipient() {
    if (!formValid) return;
    addRecipientMutation.mutate({
      avatarFile: null,
      name: recipientName,
      addressLine1,
      addressLine2: addressLine2 || null,
      city,
      provinceOrState: state,
      postalCode,
      country,
      isVeteran,
    });
  }

  const inputClass = "w-full px-4 py-3 rounded-xl border-2 border-[#DEDBD5] bg-[#FCFBF8] text-[#242832] text-base placeholder-[#868581] focus:border-[#C15F3C] focus:outline-none";

  return (
    <div className="flex flex-col pt-6">
      <h1 className="text-[32px] font-medium text-[#242832] mb-3">
        Where should we ship {recipientName}&apos;s magazine?
      </h1>
      <p className="text-base text-[#868581] mb-6">
        We&apos;ll deliver a printed magazine to this address at the start of each month.
      </p>

      {/* Address form */}
      <div className="flex flex-col gap-3 mb-4">
        <input type="text" placeholder="Address line 1" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} className={inputClass} />
        <input type="text" placeholder="Address line 2 (optional)" value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} className={inputClass} />
        <div className="grid grid-cols-2 gap-3">
          <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} className={inputClass} />
          <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} className={inputClass} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input type="text" placeholder="Postal code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className={inputClass} />
          <select value={country} onChange={(e) => setCountry(e.target.value)} className={inputClass}>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
          </select>
        </div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={isVeteran} onChange={(e) => setIsVeteran(e.target.checked)} className="w-5 h-5 rounded border-[#DEDBD5] text-[#C15F3C] focus:ring-[#C15F3C]" />
          <span className="text-sm text-[#242832]">Veteran / Active Duty</span>
        </label>
      </div>

      {/* Inline payment if needed */}
      {needsPayment && clientSecret && configQuery.data ? (
        <Elements
          stripe={getStripe(configQuery.data.stripePublishableKey)}
          options={{
            clientSecret,
            appearance: {
              theme: 'stripe',
              variables: {
                colorPrimary: '#B05637',
                colorBackground: '#FCFBF8',
                borderRadius: '12px',
              },
            },
          }}>
          <PaymentForm onPaymentConfirmed={() => handleSubmitRecipient()} />
        </Elements>
      ) : (
        <button
          onClick={handleSubmitRecipient}
          disabled={!formValid || addRecipientMutation.isPending}
          className={`w-full py-4 rounded-[14px] border-2 text-base font-medium transition-colors mt-2 ${
            !formValid || addRecipientMutation.isPending
              ? 'bg-[#ECEDEF] border-[#ECEDEF] text-[#A8ABB3]'
              : 'bg-[#C15F3C] border-[#C15F3C] text-white hover:bg-[#a8512f]'
          }`}>
          {addRecipientMutation.isPending ? 'Adding...' : 'Start Subscription'}
        </button>
      )}
    </div>
  );
}
