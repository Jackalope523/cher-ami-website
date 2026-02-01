'use client'

import React, { useState } from "react";

type QuestionProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function Question({ title, description, children }: QuestionProps) {
  return (
    <div>
      <h2 className="text-[1.05rem] font-semibold text-[#242832]">{title}</h2>
      {description && <p className="mt-2 text-sm text-[#41485a]">{description}</p>}
      <div className="mt-4">{children}</div>
    </div>
  );
}

type OptionsProps = {
  options: string[];
  setAnswer: (answer: string) => any;
  onNext: () => any;
};

function Options({options, setAnswer, onNext}: OptionsProps) {
  return (
    <div className="grid gap-3">
      {options.map((o: string) => (
        <button
          key={o}
          onClick={() => { setAnswer(o); onNext(); }}
          className="text-left px-4 py-3 rounded-lg border-1 border-[#242832] text-[#242832] hover:shadow-md active:bg-[#ECEDEF] cursor-pointer"
        >
          {o}
        </button>
      ))}
      </div>
  );
}


export function Question1({ answers, setAnswer, onNext }: any) {
  const options = ["Myself", "Grandparents", "Family", "Friends", "I'd like to receive someone else's photos"];
  return (
    <Question title="Who would you like to receive the photos?" description="Pick the main recipient — this helps tailor the experience.">
      <Options
        options={options}
        setAnswer={(ans: string) => setAnswer({ receiver: ans })}
        onNext={onNext}
        />
    </Question>
  );
}
export function Question2({ answers, setAnswer, onNext, onBack }: any) {
  const options = [
    "Long distance — they live far away",
    "I love physical albums / coffee-table books"
  ];

  // Only show if receiver is not "Just myself" or is "No one yet"
  if (answers.receiver === "Myself") {
    // skip this question automatically
    setTimeout(onNext, 0);
    return null;
  }

  return (
    <Question title="Why do you want to send a Cher Ami?" description="Choose what matters most.">
      <Options
        options={options}
        setAnswer={(ans: string) => setAnswer({ reason: ans })}
        onNext={onNext}
        />
    </Question>
  );
}

export function Question3({ answers, setAnswer, onNext }: any) {
  const options = ["By myself", "With friends", "With family"];
  return (
    <Question title="Would you create your Cher Ami by yourself or with others?">
      <Options
        options={options}
        setAnswer={(ans: string) => setAnswer({ who: ans })}
        onNext={onNext}
      />
    </Question>
  );
}

export function FinalStep({ answers, setAnswer, onNext, onBack }: any) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const submit = () => {
    const payload = {
      ...answers,
      name,
      email,
    };

    try {
      fetch('/api/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error(err);
    }

    window.location.href = `https://thecherami.com/?utm_source=quiz_completed`;
  };

  return (
    <Question title="Almost done — enter your name & email">
      <div className="space-y-3">
        <input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name (optional)"
          className="w-full px-4 py-3 rounded-lg border-1 border-[#242832] text-[#242832]"
          autoComplete="name"
        />
        <input
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email (we’ll send a quick welcome)"
          className="w-full px-4 py-3 rounded-lg border-1 border-[#242832] text-[#242832]"
          type="email"
        />
        <div className="flex gap-3">
          <button
            onClick={submit}
            className="flex-1 bg-[#C15F3C] text-white px-4 py-3 rounded-xl hover:bg-[#B05637] active:bg-[#B05637] cursor-pointer"
          >
            Continue to site
          </button>
        </div>
        <p className="text-[0.75rem] text-[#676D7B]">We only use your email to help you get started. You can unsubscribe anytime.</p>
      </div>
    </Question>
  );
}