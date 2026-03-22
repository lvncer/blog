import Link from "next/link";
import type { Post } from "@/lib/posts";

const FALLBACK_COLORS = [
  "#5eb3e8",
  "#e8a55e",
  "#c9a8e8",
  "#e88888",
  "#88c9a0",
  "#b8b8a0",
];

function thumbColor(post: Post): string {
  if (post.themeColor) return post.themeColor;
  let h = 0;
  for (let i = 0; i < post.slug.length; i++)
    h = (h * 31 + post.slug.charCodeAt(i)) | 0;
  return FALLBACK_COLORS[Math.abs(h) % FALLBACK_COLORS.length];
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function PostCard({ post }: { post: Post }) {
  const mark = post.heroIcon?.trim() || post.title.slice(0, 1).toUpperCase();

  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/40 transition hover:border-zinc-700 hover:bg-zinc-900/70"
    >
      <div
        className="relative flex aspect-[16/10] items-center justify-center"
        style={{ backgroundColor: thumbColor(post) }}
      >
        <span className="select-none text-4xl font-semibold text-zinc-950/90 drop-shadow-sm">
          {mark}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <time
          dateTime={post.date}
          className="text-xs font-medium text-zinc-500"
        >
          {formatDate(post.date)}
        </time>
        <h2 className="font-serif text-lg font-semibold leading-snug text-zinc-50 group-hover:text-white">
          {post.title}
        </h2>
        {post.category ? (
          <div className="mt-auto flex items-center gap-1.5 text-xs text-zinc-500">
            <span
              aria-hidden
              className="inline-block h-3 w-3 rounded-full bg-zinc-600"
            />
            <span>{post.category}</span>
          </div>
        ) : (
          <div className="mt-auto h-4" />
        )}
      </div>
    </Link>
  );
}
