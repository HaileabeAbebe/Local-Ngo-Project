import { useMutation } from "react-query";
import * as apiCall from "../../services/projectService";
import { useAppContext } from "../../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import ManageProjectForm from "../../forms/ProjectForm/ManageProjectForm";

const AddProject = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(apiCall.createProject, {
    onSuccess: () => {
      showToast({ message: "Project created successfully!", type: "SUCCESS" });
      navigate("/projects");
    },
    onError: async (error) => {
      // If the error is an instance of Response, it's coming from a fetch call
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
  return <ManageProjectForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddProject;
