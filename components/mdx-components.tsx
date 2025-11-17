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
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt || ""} className="rounded-lg my-4" {...props} />
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
        className="rounded-lg my-4"
        {...props}
      />
    );
  },
};
