import { CodeBlock } from "@/components/code-block";
import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ImgProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src?: string;
  alt?: string;
};

export function Callout({
  children,
  title = "Note",
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <aside className="bg-muted/60 border-border my-6 rounded-xl border p-4">
      <p className="text-foreground mb-1 text-sm font-medium">{title}</p>
      <div className="text-muted-foreground space-y-2 text-sm leading-relaxed">
        {children}
      </div>
    </aside>
  );
}

export const mdxImageComponents: MDXComponents = {
  a: ({ href = "", children, ...props }: ComponentPropsWithoutRef<"a">) => {
    const isExternal = href.startsWith("http");

    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline underline-offset-4 hover:no-underline"
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className="text-foreground underline underline-offset-4 hover:no-underline"
      >
        {children}
      </Link>
    );
  },
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="mt-10 mb-4 text-2xl font-medium tracking-tight" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mt-8 mb-3 text-xl font-medium tracking-tight" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="leading-relaxed" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="border-border text-muted-foreground my-6 border-l-2 pl-4 italic"
      {...props}
    />
  ),
  img: ({ src, alt, width, height, ...props }: ImgProps) => {
    if (!src) return null;

    if (src.startsWith("http")) {
      return (
        <figure className="my-6 space-y-2">
          <Image
            src={src}
            alt={alt || ""}
            width={width ? Number(width) : 1200}
            height={height ? Number(height) : 675}
            className="rounded-xl"
            unoptimized={false}
            {...props}
          />
          {alt && (
            <figcaption className="text-muted-foreground text-center text-sm">
              {alt}
            </figcaption>
          )}
        </figure>
      );
    }

    const imageWidth =
      typeof width === "number"
        ? width
        : typeof width === "string"
          ? parseInt(width, 10)
          : 800;
    const imageHeight =
      typeof height === "number"
        ? height
        : typeof height === "string"
          ? parseInt(height, 10)
          : 600;

    return (
      <figure className="my-6 space-y-2">
        <Image
          src={src}
          alt={alt || ""}
          width={imageWidth}
          height={imageHeight}
          className="rounded-xl"
          {...props}
        />
        {alt && (
          <figcaption className="text-muted-foreground text-center text-sm">
            {alt}
          </figcaption>
        )}
      </figure>
    );
  },
  pre: ({
    children,
    className,
    ...props
  }: React.HTMLAttributes<HTMLPreElement>) => {
    return (
      <CodeBlock className={className} {...props}>
        {children}
      </CodeBlock>
    );
  },
  Callout,
};
