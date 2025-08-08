import { getAllProjects } from "@/data";
import ProjectFeature from "../../components/projects/ProjectFeature";

export const metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  const projects = getAllProjects();
  return (
    <div className="space-y-12">
      <h1 className="text-3xl font-bold">Projects</h1>
      <div className="space-y-12">
        {projects.map((p) => (
          <ProjectFeature key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}


