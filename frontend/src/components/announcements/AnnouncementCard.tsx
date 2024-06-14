import { FiCalendar, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import { IAnnouncement } from "../../utils/types";

type Props = {
  announcement: IAnnouncement;
};

const AnnouncementCard: React.FC<Props> = ({ announcement }) => {
  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden shadow-lg bg-white transition-transform duration-300 ease-in-out transform hover:scale-105 w-[22rem] h-72">
      <div className="p-4 flex flex-col justify-between h-full">
        <div>
          <Link to={`/announcements/${announcement._id}`}>
            <h2 className="text-xl font-bold mb-2 text-gray-900 truncate">
              {announcement.title}
            </h2>
          </Link>
          <Link to={`/announcements/${announcement._id}`}>
            <p className="text-gray-700 mb-4 line-clamp-3 h-[4.5rem]">
              {announcement.content}
            </p>
          </Link>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center text-gray-600 mb-2">
            <FiUser className="mr-2" />
            <p>{announcement.createdBy.username}</p>
          </div>
          <div className="flex items-center text-gray-600">
            <FiCalendar className="mr-2" />
            <p>{new Date(announcement.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;
