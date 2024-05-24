import { Link } from "react-router-dom";
import children from "../assets/images/children.jpg";

const FeaturedSection = () => {
  return (
    <section className="text-green-800 py-12">
      <div className="container mx-auto flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8">
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-semibold mb-4">
            Empowering Communities
          </h2>
          <h1 className="text-4xl font-bold mb-8 text-gray-800">
            Working Together for a Greener Future and Brighter Tomorrow
          </h1>
          <p className="text-lg mb-8">
            Our NGO is not only dedicated to preserving and protecting the
            environment, but also committed to the welfare of children and
            marginalized communities. Through our environmental initiatives and
            community-focused projects, we strive to make a positive impact on
            the planet and the lives of the people we serve. Join us in our
            mission to create a greener future and a brighter tomorrow.
          </p>
          <div className="flex space-x-4">
            <Link to="/about">
              <button className="bg-green-800 text-white px-8 py-3 rounded-lg font-semibold">
                Learn More
              </button>
            </Link>
            <Link to="/sign-in">
              <button className="border-2 border-orange-500 text-orange-500 px-8 py-3 rounded-lg font-semibold">
                Join Us
              </button>
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <img
            src={children}
            alt="Children playing"
            className="rounded-xl mx-auto object-cover opacity-95"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
