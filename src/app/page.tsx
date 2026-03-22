import Link from "next/link";
import { PostListClient } from "@/components/PostListClient";
import {
  getAllCategories,
  getAllPosts,
  getAllProducts,
  getAllUseCases,
} from "@/lib/posts";

export default function HomePage() {
  const posts = getAllPosts();
  const categories = getAllCategories(posts);
  const products = getAllProducts(posts);
  const useCases = getAllUseCases(posts);

  return (
    <div className="min-h-screen bg-[#111111] text-zinc-100">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        <header className="border-b border-zinc-800/80 py-6">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="font-serif text-xl font-semibold tracking-tight text-white"
            >
              lvncer's Blog
            </Link>
          </div>
        </header>
        <PostListClient
          posts={posts}
          categories={categories}
          products={products}
          useCases={useCases}
        />
      </div>
    </div>
  );
}
