'use client';
import { ChevronLeft, ChevronRight, Eye, Filter, Mail, MessageCircle, Search, Send, X } from 'lucide-react';
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
  const [tickets, setTickets] = useState<Ticket[]>(SUPPORT_TICKETS_MOCK);

  const [filters, setFilters] = useState<Filters>({
    type: 'all',
    status: 'all',
    priority: 'all',
    searchTerm: ''
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replyType, setReplyType] = useState<'email' | 'account'>('email');
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

  const handleSendReply = () => {
    if (!replyText.trim() || !selectedTicket) return;

    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === selectedTicket.id) {
        return {
          ...ticket,
          messages: [...ticket.messages, {
            sender: 'support',
            text: replyText,
            time: 'Just now'
          }],
          status: 'In Progress'
        };
      }
      return ticket;
    });

    setTickets(updatedTickets);
    setReplyText('');
    setShowReplyModal(false);
    // Update selected ticket
    const updatedSelectedTicket = updatedTickets.find(t => t.id === selectedTicket.id) || null;
    setSelectedTicket(updatedSelectedTicket);
  };

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
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by ticket ID, customer, email, or mobile..."
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                value={filters.searchTerm}
                onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="user">User</option>
                <option value="b2b">B2B</option>
                <option value="franchise">Franchise</option>
              </select>
            </div>

            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>

            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.priority}
              onChange={(e) => handleFilterChange('priority', e.target.value)}
            >
              <option value="all">All Priority</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        {/* Tickets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tickets List */}
          <div className="bg-white rounded-lg shadow-sm">
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
                <div className="text-sm text-gray-600">
                  Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredTickets.length)} of {filteredTickets.length} tickets
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-2 rounded-lg text-sm ${
                        currentPage === i + 1
                          ? 'bg-blue-500 text-white'
                          : 'border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-4 h-4" />
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
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setReplyType('email');
                          setShowReplyModal(true);
                        }}
                        className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        Email Reply
                      </button>
                      <button
                        onClick={() => {
                          setReplyType('account');
                          setShowReplyModal(true);
                        }}
                        className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Account Reply
                      </button>
                    </div>
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
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-4">Conversation History</h4>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {selectedTicket.messages.map((message, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg ${
                            message.sender === 'customer'
                              ? 'bg-gray-100 ml-0 mr-8'
                              : 'bg-blue-100 ml-8 mr-0'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-gray-700">
                              {message.sender === 'customer' ? selectedTicket.customerName : 'Support Team'}
                            </span>
                            <span className="text-xs text-gray-500">{message.time}</span>
                          </div>
                          <p className="text-gray-800">{message.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
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

        {/* Reply Modal */}
        {showReplyModal && (
          <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {replyType === 'email' ? 'Send Email Reply' : 'Reply to User Account'}
                </h3>
                <button
                  onClick={() => setShowReplyModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  {replyType === 'email' 
                    ? `Sending to: ${selectedTicket?.email}`
                    : `Replying to: ${selectedTicket?.customerName}'s account`
                  }
                </p>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowReplyModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendReply}
                  disabled={!replyText.trim()}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  Send Reply
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Support;