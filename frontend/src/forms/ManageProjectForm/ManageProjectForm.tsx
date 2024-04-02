import { FormProvider, useForm } from "react-hook-form";
import ProjectDetailsSection from "./ProjectDetailsForm";
import ProjectImagesSection from "./ProjectImagesForm";
import { useEffect } from "react";

export type ProjectFormData = {
  _id: string;
  title: string;
  description: string;
  status: string;
  startDate: Date;
  endDate: Date;
  imageFiles: FileList;
  imageUrls: string[];
};

type Props = {
  project?: ProjectFormData;
  onSave: (projectFormData: FormData) => void;
  isLoading: boolean;
};

const ManageProjectForm = ({ onSave, isLoading, project }: Props) => {
  const formMethods = useForm<ProjectFormData>();
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    reset(project);
  }, [project, reset]);

  const onSubmit = handleSubmit((formDataJson: ProjectFormData) => {
    const formData = new FormData();
    if (project) {
      formData.append("projectId", project._id);
    }
    formData.append("title", formDataJson.title);
    formData.append("description", formDataJson.description);
    formData.append("status", formDataJson.status);
    formData.append("startDate", formDataJson.startDate.toString());
    formData.append("endDate", formDataJson.endDate.toString());

    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <ProjectDetailsSection />
        <ProjectImagesSection />
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