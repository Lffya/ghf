import { useMemo, useState } from 'react';
import { PAYMENTS_MOCK_DATA } from '../../../constants';

const ITEMS_PER_PAGE = 6;
const statuses = ['Success', 'Pending', 'Failed'];

export default function B2BPayments() {
  // Franchise payments
  const [franchisePage, setFranchisePage] = useState(1);
  const [franchiseStatus, setFranchiseStatus] = useState('');
  const [franchiseSearch, setFranchiseSearch] = useState('');
  const franchisePayments = useMemo(() => {
    return PAYMENTS_MOCK_DATA.filter(payment => payment.type === 'franchise' && (!franchiseStatus || payment.status === franchiseStatus) && (!franchiseSearch || payment.name.toLowerCase().includes(franchiseSearch.toLowerCase()) || payment.upiId.toLowerCase().includes(franchiseSearch.toLowerCase())));
  }, [franchiseStatus, franchiseSearch]);
  const franchiseTotalPages = Math.ceil(franchisePayments.length / ITEMS_PER_PAGE);
  const franchisePaginated = franchisePayments.slice((franchisePage - 1) * ITEMS_PER_PAGE, franchisePage * ITEMS_PER_PAGE);

  // User payments
  const [userPage, setUserPage] = useState(1);
  const [userStatus, setUserStatus] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const userPayments = useMemo(() => {
    return PAYMENTS_MOCK_DATA.filter(payment => payment.type === 'user' && (!userStatus || payment.status === userStatus) && (!userSearch || payment.name.toLowerCase().includes(userSearch.toLowerCase()) || payment.upiId.toLowerCase().includes(userSearch.toLowerCase())));
  }, [userStatus, userSearch]);
  const userTotalPages = Math.ceil(userPayments.length / ITEMS_PER_PAGE);
  const userPaginated = userPayments.slice((userPage - 1) * ITEMS_PER_PAGE, userPage * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#22c55e] mb-4 sm:mb-6">Payments</h1>
      {/* Franchise Payments Section */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[#22c55e] mb-4">Franchise Payments</h2>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mb-6">
          <input
            type="text"
            placeholder="Search by name or UPI..."
            value={franchiseSearch}
            onChange={e => { setFranchiseSearch(e.target.value); setFranchisePage(1); }}
            className="px-3 py-2 rounded border border-gray-300 text-sm text-gray-700 w-full sm:w-48"
          />
          <select
            value={franchiseStatus}
            onChange={e => { setFranchiseStatus(e.target.value); setFranchisePage(1); }}
            className="px-3 py-2 rounded border border-gray-300 text-sm text-gray-700 w-full sm:w-48"
          >
            <option value="">All Statuses</option>
            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="bg-white rounded-xl shadow border border-gray-200 overflow-x-auto max-h-[420px] sm:max-h-none">
          <table className="min-w-full text-sm">
            <thead className="bg-[#e6faef]">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">Name</th>
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">UPI ID</th>
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">Amount</th>
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">Status</th>
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {franchisePaginated.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-400">No franchise payment records found</td>
                </tr>
              ) : franchisePaginated.map(payment => (
                <tr key={payment.id} className="hover:bg-[#e6faef] transition-colors">
                  <td className="px-4 py-3 text-gray-700">{payment.name}</td>
                  <td className="px-4 py-3 text-gray-700">{payment.upiId}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900">₹{payment.amount.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${payment.status === 'Success' ? 'bg-[#e6faef] text-[#22c55e]' : payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{payment.status}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{payment.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Franchise Pagination */}
        {franchiseTotalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-3 sm:gap-0">
            <button
              onClick={() => setFranchisePage(p => Math.max(1, p - 1))}
              disabled={franchisePage === 1}
              className="px-4 py-2 text-sm font-medium text-[#22c55e] bg-white border border-[#22c55e] rounded-lg hover:bg-[#e6faef] disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full sm:w-auto"
            >
              Previous
            </button>
            <div className="flex gap-1 flex-wrap justify-center">
              {Array.from({ length: franchiseTotalPages }, (_, i) => i + 1).map(pageNum => (
                <button
                  key={pageNum}
                  onClick={() => setFranchisePage(pageNum)}
                  className={`w-10 h-10 text-sm font-medium rounded-lg transition-all duration-150 border ${
                    franchisePage === pageNum
                      ? 'bg-[#22c55e] text-white border-[#22c55e] shadow-lg'
                      : 'text-[#22c55e] border-[#22c55e] bg-white hover:bg-[#e6faef] hover:shadow-md'
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>
            <button
              onClick={() => setFranchisePage(p => Math.min(franchiseTotalPages, p + 1))}
              disabled={franchisePage === franchiseTotalPages}
              className="px-4 py-2 text-sm font-medium text-[#22c55e] bg-white border border-[#22c55e] rounded-lg hover:bg-[#e6faef] disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full sm:w-auto"
            >
              Next
            </button>
          </div>
        )}
      </div>
      {/* User Payments Section */}
      <div>
        <h2 className="text-xl font-semibold text-[#22c55e] mb-4">User Payments</h2>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mb-6">
          <input
            type="text"
            placeholder="Search by name or UPI..."
            value={userSearch}
            onChange={e => { setUserSearch(e.target.value); setUserPage(1); }}
            className="px-3 py-2 rounded border border-gray-300 text-sm text-gray-700 w-full sm:w-48"
          />
          <select
            value={userStatus}
            onChange={e => { setUserStatus(e.target.value); setUserPage(1); }}
            className="px-3 py-2 rounded border border-gray-300 text-sm text-gray-700 w-full sm:w-48"
          >
            <option value="">All Statuses</option>
            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="bg-white rounded-xl shadow border border-gray-200 overflow-x-auto max-h-[420px] sm:max-h-none">
          <table className="min-w-full text-sm">
            <thead className="bg-[#e6faef]">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">Name</th>
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">UPI ID</th>
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">Amount</th>
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">Status</th>
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {userPaginated.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-400">No user payment records found</td>
                </tr>
              ) : userPaginated.map(payment => (
                <tr key={payment.id} className="hover:bg-[#e6faef] transition-colors">
                  <td className="px-4 py-3 text-gray-700">{payment.name}</td>
                  <td className="px-4 py-3 text-gray-700">{payment.upiId}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900">₹{payment.amount.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${payment.status === 'Success' ? 'bg-[#e6faef] text-[#22c55e]' : payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{payment.status}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{payment.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* User Pagination */}
        {userTotalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-3 sm:gap-0">
            <button
              onClick={() => setUserPage(p => Math.max(1, p - 1))}
              disabled={userPage === 1}
              className="px-4 py-2 text-sm font-medium text-[#22c55e] bg-white border border-[#22c55e] rounded-lg hover:bg-[#e6faef] disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full sm:w-auto"
            >
              Previous
            </button>
            <div className="flex gap-1 flex-wrap justify-center">
              {Array.from({ length: userTotalPages }, (_, i) => i + 1).map(pageNum => (
                <button
                  key={pageNum}
                  onClick={() => setUserPage(pageNum)}
                  className={`w-10 h-10 text-sm font-medium rounded-lg transition-all duration-150 border ${
                    userPage === pageNum
                      ? 'bg-[#22c55e] text-white border-[#22c55e] shadow-lg'
                      : 'text-[#22c55e] border-[#22c55e] bg-white hover:bg-[#e6faef] hover:shadow-md'
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>
            <button
              onClick={() => setUserPage(p => Math.min(userTotalPages, p + 1))}
              disabled={userPage === userTotalPages}
              className="px-4 py-2 text-sm font-medium text-[#22c55e] bg-white border border-[#22c55e] rounded-lg hover:bg-[#e6faef] disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full sm:w-auto"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
