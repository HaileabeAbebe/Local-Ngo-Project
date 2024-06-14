import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiCall from "../services/eventService";
import { IEvent } from "../utils/types";

const RecentEventSection: React.FC = () => {
  const {
    data: eventsData,
    isLoading,
    error,
  } = useQuery<IEvent[]>("fetchEvents", apiCall.fetchEvents, {
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.log(error.message);
      }
    },
  });

  if (error) {
    console.log("Error fetching events:", error);
  }

  const recentEvent = eventsData
    ? [...eventsData].sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )[0]
    : null;

  return (
    <section className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-40 text-center flex flex-col items-center justify-center h-full">
        <h2 className="text-4xl font-bold mb-8 text-green-800">Recent Event</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : recentEvent ? (
          <div className="relative border border-gray-200 rounded-lg overflow-hidden shadow-lg bg-white group w-full h-full flex items-center justify-center">
            {recentEvent.imageUrls && recentEvent.imageUrls.length > 0 ? (
              <img
                src={recentEvent.imageUrls[0]}
                alt={recentEvent.title}
                className="absolute inset-0 w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <p>No image available</p>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white px-4">
              <h3 className="text-3xl font-bold mb-4">{recentEvent.title}</h3>
              <p className="text-lg mb-6">{recentEvent.description}</p>
              <Link
                to={`/events/${recentEvent._id}`}
                className="inline-block bg-gradient-to-r from-orange-400 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-500 hover:to-orange-700 transition-colors duration-300 shadow-lg">
                Read More
              </Link>
            </div>
          </div>
        ) : (
          <p>No recent events found.</p>
        )}
      </div>
    </section>
  );
};

export default RecentEventSection;
