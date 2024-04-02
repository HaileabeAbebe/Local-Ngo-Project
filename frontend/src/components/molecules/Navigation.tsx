import { FC, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import companyLogo from "../../assets/images/logo2.png";

const Navigation: FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isPageScrolled, setIsPageScrolled] = useState(false);

  const location = useLocation();
  const isHomePage = location.pathname === "/";

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

  useEffect(() => {
    const handleScroll = () => {
      setIsPageScrolled(window.scrollY > window.innerHeight - 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsPageScrolled(false);
  }, [location]);

  return (
    <div className="relative">
      <nav
        className={`container mx-auto py-5  fixed flex justify-between items-center z-10 ${
          isPageScrolled || !isHomePage
            ? "bg-white text-green-800"
            : "bg-opacity-50 text-white"
        }`}>
        <Link to="/" className="text-2xl font-bold tracking-wider">
          <img src={companyLogo} alt="Logo" className="w-10 h-10" />{" "}
        </Link>
        <button
          className={`block lg:hidden focus:outline-none ${
            isPageScrolled || !isHomePage ? "text-green-800" : "text-white"
          } p-2 ${isNavOpen ? "text-white rounded" : ""}`}
          onClick={toggleNav}>
          {isNavOpen ? (
            <FiX size={24} />
          ) : (
            <FiMenu size={24} className="w-6 h-6" />
          )}
        </button>
        <div
          className={`space-x-8 transition duration-300 ease-in-out overflow-hidden lg:flex ${
            isNavOpen
              ? "flex flex-col align-center absolute p-3 top-full left-0 bg-white text-green-900 rounded-b shadow-md w-full lg:static lg:bg-transparent"
              : "hidden"
          }`}
          onClick={() => isNavOpen && setIsNavOpen(false)}>
          <Link
            to="/"
            className="font-sans font-semibold text-lg py-2 hover:text-green-400 block lg:inline-block">
            Home
          </Link>
          <Link
            to="/projects"
            className="font-sans font-semibold text-lg py-2 hover:text-green-400 block lg:inline-block">
            Projects
          </Link>
          <Link
            to="/blog"
            className="font-sans font-semibold text-lg py-2 hover:text-green-400 block lg:inline-block">
            Blog
          </Link>
          <Link
            to="/about"
            className="font-sans font-semibold text-lg py-2 hover:text-green-400 block lg:inline-block">
            About
          </Link>
          <Link
            to="/contact"
            className="font-sans font-semibold text-lg py-2 hover:text-green-400 block lg:inline-block">
            Contact
          </Link>
          <Link
            to="/sign-up"
            className="font-sans bg-green-800 text-white font-semibold px-6 py-2 rounded-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:bg-green-400 text-center text-lg block lg:inline-block">
            Join
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
