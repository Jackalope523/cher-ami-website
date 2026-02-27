'use client'

import React, { useMemo, useState } from "react";
import { Question, Question1, Question2, Question3, FinalStep } from "./FeedbackQuestions";

export type FeedbackAnswers = {
  receiver?: string;
  reason?: string;
  who?: string;
  name?: string;
  email?: string;
};

export default function QuizShell() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<FeedbackAnswers>({});
  const steps = useMemo(
    () => [
      { id: "q1", component: Question1 },
      { id: "q2", component: Question2 },
      { id: "q3", component: Question3 },
      { id: "final", component: FinalStep },
    ],
    []
  );

  const total = steps.length;
  const progress = Math.round(((step + 1) / total) * 100);

  const setAnswer = (patch: Partial<FeedbackAnswers>) => {
    setAnswers((s) => ({ ...s, ...patch }));
  };

  const next = () => setStep((s) => Math.min(s + 1, total - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const Active = steps[step].component;

  return (
    <section className="w-xl bg-[#FEFEFD] rounded-2xl shadow-md p-6">
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <div className="text-[0.75rem] text-[#242832]">Question {Math.min(step + 1, total)} / {total}</div>
          <div className="text-[0.75rem] text-[#242832]">{progress}%</div>
        </div>
        <div className="mt-2 h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#C15F3C] transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="min-h-[220px]">
        <Active answers={answers} setAnswer={setAnswer} onNext={next} onBack={back} />
      </div>

      <div className="mt-4 flex justify-between text-[0.75rem] text-[#676d7b]">
        {/*<div>{step > 0 ? <button onClick={back} className="underline cursor-pointer">Back</button> : <span />}</div>*/}
        <div className="italic">Answers help us recommend the best experience.</div>
      </div>
    </section>
  );
}
