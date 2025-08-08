import ProjectList from "../components/projects/ProjectList";
import { getFeaturedProjects } from "@/data";
import Hero from "../components/home/Hero";

export default function HomePage() {
  const featured = getFeaturedProjects();

  return (
    <div className="space-y-20">
      <Hero />

      <section>
        <h2 className="text-2xl font-semibold mb-4">Featured Projects</h2>
        <ProjectList projects={featured} />
      </section>
    </div>
  );
}


