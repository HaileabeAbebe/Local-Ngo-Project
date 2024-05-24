import { INews } from "../../utils/types";
import NewsCard from "./NewsCard";
import { FiLoader } from "react-icons/fi";

interface NewsListProps {
  news: INews[];
  isLoading: boolean;
}

const NewsList: React.FC<NewsListProps> = ({ news, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FiLoader className="animate-spin text-gray-500 text-3xl" />
        <span className="ml-2 text-gray-500 text-xl">Loading news...</span>
      </div>
    );
  }

  if (!news || news.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-gray-500 text-xl">No news found</span>
      </div>
    );
  }

  return (
    <div className="grid gap-x-5 gap-y-7 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6 justify-items-center">
      {news.map((newsItem: INews) => (
        <NewsCard key={newsItem._id} news={newsItem} />
      ))}
    </div>
  );
};

export default NewsList;
