import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type PostMeta = {
  title: string;
  description?: string;
  date: string;
  category?: string;
  products?: string[];
  useCase?: string[];
  /** Card thumbnail background (hex), e.g. #5B9BD5 */
  themeColor?: string;
  /** Optional emoji or single char shown on the card */
  heroIcon?: string;
};

export type Post = PostMeta & {
  slug: string;
  content: string;
  readingTimeMin: number;
};

function readingTimeFromText(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const m = data as Partial<PostMeta>;
  if (!m.title || !m.date) return null;
  return {
    slug,
    title: m.title,
    description: m.description,
    date: m.date,
    category: m.category,
    products: m.products,
    useCase: m.useCase,
    themeColor: m.themeColor,
    heroIcon: m.heroIcon,
    content,
    readingTimeMin: readingTimeFromText(content),
  };
}

export function getAllPosts(): Post[] {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is Post => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllCategories(posts: Post[]): string[] {
  const s = new Set<string>();
  for (const p of posts) {
    if (p.category) s.add(p.category);
  }
  return [...s].sort();
}

export function getAllProducts(posts: Post[]): string[] {
  const s = new Set<string>();
  for (const p of posts) {
    for (const x of p.products ?? []) s.add(x);
  }
  return [...s].sort();
}

export function getAllUseCases(posts: Post[]): string[] {
  const s = new Set<string>();
  for (const p of posts) {
    for (const x of p.useCase ?? []) s.add(x);
  }
  return [...s].sort();
}
