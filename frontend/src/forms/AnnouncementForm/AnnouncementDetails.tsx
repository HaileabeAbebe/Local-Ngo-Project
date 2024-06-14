import { useFormContext } from "react-hook-form";
import { AnnouncementFormData } from "./ManageAnnouncementForm";

const AnnouncementDetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<AnnouncementFormData>();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-3 text-green-800">
        Announcement Details
      </h2>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Title:
        </label>
        <input
          type="text"
          id="title"
          placeholder="Enter announcement title"
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
        <label htmlFor="content" className="block text-gray-700 font-bold mb-2">
          Content:
        </label>
        <textarea
          id="content"
          rows={5}
          placeholder="Describe the announcement content"
          {...register("content", {
            required: "Content is required",
            minLength: {
              value: 15,
              message: "Content should be at least 15 characters",
            },
          })}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800"
        />
        {errors.content && (
          <p className="text-red-500">{errors.content.message}</p>
        )}
      </div>
    </div>
  );
};

export default AnnouncementDetailsSection;
