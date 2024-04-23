import defaultProfileImage from "../assets/images/defaultProfileImage.jpg";
import jane from "../assets/images/jane.jpg";
import man from "../assets/images/man.jpg";
import girl2 from "../assets/images/girl2.avif";
const TeamSection = () => {
  return (
    <section className="bg-white text-gray-800 py-12">
      <div className="container mx-auto">
        <p className="mb-5 text-gray-600 text-lg">Passionate?</p>
        <h1 className="text-4xl font-bold mb-5 text-green-800">
          Meet Our Team
        </h1>
        <p className="mb-5 leading-relaxed text-gray-600">
          Get to know the dedicated individuals behind our NGO.
        </p>
        <div className="grid grid-cols-3 gap-8">
          <div className="border border-gray-200 rounded-lg p-8 h-full">
            <img
              src={jane}
              alt="John Doe"
              className="w-20 h-20 rounded-full mx-auto mb-5"
            />
            <h3 className="text-2xl font-bold mb-2 text-center text-green-800">
              John Doe
            </h3>
            <p className="text-center mb-5 text-gray-600">Project Manager</p>
            <p className="text-center text-gray-500 text-sm leading-relaxed">
              John is a passionate project manager with extensive experience in
              environmental conservation.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-8 h-full">
            <img
              src={man}
              alt="Jane Doe"
              className="w-20 h-20 rounded-full mx-auto mb-5 object-scale-down"
            />
            <h3 className="text-2xl font-bold mb-2 text-center text-green-800">
              Jane Doe
            </h3>
            <p className="text-center mb-5  text-gray-600">
              Communications Specialist
            </p>
            <p className="text-center text-gray-500 text-sm leading-relaxed">
              Jane is a skilled communications specialist who is dedicated to
              spreading awareness about environmental issues.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-8 h-full">
            <img
              src={girl2}
              alt="Michael Johnson"
              className="w-20 h-20 rounded-full mx-auto mb-5"
            />
            <h3 className="text-2xl font-bold mb-2 text-center text-green-800">
              Michael Johnson
            </h3>
            <p className="text-center mb-5  text-gray-600">Field Researcher</p>
            <p className="text-center text-gray-500 text-sm leading-relaxed">
              Michael is an experienced field researcher who has conducted
              numerous studies on local ecosystems.
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button className="bg-green-800 text-white px-6 py-3 mr-4 rounded-lg">
            Learn More
          </button>
          <button className="bg-orange-500 text-white px-6 py-3 rounded-lg">
            Sign Up
          </button>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
