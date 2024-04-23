import { FaLeaf, FaChild, FaHandsHelping } from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-white text-green-800 min-h-screen p-10 lg:p-20">
      <h1 className="text-4xl lg:text-6xl font-bold mb-4">About Us</h1>
      <img
        src="path_to_your_image.jpg"
        alt="About us"
        className="w-full object-cover h-64 mb-8 rounded lg:h-96"
      />
      <p className="text-orange-500 mb-4 text-lg lg:text-xl">
        Welcome to Askedo, where we believe in making a difference.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="flex items-start space-x-2">
          <FaLeaf className="text-green-800 text-3xl lg:text-5xl" />
          <p className="text-lg lg:text-xl">
            Our primary focus is on environmental conservation. We strive to
            protect and preserve our planet for future generations.
          </p>
        </div>
        <div className="flex items-start space-x-2">
          <FaChild className="text-green-800 text-3xl lg:text-5xl" />
          <p className="text-lg lg:text-xl">
            We are committed to the welfare of children, ensuring they have
            access to the resources and opportunities they need to thrive.
          </p>
        </div>
        <div className="flex items-start space-x-2">
          <FaHandsHelping className="text-green-800 text-3xl lg:text-5xl" />
          <p className="text-lg lg:text-xl">
            Through various initiatives, we work on other related causes that
            align with our mission and values.
          </p>
        </div>
      </div>
      <p className="mt-8 text-lg lg:text-xl">
        Join us as we work towards creating a greener, healthier, and more
        sustainable future for all.
      </p>
    </div>
  );
};

export default About;
