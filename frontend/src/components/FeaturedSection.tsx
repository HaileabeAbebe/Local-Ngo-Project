const FeaturedSection = () => {
  return (
    <section className="text-green-800 py-12">
      <div className="container mx-auto flex items-center space-x-8">
        <div className="w-1/2">
          <h2 className="text-3xl font-semibold mb-4">Empowering</h2>
          <h1 className="text-5xl font-bold mb-8 text-gray-800">
            Working Together to Create a Greener Future
          </h1>
          <p className="text-lg mb-8">
            At our NGO, we are dedicated to preserving and protecting the
            environment. Through our initiatives and projects, we strive to make
            a positive impact on the planet and inspire others to join us in our
            mission.
          </p>
          <div className="flex space-x-4">
            <button className="bg-green-800 text-white px-8 py-3 rounded-lg font-semibold">
              Learn More
            </button>
            <button className="border-2 border-orange-500 text-orange-500 px-8 py-3 rounded-lg font-semibold">
              Sign Up
            </button>
          </div>
        </div>
        <div className="w-1/2">
          {/* Placeholder for image */}
          <div className="w-full h-64 bg-gray-200 rounded-lg shadow-lg"></div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
