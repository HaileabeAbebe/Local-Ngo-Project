import React from "react";
import { useQuery } from "react-query";
import { IUser } from "../../utils/types";
import * as apiCall from "../../services/apiCall";

const Users = () => {
  const {
    data: users,
    isLoading,
    // error,
  } = useQuery<IUser[]>("users", apiCall.fetchUsers);

  if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>An error occurred: {error.message}</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="text-left bg-green-800 text-white">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
            {/* Add more column headers as needed */}
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
            <tr
              key={user._id}
              className={`text-gray-700 ${
                index % 2 ? "bg-gray-50" : "bg-white"
              }`}>
              <td className="px-4 py-2 border-r border-gray-200">
                {user.username}
              </td>
              <td className="px-4 py-2 border-r border-gray-200">
                {user.email}
              </td>
              <td className="px-4 py-2 border-gray-200">{user.role}</td>
              {/* Add more user details here */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
