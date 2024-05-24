import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { useAppContext } from "../../contexts/AppContext";
import Profile from "./Profile";
import { useTranslation } from "react-i18next";

const Navigation: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { user, isLoggedIn } = useAppContext();
  const { t } = useTranslation();

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsNavOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative container mx-auto">
      <nav className="py-2 flex justify-between items-center z-10 min-w-full bg-white text-black px-4 xl:pl-8">
        <div className="flex items-center">
          <button
            className={`block lg:hidden focus:outline-none mr-5 text-green-800 p-2`}
            onClick={toggleNav}>
            {isNavOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <div
            className={`space-x-8 transition duration-300 ease-in-out overflow-hidden lg:flex mr-auto ${
              isNavOpen
                ? "flex flex-col align-center absolute p-3 top-full left-0 bg-white text-black rounded-b shadow-md w-full lg:static lg:bg-transparent"
                : "hidden"
            }`}
            onClick={() => isNavOpen && setIsNavOpen(false)}>
            <Link
              to="/"
              className="font-sans font-semibold text-lg py-2 hover:text-green-400 block xl:inline-block">
              {t("home")}
            </Link>
            <Link
              to="/projects"
              className="font-sans font-semibold text-lg py-2 hover:text-green-400 block xl:inline-block">
              {t("projects")}
            </Link>
            <div className="group inline-block">
              <button className="font-sans font-semibold text-lg py-2 hover:text-green-400 block xl:inline-block">
                {t("news")} & {t("events")}{" "}
                <FiChevronDown className="inline-block" />
              </button>
              <div className="hidden group-hover:block absolute bg-white text-black rounded-b shadow-md px-8 py-2">
                <Link to="/news" className="block py-2 hover:text-green-400">
                  {t("news")}
                </Link>
                <Link to="/events" className="block py-2 hover:text-green-400">
                  {t("events")}
                </Link>
              </div>
            </div>
            <div className="group inline-block">
              <button className="font-sans font-semibold text-lg py-2 hover:text-green-400 block xl:inline-block">
                {t("about")} <FiChevronDown className="inline-block" />
              </button>
              <div className="hidden group-hover:block absolute bg-white text-black rounded-b shadow-md px-8 py-2">
                <Link
                  to="/official-profile"
                  className="block py-2 hover:text-green-400">
                  {t("officialProfile")}
                </Link>
                <Link
                  to="/background-history"
                  className="block py-2 hover:text-green-400">
                  {t("backgroundHistory")}
                </Link>
                <Link
                  to="/mission-vision-values"
                  className="block py-2 hover:text-green-400">
                  {t("missionVisionValues")}
                </Link>
                <Link
                  to="/organizational-structure"
                  className="block py-2 hover:text-green-400">
                  {t("organizationalStructure")}
                </Link>
                <Link
                  to="/term-conditions"
                  className="block py-2 hover:text-green-400">
                  {t("termAndConditions")}
                </Link>
              </div>
            </div>
            <div className="group inline-block">
              <button className="font-sans font-semibold text-lg py-2 hover:text-green-400 block xl:inline-block">
                {t("downloads")} <FiChevronDown className="inline-block" />
              </button>
              <div className="hidden group-hover:block absolute bg-white text-black rounded-b shadow-md px-8 py-2">
                <Link
                  to="/strategies"
                  className="block py-2 hover:text-green-400">
                  {t("strategies")}
                </Link>
                <Link to="/manuals" className="block py-2 hover:text-green-400">
                  {t("manuals")}
                </Link>
              </div>
            </div>
            <Link
              to="/announcements"
              className="font-sans font-semibold text-lg py-2 hover:text-green-400 block xl:inline-block">
              {t("announcements")}
            </Link>
            <Link
              to="/contact"
              className="font-sans font-semibold text-lg py-2 hover:text-green-400 block xl:inline-block">
              {t("contact")}
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {user && isLoggedIn ? (
            <Profile />
          ) : (
            <Link
              to="/sign-in"
              className="font-sans bg-green-800 text-white font-semibold px-6 py-2 rounded-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:bg-green-400 text-center text-lg block lg:inline-block">
              {t("join")}
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
