import { FC } from "react";
import { Link } from "react-router-dom";
import jungleImage from "../assets/images/jungle.jpg"; // Update the path if needed

const HeroSection: FC = () => {
  return (
    <header
      className="relative bg-cover bg-center h-screen text-white"
      style={{
        backgroundImage: `url(${jungleImage})`,
        backgroundSize: "cover",
      }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative flex flex-col items-center justify-center h-full text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Empowering Communities to Protect Our Environment
          </h1>
          <p className="mt-4 text-xl sm:text-2xl">
            Join us in our mission to create a sustainable future for all.
          </p>
          <div className="mt-8 space-x-4">
            <Link
              to="/projects"
              className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-800 hover:bg-green-900 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 md:py-3 md:text-lg md:px-8">
              Learn More
            </Link>
            <Link
              to="/sign-up"
              className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-orange-600 hover:text-white transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 md:py-3 md:text-lg md:px-8">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
