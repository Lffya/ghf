'use client';
import React from 'react';




const ManageUser = () => (
  <div className="p-6 bg-white rounded-lg shadow-sm">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Users</h2>
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-50">
            <th className="border border-gray-200 p-3 text-left">Name</th>
            <th className="border border-gray-200 p-3 text-left">Email</th>
            <th className="border border-gray-200 p-3 text-left">Role</th>
            <th className="border border-gray-200 p-3 text-left">Status</th>
            <th className="border border-gray-200 p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-200 p-3">John Doe</td>
            <td className="border border-gray-200 p-3">john@example.com</td>
            <td className="border border-gray-200 p-3">User</td>
            <td className="border border-gray-200 p-3">
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Active</span>
            </td>
            <td className="border border-gray-200 p-3">
              <button className="hover:opacity-80 mr-2" style={{color: '#22c55e'}}>Edit</button>
              <button className="text-red-600 hover:text-red-800">Delete</button>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-3">Jane Smith</td>
            <td className="border border-gray-200 p-3">jane@example.com</td>
            <td className="border border-gray-200 p-3">Admin</td>
            <td className="border border-gray-200 p-3">
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Active</span>
            </td>
            <td className="border border-gray-200 p-3">
              <button className="hover:opacity-80 mr-2" style={{color: '#22c55e'}}>Edit</button>
              <button className="text-red-600 hover:text-red-800">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);
export default ManageUser;