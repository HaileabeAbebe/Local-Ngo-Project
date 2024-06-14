// utils/downloadUtils.ts
import { IDownload } from "./types";

export const filterDownloads = (
  downloads: IDownload[],
  search: string,
  category: string,
  sort: string
): IDownload[] => {
  return downloads
    .filter((download) => download.type === category)
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
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        default:
          return 0;
      }
    });
};
