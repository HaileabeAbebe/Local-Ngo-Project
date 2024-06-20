import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import * as apiCall from "../../services/newsService";
import { FiEdit2, FiCalendar, FiTrash2, FiUser } from "react-icons/fi";
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
    if (window.confirm("Are you sure you want to delete this news article?")) {
      mutation.mutate(newsId);
    }
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

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex flex-col lg:flex-row lg:space-x-6">
        <div className="lg:w-2/3">
          <img
            src={mainImage}
            alt={newsData.title}
            className="w-full object-cover h-[40vh] md:h-[50vh] lg:h-[60vh] rounded-lg shadow-md"
          />
          <div className="grid grid-cols-4 gap-2 mt-4">
            {newsData.imageUrls.map((url: string, index: number) => (
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
        <div className="lg:w-1/3 mt-6 lg:mt-0">
          <div className="flex flex-col h-full justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {newsData.title}
              </h1>
              <div className="text-gray-700 mb-4">{newsData.content}</div>
              <div className="flex items-center text-gray-600 mb-4">
                <FiUser className="mr-2" />
                <p>{newsData.createdBy?.username}</p>
              </div>
              <div className="flex items-center text-gray-600">
                <FiCalendar className="mr-2" />
                <p>
                  Published Date:{" "}
                  {new Date(newsData.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            {isLoggedIn &&
              user &&
              (user._id === newsData.createdBy?._id ||
                user.role === "admin") && (
                <div className="flex items-center space-x-4 mt-4">
                  <Link
                    to={`/edit-news/${newsData._id}`}
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
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
