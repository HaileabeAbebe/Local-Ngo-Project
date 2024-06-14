import { Link } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";
import { useTranslation } from "react-i18next";
import Profile from "../molecules/Profile";
import { FaTachometerAlt } from "react-icons/fa";

const AdminHeader: React.FC = () => {
  const { user, isLoggedIn } = useAppContext();
  const { t } = useTranslation();

  return (
    <header className="bg-gray-900 text-gray-100 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-4 lg:px-8">
        <Link
          to="/admin/overview"
          className="text-white flex items-center space-x-2 px-4">
          <FaTachometerAlt className="w-8 h-8 text-green-600 mr-2" />
          <span className="text-2xl font-extrabold text-green-600">
            Dashboard
          </span>
        </Link>
        <div className="flex items-center space-x-4">
          {user && isLoggedIn ? (
            <Profile />
          ) : (
            <Link
              to="/sign-in"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500">
              {t("signIn")}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
