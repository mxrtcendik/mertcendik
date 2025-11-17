import { mdxImageComponents } from "@/components/mdx-components";
import { Video } from "@/components/video";
import { YouTube } from "@/components/youtube";
import { getBlogPost, getBlogPosts } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

const mdxComponents = {
  Video,
  YouTube,
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

  return (
    <article className="space-y-6">
      <Link
        href="/"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        ← Back
      </Link>
      <div className="space-y-2">
        <h1 className="text-2xl font-medium tracking-tight">{post.title}</h1>
        {post.date && (
          <div className="text-sm text-muted-foreground">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        )}
      </div>
      <div className="space-y-4 [&_p]:leading-relaxed [&_a]:text-foreground [&_a]:underline [&_a:hover]:no-underline [&_h2]:text-xl [&_h2]:font-medium [&_h2]:mt-6 [&_h2]:mb-4 [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_li]:my-1 [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_pre]:bg-muted [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto">
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>
    </article>
  );
}
