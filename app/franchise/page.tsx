"use client";
import Image from "next/image";
import { useRef } from "react";

const OpenFranchise = () => {
  const fileInputLogo = useRef<HTMLInputElement>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      
      <main className="pt-28 pb-12 px-2 md:px-0 flex justify-center">
        <form className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-6 md:p-12">
          <h2 className="text-center text-3xl font-bold mb-8 text-green-700 tracking-tight">Franchise Information</h2>
          {/* Logo Upload */}
          <div className="flex flex-col items-center mb-6">
            <div
              className="border-2 border-dashed border-[#b4e549] rounded-xl w-36 h-36 flex flex-col items-center justify-center cursor-pointer hover:bg-green-50 transition"
              onClick={() => fileInputLogo.current?.click()}
            >
              <svg className="w-12 h-12 text-[#b4e549]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-sm text-gray-500 mt-2 font-medium">Upload Logo</span>
            </div>
            <input ref={fileInputLogo} type="file" className="hidden" accept="image/*" />
            <span className="text-xs text-red-500 mt-2">Logo is a required field</span>
          </div>
          {/* Franchise Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div>
              <label className="block text-sm font-semibold text-green-700 mb-2 hover:text-green-600 transition-colors duration-200">Franchise Name <span className="text-red-500">*</span></label>
              <input className="w-full border rounded-lg px-4 py-2 text-base text-black focus:border-green-500 focus:ring-2 focus:ring-green-100 transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-green-700 mb-2 hover:text-green-600 transition-colors duration-200">Refundable Deposit Amount</label>
              <select className="w-full border rounded-lg px-4 py-2 text-base text-black focus:border-green-500 focus:ring-2 focus:ring-green-100 transition">
                <option>Choose</option>
                <option>₹50,000</option>
                <option>₹1,00,000</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-green-700 mb-2 hover:text-green-600 transition-colors duration-200">Size (sqft) <span className="text-red-500">*</span></label>
              <input className="w-full border rounded-lg px-4 py-2 text-base text-black focus:border-green-500 focus:ring-2 focus:ring-green-100 transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-green-700 mb-2 hover:text-green-600 transition-colors duration-200">Parking</label>
              <select className="w-full border rounded-lg px-4 py-2 text-base text-black focus:border-green-500 focus:ring-2 focus:ring-green-100 transition">
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-green-700 mb-2 hover:text-green-600 transition-colors duration-200">GST</label>
              <input className="w-full border rounded-lg px-4 py-2 text-base text-black focus:border-green-500 focus:ring-2 focus:ring-green-100 transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-green-700 mb-2 hover:text-green-600 transition-colors duration-200">Franchise Address <span className="text-red-500">*</span></label>
              <input className="w-full border rounded-lg px-4 py-2 text-base text-black focus:border-green-500 focus:ring-2 focus:ring-green-100 transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-green-700 mb-2 hover:text-green-600 transition-colors duration-200">Minimum Delivery Time</label>
              <input className="w-full border rounded-lg px-4 py-2 text-base text-black focus:border-green-500 focus:ring-2 focus:ring-green-100 transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-green-700 mb-2 hover:text-green-600 transition-colors duration-200">Maximum Delivery Time</label>
              <input className="w-full border rounded-lg px-4 py-2 text-base text-black focus:border-green-500 focus:ring-2 focus:ring-green-100 transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-green-700 mb-2 hover:text-green-600 transition-colors duration-200">Type</label>
              <select className="w-full border rounded-lg px-4 py-2 text-base text-black focus:border-green-500 focus:ring-2 focus:ring-green-100 transition">
                <option>Choose</option>
                <option>Express</option>
                <option>Standard</option>
              </select>
            </div>
          </div>
          {/* Description */}
          <div className="mt-6">
            <label className="block text-sm font-semibold text-green-700 mb-2 hover:text-green-600 transition-colors duration-200">Describe</label>
            <textarea className="w-full border rounded-lg px-4 py-2 text-base text-black focus:border-green-500 focus:ring-2 focus:ring-green-100 transition" rows={2} />
          </div>
          {/* Map */}
          <div className="mt-6">
            <iframe
              title="Google Map"
              width="100%"
              height="220"
              className="rounded-lg border"
              loading="lazy"
              allowFullScreen
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.324839325704!2d80.2092!3d13.0477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266e5f0e6e7b7%3A0x6e2b2b2b2b2b2b2b!2sChennai!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
            />
          </div>
          {/* Lat/Lng */}
          <div className="flex gap-4 mt-4">
            <input className="flex-1 border rounded-lg px-4 py-2 text-base text-black focus:border-green-500 focus:ring-2 focus:ring-green-100 transition" placeholder="Lat" />
            <input className="flex-1 border rounded-lg px-4 py-2 text-base text-black focus:border-green-500 focus:ring-2 focus:ring-green-100 transition" placeholder="Lng" />
          </div>
          {/* Zone, Pincode, State, District */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
            <div>
              <label className="block text-sm font-semibold text-green-700 mb-2 hover:text-green-600 transition-colors duration-200">Zone</label>
              <select className="w-full border rounded-lg px-4 py-2 text-base text-black focus:border-green-500 focus:ring-2 focus:ring-green-100 transition">
                <option>Choose</option>
                <option>North</option>
                <option>South</option>
                <option>East</option>
                <option>West</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-green-700 mb-2 hover:text-green-600 transition-colors duration-200">Pincode</label>
              <input className="w-full border rounded-lg px-4 py-2 text-base text-black focus:border-green-500 focus:ring-2 focus:ring-green-100 transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-green-700 mb-2 hover:text-green-600 transition-colors duration-200">State</label>
              <select className="w-full border rounded-lg px-4 py-2 text-base text-black focus:border-green-500 focus:ring-2 focus:ring-green-100 transition">
                <option>Tamil Nadu</option>
                <option>Kerala</option>
                <option>Karnataka</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-green-700 mb-2 hover:text-green-600 transition-colors duration-200">District</label>
              <select className="w-full border rounded-lg px-4 py-2 text-base text-black focus:border-green-500 focus:ring-2 focus:ring-green-100 transition">
                <option>Choose</option>
                <option>Chennai</option>
                <option>Coimbatore</option>
              </select>
            </div>
          </div>
          {/* Upload Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <button type="button" className="w-full py-3 rounded-lg bg-white border-2 border-dashed border-green-400 text-green-700 font-semibold flex flex-col items-center justify-center gap-1 hover:bg-green-50 hover:border-green-600 transition shadow-sm">
              <svg className="w-7 h-7 mb-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" /></svg>
              <span className="text-xs font-medium">Upload Aadhar Id</span>
            </button>
            <button type="button" className="w-full py-3 rounded-lg bg-white border-2 border-dashed border-green-400 text-green-700 font-semibold flex flex-col items-center justify-center gap-1 hover:bg-green-50 hover:border-green-600 transition shadow-sm">
              <svg className="w-7 h-7 mb-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" /></svg>
              <span className="text-xs font-medium">Upload Pan Id</span>
            </button>
            <button type="button" className="w-full py-3 rounded-lg bg-white border-2 border-dashed border-green-400 text-green-700 font-semibold flex flex-col items-center justify-center gap-1 hover:bg-green-50 hover:border-green-600 transition shadow-sm">
              <svg className="w-7 h-7 mb-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" /></svg>
              <span className="text-xs font-medium">Upload Digital Sign</span>
            </button>
            <button type="button" className="w-full py-3 rounded-lg bg-white border-2 border-dashed border-green-400 text-green-700 font-semibold flex flex-col items-center justify-center gap-1 hover:bg-green-50 hover:border-green-600 transition shadow-sm">
              <svg className="w-7 h-7 mb-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" /></svg>
              <span className="text-xs font-medium">Upload Address Documents</span>
            </button>
            <button type="button" className="w-full py-3 rounded-lg bg-white border-2 border-dashed border-green-400 text-green-700 font-semibold flex flex-col items-center justify-center gap-1 hover:bg-green-50 hover:border-green-600 transition shadow-sm col-span-2 md:col-span-2">
              <svg className="w-7 h-7 mb-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" /></svg>
              <span className="text-xs font-medium">Shop Photos</span>
            </button>
          </div>
          {/* Owner Information */}
          <div className="mt-10 mb-2 font-bold text-xl text-green-700">Owner Information</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input className="border rounded-lg px-4 py-2 text-base text-black focus:border-green-500 focus:ring-2 focus:ring-green-100 transition" placeholder="First Name" />
            <input className="border rounded-lg px-4 py-2 text-base text-black focus:border-green-500 focus:ring-2 focus:ring-green-100 transition" placeholder="Last Name" />
            <div className="flex items-center border rounded-lg px-4 py-2 text-base text-black focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition">
              <Image src="https://flagcdn.com/in.svg" alt="IN" width={20} height={20} className="w-5 h-5 mr-1 rounded" priority />
              <span className="text-gray-500 mr-1">+91</span>
              <input className="flex-1 outline-none bg-transparent text-black" placeholder="Phone" />
            </div>
          </div>
          {/* Bank Information */}
          <div className="mt-10 mb-2 font-bold text-xl text-green-700">Bank Information</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input className="border rounded-lg px-4 py-2 text-base text-black focus:border-green-500 focus:ring-2 focus:ring-green-100 transition" placeholder="Beneficiary name" />
            <select className="border rounded-lg px-4 py-2 text-base text-black focus:border-green-500 focus:ring-2 focus:ring-green-100 transition">
              <option>Account Type</option>
              <option>Savings</option>
              <option>Current</option>
            </select>
            <input className="border rounded-lg px-4 py-2 text-base text-black focus:border-green-500 focus:ring-2 focus:ring-green-100 transition" placeholder="Account Number" />
            <input className="border rounded-lg px-4 py-2 text-base text-black focus:border-green-500 focus:ring-2 focus:ring-green-100 transition" placeholder="Bank" />
            <input className="border rounded-lg px-4 py-2 text-base text-black focus:border-green-500 focus:ring-2 focus:ring-green-100 transition" placeholder="IFSC" />
          </div>
          {/* Login Information */}
          <div className="mt-10 mb-2 font-bold text-xl text-green-700">Login Information</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input className="border rounded-lg px-4 py-2 text-base text-black focus:border-green-500 focus:ring-2 focus:ring-green-100 transition" placeholder="Email" />
            <div className="relative">
              <input className="border rounded-lg px-4 py-2 text-base w-full pr-10 text-black focus:border-green-500 focus:ring-2 focus:ring-green-100 transition" placeholder="Password" type="password" />
              <button type="button" className="absolute right-2 top-2 text-gray-400 hover:text-green-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M4.93 4.93l14.14 14.14"/></svg>
              </button>
            </div>
            <div className="relative">
              <input className="border rounded-lg px-4 py-2 text-base w-full pr-10 text-black focus:border-green-500 focus:ring-2 focus:ring-green-100 transition" placeholder="Confirm Password" type="password" />
              <button type="button" className="absolute right-2 top-2 text-gray-400 hover:text-green-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M4.93 4.93l14.14 14.14"/></svg>
              </button>
            </div>
          </div>
          <div className="flex items-center mt-6">
            <input type="checkbox" id="accept" className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
            <label htmlFor="accept" className="ml-2 block text-sm text-green-700 hover:text-green-600 transition-colors duration-200">
              I accept all the <span className="text-red-500">*</span>{" "}
              <a href="#" className="text-blue-600 underline">Terms and conditions</a>
            </label>
          </div>
          <button type="submit" className="w-full mt-8 py-3 rounded-lg bg-green-500 text-white font-bold text-lg shadow hover:bg-green-600 transition">
            Submit
          </button>
        </form>
      </main>
    </div>
  );
};

export default OpenFranchise;
