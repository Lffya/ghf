'use client';
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronLeft, ChevronRight, Eye, Filter, Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { FRANCHISE_ORDER_HISTORY, Order, USER_ORDER_HISTORY } from '../../../constants';

const ITEMS_PER_PAGE = 5;

type SortField = 'date' | 'total' | 'status' | 'customer';
type SortDirection = 'asc' | 'desc';

interface FilterOptions {
  status: string;
  dateRange: string;
  minAmount: string;
  maxAmount: string;
}

function usePaginatedFilterData<T extends Order>(
  data: T[], 
  filterTerm: string, 
  sortField: SortField, 
  sortDirection: SortDirection,
  filterOptions: FilterOptions
) {
  const filtered = useMemo(() => {
    return data
      .filter(order => {
        // Text search
        const matchesSearch = Object.values(order).some(val =>
          String(val).toLowerCase().includes(filterTerm.toLowerCase())
        );

        // Status filter
        const matchesStatus = !filterOptions.status || order.status === filterOptions.status;

        // Amount filter
        const matchesMinAmount = !filterOptions.minAmount || order.total >= parseFloat(filterOptions.minAmount);
        const matchesMaxAmount = !filterOptions.maxAmount || order.total <= parseFloat(filterOptions.maxAmount);

        // Date filter
        let matchesDate = true;
        if (filterOptions.dateRange) {
          const orderDate = new Date(order.date);
          const today = new Date();
          const daysDiff = Math.floor((today.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24));
          
          switch (filterOptions.dateRange) {
            case 'today':
              matchesDate = daysDiff === 0;
              break;
            case 'week':
              matchesDate = daysDiff <= 7;
              break;
            case 'month':
              matchesDate = daysDiff <= 30;
              break;
          }
        }

        return matchesSearch && matchesStatus && matchesMinAmount && matchesMaxAmount && matchesDate;
      })
      .sort((a, b) => {
        let aValue: number | string;
        let bValue: number | string;
        switch (sortField) {
          case 'date':
            aValue = new Date(a.date).getTime();
            bValue = new Date(b.date).getTime();
            break;
          case 'total':
            aValue = a.total;
            bValue = b.total;
            break;
          case 'status':
            aValue = a.status;
            bValue = b.status;
            break;
          case 'customer':
            aValue = a.customer;
            bValue = b.customer;
            break;
          default:
            aValue = new Date(a.date).getTime();
            bValue = new Date(b.date).getTime();
        }
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        } else {
          // string comparison
          if (sortDirection === 'asc') {
            return String(aValue).localeCompare(String(bValue));
          } else {
            return String(bValue).localeCompare(String(aValue));
          }
        }
      });
  }, [data, filterTerm, sortField, sortDirection, filterOptions]);

  return filtered;
}

function StatusBadge({ status }: { status: string }) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'preparing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
      {status}
    </span>
  );
}

function SortButton({ field, currentField, direction, onClick }: {
  field: SortField;
  currentField: SortField;
  direction: SortDirection;
  onClick: (field: SortField) => void;
}) {
  const isActive = field === currentField;
  
  return (
    <button
      onClick={() => onClick(field)}
      className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors"
    >
      {isActive ? (
        direction === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
      ) : (
        <ArrowUpDown className="w-3 h-3" />
      )}
    </button>
  );
}

