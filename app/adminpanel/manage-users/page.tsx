'use client';
import { Building, Eye, Filter, MoreHorizontal, RefreshCw, Search, Shield, Trash2, Users } from 'lucide-react';
import Image from 'next/image';
import { useMemo, useState } from 'react';


import { MOCK_USERS, User, UserWithDocs } from '../../../constants';

const PAGE_SIZE = 8;

const StatusBadge = ({ status }: { status: User['status'] }) => {
  const colors: Record<User['status'], string> = {
    Active: 'bg-[#e6faef] text-[#22c55e] border-[#22c55e]',
    Pending: 'bg-amber-50 text-amber-700 border-amber-200',
    Blocked: 'bg-red-50 text-red-700 border-red-200',
    Rejected: 'bg-gray-50 text-gray-700 border-gray-200'
  };
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${colors[status] || 'bg-gray-50 text-gray-700'}`}>
      {status}
    </span>
  );
};

const RoleBadge = ({ role, type }: { role: string; type: User['type'] }) => {
  const Icon = type === 'franchise' ? Building : role === 'Admin' ? Shield : Users;
  const colors: Record<'Admin' | 'Franchise' | 'User', string> = {
    Admin: 'bg-[#e6faef] text-[#22c55e]',
    Franchise: 'bg-[#e6faef] text-[#22c55e]',
    User: 'bg-[#e6faef] text-[#22c55e]'
  };
  return (
    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${colors[role as 'Admin' | 'Franchise' | 'User']}`}>
      <Icon size={12} />
      {role}
    </div>
  );
};

