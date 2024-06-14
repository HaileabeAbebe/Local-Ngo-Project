import { useMutation } from "react-query";
import * as apiCall from "../../services/announcementService";
import { useAppContext } from "../../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import ManageAnnouncementForm from "../../forms/AnnouncementForm/ManageAnnouncementForm";

const AddAnnouncement = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(apiCall.createAnnouncement, {
    onSuccess: () => {
      showToast({
        message: "Announcement created successfully!",
        type: "SUCCESS",
      });
      navigate("/announcements");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleSave = (announcementFormData: FormData) => {
    mutate(announcementFormData);
  };

  return <ManageAnnouncementForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddAnnouncement;
