import { Link } from "react-router-dom";
import { FiCalendar, FiUser } from "react-icons/fi";
import { IBlog } from "../../utils/types";

type Props = {
  blog: IBlog;
};

const BlogCard: React.FC<Props> = ({ blog }) => {
  return (
    <div className="border border-gray-300 rounded p-6 m-4 flex flex-col items-start relative bg-white shadow-lg">
      <Link to={`/blogs/${blog._id}`}>
        <h2 className="text-2xl font-bold mb-4 text-green-800 truncate w-full">
          {blog.title}
        </h2>
        <p className="mb-6 text-gray-700 line-clamp-3">{blog.content}</p>
      </Link>
      <div className="flex items-center mb-6 text-gray-700">
        <FiCalendar className="mr-2" />
        Date: {new Date(blog.date).toLocaleDateString()}
      </div>
      <div className="flex items-center mb-6 text-gray-700">
        <FiUser className="mr-2" />
        createdBy: {blog.createdBy}
      </div>
      {blog.imageURLs && (
        <div className="mt-6">
          <img
            className="object-cover w-full h-64 transition-transform duration-500 ease-in-out transform hover:scale-105"
            src={blog.imageURLs[0]}
            alt={blog.title}
          />
        </div>
      )}
    </div>
  );
};

export default BlogCard;
