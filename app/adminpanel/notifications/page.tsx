'use client';
import React from 'react';


const Notification = () => (
  <div className="p-6 bg-white rounded-lg shadow-sm">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Notifications</h2>
    <div className="space-y-4">
      <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
        <div>
          <p className="font-medium text-gray-800">New user registration</p>
          <p className="text-sm text-gray-600">John Doe has registered as a new user</p>
          <p className="text-xs text-gray-500">5 minutes ago</p>
        </div>
      </div>
      <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
        <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
        <div>
          <p className="font-medium text-gray-800">Product added</p>
          <p className="text-sm text-gray-600">New healthy meal option added to catalog</p>
          <p className="text-xs text-gray-500">1 hour ago</p>
        </div>
      </div>
    </div>
  </div>
);
export default Notification;