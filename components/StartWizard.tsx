'use client';

import { useState, useRef, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import { Damion } from 'next/font/google';
import { cropImageToAspectRatio, compressImage, getNextMonthName } from '@/lib/utility';
import DynamicCTA from './DynamicCTA';
import TitleLogo from '@/public/title.png';
import HedgehogIllustration from '@/public/hedgehog.png';
import posthog from 'posthog-js';

// Brand illustrations, one per step
import SquirrelIllustration from '@/public/squirrel.webp';
import MiceFamilyIllustration from '@/public/mice-family.webp';
import MousePhotoIllustration from '@/public/value-collaborate.png';
import BearFamilyIllustration from '@/public/bear-family.webp';
import EnvelopeIllustration from '@/public/envelope-splash-green.webp';
import MailPigeonIllustration from '@/public/mail-pigeon.png';
import MouseReceivingIllustration from '@/public/mouse.png';

const damion = Damion({
  weight: '400',
  fallback: ['cursive'],
  display: 'swap',
});

type Step = 'scenario' | 'collaboration' | 'invite' | 'firstPost' | 'preview' | 'recipientName' | 'yourName' | 'email' | 'done';

type Scenario = 'grandparent' | 'parent' | 'myself' | 'other' | 'usa' | 'abroad';
type Collaboration = 'solo' | 'together';

const SCENARIOS: { id: Scenario; label: string; description: string; icon: string }[] = [
  {
    id: 'grandparent',
    label: 'A grandparent',
    description: 'Keep them close, even from far away',
    icon: '👴',
  },
  {
    id: 'parent',
    label: 'A parent',
    description: 'A thoughtful way to share your life',
    icon: '👨‍👩‍👧',
  },
  {
    id: 'myself',
    label: 'Me!',
    description: 'A keepsake printed record of your year',
    icon: '📚',
  },
  {
    id: 'other',
    label: 'Someone else',
    description: 'A friend, partner, or anyone you love',
    icon: '💌',
  },
];

const MILITARY_SCENARIOS: { id: Scenario; label: string; description: string; icon: string }[] = [
  {
    id: 'usa',
    label: 'In the USA',
    description: 'Stationed domestically (US address)',
    icon: '🇺🇸',
  },
  {
    id: 'abroad',
    label: 'Overseas',
    description: 'Deployed or stationed abroad (APO/FPO/DPO address)',
    icon: '🌍',
  },
];

// Illustration + reassuring benefit shown alongside each step
const STEP_MEDIA: Record<Step, { src: StaticImageData; alt: string; benefit: string }> = {
  scenario: {
    src: SquirrelIllustration,
    alt: 'A squirrel mail carrier delivering a letter',
    benefit: 'A printed magazine, mailed to their door every month.',
  },
  collaboration: {
    src: MiceFamilyIllustration,
    alt: 'A family of mice playing together',
    benefit: 'Everyone adds photos from their own phone.',
  },
  invite: {
    src: MailPigeonIllustration,
    alt: 'Cher Ami the messenger pigeon carrying invitations',
    benefit: "We'll send a friendly invite so they can join your circle.",
  },
  firstPost: {
    src: MousePhotoIllustration,
    alt: 'A mouse taking a photo with a phone',
    benefit: 'We handle the layout, design, and printing.',
  },
  preview: {
    src: BearFamilyIllustration,
    alt: 'A family of bears reading a Cher Ami magazine together',
    benefit: 'Premium glossy print, mailed free across the USA.',
  },
  recipientName: {
    src: EnvelopeIllustration,
    alt: 'A sealed Cher Ami envelope with a heart',
    benefit: 'Their name printed on every cover.',
  },
  yourName: {
    src: MailPigeonIllustration,
    alt: 'Cher Ami the messenger pigeon in flight',
    benefit: 'Private to your circle. No ads, no data sharing, ever.',
  },
  email: {
    src: MailPigeonIllustration,
    alt: 'Cher Ami the messenger pigeon in flight',
    benefit: 'Your first magazine is on us. Cancel anytime.',
  },
  done: {
    src: MouseReceivingIllustration,
    alt: 'A mouse delighted to receive a letter',
    benefit: 'Your memories are on their way.',
  },
};

function getDefaultRecipientName(scenario: Scenario): string {
  switch (scenario) {
    case 'grandparent':
      return 'the grandparents';
    case 'parent':
      return 'Mom & Dad';
    default:
      return '';
  }
}

function buildSteps(collaborateTogether: boolean, hasPhoto: boolean, needsRecipientName: boolean, needsEmail: boolean): Step[] {
  const steps: Step[] = ['scenario', 'collaboration'];
  if (collaborateTogether) steps.push('invite');
  steps.push('firstPost');
  if (hasPhoto) steps.push('preview');
  if (needsRecipientName) steps.push('recipientName');
  steps.push('yourName');
  if (needsEmail) steps.push('email');
  steps.push('done');
  return steps;
}

const THEME = {
  default: {
    accent: '#C15F3C',
    accentHover: '#a8512f',
    tint: '#F3E7E1',
  },
  military: {
    accent: '#779443',
    accentHover: '#6c873d',
    tint: '#E9EEDD',
  },
} as const;

export default function StartWizard({
  email: initialEmail,
  variant = 'default',
  layout = 'card',
}: {
  email?: string;
  variant?: 'default' | 'military';
  layout?: 'card' | 'page';
}) {
  const theme = THEME[variant];
  const primaryStyle = { backgroundColor: theme.accent, borderColor: theme.accent } as React.CSSProperties;
  const hasInitialEmail = !!(initialEmail && initialEmail.trim());

  const [step, setStep] = useState<Step>('scenario');
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [collaboration, setCollaboration] = useState<Collaboration | null>(null);
  const [recipientName, setRecipientName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(initialEmail ?? '');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [inviteEmails, setInviteEmails] = useState<string[]>(['']);
  const [printMonth, setPrintMonth] = useState<string | null>(null);

  // Computed on the client to avoid a hydration mismatch across a month boundary
  useEffect(() => {
    setPrintMonth(getNextMonthName());
  }, []);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const selectedSize = { width: 1088, height: 756 };

  const hasPhoto = !!imageFile;
  const needsRecipientName = scenario === 'other' || scenario === 'usa' || scenario === 'abroad';
  const needsEmail = !hasInitialEmail;
  const steps = buildSteps(collaboration === 'together', hasPhoto, needsRecipientName, needsEmail);
  const currentIndex = steps.indexOf(step);
  const progress = ((currentIndex + 1) / steps.length) * 100;

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
    if (prev >= 0) setStep(steps[prev]);
  }

  function handleScenarioSelect(s: Scenario) {
    setScenario(s);
    setRecipientName(getDefaultRecipientName(s));
    posthog.capture('wizard_scenario_selected', { scenario: s, variant });
    goToStep('collaboration');
  }

  function handleCollaborationSelect(c: Collaboration) {
    setCollaboration(c);
    posthog.capture('wizard_collaboration_selected', { collaboration: c, variant });
    goToStep(c === 'together' ? 'invite' : 'firstPost');
  }

  function addInviteField() {
    if (inviteEmails.length < 10) setInviteEmails([...inviteEmails, '']);
  }

  function updateInviteEmail(index: number, value: string) {
    const updated = [...inviteEmails];
    updated[index] = value;
    setInviteEmails(updated);
  }

  function removeInviteEmail(index: number) {
    if (inviteEmails.length <= 1) return;
    setInviteEmails(inviteEmails.filter((_, i) => i !== index));
  }

  function handleInviteNext() {
    const count = inviteEmails.filter((e) => e.trim()).length;
    posthog.capture('wizard_invites_added', { count, variant });
    nextStep();
  }

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const cropped = await cropImageToAspectRatio(file, selectedSize.width, selectedSize.height);
      const compressed = await compressImage(cropped);
      setImageFile(compressed);
      setImagePreview(URL.createObjectURL(compressed));
      posthog.capture('wizard_photo_added', { scenario, variant });
    } catch {
      // User can retry
    }
  }

  function handleSkipPhoto() {
    posthog.capture('wizard_photo_skipped', { scenario, variant });
    // Skip photo + preview, go to next meaningful step
    if (needsRecipientName) {
      goToStep('recipientName');
    } else {
      goToStep('yourName');
    }
  }

  async function submitOnboarding() {
    const formData = new FormData();
    formData.append('Email', email);
    formData.append('FirstName', firstName);
    formData.append('LastName', lastName);
    if (recipientName) formData.append('RecipientName', recipientName);

    if (imageFile) {
      formData.append('Image', imageFile);
      if (caption) formData.append('Caption', caption);
    }

    const friendEmails = inviteEmails.map((e) => e.trim()).filter(Boolean);
    friendEmails.forEach((e) => formData.append('FriendEmails', e));

    try {
      await fetch('/api/onboarding', {
        method: 'POST',
        body: formData,
      });
    } catch (err) {
      console.error(err);
    }

    const effectiveEmail = email || initialEmail;
    if (effectiveEmail) posthog.identify(effectiveEmail, { email: effectiveEmail, first_name: firstName, last_name: lastName });
    posthog.capture('wizard_completed', { scenario, collaboration, variant, has_photo: !!imageFile, has_caption: !!caption, invited_count: friendEmails.length });
  }

  function completeWizard() {
    submitOnboarding();
    goToStep('done');
  }

  // When name step completes and there's no email step, submit directly
  function handleNameNext() {
    if (!needsEmail) {
      completeWizard();
    } else {
      nextStep();
    }
  }

  const showBack = step !== 'scenario' && step !== 'done';
  const showSkip = step === 'firstPost';

  // Dynamic copy helpers — use a bare apostrophe for names ending in "s"
  // (e.g. "the grandparents'") to avoid an awkward "grandparents's".
  const possessive = !displayName
    ? 'your'
    : /s$/i.test(displayName)
      ? `${displayName}'`
      : `${displayName}'s`;
  const photoHeading = `Add a photo to ${possessive} first issue`;

  const media = STEP_MEDIA[step];

  // Floating illustration, re-keyed so it fades/pops in only on a step change.
  // A plain function (not a nested component) so it reconciles instead of
  // remounting on every parent re-render — otherwise it would flicker while typing.
  // Uses a fixed-height box + object-contain so illustrations with different
  // aspect ratios (e.g. the tall mouse-with-phone) all occupy the same vertical
  // space and never shift the layout between steps.
  const renderIllo = (wrapperClass = '') => (
    <div className={`relative animate-float ${wrapperClass}`}>
      <Image
        key={`illo-${step}`}
        src={media.src}
        alt={media.alt}
        fill
        sizes="260px"
        className={`object-contain ${step === 'done' ? 'animate-pop' : 'animate-fade-in'}`}
        priority
      />
    </div>
  );

  const printNotice = printMonth && (
    <div
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
      style={{ backgroundColor: theme.tint }}>
      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: theme.accent }} />
      <p className="text-[0.8rem] font-medium" style={{ color: theme.accent }}>
        Your next magazine prints {printMonth} 1st
      </p>
    </div>
  );

  const progressBar = (
    <div className="w-full h-1.5 bg-[#F4F1EA] rounded-full mb-2">
      <div
        className="h-full rounded-full transition-all duration-500 ease-out"
        style={{ width: `${progress}%`, backgroundColor: theme.accent }}
      />
    </div>
  );

  const topNav = (
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
          onClick={handleSkipPhoto}
          className="text-sm text-[#868581] hover:text-[#242832] transition-colors">
          Skip for now
        </button>
      ) : (
        <div />
      )}
    </div>
  );

  const stepContent = (
    <div className="w-full">

      {/* ── Step 1: Scenario ── */}
      {step === 'scenario' && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-[1.5rem] font-semibold text-[#242832]">
              {variant === 'military' ? 'Where is your service member based?' : "Who's this magazine for?"}
            </h2>
            <p className="text-[0.875rem] text-[#868581]">
              {variant === 'military'
                ? 'We ship anywhere in the USA and to APO/FPO/DPO addresses worldwide.'
                : "We'll turn your family's photos into a printed magazine — beautifully laid out and mailed to them every month."}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {(variant === 'military' ? MILITARY_SCENARIOS : SCENARIOS).map((s) => (
              <button
                key={s.id}
                onClick={() => handleScenarioSelect(s.id)}
                className="flex items-center gap-4 p-4 rounded-2xl border-2 border-[#DEDBD5] hover:border-[var(--accent)] hover:-translate-y-0.5 hover:shadow-sm active:scale-[0.99] transition-all text-left">
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

      {/* ── Step 2: Collaboration ── */}
      {step === 'collaboration' && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-[1.5rem] font-semibold text-[#242832]">
              Who&apos;s adding the photos?
            </h2>
            <p className="text-[0.875rem] text-[#868581]">
              Invite family and everyone posts from their own phone. More hands means richer issues &mdash; and less work for you.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => handleCollaborationSelect('solo')}
              className="flex items-center gap-4 p-4 rounded-2xl border-2 border-[#DEDBD5] hover:border-[var(--accent)] hover:-translate-y-0.5 hover:shadow-sm active:scale-[0.99] transition-all text-left">
              <span className="text-2xl flex-shrink-0">🙋</span>
              <div>
                <p className="text-base font-medium text-[#242832]">Just me</p>
                <p className="text-sm text-[#868581]">I&apos;ll add the photos and stories</p>
              </div>
            </button>
            <button
              onClick={() => handleCollaborationSelect('together')}
              className="flex items-center gap-4 p-4 rounded-2xl border-2 border-[#DEDBD5] hover:border-[var(--accent)] hover:-translate-y-0.5 hover:shadow-sm active:scale-[0.99] transition-all text-left">
              <span className="text-2xl flex-shrink-0">👨‍👩‍👧‍👦</span>
              <div>
                <p className="text-base font-medium text-[#242832]">With family &amp; friends</p>
                <p className="text-sm text-[#868581]">Everyone pitches in with their own photos</p>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* ── Step 2b: Invite family & friends (only when building together) ── */}
      {step === 'invite' && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-[1.5rem] font-semibold text-[#242832]">
              Who else should contribute?
            </h2>
            <p className="text-[0.875rem] text-[#868581]">
              Add their emails and we&apos;ll invite them to post photos too. More contributors means richer issues &mdash; you can always add people later.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {inviteEmails.map((inviteEmail, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => updateInviteEmail(index, e.target.value)}
                  placeholder="Family member's email"
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-[#DEDBD5] bg-[#FCFBF8] text-[#242832] text-base placeholder-[#868581] focus:border-[var(--accent)] focus:outline-none"
                />
                {inviteEmails.length > 1 && (
                  <button
                    onClick={() => removeInviteEmail(index)}
                    className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-[#868581] hover:text-[var(--accent)] hover:bg-[#F4F1EA] transition-colors"
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
              className="flex items-center gap-2 text-sm font-medium transition-colors w-fit"
              style={{ color: theme.accent }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14" /><path d="M5 12h14" />
              </svg>
              Add another
            </button>
          )}

          <button
            onClick={handleInviteNext}
            className="w-full py-3 rounded-[12px] border-2 text-white text-base font-medium transition-colors"
            style={primaryStyle}>
            {inviteEmails.some((e) => e.trim()) ? 'Send invites & continue' : "I'll do this later"}
          </button>
        </div>
      )}

      {/* ── Step 3: First Photo ── */}
      {step === 'firstPost' && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-[1.5rem] font-semibold text-[#242832]">{photoHeading}</h2>
            <p className="text-[0.875rem] text-[#868581]">
              Any favorite recent memories &mdash; up to 20 photos in each issue.
            </p>
          </div>

          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full rounded-2xl border-2 border-dashed border-[#DEDBD5] hover:border-[var(--accent)] transition-colors overflow-hidden"
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

          {imageFile && (
            <div className="relative">
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value.slice(0, 200))}
                placeholder="Write a caption (optional)"
                rows={2}
                className="w-full px-4 py-3 rounded-xl border-2 border-[#DEDBD5] bg-[#FCFBF8] text-[#242832] text-base placeholder-[#868581] focus:border-[var(--accent)] focus:outline-none resize-none"
              />
              <span className="absolute bottom-2 right-3 text-xs text-[#868581]">{caption.length}/200</span>
            </div>
          )}

          {imageFile && (
            <button
              onClick={() => goToStep('preview')}
              className="w-full py-3 rounded-[12px] border-2 text-white text-base font-medium transition-colors"
              style={primaryStyle}>
              Add to Magazine
            </button>
          )}
        </div>
      )}

      {/* ── Step 4: Magazine Preview ── */}
      {step === 'preview' && (
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col gap-2 w-full">
            <h2 className="text-[1.5rem] font-semibold text-[#242832] text-center">
              Here&apos;s how it&apos;ll look
            </h2>
            <p className="text-[0.875rem] text-[#868581] text-center">
              Printed on premium glossy paper, 8.5&times;11. Free shipping anywhere in the USA.
            </p>
          </div>

          {/* Magazine preview — fanned-out pages */}
          <div className="relative w-full max-w-[360px] mx-auto" style={{ height: '340px' }}>
            {/* Cover page (left, behind) */}
            <div className="absolute top-4 left-0 w-[65%] bg-white shadow-md border border-[#E8E5DF] overflow-hidden"
                 style={{ aspectRatio: '8.5/11', transform: 'rotate(-4deg)' }}>
              <div className="absolute inset-0 flex flex-col p-[6%]">
                <div className="flex items-center justify-between">
                  <p className="text-[7px] font-medium text-[#C15F3C]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} &bull; Issue 1
                  </p>
                  <p className={`text-[9px] text-[#C15F3C] ${damion.className}`}>
                    Your Family
                  </p>
                </div>
                <div className="pt-1.5 w-full">
                  <Image src={TitleLogo} alt="Cher Ami" className="w-full h-auto" />
                </div>
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="w-[45%]">
                    <Image src={HedgehogIllustration} alt="" className="w-full h-auto" />
                  </div>
                </div>
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
                <div className="flex flex-1 flex-col gap-y-[8%] content-start pt-[2%]">
                  <div className="flex-1 grid grid-cols-2 gap-x-[3%]">
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
                <div className="pt-1">
                  <p className="text-[6px] text-[#242832] font-bold text-left">
                    2 <span className={`${damion.className} pl-1 text-[7px]`}>Cher Ami</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={nextStep}
            className="w-full py-3 rounded-[12px] border-2 text-white text-base font-medium transition-colors"
            style={primaryStyle}>
            Continue
          </button>
        </div>
      )}

      {/* ── Step 5: Recipient Name (only for "other" / military scenarios) ── */}
      {step === 'recipientName' && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-[1.5rem] font-semibold text-[#242832]">
              {variant === 'military' ? 'Who is this magazine for?' : 'What should we call them?'}
            </h2>
            <p className="text-[0.875rem] text-[#868581]">
              We&apos;ll print their name on the cover of every issue.
            </p>
          </div>
          <input
            type="text"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value.slice(0, 100))}
            onKeyDown={(e) => { if (e.key === 'Enter' && recipientName.trim()) nextStep(); }}
            placeholder={variant === 'military' ? 'e.g. SGT Davis, Mom, Jake' : 'e.g. Grandma, Mom & Dad, Uncle Joe'}
            className="w-full px-4 py-3 rounded-xl border-2 bg-[#FCFBF8] text-[#242832] text-base placeholder-[#868581] focus:outline-none"
            style={{ borderColor: recipientName.trim() ? theme.accent : '#DEDBD5' }}
            autoFocus
          />
          <button
            onClick={nextStep}
            disabled={!recipientName.trim()}
            className={`w-full py-3 rounded-[12px] border-2 text-base font-medium transition-colors ${
              !recipientName.trim()
                ? 'bg-[#ECEDEF] border-[#ECEDEF] text-[#A8ABB3]'
                : 'text-white'
            }`}
            style={recipientName.trim() ? primaryStyle : undefined}>
            Next
          </button>
        </div>
      )}

      {/* ── Step 6: Your Name ── */}
      {step === 'yourName' && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-[1.5rem] font-semibold text-[#242832]">
              What&apos;s your name?
            </h2>
            <p className="text-[0.875rem] text-[#868581]">
              Your photos are private &mdash; only people you invite can see them. No ads, no data sharing, ever.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value.slice(0, 100))}
              placeholder="First name"
              className="w-full px-4 py-3 rounded-xl border-2 border-[#DEDBD5] bg-[#FCFBF8] text-[#242832] text-base placeholder-[#868581] focus:border-[var(--accent)] focus:outline-none"
              autoFocus
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value.slice(0, 100))}
              onKeyDown={(e) => { if (e.key === 'Enter' && firstName.trim() && lastName.trim()) handleNameNext(); }}
              placeholder="Last name"
              className="w-full px-4 py-3 rounded-xl border-2 border-[#DEDBD5] bg-[#FCFBF8] text-[#242832] text-base placeholder-[#868581] focus:border-[var(--accent)] focus:outline-none"
            />
          </div>
          <button
            onClick={handleNameNext}
            disabled={!firstName.trim() || !lastName.trim()}
            className={`w-full py-3 rounded-[12px] border-2 text-base font-medium transition-colors ${
              !firstName.trim() || !lastName.trim()
                ? 'bg-[#ECEDEF] border-[#ECEDEF] text-[#A8ABB3]'
                : 'text-white'
            }`}
            style={firstName.trim() && lastName.trim() ? primaryStyle : undefined}>
            {needsEmail ? 'Next' : 'Claim my free magazine'}
          </button>
        </div>
      )}

      {/* ── Step 7: Email ── */}
      {step === 'email' && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-[1.5rem] font-semibold text-[#242832]">
              Where should we send it?
            </h2>
            <p className="text-[0.875rem] text-[#868581]">
              Your first magazine is on us, shipping included. No long-term commitment &mdash; cancel anytime.
            </p>
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && email.trim()) completeWizard(); }}
            placeholder="you@email.com"
            className="w-full px-4 py-3 rounded-xl border-2 border-[#DEDBD5] bg-[#FCFBF8] text-[#242832] text-base placeholder-[#868581] focus:border-[var(--accent)] focus:outline-none"
            autoFocus
          />
          <button
            onClick={completeWizard}
            disabled={!email.trim()}
            className={`w-full py-3 rounded-[12px] border-2 text-base font-medium transition-colors ${
              !email.trim()
                ? 'bg-[#ECEDEF] border-[#ECEDEF] text-[#A8ABB3]'
                : 'text-white'
            }`}
            style={email.trim() ? primaryStyle : undefined}>
            Claim my free magazine
          </button>
          <p className="text-[0.75rem] text-[#676D7B] text-center">
            We&apos;ll only use this to set up your account. Unsubscribe anytime.
            One free magazine per family.
          </p>
        </div>
      )}

      {/* ── Step 8: Done ── */}
      {step === 'done' && (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-4">
            <h2 className="text-[1.5rem] font-semibold text-[#242832] text-center">
              You&apos;re all set! 🎉
            </h2>
            <p className="text-[0.875rem] text-[#868581] text-center">
              Download the app to add more photos, invite family, and confirm the shipping address.
              {printMonth ? ` Your first issue prints ${printMonth} 1st.` : ''}
            </p>
          </div>
          <div className="flex flex-col gap-3 items-center">
            <DynamicCTA trackingProps={{ location: 'start-wizard' }} />
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div
      className="flex flex-col w-full"
      style={{ '--accent': theme.accent, '--accent-hover': theme.accentHover } as React.CSSProperties}>
      {layout === 'page' ? (
        <div className="flex flex-col md:flex-row md:items-stretch gap-6 md:gap-10 w-full">
          {/* Benefit rail — desktop only */}
          <aside className="hidden md:flex md:w-[42%] flex-col justify-center items-center text-center gap-6 rounded-3xl bg-[#F7F4EE] p-8">
            {renderIllo('w-full max-w-[240px] h-[200px]')}
            {media.benefit && (
              <p key={`benefit-${step}`} className="animate-fade-in text-[1.05rem] font-medium text-[#242832] max-w-[260px] leading-relaxed">
                {media.benefit}
              </p>
            )}
            {printNotice}
          </aside>

          {/* Step column */}
          <div className="flex-1 flex flex-col">
            {/* Illustration + reassurance on top for mobile */}
            <div className="md:hidden flex flex-col items-center gap-3 mb-4">
              {renderIllo('w-[130px] h-[104px]')}
              {printNotice}
            </div>
            {progressBar}
            {topNav}
            <div key={step} className="animate-rise">
              {stepContent}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full">
          <div className="flex justify-center mb-4">
            {renderIllo('w-[130px] h-[100px]')}
          </div>
          {progressBar}
          {topNav}
          <div key={step} className="animate-rise">
            {stepContent}
          </div>
        </div>
      )}
    </div>
  );
}
