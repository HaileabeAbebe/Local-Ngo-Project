import React from "react";
import {
  FaNewspaper,
  FaBlog,
  FaCommentDots,
  FaUsers,
  FaUser,
  FaCog,
  FaHome,
  FaTasks,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 transition-transform duration-200 ease-in-out">
      <Link to="/" className="text-white flex items-center space-x-2 px-4">
        <FaHome className="w-8 h-8 text-green-500 mr-2" />
        <span className="text-2xl font-extrabold">Dashboard</span>
      </Link>
      <nav>
        <Link
          to="/projects"
          className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-green-600">
          <FaTasks className="mr-2" /> <span>Projects</span>
        </Link>
        <Link
          to="/news"
          className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-green-600">
          <FaNewspaper className="mr-2" /> <span>News</span>
        </Link>
        <Link
          to="/blog"
          className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-green-600">
          <FaBlog className="mr-2" /> <span>Blog</span>
        </Link>
        <Link
          to="/users"
          className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-green-600">
          <FaUser className="mr-2" /> <span>Users</span>
        </Link>
        <Link
          to="/testimonials"
          className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-green-600">
          <FaCommentDots className="mr-2" /> <span>Testimonials</span>
        </Link>
        <Link
          to="/team"
          className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-green-600">
          <FaUsers className="mr-2" /> <span>Team Members</span>
        </Link>
        <Link
          to="/settings"
          className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-green-600">
          <FaCog className="mr-2" /> <span>Settings</span>
        </Link>
      </nav>
      <footer className="mt-auto text-center text-sm text-gray-300 flex items-end">
        © 2024 NGO Green Environment
      </footer>
    </aside>
  );
};

export default Sidebar;
