import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import * as apiCall from "../../services/apiCall";
import { FiEdit2, FiCalendar, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";

const NewsDetail: React.FC = () => {
  const { newsId } = useParams() as { newsId: string };
  const { isLoggedIn, user } = useAppContext();
  const navigate = useNavigate();

  const { data: newsData } = useQuery(
    ["fetchNews", newsId],
    () => (newsId ? apiCall.fetchNewsById(newsId) : Promise.reject("No ID")),
    {
      onError: (error: unknown) => {
        if (error instanceof Error) {
          console.log(error.message);
        }
      },
    }
  );

  const mutation = useMutation(apiCall.deleteNewsById, {
    onSuccess: () => {
      navigate("/news");
    },
    onError: (error) => {
      console.error("Error deleting news:", error);
    },
  });

  const handleDelete = () => {
    mutation.mutate(newsId);
  };

  const [mainImage, setMainImage] = useState<string | undefined>();

  useEffect(() => {
    if (newsData?.imageUrls.length) {
      setMainImage(newsData.imageUrls[0]);
    }
  }, [newsData]);

  if (!newsData) {
    return <span>Loading...</span>;
  }
  console.log(newsData);

  return (
    <div className="container mx-auto p-4 bg-green-100 shadow-lg rounded-lg">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-green-800 mb-4">
          {newsData.title}
        </h1>
        {isLoggedIn &&
          user &&
          (user._id === newsData.createdBy?._id || user.role === "admin") && (
            <div className="flex items-center space-x-4">
              <Link
                to={`/edit-news/${newsData._id}`}
                className="flex items-center space-x-2 text-green-800 hover:text-orange-500">
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
      <div className="mb-4 text-gray-700">{newsData.content}</div>
      <div className="flex items-center mb-4 text-gray-700">
        <FiCalendar className="mr-2" />
        Published Date: {new Date(newsData.createdAt).toLocaleDateString()}
      </div>
      <img
        src={mainImage}
        alt={newsData.title}
        className="w-full object-cover h-[40vh] md:h-[60vh] lg:h-[70vh] rounded-lg shadow-md"
      />
      <div className="grid grid-cols-3 gap-4 mt-4">
        {newsData.imageUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt=""
            className="cursor-pointer object-cover w-full h-32 rounded-lg shadow-md hover:opacity-75"
            onClick={() => setMainImage(url)}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsDetail;
