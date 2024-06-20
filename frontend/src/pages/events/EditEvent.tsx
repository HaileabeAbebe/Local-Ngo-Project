import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import * as apiCall from "../../services/eventService";
import { useAppContext } from "../../contexts/AppContext";
import ManageEventForm from "../../forms/EventForm/ManageEventForm";

const EditEvent = () => {
  const { eventId } = useParams();
  const { showToast } = useAppContext();
  const navigate = useNavigate();

  const { data: event, refetch } = useQuery(
    "fetchEventById",
    () => apiCall.fetchEventById(eventId || ""),
    {
      enabled: !!eventId,
    }
  );

  const { mutate, isLoading } = useMutation(apiCall.updateEventById, {
    onSuccess: () => {
      showToast({ message: "Event updated successfully", type: "SUCCESS" });
      refetch();
      navigate(`/events/${event?._id}`);
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

  const handleSave = (eventFormData: FormData) => {
    mutate(eventFormData);
  };

  return (
    <ManageEventForm onSave={handleSave} isLoading={isLoading} event={event} />
  );
};

export default EditEvent;
