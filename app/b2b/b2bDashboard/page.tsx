import { useState } from 'react';
import { RECENT_ACTIVITY } from '../../../constants';

// Mock data
const stats = [
  { label: "Total Orders", value: 1280, icon: "📦", color: "bg-[#e6faef] text-[#22c55e]" },
  { label: "Total Earnings", value: "₹2,45,000", icon: "💰", color: "bg-[#e6faef] text-[#22c55e]" },
  { label: "Pending Deliveries", value: 32, icon: "🚚", color: "bg-[#e6faef] text-[#22c55e]" },
  { label: "Earnings This Month", value: "₹38,500", icon: "📈", color: "bg-[#e6faef] text-[#22c55e]" },
];

const ITEMS_PER_PAGE = 4;

export default function B2BDashboard() {
  const [activityPage, setActivityPage] = useState(1);
  const totalPages = Math.ceil(RECENT_ACTIVITY.length / ITEMS_PER_PAGE);
  const paginatedActivity = RECENT_ACTIVITY.slice((activityPage - 1) * ITEMS_PER_PAGE, activityPage * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">B2B Dashboard</h1>
      {/* Overview Cards */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl shadow bg-white border border-gray-200">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg text-xl sm:text-2xl font-bold ${stat.color}`}>{stat.icon}</div>
            <div>
              <p className="text-xs sm:text-sm text-gray-600">{stat.label}</p>
              <p className="text-lg sm:text-2xl font-bold text-[#22c55e]">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Earnings Summary */}
      <div className="mb-8 sm:mb-10">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Earnings Summary</h2>
        <div className="bg-white rounded-xl shadow p-4 sm:p-6 border border-gray-200 flex flex-col md:flex-row gap-4 sm:gap-8">
          <div>
            <p className="text-gray-700 mb-1 text-xs sm:text-sm">This Month</p>
            <p className="text-[#22c55e] text-base sm:text-lg font-bold">₹38,500</p>
          </div>
          <div>
            <p className="text-gray-700 mb-1 text-xs sm:text-sm">Last Month</p>
            <p className="text-[#22c55e] text-base sm:text-lg font-bold">₹41,200</p>
          </div>
          <div>
            <p className="text-gray-700 mb-1 text-xs sm:text-sm">Year to Date</p>
            <p className="text-[#22c55e] text-base sm:text-lg font-bold">₹2,45,000</p>
          </div>
        </div>
      </div>
      {/* Recent Activity Feed */}
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">Recent Activity</h2>
        <div className="bg-white rounded-xl shadow p-4 sm:p-6 border border-gray-200 max-h-[320px] sm:max-h-none overflow-y-auto">
          <ul className="divide-y divide-gray-100">
            {paginatedActivity.map((activity, idx) => (
              <li key={idx} className="py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                <div>
                  <span className="inline-block px-2 py-1 rounded text-xs font-semibold mr-2 bg-gray-100 text-gray-700">{activity.type}</span>
                  <span className="text-gray-900 text-xs sm:text-base">{activity.detail}</span>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </li>
            ))}
          </ul>
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={() => setActivityPage(p => Math.max(1, p - 1))}
                disabled={activityPage === 1}
                className="px-3 py-1 rounded bg-[#e6faef] text-[#22c55e] font-medium disabled:opacity-50"
              >
                Previous
              </button>
              <div className="flex gap-1">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setActivityPage(i + 1)}
                    className={`w-8 h-8 rounded text-sm font-medium ${activityPage === i + 1 ? 'bg-[#22c55e] text-white' : 'bg-white text-[#22c55e] border border-[#22c55e]'}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setActivityPage(p => Math.min(totalPages, p + 1))}
                disabled={activityPage === totalPages}
                className="px-3 py-1 rounded bg-[#e6faef] text-[#22c55e] font-medium disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
