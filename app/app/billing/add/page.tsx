'use client';

import { useConfigQuery, useSetupIntentMutation } from '@/lib/hooks';
import { useToast, ToastType } from '@/components/app/ToastProvider';
import { getStripe } from '@/lib/stripe';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

function AddPaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
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
        return_url: `${window.location.origin}/app/manage`,
      },
      redirect: 'if_required',
    });

    if (error) {
      showToast(error.message || 'Payment setup failed.', ToastType.Error);
      setLoading(false);
    } else {
      await queryClient.invalidateQueries({ queryKey: ['PaymentMethod'] });
      showToast('Payment method added!', ToastType.Success);
      router.push('/app/manage');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || loading}
        className={`w-full py-4 rounded-[14px] border-2 text-base font-medium transition-colors mt-6 ${
          !stripe || loading
            ? 'bg-[#ECEDEF] border-[#ECEDEF] text-[#A8ABB3]'
            : 'bg-[#C15F3C] border-[#C15F3C] text-white hover:bg-[#a8512f]'
        }`}>
        {loading ? 'Processing...' : 'Add Payment Method'}
      </button>
    </form>
  );
}

export default function AddBillingPage() {
  const configQuery = useConfigQuery();
  const showToast = useToast();
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const setupIntentMutation = useSetupIntentMutation(
    (data) => setClientSecret(data.clientSecret),
    () => showToast('Failed to initialize payment.', ToastType.Error),
  );

  useEffect(() => {
    setupIntentMutation.mutate('post');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!configQuery.data || !clientSecret) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#C15F3C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const stripePromise = getStripe(configQuery.data.stripePublishableKey);

  return (
    <div className="max-w-sm mx-auto px-5 py-10 bg-[#FCFBF8] min-h-screen">
      <h1 className="text-[32px] font-medium text-[#242832] mb-6">Add payment method</h1>
      <Elements
        stripe={stripePromise}
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
        <AddPaymentForm />
      </Elements>
    </div>
  );
}
