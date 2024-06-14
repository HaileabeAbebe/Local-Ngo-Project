import {
  FaNewspaper,
  FaUsers,
  FaUser,
  FaCog,
  FaHome,
  FaTasks,
  FaChartLine,
  FaEnvelope,
  FaInfoCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminSidebar: React.FC = () => {
  return (
    <aside className="bg-gray-900 text-gray-200 w-64 space-y-6 py-7 px-2 fixed inset-y-0 left-0 transform -translate-x-full lg:translate-x-0 lg:static lg:inset-0 transition-transform duration-200 ease-in-out">
      <nav>
        <h2 className="px-4 text-sm font-semibold text-gray-400 mt-4">Main</h2>
        <Link
          to="/"
          className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          <FaHome className="mr-2" /> <span>Home</span>
        </Link>
        <Link
          to="/admin/analytics"
          className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          <FaChartLine className="mr-2" /> <span>Analytics</span>
        </Link>
        <h2 className="px-4 text-sm font-semibold text-gray-400 mt-4">
          Content
        </h2>
        <Link
          to="/admin/projects"
          className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          <FaTasks className="mr-2" /> <span>Projects</span>
        </Link>
        <Link
          to="/admin/news"
          className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          <FaNewspaper className="mr-2" /> <span>News</span>
        </Link>
        <h2 className="px-4 text-sm font-semibold text-gray-400 mt-4">Users</h2>
        <Link
          to="/admin/users"
          className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          <FaUser className="mr-2" /> <span>Users</span>
        </Link>
        <Link
          to="/admin/team-members"
          className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          <FaUsers className="mr-2" /> <span>Team Members</span>
        </Link>
        <h2 className="px-4 text-sm font-semibold text-gray-400 mt-4">
          Others
        </h2>
        <Link
          to="/contact"
          className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          <FaEnvelope className="mr-2" /> <span>Contact</span>
        </Link>
        <Link
          to="/about-us"
          className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          <FaInfoCircle className="mr-2" /> <span>About Us</span>
        </Link>
        <Link
          to="/admin/settings"
          className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          <FaCog className="mr-2" /> <span>Settings</span>
        </Link>
      </nav>
      <footer className="mt-auto text-center text-sm text-gray-400">
        © 2024 NGO Green Environment
      </footer>
    </aside>
  );
};

export default AdminSidebar;
