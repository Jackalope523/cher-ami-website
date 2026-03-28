'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Damion } from 'next/font/google';
import { cropImageToAspectRatio, compressImage } from '@/lib/utility';
import DynamicCTA from './DynamicCTA';
import TitleLogo from '@/public/title.png';
import HedgehogIllustration from '@/public/hedgehog.png';

const damion = Damion({
  weight: '400',
  fallback: ['cursive'],
  display: 'swap',
});

type Step = 'scenario' | 'yourName' | 'recipientName' | 'collaboration' | 'invite' | 'firstPost' | 'preview' | 'done';

type Scenario = 'grandparent' | 'parent' | 'myself' | 'other';
type Collaboration = 'solo' | 'together';

const SCENARIOS: { id: Scenario; label: string; description: string; icon: string }[] = [
  {
    id: 'grandparent',
    label: 'A grandparent',
    description: 'A monthly magazine full of family updates',
    icon: '👴',
  },
  {
    id: 'parent',
    label: 'A parent',
    description: 'Keep them in the loop with photos and stories',
    icon: '👨‍👩‍👧',
  },
  {
    id: 'myself',
    label: 'Me!',
    description: 'A personal photo journal, printed and shipped to you',
    icon: '📚',
  },
  {
    id: 'other',
    label: 'Someone else',
    description: 'A friend, partner, or anyone you care about',
    icon: '💌',
  },
];

function getDefaultName(scenario: Scenario): string {
  switch (scenario) {
    case 'grandparent':
      return 'Grandparent';
    case 'parent':
      return 'Parent';
    case 'myself':
      return '';
    case 'other':
      return '';
  }
}

function getSteps(scenario: Scenario | null, collaboration: Collaboration | null, hasPhoto: boolean): Step[] {
  const steps: Step[] = ['scenario', 'yourName'];

  // "other" needs a name input
  if (scenario === 'other') {
    steps.push('recipientName');
  }

  // Collaboration choice
  steps.push('collaboration');

  // Invite step only if building together
  if (collaboration === 'together') {
    steps.push('invite');
  }

  // Photo step
  steps.push('firstPost');

  // Preview only if they added a photo
  if (hasPhoto) {
    steps.push('preview');
  }

  steps.push('done');
  return steps;
}

