import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import EventDetailsSection from "./EventDetailsSection";
import EventImagesSection from "./EventImagesSection";

export type EventFormData = {
  _id: string;
  title: string;
  description: string;
  date: string;
  createdBy: string;
  imageFiles: FileList;
  imageUrls: string[];
};

type Props = {
  event?: EventFormData;
  onSave: (eventFormData: FormData) => void;
  isLoading: boolean;
};

const ManageEventForm = ({ onSave, isLoading, event }: Props) => {
  const formMethods = useForm<EventFormData>();
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    if (event) {
      reset({ ...event });
    }
  }, [event, reset]);

  const onSubmit = handleSubmit((formDataJson: EventFormData) => {
    const formData = new FormData();
    if (event) {
      formData.append("eventId", event._id);
    }
    formData.append("title", formDataJson.title);
    formData.append("description", formDataJson.description);
    formData.append("date", formDataJson.date);

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }

    onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <EventDetailsSection />
        <EventImagesSection />
        <span className="flex justify-end">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-orange-500 rounded-md text-white px-4 py-2 font-semibold hover:bg-orange-700 text-xl disabled:bg-gray-500">
            {isLoading ? "Saving..." : "Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageEventForm;
