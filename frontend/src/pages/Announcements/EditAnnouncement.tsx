import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import * as apiCall from "../../services/announcementService";
import { useAppContext } from "../../contexts/AppContext";
import ManageAnnouncementForm from "../../forms/AnnouncementForm/ManageAnnouncementForm";

const EditAnnouncement = () => {
  const { announcementId } = useParams();
  const { showToast } = useAppContext();
  const navigate = useNavigate();

  const { data: announcement, refetch } = useQuery(
    "fetchAnnouncementById",
    () => apiCall.fetchAnnouncementById(announcementId || ""),
    {
      enabled: !!announcementId,
    }
  );

  const { mutate, isLoading } = useMutation(apiCall.updateAnnouncementById, {
    onSuccess: () => {
      showToast({
        message: "Announcement updated successfully",
        type: "SUCCESS",
      });
      refetch();
      navigate(`/announcements/${announcement._id}`);
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

  const handleSave = (announcementFormData: FormData) => {
    mutate(announcementFormData);
  };

  return (
    <ManageAnnouncementForm
      onSave={handleSave}
      isLoading={isLoading}
      announcement={announcement}
    />
  );
};

export default EditAnnouncement;
