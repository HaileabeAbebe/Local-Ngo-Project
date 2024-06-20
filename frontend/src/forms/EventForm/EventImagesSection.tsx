import { useFormContext } from "react-hook-form";
import { EventFormData } from "../../utils/types";

const EventImagesSection = () => {
  const { register } = useFormContext<EventFormData>();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-3 text-green-800">Event Images</h2>
      <div className="mb-4">
        <label
          htmlFor="imageFiles"
          className="block text-gray-700 font-bold mb-2">
          Upload Images:
        </label>
        <input
          type="file"
          id="imageFiles"
          multiple
          {...register("imageFiles")}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800"
        />
      </div>
    </div>
  );
};

export default EventImagesSection;
