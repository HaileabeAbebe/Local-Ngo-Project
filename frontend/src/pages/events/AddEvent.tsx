import { useMutation } from "react-query";
import * as apiCall from "../../services/eventService";
import { useAppContext } from "../../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import ManageEventForm from "../../forms/EventForm/ManageEventForm";

const AddEvent = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(apiCall.createEvent, {
    onSuccess: () => {
      showToast({ message: "Event created successfully!", type: "SUCCESS" });
      navigate("/events");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleSave = (eventFormData: FormData) => {
    mutate(eventFormData);
  };

  return <ManageEventForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddEvent;
