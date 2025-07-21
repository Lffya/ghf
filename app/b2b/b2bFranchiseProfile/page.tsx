import { useState } from 'react';
import { FRANCHISE_MOCK_DATA, FranchiseMockData } from '../../../constants';

export default function B2BFranchiseProfile() {
  // Only one franchise profile
  // isEditing can be: false | 'franchise' | 'bank' | 'login' | 'owner' | 'documents'
  const [isEditing, setIsEditing] = useState<false | string>(false);
  const [profile, setProfile] = useState<FranchiseMockData>(FRANCHISE_MOCK_DATA[0]);
  const [formData, setFormData] = useState<FranchiseMockData>(profile);
  const [docPreview, setDocPreview] = useState<{ label: string; url: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(profile);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        {/* Profile Status */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-green-600">Franchise Information</h2>
          <span
            className={`px-4 py-2 rounded-lg text-white font-semibold text-sm
              ${profile.status === 'Rejected' ? 'bg-red-500' : profile.status === 'Approved' ? 'bg-green-500' : 'bg-yellow-500'}`}
          >
            {profile.status}
          </span>
        </div>
        <div className="mb-10 border-b pb-8">
          {/* Franchise Info Section */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-700">{profile.name}</h3>
            <button
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 flex items-center"
              onClick={() => setIsEditing(isEditing === 'franchise' ? false : 'franchise')}
            >
              Edit
            </button>
          </div>
          {isEditing === 'franchise' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Franchise Info */}
              <div><label className="block mb-1 text-gray-700">Franchise Name</label><input name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded text-gray-700" /></div>
              <div><label className="block mb-1 text-gray-700">Manager</label><input name="manager" value={formData.manager} onChange={handleChange} className="w-full p-2 border rounded text-gray-700" /></div>
              <div><label className="block mb-1 text-gray-700">Location</label><input name="location" value={formData.location} onChange={handleChange} className="w-full p-2 border rounded text-gray-700" /></div>
              <div><label className="block mb-1 text-gray-700">Revenue</label><input name="revenue" value={formData.revenue} onChange={handleChange} className="w-full p-2 border rounded text-gray-700" /></div>
              <div><label className="block mb-1 text-gray-700">Status</label><select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border rounded text-gray-700"><option value="Active">Active</option><option value="Inactive">Inactive</option></select></div>
              <div><label className="block mb-1 text-gray-700">Zone</label><input name="zone" value={formData.zone} onChange={handleChange} className="w-full p-2 border rounded text-gray-700" /></div>
              <div><label className="block mb-1 text-gray-700">Pin Code</label><input name="pinCode" value={formData.pinCode} onChange={handleChange} className="w-full p-2 border rounded text-gray-700" /></div>
              <div><label className="block mb-1 text-gray-700">State</label><input name="state" value={formData.state} onChange={handleChange} className="w-full p-2 border rounded text-gray-700" /></div>
              <div><label className="block mb-1 text-gray-700">District</label><input name="district" value={formData.district} onChange={handleChange} className="w-full p-2 border rounded text-gray-700" /></div>
              <div><label className="block mb-1 text-gray-700">Type</label><select name="type" value={formData.type} onChange={handleChange} className="w-full p-2 border rounded text-gray-700"><option value="Standard">Standard</option><option value="Express">Express</option></select></div>
              <div><label className="block mb-1 text-gray-700">Size</label><input name="size" value={formData.size} onChange={handleChange} className="w-full p-2 border rounded text-gray-700" /></div>
              <div><label className="block mb-1 text-gray-700">Parking</label><input name="parking" value={formData.parking} onChange={handleChange} className="w-full p-2 border rounded text-gray-700" /></div>
              <div><label className="block mb-1 text-gray-700">GST</label><input name="gst" value={formData.gst} onChange={handleChange} className="w-full p-2 border rounded text-gray-700" /></div>
              <div><label className="block mb-1 text-gray-700">Max Delivery Time</label><input name="maxDeliveryTime" value={formData.maxDeliveryTime} onChange={handleChange} className="w-full p-2 border rounded text-gray-700" /></div>
              <div><label className="block mb-1 text-gray-700">Min Delivery Time</label><input name="minDeliveryTime" value={formData.minDeliveryTime} onChange={handleChange} className="w-full p-2 border rounded text-gray-700" /></div>
              <div className="md:col-span-2"><label className="block mb-1 text-gray-700">Description</label><textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded text-gray-700" /></div>
              <div className="md:col-span-2 flex gap-4 mt-4">
                <button onClick={handleSave} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Save</button>
                <button onClick={handleCancel} className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">Cancel</button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
              {/* Franchise Info */}
              <div><span className="font-semibold">Manager:</span> {profile.manager}</div>
              <div><span className="font-semibold">Location:</span> {profile.location}</div>
              <div><span className="font-semibold">Revenue:</span> ₹{profile.revenue}</div>
              <div><span className="font-semibold">Status:</span> {profile.status}</div>
              <div><span className="font-semibold">Zone:</span> {profile.zone}</div>
              <div><span className="font-semibold">Pin Code:</span> {profile.pinCode}</div>
              <div><span className="font-semibold">State:</span> {profile.state}</div>
              <div><span className="font-semibold">District:</span> {profile.district}</div>
              <div><span className="font-semibold">Type:</span> {profile.type}</div>
              <div><span className="font-semibold">Size:</span> {profile.size}</div>
              <div><span className="font-semibold">Parking:</span> {profile.parking}</div>
              <div><span className="font-semibold">GST:</span> {profile.gst}</div>
              <div><span className="font-semibold">Max Delivery Time:</span> {profile.maxDeliveryTime}</div>
              <div><span className="font-semibold">Min Delivery Time:</span> {profile.minDeliveryTime}</div>
              <div className="md:col-span-2"><span className="font-semibold">Description:</span> {profile.description}</div>
            </div>
          )}
          {/* Bank Info Section */}
          <div className="flex justify-between items-center mt-8 mb-2">
            <div className="font-bold text-lg text-green-700">Bank Information</div>
            <button
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 flex items-center"
              onClick={() => setIsEditing(isEditing === 'bank' ? false : 'bank')}
            >
              Edit
            </button>
          </div>
          {isEditing === 'bank' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className="block mb-1 text-gray-700">Beneficiary Name</label><input name="beneficiaryName" value={formData.beneficiaryName} onChange={handleChange} className="w-full p-2 border rounded text-gray-700" /></div>
              <div><label className="block mb-1 text-gray-700">Account Type</label><select name="accountType" value={formData.accountType} onChange={handleChange} className="w-full p-2 border rounded text-gray-700"><option value="Savings">Savings</option><option value="Current">Current</option></select></div>
              <div><label className="block mb-1 text-gray-700">Account Number</label><input name="accountNumber" value={formData.accountNumber} onChange={handleChange} className="w-full p-2 border rounded text-gray-700" /></div>
              <div><label className="block mb-1 text-gray-700">Bank</label><input name="bankName" value={formData.bankName} onChange={handleChange} className="w-full p-2 border rounded text-gray-700" /></div>
              <div><label className="block mb-1 text-gray-700">IFSC Code</label><input name="ifsc" value={formData.ifsc} onChange={handleChange} className="w-full p-2 border rounded text-gray-700" /></div>
              <div className="md:col-span-2 flex gap-4 mt-4">
                <button onClick={handleSave} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Save</button>
                <button onClick={handleCancel} className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">Cancel</button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
              <div><span className="font-semibold">Beneficiary Name:</span> {profile.beneficiaryName}</div>
              <div><span className="font-semibold">Account Type:</span> {profile.accountType}</div>
              <div><span className="font-semibold">Account Number:</span> {profile.accountNumber}</div>
              <div><span className="font-semibold">Bank:</span> {profile.bankName}</div>
              <div><span className="font-semibold">IFSC Code:</span> {profile.ifsc}</div>
            </div>
          )}
          {/* Login Info Section */}
          <div className="flex justify-between items-center mt-8 mb-2">
            <div className="font-bold text-lg text-green-700">Login Information</div>
            <button
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 flex items-center"
              onClick={() => setIsEditing(isEditing === 'login' ? false : 'login')}
            >
              Edit
            </button>
          </div>
          {isEditing === 'login' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className="block mb-1 text-gray-700">Email</label><input name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded text-gray-700" /></div>
              <div className="md:col-span-2 flex gap-4 mt-4">
                <button onClick={handleSave} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Save</button>
                <button onClick={handleCancel} className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">Cancel</button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
              <div><span className="font-semibold">Email:</span> {profile.email}</div>
            </div>
          )}
          {/* Owner Info Section */}
          <div className="flex justify-between items-center mt-8 mb-2">
            <div className="font-bold text-lg text-green-700">Owner Information</div>
            <button
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 flex items-center"
              onClick={() => setIsEditing(isEditing === 'owner' ? false : 'owner')}
            >
              Edit
            </button>
          </div>
          {isEditing === 'owner' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className="block mb-1 text-gray-700">First Name</label><input name="ownerFirstName" value={formData.ownerFirstName} onChange={handleChange} className="w-full p-2 border rounded text-gray-700" /></div>
              <div><label className="block mb-1 text-gray-700">Last Name</label><input name="ownerLastName" value={formData.ownerLastName} onChange={handleChange} className="w-full p-2 border rounded text-gray-700" /></div>
              <div><label className="block mb-1 text-gray-700">Owner Phone</label><input name="ownerPhone" value={formData.ownerPhone} onChange={handleChange} className="w-full p-2 border rounded text-gray-700" /></div>
              <div className="md:col-span-2 flex gap-4 mt-4">
                <button onClick={handleSave} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Save</button>
                <button onClick={handleCancel} className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">Cancel</button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
              <div><span className="font-semibold">First Name:</span> {profile.ownerFirstName}</div>
              <div><span className="font-semibold">Last Name:</span> {profile.ownerLastName}</div>
              <div><span className="font-semibold">Owner Phone:</span> {profile.ownerPhone}</div>
            </div>
          )}
          {/* Uploaded Documents Section */}
          <div className="flex justify-between items-center mt-8 mb-2">
            <div className="font-bold text-lg text-green-700">Uploaded Documents</div>
            <button
              className={`px-4 py-2 rounded-lg flex items-center text-white ${profile.status === 'Rejected' ? 'bg-gray-400 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600'}`}
              onClick={() => {
                if (profile.status !== 'Rejected') setIsEditing(isEditing === 'documents' ? false : 'documents');
              }}
              disabled={profile.status === 'Rejected'}
            >
              Edit
            </button>
          </div>
          {isEditing === 'documents' ? (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full mt-2">
              {[
                { label: 'Aadhar', url: '#' },
                { label: 'Pan', url: '#' },
                { label: 'Digital Sign', url: '#' },
                { label: 'Address Documents', url: '#' },
                { label: 'Shop Photo', url: '#' },
              ].map(doc => (
                <div key={doc.label} className="bg-white border rounded-lg shadow flex flex-col items-center justify-center p-4">
                  <div className="w-12 h-12 flex items-center justify-center mb-2 bg-green-50 rounded-full">
                    <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" /></svg>
                  </div>
                  <span className="text-xs font-medium text-gray-700">{doc.label}</span>
                  <span className="text-green-600 text-xs mt-1">Uploaded</span>
                  <button type="button" onClick={() => setDocPreview(doc)} className="mt-2 text-xs text-blue-600 underline hover:text-blue-800">View</button>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full mt-2">
              <div className="bg-white border rounded-lg shadow flex flex-col items-center justify-center p-4">
                <div className="w-12 h-12 flex items-center justify-center mb-2 bg-green-50 rounded-full">
                  <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" /></svg>
                </div>
                <span className="text-xs font-medium text-gray-700">Aadhar</span>
                <span className="text-green-600 text-xs mt-1">Uploaded</span>
              </div>
              <div className="bg-white border rounded-lg shadow flex flex-col items-center justify-center p-4">
                <div className="w-12 h-12 flex items-center justify-center mb-2 bg-green-50 rounded-full">
                  <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" /></svg>
                </div>
                <span className="text-xs font-medium text-gray-700">Pan</span>
                <span className="text-green-600 text-xs mt-1">Uploaded</span>
              </div>
              <div className="bg-white border rounded-lg shadow flex flex-col items-center justify-center p-4">
                <div className="w-12 h-12 flex items-center justify-center mb-2 bg-green-50 rounded-full">
                  <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" /></svg>
                </div>
                <span className="text-xs font-medium text-gray-700">Digital Sign</span>
                <span className="text-green-600 text-xs mt-1">Uploaded</span>
              </div>
              <div className="bg-white border rounded-lg shadow flex flex-col items-center justify-center p-4">
                <div className="w-12 h-12 flex items-center justify-center mb-2 bg-green-50 rounded-full">
                  <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" /></svg>
                </div>
                <span className="text-xs font-medium text-gray-700">Address Documents</span>
                <span className="text-green-600 text-xs mt-1">Uploaded</span>
              </div>
              <div className="bg-white border rounded-lg shadow flex flex-col items-center justify-center p-4">
                <div className="w-12 h-12 flex items-center justify-center mb-2 bg-green-50 rounded-full">
                  <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" /></svg>
                </div>
                <span className="text-xs font-medium text-gray-700">Shop Photo</span>
                <span className="text-green-600 text-xs mt-1">Uploaded</span>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Document Preview Modal */}
      {docPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-0 backdrop-blur-sm "style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(0px)' }}>
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl" onClick={() => setDocPreview(null)}>&times;</button>
            <h3 className="text-lg font-bold mb-4 text-green-700">{docPreview.label} Preview</h3>
            {/* Replace below with actual document preview logic */}
            <div className="flex flex-col items-center justify-center">
              <svg className="w-16 h-16 text-green-400 mb-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" /></svg>
              <span className="text-gray-600 mb-2">Document preview not available.</span>
              <a href={docPreview.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Open in new tab</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}



