import { IEvent } from "../../utils/types";
import EventCard from "./EventCard";
import { FiLoader } from "react-icons/fi";

interface EventsListProps {
  events: IEvent[];
  isLoading: boolean;
}

const EventsList: React.FC<EventsListProps> = ({ events, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FiLoader className="animate-spin text-gray-500 text-3xl" />
        <span className="ml-2 text-gray-500 text-xl">Loading events...</span>
      </div>
    );
  }

  if (!events || events.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-gray-500 text-xl">No events found</span>
      </div>
    );
  }

  return (
    <div className="grid gap-x-5 gap-y-7 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6 justify-items-center">
      {events.map((event: IEvent) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
};

export default EventsList;
