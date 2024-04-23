import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import ProjectCard, { IProject } from "../../components/molecules/ProjectCard";
import * as apiCall from "../../services/apiCall";
import { useAppContext } from "../../contexts/AppContext";

const Projects: React.FC = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("recent");
  const { isLoggedIn, user } = useAppContext();

  const { data: projectsData } = useQuery<IProject[]>(
    "fetchProjects",
    apiCall.fetchProjects,
    {
      onError: (error: unknown) => {
        if (error instanceof Error) {
          console.log(error.message);
        }
      },
    }
  );

  if (!projectsData || (projectsData as IProject[]).length === 0) {
    return <span>No Project found</span>;
  }

  const filteredProjects = (projectsData as IProject[])
    .filter((project) =>
      project.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      switch (sort) {
        case "asc":
          return a.title.localeCompare(b.title);
        case "desc":
          return b.title.localeCompare(a.title);
        case "recent":
          if (a.lastUpdated && b.lastUpdated) {
            return (
              new Date(b.lastUpdated).getTime() -
              new Date(a.lastUpdated).getTime()
            );
          } else {
            return 0;
          }
        default:
          return 0;
      }
    });

  return (
    <div className="bg-white py-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-green-800">Projects</h1>
        {isLoggedIn &&
          user &&
          (user?.role === "editor" || user?.role === "admin") && (
            <Link
              to="/add-project"
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
              Add Project
            </Link>
          )}
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border w-full"
        />
      </div>
      <div className="mb-4">
        <select
          value={sort}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setSort(e.target.value)
          }
          className="p-2 border">
          <option value="asc">Sort by title (A-Z)</option>
          <option value="desc">Sort by title (Z-A)</option>
          <option value="recent">Sort by recent</option>
        </select>
      </div>
      {filteredProjects.map((project: IProject) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  );
};

export default Projects;
