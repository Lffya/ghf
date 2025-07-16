"use client";
import { Building, Calendar, Eye, Filter, Package, Pencil, Search, Truck, User, X } from "lucide-react";
import { useMemo, useState } from "react";
import { DELIVERY_RECORDS, DeliveryRecordType } from "../../../constants";

const PAGE_SIZE = 6;

const DeliveredRecord = () => {
  const [filter, setFilter] = useState<'all' | 'user' | 'franchise'>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<DeliveryRecordType | null>(null);
  const [editStatusId, setEditStatusId] = useState<string | null>(null);
  const [records, setRecords] = useState<DeliveryRecordType[]>(DELIVERY_RECORDS);

  const filteredData = useMemo(() => {
    return records.filter((rec: DeliveryRecordType) => {
      const matchesType = filter === "all" ||
        (filter === "user" && rec.type === "product-delivered") ||
        (filter === "franchise" && (rec.type === "franchise-equipment" || rec.type === "franchise-product"));
      
      const matchesSearch = searchTerm === "" || 
        rec.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ('user' in rec ? rec.user.toLowerCase().includes(searchTerm.toLowerCase()) : rec.franchise.toLowerCase().includes(searchTerm.toLowerCase())) ||
        ('product' in rec ? rec.product.toLowerCase().includes(searchTerm.toLowerCase()) : rec.equipment.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchesType && matchesSearch;
    });
  }, [filter, searchTerm, records]);

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const paginatedData = filteredData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'franchise-equipment': return <Truck className="w-4 h-4 text-gray-700" />;
      case 'product-delivered': return <Package className="w-4 h-4 text-gray-700" />;
      case 'franchise-product': return <Building className="w-4 h-4 text-gray-700" />;
      default: return <Package className="w-4 h-4 text-gray-700" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-[#e6faef] text-[#22c55e] border-[#22c55e]';
      case 'Pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Issue': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e6faef] via-white to-white p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-[#22c55e]/20 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-[#22c55e] p-3 rounded-xl">
                <Package className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[#22c55e]">Delivery Records</h1>
                <p className="text-gray-600 mt-1">Manage and track all delivery records</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search records..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2.5 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              {/* Filter Tabs */}
              <div className="flex bg-white/70 backdrop-blur-sm rounded-xl border border-[#22c55e]/30 p-1">
                {[
                  { key: "all", label: "All Records", icon: <Filter className="w-4 h-4" /> },
                  { key: "user", label: "Users", icon: <User className="w-4 h-4" /> },
                  { key: "franchise", label: "Franchise", icon: <Building className="w-4 h-4" /> }
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => { setFilter(item.key as 'all' | 'user' | 'franchise'); setPage(1); }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      filter === item.key
                        ? "bg-[#22c55e] text-white shadow-lg transform scale-105 border border-[#22c55e]"
                        : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                    }`}
                  >
                    {item.icon}
                    <span className="hidden sm:inline">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { label: "Total Records", value: filteredData.length, color: "[#22c55e]", icon: <Package className="w-5 h-5 text-gray-700" /> },
            { label: "Delivered", value: filteredData.filter(r => r.status === 'Delivered').length, color: "[#22c55e]", icon: <Package className="w-5 h-5 text-gray-700" /> },
            { label: "Pending", value: filteredData.filter(r => r.status === 'Pending').length, color: "amber-500", icon: <Package className="w-5 h-5 text-gray-700" /> }
          ].map((stat) => (
            <div key={stat.label} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-[#22c55e]/20 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color === '[#22c55e]' ? 'text-[#22c55e]' : stat.color === 'amber-500' ? 'text-amber-500' : 'text-gray-900'}`}>{stat.value}</p>
                </div>
                <div className={`bg-[${stat.color}] p-3 rounded-lg`} style={stat.color === '[#22c55e]' ? { backgroundColor: '#e6faef' } : {}}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Record ID</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Recipient</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Item</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Delivered On</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12">
                      <div className="flex flex-col items-center justify-center">
                        <Package className="w-12 h-12 text-gray-700 mb-4" />
                        <p className="text-gray-500 text-lg">No records found</p>
                        <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
                      </div>
                    </td>
                  </tr>
                ) : paginatedData.map((rec) => (
                  <tr key={rec.id} className="hover:bg-blue-50/50 transition-colors duration-150 group">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{rec.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-blue-100 transition-colors">
                          {getTypeIcon(rec.type)}
                        </div>
                        <span className="text-sm font-medium text-gray-700 capitalize">
                          {rec.type.replace('-', ' ')}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {'user' in rec ? <User className="w-4 h-4 text-gray-700" /> : <Building className="w-4 h-4 text-gray-700" />}
                        <span className="text-sm text-gray-900 font-medium">
                          {'user' in rec ? rec.user : rec.franchise}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900 font-medium">
                        {'product' in rec ? rec.product : rec.equipment}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-700" />
                        <span className="text-sm text-gray-600">
                          {rec.deliveredOn ? new Date(rec.deliveredOn).toLocaleDateString() : '-'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(rec.status)}`}>
                        {rec.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          className="p-2 rounded-lg hover:bg-[#e6faef] text-[#22c55e] transition-colors duration-150 border border-transparent hover:border-[#22c55e]"
                          onClick={() => { setSelectedRecord(rec); setShowDetail(true); }}
                          title="View Details"
                        >
                          <Eye className="w-4 h-4 text-gray-700" />
                        </button>
                        <button
                          className="p-2 rounded-lg hover:bg-[#e6faef] text-[#22c55e] transition-colors duration-150 border border-transparent hover:border-[#22c55e]"
                          title="Edit Status"
                          onClick={() => setEditStatusId(editStatusId === rec.id ? null : rec.id)}
                        >
                          <Pencil className="w-4 h-4 text-gray-700" />
                        </button>
                        {editStatusId === rec.id && (
                          <select
                            className="ml-2 border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={rec.status}
                            onChange={e => {
                              const newStatus = e.target.value as DeliveryRecordType["status"];
                              setRecords(prev => prev.map(r => r.id === rec.id ? { ...r, status: newStatus } : r));
                              setEditStatusId(null);
                            }}
                            autoFocus
                            onBlur={() => setEditStatusId(null)}
                          >
                            <option value="Delivered">Delivered</option>
                            <option value="Pending">Pending</option>
                            <option value="Issue">Issue</option>
                          </select>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Enhanced Pagination */}
          <div className="bg-gradient-to-r from-[#e6faef] to-white px-6 py-4 border-t border-[#22c55e]/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">
                  Showing <span className="font-semibold">{(page - 1) * PAGE_SIZE + 1}</span> to{' '}
                  <span className="font-semibold">{Math.min(page * PAGE_SIZE, filteredData.length)}</span> of{' '}
                  <span className="font-semibold">{filteredData.length}</span> results
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 text-sm font-medium text-[#22c55e] bg-white border border-[#22c55e] rounded-lg hover:bg-[#e6faef] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
                >
                  Previous
                </button>
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`w-10 h-10 text-sm font-medium rounded-lg transition-all duration-150 border ${
                        page === pageNum
                          ? 'bg-[#22c55e] text-white border-[#22c55e] shadow-lg'
                          : 'text-[#22c55e] border-[#22c55e] bg-white hover:bg-[#e6faef] hover:shadow-md'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 text-sm font-medium text-[#22c55e] bg-white border border-[#22c55e] rounded-lg hover:bg-[#e6faef] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Detail Modal */}
        {showDetail && selectedRecord && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      {getTypeIcon(selectedRecord.type)}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Delivery Details</h2>
                      <p className="text-blue-100 text-sm">Record ID: {selectedRecord.id}</p>
                    </div>
                  </div>
                  <button
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-150"
                    onClick={() => setShowDetail(false)}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Type</p>
                    <p className="text-sm font-medium capitalize">{selectedRecord.type.replace('-', ' ')}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Status</p>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedRecord.status)}`}>
                      {selectedRecord.status}
                    </span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                    {'user' in selectedRecord ? 'User' : 'Franchise'}
                  </p>
                  <p className="text-sm font-medium">
                    {'user' in selectedRecord ? selectedRecord.user : selectedRecord.franchise}
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                    {'product' in selectedRecord ? 'Product' : 'Equipment'}
                  </p>
                  <p className="text-sm font-medium">
                    {'product' in selectedRecord ? selectedRecord.product : selectedRecord.equipment}
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Delivered On</p>
                  <p className="text-sm font-medium">
                    {selectedRecord.deliveredOn ? new Date(selectedRecord.deliveredOn).toLocaleString() : '-'}
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Description</p>
                  <p className="text-sm">{selectedRecord.description || 'No description provided'}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveredRecord;