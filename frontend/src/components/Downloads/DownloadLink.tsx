interface DownloadLinkProps {
  fileUrl: string;
  title: string;
}

const DownloadLink: React.FC<DownloadLinkProps> = ({ fileUrl, title }) => {
  return (
    <a
      href={fileUrl}
      download
      className="text-green-800 hover:underline"
      target="_blank"
      rel="noopener noreferrer">
      {title}
    </a>
  );
};

export default DownloadLink;
