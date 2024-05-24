import { FC } from "react";
import { IDownload } from "../../utils/types";

interface DownloadListProps {
  downloads: IDownload[];
  isLoading: boolean;
}

const DownloadList: FC<DownloadListProps> = ({ downloads, isLoading }) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (downloads.length === 0) {
    return <div>No downloads available.</div>;
  }

  return (
    <div className="download-list">
      {downloads.map((download) => (
        <div key={download._id} className="download-item">
          <h3>{download.title}</h3>
          <p>{download.description}</p>
          <a href={download.fileUrl} download>
            Download
          </a>
        </div>
      ))}
    </div>
  );
};

export default DownloadList;
