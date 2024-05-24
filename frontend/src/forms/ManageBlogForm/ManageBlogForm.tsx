// ManageBlogForm.tsx
import { FormProvider, useForm } from "react-hook-form";
import BlogDetailsSection from "./BlogDetailsForm";
import BlogImagesSection from "./BlogImagesForm"; // Update this line
import { useEffect } from "react";
import { BlogFormData } from "../../utils/types";

type Props = {
  blog?: BlogFormData;
  onSave: (blogFormData: FormData) => void;
  isLoading: boolean;
};

const ManageBlogForm = ({ onSave, isLoading, blog }: Props) => {
  const formMethods = useForm<BlogFormData>();
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    if (blog) {
      const date = new Date(blog.date).toISOString().split("T")[0];
      // reset({ ...blog, date });
      reset({ ...blog, date: new Date(date) });
    }
  }, [blog, reset]);

  // ManageBlogForm.tsx
  const onSubmit = handleSubmit((formDataJson: BlogFormData) => {
    const formData = new FormData();
    if (blog) {
      formData.append("blogId", blog._id);
    }
    formData.append("title", formDataJson.title);
    formData.append("content", formDataJson.content);
    formData.append("date", formDataJson.date.toString());
    formData.append("createdBy", formDataJson.createdBy);
    if (formDataJson.imageFiles) {
      Array.from(formDataJson.imageFiles).forEach((file, index) => {
        formData.append(`imageFiles[${index}]`, file);
      });
    }

    onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <BlogDetailsSection />
        <BlogImagesSection />
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

export default ManageBlogForm;
