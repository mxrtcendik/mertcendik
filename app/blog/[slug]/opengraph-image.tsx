import { getBlogPost } from "@/lib/blog";
import { personalInfo } from "@/lib/constants";
import { ogPosts } from "@/lib/og-posts";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { formatDate } from "@/lib/utils";

async function readSlug(
  params: { slug: string } | Promise<{ slug: string }>,
) {
  const value = await params;
  return value.slug;
}

function postFor(slug: string) {
  const embedded = ogPosts[slug];
  if (embedded) return embedded;

  const post = getBlogPost(slug);
  if (!post) return null;

  return { title: post.title, date: post.date };
}

export async function generateImageMetadata({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>;
}) {
  const slug = await readSlug(params);
  const post = postFor(slug);

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
  const slug = await readSlug(params);
  const post = postFor(slug);
  const title = post?.title ?? personalInfo.name;
  const date = post?.date ? formatDate(post.date) : undefined;

  return renderOgImage({
    title,
    detail: date ? `${personalInfo.name} - ${date}` : personalInfo.name,
  });
}
