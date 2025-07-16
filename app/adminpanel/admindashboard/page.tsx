'use client';

import {
  Building,
  Eye,
  Headphones,
  Package,
  Users,
  X
} from 'lucide-react';
import { useState } from 'react';
import { FRANCHISE_MOCK_DATA, mockRecentActivity } from '../../../constants';






type Franchise = typeof FRANCHISE_MOCK_DATA[number];

const AdminDashboard = () => {
  const [selectedFranchise, setSelectedFranchise] = useState<Franchise | null>(null);

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm space-y-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
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
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 flex flex-col items-start justify-between">
          <p className="text-blue-600 text-sm font-medium mb-2">Franchise Account Requests</p>
          <p className="text-2xl font-bold text-blue-800 ">14</p>
        </div>
      </div>

      {/* Franchises Store Section */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Franchises Store</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Store</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {FRANCHISE_MOCK_DATA.map((store) => (
                <tr key={store.id}>
                  <td className="px-4 py-2 font-medium text-gray-700">{store.name}</td>
                  <td className="px-4 py-2 text-gray-500">{store.location}</td>
                  <td className="px-4 py-2 text-gray-800">{store.revenue}</td>
                  <td className="px-4 py-2">
                    <button className="p-2 rounded hover:bg-gray-100" title="View Store Stock" onClick={() => setSelectedFranchise(store)}>
                      <Eye className="w-5 h-5 text-green-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Franchise Detail Modal */}
      {selectedFranchise && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(0px)' }}>
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
            <button className="absolute top-2 right-2 p-2 rounded hover:bg-gray-100" onClick={() => setSelectedFranchise(null)}>
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedFranchise.name} Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Basic Info</h3>
                <p><span className="font-medium text-gray-700">Location:</span> <span className="text-gray-700">{selectedFranchise.location}</span></p>
                <p><span className="font-medium text-gray-700">Manager:</span> <span className="text-gray-700">{selectedFranchise.manager}</span></p>
                <p><span className="font-medium text-gray-700">Revenue:</span> <span className="text-gray-700">₹{selectedFranchise.revenue}</span></p>
                <p><span className="font-medium text-gray-700">Status:</span> <span className="text-gray-700">{selectedFranchise.status}</span></p>
                <p><span className="font-medium text-gray-700">Zone:</span> <span className="text-gray-700">{selectedFranchise.zone}</span></p>
                <p><span className="font-medium text-gray-700">Pin Code:</span> <span className="text-gray-700">{selectedFranchise.pinCode}</span></p>
                <p><span className="font-medium text-gray-700">State:</span> <span className="text-gray-700">{selectedFranchise.state}</span></p>
                <p><span className="font-medium text-gray-700">District:</span> <span className="text-gray-700">{selectedFranchise.district}</span></p>
                <p><span className="font-medium text-gray-700">Type:</span> <span className="text-gray-700">{selectedFranchise.type}</span></p>
                <p><span className="font-medium text-gray-700">Size:</span> <span className="text-gray-700">{selectedFranchise.size} sqft</span></p>
                <p><span className="font-medium text-gray-700">Parking:</span> <span className="text-gray-700">{selectedFranchise.parking}</span></p>
                <p><span className="font-medium text-gray-700">GST:</span> <span className="text-gray-700">{selectedFranchise.gst}</span></p>
                <p><span className="font-medium text-gray-700">Max Delivery Time:</span> <span className="text-gray-700">{selectedFranchise.maxDeliveryTime}</span></p>
                <p><span className="font-medium text-gray-700">Min Delivery Time:</span> <span className="text-gray-700">{selectedFranchise.minDeliveryTime}</span></p>
                <p><span className="font-medium text-gray-700">Description:</span> <span className="text-gray-700">{selectedFranchise.description}</span></p>
                <p><span className="font-medium text-gray-700">Map:</span> <a href={selectedFranchise.mapLink} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View Map</a></p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Owner & Bank Info</h3>
                <p><span className="font-medium text-gray-700">Owner:</span> <span className="text-gray-700">{selectedFranchise.ownerFirstName} {selectedFranchise.ownerLastName}</span></p>
                <p><span className="font-medium text-gray-700">Phone:</span> <span className="text-gray-700">{selectedFranchise.ownerPhone}</span></p>
                <p><span className="font-medium text-gray-700">Beneficiary:</span> <span className="text-gray-700">{selectedFranchise.beneficiaryName}</span></p>
                <p><span className="font-medium text-gray-700">Account Type:</span> <span className="text-gray-700">{selectedFranchise.accountType}</span></p>
                <p><span className="font-medium text-gray-700">Account Number:</span> <span className="text-gray-700">{selectedFranchise.accountNumber}</span></p>
                <p><span className="font-medium text-gray-700">Bank:</span> <span className="text-gray-700">{selectedFranchise.bankName}</span></p>
                <p><span className="font-medium text-gray-700">IFSC:</span> <span className="text-gray-700">{selectedFranchise.ifsc}</span></p>
                <p><span className="font-medium text-gray-700">Email:</span> <span className="text-gray-700">{selectedFranchise.email}</span></p>
                <p><span className="font-medium text-gray-700">Refundable Deposit:</span> <span className="text-gray-700">₹{selectedFranchise.refundableDeposit}</span></p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Activity Section */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
        <ul className="divide-y divide-gray-200">
          {mockRecentActivity.map((activity, idx) => (
            <li key={idx} className="py-3 flex items-center justify-between">
              <div>
                <span className="font-medium text-gray-700">{activity.type}</span>
                <span className="ml-2 text-gray-500 text-sm">by <span className="text-gray-700">{activity.user}</span></span>
              </div>
              <span className="text-xs text-gray-400">{activity.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;

