import { FaQuoteLeft } from "react-icons/fa";

const TestimonialsSection = () => {
  return (
    <section className="bg-green-900 text-white py-12">
      <div className="container mx-auto ">
        <h1 className="text-4xl font-bold mb-5 text-center">
          What People Are Saying
        </h1>
        <p className="mb-5 leading-relaxed text-center">
          Hear from those who have been impacted by our work.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="border border-orange-500 rounded-lg p-8 h-full bg-white text-gray-800">
            <FaQuoteLeft className="text-orange-500 text-4xl mb-4 mx-auto" />
            <p className="text-center mb-5">
              "Thanks to this NGO, our community has become more aware of the
              importance of environmental conservation."
            </p>
            <h3 className="text-xl font-bold mb-2 text-center text-green-800">
              - John Doe, Community Leader
            </h3>
          </div>
          <div className="border border-orange-500 rounded-lg p-8 h-full bg-white text-gray-800">
            <FaQuoteLeft className="text-orange-500 text-4xl mb-4 mx-auto" />
            <p className="text-center mb-5">
              "Thanks to this NGO, our community has become more aware of the
              importance of environmental conservation."
            </p>
            <h3 className="text-xl font-bold mb-2 text-center text-green-800">
              - John Doe, Community Leader
            </h3>
          </div>
          <div className="border border-orange-500 rounded-lg p-8 h-full bg-white text-gray-800">
            <FaQuoteLeft className="text-orange-500 text-4xl mb-4 mx-auto" />
            <p className="text-center mb-5">
              "Thanks to this NGO, our community has become more aware of the
              importance of environmental conservation."
            </p>
            <h3 className="text-xl font-bold mb-2 text-center text-green-800">
              - John Doe, Community Leader
            </h3>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button className="bg-orange-500 text-white px-6 py-3 rounded-lg">
            Share Your Story
          </button>
          <button className="bg-white text-green-800 px-6 py-3 rounded-lg">
            Donate
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
