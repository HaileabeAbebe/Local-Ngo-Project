import { useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import SearchAndSort from "../../components/SearchAndSort";
import { handleResponse } from "../../utils/apiUtils";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface User {
  _id: string;
  username: string;
  role: string;
  email: string;
  isGoogleUser: boolean;
  profilePicture?: string;
  createdAt: string;
}

const AdminOverview: React.FC = () => {
  // User State
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc");

  // Fetch users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await handleResponse(response);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${userId}/role`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      });
      await handleResponse(response);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const filteredUsers = users
    .filter((user) =>
      user.username.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "asc") {
        return a.username.localeCompare(b.username);
      } else if (sort === "desc") {
        return b.username.localeCompare(a.username);
      } else if (sort === "recent") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      return 0;
    });

  // Analytics Data
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
        data: [120, 150, 170, 180, 200],
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
        data: [10, 12, 8, 15, 10],
      },
    ],
  };

  const newsData = {
    labels: ["Positive", "Neutral", "Negative"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Overview</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <div className="p-4 border rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">New Users Logged In</h2>
          <Bar data={userData} />
        </div>
        <div className="p-4 border rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Projects Created</h2>
          <Line data={projectData} />
        </div>
        <div className="p-4 border rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">News Sentiment</h2>
          <Pie data={newsData} />
        </div>
      </div>
      <h2 className="text-xl font-bold mb-4">Users</h2>
      <SearchAndSort
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredUsers.map((user) => (
          <div key={user._id} className="p-4 border rounded-lg shadow-md">
            {user.profilePicture && (
              <img
                src={user.profilePicture}
                alt={user.username}
                className="w-16 h-16 rounded-full mb-4 mx-auto"
              />
            )}
            <h2 className="text-lg font-semibold">{user.username}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600">{user.role}</p>
            <select
              value={user.role}
              onChange={(e) => handleRoleChange(user._id, e.target.value)}
              className="mt-2 p-2 border rounded bg-green-800 text-white">
              <option value="user">User</option>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOverview;
