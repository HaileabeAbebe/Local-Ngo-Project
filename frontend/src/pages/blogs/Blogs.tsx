import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import BlogCard from "../../components/molecules/BlogCard";
import * as apiCall from "../../services/apiCall";
import { IBlog } from "../../utils/types";

const Blogs: React.FC = () => {
  const {
    data: blogsData,
    isLoading,
    error,
  } = useQuery<IBlog[]>("fetchBlogs", apiCall.fetchBlogs);

  const navigate = useNavigate();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>An error occurred while fetching blogs.</span>;
  }

  return (
    <div className="container mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-green-800 mb-4">Blogs</h1>
      <button
        onClick={() => navigate("/add-blog")}
        className="mb-4 bg-green-800 hover:bg-green-500 text-white font-bold py-2 px-4 rounded">
        Add Blog
      </button>
      {blogsData && blogsData.length > 0 ? (
        blogsData.map((blog: IBlog) => <BlogCard key={blog._id} blog={blog} />)
      ) : (
        <span>No blogs found.</span>
      )}
    </div>
  );
};

export default Blogs;
