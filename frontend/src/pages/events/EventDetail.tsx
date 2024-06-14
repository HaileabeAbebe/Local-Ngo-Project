import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import * as apiCall from "../../services/eventService";
import { FiEdit2, FiCalendar, FiTrash2, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";

const EventDetail: React.FC = () => {
  const { eventId } = useParams() as { eventId: string };
  const { isLoggedIn, user } = useAppContext();
  const navigate = useNavigate();

  const { data: eventData } = useQuery(
    ["fetchEvent", eventId],
    () => (eventId ? apiCall.fetchEventById(eventId) : Promise.reject("No ID")),
    {
      onError: (error: unknown) => {
        if (error instanceof Error) {
          console.log(error.message);
        }
      },
    }
  );

  const mutation = useMutation(apiCall.deleteEventById, {
    onSuccess: () => {
      navigate("/events");
    },
    onError: (error) => {
      console.error("Error deleting event:", error);
    },
  });

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      mutation.mutate(eventId);
    }
  };

  const [mainImage, setMainImage] = useState<string | undefined>();

  useEffect(() => {
    if (eventData?.imageUrls.length) {
      setMainImage(eventData.imageUrls[0]);
    }
  }, [eventData]);

  if (!eventData) {
    return <span>Loading...</span>;
  }

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex flex-col md:flex-row md:space-x-6">
        <div className="flex-1">
          <img
            src={mainImage}
            alt={eventData.title}
            className="w-full object-cover h-[30vh] md:h-[50vh] lg:h-[60vh] rounded-lg shadow-md"
          />
          <div className="grid grid-cols-4 gap-2 mt-4">
            {eventData.imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt=""
                className="cursor-pointer object-cover w-full h-24 rounded-lg shadow-md hover:opacity-75"
                onClick={() => setMainImage(url)}
              />
            ))}
          </div>
        </div>
        <div className="flex-1 mt-6 md:mt-0">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-800">
              {eventData.title}
            </h1>
            {isLoggedIn &&
              user &&
              (user._id === eventData.createdBy?._id ||
                user.role === "admin") && (
                <div className="flex items-center space-x-4">
                  <Link
                    to={`/edit-event/${eventData._id}`}
                    className="flex items-center space-x-2 text-gray-800 hover:text-orange-500">
                    <FiEdit2 className="w-5 h-5" />
                    <span>Edit</span>
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="flex items-center space-x-2 text-white bg-red-500 rounded px-3 py-1 hover:bg-red-700">
                    <FiTrash2 className="w-5 h-5" />
                    <span>Delete</span>
                  </button>
                </div>
              )}
          </div>
          <div className="text-gray-700 mb-4">{eventData.description}</div>
          <div className="flex items-center text-gray-600 mb-4">
            <FiUser className="mr-2" />
            <p>{eventData.createdBy?.username}</p>
          </div>
          <div className="flex items-center text-gray-600">
            <FiCalendar className="mr-2" />
            <p>{new Date(eventData.date).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
