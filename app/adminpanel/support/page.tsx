'use client';
import { ChevronLeft, ChevronRight, Eye, Filter, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { SUPPORT_TICKETS_MOCK } from '../../../constants';

// Type definitions
interface TicketMessage {
  sender: string;
  text: string;
  time: string;
}

interface Ticket {
  id: string;
  type: string;
  subject: string;
  description: string;
  priority: string;
  status: string;
  createdAt: string;
  customerName: string;
  email: string;
  mobile: string;
  messages: TicketMessage[];
}

interface Filters {
  type: string;
  status: string;
  priority: string;
  searchTerm: string;
}

const Support = () => {
  const [tickets] = useState<Ticket[]>(SUPPORT_TICKETS_MOCK);

  const [filters, setFilters] = useState<Filters>({
    type: 'all',
    status: 'all',
    priority: 'all',
    searchTerm: ''
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  // Reply feature removed
  const itemsPerPage = 5;

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket: Ticket) => {
      const matchesType = filters.type === 'all' || ticket.type === filters.type;
      const matchesStatus = filters.status === 'all' || ticket.status.toLowerCase() === filters.status;
      const matchesPriority = filters.priority === 'all' || ticket.priority.toLowerCase() === filters.priority;
      const matchesSearch = !filters.searchTerm || 
        ticket.subject.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        ticket.customerName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        ticket.email.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        ticket.mobile.includes(filters.searchTerm) ||
        ticket.id.toLowerCase().includes(filters.searchTerm.toLowerCase());
      return matchesType && matchesStatus && matchesPriority && matchesSearch;
    });
  }, [tickets, filters]);

  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTickets = filteredTickets.slice(startIndex, startIndex + itemsPerPage);

  const handleFilterChange = (filterType: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
    setCurrentPage(1);
  };

  // Reply feature removed

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'in progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'user': return 'bg-blue-100 text-blue-800';
      case 'b2b': return 'bg-purple-100 text-purple-800';
      case 'franchise': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Support Center</h1>
          <div className="text-sm text-gray-600">
            Total Tickets: {filteredTickets.length}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <label htmlFor="support-search" className="text-gray-700 text-sm mb-1 block">Search</label>
              <Search className="w-5 h-5 text-gray-400" />
              <input
                id="support-search"
                type="text"
                placeholder="Search by ticket ID, customer, email, or mobile..."
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 text-gray-700"
                value={filters.searchTerm}
                onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <label htmlFor="support-type" className="text-gray-700 text-sm mb-1 block">Type</label>
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                id="support-type"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
              >
                <option value="all" className="text-gray-700">All Types</option>
                <option value="user" className="text-gray-700">User</option>
                <option value="b2b" className="text-gray-700">B2B</option>
                <option value="franchise" className="text-gray-700">Franchise</option>
              </select>
            </div>

            <label htmlFor="support-status" className="text-gray-700 text-sm mb-1 block">Status</label>
            <select
              id="support-status"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="all" className="text-gray-700">All Status</option>
              <option value="open" className="text-gray-700">Open</option>
              <option value="in progress" className="text-gray-700">In Progress</option>
              <option value="resolved" className="text-gray-700">Resolved</option>
            </select>

            <label htmlFor="support-priority" className="text-gray-700 text-sm mb-1 block">Priority</label>
            <select
              id="support-priority"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              value={filters.priority}
              onChange={(e) => handleFilterChange('priority', e.target.value)}
            >
              <option value="all" className="text-gray-700">All Priority</option>
              <option value="critical" className="text-gray-700">Critical</option>
              <option value="high" className="text-gray-700">High</option>
              <option value="medium" className="text-gray-700">Medium</option>
              <option value="low" className="text-gray-700">Low</option>
            </select>
          </div>
        </div>

        {/* Tickets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tickets List */}
          <div className="bg-white rounded-lg shadow-sm w-full max-h-fit">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Support Tickets</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {paginatedTickets.map((ticket: Ticket) => (
                <div
                  key={ticket.id}
                  className={`p-6 hover:bg-gray-50 cursor-pointer transition-colors ${
                    selectedTicket?.id === ticket.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  }`}
                  onClick={() => setSelectedTicket(ticket)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono text-gray-500">{ticket.id}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(ticket.type)}`}>
                        {ticket.type.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{ticket.subject}</h3>
                  <p className="text-sm text-gray-600 mb-3">{ticket.description}</p>
                  <div className="text-xs text-gray-500 space-y-1">
                    <div><strong>Customer:</strong> {ticket.customerName}</div>
                    <div><strong>Email:</strong> {ticket.email}</div>
                    <div><strong>Mobile:</strong> {ticket.mobile}</div>
                    <div><strong>Created:</strong> {ticket.createdAt}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="p-6 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredTickets.length)} of {filteredTickets.length} tickets
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700"
                  >
                    <ChevronLeft className="w-4 h-4 text-gray-700" />
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-2 rounded-lg text-sm ${
                        currentPage === i + 1
                          ? 'bg-blue-500 text-white'
                          : 'border border-gray-300 hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <span className="text-gray-700">{i + 1}</span>
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700"
                  >
                    <ChevronRight className="w-4 h-4 text-gray-700" />
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* Ticket Details */}
          <div className="bg-white rounded-lg shadow-sm">
            {selectedTicket ? (
              <>
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">Ticket Details</h2>
                    {/* Reply buttons removed: only show ticket details */}
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm font-mono text-gray-500">{selectedTicket.id}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(selectedTicket.type)}`}>
                        {selectedTicket.type.toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(selectedTicket.priority)}`}>
                        {selectedTicket.priority}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedTicket.status)}`}>
                        {selectedTicket.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{selectedTicket.subject}</h3>
                    <p className="text-gray-600 mb-4">{selectedTicket.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong className="text-gray-700">Customer:</strong>
                        <p className="text-gray-600">{selectedTicket.customerName}</p>
                      </div>
                      <div>
                        <strong className="text-gray-700">Email:</strong>
                        <p className="text-gray-600">{selectedTicket.email}</p>
                      </div>
                      <div>
                        <strong className="text-gray-700">Mobile:</strong>
                        <p className="text-gray-600">{selectedTicket.mobile}</p>
                      </div>
                      <div>
                        <strong className="text-gray-700">Created:</strong>
                        <p className="text-gray-600">{selectedTicket.createdAt}</p>
                      </div>
                    </div>
                  </div>
                  {/* Conversation History removed as requested */}
                </div>
              </>
            ) : (
              <div className="p-6 text-center">
                <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Select a ticket to view details</p>
              </div>
            )}
          </div>
        </div>

      
      </div>
    </div>
  );
};

export default Support;