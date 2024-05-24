import jane from "../assets/images/jane.jpg";
import man from "../assets/images/man.jpg";
import girl2 from "../assets/images/girl2.avif";

const TeamSection = () => {
  return (
    <section className="bg-white text-gray-800 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-40 text-center">
        <p className="mb-4 text-lg text-gray-600">Passionate?</p>
        <h1 className="text-5xl font-bold mb-8 text-green-800">
          Meet Our Team
        </h1>
        <p className="mb-12 text-lg text-gray-600 leading-relaxed">
          Get to know the dedicated individuals behind ASGDO, committed to
          enhancing the livelihood of rural and urban communities.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="border border-gray-200 rounded-lg p-8 h-full">
            <img
              src={jane}
              alt="Jane Doe"
              className="w-24 h-24 rounded-full mx-auto mb-5"
            />
            <h3 className="text-2xl font-bold mb-2 text-green-800">Jane Doe</h3>
            <p className="text-gray-600 mb-5">Project Manager</p>
            <p className="text-gray-500 text-sm leading-relaxed">
              Jane is a passionate project manager with extensive experience in
              environmental conservation.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-8 h-full">
            <img
              src={man}
              alt="John Doe"
              className="w-24 h-24 rounded-full mx-auto mb-5 object-scale-down"
            />
            <h3 className="text-2xl font-bold mb-2 text-green-800">John Doe</h3>
            <p className="text-gray-600 mb-5">Communications Specialist</p>
            <p className="text-gray-500 text-sm leading-relaxed">
              John is a skilled communications specialist dedicated to spreading
              awareness about environmental issues.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-8 h-full">
            <img
              src={girl2}
              alt="Michael Johnson"
              className="w-24 h-24 rounded-full mx-auto mb-5"
            />
            <h3 className="text-2xl font-bold mb-2 text-green-800">
              Michael Johnson
            </h3>
            <p className="text-gray-600 mb-5">Field Researcher</p>
            <p className="text-gray-500 text-sm leading-relaxed">
              Michael is an experienced field researcher who has conducted
              numerous studies on local ecosystems.
            </p>
          </div>
        </div>
        <div className="mt-12 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button className="bg-green-800 text-white px-6 py-3 rounded-lg font-semibold">
            Learn More
          </button>
          <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold">
            Sign Up
          </button>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
