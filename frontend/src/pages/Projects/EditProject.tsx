import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiCall from "../../services/apiCall";
import ManageProjectForm from "../../forms/ManageProjectForm/ManageProjectForm";
import { useAppContext } from "../../contexts/AppContext";

const EditProject = () => {
  const { projectId } = useParams();
  const { showToast } = useAppContext();

  const { data: project, refetch } = useQuery(
    "fetchProjectById",
    () => apiCall.fetchProjectById(projectId || ""),
    {
      enabled: !!projectId,
    }
  );

  const { mutate, isLoading } = useMutation(apiCall.updateProjectById, {
    onSuccess: () => {
      showToast({ message: "Project updated successfully", type: "SUCCESS" });
      refetch();
    },
    onError: async (error) => {
      if (error instanceof Response) {
        const err = await error.json();
        showToast({ message: err.message, type: "ERROR" });
      } else {
        // Otherwise, it's a JavaScript error
        showToast({ message: error.message, type: "ERROR" });
      }
    },
  });

  const handleSave = (projectFormData: FormData) => {
    mutate(projectFormData);
  };
  return (
    <ManageProjectForm
      onSave={handleSave}
      isLoading={isLoading}
      project={project}
    />
  );
};

export default EditProject;
