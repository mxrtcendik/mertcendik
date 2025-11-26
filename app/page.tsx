import { About } from "@/components/about";
import { Blog } from "@/components/blog";
import { Header } from "@/components/header";
import { More } from "@/components/more";
import { Newsletter } from "@/components/newsletter";
import { Projects } from "@/components/projects";
import { FadeIn } from "@/components/ui/fade-in";

export default function Home() {
  return (
    <div className="space-y-24">
      <FadeIn>
        <Header />
      </FadeIn>
      <FadeIn delay={0.1}>
        <About />
      </FadeIn>
      <FadeIn delay={0.2}>
        <Projects />
      </FadeIn>
      <FadeIn delay={0.3}>
        <Blog />
      </FadeIn>
      <FadeIn delay={0.4}>
        <Newsletter />
      </FadeIn>
      <FadeIn delay={0.5}>
        <More />
      </FadeIn>
    </div>
  );
}
