import { useFormContext } from "react-hook-form";
import { ProjectFormData } from "./ManageProjectForm";

const ProjectDetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProjectFormData>();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-3 text-green-800">
        Project Details
      </h2>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Title:
        </label>
        <input
          type="text"
          id="title"
          placeholder="Enter project title"
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
          htmlFor="description"
          className="block text-gray-700 font-bold mb-2">
          Description:
        </label>
        <textarea
          id="description"
          rows={5}
          placeholder="Describe your project"
          {...register("description", {
            required: "Description is required",
            minLength: {
              value: 15,
              message: "Description should be at least 15 characters",
            },
          })}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800"
        />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="status" className="block text-gray-700 font-bold mb-2">
          Status:
        </label>
        <select
          id="status"
          {...register("status", {
            required: "This field is required",
            validate: (value) =>
              ["ongoing", "finished"].includes(value) || "Invalid status",
          })}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800">
          <option value="" disabled>
            Select status
          </option>
          <option value="ongoing">Ongoing</option>
          <option value="finished">Finished</option>
        </select>
        {errors.status && (
          <p className="text-red-500">{errors.status.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="startDate"
          className="block text-gray-700 font-bold mb-2">
          Start Date:
        </label>
        <input
          type="date"
          id="startDate"
          placeholder="Select start date"
          {...register("startDate", { required: "This field is required" })}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800"
        />
        {errors.startDate && (
          <p className="text-red-500">{errors.startDate.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="endDate" className="block text-gray-700 font-bold mb-2">
          End Date:
        </label>
        <input
          type="date"
          id="endDate"
          placeholder="Select end date"
          {...register("endDate", { required: "This field is required" })}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800"
        />
        {errors.endDate && (
          <p className="text-red-500">{errors.endDate.message}</p>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailsSection;
