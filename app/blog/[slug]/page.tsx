import { BackToTop } from "@/components/back-to-top";
import { ErrorBoundary } from "@/components/error-boundary";
import { mdxImageComponents } from "@/components/mdx-components";
import { PostNavigation } from "@/components/post-navigation";
import { EasingDemo, HoldDemo, PressDemo, HitDemo, ResponseDemo, ContrastDemo } from "@/components/post-demos";
import { SharePost } from "@/components/share-post";
import { Video } from "@/components/video";
import { YouTube } from "@/components/youtube";
import { getBlogPost, getBlogPosts } from "@/lib/blog";
import { personalInfo } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { ClockIcon, ArrowLeftIcon } from "@phosphor-icons/react/ssr";
import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import rehypeHighlight from "rehype-highlight";

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {};
  }

  const description = post.description;
  const url = `${personalInfo.baseUrl}/blog/${slug}`;
  const image = {
    url: `${url}/opengraph-image/og`,
    width: 1200,
    height: 630,
    alt: post.title,
  };

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      publishedTime: post.date,
      url,
      authors: [personalInfo.name],
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [image],
    },
  };
}

const mdxComponents = {
  Video,
  YouTube,
  Image,
  PressDemo,
  EasingDemo,
  HoldDemo,
  HitDemo,
  ResponseDemo,
  ContrastDemo,
  ...mdxImageComponents,
};

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    dateModified: post.date,
    description: post.content.slice(0, 160).replace(/\s+/g, " ").trim(),
    url: `${personalInfo.baseUrl}/blog/${slug}`,
    author: {
      "@type": "Person",
      name: personalInfo.name,
    },
  };

  return (
    <ErrorBoundary>
      <article className="mt-12 space-y-6">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Link
          href="/blog"
          className="text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-1.5 text-sm"
        >
          <ArrowLeftIcon className="size-3.5" />
          Back
        </Link>
        <div className="space-y-4">
          <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          <div className="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            {post.date && (
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            )}
            {post.readingTime && (
              <div className="flex items-center gap-1">
                <ClockIcon className="size-3.5" />
                <span>{post.readingTime}</span>
              </div>
            )}
            <SharePost />
          </div>
        </div>
        <div className="prose space-y-4">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                rehypePlugins: [rehypeHighlight],
              },
            }}
          />
        </div>
        <PostNavigation currentSlug={slug} />
      </article>
      <BackToTop />
    </ErrorBoundary>
  );
}
