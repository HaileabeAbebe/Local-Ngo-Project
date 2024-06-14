import { IAnnouncement } from "../../utils/types";
import { FiLoader } from "react-icons/fi";
import AnnouncementCard from "./AnnouncementCard";

interface AnnouncementListProps {
  announcements: IAnnouncement[];
  isLoading: boolean;
}

const AnnouncementList: React.FC<AnnouncementListProps> = ({
  announcements,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FiLoader className="animate-spin text-gray-500 text-3xl" />
        <span className="ml-2 text-gray-500 text-xl">
          Loading announcements...
        </span>
      </div>
    );
  }

  if (!announcements || announcements.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-gray-500 text-xl">No announcements found</span>
      </div>
    );
  }

  return (
    <div className="grid gap-x-5 gap-y-7 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6 justify-items-center">
      {announcements.map((announcement: IAnnouncement) => (
        <AnnouncementCard key={announcement._id} announcement={announcement} />
      ))}
    </div>
  );
};

export default AnnouncementList;
