import { useState } from 'react';
import { B2B_ORDERS } from '../../../constants';

const ITEMS_PER_PAGE = 6;
const statuses = ['Accepted', 'Dispatched', 'Delivered'];

export default function B2BManageOrders() {
  // Franchise Orders
  const [franchisePage, setFranchisePage] = useState(1);
  const [franchiseStatus, setFranchiseStatus] = useState('');
  const [franchiseDate, setFranchiseDate] = useState('');
  const [franchiseCustomer, setFranchiseCustomer] = useState('');
  const franchiseOrders = B2B_ORDERS.filter(order => order.franchise && (!franchiseStatus || order.status === franchiseStatus) && (!franchiseDate || order.date.includes(franchiseDate)) && (!franchiseCustomer || order.customer.toLowerCase().includes(franchiseCustomer.toLowerCase())));
  const franchiseTotalPages = Math.ceil(franchiseOrders.length / ITEMS_PER_PAGE);
  const franchisePaginated = franchiseOrders.slice((franchisePage - 1) * ITEMS_PER_PAGE, franchisePage * ITEMS_PER_PAGE);

  // User Orders
  const [userPage, setUserPage] = useState(1);
  const [userStatus, setUserStatus] = useState('');
  const [userDate, setUserDate] = useState('');
  const [userCustomer, setUserCustomer] = useState('');
  const userOrders = B2B_ORDERS.filter(order => !order.franchise && (!userStatus || order.status === userStatus) && (!userDate || order.date.includes(userDate)) && (!userCustomer || order.customer.toLowerCase().includes(userCustomer.toLowerCase())));
  const userTotalPages = Math.ceil(userOrders.length / ITEMS_PER_PAGE);
  const userPaginated = userOrders.slice((userPage - 1) * ITEMS_PER_PAGE, userPage * ITEMS_PER_PAGE);

  // Update order status
  const updateOrderStatus = (id: string, newStatus: string) => {
    console.log(`Order ${id} status updated to ${newStatus}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4 md:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#22c55e] mb-4 sm:mb-6">Manage Orders</h1>
      {/* Franchise Orders Section */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[#22c55e] mb-4">Franchise Orders</h2>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mb-6">
          <input
            type="text"
            placeholder="Filter by customer..."
            value={franchiseCustomer}
            onChange={e => { setFranchiseCustomer(e.target.value); setFranchisePage(1); }}
            className="px-3 py-2 rounded border border-gray-300 text-sm text-gray-700 w-full sm:w-48"
          />
          <input
            type="date"
            value={franchiseDate}
            onChange={e => { setFranchiseDate(e.target.value); setFranchisePage(1); }}
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
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">Order ID</th>
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">Date</th>
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">Franchise</th>
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">Customer</th>
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">Phone</th>
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">Items</th>
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">Total</th>
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {franchisePaginated.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-gray-400">No franchise orders found</td>
                </tr>
              ) : franchisePaginated.map(order => (
                <tr key={order.id} className="hover:bg-[#e6faef] transition-colors">
                  <td className="px-4 py-3 font-mono text-[#22c55e] font-medium">{order.id}</td>
                  <td className="px-4 py-3 text-gray-700">{order.date}</td>
                  <td className="px-4 py-3 text-gray-700">{order.franchise}</td>
                  <td className="px-4 py-3 text-gray-700">{order.customer}</td>
                  <td className="px-4 py-3 text-gray-700">{order.phone || '-'} </td>
                  <td className="px-4 py-3 text-gray-700 max-w-xs truncate" title={order.items}>{order.items}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900">₹{order.total.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <select
                      value={order.status}
                      onChange={e => updateOrderStatus(order.id, e.target.value)}
                      className="px-2 py-1 rounded border border-gray-300 text-xs text-[#22c55e] bg-[#e6faef]"
                    >
                      {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
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
      {/* User Orders Section */}
      <div>
        <h2 className="text-xl font-semibold text-[#22c55e] mb-4">User Orders</h2>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mb-6">
          <input
            type="text"
            placeholder="Filter by customer..."
            value={userCustomer}
            onChange={e => { setUserCustomer(e.target.value); setUserPage(1); }}
            className="px-3 py-2 rounded border border-gray-300 text-sm text-gray-700 w-full sm:w-48"
          />
          <input
            type="date"
            value={userDate}
            onChange={e => { setUserDate(e.target.value); setUserPage(1); }}
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
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">Order ID</th>
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">Date</th>
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">Customer</th>
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">Phone</th>
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">Items</th>
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">Total</th>
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {userPaginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-400">No user orders found</td>
                </tr>
              ) : userPaginated.map(order => (
                <tr key={order.id} className="hover:bg-[#e6faef] transition-colors">
                  <td className="px-4 py-3 font-mono text-[#22c55e] font-medium">{order.id}</td>
                  <td className="px-4 py-3 text-gray-700">{order.date}</td>
                  <td className="px-4 py-3 text-gray-700">{order.customer}</td>
                  <td className="px-4 py-3 text-gray-700">{order.phone || '-'} </td>
                  <td className="px-4 py-3 text-gray-700 max-w-xs truncate" title={order.items}>{order.items}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900">₹{order.total.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <select
                      value={order.status}
                      onChange={e => updateOrderStatus(order.id, e.target.value)}
                      className="px-2 py-1 rounded border border-gray-300 text-xs text-[#22c55e] bg-[#e6faef]"
                    >
                      {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
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
