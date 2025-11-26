import { CodeBlock } from "@/components/code-block";
import type { MDXComponents } from "mdx/types";
import Image from "next/image";

type ImgProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src?: string;
  alt?: string;
};

export const mdxImageComponents: MDXComponents = {
  img: ({ src, alt, width, height, ...props }: ImgProps) => {
    if (!src) return null;

    if (src.startsWith("http")) {
      return (
        <Image
          src={src}
          alt={alt || ""}
          width={width ? Number(width) : 1200}
          height={height ? Number(height) : 675}
          className="my-4 rounded-lg"
          unoptimized={false}
          {...props}
        />
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
      <Image
        src={src}
        alt={alt || ""}
        width={imageWidth}
        height={imageHeight}
        className="my-4 rounded-lg"
        {...props}
      />
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
};
