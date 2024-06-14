import { Link } from "react-router-dom";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  BarController,
  PieController,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  BarController,
  PieController,
  Tooltip,
  Legend,
  Title
);

const projectDataByRegion = {
  labels: ["Addis Ababa", "Oromia", "Amhara", "Tigray", "Sidama"],
  datasets: [
    {
      label: "Number of Projects",
      backgroundColor: "rgba(54, 162, 235, 0.6)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(54, 162, 235, 0.8)",
      hoverBorderColor: "rgba(54, 162, 235, 1)",
      data: [15, 25, 20, 10, 8],
    },
  ],
};

const workDistributionData = {
  labels: ["Vegetation", "Women & Children", "Education", "Sanitation"],
  datasets: [
    {
      label: "Work Distribution",
      backgroundColor: [
        "rgba(75, 192, 192, 0.6)",
        "rgba(255, 159, 64, 0.6)",
        "rgba(255, 205, 86, 0.6)",
        "rgba(153, 102, 255, 0.6)",
      ],
      hoverBackgroundColor: [
        "rgba(75, 192, 192, 0.8)",
        "rgba(255, 159, 64, 0.8)",
        "rgba(255, 205, 86, 0.8)",
        "rgba(153, 102, 255, 0.8)",
      ],
      data: [35, 25, 20, 20],
    },
  ],
};

const FeaturedSection = () => {
  return (
    <section className="text-green-800 py-12">
      <div className="container mx-auto flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8">
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-semibold mb-4">
            Empowering Communities
          </h2>
          <h1 className="text-4xl font-bold mb-8 text-gray-800">
            Working Together for a Greener Future and Brighter Tomorrow
          </h1>
          <p className="text-lg mb-8">
            Our NGO is not only dedicated to preserving and protecting the
            environment, but also committed to the welfare of children and
            marginalized communities. Through our environmental initiatives and
            community-focused projects, we strive to make a positive impact on
            the planet and the lives of the people we serve. Join us in our
            mission to create a greener future and a brighter tomorrow.
          </p>
          <div className="flex space-x-4">
            <Link to="/about">
              <button className="bg-green-800 text-white px-8 py-3 rounded-lg font-semibold">
                Learn More
              </button>
            </Link>
            <Link to="/sign-in">
              <button className="border-2 border-orange-500 text-orange-500 px-8 py-3 rounded-lg font-semibold">
                Join Us
              </button>
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col space-y-8">
          <div className="p-4 border rounded-lg shadow h-80">
            <h2 className="text-lg font-semibold mb-2">Projects by Region</h2>
            <Bar
              data={projectDataByRegion}
              options={{ maintainAspectRatio: false }}
            />
          </div>
          <div className="p-4 border rounded-lg shadow h-80">
            <h2 className="text-lg font-semibold mb-2">Work Distribution</h2>
            <Pie
              data={workDistributionData}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
