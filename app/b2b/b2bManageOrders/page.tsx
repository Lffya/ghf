import { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { MOCK_ORDERS, MOCK_USERS, PRODUCT_MOCK_DATA } from '../../../constants';

export default function B2BManageOrders() {
  // Local state for orders
  const [orders, setOrders] = useState(MOCK_ORDERS);
  // Filter state
  const [filters, setFilters] = useState({
    search: '',
    paymentType: '',
    date: '',
    time: '',
  });

  // Filtering logic
  const filteredOrders = orders.filter(order => {
    // Combined search for mobile, name, product name
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const user = MOCK_USERS.find(u => String(u.id) === String(order.userId));
      const mobileMatch = (order.mobile ?? '').toLowerCase().includes(searchTerm);
      const nameMatch = user && user.name.toLowerCase().includes(searchTerm);
      const productMatch = order.products.some(prod => {
        const prodInfo = typeof prod === 'number'
          ? PRODUCT_MOCK_DATA.find(p => p.id === prod)
          : PRODUCT_MOCK_DATA.find(p => p.id === prod.id);
        return prodInfo && prodInfo.name.toLowerCase().includes(searchTerm);
      });
      if (!(mobileMatch || nameMatch || productMatch)) return false;
    }
    // Payment Type
    if (filters.paymentType && order.paymentType !== filters.paymentType) return false;
    // Date
    if (filters.date && order.date !== filters.date) return false;
    // Time
    if (filters.time && order.time !== filters.time) return false;
    return true;
  });
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const ORDERS_PER_PAGE = 10;
  // Filtering logic (already above)
  // Pagination on filtered orders
  const totalPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * ORDERS_PER_PAGE, currentPage * ORDERS_PER_PAGE);
  // Utility to calculate total price for an order
  function calculateOrderTotal(products: { id: number; count: number }[]): number {
    return products.reduce((sum, prod) => {
      const productInfo = PRODUCT_MOCK_DATA.find(p => p.id === prod.id);
      return sum + (productInfo ? productInfo.price * prod.count : 0);
    }, 0);
  }
  // QR scan handlers (must be in component scope, not inside handleOrderChange)
  const handleScan = (data: string | null) => {
    if (data) {
      const match = data.match(/pa=([\w\.\-@]+)/);
      if (match && match[1]) {
        setNewOrder(prev => ({ ...prev, paymentId: match[1] }));
        setShowQrModal(false);
      } else {
        setNewOrder(prev => ({ ...prev, paymentId: data }));
        setShowQrModal(false);
      }
    }
  };

  const handleError = () => {
    setShowQrModal(false);
  };
  const [showQrModal, setShowQrModal] = useState(false);

  const [showOrderForm, setShowOrderForm] = useState(false);
  const [newOrder, setNewOrder] = useState({
    userId: '',
    customerName: '',
    mobile: '',
    date: '',
    time: '',
    paymentType: '',
    paymentId: '',
    accountNumber: '',
    products: [] as { id: number; count: number }[], // store product IDs and count
  });

  const handleOrderChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'products' && e.target instanceof HTMLSelectElement) {
      const selected: number[] = Array.from(e.target.options)
        .filter((opt: HTMLOptionElement) => opt.selected)
        .map(opt => Number(opt.value));
      setNewOrder(prev => ({
        ...prev,
        products: selected.map(id => {
          const existing = prev.products.find(p => p.id === id);
          return { id, count: existing ? existing.count : 1 };
        })
      }));
    } else {
      setNewOrder(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // Only require accountNumber for Card/NetBanking, paymentId for UPI
    if (!newOrder.userId || !newOrder.customerName || !newOrder.mobile || !newOrder.paymentType || newOrder.products.length === 0) return;
    if (newOrder.paymentType === 'UPI' && !newOrder.paymentId) return;
    if ((newOrder.paymentType === 'Card' || newOrder.paymentType === 'NetBanking') && !newOrder.accountNumber) return;
    // Get current date and time
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10); // YYYY-MM-DD
    const timeStr = now.toTimeString().slice(0, 5); // HH:MM
    setOrders(prev => [
      ...prev,
      {
        id: prev.length ? prev[prev.length - 1].id + 1 : 1,
        userId: Number(newOrder.userId),
        customerName: newOrder.customerName,
        mobile: newOrder.mobile,
        date: dateStr,
        time: timeStr,
        paymentType: newOrder.paymentType,
        paymentId: newOrder.paymentType === 'UPI' ? newOrder.paymentId : '',
        accountNumber: (newOrder.paymentType === 'Card' || newOrder.paymentType === 'NetBanking') ? newOrder.accountNumber : '',
        products: newOrder.products,
        total: calculateOrderTotal(newOrder.products),
      },
    ]);
    setNewOrder({ userId: '', customerName: '', mobile: '', date: '', time: '', paymentType: '', paymentId: '', accountNumber: '', products: [] });
    setShowOrderForm(false);
  };

  // Dummy QR image for UPI
  const qrImage = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=UPI123456';

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4 md:p-8">
      {/* Filter Section */}
      <div className="mb-6 bg-white p-4 rounded-xl shadow">
        <form className="flex flex-wrap gap-4 items-end" onSubmit={e => e.preventDefault()}>
          <input
            type="text"
            value={filters.search}
            onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
            className="w-60 p-2 border rounded text-gray-700"
            placeholder="Search by mobile, name, or product name"
          />
          <select value={filters.paymentType} onChange={e => setFilters(f => ({ ...f, paymentType: e.target.value }))} className="w-40 p-2 border rounded text-gray-700">
            <option value="">Payment Type</option>
            <option value="UPI">UPI</option>
            <option value="Card">Card</option>
            <option value="NetBanking">NetBanking</option>
            <option value="Cash">Cash</option>
          </select>
        </form>
      </div>
      {/* Add New Order Section */}
      <div className="mb-8">
        <button 
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
          onClick={() => setShowOrderForm(f => !f)}
        >
          {showOrderForm ? 'Cancel' : 'Add New Order'}
        </button>
        {showOrderForm && (
          <form className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow" onSubmit={handleAddOrder}>
            <div>
              <label className="block mb-1 text-gray-700">Customer Name</label>
              <input name="customerName" value={newOrder.customerName} onChange={handleOrderChange} className="w-full p-2 border rounded text-gray-700" />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Mobile Number</label>
              <input name="mobile" value={newOrder.mobile} onChange={handleOrderChange} className="w-full p-2 border rounded text-gray-700" maxLength={15} placeholder="Enter mobile number" />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Date</label>
              <input type="date" name="date" value={newOrder.date} onChange={handleOrderChange} className="w-full p-2 border rounded text-gray-700" />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Time</label>
              <input type="time" name="time" value={newOrder.time} onChange={handleOrderChange} className="w-full p-2 border rounded text-gray-700" />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Products to Buy</label>
              <select name="products" multiple value={newOrder.products.map(p => String(p.id))} onChange={handleOrderChange} className="w-full p-2 border rounded text-gray-700 h-32">
                {PRODUCT_MOCK_DATA.map((product: { id: number; name: string }) => (
                  <option key={product.id} value={product.id}>{product.name}</option>
                ))}
              </select>
              <span className="text-xs text-gray-500">Hold Ctrl (Windows) or Cmd (Mac) to select multiple</span>
              {/* Selected products with count and +/- controls */}
              {newOrder.products.length > 0 && (
                <div className="mt-2">
                  <label className="block mb-1 text-gray-700">Selected Products & Quantity</label>
                  <ul className="space-y-2">
                    {newOrder.products.map((prod, idx) => {
                      const productInfo = PRODUCT_MOCK_DATA.find(p => p.id === prod.id);
                      return (
                        <li key={prod.id} className="flex items-center gap-2">
                          <span className="font-medium text-gray-800">{productInfo ? productInfo.name : prod.id}</span>
                          <button type="button" className="px-2 py-1 bg-black text-white rounded" onClick={() => {
                            setNewOrder(prev => ({
                              ...prev,
                              products: prev.products.map((p, i) => i === idx ? { ...p, count: Math.max(1, p.count - 1) } : p)
                            }));
                          }}>-</button>
                          <span className="px-2">{prod.count}</span>
                          <button type="button" className="px-2 py-1 bg-black text-white rounded" onClick={() => {
                            setNewOrder(prev => ({
                              ...prev,
                              products: prev.products.map((p, i) => i === idx ? { ...p, count: p.count + 1 } : p)
                            }));
                          }}>+</button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Payment Type</label>
              <select name="paymentType" value={newOrder.paymentType} onChange={handleOrderChange} className="w-full p-2 border rounded text-gray-700">
                <option value="">Select Type</option>
                <option value="UPI">UPI</option>
                <option value="Card">Card</option>
                <option value="NetBanking">NetBanking</option>
                <option value="Cash">Cash</option>
              </select>
            </div>
            {/* Show Payment ID and QR only for UPI */}
            {newOrder.paymentType === 'UPI' && (
              <div className="md:col-span-2 flex flex-row gap-2 justify-end items-center">
                <div className="flex flex-col items-end w-full">
                  <label className="block mb-1 text-gray-700">Payment ID (UPI)</label>
                  <div className="flex gap-2 items-center">
                    <input name="paymentId" value={newOrder.paymentId} onChange={handleOrderChange} className="w-64 p-2 border rounded text-gray-700" />
                    <button type="button" className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={() => setShowQrModal(true)}>
                      Scan QR
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={qrImage} alt="UPI QR" width={96} height={96} className="border rounded" />
                  <span className="text-xs text-gray-500">Scan to pay</span>
                </div>
                {/* QR Modal */}
                {showQrModal && (
                  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-xl flex flex-col items-center">
                      <h3 className="mb-4 text-lg font-semibold text-gray-700">Scan UPI QR Code</h3>
                      <QrReader
                        onResult={(result, error) => {
                          if (!!result) {
                            handleScan(result.getText());
                          } else if (!!error) {
                            handleError();
                          }
                        }}
                        constraints={{ facingMode: 'environment' }}
                        videoStyle={{ width: '250px' }}
                      />
                      <button className="mt-4 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400" onClick={() => setShowQrModal(false)}>Cancel</button>
                    </div>
                  </div>
                )}
              </div>
            )}
            {/* Show Account Number only for Card/NetBanking */}
            {(newOrder.paymentType === 'Card' || newOrder.paymentType === 'NetBanking') && (
              <div>
                <label className="block mb-1 text-gray-700">Account Number</label>
                <input name="accountNumber" value={newOrder.accountNumber} onChange={handleOrderChange} className="w-full p-2 border rounded text-gray-700" />
              </div>
            )}
            <div className="md:col-span-2 flex gap-4 mt-4">
              <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Add Order</button>
              <button type="button" className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400" onClick={() => setShowOrderForm(false)}>Cancel</button>
            </div>
          </form>
        )}
      </div>
      {/* Orders Table Section */}
      <div>
        <h2 className="text-xl font-semibold text-[#22c55e] mb-4">Orders</h2>
        <div className="bg-white rounded-xl shadow border border-gray-200 overflow-x-auto max-h-[420px] sm:max-h-none">
          <table className="min-w-full text-sm">
            <thead className="bg-[#e6faef]">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">Order ID</th>
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">User</th>
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">Mobile</th>
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">Date</th>
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">Time</th>
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">Products</th>
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">Payment Type</th>
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">Payment ID</th>
                <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">Account Number</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-gray-400">No orders found</td>
                </tr>
              ) : paginatedOrders.map(order => {
                const user = MOCK_USERS.find(u => String(u.id) === String(order.userId));
                return (
                  <tr key={order.id} className="hover:bg-[#e6faef] transition-colors">
                    <td className="px-4 py-3 font-mono text-[#22c55e] font-medium">{order.id}</td>
                    <td className="px-4 py-3 text-gray-700">{user ? `${user.name} (${order.mobile ?? '-'})` : '-'}</td>
                    <td className="px-4 py-3 text-gray-700">{order.date}</td>
                    <td className="px-4 py-3 text-gray-700">{order.time}</td>
                    <td className="px-4 py-3 text-gray-700">{
                      order.products && order.products.length > 0
                        ? order.products.map(prod => {
                            if (typeof prod === 'number') {
                              const prodInfo = PRODUCT_MOCK_DATA.find(p => p.id === prod);
                              return prodInfo ? `${prodInfo.name} (1)` : `${prod} (1)`;
                            } else {
                              const prodInfo = PRODUCT_MOCK_DATA.find(p => p.id === prod.id);
                              const count = prod.count ?? 1;
                              return prodInfo ? `${prodInfo.name} (${count})` : `${prod.id} (${count})`;
                            }
                          }).join(', ')
                        : '-'
                    }</td>
                    <td className="px-4 py-3 text-gray-700">{order.paymentType}</td>
                    <td className="px-4 py-3 text-gray-700">{order.paymentId}</td>
                    <td className="px-4 py-3 text-gray-700">{order.accountNumber}</td>
                  </tr>
                );
              })}
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