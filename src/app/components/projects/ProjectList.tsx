import ProjectCard from "./ProjectCard";
import type { Project } from "@/data";

export default function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div className="relative">
      <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory py-2 scrollbar-hide">
        {projects.map((p) => (
          <div key={p.slug} className="min-w-[280px] sm:min-w-[320px] lg:min-w-[360px] snap-start">
            <ProjectCard project={p} />
          </div>
        ))}
      </div>
    </div>
  );
}

