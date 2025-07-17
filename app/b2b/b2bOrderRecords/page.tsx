import { useMemo, useState } from 'react';
import { FRANCHISE_ORDER_HISTORY } from '../../../constants';

const ITEMS_PER_PAGE = 6;
const statuses = ['Delivered', 'Preparing', 'Cancelled'];

export default function B2BOrderRecords() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [customerFilter, setCustomerFilter] = useState('');

  // Filtered and paginated orders
  const filteredOrders = useMemo(() => {
    return FRANCHISE_ORDER_HISTORY.filter(order => {
      const matchesStatus = !statusFilter || order.status === statusFilter;
      const matchesDate = !dateFilter || order.date.includes(dateFilter);
      const matchesCustomer = !customerFilter || order.customer.toLowerCase().includes(customerFilter.toLowerCase());
      return matchesStatus && matchesDate && matchesCustomer;
    });
  }, [statusFilter, dateFilter, customerFilter]);

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#22c55e] mb-4 sm:mb-6">Order Records</h1>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mb-6">
        <input
          type="text"
          placeholder="Filter by customer mobile..."
          value={customerFilter}
          onChange={e => { setCustomerFilter(e.target.value); setPage(1); }}
          className="px-3 py-2 rounded border border-gray-300 text-sm text-gray-700 w-full sm:w-48"
        />
        <input
          type="date"
          value={dateFilter}
          onChange={e => { setDateFilter(e.target.value); setPage(1); }}
          className="px-3 py-2 rounded border border-gray-300 text-sm text-gray-700 w-full sm:w-48"
        />
        <select
          value={statusFilter}
          onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
          className="px-3 py-2 rounded border border-gray-300 text-sm text-gray-700 w-full sm:w-48"
        >
          <option value="">All Statuses</option>
          {statuses.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      {/* Orders Table */}
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
            {paginatedOrders.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-12 text-gray-400">No orders found</td>
              </tr>
            ) : paginatedOrders.map(order => (
              <tr key={order.id} className="hover:bg-[#e6faef] transition-colors">
                <td className="px-4 py-3 font-mono text-[#22c55e] font-medium">{order.id}</td>
                <td className="px-4 py-3 text-gray-700">{order.date.split('T')[0]}</td>
                <td className="px-4 py-3 text-gray-700">{order.franchise}</td>
                <td className="px-4 py-3 text-gray-700">{order.customer}</td>
                <td className="px-4 py-3 text-gray-700">{order.phone || '-'} </td>
                <td className="px-4 py-3 text-gray-700 max-w-xs truncate" title={order.items}>{order.items}</td>
                <td className="px-4 py-3 font-semibold text-gray-900">₹{order.total.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${order.status === 'Delivered' ? 'bg-[#e6faef] text-[#22c55e]' : order.status === 'Preparing' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{order.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-3 sm:gap-0">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 text-sm font-medium text-[#22c55e] bg-white border border-[#22c55e] rounded-lg hover:bg-[#e6faef] disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full sm:w-auto"
          >
            Previous
          </button>
          <div className="flex gap-1 flex-wrap justify-center">
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
            className="px-4 py-2 text-sm font-medium text-[#22c55e] bg-white border border-[#22c55e] rounded-lg hover:bg-[#e6faef] disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full sm:w-auto"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
