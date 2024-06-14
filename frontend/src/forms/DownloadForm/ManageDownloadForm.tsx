import { FormProvider, useForm } from "react-hook-form";
import DownloadDetailsSection from "./DownloadDetailsSection";
import { useEffect } from "react";

export type DownloadFormData = {
  _id?: string;
  title: string;
  category: string;
  type: "manual" | "strategy" | "others";
  accessLevel: "public" | "protected";
  file: FileList;
};

type Props = {
  download?: DownloadFormData;
  onSave: (downloadFormData: FormData) => void;
  isLoading: boolean;
};

const ManageDownloadForm = ({ onSave, isLoading, download }: Props) => {
  const formMethods = useForm<DownloadFormData>();
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    if (download) {
      const { _id, title, category, type, accessLevel } = download;
      reset({ _id, title, category, type, accessLevel });
    }
  }, [download, reset]);

  const onSubmit = (data: DownloadFormData) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("type", data.type);
    formData.append("accessLevel", data.accessLevel);
    formData.append("file", data.file[0]);

    onSave(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-3 text-green-800">
        Manage Download
      </h2>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DownloadDetailsSection />
          <div className="mt-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`${
                isLoading
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-800 hover:bg-green-700"
              } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}>
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ManageDownloadForm;
