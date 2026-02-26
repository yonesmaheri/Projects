import { useProjects } from "../context/projectContext";
import { Link } from "react-router-dom";
import AddProject from "@/components/addProject";
import { useAuth } from "@/context/authContext";

export default function Projects() {
  const { projects, addProject, deleteProject } = useProjects();
  const { user } = useAuth();
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>
        <AddProject projects={projects} addProject={addProject} />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="border p-3 rounded-xl border-subtle flex justify-between items-center"
          >
            <Link to={`/projects/${project.id}`} className="font-medium">
              {project.title}
            </Link>

            {user?.role === "manager" && (
              <button
                onClick={() => deleteProject(project.id)}
                className="text-red-500"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
