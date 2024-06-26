import { FormProvider, useForm } from "react-hook-form";
import ProjectDetailsSection from "./ProjectDetailsSection";
import ProjectImagesSection from "./ProjectImagesSection";
import { useEffect } from "react";
import ProjectDocumentsSection from "../../components/ProjectDocumentsSection";
import { ProjectFormData } from "../../utils/types";

type Props = {
  project?: ProjectFormData;
  onSave: (projectFormData: FormData) => void;
  isLoading: boolean;
};

const ManageProjectForm = ({ onSave, isLoading, project }: Props) => {
  const formMethods = useForm<ProjectFormData>();
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    if (project) {
      reset({
        ...project,
        startDate: new Date(project.startDate),
        endDate: new Date(project.endDate),
      });
    }
  }, [project, reset]);

  const onSubmit = handleSubmit((formDataJson: ProjectFormData) => {
    const formData = new FormData();
    if (project) {
      formData.append("projectId", project._id);
    }
    formData.append("title", formDataJson.title);
    formData.append("description", formDataJson.description);
    formData.append("status", formDataJson.status);
    formData.append("startDate", formDataJson.startDate.toISOString());
    formData.append("endDate", formDataJson.endDate.toISOString());

    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }

    Array.from(formDataJson.imageFiles || []).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    Array.from(formDataJson.docFiles || []).forEach((docFile) => {
      formData.append(`docFiles`, docFile);
    });

    onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <ProjectDetailsSection />
        <ProjectImagesSection />
        <ProjectDocumentsSection />
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
