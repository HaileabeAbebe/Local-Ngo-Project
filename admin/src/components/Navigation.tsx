// Navigation.tsx
import React from "react";
import { FaUserCircle, FaBell } from "react-icons/fa";
import companyLogo from "../assets/images/logo2.png";

const Navigation: React.FC = () => {
  return (
    <nav className="flex items-center justify-between bg-gray-300 p-6 text-white shadow-md">
      <div className="flex items-center space-x-2">
        <img
          src={companyLogo}
          alt="Logo"
          className="w-10 h-10 object-contain"
        />{" "}
        {/* Replace with your actual logo path */}
        <span className="text-2xl font-bold text-gray-800">Green Pro </span>
      </div>
      <div className="flex items-center space-x-4 text-green-800">
        <FaBell className="w-6 h-6 cursor-pointer" />
        <div className="flex items-center space-x-2">
          <FaUserCircle className="w-8 h-8" />
          <span>Admin</span>
        </div>
        <a href="#" className="hover:text-green-600">
          Logout
        </a>
      </div>
    </nav>
  );
};

export default Navigation;
