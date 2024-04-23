import { useFormContext } from "react-hook-form";
import { ProjectFormData } from "../forms/ManageProjectForm/ManageProjectForm";

const ProjectDocumentsSection = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<ProjectFormData>();

  const existingDocUrls = watch("docUrls");
  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    docUrl: string
  ) => {
    event.preventDefault();
    setValue(
      "docUrls",
      existingDocUrls.filter((url) => url !== docUrl)
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3 text-green-800">
        Project Documents
      </h2>
      <div className="border-gray-300 rounded p-4 flex flex-col gap-4 shadow-sm">
        {existingDocUrls && (
          <div className="grid grid-cols-6 gap-4">
            {existingDocUrls.map((url, index) => (
              <div key={index} className="relative group w-full h-64">
                <a href={url} target="_blank" rel="noopener noreferrer">
                  Open Document
                </a>
                <button
                  onClick={(event) => handleDelete(event, url)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white">
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        <input
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.txt,.rtf,.odt"
          {...register("docFiles", {
            // validate: (docFiles) => {
            //   const totalLength =
            //     docFiles.length + (existingDocUrls?.length || 0);
            //   if (totalLength > 3) {
            //     return "Total number of documents cannot be more than 6";
            //   }
            //   return true;
            // },
          })}
        />
      </div>
      {/* {errors.docFiles && (
        <p className="text-red-500">{errors.docFiles.message}</p>
      )} */}
    </div>
  );
};
export default ProjectDocumentsSection;
