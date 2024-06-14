import { FiLoader } from "react-icons/fi";
import { FC } from "react";
import { IDownload } from "../../utils/types";
import DownloadCard from "./DownloadCard";

interface DownloadListProps {
  downloads: IDownload[];
  isLoading: boolean;
}

const DownloadList: FC<DownloadListProps> = ({ downloads, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FiLoader className="animate-spin text-gray-500 text-3xl" />
        <span className="ml-2 text-gray-500 text-xl">Loading files...</span>
      </div>
    );
  }

  if (!downloads || downloads.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-gray-500 text-xl">No files found</span>
      </div>
    );
  }

  return (
    <div className="p-6">
      {downloads.map((download: IDownload) => (
        <DownloadCard key={download._id} download={download} />
      ))}
    </div>
  );
};

export default DownloadList;
