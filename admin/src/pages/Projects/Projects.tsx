import { useQuery } from "react-query";
import { IProject } from "../../utils/types";
import * as apiCall from "../../services/apiCall";

const Projects = () => {
  const {
    data: projects,
    isLoading,
    // error,
  } = useQuery<IProject[]>("projects", apiCall.fetchProjects);

  if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>An error occurred: {error.message}</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="text-left bg-green-800 text-white">
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Start Date</th>
            <th className="px-4 py-2">End Date</th>
            {/* Add more column headers as needed */}
          </tr>
        </thead>
        <tbody>
          {projects?.map((project, index) => (
            <tr
              key={project._id}
              className={`text-gray-700 ${
                index % 2 ? "bg-gray-50" : "bg-white"
              }`}>
              <td className="px-4 py-2 border-r border-gray-200">
                {project.title}
              </td>
              <td className="px-4 py-2 border-r border-gray-200">
                {project.description}
              </td>
              <td className="px-4 py-2 border-r border-gray-200">
                {project.status}
              </td>
              <td className="px-4 py-2 border-r border-gray-200">
                {new Date(project.startDate).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 border-gray-200">
                {new Date(project.endDate).toLocaleDateString()}
              </td>
              {/* Add more project details here */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Projects;
