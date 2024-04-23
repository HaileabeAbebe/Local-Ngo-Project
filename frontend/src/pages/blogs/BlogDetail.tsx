import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import * as apiCall from "../../services/apiCall";
import { FiCalendar, FiUser } from "react-icons/fi";
import { IBlog } from "../../utils/types";

const BlogDetail: React.FC = () => {
  const { blogId } = useParams() as { blogId: string };

  const {
    data: blogData,
    isLoading,
    error,
  } = useQuery<IBlog>(
    ["fetchBlog", blogId],
    () => (blogId ? apiCall.fetchBlogById(blogId) : Promise.reject("No ID")),
    {
      onError: (error: unknown) => {
        if (error instanceof Error) {
          console.log(error.message);
        }
      },
    }
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>An error occurred while fetching the blog.</span>;
  }

  if (!blogData) {
    return <span>No blog found.</span>;
  }

  return (
    <div className="container mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-green-800 mb-4">
        {blogData.title}
      </h1>
      <p className="mb-4 text-gray-700">{blogData.content}</p>
      <div className="flex items-center mb-4 text-gray-700">
        <FiCalendar className="mr-2" />
        Date: {new Date(blogData.date).toLocaleDateString()}
      </div>
      <div className="flex items-center mb-4 text-gray-700">
        <FiUser className="mr-2" />
        Author: {blogData.author}
      </div>
      {blogData.imageURL && (
        <div className="mt-6">
          <img
            className="object-cover w-full h-64 transition-transform duration-500 ease-in-out transform hover:scale-105"
            src={blogData.imageURL}
            alt={blogData.title}
          />
        </div>
      )}
    </div>
  );
};

export default BlogDetail;
