import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiCall from "../../services/announcementService";
import { useAppContext } from "../../contexts/AppContext";
import { IAnnouncement } from "../../utils/types";
import AnnouncementList from "../../components/announcements/AnnouncementList";

const Announcements: React.FC = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("recent");
  const [activeTab, setActiveTab] = useState("all");
  const { isLoggedIn, user } = useAppContext();

  const { data: announcementsData, isLoading } = useQuery<IAnnouncement[]>(
    "fetchAnnouncements",
    apiCall.fetchAnnouncements,
    {
      onError: (error: unknown) => {
        if (error instanceof Error) {
          console.log(error.message);
        }
      },
    }
  );

  const filteredAnnouncements = announcementsData
    ? announcementsData
        .filter((announcement) =>
          announcement.title.toLowerCase().includes(search.toLowerCase())
        )
        .filter((announcement) => {
          if (activeTab === "all") return true;
          return announcement.title === activeTab;
        })
        .sort((a, b) => {
          switch (sort) {
            case "asc":
              return a.title.localeCompare(b.title);
            case "desc":
              return b.title.localeCompare(a.title);
            case "recent":
              return (
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime()
              );
            default:
              return 0;
          }
        })
    : [];

  return (
    <div className="bg-white py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-800">Announcements</h1>
        {isLoggedIn &&
          user &&
          (user.role === "editor" || user.role === "admin") && (
            <Link
              to="/add-announcement"
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
              Add Announcement
            </Link>
          )}
      </div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab("all")}
            className={`py-2 px-4 rounded ${
              activeTab === "all"
                ? "bg-green-800 text-white"
                : "bg-gray-200 text-gray-800"
            }`}>
            All
          </button>
          <button
            onClick={() => setActiveTab("vacancy")}
            className={`py-2 px-4 rounded ${
              activeTab === "vacancy"
                ? "bg-green-800 text-white"
                : "bg-gray-200 text-gray-800"
            }`}>
            Vacancies
          </button>
          <button
            onClick={() => setActiveTab("news")}
            className={`py-2 px-4 rounded ${
              activeTab === "news"
                ? "bg-green-800 text-white"
                : "bg-gray-200 text-gray-800"
            }`}>
            News
          </button>
        </div>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search announcements..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border w-full md:w-1/2 mb-4 md:mb-0"
          />
          <select
            title="Sort order"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="p-2 border w-full md:w-1/4">
            <option value="asc">Sort by title (A-Z)</option>
            <option value="desc">Sort by title (Z-A)</option>
            <option value="recent">Sort by recent</option>
          </select>
        </div>
      </div>
      <AnnouncementList
        announcements={filteredAnnouncements}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Announcements;
