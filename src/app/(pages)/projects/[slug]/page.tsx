import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAllProjectSlugs, getProjectBySlug } from "@/data";

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: "Project" };
  return { title: project.title, description: project.summary };
}

export default function ProjectDetailsPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) return notFound();

  return (
    <article className="space-y-8">
      <div className="grid gap-6 md:grid-cols-[300px,1fr]">
        {/* Left meta rail */}
        <aside className="glass rounded-xl2 p-4 h-fit self-start">
          <h1 className="text-3xl font-bold leading-tight">{project.title}</h1>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs bg-white/50 backdrop-blur px-2 py-1 rounded border border-white/30">{tag}</span>
            ))}
          </div>
          <div className="mt-4 flex gap-3 text-sm">
            {project.repoUrl && (
              <a href={project.repoUrl} target="_blank" rel="noreferrer" className="hover:text-brand">Repo</a>
            )}
            {project.demoUrl && project.demoUrl.length > 0 && (
              <a href={project.demoUrl} target="_blank" rel="noreferrer" className="hover:text-brand">Demo</a>
            )}
            <Link href="/projects" className="hover:text-brand">Back</Link>
          </div>
        </aside>

        {/* Right content */}
        <div className="space-y-6">
          <div className="relative aspect-[16/9] rounded-xl2 overflow-hidden glass">
            <div className="absolute -inset-1 bg-radial-fade" />
            <Image src={project.image} alt={project.title} fill className="object-cover mix-blend-overlay" />
          </div>
          <div className="space-y-4">
            {project.content.map((p, i) => (
              <p key={i} className="text-gray-800 md:text-lg leading-relaxed">{p}</p>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}