const ManageUser = () => {
  const [filter, setFilter] = useState<'all' | 'user' | 'franchise'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | User['status']>('all');
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<UserWithDocs[]>(MOCK_USERS);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [showActions, setShowActions] = useState<Record<number, boolean>>({});
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<UserWithDocs | null>(null);

  const handleDeleteUser = (id: number) => {
    setData((prev: UserWithDocs[]) => prev.filter((u: UserWithDocs) => u.id !== id));
    setShowActions((prev: Record<number, boolean>) => ({ ...prev, [id]: false }));
    setSelectedUsers((prev: number[]) => prev.filter((uid: number) => uid !== id));
    if (selectedUser && selectedUser.id === id) setSelectedUser(null);
  };

  const filteredData = useMemo(() => {
    return data.filter(user => {
      const matchesType = filter === 'all' || user.type === filter;
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesType && matchesStatus && matchesSearch;
    });
  }, [data, filter, statusFilter, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const paginatedData = filteredData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleStatusChange = (id: number, newStatus: User['status']) => {
    setData((prev) => prev.map((u) => u.id === id ? { ...u, status: newStatus } : u));
  };

  const handleBulkStatusChange = (newStatus: User['status']) => {
    setData((prev) => prev.map((u) =>
      selectedUsers.includes(u.id) ? { ...u, status: newStatus } : u
    ));
    setSelectedUsers([]);
  };

  const toggleUserSelection = (id: number) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  const toggleAllUsers = () => {
    if (selectedUsers.length === paginatedData.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(paginatedData.map((u) => u.id));
    }
  };

  const stats = useMemo(() => ({
    total: data.length,
    active: data.filter(u => u.status === 'Active').length,
    pending: data.filter(u => u.status === 'Pending').length,
    blocked: data.filter(u => u.status === 'Blocked').length,
    users: data.filter(u => u.type === 'user').length,
    franchises: data.filter(u => u.type === 'franchise').length
  }), [data]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
              <p className="text-gray-600 mt-1">Manage users and franchise owners</p>
            </div>
            <div className="flex items-center gap-3">
              
              <button
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                onClick={() => {
                  setData(MOCK_USERS);
                  setFilter('all');
                  setStatusFilter('all');
                  setPage(1);
                  setSearchTerm('');
                  setSelectedUsers([]);
                  setShowActions({});
                  setShowDetailModal(false);
                  setSelectedUser(null);
                }}
              >
                <RefreshCw size={16} />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Users className="text-blue-600" size={24} />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Blocked</p>
                <p className="text-2xl font-bold text-red-600">{stats.blocked}</p>
              </div>
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Users</p>
                <p className="text-2xl font-bold text-indigo-600">{stats.users}</p>
              </div>
              <Users className="text-indigo-600" size={20} />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Franchises</p>
                <p className="text-2xl font-bold text-blue-600">{stats.franchises}</p>
              </div>
              <Building className="text-blue-600" size={20} />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700" size={20} />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
              />
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-gray-700" />
              <div className="flex rounded-lg border border-gray-200 overflow-hidden">
                {(['all', 'user', 'franchise'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => { setFilter(type); setPage(1); }}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      filter === type
                        ? 'bg-[#22c55e] text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex rounded-lg border border-gray-200 overflow-hidden">
              {(['all', 'Active', 'Pending', 'Blocked', 'Rejected'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => { setStatusFilter(status); setPage(1); }}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    statusFilter === status
                      ? 'bg-[#22c55e] text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedUsers.length > 0 && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg flex items-center justify-between">
              <span className="text-sm text-blue-800">
                {selectedUsers.length} user{selectedUsers.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleBulkStatusChange('Active')}
                  className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Approve All
                </button>
                <button
                  onClick={() => handleBulkStatusChange('Blocked')}
                  className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Block All
                </button>
                <button
                  onClick={() => handleBulkStatusChange('Rejected')}
                  className="px-3 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Reject All
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === paginatedData.length && paginatedData.length > 0}
                      onChange={toggleAllUsers}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedData.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => toggleUserSelection(user.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full flex items-center justify-center text-white font-semibold text-sm" style={{ background: '#22c55e' }}>
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <RoleBadge role={user.role} type={user.type} />
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={user.status} />
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{user.joinDate}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{user.lastLogin}</td>
                    <td className="px-4 py-3">
                      <div className="relative">
                        <button
                          onClick={() => setShowActions(prev => ({ ...prev, [user.id]: !prev[user.id] }))}
                          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <MoreHorizontal size={16} />
                        </button>
                        {showActions[user.id] && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                            <div className="py-1">
                              <button
                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                onClick={() => {
                                  setSelectedUser(user);
                                  setShowDetailModal(true);
                                  setShowActions(prev => ({ ...prev, [user.id]: false }));
                                }}
                              >
                                <Eye size={14} />
                                View Details
                              </button>
                              
                              <hr className="my-1" />
                              <div className="px-4 py-2">
                                <label className="block text-xs text-gray-500 mb-1">Change Status</label>
                                <select
                                  value={user.status}
                                  onChange={(e) => handleStatusChange(user.id, e.target.value as User['status'])}
                                  className="w-full px-2 py-1 text-sm border border-gray-200 rounded"
                                >
                                  <option value="Active">Active</option>
                                  <option value="Rejected">Inactive</option>
                                  <option value="Blocked">Block</option>
                                </select>
                              </div>
                              <hr className="my-1" />
                              <button
                                className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                <Trash2 size={14} />
                                Delete User
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(page - 1) * PAGE_SIZE + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(page * PAGE_SIZE, filteredData.length)}</span> of{' '}
                  <span className="font-medium">{filteredData.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        page === pageNum
                          ? 'z-10 bg-blue-50 border-blue-500 text-gray-700'
                          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Detail Modal */}
      {showDetailModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-70" style={{ backdropFilter: 'blur(0px)' }}>
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={() => setShowDetailModal(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-xl font-bold mb-2">{selectedUser.name} Documents</h2>
            <div className="mb-4 text-gray-600 text-sm">{selectedUser.email}</div>
            <div className="space-y-3">
              {selectedUser.documents.length === 0 ? (
                <div className="text-gray-500">No documents uploaded.</div>
              ) : (
                selectedUser.documents.map((doc, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 border rounded-lg">
                    <Image src={doc.url} alt={doc.type} width={40} height={40} className="w-10 h-10 object-contain" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{doc.type}</div>
                      <div className="text-xs text-gray-500">{doc.verified ? 'Verified' : 'Not Verified'}</div>
                    </div>
                    <a href={doc.url} download className="text-blue-600 text-xs hover:underline">Download</a>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUser;