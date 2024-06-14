import { useEffect, useState } from "react";
import { handleResponse } from "../../../utils/apiUtils";
import SearchAndSort from "../../../components/SearchAndSort";

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

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc");

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Users</h1>
      <SearchAndSort
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            className="bg-white p-6 border border-gray-200 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
            {user.profilePicture ? (
              <img
                src={user.profilePicture}
                alt={user.username}
                className="w-16 h-16 rounded-full mb-4 mx-auto object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full mb-4 mx-auto flex items-center justify-center bg-gray-200 text-gray-700 text-2xl font-bold">
                {user.username.charAt(0).toUpperCase()}
              </div>
            )}
            <h2 className="text-xl font-semibold text-gray-800 text-center">
              {user.username}
            </h2>
            <p className="text-gray-600 text-center">{user.email}</p>
            <p className="text-gray-600 text-center capitalize">{user.role}</p>
            <div className="mt-4">
              <label className="block text-gray-700 mb-2 text-center">
                Role
              </label>
              <select
                value={user.role}
                onChange={(e) => handleRoleChange(user._id, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded bg-green-700 text-white focus:outline-none focus:ring-2 focus:ring-green-600">
                <option value="user">User</option>
                <option value="editor">Editor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
