import { FaTree, FaRegHandshake, FaRegLightbulb } from "react-icons/fa"; // Importing some icons from react-icons
import { Link } from "react-router-dom";

const ProjectsSection = () => {
  return (
    <section className="bg-white text-gray-800 py-20">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center text-green-800">
          Our Impactful Projects
        </h2>
        <p className="mb-8 text-lg text-center">
          Discover our ongoing and completed projects that make a difference.
        </p>
        <div className="grid grid-cols-3 gap-8">
          <div className="border border-gray-200 rounded-lg p-8 h-full">
            <FaTree className="text-green-800 text-4xl mb-4 mx-auto" />
            <h3 className="text-2xl font-bold mb-4 text-center">
              Reforestation
            </h3>
            <p className="text-center">
              Our reforestation project has planted over 10,000 trees this year.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-8 h-full">
            <FaRegHandshake className="text-green-800 text-4xl mb-4 mx-auto" />
            <h3 className="text-2xl font-bold mb-4 text-center">
              Community Engagement
            </h3>
            <p className="text-center">
              We've engaged with over 50 communities to educate them about
              conservation.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-8 h-full">
            <FaRegLightbulb className="text-orange-500 text-4xl mb-4 mx-auto" />
            <h3 className="text-2xl font-bold mb-4 text-center">Innovation</h3>
            <p className="text-center">
              Our innovative solutions have helped reduce carbon emissions by
              40%.
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          {/* <button className="bg-green-800 text-white px-6 py-3 mr-4 rounded-lg">
            Donate
          </button> */}
          <Link to="/projects">
            <button className="bg-orange-500 text-white px-8 py-3 rounded-lg">
              Explore
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
