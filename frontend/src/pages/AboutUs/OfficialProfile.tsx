import { FaLeaf, FaChild, FaHandsHelping } from "react-icons/fa";
import staff from "../../assets/images/staff.jpg";

const OfficialProfile = () => {
  return (
    <div className="bg-gray-50 text-green-900 min-h-screen p-6 lg:p-16">
      <h1 className="text-4xl lg:text-6xl font-extrabold mb-12 text-center">
        Official Profile
      </h1>
      <img
        src={staff}
        alt="About us"
        className="w-full object-cover h-64 lg:h-96 rounded-lg shadow-lg mb-12"
      />
      <p className="text-orange-600 mb-12 text-lg lg:text-2xl text-center font-semibold">
        Welcome to Askedo, where we believe in making a difference.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="flex items-start space-x-6">
          <FaLeaf className="text-green-700 text-4xl lg:text-6xl transition-transform duration-300 transform hover:scale-110" />
          <p className="text-lg lg:text-xl">
            Our primary focus is on environmental conservation. We strive to
            protect and preserve our planet for future generations.
          </p>
        </div>
        <div className="flex items-start space-x-6">
          <FaChild className="text-green-700 text-4xl lg:text-6xl transition-transform duration-300 transform hover:scale-110" />
          <p className="text-lg lg:text-xl">
            We are committed to the welfare of children, ensuring they have
            access to the resources and opportunities they need to thrive.
          </p>
        </div>
        <div className="flex items-start space-x-6">
          <FaHandsHelping className="text-green-700 text-4xl lg:text-6xl transition-transform duration-300 transform hover:scale-110" />
          <p className="text-lg lg:text-xl">
            Through various initiatives, we work on other related causes that
            align with our mission and values.
          </p>
        </div>
      </div>
      <p className="mt-12 text-lg lg:text-2xl text-center font-medium">
        Join us as we work towards creating a greener, healthier, and more
        sustainable future for all.
      </p>
    </div>
  );
};

export default OfficialProfile;
