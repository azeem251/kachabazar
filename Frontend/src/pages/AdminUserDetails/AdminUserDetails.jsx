import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../utils/api';

const AdminUserDetails = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/auth/getallusers`); // ✅ change this to your backend URL
      if (res.data.success) {
        setUsers(res.data.users);
      }
      console.log('get alluser api', users)
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Pagination Logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-semibold  text-emerald-700 mb-3">All Users</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden border border-gray-300">
          <thead className="bg-emerald-600 text-white border-b border-gray-300">
            <tr>
              <th className="text-left py-3 px-4 border-r">Sr.no</th>
              <th className="text-left py-3 px-4 border-r">User ID</th>
              <th className="text-left py-3 px-4 border-r">Name</th>
              <th className="text-left py-3 px-4 border-r">Email</th>
              <th className="text-left py-3 px-4">Role</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-red-500">
                  No users found.
                </td>
              </tr>
            ) : (
              currentUsers.map((user, index) => (
                <tr key={user._id} className="border border-gray-200 hover:bg-gray-50">
                  <td className="py-2 px-4 border-r border border-gray-200">{index + 1}</td>
                  <td className="py-3 px-4 border-r border border-gray-200">{user._id}</td>
                  <td className="py-3 px-4 border-r border border-gray-200">{user.name}</td>
                  <td className="py-3 px-4 border-r border border-gray-200">{user.email}</td>
                  <td className="py-3 px-4 capitalize border border-gray-200">{user.role}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-3 space-x-2 flex-wrap">
        <button
          className="px-3 py-1 rounded cursor-pointer bg-gray-200 text-gray-700 hover:bg-gray-300"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`px-3 py-1 rounded ${currentPage === index + 1
              ? 'bg-emerald-600 text-white cursor-pointer'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 '
              }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="px-3 py-1 cursor-pointer rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Next
        </button>
      </div>
    </div>

  );
};

export default AdminUserDetails;
