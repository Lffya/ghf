import { useState } from 'react';
import { DELIVERY_RECORDS, PRODUCT_MOCK_DATA } from '../../../constants';

type RequestItem = {
  id: string | number;
  type: 'product' | 'equipment';
  name: string;
  status?: string;
  deliveredOn?: string;
  franchise?: string;
  phone?: string;
  category?: string;
  deliveryTime?: string;
  quantity?: number;
  date?: string;
  paymentType?: 'Cash' | 'UPI';
};

// Combine products and equipment from DELIVERY_RECORDS and PRODUCT_MOCK_DATA
const equipmentRecords: RequestItem[] = DELIVERY_RECORDS.filter(r => r.type === 'franchise-equipment').map(eq => ({
  id: eq.id,
  type: 'equipment',
  name: eq.equipment || '',
  status: eq.status,
  deliveredOn: eq.deliveredOn,
  franchise: eq.franchise,
  phone: eq.phone,
  paymentType: 'Cash',
}));
const productRecords: RequestItem[] = PRODUCT_MOCK_DATA.map(p => ({
  id: p.id,
  type: 'product',
  name: p.name,
  category: p.category,
  deliveryTime: p.deliveryTime,
  status: 'Available',
  quantity: undefined,
  date: undefined,
  paymentType: 'Cash',
}));

const initialRequests: RequestItem[] = [
  ...productRecords,
  ...equipmentRecords
];

export default function B2BRequestOrder() {
  // State for requests
  const [requests, setRequests] = useState<RequestItem[]>(initialRequests);
  // Filter state
  const [filter, setFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const REQUESTS_PER_PAGE = 10;

  // Add request form state
  const [showForm, setShowForm] = useState(false);
  const [newRequest, setNewRequest] = useState<RequestItem>({
    id: '',
    type: 'product',
    name: '',
    quantity: 1,
    date: '',
    status: 'Requested',
    paymentType: 'Cash',
  });

  // Filtering logic
  const filteredRequests = requests.filter(r => {
    const matchesFilter = filter ? r.name?.toLowerCase().includes(filter.toLowerCase()) : true;
    const matchesType = typeFilter ? r.type === typeFilter : true;
    const matchesStatus = statusFilter ? r.status === statusFilter : true;
    return matchesFilter && matchesType && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredRequests.length / REQUESTS_PER_PAGE);
  const paginatedRequests = filteredRequests.slice((currentPage - 1) * REQUESTS_PER_PAGE, currentPage * REQUESTS_PER_PAGE);

  // Add request handler
  const handleAddRequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newRequest.name || !newRequest.type || !newRequest.quantity || !newRequest.paymentType) return;
    setRequests(prev => [
      ...prev,
      {
        ...newRequest,
        id: `req-${Date.now()}`,
        status: 'Requested',
      }
    ]);
    setNewRequest({ id: '', type: 'product', name: '', quantity: 1, date: '', status: 'Requested', paymentType: 'Cash' });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Filter Section */}
      <div className="mb-6 bg-white p-4 rounded-xl shadow flex flex-wrap gap-4 items-end">
        <input
          type="text"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="w-60 p-2 border rounded text-gray-700"
          placeholder="Search by name or description"
        />
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="w-40 p-2 border rounded text-gray-700">
          <option value="">All Types</option>
          <option value="product">Product</option>
          <option value="equipment">Equipment</option>
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="w-40 p-2 border rounded text-gray-700">
          <option value="">All Status</option>
          <option value="Available">Available</option>
          <option value="Delivered">Delivered</option>
          <option value="Pending">Pending</option>
          <option value="Issue">Issue</option>
          <option value="Requested">Requested</option>
        </select>
      </div>
      {/* Add Request Section */}
      <div className="mb-8">
        <button
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
          onClick={() => setShowForm(f => !f)}
        >
          {showForm ? 'Cancel' : 'Add Request'}
        </button>
        {showForm && (
          <form className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow" onSubmit={handleAddRequest}>
            <div>
              <label className="block mb-1 text-gray-700">Type</label>
              <select name="type" value={newRequest.type} onChange={e => setNewRequest(r => ({ ...r, type: e.target.value as 'product' | 'equipment' }))} className="w-full p-2 border rounded text-gray-700">
                <option value="product">Product</option>
                <option value="equipment">Equipment</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Name</label>
              <input name="name" value={newRequest.name} onChange={e => setNewRequest(r => ({ ...r, name: e.target.value }))} className="w-full p-2 border rounded text-gray-700" />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Quantity</label>
              <input type="number" name="quantity" min={1} value={newRequest.quantity} onChange={e => setNewRequest(r => ({ ...r, quantity: Number(e.target.value) }))} className="w-full p-2 border rounded text-gray-700" />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Payment Type</label>
              <select name="paymentType" value={newRequest.paymentType} onChange={e => setNewRequest(r => ({ ...r, paymentType: e.target.value as 'Cash' | 'UPI' }))} className="w-full p-2 border rounded text-gray-700">
                <option value="Cash">Cash</option>
                <option value="UPI">UPI</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Date</label>
              <input type="date" name="date" value={newRequest.date} onChange={e => setNewRequest(r => ({ ...r, date: e.target.value }))} className="w-full p-2 border rounded text-gray-700" />
            </div>
            {/* Show QR code if paymentType is UPI */}
            {newRequest.paymentType === 'UPI' && (
              <div className="md:col-span-2 flex flex-col items-center">
                <span className="mb-2 text-gray-700">Scan this QR for UPI payment:</span>
                <img src="/images/upi-qr.png" alt="UPI QR Code" className="w-40 h-40 object-contain border rounded" />
              </div>
            )}
            <div className="md:col-span-2 flex gap-4 mt-4">
              <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Add Request</button>
              <button type="button" className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        )}
      </div>
      {/* Requests Table Section */}
      <div>
        <h2 className="text-xl font-semibold text-[#22c55e] mb-4">Product & Equipment Requests</h2>
        <div className="bg-white rounded-xl shadow border border-gray-200 overflow-x-auto max-h-[420px] sm:max-h-none">
          <table className="min-w-full text-sm">
            <thead className="bg-[#e6faef]">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">ID</th>
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">Type</th>
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">Name</th>
                {/* Description column removed */}
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">Status</th>
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">Date</th>
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">Quantity</th>
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">Payment Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedRequests.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-400">No requests found</td>
                </tr>
              ) : paginatedRequests.map(req => (
                <tr key={req.id} className="hover:bg-[#e6faef] transition-colors">
                  <td className="px-4 py-3 font-mono text-[#22c55e] font-medium">{req.id}</td>
                  <td className="px-4 py-3 text-gray-700">{req.type}</td>
                  <td className="px-4 py-3 text-gray-700">{req.name}</td>
                  {/* Description cell removed */}
                  <td className="px-4 py-3 text-gray-700">{req.status}</td>
                  <td className="px-4 py-3 text-gray-700">{req.date || req.deliveredOn || '-'}</td>
                  <td className="px-4 py-3 text-gray-700">{req.quantity || '-'}</td>
                  <td className="px-4 py-3 text-gray-700">{req.paymentType || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >Prev</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
              <button
                key={pageNum}
                className={`px-3 py-1 rounded ${currentPage === pageNum ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setCurrentPage(pageNum)}
              >{pageNum}</button>
            ))}
            <button
              className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >Next</button>
          </div>
        )}
      </div>
    </div>
  );
}
