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

type Option = {
  tag: string;
  text: string;
}

type OptionsProps = {
  options: Option[];
  setAnswer: (answer: string) => any;
  onNext: () => any;
};

function Options({options, setAnswer, onNext}: OptionsProps) {
  return (
    <div className="grid gap-3">
      {options.map((o: Option) => (
        <button
          key={o.tag}
          onClick={() => { setAnswer(o.tag); onNext(); }}
          className="text-left px-4 py-3 rounded-lg border-1 border-[#242832] text-[#242832] hover:shadow-md active:bg-[#ECEDEF] cursor-pointer"
        >
          {o.text}
        </button>
      ))}
      </div>
  );
}


export function Question1({ answers, setAnswer, onNext }: any) {
  const options = [
    { tag: "grandparents", text: "Grandparents" },
    { tag: "family", text: "Family" },
    { tag: "friends", text: "Friends" },
    { tag: "self", text: "I'd like to receive my own photos" },
    { tag: "is_recipient", text: "I'd like to receive someone else's photos" },
  ];

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
    { tag: "distance", text: "Long distance — they live far away" },
    { tag: "physical", text: "I love physical albums / coffee-table books" }
  ];

  if (answers.receiver === "self") {
    // skip this question automatically
    setTimeout(onNext, 0);
    return null;
  }

  const title = answers.receiver === "is_recipient" ? "Why do you want to receive a Cher Ami?" : "Why do you want to send a Cher Ami?";

  return (
    <Question title={title} description="Choose what matters most.">
      <Options
        options={options}
        setAnswer={(ans: string) => setAnswer({ reason: ans })}
        onNext={onNext}
        />
    </Question>
  );
}

export function Question3({ answers, setAnswer, onNext }: any) {
  const options = [
    { tag: "family", text: "With family" },
    { tag: "friends", text: "With friends" },
    { tag: "myself", text: "By myself" }
  ];

  if (answers.receiver === "self") {
    // skip this question automatically
    setTimeout(onNext, 0);
    return null;
  }

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...answers,
      name,
      email,
    };

    try {
      const res = await fetch('/api/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to submit');
    } catch (err) {
      console.error(err);
    }

    window.location.href = `https://thecherami.com/?utm_source=quiz_completed`;
  };

  return (
    <Question title="Almost done — enter your name & email">
      <form className="space-y-3" onSubmit={handleSubmit}>
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
            type="submit"
            className="flex-1 bg-[#C15F3C] text-white px-4 py-3 rounded-xl hover:bg-[#B05637] active:bg-[#B05637] cursor-pointer"
          >
            Continue to site
          </button>
        </div>
        <p className="text-[0.75rem] text-[#676D7B]">We only use your email to help you get started. You can unsubscribe anytime.</p>
      </form>
    </Question>
  );
}