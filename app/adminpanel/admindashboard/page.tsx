'use client';
import React from 'react';
import { 
  
  Users, 
  Package, 
  Building, 
  Headphones, 
  
} from 'lucide-react';

 const AdminDashboard = () => (
  <div className="p-6 bg-white rounded-lg shadow-sm">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-600 text-sm font-medium">Total Users</p>
            <p className="text-2xl font-bold text-green-800">12,345</p>
          </div>
          <Users className="w-8 h-8 text-green-600" />
        </div>
      </div>
      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-600 text-sm font-medium">Total Products</p>
            <p className="text-2xl font-bold text-green-800">2,567</p>
          </div>
          <Package className="w-8 h-8 text-green-600" />
        </div>
      </div>
      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-600 text-sm font-medium">Franchises</p>
            <p className="text-2xl font-bold text-purple-800">89</p>
          </div>
          <Building className="w-8 h-8 text-purple-600" />
        </div>
      </div>
      <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-orange-600 text-sm font-medium">Support Tickets</p>
            <p className="text-2xl font-bold text-orange-800">234</p>
          </div>
          <Headphones className="w-8 h-8 text-orange-600" />
        </div>
      </div>
    </div>
  </div>
);
export default AdminDashboard;
