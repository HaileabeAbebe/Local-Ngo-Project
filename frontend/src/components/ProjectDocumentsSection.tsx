import { useFormContext } from "react-hook-form";
import { ProjectFormData } from "../utils/types";

const ProjectDocumentsSection = () => {
  const {
    register, // Register a field to be part of the form
    watch, // Watch the value of a specified field or fields
    setValue, // Set the value of a specified field
    formState: { errors }, // Access the form state including errors
  } = useFormContext<ProjectFormData>();

  // Watch for changes in docUrls field
  const existingDocUrls = watch("docUrls");

  // Handle document deletion
  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    docUrl: string
  ) => {
    event.preventDefault(); // Prevent the default form submission behavior
    // Update the docUrls field by removing the specified docUrl
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Display existing documents */}
            {existingDocUrls.map((url, index) => (
              <div
                key={index}
                className="relative group w-full h-24 bg-gray-100 rounded-lg p-2 flex items-center justify-center">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline">
                  Open Document
                </a>
                <button
                  onClick={(event) => handleDelete(event, url)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100">
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
            validate: (docFiles) => {
              const totalLength =
                (docFiles?.length || 0) + (existingDocUrls?.length || 0);
              if (totalLength > 3) {
                return "Total number of documents cannot be more than 3";
              }
              return true;
            },
          })}
          className="mt-4"
        />
      </div>
      {errors.docFiles && (
        <p className="text-red-500 mt-2">{errors.docFiles.message}</p>
      )}
    </div>
  );
};

export default ProjectDocumentsSection;
