import { getBlogPost } from "@/lib/blog";
import { personalInfo } from "@/lib/constants";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { formatDate } from "@/lib/utils";

export async function generateImageMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = getBlogPost(params.slug);

  return [
    {
      id: "og",
      alt: post?.title ?? personalInfo.name,
      size: ogSize,
      contentType: ogContentType,
    },
  ];
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  const title = post?.title ?? personalInfo.name;
  const date = post?.date ? formatDate(post.date) : undefined;

  return renderOgImage({
    title,
    detail: date ? `${personalInfo.name} - ${date}` : personalInfo.name,
  });
}
