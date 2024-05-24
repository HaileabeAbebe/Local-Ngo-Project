import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { IProject } from "../../components/projects/ProjectCard";
import * as apiCall from "../../services/apiCall";
import {
  FiEdit2,
  FiCalendar,
  FiClock,
  FiCheckCircle,
  FiTrash2,
} from "react-icons/fi";
import { useAppContext } from "../../contexts/AppContext";

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams() as { projectId: string };
  const { isLoggedIn, user } = useAppContext();
  const navigate = useNavigate();

  // Fetch project data
  const { data: projectData } = useQuery<IProject>(
    ["fetchProject", projectId],
    () =>
      projectId ? apiCall.fetchProjectById(projectId) : Promise.reject("No ID"),
    {
      onError: (error: unknown) => {
        if (error instanceof Error) {
          console.log(error.message);
        }
      },
    }
  );

  // Mutation for deleting the project
  const mutation = useMutation(apiCall.deleteProjectById, {
    onSuccess: () => {
      navigate("/projects");
    },
    onError: (error) => {
      console.error("Error deleting project:", error);
    },
  });

  // Handle project deletion
  const handleDelete = () => {
    mutation.mutate(projectId);
  };

  // Main image state
  const [mainImage, setMainImage] = useState<string | undefined>();

  useEffect(() => {
    if (projectData?.imageUrls.length) {
      setMainImage(projectData.imageUrls[0]);
    }
  }, [projectData]);

  if (!projectData) {
    return <span>Loading...</span>;
  }

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-800">
          {projectData.title}
        </h1>
        {isLoggedIn &&
          user &&
          (user._id === projectData.createdBy._id || user.role === "admin") && (
            <div className="flex items-center space-x-4">
              <Link
                to={`/edit-project/${projectData._id}`}
                className="flex items-center space-x-2 text-green-800 hover:text-orange-500">
                <FiEdit2 className="w-5 h-5" />
                <span>Edit</span>
              </Link>
              <button
                onClick={handleDelete}
                className="flex items-center space-x-2 text-white bg-red-500 rounded px-3 py-1 hover:bg-red-700">
                <FiTrash2 className="w-5 h-5" />
                <span>Delete</span>
              </button>
            </div>
          )}
      </div>
      <p className="mb-6 text-gray-700">{projectData.description}</p>
      <div className="flex items-center mb-4 text-gray-700">
        <FiCalendar className="mr-2" />
        Start Date: {new Date(projectData.startDate).toLocaleDateString()}
      </div>
      {projectData.endDate && (
        <div className="flex items-center mb-4 text-gray-700">
          <FiCalendar className="mr-2" />
          End Date: {new Date(projectData.endDate).toLocaleDateString()}
        </div>
      )}
      <div className="flex items-center mb-4 text-gray-700">
        {projectData.status === "ongoing" ? (
          <FiClock className="mr-2 text-green-500" />
        ) : (
          <FiCheckCircle className="mr-2 text-red-500" />
        )}
        Status: {projectData.status}
      </div>
      <img
        src={mainImage}
        alt={projectData.title}
        className="w-full object-cover h-[40vh] md:h-[60vh] lg:h-[70vh] rounded-lg shadow-md mb-4"
      />
      <div className="grid grid-cols-3 gap-4 mb-6">
        {projectData.imageUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt=""
            className="cursor-pointer object-cover w-full h-32 rounded-lg shadow-md hover:opacity-75"
            onClick={() => setMainImage(url)}
          />
        ))}
      </div>
      <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
        <h2 className="text-xl font-bold text-green-800 mb-4">Documents</h2>
        <ul className="list-disc list-inside">
          {projectData.docUrls.map((url, index) => (
            <li key={index} className="mb-2">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline">
                {`Document ${index + 1}`}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectDetail;
