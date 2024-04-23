// BlogImagesForm.tsx
import { useFormContext } from "react-hook-form";
import { BlogFormData } from "../../utils/types";

const BlogImagesSection = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<BlogFormData>();

  const existingImageUrls = watch("imageUrls");
  const selectedImages = watch("imageFiles");

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) => {
    event.preventDefault();
    setValue(
      "imageUrls",
      existingImageUrls.filter((url) => url !== imageUrl)
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-3 text-green-800">Blog Images</h2>
      {Array.isArray(existingImageUrls) && existingImageUrls.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {existingImageUrls.map((url, index) => (
            <div key={index} className="relative group w-full h-64">
              <img
                src={url}
                className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
                alt="blog image"
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
      {Array.isArray(selectedImages) && selectedImages.length > 0 && (
        <div className="flex flex-wrap gap-4">
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
            const totalLength = imageFiles.length;
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
      {errors.imageFiles && (
        <p className="text-red-500">{errors.imageFiles.message}</p>
      )}
    </div>
  );
};

export default BlogImagesSection;
