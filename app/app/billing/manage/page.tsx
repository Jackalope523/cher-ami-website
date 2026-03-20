'use client';

import { useGetSelfQuery, useGetPriceQuery, useGetPaymentMethodQuery, useRemovePaymentMethodMutation, useSetupIntentMutation, useConfigQuery } from '@/lib/hooks';
import { useToast, ToastType } from '@/components/app/ToastProvider';
import { useModal } from '@/components/app/ModalProvider';
import UserItem from '@/components/app/UserItem';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { getStripe } from '@/lib/stripe';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

function UpdatePaymentForm({ onDone }: { onDone: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const showToast = useToast();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    const { error } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/app/billing/manage`,
      },
      redirect: 'if_required',
    });

    if (error) {
      showToast(error.message || 'Update failed.', ToastType.Error);
    } else {
      await queryClient.invalidateQueries({ queryKey: ['PaymentMethod'] });
      showToast('Payment method updated!', ToastType.Success);
    }
    setLoading(false);
    onDone();
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || loading}
        className={`w-full py-4 rounded-[14px] border-2 text-base font-medium transition-colors mt-4 ${
          !stripe || loading
            ? 'bg-[#ECEDEF] border-[#ECEDEF] text-[#A8ABB3]'
            : 'bg-[#C15F3C] border-[#C15F3C] text-white hover:bg-[#a8512f]'
        }`}>
        {loading ? 'Processing...' : 'Update'}
      </button>
    </form>
  );
}

export default function BillingManagePage() {
  const getSelfQuery = useGetSelfQuery();
  const getPriceQuery = useGetPriceQuery();
  const getPaymentMethodQuery = useGetPaymentMethodQuery();
  const configQuery = useConfigQuery();
  const showToast = useToast();
  const { showModal, dismissModal } = useModal();
  const queryClient = useQueryClient();
  const [updateSecret, setUpdateSecret] = useState<string | null>(null);

  const removePaymentMethodMutation = useRemovePaymentMethodMutation(
    async () => {
      await queryClient.invalidateQueries({ queryKey: ['PaymentMethod'] });
      showToast('Payment method removed.', ToastType.Success);
      dismissModal();
    },
    () => showToast('Failed to remove payment method.', ToastType.Error),
  );

  const setupIntentMutation = useSetupIntentMutation(
    (data) => setUpdateSecret(data.clientSecret),
    () => showToast('Failed to initialize payment update.', ToastType.Error),
  );

  function handleRemove() {
    showModal(
      <div>
        <h3 className="text-lg font-medium text-[#242832] mb-2">Remove payment method?</h3>
        <p className="text-sm text-[#868581] mb-6">You will need to add a new payment method to continue receiving magazines.</p>
        <div className="flex gap-3">
          <button onClick={dismissModal} className="flex-1 py-3 rounded-xl border-2 border-[#DEDBD5] text-[#242832] font-medium">Cancel</button>
          <button onClick={() => removePaymentMethodMutation.mutate()} className="flex-1 py-3 rounded-xl bg-red-500 text-white font-medium">Remove</button>
        </div>
      </div>,
    );
  }

  function handleUpdate() {
    const method = getPaymentMethodQuery.data ? 'patch' : 'post';
    setupIntentMutation.mutate(method);
  }

  if (getSelfQuery.isError || getPriceQuery.isError || getPaymentMethodQuery.isError) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-[#868581]">Something went wrong.</p>
      </div>
    );
  }

  if (getSelfQuery.isLoading || getPriceQuery.isLoading || getPaymentMethodQuery.isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#C15F3C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!getSelfQuery.data || getPriceQuery.data === undefined) return null;

  const total = getSelfQuery.data.recipients
    .map((x) =>
      x.isVeteran
        ? getPriceQuery.data!.militaryEditionPrice
        : getPriceQuery.data!.standardEditionPrice,
    )
    .reduce((a, b) => a + b, 0) / 100;

  return (
    <div className="max-w-sm mx-auto px-5 py-10 bg-[#FCFBF8] min-h-screen">
      <h2 className="text-xl font-medium text-[#242832] mb-4">Billing summary</h2>
      <p className="text-base text-[#242832] mb-4">You&apos;re currently paying for the following recipients.</p>

      <div className="flex flex-col gap-6 mb-6">
        {getSelfQuery.data.recipients.map((x) => (
          <UserItem
            key={x.id}
            text={x.name}
            imageSource={x.avatarUrl}
            tagRight={`$${
              (x.isVeteran
                ? getPriceQuery.data!.militaryEditionPrice
                : getPriceQuery.data!.standardEditionPrice) / 100
            }`}
          />
        ))}
      </div>

      <div className="border-t-2 border-[#DEDBD5] my-6" />

      <div className="flex justify-between mb-8">
        <span className="text-sm font-medium text-[#242832]">Total</span>
        <span className="text-sm font-medium text-[#242832]">${total}</span>
      </div>

      <h2 className="text-xl font-medium text-[#242832] mb-4">Billing details</h2>

      {getPaymentMethodQuery.data && (
        <div className="flex items-center justify-between px-6 py-3 rounded-xl border-2 border-[#242832] mb-4">
          <div className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#242832" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" y1="10" x2="22" y2="10" />
            </svg>
            <span className="text-sm font-medium text-[#242832]">
              {getPaymentMethodQuery.data.displayBrand.charAt(0).toUpperCase() +
                getPaymentMethodQuery.data.displayBrand.slice(1)}{' '}
              ending in {getPaymentMethodQuery.data.last4}
            </span>
          </div>
          <button onClick={handleRemove} className="text-[#B05637]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
          </button>
        </div>
      )}

      {/* Update/Add payment form */}
      {updateSecret && configQuery.data ? (
        <Elements
          stripe={getStripe(configQuery.data.stripePublishableKey)}
          options={{
            clientSecret: updateSecret,
            appearance: {
              theme: 'stripe',
              variables: { colorPrimary: '#B05637', colorBackground: '#FCFBF8', borderRadius: '12px' },
            },
          }}>
          <UpdatePaymentForm onDone={() => setUpdateSecret(null)} />
        </Elements>
      ) : (
        <button
          onClick={handleUpdate}
          disabled={setupIntentMutation.isPending}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-[#B05637] text-[#B05637] font-medium">
          {getPaymentMethodQuery.data ? 'Update Payment Method' : 'Add Payment Method'}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      )}
    </div>
  );
}
