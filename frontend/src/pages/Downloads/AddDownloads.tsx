import { useMutation } from "react-query";
import * as apiCall from "../../services/downloadService";
import { useAppContext } from "../../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import ManageDownloadForm from "../../forms/DownloadForm/ManageDownloadForm";

const AddDownload = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(apiCall.createDownload, {
    onSuccess: () => {
      showToast({ message: "Download created successfully!", type: "SUCCESS" });
      navigate("/strategies");
    },
    onError: async (error) => {
      if (error instanceof Response) {
        const err = await error.json();
        showToast({ message: err.message, type: "ERROR" });
      } else {
        console.log(error);
      }
    },
  });

  const handleSave = (downloadFormData: FormData) => {
    mutate(downloadFormData);
  };

  return <ManageDownloadForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddDownload;
