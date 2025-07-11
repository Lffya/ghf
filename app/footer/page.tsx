"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();

  return (
    <footer className="relative bg-[#111] text-white pt-10 pb-4 px-2 md:px-10">
      {/* Centered Top Links */}
      <div className="max-w-screen-2xl mx-auto flex flex-col items-center mb-8">
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          <button
            className="px-4 py-2 rounded-full bg-[#b4e549] text-[#111] font-semibold shadow hover:bg-[#8dc63f] transition text-sm"
            onClick={() => router.push("/franchise")}
            type="button"
          >
            Open Franchise
          </button>
          <a href="#" className="px-4 py-2 rounded-full bg-[#b4e549] text-[#111] font-semibold shadow hover:bg-[#8dc63f] transition text-sm">Profile</a>
          <a href="#" className="px-4 py-2 rounded-full bg-[#b4e549] text-[#111] font-semibold shadow hover:bg-[#8dc63f] transition text-sm">Help & Support</a>
        </div>
      </div>
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row md:justify-between gap-10">
        {/* Left: Logo & App Links */}
        <div className="flex-1 min-w-[220px] flex flex-col gap-4">
          <div className="flex flex-col items-start gap-2">
            <Image src="/logo.png" alt="Healthy Foods Logo" width={56} height={56} className="h-14 w-14" priority />
            <span className="text-[#b4e549] font-semibold text-lg">Healthy Foods</span>
          </div>
          <div className="text-gray-200 text-base mt-2 mb-2">is Best Delivery Service Near You</div>
          <div className="flex gap-3 mb-2">
            <a href="#" className="block">
              <Image src="/google-play-badge.png" alt="Google Play" width={96} height={48} className="h-12 rounded" priority />
            </a>
            <a href="#" className="block">
              <Image src="/app-store-badge.png" alt="App Store" width={96} height={48} className="h-12 rounded" priority />
            </a>
          </div>
          <div className="flex gap-3 mt-2">
            <a href="#" aria-label="Instagram" className="hover:text-[#b4e549]">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5a5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1-2 0a1 1 0 0 1 2 0z"/></svg>
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-[#b4e549]">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17 2.1A2.1 2.1 0 0 1 19.1 4.2v15.6A2.1 2.1 0 0 1 17 21.9H7A2.1 2.1 0 0 1 4.9 19.8V4.2A2.1 2.1 0 0 1 7 2.1h10zm-2.5 3.4h-1.5c-.8 0-1.5.7-1.5 1.5v1.5h3l-.5 2h-2.5v6h2.5v2h-2.5a2 2 0 0 1-2-2v-6h-1.5v-2h1.5v-1.5A3.5 3.5 0 0 1 13 5.5z"/></svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-[#b4e549]">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75s1.75.79 1.75 1.75s-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47c-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.88v1.23h.04c.4-.76 1.36-1.56 2.8-1.56c3 0 3.56 1.97 3.56 4.53v4.8z"/></svg>
            </a>
            <a href="#" aria-label="X" className="hover:text-[#b4e549]">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.53 6.47a.75.75 0 0 0-1.06 0L12 10.94L7.53 6.47a.75.75 0 0 0-1.06 1.06L10.94 12l-4.47 4.47a.75.75 0 1 0 1.06 1.06L12 13.06l4.47 4.47a.75.75 0 0 0 1.06-1.06L13.06 12l4.47-4.47a.75.75 0 0 0 0-1.06z"/></svg>
            </a>
            <a href="#" aria-label="YouTube" className="hover:text-[#b4e549]">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M21.8 8.001a2.75 2.75 0 0 0-1.94-1.94C18.13 5.5 12 5.5 12 5.5s-6.13 0-7.86.56a2.75 2.75 0 0 0-1.94 1.94C2.5 9.73 2.5 12 2.5 12s0 2.27.56 3.999a2.75 2.75 0 0 0 1.94 1.94C5.87 18.5 12 18.5 12 18.5s6.13 0 7.86-.56a2.75 2.75 0 0 0 1.94-1.94C21.5 14.27 21.5 12 21.5 12s0-2.27-.56-3.999zM10 15.5v-7l6 3.5l-6 3.5z"/></svg>
            </a>
          </div>
        </div>
        {/* Quick Links */}
        <div className="flex-1 min-w-[180px]">
          <div className="font-bold text-lg mb-2 border-b-2 border-lime-500 w-fit pb-1">Quick Links</div>
          <ul className="space-y-2 text-gray-200">
            <li><a href="#" className="hover:text-[#b4e549]">About Us</a></li>
            <li><a href="#" className="hover:text-[#b4e549]">My Wallet</a></li>
            <li><a href="#" className="hover:text-[#b4e549]">Loyalty Points</a></li>
          </ul>
          <a href="#" className="inline-block mt-4 px-4 py-2 bg-[#8dc63f] text-white font-semibold rounded hover:bg-[#7ab82e] transition text-sm">
            <svg className="inline-block w-4 h-4 mr-1 -mt-1" fill="currentColor" viewBox="0 0 24 24"><path d="M21 7.5V6a2.5 2.5 0 0 0-2.5-2.5h-13A2.5 2.5 0 0 0 3 6v1.5"/></svg>
            Speak With Specialist
          </a>
        </div>
        {/* Other */}
        <div className="flex-1 min-w-[180px]">
          <div className="font-bold text-lg mb-2 border-b-2 border-lime-500 w-fit pb-1">Other</div>
          <ul className="space-y-2 text-gray-200">
            <li><a href="/privacy-policy" className="hover:text-[#b4e549]">Privacy Policy</a></li>
            <li><a href="/terms-conditions" className="hover:text-[#b4e549]">Term & Conditions</a></li>
            <li><a href="/join-our-team" className="hover:text-[#b4e549]" target="_blank" rel="noopener noreferrer">Join Our Team</a></li>
          </ul>
        </div>
        {/* Contact */}
        <div className="flex-1 min-w-[220px]">
          <div className="font-bold text-lg mb-2 border-b-2 border-lime-500 w-fit pb-1">Contact</div>
          <div className="flex items-start gap-2 text-gray-200 mb-2">
            <svg className="w-5 h-5 mt-1 text-[#b4e549]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>
            <span>
              GREENHEAP AGRO FOODS PVT LTD,<br />
              NO.1/PL922, 66th Street, 11th Sector,<br />
              K.K Nagar, Chennai, Tamil Nadu-600078
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-200 mb-2">
            <svg className="w-5 h-5 text-[#b4e549]" fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h16v16H4z" fill="none"/><path d="M22 6.92v10.16c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6.92l10 6.25 10-6.25zM20 4H4c-1.1 0-2 .9-2 2v.01l10 6.24 10-6.24V6c0-1.1-.9-2-2-2z"/></svg>
            <span>contact@greenheapfoods.in</span>
          </div>
          <div className="flex items-center gap-2 text-gray-200 mb-2">
            <svg className="w-5 h-5 text-[#b4e549]" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.11-.21c1.21.49 2.53.76 3.88.76a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.07 21 3 13.93 3 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.35.27 2.67.76 3.88a1 1 0 0 1-.21 1.11l-2.2 2.2z"/></svg>
            <span>+918190049994</span>
          </div>
        </div>
      </div>
      {/* Centered Bottom Copyright */}
      <div className="max-w-screen-2xl mx-auto mt-8 border-t border-gray-800 pt-4 flex flex-col items-center text-gray-300 text-sm">
        <span className="text-center">Copyright &copy; GREENHEAP AGRO FOODS PVT LTD</span>
      </div>
      {/* Floating WhatsApp Icon */}
      <a
        href="https://wa.me/918190049994"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed z-50 bottom-6 right-6 bg-[#25D366] hover:bg-[#1ebe57] shadow-lg rounded-full p-3 transition flex items-center justify-center"
        aria-label="WhatsApp"
        style={{ boxShadow: "0 4px 24px 0 rgba(37,211,102,0.3)" }}
      >
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.52 17.34l-4.27-1.23a1 1 0 0 0-1 .26l-1.87 1.91a15.05 15.05 0 0 1-6.59-6.59l1.91-1.87a1 1 0 0 0 .26-1l-1.23-4.27A1 1 0 0 0 5.21 3H4.03A2.01 2.01 0 0 0 2 5.03C2 16.39 7.61 22 18.97 22A2.01 2.01 0 0 0 21 19.97v-1.18a1 1 0 0 0-.48-.85z"/>
        </svg>
      </a>
    </footer>
  );
};

export default Footer;