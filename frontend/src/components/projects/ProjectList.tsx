import ProjectCard, { IProject } from "./ProjectCard";
import { FiLoader } from "react-icons/fi";

interface ProjectListProps {
  projects: IProject[];
  isLoading: boolean;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FiLoader className="animate-spin text-gray-500 text-3xl" />
        <span className="ml-2 text-gray-500 text-xl">Loading projects...</span>
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-gray-500 text-xl">No project found</span>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2">
      {projects.map((project: IProject) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  );
};

export default ProjectList;
