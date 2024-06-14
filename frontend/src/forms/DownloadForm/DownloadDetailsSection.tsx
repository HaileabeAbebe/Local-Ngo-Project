import { useFormContext } from "react-hook-form";
import { DownloadFormData } from "./ManageDownloadForm";

const DownloadDetailsSection: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<DownloadFormData>();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-3 text-green-800">Details</h2>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Title:
        </label>
        <input
          type="text"
          id="title"
          placeholder="Enter download title"
          {...register("title", {
            required: "Title is required",
            minLength: {
              value: 5,
              message: "Title should be at least 5 characters",
            },
          })}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800"
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>
      <div className="mb-4">
        <label
          htmlFor="category"
          className="block text-gray-700 font-bold mb-2">
          Category:
        </label>
        <input
          type="text"
          id="category"
          placeholder="Enter download category"
          {...register("category", {
            required: "Category is required",
            minLength: {
              value: 3,
              message: "Category should be at least 3 characters",
            },
          })}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800"
        />
        {errors.category && (
          <p className="text-red-500">{errors.category.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
          Type:
        </label>
        <select
          id="type"
          {...register("type", {
            required: "This field is required",
            validate: (value) =>
              ["manual", "strategy", "others"].includes(value) ||
              "Invalid type",
          })}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800">
          <option value="" disabled>
            Select type
          </option>
          <option value="strategy">Strategy</option>
          <option value="manual">Manual</option>
          <option value="others">Others</option>
        </select>
        {errors.type && <p className="text-red-500">{errors.type.message}</p>}
      </div>
      <div className="mb-4">
        <label
          htmlFor="accessLevel"
          className="block text-gray-700 font-bold mb-2">
          Access Level:
        </label>
        <select
          id="accessLevel"
          {...register("accessLevel", {
            required: "This field is required",
            validate: (value) =>
              ["public", "protected"].includes(value) || "Invalid access level",
          })}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800">
          <option value="" disabled>
            Select access level
          </option>
          <option value="public">Public</option>
          <option value="protected">Staff Only</option>
          <option value="private">Admins Only</option>
        </select>
        {errors.accessLevel && (
          <p className="text-red-500">{errors.accessLevel.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="file" className="block text-gray-700 font-bold mb-2">
          File:
        </label>
        <input
          type="file"
          id="file"
          {...register("file", {
            required: "File is required",
            validate: {
              fileType: (value) => {
                const allowedTypes = [
                  "application/pdf",
                  "application/msword", // .doc
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
                ];
                const file = value[0];
                if (file && !allowedTypes.includes(file.type)) {
                  return "Invalid file type. Only PDF and Word documents are allowed";
                }
                return true;
              },
            },
          })}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800"
        />
        {errors.file && <p className="text-red-500">{errors.file.message}</p>}
      </div>
    </div>
  );
};

export default DownloadDetailsSection;
