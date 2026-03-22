import type { Post } from "@/lib/posts";

export function ArticleHero({ post }: { post: Post }) {
  const mark = post.heroIcon?.trim() || "◆";
  const iconBg = post.themeColor ?? "#5eb3e8";

  return (
    <div className="w-full max-w-2xl text-left">
      <div
        className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl shadow-lg"
        style={{ backgroundColor: iconBg, color: "#0a0a0a" }}
        aria-hidden
      >
        {mark}
      </div>
      <h1 className="font-serif text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl lg:text-[2.75rem]">
        {post.title}
      </h1>
      {post.description ? (
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
          {post.description}
        </p>
      ) : null}
    </div>
  );
}
