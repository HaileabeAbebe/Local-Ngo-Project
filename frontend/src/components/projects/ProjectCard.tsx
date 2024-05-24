import { useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiCheckCircle,
  FiClock,
  FiCalendar,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { IUser } from "../../utils/types";

export interface IProject {
  _id: string;
  title: string;
  description: string;
  status: string; // 'ongoing', 'finished'
  startDate: Date;
  endDate: Date;
  imageUrls: string[];
  docUrls: string[];
  createdBy: IUser;
  isApproved: boolean;
  lastUpdated?: Date;
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
    <div className="border border-gray-300 rounded-lg overflow-hidden shadow-lg bg-white transition-transform duration-500 ease-in-out transform w-full h-full p-6 flex flex-col">
      <div className="absolute top-2 right-2 flex items-center space-x-2">
        {project.status === "ongoing" ? (
          <FiClock className="text-green-500 w-7 h-7" />
        ) : (
          <FiCheckCircle className="text-red-500 w-7 h-7" />
        )}
      </div>
      <Link to={`/project/${project._id}`} className="flex-grow flex flex-col">
        <h2 className="text-xl font-bold mb-2 text-gray-900 truncate">
          {project.title}
        </h2>
        <p className="text-gray-700 mb-4 line-clamp-3 flex-grow">
          {project.description}
        </p>
        <div className="flex items-center text-gray-600 mb-2">
          <FiCalendar className="mr-2" />
          Start Date: {new Date(project.startDate).toLocaleDateString()}
        </div>
        <div className="flex items-center text-gray-600">
          <FiCalendar className="mr-2" />
          End Date: {new Date(project.endDate).toLocaleDateString()}
        </div>
      </Link>
      {project.imageUrls.length > 0 ? (
        <div className="relative w-full h-48 mt-2">
          <button
            title="Previous image"
            style={{ zIndex: 1 }}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-green-800 text-white rounded-r-full cursor-pointer hover:bg-green-700"
            onClick={handlePrevImage}>
            <FiChevronLeft className="h-6 w-6" />
          </button>
          <div>
            <Link to={`/project/${project._id}`}>
              <img
                className="object-cover rounded-lg w-full h-full transition-transform duration-500 ease-in-out transform hover:scale-105 "
                src={project.imageUrls[currentImageIndex]}
                alt={project.title}
              />
            </Link>
          </div>
          <button
            title="Next image"
            style={{ zIndex: 1 }}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-green-800 text-white rounded-l-full cursor-pointer hover:bg-green-700"
            onClick={handleNextImage}>
            <FiChevronRight className="h-6 w-6" />
          </button>
        </div>
      ) : (
        <p className="mt-2 text-gray-700">
          No images available for this project.
        </p>
      )}
    </div>
  );
};

export default ProjectCard;
