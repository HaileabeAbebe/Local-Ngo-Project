import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import AnnouncementDetailsSection from "./AnnouncementDetails";

export type AnnouncementFormData = {
  _id: string;
  title: string;
  content: string;
  createdBy: string;
};

type Props = {
  announcement?: AnnouncementFormData;
  onSave: (announcementFormData: FormData) => void;
  isLoading: boolean;
};

const ManageAnnouncementForm = ({ onSave, isLoading, announcement }: Props) => {
  const formMethods = useForm<AnnouncementFormData>();
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    if (announcement) {
      reset({ ...announcement });
    }
  }, [announcement, reset]);

  const onSubmit = handleSubmit((formDataJson: AnnouncementFormData) => {
    const formData = new FormData();
    if (announcement) {
      formData.append("announcementId", announcement._id);
    }
    formData.append("title", formDataJson.title);
    formData.append("content", formDataJson.content);

    onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <AnnouncementDetailsSection />
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

export default ManageAnnouncementForm;
