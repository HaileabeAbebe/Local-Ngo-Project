import {
  FaRegLightbulb as FaVision,
  FaRegFlag as FaMission,
  FaRegHeart as FaValues,
} from "react-icons/fa"; // Importing icons

const VisionMissionValues = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold mb-4 text-green-800">
          Vision, Mission, and Core Values
        </h2>
        <p className="text-lg text-gray-600">Discover what drives us.</p>
      </div>
      <div className="space-y-16">
        <div className="px-4 sm:px-8 lg:px-16">
          <FaVision className="mx-auto text-6xl text-orange-500 mb-4" />{" "}
          {/* Vision Icon */}
          <h3 className="text-4xl font-semibold mb-4 text-orange-500 text-center">
            Vision
          </h3>
          <p className="text-lg text-gray-600 text-center leading-relaxed">
            Building a future in which women, youths, children, and society live
            a decent life in harmony with nature and ensuring sustainable
            development.
          </p>
        </div>
        <div className="px-4 sm:px-8 lg:px-16">
          <FaMission className="mx-auto text-6xl text-orange-500 mb-4" />{" "}
          {/* Mission Icon */}
          <h3 className="text-4xl font-semibold mb-4 text-orange-500 text-center">
            Mission
          </h3>
          <p className="text-lg text-gray-600 text-center leading-relaxed">
            Ensuring inclusive and sustainable economic and social well-being of
            society with the full and genuine participation of the community.
          </p>
        </div>
        <div className="px-4 sm:px-8 lg:px-16">
          <FaValues className="mx-auto text-6xl text-orange-500 mb-4" />{" "}
          {/* Core Values Icon */}
          <h3 className="text-4xl font-semibold mb-4 text-orange-500 text-center">
            Core Values
          </h3>
          <ul className="list-none text-lg text-gray-600 space-y-4 text-center leading-relaxed">
            <li>Commitment and Passion</li>
            <li>Professionalism and Value-Centricity</li>
            <li>Collaboration and Teamwork</li>
            <li>Discipline and Accountability</li>
            <li>Care and Honesty</li>
            <li>Respect</li>
            <li>Creativity and Innovation</li>
            <li>Boldness and Influence</li>
            <li>Justice and Equality</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default VisionMissionValues;
