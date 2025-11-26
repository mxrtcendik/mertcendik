import { BackToTop } from "@/components/back-to-top";
import { ErrorBoundary } from "@/components/error-boundary";
import { Header } from "@/components/header";
import { mdxImageComponents } from "@/components/mdx-components";
import { PostNavigation } from "@/components/post-navigation";
import { ReadingProgress } from "@/components/reading-progress";
import { SharePost } from "@/components/share-post";
import { Video } from "@/components/video";
import { ViewCounter } from "@/components/view-counter";
import { YouTube } from "@/components/youtube";
import { getBlogPost, getBlogPosts } from "@/lib/blog";
import { personalInfo } from "@/lib/constants";
import { Clock } from "lucide-react";
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

  const description = post.content.slice(0, 160).replace(/\s+/g, " ").trim();

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      publishedTime: post.date,
      url: `${personalInfo.baseUrl}/blog/${slug}`,
      authors: [personalInfo.name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
    },
  };
}

const mdxComponents = {
  Video,
  YouTube,
  Image,
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
      <ReadingProgress />
      <Header />
      <article className="mt-12 space-y-6">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Link
          href="/"
          className="text-muted-foreground hover:text-foreground mb-4 inline-block text-sm"
        >
          ← Back
        </Link>
        <div className="space-y-4">
          <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          <div className="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            {post.date && (
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  timeZone: "UTC",
                })}
              </time>
            )}
            {post.readingTime && (
              <div className="flex items-center gap-1">
                <Clock className="size-3.5" />
                <span>{post.readingTime}</span>
              </div>
            )}
            <ViewCounter slug={slug} increment />
            <SharePost />
          </div>
        </div>
        <div className="[&_a]:text-foreground [&_code]:bg-muted [&_pre]:bg-muted space-y-4 [&_a]:underline [&_a:hover]:no-underline [&_code]:rounded [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-sm [&_h2]:mt-6 [&_h2]:mb-4 [&_h2]:text-xl [&_h2]:font-medium [&_li]:my-1 [&_ol]:ml-6 [&_ol]:list-decimal [&_p]:leading-relaxed [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:p-4 [&_ul]:ml-6 [&_ul]:list-disc">
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
