import { IDownload } from "../../utils/types";
import { FiDownload } from "react-icons/fi";
import { saveAs } from "file-saver";

interface DownloadLinkProps {
  download: IDownload;
}

const DownloadLink: React.FC<DownloadLinkProps> = ({ download }) => {
  const handleDownload = async () => {
    const response = await fetch(download.fileUrl);
    const blob = await response.blob();
    saveAs(blob, download.title);
  };

  return (
    <button
      onClick={handleDownload}
      className="flex items-center text-blue-800 text-xl hover:underline capitalize">
      <FiDownload className="mr-2" />
      {download.title}
    </button>
  );
};

export default DownloadLink;
