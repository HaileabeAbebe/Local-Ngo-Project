import dessalegn from "../assets/images/dessalegn.jpg";
import solomon from "../assets/images/solomon.png";
import getnet from "../assets/images/Getnet.jpg";
import adanech from "../assets/images/Adanech.jpg";
import abenizer from "../assets/images/Abenizer.jpg";
import nega from "../assets/images/Nega.jpg";

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
              src={dessalegn}
              alt="Dessalegn Tebratu Nissrane"
              className="w-24 h-24 rounded-full mx-auto mb-5"
            />
            <h3 className="text-2xl font-bold mb-2 text-green-800">
              Dessalegn Tebratu Nissrane
            </h3>
            <p className="text-gray-600 mb-5">Executive Director</p>
            <p className="text-gray-500 text-sm leading-relaxed">
              Dessalegn is the executive director of the organization, leading
              with passion and dedication.
            </p>
            <p className="text-gray-500 text-sm">
              Email: dessalegntebratu@gmail.com
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-8 h-full">
            <img
              src={solomon}
              alt="Solomon Tadesse Gebrgeorgis"
              className="w-24 h-24 rounded-full mx-auto mb-5"
            />
            <h3 className="text-2xl font-bold mb-2 text-green-800">
              Solomon Tadesse Gebrgeorgis
            </h3>
            <p className="text-gray-600 mb-5">Finance Head</p>
            <p className="text-gray-500 text-sm leading-relaxed">
              Solomon oversees the financial operations, ensuring transparency
              and efficiency.
            </p>
            <p className="text-gray-500 text-sm">
              Email: stadesse078@gmail.com
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-8 h-full">
            <img
              src={getnet}
              alt="Getnet Fantahun Dibekulu"
              className="w-24 h-24 rounded-full mx-auto mb-5"
            />
            <h3 className="text-2xl font-bold mb-2 text-green-800">
              Getnet Fantahun Dibekulu
            </h3>
            <p className="text-gray-600 mb-5">Senior Project Officer</p>
            <p className="text-gray-500 text-sm leading-relaxed">
              Getnet is a senior project officer with a wealth of experience in
              project management and execution.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-8 h-full">
            <img
              src={adanech}
              alt="Adanech Alebachew Tsega"
              className="w-24 h-24 rounded-full mx-auto mb-5"
            />
            <h3 className="text-2xl font-bold mb-2 text-green-800">
              Adanech Alebachew Tsega
            </h3>
            <p className="text-gray-600 mb-5">Casher and Typist</p>
            <p className="text-gray-500 text-sm leading-relaxed">
              Adanech handles the organization's financial transactions and
              documentation with precision and care.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-8 h-full">
            <img
              src={abenizer}
              alt="Abenizer Tesfaye Nigusse"
              className="w-24 h-24 rounded-full mx-auto mb-5"
            />
            <h3 className="text-2xl font-bold mb-2 text-green-800">
              Abenizer Tesfaye Nigusse
            </h3>
            <p className="text-gray-600 mb-5">Resource Mobilization Expert</p>
            <p className="text-gray-500 text-sm leading-relaxed">
              Abenizer is responsible for resource mobilization, ensuring that
              the organization has the necessary resources to operate
              effectively.
            </p>
            <p className="text-gray-500 text-sm">Email: abenizert@gmail.com</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-8 h-full">
            <img
              src={nega}
              alt="Nega Ashagre Semaw"
              className="w-24 h-24 rounded-full mx-auto mb-5"
            />
            <h3 className="text-2xl font-bold mb-2 text-green-800">
              Nega Ashagre Semaw
            </h3>
            <p className="text-gray-600 mb-5">Project Coordinator</p>
            <p className="text-gray-500 text-sm leading-relaxed">
              Nega coordinates various projects, ensuring they are completed on
              time and within scope.
            </p>
            <p className="text-gray-500 text-sm">Email: negatshay1@gmail.com</p>
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
