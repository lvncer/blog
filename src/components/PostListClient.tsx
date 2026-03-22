"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PostCard } from "@/components/PostCard";
import type { Post } from "@/lib/posts";

type Props = {
  posts: Post[];
  categories: string[];
  products: string[];
  useCases: string[];
};

type SortKey = "newest" | "oldest";

export function PostListClient({
  posts,
  categories,
  products,
  useCases,
}: Props) {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<SortKey>("newest");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [catSel, setCatSel] = useState<Record<string, boolean>>({});
  const [prodSel, setProdSel] = useState<Record<string, boolean>>({});
  const [ucSel, setUcSel] = useState<Record<string, boolean>>({});

  const filtered = useMemo(() => {
    const catActive = Object.entries(catSel)
      .filter(([, v]) => v)
      .map(([k]) => k);
    const prodActive = Object.entries(prodSel)
      .filter(([, v]) => v)
      .map(([k]) => k);
    const ucActive = Object.entries(ucSel)
      .filter(([, v]) => v)
      .map(([k]) => k);
    const qq = q.trim().toLowerCase();

    let list = posts.filter((p) => {
      if (qq) {
        const blob =
          `${p.title} ${p.description ?? ""} ${p.category ?? ""}`.toLowerCase();
        if (!blob.includes(qq)) return false;
      }
      if (
        catActive.length &&
        (!p.category || !catActive.includes(p.category))
      ) {
        return false;
      }
      if (prodActive.length) {
        const ps = p.products ?? [];
        if (!prodActive.some((x) => ps.includes(x))) return false;
      }
      if (ucActive.length) {
        const us = p.useCase ?? [];
        if (!ucActive.some((x) => us.includes(x))) return false;
      }
      return true;
    });

    list = [...list].sort((a, b) => {
      const ta = new Date(a.date).getTime();
      const tb = new Date(b.date).getTime();
      return sort === "newest" ? tb - ta : ta - tb;
    });
    return list;
  }, [posts, q, sort, catSel, prodSel, ucSel]);

  function toggle(
    map: Record<string, boolean>,
    set: (m: Record<string, boolean>) => void,
    key: string,
  ) {
    set({ ...map, [key]: !map[key] });
  }

  return (
    <div className="flex flex-col pb-12 lg:flex-row">
      <aside className="w-full shrink-0 border-zinc-800/80 py-8 lg:w-64 lg:border-r lg:pr-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Filter and sort
        </p>
        <div className="mt-6 space-y-6">
          <label className="block">
            <span className="text-sm text-zinc-400">Sort by</span>
            <select
              className="mt-2 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-200 outline-none focus:border-zinc-600"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </label>

          <fieldset>
            <legend className="text-sm font-medium text-zinc-300">
              Category
            </legend>
            <ul className="mt-2 space-y-2">
              {categories.map((c) => (
                <li key={c}>
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-400">
                    <input
                      type="checkbox"
                      className="rounded border-zinc-600 bg-zinc-950"
                      checked={!!catSel[c]}
                      onChange={() => toggle(catSel, setCatSel, c)}
                    />
                    {c}
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-medium text-zinc-300">
              Product
            </legend>
            <ul className="mt-2 space-y-2">
              {products.map((c) => (
                <li key={c}>
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-400">
                    <input
                      type="checkbox"
                      className="rounded border-zinc-600 bg-zinc-950"
                      checked={!!prodSel[c]}
                      onChange={() => toggle(prodSel, setProdSel, c)}
                    />
                    {c}
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-medium text-zinc-300">
              Use case
            </legend>
            <ul className="mt-2 space-y-2">
              {useCases.map((c) => (
                <li key={c}>
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-400">
                    <input
                      type="checkbox"
                      className="rounded border-zinc-600 bg-zinc-950"
                      checked={!!ucSel[c]}
                      onChange={() => toggle(ucSel, setUcSel, c)}
                    />
                    {c}
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>
        </div>
      </aside>

      <main className="min-w-0 flex-1 py-8 lg:pl-2">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <input
            type="search"
            placeholder="Search posts"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full max-w-md rounded-full border border-zinc-800 bg-zinc-950/80 px-4 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 outline-none focus:border-zinc-600"
          />
          <div className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950/50 p-1">
            <button
              type="button"
              onClick={() => setView("grid")}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                view === "grid"
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Grid
            </button>
            <button
              type="button"
              onClick={() => setView("list")}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                view === "list"
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              List
            </button>
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="text-sm text-zinc-500">No posts match your filters.</p>
        ) : view === "grid" ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        ) : (
          <ul className="divide-y divide-zinc-800/80 rounded-2xl border border-zinc-800/80">
            {filtered.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/posts/${p.slug}`}
                  className="flex gap-4 px-4 py-4 transition hover:bg-zinc-900/50"
                >
                  <div
                    className="h-14 w-20 shrink-0 rounded-lg"
                    style={{
                      backgroundColor: p.themeColor ?? "#5eb3e8",
                    }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-zinc-500">
                      {new Date(p.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <p className="font-serif text-base font-semibold text-zinc-100">
                      {p.title}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
