import { FC } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "../components/molecules/Navigation";
import HeroSection from "../components/Hero";
import jungleImage from "../assets/images/jungle.jpg";

const Header: FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <header
      className={`relative ${
        isHomePage
          ? "bg-cover bg-center h-screen text-white"
          : "bg-white text-green-800"
      }`}
      style={isHomePage ? { backgroundImage: `url(${jungleImage})` } : {}}>
      <Navigation />
      {isHomePage && <HeroSection />}
    </header>
  );
};

export default Header;

// import { FC } from "react";
// import Navigation from "../components/molecules/Navigation";

// const Header: FC = () => {
//   return (
//     <header className="bg-white text-white h-20 p-4">
//       <div className="container mx-auto">
//         <Navigation />
//       </div>
//     </header>
//   );
// };

// export default Header;
