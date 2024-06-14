import { useFormContext } from "react-hook-form";
import { EventFormData } from "./ManageEventForm";

const EventDetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<EventFormData>();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-3 text-green-800">Event Details</h2>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Title:
        </label>
        <input
          type="text"
          id="title"
          placeholder="Enter event title"
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
          placeholder="Describe the event"
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
        <label htmlFor="date" className="block text-gray-700 font-bold mb-2">
          Date:
        </label>
        <input
          type="date"
          id="date"
          {...register("date", {
            required: "Date is required",
          })}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800"
        />
        {errors.date && <p className="text-red-500">{errors.date.message}</p>}
      </div>
    </div>
  );
};

export default EventDetailsSection;
