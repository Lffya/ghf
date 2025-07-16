import { Building, Calendar, Download, Edit3, Eye, Filter, Package, Search, User } from 'lucide-react';
import { useState } from 'react';

// Mock product data
const PRODUCT_MOCK_DATA = [
  { id: 1, name: 'Healthy Salad Bowl', price: 12.99, category: 'Food' },
  { id: 2, name: 'Organic Jam', price: 8.99, category: 'Food' },
  { id: 3, name: 'Protein Smoothie', price: 7.99, category: 'Beverage' },
  { id: 4, name: 'Nutri Snack Bar', price: 4.99, category: 'Snack' },
  { id: 5, name: 'Oven Model X', price: 299.99, category: 'Equipment' },
  { id: 6, name: 'Coffee Beans', price: 15.99, category: 'Beverage' },
  { id: 7, name: 'Refrigerator Model Z', price: 599.99, category: 'Equipment' },
  { id: 8, name: 'Juicer Max', price: 89.99, category: 'Equipment' },
];

// Order types
interface Order {
  id: string;
  type: 'user' | 'franchise';
  customer: string;
  items: string[];
  status: 'Placed' | 'Processing' | 'Delivered' | 'Cancelled';
  date: string;
  total: number;
  priority: 'Low' | 'Medium' | 'High';
}

// Enhanced mock orders with totals and priority
const MOCK_ORDERS: Order[] = [
  { id: 'ORD-1001', type: 'user', customer: 'John Doe', items: ['Healthy Salad Bowl', 'Organic Jam'], status: 'Delivered', date: '2024-07-10', total: 21.98, priority: 'Low' },
  { id: 'ORD-1002', type: 'user', customer: 'Jane Smith', items: ['Protein Smoothie', 'Nutri Snack Bar'], status: 'Processing', date: '2024-07-11', total: 12.98, priority: 'Medium' },
  { id: 'ORD-1003', type: 'franchise', customer: 'Downtown Branch', items: ['Oven Model X', 'Coffee Beans'], status: 'Placed', date: '2024-07-12', total: 315.98, priority: 'High' },
  { id: 'ORD-1004', type: 'franchise', customer: 'Mall Location', items: ['Refrigerator Model Z', 'Healthy Salad Bowl'], status: 'Delivered', date: '2024-07-13', total: 612.98, priority: 'Medium' },
  { id: 'ORD-1005', type: 'user', customer: 'Bob Wilson', items: ['Coffee Beans'], status: 'Cancelled', date: '2024-07-13', total: 15.99, priority: 'Low' },
  { id: 'ORD-1006', type: 'franchise', customer: 'Airport Branch', items: ['Juicer Max', 'Nutri Snack Bar'], status: 'Processing', date: '2024-07-14', total: 94.98, priority: 'High' },
];

const TABS = [
  { label: 'All Orders', value: 'all', icon: Package },
  { label: 'User Orders', value: 'user', icon: User },
  { label: 'Franchise Orders', value: 'franchise', icon: Building },
];

const statusConfig = {
  Placed: { 
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    dot: 'bg-blue-500',
    gradient: 'from-blue-50 to-blue-100'
  },
  Processing: { 
    color: 'bg-amber-50 text-amber-700 border-amber-200',
    dot: 'bg-amber-500',
    gradient: 'from-amber-50 to-amber-100'
  },
  Delivered: { 
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dot: 'bg-emerald-500',
    gradient: 'from-emerald-50 to-emerald-100'
  },
  Cancelled: { 
    color: 'bg-red-50 text-red-700 border-red-200',
    dot: 'bg-red-500',
    gradient: 'from-red-50 to-red-100'
  },
};

