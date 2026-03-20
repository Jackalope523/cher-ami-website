'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGetCircleQuery } from '@/lib/hooks';
import WizardShell from '@/components/app/wizard/WizardShell';
import WelcomeStep from '@/components/app/wizard/WelcomeStep';
import RecipientNameStep from '@/components/app/wizard/RecipientNameStep';
import FirstPostStep from '@/components/app/wizard/FirstPostStep';
import InviteStep from '@/components/app/wizard/InviteStep';
import MagazinePreview from '@/components/app/wizard/MagazinePreview';
import ShipItStep from '@/components/app/wizard/ShipItStep';
import DoneStep from '@/components/app/wizard/DoneStep';

type Step = 'welcome' | 'recipientName' | 'firstPost' | 'invite' | 'magazinePreview' | 'shipIt' | 'done';

const STEP_ORDER: Step[] = ['welcome', 'recipientName', 'firstPost', 'invite', 'magazinePreview', 'shipIt', 'done'];

export default function GettingStartedPage() {
  const router = useRouter();
  const circleQuery = useGetCircleQuery();

  const [step, setStep] = useState<Step>('welcome');
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [recipientName, setRecipientName] = useState<string | null>(null);
  const [postedImageUrl, setPostedImageUrl] = useState<string | null>(null);
  const [postedCaption, setPostedCaption] = useState('');

  // If wizard already completed, redirect to feed
  useEffect(() => {
    if (localStorage.getItem('wizardComplete') === 'true') {
      router.replace('/app/feed');
    }
  }, [router]);

  const currentIndex = STEP_ORDER.indexOf(step);

  function markComplete(stepName: string) {
    setCompletedSteps((prev) => new Set([...prev, stepName]));
  }

  function goToStep(target: Step) {
    setStep(target);
  }

  function nextStep() {
    const nextIndex = currentIndex + 1;
    if (nextIndex < STEP_ORDER.length) {
      setStep(STEP_ORDER[nextIndex]);
    }
  }

  function prevStep() {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      setStep(STEP_ORDER[prevIndex]);
    }
  }

  function handleSkip() {
    // For MagazinePreview → skip ShipIt and go to Done
    if (step === 'magazinePreview' && !recipientName) {
      goToStep('done');
      return;
    }
    // For ShipIt → go to Done
    if (step === 'shipIt') {
      goToStep('done');
      return;
    }
    nextStep();
  }

  function handleBack() {
    // From ShipIt, if no recipientName, skip back over MagazinePreview too
    // Actually keep it simple — just go to previous step in order
    prevStep();
  }

  // Determine shell props per step
  const showBack = step !== 'welcome';
  const showSkip = !['welcome', 'magazinePreview', 'done'].includes(step);
  // MagazinePreview has its own CTA, Done has no skip

  const circleName = circleQuery.data?.title || 'Your Circle';

  // Mark wizard complete when reaching Done
  if (step === 'done' && localStorage.getItem('wizardComplete') !== 'true') {
    localStorage.setItem('wizardComplete', 'true');
  }

  function renderStep() {
    switch (step) {
      case 'welcome':
        return (
          <WelcomeStep
            circleName={circleName}
            onNext={nextStep}
          />
        );

      case 'recipientName':
        return (
          <RecipientNameStep
            onNext={(name) => {
              setRecipientName(name);
              markComplete('recipientName');
              nextStep();
            }}
          />
        );

      case 'firstPost':
        return (
          <FirstPostStep
            recipientName={recipientName}
            onNext={(imageUrl, caption) => {
              setPostedImageUrl(imageUrl);
              setPostedCaption(caption);
              markComplete('firstPost');
              nextStep();
            }}
          />
        );

      case 'invite':
        return (
          <InviteStep
            recipientName={recipientName}
            onNext={() => {
              markComplete('invite');
              nextStep();
            }}
          />
        );

      case 'magazinePreview':
        return (
          <MagazinePreview
            recipientName={recipientName}
            postedImageUrl={postedImageUrl}
            postedCaption={postedCaption}
            onNext={() => {
              if (recipientName) {
                goToStep('shipIt');
              } else {
                goToStep('done');
              }
            }}
          />
        );

      case 'shipIt':
        return (
          <ShipItStep
            recipientName={recipientName!}
            onNext={() => {
              markComplete('shipIt');
              goToStep('done');
            }}
          />
        );

      case 'done':
        return <DoneStep completedSteps={completedSteps} />;

      default:
        return null;
    }
  }

  // Loading state
  if (circleQuery.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FCFBF8]">
        <div className="w-8 h-8 border-4 border-[#C15F3C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <WizardShell
      currentStep={currentIndex}
      totalSteps={STEP_ORDER.length}
      onBack={showBack ? handleBack : undefined}
      onSkip={showSkip ? handleSkip : undefined}
      showBack={showBack}
      showSkip={showSkip}>
      {renderStep()}
    </WizardShell>
  );
}
