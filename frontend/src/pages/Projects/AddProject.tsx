import { useMutation } from "react-query";
import ManageProjectForm from "../../forms/ManageProjectForm/ManageProjectForm";
import * as apiCall from "../../services/apiCall";
import { useAppContext } from "../../contexts/AppContext";

const AddProject = () => {
  const { showToast } = useAppContext();

  const { mutate, isLoading } = useMutation(apiCall.addProject, {
    onSuccess: () => {
      showToast({ message: "Project created successfully!", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleSave = (projectFormData: FormData) => {
    mutate(projectFormData);
  };
  return <ManageProjectForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddProject;
