import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#111111] px-6 text-zinc-300">
      <p className="font-serif text-2xl text-white">Post not found</p>
      <Link
        href="/"
        className="text-sm underline decoration-zinc-600 underline-offset-4 hover:text-white"
      >
        Back to home
      </Link>
    </div>
  );
}
