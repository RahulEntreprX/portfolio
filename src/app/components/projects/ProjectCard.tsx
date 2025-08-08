import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/data";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <div className="rounded-3xl overflow-hidden glow-hover transition-all">
        <div className="relative aspect-[16/9] glass">
          <div className="absolute -inset-1 bg-radial-fade" />
          <Image src={project.image} alt={project.title} fill className="object-cover mix-blend-overlay" />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity grid place-items-center">
            <span className="text-xs tracking-wide bg-white/70 dark:bg-white/10 backdrop-blur px-3 py-1 rounded-full border border-white/30">View details</span>
          </div>
        </div>
        <div className="p-4 glass -mt-6 mx-3 rounded-2xl relative">
          <h3 className="text-base sm:text-lg font-semibold group-hover:text-brand">{project.title}</h3>
          <p className="mt-2 text-sm text-gray-700 line-clamp-2">{project.summary}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs bg-white/40 backdrop-blur px-2 py-1 rounded border border-white/30">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

