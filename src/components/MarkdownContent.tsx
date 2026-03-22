import Image from "next/image";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import rehypeUnwrapImages from "rehype-unwrap-images";
import remarkGfm from "remark-gfm";

function MdImage({ src, alt }: { src?: string; alt?: string }) {
  const s = src ?? "";
  if (!s) return null;
  const isLocal = s.startsWith("/") && !s.startsWith("//");

  return (
    <figure className="my-10">
      <div className="flex justify-center rounded-2xl bg-[#f0f0e8] p-8 md:p-10">
        {isLocal ? (
          <Image
            src={s}
            alt={alt ?? ""}
            width={1200}
            height={800}
            className="max-h-[480px] w-auto max-w-full object-contain"
          />
        ) : (
          // biome-ignore lint/performance/noImgElement: external URLs from markdown
          <img
            src={s}
            alt={alt ?? ""}
            className="max-h-[480px] w-auto max-w-full object-contain"
          />
        )}
      </div>
      {alt ? (
        <figcaption className="mt-3 text-center text-sm text-zinc-500">
          {alt}
        </figcaption>
      ) : null}
    </figure>
  );
}

const components: Components = {
  h1: ({ children }) => (
    <h1 className="mb-6 mt-12 font-serif text-3xl font-bold tracking-tight text-zinc-50 first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mb-4 mt-10 font-serif text-2xl font-semibold text-zinc-50">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-3 mt-8 font-serif text-xl font-semibold text-zinc-100">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mb-5 text-[1.05rem] leading-[1.75] text-zinc-300">
      {children}
    </p>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-zinc-200 underline decoration-zinc-600 underline-offset-4 transition hover:text-white"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="mb-6 ml-1 list-disc space-y-2 pl-5 text-zinc-300 marker:text-zinc-500">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-6 ml-1 list-decimal space-y-2 pl-5 text-zinc-300 marker:text-zinc-500">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => (
    <strong className="font-semibold text-zinc-100">{children}</strong>
  ),
  em: ({ children }) => <em className="italic text-zinc-200">{children}</em>,
  hr: () => <hr className="my-10 border-zinc-800" />,
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-zinc-600 pl-4 text-zinc-400">
      {children}
    </blockquote>
  ),
  code: ({ className, children }) => {
    const inline = !className;
    if (inline) {
      return (
        <code className="rounded bg-zinc-800/80 px-1.5 py-0.5 text-[0.9em] text-emerald-200/90">
          {children}
        </code>
      );
    }
    return <code className={className}>{children}</code>;
  },
  pre: ({ children }) => (
    <pre className="mb-6 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-sm text-zinc-200">
      {children}
    </pre>
  ),
  img: (props) => (
    <MdImage
      src={typeof props.src === "string" ? props.src : undefined}
      alt={props.alt}
    />
  ),
};

export function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="md-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeUnwrapImages]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
