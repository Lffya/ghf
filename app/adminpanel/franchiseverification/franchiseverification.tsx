import { CheckCircle, MapPin, X, XCircle } from 'lucide-react';
import { useState } from 'react';
import { FRANCHISE_MOCK_DATA } from '../../../constants';

interface Franchise {
  id: number;
  name: string;
  location: string;
  manager: string;
  revenue: number;
  status: string;
  zone: string;
  pinCode: string;
  state: string;
  district: string;
  type: string;
  size: number;
  parking: string;
  gst: string;
  maxDeliveryTime: string;
  minDeliveryTime: string;
  description: string;
  mapLink: string;
  refundableDeposit: number;
  ownerFirstName: string;
  ownerLastName: string;
  ownerPhone: string;
  beneficiaryName: string;
  accountType: string;
  accountNumber: string;
  bankName: string;
  ifsc: string;
  email: string;
}

const PAGE_SIZE = 6;
const FranchiseVerification = () => {
  const [franchises, setFranchises] = useState<Franchise[]>(FRANCHISE_MOCK_DATA);
  const [selected, setSelected] = useState<Franchise | null>(null);
  const [actionMsg, setActionMsg] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(franchises.length / PAGE_SIZE);
  const paginatedFranchises = franchises.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const sendEmail = (email: string, subject: string, message: string) => {
    // Simulate sending email (replace with real API call in production)
    // eslint-disable-next-line no-console
    console.log(`Email sent to ${email}: Subject: ${subject} | Message: ${message}`);
  };

  const handleApprove = () => {
    if (selected) {
      setFranchises(prev => prev.map(f => f.id === selected.id ? { ...f, status: 'Active' } : f));
      setActionMsg('Document approved');
      sendEmail(
        selected.email,
        'Franchise Document Approved',
        `Dear ${selected.ownerFirstName}, your franchise documents have been approved. You are now verified.`
      );
      setTimeout(() => {
        setActionMsg(null);
        setSelected(null);
      }, 1500);
    }
  };
  const handleReject = () => {
    if (selected) {
      setFranchises(prev => prev.map(f => f.id === selected.id ? { ...f, status: 'Rejected' } : f));
      setActionMsg('Document rejected, please make sure all documents are proper');
      sendEmail(
        selected.email,
        'Franchise Document Rejected',
        `Dear ${selected.ownerFirstName}, your franchise documents have been rejected. Please make sure all documents are proper and resubmit.`
      );
      setTimeout(() => {
        setActionMsg(null);
        setSelected(null);
      }, 2000);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Franchise Verification</h2>
      {!selected ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedFranchises.map(franchise => (
              <div key={franchise.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-800">{franchise.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded ${franchise.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{franchise.status}</span>
                </div>
                <p className="text-sm text-gray-600">{franchise.location}</p>
                <p className="text-sm text-gray-600">Manager: {franchise.manager}</p>
                <p className="text-sm text-gray-600">Zone: {franchise.zone}</p>
                <div className="flex justify-end mt-3">
                  <button
                    onClick={() => setSelected(franchise)}
                    className="px-3 py-1 text-white text-sm rounded hover:opacity-90 flex items-center space-x-1"
                    style={{backgroundColor: '#22c55e'}}
                  >
                    <span>Verify</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-[#22c55e] rounded-lg hover:bg-[#e6faef] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
              >
                Previous
              </button>
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`w-10 h-10 text-sm font-medium rounded-lg transition-all duration-150 border ${
                      page === pageNum
                        ? 'bg-[#22c55e] text-gray-700 border-[#22c55e] shadow-lg'
                        : 'text-gray-700 border-[#22c55e] bg-white hover:bg-[#e6faef] hover:shadow-md'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-[#22c55e] rounded-lg hover:bg-[#e6faef] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-700">Franchise Details</h2>
            <button onClick={() => setSelected(null)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-3">
              <div className="text-gray-700"><strong>Franchise Name:</strong> {selected.name}</div>
              <div className="text-gray-700"><strong>Refundable Deposit:</strong> ₹{selected.refundableDeposit?.toLocaleString()}</div>
              <div className="text-gray-700"><strong>Size (sqft):</strong> {selected.size}</div>
              <div className="text-gray-700"><strong>Parking:</strong> {selected.parking}</div>
              <div className="text-gray-700"><strong>GST:</strong> {selected.gst}</div>
              <div className="text-gray-700"><strong>Address:</strong> {selected.location}</div>
              <div className="text-gray-700"><strong>Max Delivery Time:</strong> {selected.maxDeliveryTime}</div>
              <div className="text-gray-700"><strong>Min Delivery Time:</strong> {selected.minDeliveryTime}</div>
              <div className="text-gray-700"><strong>Type:</strong> {selected.type}</div>
              <div className="text-gray-700"><strong>Description:</strong> {selected.description}</div>
              <div className="text-gray-700"><strong>Zone:</strong> {selected.zone}</div>
              <div className="text-gray-700"><strong>Pin Code:</strong> {selected.pinCode}</div>
              <div className="text-gray-700"><strong>State:</strong> {selected.state}</div>
              <div className="text-gray-700"><strong>District:</strong> {selected.district}</div>
              <div className="flex items-center space-x-2 text-gray-700">
                <strong>Map Link:</strong>
                <a href={selected.mapLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                  <MapPin size={16} />
                </a>
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-gray-700"><strong>First Name:</strong> {selected.ownerFirstName}</div>
              <div className="text-gray-700"><strong>Last Name:</strong> {selected.ownerLastName}</div>
              <div className="text-gray-700"><strong>Phone Number:</strong> {selected.ownerPhone}</div>
              <div className="text-gray-700"><strong>Beneficiary Name:</strong> {selected.beneficiaryName}</div>
              <div className="text-gray-700"><strong>Account Type:</strong> {selected.accountType}</div>
              <div className="text-gray-700"><strong>Account Number:</strong> {selected.accountNumber}</div>
              <div className="text-gray-700"><strong>Bank:</strong> {selected.bankName}</div>
              <div className="text-gray-700"><strong>IFSC:</strong> {selected.ifsc}</div>
              <div className="text-gray-700"><strong>Email:</strong> {selected.email}</div>
            </div>
          </div>
          <div className="mt-8 flex gap-4 justify-end">
            <button
              onClick={handleApprove}
              className="px-6 py-2 bg-[#22c55e] text-white rounded-lg flex items-center gap-2 hover:opacity-90"
            >
              <CheckCircle size={18} /> Approve
            </button>
            <button
              onClick={handleReject}
              className="px-6 py-2 bg-red-600 text-white rounded-lg flex items-center gap-2 hover:bg-red-700"
            >
              <XCircle size={18} /> Reject
            </button>
          </div>
          {actionMsg && (
            <div className="mt-6 text-center">
              <span className={`inline-block px-4 py-2 rounded-lg text-white ${actionMsg.startsWith('Document approved') ? 'bg-[#22c55e]' : 'bg-red-600'}`}>{actionMsg}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FranchiseVerification;
