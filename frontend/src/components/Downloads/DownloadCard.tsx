import { IDownload } from "../../utils/types";
import DownloadLink from "./DownloadLink";

interface DownloadCardProps {
  download: IDownload;
}

const DownloadCard: React.FC<DownloadCardProps> = ({ download }) => {
  return (
    <div className="mb-6">
      <h2 className="text-green-800 font-semibold text-2xl mb-2 capitalize">
        {download.category}
      </h2>
      <DownloadLink download={download} />
    </div>
  );
};

export default DownloadCard;
