// src/pages/Analytics.tsx
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  BarController,
  LineController,
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
  PointElement,
  LineElement,
  ArcElement,
  BarController,
  LineController,
  PieController,
  Tooltip,
  Legend,
  Title
);

const Analytics: React.FC = () => {
  const userData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "New Users Logged In",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: [120, 150, 170, 180, 200], // Realistic data for new users logged in
      },
    ],
  };

  const projectData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Projects Created",
        backgroundColor: "rgba(153,102,255,1)",
        borderColor: "rgba(153,102,255,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(153,102,255,0.4)",
        hoverBorderColor: "rgba(153,102,255,1)",
        data: [10, 12, 8, 15, 10], // Realistic data for projects created
      },
    ],
  };

  const newsData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "News Articles Released",
        backgroundColor: "rgba(255,99,132,1)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [5, 7, 6, 8, 9], // Realistic data for news articles released
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 border rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">New Users Logged In</h2>
          <Bar data={userData} />
        </div>
        <div className="p-4 border rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Projects Created</h2>
          <Line data={projectData} />
        </div>
        <div className="p-4 border rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">News Articles Released</h2>
          <Line data={newsData} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
