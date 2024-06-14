import { FiCalendar, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import { IEvent } from "../../utils/types";

type Props = {
  event: IEvent;
};

const EventCard: React.FC<Props> = ({ event }) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-md bg-white transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg w-[22rem] h-auto">
      {event.imageUrls.length > 0 ? (
        <Link to={`/events/${event._id}`}>
          <img
            className="object-cover w-full h-48"
            src={event.imageUrls[0]}
            alt={event.title}
          />
        </Link>
      ) : (
        <div className="flex items-center justify-center w-full h-48 bg-gray-100 text-gray-500">
          No image available
        </div>
      )}
      <div className="p-4 flex flex-col justify-between h-auto">
        <div className="mb-4">
          <Link to={`/events/${event._id}`}>
            <h2 className="text-lg font-semibold mb-2 text-gray-900 truncate">
              {event.title}
            </h2>
          </Link>
          <Link to={`/events/${event._id}`}>
            <p className="text-gray-700 mb-4 line-clamp-3">
              {event.description}
            </p>
          </Link>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center text-gray-600">
            <FiUser className="mr-2" />
            <p className="text-sm">{event.createdBy?.username}</p>
          </div>
          <div className="flex items-center text-gray-600">
            <FiCalendar className="mr-2" />
            <p className="text-sm">
              {new Date(event.date).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
