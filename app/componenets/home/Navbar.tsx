import React from 'react';

// --- ICONS (Lucide SVGs for demo, replace with lucide-react if available) ---
const LocationIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M12 21c-4.418 0-8-5.373-8-10a8 8 0 1116 0c0 4.627-3.582 10-8 10z"/>
    <circle cx="12" cy="11" r="3"/>
  </svg>
);
const CartIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <circle cx="9" cy="21" r="1"/>
    <circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
  </svg>
);

const Navbar = ({
  address,
  onLocationClick,
  cartCount,
  onCartClick,
}: {
  address: string;
  onLocationClick: () => void;
  cartCount: number;
  onCartClick: () => void;
}) => (
  <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow transition-all">
    <div className="max-w-screen-2xl mx-auto flex items-center justify-between px-4 md:px-12 py-2">
      {/* Left: Logo + Brand + Location */}
      <div className="flex items-center gap-6 min-w-[260px]">
        <div className="flex flex-col items-center">
          <img src="/logo.png" alt="Healthy Foods Logo" className="h-10 w-10 md:h-12 md:w-12 rounded-full" />
          <span className="text-xs md:text-sm font-semibold text-green-700 mt-1">Healthy Foods</span>
        </div>
        <button
          className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-100 hover:bg-green-50 transition border border-gray-200"
          onClick={onLocationClick}
        >
          <LocationIcon className="w-5 h-5 text-green-600" />
          <span className="text-xs md:text-sm font-medium text-black truncate max-w-[120px] md:max-w-[180px]">{address}</span>
          <svg className="w-4 h-4 text-black ml-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 20 20">
            <path d="M6 8l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      {/* Center: Navigation Links */}
      <div className="flex-1 flex justify-center">
        <ul className="flex gap-8 items-center font-semibold text-base md:text-lg">
          <li><a href="#" className="hover:text-green-600 text-black transition">Home</a></li>
          <li><a href="#" className="hover:text-green-600 text-black transition">Healthy Eats</a></li>
          <li><a href="#" className="hover:text-green-600 text-black transition">Products</a></li>
          <li><a href="#" className="hover:text-green-600 text-black transition">About Us</a></li>
          <li>
            <a href="#" className="flex items-center gap-1 font-bold text-green-600 hover:underline transition">
              <span>
                <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="14" fill="#E0F2FE"/>
                  <path d="M7 18c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="#22C55E" strokeWidth="2"/>
                  <rect x="11" y="11" width="6" height="6" rx="3" fill="#FACC15"/>
                </svg>
              </span>
              <span className="text-green-700">BMI</span>
            </a>
          </li>
        </ul>
      </div>
      {/* Right: Auth and Cart */}
      <div className="flex items-center gap-6 min-w-[200px] justify-end">
        <a href="#" className="flex items-center gap-2 text-base font-semibold text-black hover:text-green-600 transition">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="12" cy="7" r="4"/>
            <path d="M5.5 21a7.5 7.5 0 0113 0"/>
          </svg>
          <span className="hidden md:inline">Sign in/Sign up</span>
        </a>
        <button
          className="relative flex items-center text-base font-semibold text-black hover:text-green-600 transition"
          onClick={onCartClick}
        >
          <CartIcon className="w-7 h-7" />
          <span className="absolute -top-2 -right-3 bg-green-500 text-white text-xs rounded-full px-2 py-0.5 font-bold">
            {cartCount}
          </span>
          <span className="ml-2 hidden md:inline">Cart</span>
        </button>
      </div>
    </div>
  </nav>
);

export default Navbar;
