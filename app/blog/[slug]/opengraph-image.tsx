import { getBlogPost } from "@/lib/blog";
import { personalInfo } from "@/lib/constants";
import { ImageResponse } from "next/og";

export const alt = "Blog post preview";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  const title = post?.title ?? personalInfo.name;

  return new ImageResponse(
    <div
      style={{
        background:
          "linear-gradient(150deg, #FFD1FF 0%, #FAD0C4 30%, #D4D3FF 65%, #C2E9FB 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        color: "#0a0a0a",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 32,
          fontWeight: 600,
          letterSpacing: "-0.03em",
        }}
      >
        <span>{personalInfo.name}</span>
        <span>Blog</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <div
          style={{
            fontSize: 86,
            fontWeight: 600,
            letterSpacing: "-0.06em",
            lineHeight: 0.95,
            maxWidth: 980,
          }}
        >
          {title}
        </div>
        {post?.date && (
          <div
            style={{
              display: "flex",
              fontSize: 30,
              fontWeight: 500,
              opacity: 0.75,
            }}
          >
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              timeZone: "UTC",
            })}
            {post.readingTime ? ` - ${post.readingTime}` : ""}
          </div>
        )}
      </div>
    </div>,
    size
  );
}