export default function StartWizard({ email }: { email: string }) {

  const [step, setStep] = useState<Step>('scenario');
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [collaboration, setCollaboration] = useState<Collaboration | null>(null);
  const [recipientName, setRecipientName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [caption, setCaption] = useState('');

  // Photo state (no layout picker — default to wide)
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const selectedSize = { width: 1088, height: 756 };

  // Invite state
  const [inviteEmails, setInviteEmails] = useState<string[]>(['']);

  const hasPhoto = !!imageFile;
  const steps = getSteps(scenario, collaboration, hasPhoto);
  const currentIndex = steps.indexOf(step);
  const progress = ((currentIndex + 1) / steps.length) * 100;

  // Derive display name for personalization
  const displayName = scenario === 'myself' ? '' : recipientName;

  function goToStep(target: Step) {
    setStep(target);
  }

  function nextStep() {
    const next = currentIndex + 1;
    if (next < steps.length) setStep(steps[next]);
  }

  function prevStep() {
    const prev = currentIndex - 1;
    if (prev >= 0) {
      setStep(steps[prev]);
    }
  }

  function handleSkip() {
    nextStep();
  }

  function handleScenarioSelect(s: Scenario) {
    setScenario(s);
    const defaultName = getDefaultName(s);
    setRecipientName(defaultName);
    goToStep('yourName');
  }

  function handleCollaborationSelect(c: Collaboration) {
    setCollaboration(c);
    if (c === 'together') {
      goToStep('invite');
    } else {
      goToStep('firstPost');
    }
  }

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const cropped = await cropImageToAspectRatio(file, selectedSize.width, selectedSize.height);
      const compressed = await compressImage(cropped);
      setImageFile(compressed);
      setImagePreview(URL.createObjectURL(compressed));
    } catch {
      // Silently fail — user can retry
    }
  }

  function handleAddToMagazine() {
    // Photo was added → next step is preview
    // We need to recalc steps with hasPhoto=true since imageFile is now set
    goToStep('preview');
  }

  async function submitOnboarding() {
    const formData = new FormData();
    formData.append('Email', email);
    formData.append('FirstName', firstName);
    formData.append('LastName', lastName);
    const validEmails = inviteEmails.filter(e => e.trim());
    validEmails.forEach(e => formData.append('FriendEmails', e));

    if (imageFile) {
      formData.append('Image', imageFile);
      if (caption) formData.append('Caption', caption);
    }

    try {
      await fetch('/api/onboarding', {
        method: 'POST',
        body: formData,
      });
    } catch (err) {
      console.error(err);
    }
  }

  function goToDoneAndSubmit() {
    submitOnboarding();
    goToStep('done');
  }

  function handleSkipPhoto() {
    // No photo → skip preview, go straight to done
    goToDoneAndSubmit();
  }

  function addInviteField() {
    if (inviteEmails.length < 10) {
      setInviteEmails([...inviteEmails, '']);
    }
  }

  function updateInviteEmail(index: number, value: string) {
    const updated = [...inviteEmails];
    updated[index] = value;
    setInviteEmails(updated);
  }

  function removeInviteEmail(index: number) {
    if (inviteEmails.length <= 1) return;
    const updated = inviteEmails.filter((_, i) => i !== index);
    setInviteEmails(updated);
  }

  const showBack = step !== 'scenario';
  const showSkip = step === 'firstPost' || step === 'invite';

  // --- Dynamic copy ---
  // For generic defaults like "Grandparent" or "Parent", use "their" instead of possessive
  const isGenericName = displayName === 'Grandparent' || displayName === 'Parent';
  const possessive = !displayName
    ? 'your'
    : isGenericName
      ? 'their'
      : `${displayName}'s`;

  const photoHeading = `Pick a photo for ${possessive} first issue`;

  const previewCta = `Continue`;

  const inviteHeading = displayName
    ? `Who else should help build ${possessive} magazine?`
    : 'Who else should contribute?';

  return (
    <div className="flex flex-col w-full">
      {/* Progress bar */}
      <div className="w-full h-1.5 bg-[#F4F1EA] rounded-full mb-2">
        <div
          className="h-full bg-[#C15F3C] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Top nav */}
      <div className="flex items-center justify-between mb-4">
        {showBack ? (
          <button
            onClick={prevStep}
            className="flex items-center gap-1 text-sm text-[#868581] hover:text-[#242832] transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back
          </button>
        ) : (
          <div />
        )}
        {showSkip ? (
          <button
            onClick={step === 'firstPost' ? handleSkipPhoto : handleSkip}
            className="text-sm text-[#868581] hover:text-[#242832] transition-colors">
            Skip for now
          </button>
        ) : (
          <div />
        )}
      </div>

      {/* Step content */}
      <div className="w-full">
        {/* Step: Scenario Selection */}
        {step === 'scenario' && (
          <div className="flex flex-col gap-4">
            <h2 className="text-[1.5rem] font-semibold text-[#242832]">
              Who are you making this for?
            </h2>
            <p className="text-[0.875rem] text-[#868581]">
              Every month, your photos and stories get printed and mailed as a real magazine.
            </p>
            <div className="flex flex-col gap-3">
              {SCENARIOS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleScenarioSelect(s.id)}
                  className="flex items-center gap-4 p-4 rounded-2xl border-2 border-[#DEDBD5] hover:border-[#C15F3C] transition-colors text-left">
                  <span className="text-2xl flex-shrink-0">{s.icon}</span>
                  <div>
                    <p className="text-base font-medium text-[#242832]">{s.label}</p>
                    <p className="text-sm text-[#868581]">{s.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step: Your Name */}
        {step === 'yourName' && (
          <div className="flex flex-col gap-4">
            <h2 className="text-[1.5rem] font-semibold text-[#242832]">
              What&apos;s your name?
            </h2>
            <p className="text-[0.875rem] text-[#868581]">
              We&apos;ll use this to set up your account.
            </p>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value.slice(0, 100))}
                placeholder="First name"
                className="w-full px-4 py-3 rounded-xl border-2 border-[#DEDBD5] bg-[#FCFBF8] text-[#242832] text-base placeholder-[#868581] focus:border-[#C15F3C] focus:outline-none"
                autoFocus
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value.slice(0, 100))}
                onKeyDown={(e) => { if (e.key === 'Enter' && firstName.trim() && lastName.trim()) nextStep(); }}
                placeholder="Last name"
                className="w-full px-4 py-3 rounded-xl border-2 border-[#DEDBD5] bg-[#FCFBF8] text-[#242832] text-base placeholder-[#868581] focus:border-[#C15F3C] focus:outline-none"
              />
            </div>
            <button
              onClick={nextStep}
              disabled={!firstName.trim() || !lastName.trim()}
              className={`w-full py-3 rounded-[12px] border-2 text-base font-medium transition-colors ${
                !firstName.trim() || !lastName.trim()
                  ? 'bg-[#ECEDEF] border-[#ECEDEF] text-[#A8ABB3]'
                  : 'bg-[#C15F3C] border-[#C15F3C] text-white hover:bg-[#a8512f]'
              }`}>
              Next
            </button>
          </div>
        )}

        {/* Step: Recipient Name (only for "other" scenario) */}
        {step === 'recipientName' && (
          <div className="flex flex-col gap-4">
            <h2 className="text-[1.5rem] font-semibold text-[#242832]">
              What do you call them?
            </h2>
            <p className="text-[0.875rem] text-[#868581]">
              We&apos;ll use this to personalize their magazine.
            </p>
            <div>
              <p className="text-sm font-medium text-[#242832] mb-2">Their name or nickname</p>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value.slice(0, 100))}
                onKeyDown={(e) => { if (e.key === 'Enter' && recipientName.trim()) nextStep(); }}
                placeholder="e.g. Grandma, Mom & Dad, Uncle Joe"
                className="w-full px-4 py-3 rounded-xl border-2 border-[#C15F3C] bg-[#FCFBF8] text-[#242832] text-base placeholder-[#868581] focus:outline-none"
                autoFocus
              />
            </div>
            <button
              onClick={nextStep}
              disabled={!recipientName.trim()}
              className={`w-full py-3 rounded-[12px] border-2 text-base font-medium transition-colors ${
                !recipientName.trim()
                  ? 'bg-[#ECEDEF] border-[#ECEDEF] text-[#A8ABB3]'
                  : 'bg-[#C15F3C] border-[#C15F3C] text-white hover:bg-[#a8512f]'
              }`}>
              Next
            </button>
          </div>
        )}

        {/* Step: Collaboration — solo or with others */}
        {step === 'collaboration' && (
          <div className="flex flex-col gap-4">
            <h2 className="text-[1.5rem] font-semibold text-[#242832]">
              Are you doing this solo or as a group?
            </h2>
            <p className="text-[0.875rem] text-[#868581]">
              Magazines are even better when more people pitch in.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => handleCollaborationSelect('solo')}
                className="flex items-center gap-4 p-4 rounded-2xl border-2 border-[#DEDBD5] hover:border-[#C15F3C] transition-colors text-left">
                <span className="text-2xl flex-shrink-0">🙋</span>
                <div>
                  <p className="text-base font-medium text-[#242832]">Just me</p>
                  <p className="text-sm text-[#868581]">I&apos;ll handle all the photos and stories</p>
                </div>
              </button>
              <button
                onClick={() => handleCollaborationSelect('together')}
                className="flex items-center gap-4 p-4 rounded-2xl border-2 border-[#DEDBD5] hover:border-[#C15F3C] transition-colors text-left">
                <span className="text-2xl flex-shrink-0">👨‍👩‍👧‍👦</span>
                <div>
                  <p className="text-base font-medium text-[#242832]">With family &amp; friends</p>
                  <p className="text-sm text-[#868581]">Everyone adds their own photos and stories</p>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Step: Invite Family (only if collaboration === 'together') */}
        {step === 'invite' && (
          <div className="flex flex-col gap-4">
            <h2 className="text-[1.5rem] font-semibold text-[#242832]">
              {inviteHeading}
            </h2>
            <p className="text-[0.875rem] text-[#868581]">
              More contributors means more memories in every issue. You can always add more people later.
            </p>

            <div className="flex flex-col gap-3">
              {inviteEmails.map((email, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => updateInviteEmail(index, e.target.value)}
                    placeholder="Family member's email"
                    className="flex-1 px-4 py-3 rounded-xl border-2 border-[#DEDBD5] bg-[#FCFBF8] text-[#242832] text-base placeholder-[#868581] focus:border-[#C15F3C] focus:outline-none"
                  />
                  {inviteEmails.length > 1 && (
                    <button
                      onClick={() => removeInviteEmail(index)}
                      className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-[#868581] hover:text-[#C15F3C] hover:bg-[#F4F1EA] transition-colors"
                      aria-label="Remove email">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>

            {inviteEmails.length < 10 && (
              <button
                onClick={addInviteField}
                className="flex items-center gap-2 text-sm text-[#C15F3C] hover:text-[#a8512f] transition-colors font-medium">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14" /><path d="M5 12h14" />
                </svg>
                Add another
              </button>
            )}

            <button
              onClick={nextStep}
              className="w-full py-3 rounded-[12px] border-2 bg-[#C15F3C] border-[#C15F3C] text-white text-base font-medium hover:bg-[#a8512f] transition-colors">
              {inviteEmails.some((e) => e.trim()) ? 'Looks good' : 'I\'ll do this later'}
            </button>
          </div>
        )}

        {/* Step: First Photo (no layout picker — always wide) */}
        {step === 'firstPost' && (
          <div className="flex flex-col gap-4">
            <h2 className="text-[1.5rem] font-semibold text-[#242832]">{photoHeading}</h2>
            <p className="text-[0.875rem] text-[#868581]">Something fun, sweet, or everyday — it&apos;ll go right into the next issue.</p>

            {/* Image upload */}
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full rounded-2xl border-2 border-dashed border-[#DEDBD5] hover:border-[#C15F3C] transition-colors overflow-hidden"
              style={{ aspectRatio: `${selectedSize.width}/${selectedSize.height}` }}>
              {imagePreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imagePreview} alt="Selected photo" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-[#F4F1EA] flex flex-col items-center justify-center gap-2">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#868581" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                  <span className="text-sm text-[#868581]">Tap to choose a photo</span>
                </div>
              )}
            </button>

            {/* Caption — only shown when a photo is selected */}
            {imageFile && (
              <div className="relative">
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value.slice(0, 200))}
                  placeholder="Write a caption (optional)"
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#DEDBD5] bg-[#FCFBF8] text-[#242832] text-base placeholder-[#868581] focus:border-[#C15F3C] focus:outline-none resize-none"
                />
                <span className="absolute bottom-2 right-3 text-xs text-[#868581]">{caption.length}/200</span>
              </div>
            )}

            {imageFile ? (
              <button
                onClick={handleAddToMagazine}
                className="w-full py-3 rounded-[12px] border-2 bg-[#C15F3C] border-[#C15F3C] text-white text-base font-medium hover:bg-[#a8512f] transition-colors">
                Add to Magazine
              </button>
            ) : (
              <button
                onClick={() => { submitOnboarding(); goToStep('done'); }}
                className="w-full py-3 rounded-[12px] border-2 bg-[#C15F3C] border-[#C15F3C] text-white text-base font-medium hover:bg-[#a8512f] transition-colors">
                I&apos;ll do this later
              </button>
            )}
          </div>
        )}

        {/* Step: Magazine Preview (only shown if photo was added) */}
        {step === 'preview' && (
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-[1.5rem] font-semibold text-[#242832] text-center">
              {displayName
                ? `This is what ${possessive} magazine will look like`
                : 'This is what your magazine will look like'}
            </h2>
            <p className="text-[0.875rem] text-[#868581] text-center">
              The more photos you add, the more beautiful it becomes.
            </p>

            {/* Magazine preview — fanned-out pages */}
            <div className="relative w-full max-w-[360px] mx-auto" style={{ height: '340px' }}>
              {/* Cover page (left, behind) */}
              <div className="absolute top-4 left-0 w-[65%] bg-white shadow-md border border-[#E8E5DF] overflow-hidden"
                   style={{ aspectRatio: '8.5/11', transform: 'rotate(-4deg)' }}>
                <div className="absolute inset-0 flex flex-col p-[6%]">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <p className="text-[7px] font-medium text-[#C15F3C]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {new Date(new Date().setMonth(new Date().getMonth())).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} &bull; Issue 1
                    </p>
                    <p className={`text-[9px] text-[#C15F3C] ${damion.className}`}>
                      Your Family
                    </p>
                  </div>

                  <div className="pt-1.5 w-full">
                    <Image src={TitleLogo} alt="Cher Ami" className="w-full h-auto" />
                  </div>

                  {/* Hedgehog */}
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <div className="w-[45%]">
                      <Image src={HedgehogIllustration} alt="" className="w-full h-auto" />
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center gap-1.5">
                    <div className="flex-1 h-[1px] bg-[#C15F3C]" />
                    {displayName && (
                      <p className={`text-xs text-[#C15F3C] ${damion.className}`}>
                        {displayName}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Content page (right, in front — shows their photo) */}
              <div className="absolute top-0 right-0 w-[65%] bg-white shadow-xl border border-[#E8E5DF] overflow-hidden"
                   style={{ aspectRatio: '8.5/11', transform: 'rotate(3deg)' }}>
                <div className="absolute inset-0 flex flex-col p-[6%]">
                  {/* 2×2 grid */}
                  <div className="flex flex-1 flex-col gap-y-[8%] content-start pt-[2%]">
                    <div className="flex-1 grid grid-cols-2 gap-x-[3%]">
                      {/* Their photo */}
                      {imagePreview && (
                        <div className="flex flex-col gap-2">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={imagePreview} alt="Your photo" className="w-full aspect-[4/3] object-cover" />
                          <div className="flex flex-row gap-1.5">
                            <p className="text-[5px] text-[#868581] bg-[#F4F1EA] size-[15px] rounded-[15px] text-center content-center"></p>
                            <p className="text-[5px] text-[#242832] font-medium mt-0.5 content-center">You!</p>
                          </div>
                          {caption && (
                            <p className="text-[5px] text-[#242832] line-clamp-2">{caption}</p>
                          )}
                        </div>
                      )}
                      <div className="flex flex-col gap-2">
                        <div className="w-full aspect-[4/3] bg-[#F4F1EA]" />
                        <div className="flex flex-row gap-1.5 items-center">
                          <p className="bg-[#F4F1EA] size-[15px] rounded-[15px] text-center content-center" />
                          <p className="bg-[#F4F1EA] w-[30px] h-[4px] text-center content-center" />
                        </div>
                        <p className="bg-[#F4F1EA] w-[75px] h-[4px] text-center content-center mt-[2px]" />
                      </div>
                    </div>
                    {/* Empty slots */}
                    <div className="flex flex-1 flex-col gap-2">
                      <div className="w-full aspect-[4/1.5] bg-[#F4F1EA]" />
                      <div className="grid grid-cols-2">
                        <div className="flex flex-row gap-1.5 items-center">
                          <p className="bg-[#F4F1EA] size-[15px] rounded-[15px] text-center content-center" />
                          <p className="bg-[#F4F1EA] w-[45px] h-[4px] text-center content-center" />
                        </div>
                        <div className="flex flex-col gap-1 content-start">
                          <p className="bg-[#F4F1EA] w-[65px] h-[4px] text-center content-center" />
                          <p className="bg-[#F4F1EA] w-[50px] h-[4px] text-center content-center" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Page footer */}
                  <div className="pt-1">
                    <p className="text-[6px] text-[#242832] font-bold text-left">
                      2 <span className={`${damion.className} pl-1 text-[7px]`}>Cher Ami</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={goToDoneAndSubmit}
              className="w-full py-3 rounded-[12px] border-2 bg-[#C15F3C] border-[#C15F3C] text-white text-base font-medium hover:bg-[#a8512f] transition-colors">
              {previewCta}
            </button>
          </div>
        )}

        {/* Step: Convert */}
        {step === 'done' && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-4">
              <h2 className="text-[1.5rem] font-semibold text-[#242832] text-center">
                You&apos;re all set up!
              </h2>
              <p className="text-[0.875rem] text-[#868581] text-center">
                Download the app to keep adding photos and your recipient&apos;s mailing address.
              </p>
            </div>
            <div className="flex flex-col gap-3 items-center">
              <DynamicCTA trackingProps={{ location: 'start-wizard' }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
