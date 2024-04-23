import React from "react";
import {
  FaNewspaper,
  FaBlog,
  FaUsers,
  FaUser,
  FaCog,
  FaHome,
  FaTasks,
  FaChartLine,
  FaEnvelope,
  FaInfoCircle,
  FaTachometerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-gray-300 text-gray-800 w-64 space-y-6 py-7 px-2 transition-transform duration-200 ease-in-out">
      <Link to="/" className="text-white flex items-center space-x-2 px-4">
        <FaTachometerAlt className="w-8 h-8 text-green-700 mr-2" />
        <span className="text-2xl font-extrabold text-green-800">
          Dashboard
        </span>
      </Link>
      <nav>
        <h2 className="px-4 text-sm font-semibold text-gray-500 mt-4">Main</h2>
        <Link
          to="/"
          className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-500 hover:text-white">
          <FaHome className="mr-2" /> <span>Home</span>
        </Link>
        <Link
          to="/analytics"
          className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-500 hover:text-white">
          <FaChartLine className="mr-2" /> <span>Analytics</span>
        </Link>
        <h2 className="px-4 text-sm font-semibold text-gray-500 mt-4">
          Content
        </h2>
        <Link
          to="/projects"
          className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-500 hover:text-white">
          <FaTasks className="mr-2" /> <span>Projects</span>
        </Link>
        <Link
          to="/news"
          className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-500 hover:text-white">
          <FaNewspaper className="mr-2" /> <span>News</span>
        </Link>
        <Link
          to="/blogs"
          className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-500 hover:text-white">
          <FaBlog className="mr-2" /> <span>Blogs</span>
        </Link>
        <h2 className="px-4 text-sm font-semibold text-gray-400 mt-4">Users</h2>
        <Link
          to="/users"
          className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-500 hover:text-white">
          <FaUser className="mr-2" /> <span>Users</span>
        </Link>
        <Link
          to="/team-members"
          className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-500 hover:text-white">
          <FaUsers className="mr-2" /> <span>Team Members</span>
        </Link>
        <h2 className="px-4 text-sm font-semibold text-gray-400 mt-4">
          Others
        </h2>
        <Link
          to="/contact"
          className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-500 hover:text-white">
          <FaEnvelope className="mr-2" /> <span>Contact</span>
        </Link>
        <Link
          to="/about-us"
          className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-500 hover:text-white">
          <FaInfoCircle className="mr-2" /> <span>About Us</span>
        </Link>
        <Link
          to="/settings"
          className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-500 hover:text-white">
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
