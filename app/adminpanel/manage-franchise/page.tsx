import { Edit, Eye, MapPin, Plus, Search, Upload, X } from 'lucide-react';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { FRANCHISE_MOCK_DATA } from '../../../constants';

// Type definitions
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

interface FranchiseFormData extends Omit<Franchise, 'id' | 'revenue' | 'size' | 'refundableDeposit'> {
  revenue: string;
  size: string;
  refundableDeposit: string;
}

const ManageFranchise = () => {
  const [franchises, setFranchises] = useState<Franchise[]>(FRANCHISE_MOCK_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterLocation, setFilterLocation] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDetailView, setShowDetailView] = useState(false);
  const [selectedFranchise, setSelectedFranchise] = useState<Franchise | null>(null);
  const [editingFranchise, setEditingFranchise] = useState<Franchise | null>(null);
 
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const [formData, setFormData] = useState<FranchiseFormData>({
    name: '',
    location: '',
    manager: '',
    revenue: '',
    status: 'Active',
    zone: '',
    pinCode: '',
    state: '',
    district: '',
    type: 'Standard',
    size: '',
    parking: 'Available',
    gst: '',
    maxDeliveryTime: '',
    minDeliveryTime: '',
    description: '',
    mapLink: '',
    refundableDeposit: '',
    ownerFirstName: '',
    ownerLastName: '',
    ownerPhone: '',
    beneficiaryName: '',
    accountType: 'Savings',
    accountNumber: '',
    bankName: '',
    ifsc: '',
    email: ''
  });

  const filteredFranchises = franchises.filter((franchise) => {
    const matchesSearch = franchise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      franchise.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || franchise.status === filterStatus;
    const matchesLocation = filterLocation === 'All' || franchise.zone === filterLocation;
    return matchesSearch && matchesStatus && matchesLocation;
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingFranchise) {
      setFranchises(prev => prev.map(franchise =>
        franchise.id === editingFranchise.id ? {
          ...formData,
          id: editingFranchise.id,
          revenue: parseFloat(formData.revenue),
          size: parseFloat(formData.size),
          refundableDeposit: parseFloat(formData.refundableDeposit)
        } as Franchise : franchise
      ));
      setEditingFranchise(null);
    } else {
      const newFranchise: Franchise = {
        ...formData,
        id: Date.now(),
        revenue: parseFloat(formData.revenue),
        size: parseFloat(formData.size),
        refundableDeposit: parseFloat(formData.refundableDeposit)
      } as Franchise;
      setFranchises(prev => [...prev, newFranchise]);
    }
    setShowAddForm(false);
    setFormData({
      name: '',
      location: '',
      manager: '',
      revenue: '',
      status: 'Active',
      zone: '',
      pinCode: '',
      state: '',
      district: '',
      type: 'Standard',
      size: '',
      parking: 'Available',
      gst: '',
      maxDeliveryTime: '',
      minDeliveryTime: '',
      description: '',
      mapLink: '',
      refundableDeposit: '',
      ownerFirstName: '',
      ownerLastName: '',
      ownerPhone: '',
      beneficiaryName: '',
      accountType: 'Savings',
      accountNumber: '',
      bankName: '',
      ifsc: '',
      email: ''
    });
  };

  const handleEdit = (franchise: Franchise) => {
    setFormData({
      ...franchise,
      revenue: franchise.revenue.toString(),
      size: franchise.size.toString(),
      refundableDeposit: franchise.refundableDeposit.toString()
    });
    setEditingFranchise(franchise);
    setShowAddForm(true);
  };

  const handleViewDetails = (franchise: Franchise) => {
    setSelectedFranchise(franchise);
    setShowDetailView(true);
  };

 

  const handleFileUpload = (fieldName: string) => {
    if (fileInputRefs.current[fieldName]) {
      fileInputRefs.current[fieldName]!.click();
    }
  };

  const FormField = ({ label, name, type = 'text', options = null, required = false }: {
    label: string;
    name: keyof FranchiseFormData;
    type?: string;
    options?: string[] | null;
    required?: boolean;
  }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === 'select' && options ? (
        <select
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
          required={required}
        >
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          rows={3}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
          required={required}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
          required={required}
        />
      )}
    </div>
  );

  const DocumentUpload = ({ label, fieldName }: { label: string; fieldName: string }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex items-center space-x-2">
        <button
          type="button"
          onClick={() => handleFileUpload(fieldName)}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center space-x-2"
        >
          <Upload size={16} />
          <span>Upload File</span>
        </button>
        <input
          type="file"
          ref={el => {
            fileInputRefs.current[fieldName] = el;
          }}
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={e => {
            if (e.target.files && e.target.files[0]) {
              console.log(`${fieldName} uploaded:`, e.target.files[0]);
            }
          }}
        />
      </div>
    </div>
  );

  if (showDetailView && selectedFranchise) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Franchise Details</h2>
          <button
            onClick={() => setShowDetailView(false)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Basic Details */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Details</h3>
            <div className="space-y-3">
              <div><strong>Franchise Name:</strong> {selectedFranchise.name}</div>
              <div><strong>Refundable Deposit:</strong> ₹{selectedFranchise.refundableDeposit?.toLocaleString()}</div>
              <div><strong>Size (sqft):</strong> {selectedFranchise.size}</div>
              <div><strong>Parking:</strong> {selectedFranchise.parking}</div>
              <div><strong>GST:</strong> {selectedFranchise.gst}</div>
              <div><strong>Address:</strong> {selectedFranchise.location}</div>
              <div><strong>Max Delivery Time:</strong> {selectedFranchise.maxDeliveryTime}</div>
              <div><strong>Min Delivery Time:</strong> {selectedFranchise.minDeliveryTime}</div>
              <div><strong>Type:</strong> {selectedFranchise.type}</div>
              <div><strong>Description:</strong> {selectedFranchise.description}</div>
              <div><strong>Zone:</strong> {selectedFranchise.zone}</div>
              <div><strong>Pin Code:</strong> {selectedFranchise.pinCode}</div>
              <div><strong>State:</strong> {selectedFranchise.state}</div>
              <div><strong>District:</strong> {selectedFranchise.district}</div>
              <div className="flex items-center space-x-2">
                <strong>Map Link:</strong>
                <a href={selectedFranchise.mapLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                  <MapPin size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* Owner Information */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Owner Information</h3>
            <div className="space-y-3">
              <div><strong>First Name:</strong> {selectedFranchise.ownerFirstName}</div>
              <div><strong>Last Name:</strong> {selectedFranchise.ownerLastName}</div>
              <div><strong>Phone Number:</strong> {selectedFranchise.ownerPhone}</div>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-4 mt-6">Bank Information</h3>
            <div className="space-y-3">
              <div><strong>Beneficiary Name:</strong> {selectedFranchise.beneficiaryName}</div>
              <div><strong>Account Type:</strong> {selectedFranchise.accountType}</div>
              <div><strong>Account Number:</strong> {selectedFranchise.accountNumber}</div>
              <div><strong>Bank:</strong> {selectedFranchise.bankName}</div>
              <div><strong>IFSC:</strong> {selectedFranchise.ifsc}</div>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-4 mt-6">Login Information</h3>
            <div className="space-y-3">
              <div><strong>Email:</strong> {selectedFranchise.email}</div>
            </div>
          </div>
        </div>

        {/* Documents Section */}
        <div className="mt-8 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Documents</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <div className="text-gray-600 mb-2">Aadhar ID</div>
              <div className="text-sm text-gray-500">Document uploaded</div>
            </div>
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <div className="text-gray-600 mb-2">PAN Card</div>
              <div className="text-sm text-gray-500">Document uploaded</div>
            </div>
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <div className="text-gray-600 mb-2">Digital Signature</div>
              <div className="text-sm text-gray-500">Document uploaded</div>
            </div>
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <div className="text-gray-600 mb-2">Address Document</div>
              <div className="text-sm text-gray-500">Document uploaded</div>
            </div>
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <div className="text-gray-600 mb-2">Shop Photo</div>
              <div className="text-sm text-gray-500">Document uploaded</div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={() => handleEdit(selectedFranchise)}
            className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 flex items-center space-x-2"
          >
            <Edit size={16} />
            <span>Edit Franchise</span>
          </button>
        </div>
      </div>
    );
  }

  if (showAddForm) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {editingFranchise ? 'Edit Franchise' : 'Add New Franchise'}
          </h2>
          <button
            onClick={() => {
              setShowAddForm(false);
              setEditingFranchise(null);
              setFormData({
                name: '',
                location: '',
                manager: '',
                revenue: '',
                status: 'Active',
                zone: '',
                pinCode: '',
                state: '',
                district: '',
                type: 'Standard',
                size: '',
                parking: 'Available',
                gst: '',
                maxDeliveryTime: '',
                minDeliveryTime: '',
                description: '',
                mapLink: '',
                refundableDeposit: '',
                ownerFirstName: '',
                ownerLastName: '',
                ownerPhone: '',
                beneficiaryName: '',
                accountType: 'Savings',
                accountNumber: '',
                bankName: '',
                ifsc: '',
                email: ''
              });
            }}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Details */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Franchise Name" name="name" required />
              <FormField label="Refundable Deposit Amount" name="refundableDeposit" type="number" required />
              <FormField label="Size (sqft)" name="size" type="number" required />
              <FormField label="Parking" name="parking" type="select" options={['Available', 'Limited', 'Not Available']} />
              <FormField label="GST" name="gst" required />
              <FormField label="Manager" name="manager" required />
              <FormField label="Revenue" name="revenue" type="number" required />
              <FormField label="Status" name="status" type="select" options={['Active', 'Inactive']} />
              <FormField label="Max Delivery Time" name="maxDeliveryTime" required />
              <FormField label="Min Delivery Time" name="minDeliveryTime" required />
              <FormField label="Type" name="type" type="select" options={['Standard', 'Express']} />
              <FormField label="Zone" name="zone" required />
              <FormField label="Pin Code" name="pinCode" required />
              <FormField label="State" name="state" required />
              <FormField label="District" name="district" required />
              <FormField label="Map Link" name="mapLink" />
            </div>
            <FormField label="Franchise Address" name="location" required />
            <FormField label="Description" name="description" type="textarea" />
          </div>

          {/* Owner Information */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Owner Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="First Name" name="ownerFirstName" required />
              <FormField label="Last Name" name="ownerLastName" required />
              <FormField label="Phone Number" name="ownerPhone" type="tel" required />
            </div>
          </div>

          {/* Bank Information */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Bank Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Beneficiary Name" name="beneficiaryName" required />
              <FormField label="Account Type" name="accountType" type="select" options={['Savings', 'Current']} />
              <FormField label="Account Number" name="accountNumber" required />
              <FormField label="Bank" name="bankName" required />
              <FormField label="IFSC" name="ifsc" required />
            </div>
          </div>

          {/* Login Information */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Login Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Email" name="email" type="email" required />
            </div>
          </div>

          {/* Document Upload */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DocumentUpload label="Upload Aadhar ID" fieldName="aadhar" />
              <DocumentUpload label="Upload PAN Card" fieldName="pan" />
              <DocumentUpload label="Upload Digital Signature" fieldName="signature" />
              <DocumentUpload label="Upload Address Document" fieldName="address" />
              <DocumentUpload label="Upload Shop Photo" fieldName="photo" />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => {
                setShowAddForm(false);
                setEditingFranchise(null);
              }}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-white rounded-lg hover:opacity-90"
              style={{backgroundColor: '#22c55e'}}
            >
              {editingFranchise ? 'Update Franchise' : 'Add Franchise'}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Franchise</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 text-white rounded-lg hover:opacity-90 flex items-center space-x-2"
          style={{backgroundColor: '#22c55e'}}
        >
          <Plus size={16} />
          <span>Add New Franchise</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search franchises..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
          />
        </div>
        
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <select
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
        >
          <option value="All">All Locations</option>
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="East">East</option>
          <option value="West">West</option>
        </select>

        {/* Download Report button removed as requested */}
      </div>

      {/* Franchise Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFranchises.map(franchise => (
          <div key={franchise.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800">{franchise.name}</h3>
              <span className={`px-2 py-1 text-xs rounded ${
                franchise.status === 'Active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {franchise.status}
              </span>
            </div>
            <p className="text-sm text-gray-600">{franchise.location}</p>
            <p className="text-sm text-gray-600">Manager: {franchise.manager}</p>
            <p className="text-sm text-gray-600">Revenue: ₹{franchise.revenue.toLocaleString()}/month</p>
            <p className="text-sm text-gray-600">Zone: {franchise.zone}</p>
            <div className="flex space-x-2 mt-3">
              <button
                onClick={() => handleViewDetails(franchise)}
                className="px-3 py-1 text-white text-sm rounded hover:opacity-90 flex items-center space-x-1"
                style={{backgroundColor: '#22c55e'}}
              >
                <Eye size={14} />
                <span>View Details</span>
              </button>
              <button
                onClick={() => handleEdit(franchise)}
                className="px-3 py-1 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700 flex items-center space-x-1"
              >
                <Edit size={14} />
                <span>Edit</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredFranchises.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No franchises found matching your criteria.
        </div>
      )}
    </div>
  );
};

export default ManageFranchise;