function FilterPanel({ 
  isOpen, 
  onClose, 
  filterOptions, 
  onFilterChange,
  onClearFilters 
}: {
  isOpen: boolean;
  onClose: () => void;
  filterOptions: FilterOptions;
  onFilterChange: (key: keyof FilterOptions, value: string) => void;
  onClearFilters: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">Advanced Filters</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={filterOptions.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">All Statuses</option>
            <option value="Delivered">Delivered</option>
            <option value="Preparing">Preparing</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
          <select
            value={filterOptions.dateRange}
            onChange={(e) => onFilterChange('dateRange', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">All Dates</option>
            <option value="today">Today</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Min Amount</label>
            <input
              type="number"
              value={filterOptions.minAmount}
              onChange={(e) => onFilterChange('minAmount', e.target.value)}
              placeholder="₹0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Amount</label>
            <input
              type="number"
              value={filterOptions.maxAmount}
              onChange={(e) => onFilterChange('maxAmount', e.target.value)}
              placeholder="₹∞"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            onClick={onClearFilters}
            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Clear All
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-3 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

function OrderTable({ 
  orders, 
  type, 
  sortField, 
  sortDirection, 
  onSort 
}: {
  orders: Order[];
  type: 'franchise' | 'user';
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Order ID</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">
              <div className="flex items-center gap-2">
                Date
                <SortButton field="date" currentField={sortField} direction={sortDirection} onClick={onSort} />
              </div>
            </th>
            {type === 'franchise' ? (
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Franchise</th>
            ) : null}
            <th className="px-4 py-3 text-left font-semibold text-gray-700">
              <div className="flex items-center gap-2">
                Customer
                <SortButton field="customer" currentField={sortField} direction={sortDirection} onClick={onSort} />
              </div>
            </th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Items</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">
              <div className="flex items-center gap-2">
                Total
                <SortButton field="total" currentField={sortField} direction={sortDirection} onClick={onSort} />
              </div>
            </th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">
              <div className="flex items-center gap-2">
                Status
                <SortButton field="status" currentField={sortField} direction={sortDirection} onClick={onSort} />
              </div>
            </th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {orders.length === 0 ? (
            <tr>
              <td colSpan={type === 'franchise' ? 8 : 7} className="text-center py-12 text-gray-400">
                <div className="flex flex-col items-center gap-2">
                  <Search className="w-8 h-8 text-gray-300" />
                  <span>No orders found matching your criteria</span>
                </div>
              </td>
            </tr>
          ) : (
            orders.map((order, index) => (
              <tr key={order.id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                <td className="px-4 py-3 font-mono text-emerald-600 font-medium">{order.id}</td>
                <td className="px-4 py-3 text-gray-600">
                  {new Date(order.date).toLocaleDateString('en-IN', { 
                    day: '2-digit', 
                    month: 'short', 
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </td>
                {type === 'franchise' ? (
                  <td className="px-4 py-3 text-gray-600">{order.franchise || '-'}</td>
                ) : null}
                <td className="px-4 py-3 font-medium text-gray-800">{order.customer}</td>
                <td className="px-4 py-3 text-gray-600 max-w-xs truncate" title={order.items}>{order.items}</td>
                <td className="px-4 py-3 font-semibold text-gray-800">₹{order.total.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-4 py-3">
                  <button className="text-emerald-600 hover:text-emerald-800 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}


export default function OrderRecord() {
  // User Order filter handlers
  const handleUserFilterChange = (key: keyof FilterOptions, value: string) => {
    setUserFilterOptions(prev => ({ ...prev, [key]: value }));
    setUserPage(1);
  };

  const clearUserFilters = () => {
    setUserFilterOptions({ status: '', dateRange: '', minAmount: '', maxAmount: '' });
    setUserFilter('');
    setUserPage(1);
  };
  // Franchise Orders
  const [franchiseFilter, setFranchiseFilter] = useState('');
  const [franchisePage, setFranchisePage] = useState(1);
  const [franchiseSortField, setFranchiseSortField] = useState<SortField>('date');
  const [franchiseSortDirection, setFranchiseSortDirection] = useState<SortDirection>('desc');
  const [franchiseFilterOptions, setFranchiseFilterOptions] = useState<FilterOptions>({
    status: '',
    dateRange: '',
    minAmount: '',
    maxAmount: ''
  });
  const [franchiseShowFilters, setFranchiseShowFilters] = useState(false);

  // User Orders
  const [userFilter, setUserFilter] = useState('');
  const [userPage, setUserPage] = useState(1);
  // const [userSortField, setUserSortField] = useState<SortField>('date');
  // const [userSortDirection, setUserSortDirection] = useState<SortDirection>('desc');
  const [userFilterOptions, setUserFilterOptions] = useState<FilterOptions>({
    status: '',
    dateRange: '',
    minAmount: '',
    maxAmount: ''
  });
  const [userShowFilters, setUserShowFilters] = useState(false);

  const franchiseOrders = usePaginatedFilterData(
    FRANCHISE_ORDER_HISTORY, 
    franchiseFilter, 
    franchiseSortField, 
    franchiseSortDirection,
    franchiseFilterOptions
  );
  const franchiseTotalPages = Math.ceil(franchiseOrders.length / ITEMS_PER_PAGE) || 1;
  const paginatedFranchise = franchiseOrders.slice((franchisePage - 1) * ITEMS_PER_PAGE, franchisePage * ITEMS_PER_PAGE);

  const userOrders = usePaginatedFilterData(
    USER_ORDER_HISTORY, 
    userFilter, 
    'date', // default sort field
    'desc', // default sort direction
    userFilterOptions
  );
  const userTotalPages = Math.ceil(userOrders.length / ITEMS_PER_PAGE) || 1;

  const handleFranchiseSort = (field: SortField) => {
    if (franchiseSortField === field) {
      setFranchiseSortDirection(franchiseSortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setFranchiseSortField(field);
      setFranchiseSortDirection('desc');
    }
  };


  const handleFranchiseFilterChange = (key: keyof FilterOptions, value: string) => {
    setFranchiseFilterOptions(prev => ({ ...prev, [key]: value }));
    setFranchisePage(1);
  };


  const clearFranchiseFilters = () => {
    setFranchiseFilterOptions({ status: '', dateRange: '', minAmount: '', maxAmount: '' });
    setFranchiseFilter('');
    setFranchisePage(1);
  };



  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Management</h1>
        <p className="text-gray-600">Track and manage all franchise and user orders</p>
      </div>

      {/* Franchise Order History */}
      <section className="mb-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-green-50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Franchise Order History</h2>
                <p className="text-sm text-gray-600 mt-1">
                  {franchiseOrders.length} orders • Total: ₹{franchiseOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-200">
                  <Search className="w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search orders..."
                    value={franchiseFilter}
                    onChange={e => { setFranchiseFilter(e.target.value); setFranchisePage(1); }}
                    className="border-none outline-none w-48 text-sm"
                  />
                </div>
                <div className="relative">
                  <button
                    onClick={() => setFranchiseShowFilters(!franchiseShowFilters)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
                      franchiseShowFilters ? 'bg-emerald-100 border-emerald-300 text-emerald-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Filter className="w-4 h-4" />
                    Filters
                  </button>
                  <FilterPanel
                    isOpen={franchiseShowFilters}
                    onClose={() => setFranchiseShowFilters(false)}
                    filterOptions={franchiseFilterOptions}
                    onFilterChange={handleFranchiseFilterChange}
                    onClearFilters={clearFranchiseFilters}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <OrderTable
              orders={paginatedFranchise}
              type="franchise"
              sortField={franchiseSortField}
              sortDirection={franchiseSortDirection}
              onSort={handleFranchiseSort}
            />
            
            {/* Pagination */}
            {franchiseTotalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-gray-600">
                  Showing {((franchisePage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(franchisePage * ITEMS_PER_PAGE, franchiseOrders.length)} of {franchiseOrders.length} orders
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setFranchisePage(p => Math.max(1, p - 1))}
                    disabled={franchisePage === 1}
                    className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>
                  
                  <div className="flex items-center gap-1">
                    {[...Array(franchiseTotalPages)].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setFranchisePage(i + 1)}
                        className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                          franchisePage === i + 1 
                            ? 'bg-emerald-600 text-white shadow-sm' 
                            : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => setFranchisePage(p => Math.min(franchiseTotalPages, p + 1))}
                    disabled={franchisePage === franchiseTotalPages}
                    className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* User Order History */}
      <section>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">User Order History</h2>
                <p className="text-sm text-gray-600 mt-1">
                  {userOrders.length} orders • Total: ₹{userOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-200">
                  <Search className="w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search orders..."
                    value={userFilter}
                    onChange={e => { setUserFilter(e.target.value); setUserPage(1); }}
                    className="border-none outline-none w-48 text-sm"
                  />
                </div>
                <div className="relative">
                  <button
                    onClick={() => setUserShowFilters(!userShowFilters)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
                      userShowFilters ? 'bg-emerald-100 border-emerald-300 text-emerald-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Filter className="w-4 h-4" />
                    Filters
                  </button>
                  <FilterPanel
                    isOpen={userShowFilters}
                    onClose={() => setUserShowFilters(false)}
                    filterOptions={userFilterOptions}
                    onFilterChange={handleUserFilterChange}
                    onClearFilters={clearUserFilters}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="p-6">
            <OrderTable
              orders={userOrders.slice((userPage - 1) * ITEMS_PER_PAGE, userPage * ITEMS_PER_PAGE)}
              type="user"
              sortField={"date"}
              sortDirection={"desc"}
              onSort={() => {}}
            />
            {/* Pagination */}
            {userTotalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-gray-600">
                  Showing {((userPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(userPage * ITEMS_PER_PAGE, userOrders.length)} of {userOrders.length} orders
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setUserPage(p => Math.max(1, p - 1))}
                    disabled={userPage === 1}
                    className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>
                  <div className="flex items-center gap-1">
                    {[...Array(userTotalPages)].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setUserPage(i + 1)}
                        className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                          userPage === i + 1 
                            ? 'bg-emerald-600 text-white shadow-sm' 
                            : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setUserPage(p => Math.min(userTotalPages, p + 1))}
                    disabled={userPage === userTotalPages}
                    className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}