import { FaSeedling, FaHandsHelping, FaLightbulb } from "react-icons/fa"; // Importing different icons from react-icons

const NewsSection = () => {
  return (
    <section className="bg-white text-gray-800 py-12">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-5 text-center text-green-800">
          Latest News & Updates
        </h1>
        <p className="mb-5 leading-relaxed text-center">
          Stay informed about our latest initiatives and achievements.
        </p>
        <div className="grid grid-cols-3 gap-8">
          <div className="bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="px-8 pt-8">
              <FaSeedling className="text-green-800 text-4xl mb-4 mx-auto" />
              <h3 className="text-2xl font-bold mb-2 text-center">
                New Reforestation Project
              </h3>
              <p className="text-center mb-5">
                We've launched a new reforestation project. Our goal is to plant
                over 10,000 trees and restore the local ecosystem.
              </p>
            </div>
            <div className="px-8 pb-8 mt-auto bg-gray-200">
              <button className="w-full bg-green-800 text-white px-6 py-3 rounded-lg font-semibold">
                Read More
              </button>
            </div>
          </div>
          <div className="bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="px-8 pt-8">
              <FaHandsHelping className="text-green-800 text-4xl mb-4 mx-auto" />
              <h3 className="text-2xl font-bold mb-2 text-center">
                Community Engagement Program
              </h3>
              <p className="text-center mb-5">
                Our recent program engaged over 50 communities. We educated them
                about the importance of environmental conservation.
              </p>
            </div>
            <div className="px-8 pb-8 mt-auto bg-gray-200">
              <button className="w-full bg-green-800 text-white px-6 py-3 rounded-lg font-semibold">
                Read More
              </button>
            </div>
          </div>
          <div className="bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="px-8 pt-8">
              <FaLightbulb className="text-green-800 text-4xl mb-4 mx-auto" />
              <h3 className="text-2xl font-bold mb-2 text-center">
                Innovation in Conservation
              </h3>
              <p className="text-center mb-5">
                Our innovative solutions have helped reduce carbon emissions by
                40%. Learn more about our approaches to conservation.
              </p>
            </div>
            <div className="px-8 pb-8 mt-auto bg-gray-200">
              <button className="w-full bg-green-800 text-white px-6 py-3 rounded-lg font-semibold">
                Read More
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button className="bg-orange-500 text-white px-6 py-3 mr-4 rounded-lg">
            View All News
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
