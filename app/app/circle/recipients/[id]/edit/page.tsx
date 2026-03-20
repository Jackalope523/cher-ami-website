'use client';

import { useGetRecipientQuery, useUpdateRecipientMutation } from '@/lib/hooks';
import { useToast, ToastType } from '@/components/app/ToastProvider';
import AuthImage from '@/components/app/AuthImage';
import { useRouter, useParams } from 'next/navigation';
import { useRef, useState, useEffect } from 'react';

export default function EditRecipientPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);
  const showToast = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recipientQuery = useGetRecipientQuery(id);

  const [name, setName] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('US');
  const [isVeteran, setIsVeteran] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    if (recipientQuery.data) {
      /* eslint-disable react-hooks/set-state-in-effect -- syncing server data to form state */
      setName(recipientQuery.data.name);
      setAddressLine1(recipientQuery.data.addressLine1);
      setAddressLine2(recipientQuery.data.addressLine2 || '');
      setCity(recipientQuery.data.city);
      setState(recipientQuery.data.provinceOrState);
      setPostalCode(recipientQuery.data.postalCode);
      setCountry(recipientQuery.data.country);
      setIsVeteran(recipientQuery.data.isVeteran);
      /* eslint-enable react-hooks/set-state-in-effect */
    }
  }, [recipientQuery.data]);

  const updateRecipientMutation = useUpdateRecipientMutation(
    () => {
      showToast('Recipient updated!', ToastType.Success);
      router.push('/app/manage');
    },
    () => showToast('Failed to update recipient.', ToastType.Error),
  );

  function handleAvatarSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  }

  function handleSubmit() {
    if (!name || !addressLine1 || !city || !state || !postalCode) return;
    updateRecipientMutation.mutate({
      id,
      avatarFile,
      name,
      addressLine1,
      addressLine2: addressLine2 || null,
      city,
      provinceOrState: state,
      postalCode,
      country,
      isVeteran,
    });
  }

  if (recipientQuery.isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#C15F3C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const formValid = name && addressLine1 && city && state && postalCode;
  const inputClass = "w-full px-4 py-3 rounded-xl border-2 border-[#DEDBD5] bg-[#FCFBF8] text-[#242832] text-base placeholder-[#868581] focus:border-[#C15F3C] focus:outline-none";

  return (
    <div className="max-w-sm mx-auto px-5 py-10 bg-[#FCFBF8] min-h-screen">
      <h1 className="text-[32px] font-medium text-[#242832] mb-6">Edit recipient</h1>

      <div className="flex justify-center mb-6">
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarSelect} className="hidden" />
        <button onClick={() => fileInputRef.current?.click()} className="relative">
          {avatarPreview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatarPreview} alt="Avatar" className="h-20 w-20 rounded-full object-cover" />
          ) : recipientQuery.data?.avatarUrl ? (
            <AuthImage src={recipientQuery.data.avatarUrl} alt="Avatar" className="h-20 w-20 rounded-full object-cover" />
          ) : (
            <div className="h-20 w-20 rounded-full bg-[#F4F1EA] flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#868581" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          )}
          <div className="absolute bottom-0 right-0 bg-[#C15F3C] rounded-full p-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            </svg>
          </div>
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <input type="text" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
        <input type="text" placeholder="Address line 1" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} className={inputClass} />
        <input type="text" placeholder="Address line 2 (optional)" value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} className={inputClass} />
        <div className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} className={inputClass} />
          <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} className={inputClass} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="Postal code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className={inputClass} />
          <select value={country} onChange={(e) => setCountry(e.target.value)} className={inputClass}>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
          </select>
        </div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={isVeteran} onChange={(e) => setIsVeteran(e.target.checked)} className="w-5 h-5 rounded border-[#DEDBD5] text-[#C15F3C] focus:ring-[#C15F3C]" />
          <span className="text-base text-[#242832]">Veteran / Active Duty</span>
        </label>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!formValid || updateRecipientMutation.isPending}
        className={`w-full py-4 rounded-[14px] border-2 text-base font-medium transition-colors mt-8 ${
          !formValid || updateRecipientMutation.isPending
            ? 'bg-[#ECEDEF] border-[#ECEDEF] text-[#A8ABB3]'
            : 'bg-[#C15F3C] border-[#C15F3C] text-white hover:bg-[#a8512f]'
        }`}>
        {updateRecipientMutation.isPending ? 'Saving...' : 'Save'}
      </button>
    </div>
  );
}
