import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { IProject } from "../../components/molecules/ProjectCard";
import * as apiCall from "../../services/apiCall";

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams() as { projectId: string };

  const { data: projectData } = useQuery<IProject>(
    ["fetchProject", projectId],
    () =>
      projectId ? apiCall.fetchProject(projectId) : Promise.reject("No ID"),
    {
      onError: (error: unknown) => {
        if (error instanceof Error) {
          console.log(error.message);
        }
      },
    }
  );

  if (!projectData) {
    return <span>Loading...</span>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-green-800 mb-4">
        {projectData.title}
      </h1>
      <p>{projectData.description}</p>
      <p>Status: {projectData.status}</p>
      <p>Start Date: {new Date(projectData.startDate).toLocaleDateString()}</p>
      {projectData.endDate && (
        <p>End Date: {new Date(projectData.endDate).toLocaleDateString()}</p>
      )}
      {projectData.imageUrls.map((url, index) => (
        <img key={index} src={url} alt="" className="mt-2" />
      ))}
    </div>
  );
};

export default ProjectDetail;
