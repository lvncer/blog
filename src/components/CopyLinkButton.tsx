"use client";

import { useState } from "react";

export function CopyLinkButton() {
  const [done, setDone] = useState(false);

  return (
    <button
      type="button"
      className="text-left text-sm text-zinc-100 underline decoration-zinc-600 underline-offset-4 transition hover:text-white"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(window.location.href);
          setDone(true);
          setTimeout(() => setDone(false), 2000);
        } catch {
          setDone(false);
        }
      }}
    >
      {done ? "Copied" : "Copy link"}
    </button>
  );
}
