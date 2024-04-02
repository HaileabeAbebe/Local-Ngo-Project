import { useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiCheckCircle,
  FiClock,
  FiCalendar,
} from "react-icons/fi";

export interface IProject {
  _id: string;
  title: string;
  description: string;
  status: string; // 'ongoing', 'finished'
  startDate: Date;
  endDate: Date;
  imageUrls: string[];
  createdBy: string;
  isApproved: boolean;
}

type Props = {
  project: IProject;
};

const ProjectCard: React.FC<Props> = ({ project }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? project.imageUrls.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === project.imageUrls.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="border border-gray-300 rounded p-6 m-4 flex flex-col items-start relative">
      <div className="absolute top-2 right-2">
        {project.status === "ongoing" ? (
          <FiClock className="text-green-500 w-7 h-7" />
        ) : (
          <FiCheckCircle className="text-red-500 w-7 h-7" />
        )}
      </div>
      <h2 className="text-2xl font-bold mb-4 text-green-800 truncate w-full">
        {project.title}
      </h2>
      <p className="mb-6 text-gray-700 line-clamp-3">{project.description}</p>
      <div className="flex items-center mb-6 text-gray-700">
        <FiCalendar className="mr-2" />
        Start Date: {new Date(project.startDate).toLocaleDateString()}
      </div>
      <div className="flex items-center mb-6 text-gray-700">
        <FiCalendar className="mr-2" />
        End Date: {new Date(project.endDate).toLocaleDateString()}
      </div>

      {project.imageUrls.length > 0 ? (
        <div className="relative w-full mt-6">
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-green-800 text-white rounded-full cursor-pointer hover:bg-green-700"
            onClick={handlePrevImage}>
            <FiChevronLeft className="h-6 w-6" />
          </button>
          <img
            className="object-cover w-full h-64"
            src={project.imageUrls[currentImageIndex]}
            alt={project.title}
          />
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-green-800 text-white rounded-full cursor-pointer hover:bg-green-700"
            onClick={handleNextImage}>
            <FiChevronRight className="h-6 w-6" />
          </button>
        </div>
      ) : (
        <p className="mt-6 text-gray-700">
          No images available for this project.
        </p>
      )}
    </div>
  );
};

export default ProjectCard;
