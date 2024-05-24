import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import NewsDetailsSection from "./NewsDetailsSection";
import NewsImagesSection from "./NewsImagesSection";

export type NewsFormData = {
  _id: string;
  title: string;
  content: string;
  createdBy: string;
  imageFiles: FileList;
  imageUrls: string[];
};

type Props = {
  news?: NewsFormData;
  onSave: (NewsFormData: FormData) => void;
  isLoading: boolean;
};

const ManageProjectForm = ({ onSave, isLoading, news }: Props) => {
  const formMethods = useForm<NewsFormData>();
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    if (news) {
      reset({ ...news });
    }
  }, [news, reset]);

  const onSubmit = handleSubmit((formDataJson: NewsFormData) => {
    const formData = new FormData();
    if (news) {
      formData.append("newsId", news._id);
    }
    formData.append("title", formDataJson.title);
    formData.append("content", formDataJson.content);

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
        <NewsDetailsSection />
        <NewsImagesSection />
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

export default ManageProjectForm;
