import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/molecules/Navigation";
import companyLogo from "../assets/images/logo2.png";
import { format } from "date-fns";
import LanguageSwitcher from "../components/languageSwitcher";

const Header: React.FC = () => {
  const currentDate = new Date();
  const formattedDate = format(currentDate, "EEEE, do MMMM yyyy");

  const [isScrolled, setIsScrolled] = useState(false);

  const checkScroll = () => {
    setIsScrolled(window.scrollY >= 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScroll);
    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  return (
    <>
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-2">
        <Link
          to="/"
          className="flex items-center text-lg font-bold tracking-wider mb-4 md:mb-0">
          <img
            src={companyLogo}
            alt="Logo"
            className="w-16 h-16 md:w-20 md:h-20"
          />
          <div className="ml-4 text-green-800">
            <p className="xl:text-2xl md:text-lg leading-tight">
              ACTION TO SAVE GENERATION DEVELOPMENT ORGANIZATION
            </p>
            <p className="xl:text-2xl md:text-lg leading-tight">
              ትውልድን የማዳን እርምጃ ልማት ድርጅት
            </p>
          </div>
        </Link>
        <div className="flex space-x-4 items-center text-green-800">
          <div className="text-xs md:text-sm">{formattedDate}</div>
          <LanguageSwitcher />
        </div>
      </div>
      <header
        className={`${
          isScrolled ? "fixed" : "relative"
        } w-full bg-white text-green-800 z-20 shadow-md transition-shadow`}>
        <Navigation />
      </header>
    </>
  );
};

export default Header;
