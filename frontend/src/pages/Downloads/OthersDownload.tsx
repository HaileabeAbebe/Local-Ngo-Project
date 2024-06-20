import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiCall from "../../services/downloadService";
import { useAppContext } from "../../contexts/AppContext";
import { IDownload } from "../../utils/types";
import SearchAndSort from "../../components/SearchAndSort";
import { filterDownloads } from "../../utils/downloadUtils";
import DownloadList from "../../components/downloads/DownloadList";

const OthersDownload: React.FC = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("recent");
  const { isLoggedIn, user } = useAppContext();

  const { data: downloadsData, isLoading } = useQuery<IDownload[]>(
    "fetchDownloads",
    apiCall.fetchDownloads,
    {
      onError: (error) => {
        if (error instanceof Error) {
          console.error("Error fetching downloads:", error.message);
        }
      },
    }
  );

  const filteredDownloads = downloadsData
    ? filterDownloads(downloadsData, search, "others", sort)
    : [];

  return (
    <div className="bg-white py-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-green-800">Others</h1>
        {isLoggedIn && user && ["editor", "admin"].includes(user.role) && (
          <Link
            to="/add-download"
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
            Add Download
          </Link>
        )}
      </div>
      <SearchAndSort
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
      />
      <DownloadList downloads={filteredDownloads} isLoading={isLoading} />
    </div>
  );
};

export default OthersDownload;
