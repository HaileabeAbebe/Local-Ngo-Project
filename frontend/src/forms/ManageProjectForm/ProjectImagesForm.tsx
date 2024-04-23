import { useFormContext } from "react-hook-form";
import { ProjectFormData } from "./ManageProjectForm";

// This component is responsible for handling the project images section of the form
const ProjectImagesSection = () => {
  // useFormContext is a custom React Hook that gives us access to the form context
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<ProjectFormData>();

  // watch function allows us to watch specified inputs in our form
  const existingImageUrls = watch("imageUrls");
  const selectedImages = watch("imageFiles");

  // handleDelete function is used to handle the deletion of an image
  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) => {
    event.preventDefault();
    // setValue is a function from useFormContext that allows us to dynamically set the value of a specific field
    setValue(
      "imageUrls",
      existingImageUrls.filter((url) => url !== imageUrl)
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3 text-green-800">Project Images</h2>
      <div className="border-gray-300 rounded p-4 flex flex-col gap-4 shadow-sm">
        {existingImageUrls && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Display existing images */}
            {existingImageUrls.map((url, index) => (
              <div key={index} className="relative group w-full h-64">
                <img
                  src={url}
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
                  alt="project images"
                />
                <button
                  onClick={(event) => handleDelete(event, url)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white">
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        {selectedImages && (
          <div className="flex flex-wrap gap-4">
            {/* Display selected images */}
            {Array.from(selectedImages).map((imageFile, index) => (
              <div
                key={index}
                className="relative group w-16 h-16 rounded-full overflow-hidden">
                <img
                  src={URL.createObjectURL(imageFile)}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  alt="selected preview"
                />
              </div>
            ))}
          </div>
        )}
        <input
          type="file"
          multiple
          accept="image/*"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength =
                imageFiles.length + (existingImageUrls?.length || 0);
              if (totalLength === 0) {
                return "At least one image should be added";
              }

              if (totalLength > 6) {
                return "Total number of images cannot be more than 6";
              }

              return true;
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <p className="text-red-500">{errors.imageFiles.message}</p>
      )}
    </div>
  );
};

export default ProjectImagesSection;
