import { FC, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { useAppContext } from "../../contexts/AppContext";
const Profile: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAppContext();

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="relative inline-block text-left  z-20">
      <button
        className="inline-flex justify-center items-center text-base font-medium  hover:text-green-500 focus:outline-none"
        onClick={toggleOpen}>
        <FaUserAlt className="h-6 w-6" aria-hidden="true" />
      </button>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu">
            <p
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem">
              {user?.username}
            </p>
            <p
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem">
              {user?.email}
            </p>
            <button
              onClick={signOut}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem">
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
