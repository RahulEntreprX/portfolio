import Link from "next/link";
import type { Project } from "@/data";

export default function ProjectFeature({ project }: { project: Project }) {
  const date = new Date(project.date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
  });

  return (
    <section className="relative">
      <div className="absolute left-[280px] top-0 bottom-0 hidden md:block opacity-20">
        <div className="h-full w-px bg-gradient-to-b from-transparent via-white/40 to-transparent dark:via-white/10" />
      </div>
      <div className="grid gap-8 md:grid-cols-[300px,1fr]">
        {/* Left meta rail */}
        <aside className="order-2 md:order-1 md:sticky md:top-20 self-start glass rounded-2xl p-5 h-fit">
          <h3 className="text-xl font-semibold leading-tight">{project.title}</h3>
          <p className="mt-1 text-xs text-gray-600">{date}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs bg-white/50 dark:bg-white/10 backdrop-blur px-2 py-1 rounded border border-white/30">
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-4 flex gap-3 text-sm">
            {project.repoUrl && (
              <a href={project.repoUrl} target="_blank" rel="noreferrer" className="hover:text-brand">Repo</a>
            )}
            {project.demoUrl && project.demoUrl.length > 0 && (
              <a href={project.demoUrl} target="_blank" rel="noreferrer" className="hover:text-brand">Demo</a>
            )}
            <Link href={`/projects/${project.slug}`} className="hover:text-brand">Details</Link>
          </div>
        </aside>

        {/* Right content */}
        <div className="order-1 md:order-2 space-y-4">
          <div className="glass rounded-2xl p-5">
            <p className="text-gray-800 dark:text-slate-200 md:text-lg leading-relaxed">{project.summary}</p>
          </div>
          {project.content.length > 0 && (
            <ul className="list-disc list-inside text-gray-700 dark:text-slate-300 space-y-2">
              {project.content.map((line, idx) => (
                <li key={idx}>{line}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

