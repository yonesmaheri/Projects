import { useParams } from "react-router-dom";
import { useProjects } from "../context/projectContext";

export default function ProjectDetails() {
  const { id } = useParams();
  const { projects } = useProjects();

  const project = projects.find((p) => p.id === id);
  if (!project) return <div>Project not found</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">{project.title}</h1>
      <p>{project.description}</p>
    </div>
  );
}
