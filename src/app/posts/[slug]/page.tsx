import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleHero } from "@/components/ArticleHero";
import { ArticleMeta } from "@/components/ArticleMeta";
import { MarkdownContent } from "@/components/MarkdownContent";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-[#111111] text-zinc-100">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        <header className="border-b border-zinc-800/80 py-12">
          <Link
            href="/"
            className="mb-10 inline-block text-sm text-zinc-500 transition hover:text-zinc-300"
          >
            ← All posts
          </Link>
          <div className="flex flex-col lg:flex-row lg:items-start gap-0">
            <div className="flex w-full flex-1 justify-center lg:min-w-0">
              <ArticleHero post={post} />
            </div>
            <ArticleMeta post={post} />
          </div>
        </header>
        <article className="mx-auto max-w-3xl py-14">
          <MarkdownContent content={post.content} />
        </article>
      </div>
    </div>
  );
}
