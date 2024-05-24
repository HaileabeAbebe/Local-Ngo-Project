import { FiCalendar, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import { INews } from "../../utils/types";

type Props = {
  news: INews;
};

const NewsCard: React.FC<Props> = ({ news }) => {
  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden shadow-lg bg-white transition-transform duration-500 ease-in-out transform hover:scale-105 w-[22rem] h-96">
      {news.imageUrls.length > 0 ? (
        <Link to={`/news/${news._id}`}>
          <img
            className="object-cover w-full h-40"
            src={news.imageUrls[0]}
            alt={news.title}
          />
        </Link>
      ) : (
        <div className="flex items-center justify-center w-full h-40 bg-gray-100 text-gray-500">
          No image available
        </div>
      )}
      <div className="p-4 flex flex-col justify-between h-56">
        <div>
          <Link to={`/news/${news._id}`}>
            <h2 className="text-xl font-bold mb-2 text-gray-900 truncate">
              {news.title}
            </h2>
          </Link>
          <Link to={`/news/${news._id}`}>
            <p className="text-gray-700 mb-4 line-clamp-3 h-[4.5rem]]">
              {news.content}
            </p>
          </Link>
        </div>
        <div>
          <div className="flex items-center text-gray-600 mb-2">
            <FiUser className="mr-2" />
            <p>{news.createdBy?.username}</p>
          </div>
          <div className="flex items-center text-gray-600">
            <FiCalendar className="mr-2" />
            <p>{new Date(news.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