const priorityConfig = {
  Low: { color: 'bg-gray-100 text-gray-700', dot: 'bg-gray-400' },
  Medium: { color: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-500' },
  High: { color: 'bg-red-100 text-red-700', dot: 'bg-red-500' },
};

export default function ManageOrders() {
  const [tab, setTab] = useState<'all' | 'user' | 'franchise'>('all');
  const [search, setSearch] = useState('');
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const filtered = orders.filter(order => {
    const matchesTab = tab === 'all' || order.type === tab;
    const matchesSearch =
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.items.some(item => item.toLowerCase().includes(search.toLowerCase())) ||
      order.id.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleStatusChange = (id: string, newStatus: Order['status']) => {
    setOrders(prev => prev.map(order => order.id === id ? { ...order, status: newStatus } : order));
  };


  const OrderDetailsModal = ({ order, onClose }: { order: Order; onClose: () => void }) => (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(0px)' }}
    >
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-900">Order Details</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              ×
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Order Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-medium">{order.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="capitalize font-medium">{order.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Customer:</span>
                  <span className="font-medium">{order.customer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{order.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Priority:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityConfig[order.priority].color}`}>
                    {order.priority}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Items Ordered</h4>
              <div className="space-y-2">
                {order.items.map((item, index) => {
                  const product = PRODUCT_MOCK_DATA.find(p => p.name === item);
                  return (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-sm font-medium">{item}</span>
                      <span className="text-sm text-gray-600">${product?.price?.toFixed(2) || '0.00'}</span>
                    </div>
                  );
                })}
                <div className="flex justify-between items-center py-2 font-bold border-t border-gray-300">
                  <span>Total:</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Edit Modal for Priority and Items
  const [editPriority, setEditPriority] = useState<Order['priority']>('Low');
  const [editItems, setEditItems] = useState<string[]>([]);

  const handleEditClick = (order: Order) => {
    setSelectedOrder(order);
    setEditPriority(order.priority);
    setEditItems(order.items);
    setShowEdit(true);
  };

  const handleEditSave = () => {
    if (!selectedOrder) return;
    // Calculate new total
    const newTotal = editItems.reduce((sum, item) => {
      const product = PRODUCT_MOCK_DATA.find(p => p.name === item);
      return sum + (product?.price || 0);
    }, 0);
    setOrders(prev => prev.map(order =>
      order.id === selectedOrder.id
        ? { ...order, priority: editPriority, items: editItems, total: newTotal }
        : order
    ));
    setShowEdit(false);
    setSelectedOrder(null);
  };

  const EditOrderModal = ({ onClose }: { onClose: () => void }) => (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 z-50"
      style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(0px)' }}
    >
      <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-900">Edit Order</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">×</button>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              value={editPriority}
              onChange={e => setEditPriority(e.target.value as Order['priority'])}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-700"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Items</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {PRODUCT_MOCK_DATA.map(product => (
                <label key={product.name} className="flex items-center gap-1 text-sm cursor-pointer text-gray-700">
                  <input
                    type="checkbox"
                    checked={editItems.includes(product.name)}
                    onChange={e => {
                      if (e.target.checked) {
                        setEditItems(prev => [...prev, product.name]);
                      } else {
                        setEditItems(prev => prev.filter(i => i !== product.name));
                      }
                    }}
                  />
                  {product.name}
                </label>
              ))}
            </div>
            <div className="text-xs text-gray-700">Selected: {editItems.join(', ') || 'None'}</div>
          </div>
        </div>
        <div className="flex justify-end gap-2 p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
          >Cancel</button>
          <button
            onClick={handleEditSave}
            className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 text-gray-700"
          >Save</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-8 h-8 text-emerald-600" />
            <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
          </div>
          <p className="text-gray-600">Track and manage all user and franchise orders</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {Object.entries(statusConfig).map(([status, config]) => {
            const count = orders.filter(o => o.status === status).length;
            return (
              <div key={status} className={`bg-gradient-to-r ${config.gradient} p-4 rounded-xl border border-gray-200`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{status}</p>
                    <p className="text-2xl font-bold text-gray-900">{count}</p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${config.dot}`}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {/* Controls */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Tabs */}
              <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                {TABS.map(t => {
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.value}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                        tab === t.value
                          ? 'bg-white text-emerald-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                      onClick={() => setTab(t.value as 'all' | 'user' | 'franchise')}
                    >
                      <Icon className="w-4 h-4" />
                      {t.label}
                    </button>
                  );
                })}
              </div>

              {/* Search and Actions */}
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search orders..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent w-64 text-gray-700"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <Filter className="w-4 h-4 text-gray-700" />
                  <span className="text-gray-700">Filter</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                  <Download className="w-4 h-4 text-gray-200" />
                  <span className="text-white-200">Export</span>
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-6 py-4 font-semibold text-gray-900">Order ID</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-900">Customer</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-900">Type</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-900">Items</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-900">Total</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-900">Priority</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-900">Status</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-900">Date</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-12 text-gray-500">
                      <Package className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                      <p className="text-lg font-medium">No orders found</p>
                      <p className="text-sm">Try adjusting your search or filters</p>
                    </td>
                  </tr>
                ) : (
                  filtered.map(order => (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm font-medium text-gray-900">{order.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {order.type === 'user' ? (
                            <User className="w-4 h-4 text-blue-500" />
                          ) : (
                            <Building className="w-4 h-4 text-purple-500" />
                          )}
                          <span className="font-medium text-gray-900">{order.customer}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.type === 'user' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                        }`}>
                          {order.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">
                          {order.items.length} item{order.items.length > 1 ? 's' : ''}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-900">${order.total.toFixed(2)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${priorityConfig[order.priority].dot}`}></div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityConfig[order.priority].color}`}>
                            {order.priority}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={order.status}
                          onChange={e => handleStatusChange(order.id, e.target.value as Order['status'])}
                          className={`px-3 py-1 rounded-lg text-sm font-medium border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${statusConfig[order.status].color}`}
                        >
                          <option value="Placed">Placed</option>
                          <option value="Processing">Processing</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          {order.date}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedOrder(order);
                              setShowDetails(true);
                            }}
                            className="p-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4 text-gray-700" />
                          </button>
                          <button
                            onClick={() => handleEditClick(order)}
                            className="p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit Order"
                          >
                            <Edit3 className="w-4 h-4 text-gray-700" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Details Modal */}
        {showDetails && selectedOrder && (
          <OrderDetailsModal
            order={selectedOrder}
            onClose={() => {
              setShowDetails(false);
              setSelectedOrder(null);
            }}
          />
        )}
        {/* Edit Order Modal */}
        {showEdit && selectedOrder && (
          <EditOrderModal
            onClose={() => {
              setShowEdit(false);
              setSelectedOrder(null);
            }}
          />
        )}
      </div>
    </div>
  );
}