import type { ReactNode } from "react";
import { CopyLinkButton } from "@/components/CopyLinkButton";
import type { Post } from "@/lib/posts";

function formatLongDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function IconBulb() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      className="text-zinc-500"
    >
      <title>Category</title>
      <path
        d="M9 21h6M12 3a6 6 0 0 0-3 11.2V19a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4.8A6 6 0 0 0 12 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconSpark() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      className="text-zinc-500"
    >
      <title>Product</title>
      <path
        d="m12 3 1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconCal() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      className="text-zinc-500"
    >
      <title>Date</title>
      <rect
        x="3"
        y="5"
        width="18"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M3 10h18M8 3v4M16 3v4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconClock() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      className="text-zinc-500"
    >
      <title>Reading time</title>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 7v6l3 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconShare() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      className="text-zinc-500"
    >
      <title>Share</title>
      <path
        d="M12 3v12M8 7l4-4 4 4M5 21h14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type RowProps = {
  icon: ReactNode;
  label: string;
  children: ReactNode;
};

function MetaRow({ icon, label, children }: RowProps) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 shrink-0">{icon}</div>
      <div className="min-w-0">
        <p className="text-xs text-zinc-500">{label}</p>
        <div className="text-sm text-zinc-100">{children}</div>
      </div>
    </div>
  );
}

export function ArticleMeta({ post }: { post: Post }) {
  return (
    <aside className="flex shrink-0 flex-col gap-8 lg:max-w-xs lg:pt-2">
      {post.category ? (
        <MetaRow icon={<IconBulb />} label="Category">
          <span className="underline decoration-zinc-600 underline-offset-4">
            {post.category}
          </span>
        </MetaRow>
      ) : null}
      {post.products && post.products.length > 0 ? (
        <MetaRow icon={<IconSpark />} label="Product">
          <ul className="space-y-1">
            {post.products.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </MetaRow>
      ) : null}
      <MetaRow icon={<IconCal />} label="Date">
        {formatLongDate(post.date)}
      </MetaRow>
      <MetaRow icon={<IconClock />} label="Reading time">
        {post.readingTimeMin} min
      </MetaRow>
      <MetaRow icon={<IconShare />} label="Share">
        <CopyLinkButton />
      </MetaRow>
    </aside>
  );
}
