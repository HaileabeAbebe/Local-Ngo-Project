import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import DownloadList from "../../components/downloads/DownloadList";
import * as apiCall from "../../services/apiCall";
import { useAppContext } from "../../contexts/AppContext";
import { IDownload } from "../../utils/types";

const Downloads: React.FC = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("recent");
  const { isLoggedIn, user } = useAppContext();

  const { data: downloadsData, isLoading } = useQuery<IDownload[]>(
    "fetchDownloads",
    apiCall.fetchDownloads,
    {
      onError: (error: unknown) => {
        if (error instanceof Error) {
          console.log(error.message);
        }
      },
    }
  );

  const filteredDownloads = downloadsData
    ? downloadsData
        .filter((download) =>
          download.title.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => {
          switch (sort) {
            case "asc":
              return a.title.localeCompare(b.title);
            case "desc":
              return b.title.localeCompare(a.title);
            case "recent":
              return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
              );
            default:
              return 0;
          }
        })
    : [];

  return (
    <div className="bg-white py-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-green-800">Downloads</h1>
        {isLoggedIn &&
          user &&
          (user.role === "editor" || user.role === "admin") && (
            <Link
              to="/add-download"
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
              Add Download
            </Link>
          )}
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search downloads..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border w-full"
        />
      </div>
      <div className="mb-4">
        <select
          title="Sort order"
          value={sort}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setSort(e.target.value)
          }
          className="p-2 border">
          <option value="asc">Sort by title (A-Z)</option>
          <option value="desc">Sort by title (Z-A)</option>
          <option value="recent">Sort by recent</option>
        </select>
      </div>
      <DownloadList downloads={filteredDownloads} isLoading={isLoading} />
    </div>
  );
};

export default Downloads;
