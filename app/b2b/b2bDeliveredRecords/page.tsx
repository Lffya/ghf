import { useMemo, useState } from 'react';
import { DELIVERY_RECORDS } from '../../../constants';

const ITEMS_PER_PAGE = 6;

export default function B2BDeliveredRecords() {
  // Franchise delivered records
  const [franchisePage, setFranchisePage] = useState(1);
  const [franchiseFilter, setFranchiseFilter] = useState('');
  const franchiseRecords = useMemo(() => {
    return DELIVERY_RECORDS.filter(record => {
      if (record.status !== 'Delivered' || !('franchise' in record)) return false;
      return (
        ('franchise' in record && typeof record.franchise === 'string' && record.franchise.toLowerCase().includes(franchiseFilter.toLowerCase())) ||
        ('product' in record && typeof record.product === 'string' && record.product.toLowerCase().includes(franchiseFilter.toLowerCase()))
      );
    });
  }, [franchiseFilter]);
  const franchiseTotalPages = Math.ceil(franchiseRecords.length / ITEMS_PER_PAGE);
  const franchisePaginated = franchiseRecords.slice((franchisePage - 1) * ITEMS_PER_PAGE, franchisePage * ITEMS_PER_PAGE);

  // User delivered records
  const [userPage, setUserPage] = useState(1);
  const [userFilter, setUserFilter] = useState('');
  const userRecords = useMemo(() => {
    return DELIVERY_RECORDS.filter(record => {
      if (record.status !== 'Delivered' || !('user' in record)) return false;
      return (
        ('user' in record && typeof record.user === 'string' && record.user.toLowerCase().includes(userFilter.toLowerCase())) ||
        ('equipment' in record && typeof record.equipment === 'string' && record.equipment.toLowerCase().includes(userFilter.toLowerCase()))
      );
    });
  }, [userFilter]);
  const userTotalPages = Math.ceil(userRecords.length / ITEMS_PER_PAGE);
  const userPaginated = userRecords.slice((userPage - 1) * ITEMS_PER_PAGE, userPage * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#22c55e] mb-4 sm:mb-6">Delivered Records</h1>
      {/* Franchise Delivered Records Section */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[#22c55e] mb-4">Franchise Delivered Records</h2>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Filter by franchise or product..."
          value={franchiseFilter}
          onChange={e => { setFranchiseFilter(e.target.value); setFranchisePage(1); }}
          className="px-3 py-2 rounded border border-gray-300 text-sm text-gray-700 w-full sm:w-64"
        />
      </div>
        <div className="bg-white rounded-xl shadow border border-gray-200 overflow-x-auto max-h-[420px] sm:max-h-none">
          <table className="min-w-full text-sm">
            <thead className="bg-[#e6faef]">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">ID</th>
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">Franchise</th>
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">Product/Equipment</th>
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">Phone</th>
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">Delivered On</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {franchisePaginated.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-400">No franchise delivered records found</td>
                </tr>
              ) : franchisePaginated.map(record => (
                <tr key={record.id} className="hover:bg-[#e6faef] transition-colors">
                  <td className="px-4 py-3 font-mono text-[#22c55e] font-medium">{record.id}</td>
                  <td className="px-4 py-3 text-gray-700">{'franchise' in record && typeof record.franchise === 'string' ? record.franchise : '-'}</td>
                  <td className="px-4 py-3 text-gray-700">{'product' in record && typeof record.product === 'string' ? record.product : ('equipment' in record && typeof record.equipment === 'string' ? record.equipment : '-')}</td>
                  <td className="px-4 py-3 text-gray-700">{('phone' in record && typeof record.phone === 'string') ? record.phone : '-'}</td>
                  <td className="px-4 py-3 text-gray-700">{record.deliveredOn ? record.deliveredOn.split('T')[0] : '-'}</td>
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
      {/* User Delivered Records Section */}
      <div>
        <h2 className="text-xl font-semibold text-[#22c55e] mb-4">User Delivered Records</h2>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Filter by user or equipment..."
          value={userFilter}
          onChange={e => { setUserFilter(e.target.value); setUserPage(1); }}
          className="px-3 py-2 rounded border border-gray-300 text-sm text-gray-700 w-full sm:w-64"
        />
      </div>
        <div className="bg-white rounded-xl shadow border border-gray-200 overflow-x-auto max-h-[420px] sm:max-h-none">
          <table className="min-w-full text-sm">
            <thead className="bg-[#e6faef]">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">ID</th>
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">User</th>
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">Product</th>
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">Phone</th>
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">Delivered On</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {userPaginated.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-400">No user delivered records found</td>
                </tr>
              ) : userPaginated.map(record => (
                <tr key={record.id} className="hover:bg-[#e6faef] transition-colors">
                  <td className="px-4 py-3 font-mono text-[#22c55e] font-medium">{record.id}</td>
                  <td className="px-4 py-3 text-gray-700">{'user' in record && typeof record.user === 'string' ? record.user : '-'}</td>
                  <td className="px-4 py-3 text-gray-700">{'product' in record && typeof record.product === 'string' ? record.product : '-'}</td>
                  <td className="px-4 py-3 text-gray-700">{('phone' in record && typeof record.phone === 'string') ? record.phone : '-'}</td>
                  <td className="px-4 py-3 text-gray-700">{record.deliveredOn ? record.deliveredOn.split('T')[0] : '-'}</td>
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
