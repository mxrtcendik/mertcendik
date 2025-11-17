import { About } from "@/components/about";
import { Blog } from "@/components/blog";
import { Header } from "@/components/header";
import { More } from "@/components/more";
import { Projects } from "@/components/projects";

export default function Home() {
  return (
    <div className="space-y-24">
      <Header />
      <About />
      <Projects />
      <Blog />
      <More />
    </div>
  );
}
