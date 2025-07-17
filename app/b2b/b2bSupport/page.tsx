import { useMemo, useState } from 'react';
import { SUPPORT_TICKETS_MOCK } from '../../../constants';

const FRANCHISE_FAQS = [
  { question: 'How do I reset my franchise portal password?', answer: 'Click on “Forgot Password” at login and follow the instructions sent to your registered email.' },
  { question: 'How can I request equipment maintenance?', answer: 'Raise a support ticket under “Equipment Malfunction” and our team will contact you.' },
  { question: 'Where can I find training materials for staff?', answer: 'Training materials are available in the “Resources” section or can be requested via support.' },
  { question: 'How do I update my franchise profile?', answer: 'Go to “Profile” in your dashboard and click “Edit”. Save changes to update your details.' },
  { question: 'What is the process for bulk orders?', answer: 'Submit a bulk order request through the “Orders” section or contact support for special pricing.' },
  { question: 'How do I track my order status?', answer: 'Order status is shown in the “Orders” section. For more details, contact support.' }
];

const ITEMS_PER_PAGE = 6;

export default function B2BSupport() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [showRaise, setShowRaise] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // Filtered and paginated tickets
  const filteredTickets = useMemo(() => {
    return SUPPORT_TICKETS_MOCK.filter((ticket: {
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
      messages: { sender: string; text: string; time: string; }[];
    }) =>
      !search || ticket.subject.toLowerCase().includes(search.toLowerCase()) || ticket.status.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);
  const totalPages = Math.ceil(filteredTickets.length / ITEMS_PER_PAGE);
  const paginatedTickets = filteredTickets.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  // Raise ticket handler (mock)
  const handleRaiseTicket = () => {
    if (subject && message) {
      alert('Ticket raised!');
      setShowRaise(false);
      setSubject('');
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4 md:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#22c55e] mb-4 sm:mb-6">Support</h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Tickets Section */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mb-6">
            <input
              type="text"
              placeholder="Search tickets..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="px-3 py-2 rounded border border-gray-300 text-sm text-gray-700 w-full sm:w-64"
            />
            <button
              onClick={() => setShowRaise(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-[#22c55e] rounded-lg shadow hover:bg-[#16a34a] transition-colors w-full sm:w-auto"
            >
              Raise Ticket
            </button>
          </div>
          <div className="bg-white rounded-xl shadow border border-gray-200 overflow-x-auto max-h-[420px] sm:max-h-none">
            <table className="min-w-full text-sm">
              <thead className="bg-[#e6faef]">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">Ticket ID</th>
                  <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">Subject</th>
                  <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">Status</th>
                  <th className="px-4 py-3 text-left font-semibold text-[#22c55e]">Raised On</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedTickets.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-12 text-gray-400">No support tickets found</td>
                  </tr>
                ) : paginatedTickets.map(ticket => (
                  <tr key={ticket.id} className="hover:bg-[#e6faef] transition-colors">
                    <td className="px-4 py-3 font-mono text-[#22c55e] font-medium">{ticket.id}</td>
                    <td className="px-4 py-3 text-gray-700">{ticket.subject}</td>
                    <td className="px-4 py-3 text-gray-700">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${ticket.status === 'Open' ? 'bg-[#e6faef] text-[#22c55e]' : ticket.status === 'Closed' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{ticket.status}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{ticket.createdAt}</td>
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
        {/* Raise Ticket Modal */}
        {showRaise && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold text-[#22c55e] mb-4">Raise Support Ticket</h2>
              <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                className="mb-3 px-3 py-2 rounded border border-gray-300 text-sm text-gray-700 w-full"
              />
              <textarea
                placeholder="Describe your issue..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="mb-3 px-3 py-2 rounded border border-gray-300 text-sm text-gray-700 w-full min-h-[80px]"
              />
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowRaise(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >Cancel</button>
                <button
                  onClick={handleRaiseTicket}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#22c55e] rounded-lg shadow hover:bg-[#16a34a]"
                  disabled={!subject || !message}
                >Submit</button>
              </div>
            </div>
          </div>
        )}
        {/* FAQs Section */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-[#22c55e] mb-4">FAQs & Guides</h2>
          <div className="bg-white rounded-xl shadow border border-gray-200 p-4 max-h-[420px] overflow-y-auto">
            {FRANCHISE_FAQS.map((faq, idx) => (
              <div key={idx} className="mb-4">
                <h3 className="font-semibold text-[#22c55e] mb-1">{faq.question}</h3>
                <p className="text-gray-700 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
