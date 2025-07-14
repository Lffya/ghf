"use client";
import { useMemo, useState } from "react";

// Mock data for demonstration
const PAYMENTS_MOCK_DATA = [
  {
    id: 1,
    name: "John Doe",
    type: "user",
    upiId: "john.doe@paytm",
    amount: 1500,
    status: "Success",
    date: "2024-01-15",
    reference: "TXN123456789"
  },
  {
    id: 2,
    name: "ABC Franchise",
    type: "franchise",
    upiId: "abc.franchise@gpay",
    amount: 25000,
    status: "Pending",
    date: "2024-01-14",
    reference: "TXN987654321"
  },
  {
    id: 3,
    name: "Jane Smith",
    type: "user",
    upiId: "jane.smith@phonepe",
    amount: 750,
    status: "Failed",
    date: "2024-01-13",
    reference: "TXN456789123"
  },
  {
    id: 4,
    name: "XYZ Franchise",
    type: "franchise",
    upiId: "xyz.franchise@paytm",
    amount: 50000,
    status: "Success",
    date: "2024-01-12",
    reference: "TXN789123456"
  },
  {
    id: 5,
    name: "Mike Johnson",
    type: "user",
    upiId: "mike.johnson@gpay",
    amount: 2200,
    status: "Success",
    date: "2024-01-11",
    reference: "TXN321654987"
  }
];

const TABS = [
  { label: "All Payments", value: "all", icon: "📋" },
  { label: "Franchise", value: "franchise", icon: "🏢" },
  { label: "User", value: "user", icon: "👤" },
];

const statusConfig: Record<string, { color: string; dot: string; icon: string }> = {
  Success: { 
    color: "text-[#22c55e] bg-[#e6faef] border-[#22c55e]",
    dot: "bg-[#22c55e]",
    icon: "✓"
  },
  Pending: { 
    color: "text-amber-700 bg-amber-50 border-amber-200",
    dot: "bg-amber-500",
    icon: "⏳"
  },
  Failed: { 
    color: "text-red-700 bg-red-50 border-red-200",
    dot: "bg-red-500",
    icon: "✗"
  },
};

const typeConfig: Record<string, { color: string; icon: string }> = {
  user: { color: "text-[#22c55e] bg-[#e6faef] border-[#22c55e]", icon: "👤" },
  franchise: { color: "text-[#22c55e] bg-[#e6faef] border-[#22c55e]", icon: "🏢" },
};

export default function PaymentsPage() {
  const [tab, setTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = useMemo(() => {
    let data = PAYMENTS_MOCK_DATA;
    
    if (tab !== "all") {
      data = data.filter((t) => t.type === tab);
    }
    
    if (searchTerm) {
      data = data.filter((t) => 
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.upiId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.reference.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return data;
  }, [tab, searchTerm]);

  const stats = useMemo(() => {
    const total = filtered.reduce((sum, txn) => sum + txn.amount, 0);
    const successful = filtered.filter(txn => txn.status === "Success").length;
    const pending = filtered.filter(txn => txn.status === "Pending").length;
    const failed = filtered.filter(txn => txn.status === "Failed").length;
    
    return { total, successful, pending, failed, count: filtered.length };
  }, [filtered]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#22c55e] rounded-xl flex items-center justify-center">
              <span className="text-white text-lg">💳</span>
            </div>
            <h1 className="text-3xl font-bold text-[#22c55e]">Payments Dashboard</h1>
          </div>
          <p className="text-gray-600">Track and manage all your payment transactions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#22c55e]/20 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                <p className="text-2xl font-bold text-gray-900">₹{stats.total.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-[#e6faef] rounded-full flex items-center justify-center">
                <span className="text-[#22c55e] text-lg">💰</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#22c55e]/20 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Successful</p>
                <p className="text-2xl font-bold text-emerald-600">{stats.successful}</p>
              </div>
              <div className="w-12 h-12 bg-[#e6faef] rounded-full flex items-center justify-center">
                <span className="text-[#22c55e] text-lg">✓</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#22c55e]/20 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending</p>
                <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <span className="text-amber-600 text-lg">⏳</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#22c55e]/20 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Failed</p>
                <p className="text-2xl font-bold text-red-600">{stats.failed}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 text-lg">✗</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#22c55e]/20 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Tab Filters */}
            <div className="flex gap-2">
              {TABS.map((t) => (
                <button
                  key={t.value}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                    tab === t.value
                      ? "bg-[#22c55e] text-white shadow-lg border border-[#22c55e]"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
                  onClick={() => setTab(t.value)}
                >
                  <span>{t.icon}</span>
                  {t.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-80">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400">🔍</span>
              </div>
              <input
                type="text"
                placeholder="Search payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    UPI ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Date
                  </th>
                  {/* Reference column removed */}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <span className="text-gray-400 text-2xl">📋</span>
                        </div>
                        <p className="text-gray-500 text-lg font-medium mb-2">No transactions found</p>
                        <p className="text-gray-400 text-sm">Try adjusting your search or filter criteria</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((txn) => (
                    <tr key={txn.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#22c55e] rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                              {txn.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{txn.name}</p>
                            <p className="text-sm text-gray-500">Customer</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${typeConfig[txn.type]?.color || ""}`}>
                          <span>{typeConfig[txn.type]?.icon || ""}</span>
                          {txn.type.charAt(0).toUpperCase() + txn.type.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm text-gray-700 bg-gray-50 px-2 py-1 rounded">
                          {txn.upiId}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-gray-900 text-lg">₹{txn.amount.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${statusConfig[txn.status]?.color || ""}`}>
                          <span className={`w-2 h-2 rounded-full ${statusConfig[txn.status]?.dot || ""}`}></span>
                          {txn.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-700">{txn.date}</span>
                      </td>
                     
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          Showing {filtered.length} of {PAYMENTS_MOCK_DATA.length} transactions
        </div>
      </div>
    </div>
  );
}