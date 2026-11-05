import { mdxImageComponents } from "@/components/mdx-components";
import { More } from "@/components/more";
import { ScrollToTopOnArrival } from "@/components/post-link";
import { ConfirmDemo } from "@/components/post-demos";
import { PostList } from "@/components/post-list";
import {
  PageTransition,
  ProjectTitleTransition,
} from "@/components/transitions";
import { getBlogPost } from "@/lib/blog";
import { personalInfo } from "@/lib/constants";
import { getGithubStars } from "@/lib/github";
import { getProjectPage, getProjectPageNames } from "@/lib/projects";
import {
  ArrowLeftIcon,
  ArrowUpRightIcon,
  GithubLogoIcon,
  StarIcon,
} from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import rehypeHighlight from "rehype-highlight";

const screenshots: Record<
  string,
  { alt: string; width: number; height: number }
> = {
  overlap: {
    alt: "An overlap poll with four answers, the best time in one sentence, and who is free at the hovered time",
    width: 1280,
    height: 1000,
  },
  hourlink: {
    alt: "An hourlink page showing a meeting time, its date, and options for length and cities",
    width: 1280,
    height: 800,
  },
};

const mdxComponents = { ...mdxImageComponents, ConfirmDemo };

export function generateStaticParams() {
  return getProjectPageNames().map((name) => ({ name }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const project = getProjectPage(name);
  if (!project) return {};

  const url = `${personalInfo.baseUrl}/projects/${name}`;
  const image = {
    url: `${url}/opengraph-image`,
    width: 1200,
    height: 630,
    alt: project.name,
  };

  return {
    title: project.name,
    description: project.description,
    openGraph: {
      title: project.name,
      description: project.description,
      url,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: project.name,
      description: project.description,
      images: [image],
    },
  };
}

const buttonBase =
  "inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-sm font-medium transition-[background-color,color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] motion-reduce:active:scale-100";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const project = getProjectPage(name);
  if (!project) notFound();

  const stars = await getGithubStars(project.url);
  const post = project.post ? getBlogPost(project.post) : null;
  const shot = screenshots[name];

  return (
    <>
      <ScrollToTopOnArrival />
      <PageTransition>
        <article className="mt-12 space-y-8">
          <div className="space-y-4">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground -mt-2 mb-2 inline-flex items-center gap-1.5 py-2 text-sm"
            >
              <ArrowLeftIcon className="size-3.5" />
              Back
            </Link>
            <ProjectTitleTransition name={name}>
              <h1 className="w-fit text-3xl font-medium tracking-tight sm:text-4xl">
                {project.name}
              </h1>
            </ProjectTitleTransition>
            <p className="text-muted-foreground max-w-[34rem] text-base leading-relaxed">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {project.site && (
                <a
                  href={project.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${buttonBase} bg-foreground text-background hover:bg-foreground/85`}
                >
                  Visit {new URL(project.site).host}
                  <ArrowUpRightIcon className="size-3.5" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${buttonBase} border-border hover:bg-surface-hover border`}
              >
                <GithubLogoIcon className="size-4" />
                GitHub
                {typeof stars === "number" && stars > 0 && (
                  <span className="text-muted-foreground inline-flex items-center gap-1 tabular-nums">
                    <StarIcon className="size-3" weight="fill" />
                    {stars.toLocaleString("en-US")}
                    <span className="sr-only"> stars</span>
                  </span>
                )}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>

          {shot && (
            <div className="border-border overflow-hidden rounded-xl border">
              {(["light", "dark"] as const).map((theme) => (
                <Image
                  key={theme}
                  src={`/projects/${name}-${theme}.png`}
                  alt={shot.alt}
                  width={shot.width}
                  height={shot.height}
                  unoptimized
                  priority={theme === "light"}
                  className={
                    theme === "light"
                      ? "block h-auto w-full dark:hidden"
                      : "hidden h-auto w-full dark:block"
                  }
                />
              ))}
            </div>
          )}

          <div className="prose space-y-4">
            <MDXRemote
              source={project.content}
              components={mdxComponents}
              options={{ mdxOptions: { rehypePlugins: [rehypeHighlight] } }}
            />
          </div>

          {post && (
            <section className="space-y-4 pt-4">
              <h2 className="text-muted-foreground text-sm font-medium tracking-tight">
                Read more
              </h2>
              <PostList posts={[post]} />
            </section>
          )}
        </article>
        <div className="mt-16">
          <More />
        </div>
      </PageTransition>
    </>
  );
}
