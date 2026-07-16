'use client';

import posthog from 'posthog-js';

export default function PrintButton() {
  return (
    <button
      onClick={() => {
        posthog.capture('community_flyer_print_pressed');
        window.print();
      }}
      className="py-3 px-5 bg-[#C15F3C] hover:bg-[#b05637] active:bg-[#b05637] rounded-[12px] shadow-md cursor-pointer">
      <p className="text-[1rem] text-white font-medium text-center">
        Print this flyer
      </p>
    </button>
  );
}
