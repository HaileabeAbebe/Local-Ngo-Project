import profilePic1 from "../../assets/images/jane.jpg";
import profilePic2 from "../../assets/images/man.jpg";
import profilePic3 from "../../assets/images/girl2.avif";

const OrganizationalStructure = () => {
  return (
    <section className="text-gray-800 py-16">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold mb-4 text-green-800">
          Organizational Structure
        </h2>
        <p className="text-lg text-gray-600">
          Meet the team that drives our mission forward.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-4 sm:px-8 lg:px-16">
        <div className="border border-gray-200 rounded-lg p-8 h-full bg-white shadow-lg">
          <img
            src={profilePic1}
            alt="Jane Doe"
            className="w-24 h-24 rounded-full mx-auto mb-5"
          />
          <h3 className="text-2xl font-bold mb-2 text-center text-green-800">
            Jane Doe
          </h3>
          <p className="text-center mb-5 text-gray-600">Project Manager</p>
          <p className="text-center text-gray-500 text-sm leading-relaxed">
            Jane is a passionate project manager with extensive experience in
            environmental conservation.
          </p>
        </div>
        <div className="border border-gray-200 rounded-lg p-8 h-full bg-white shadow-lg">
          <img
            src={profilePic2}
            alt="John Doe"
            className="w-24 h-24 rounded-full mx-auto mb-5 object-scale-down"
          />
          <h3 className="text-2xl font-bold mb-2 text-center text-green-800">
            John Doe
          </h3>
          <p className="text-center mb-5 text-gray-600">
            Communications Specialist
          </p>
          <p className="text-center text-gray-500 text-sm leading-relaxed">
            John is a skilled communications specialist dedicated to spreading
            awareness about environmental issues.
          </p>
        </div>
        <div className="border border-gray-200 rounded-lg p-8 h-full bg-white shadow-lg">
          <img
            src={profilePic3}
            alt="Michael Johnson"
            className="w-24 h-24 rounded-full mx-auto mb-5"
          />
          <h3 className="text-2xl font-bold mb-2 text-center text-green-800">
            Michael Johnson
          </h3>
          <p className="text-center mb-5 text-gray-600">Field Researcher</p>
          <p className="text-center text-gray-500 text-sm leading-relaxed">
            Michael is an experienced field researcher who has conducted
            numerous studies on local ecosystems.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OrganizationalStructure;
