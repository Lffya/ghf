import React, { useState, useRef, useEffect } from 'react';

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

// --- Multi-step Signup Modal ---
const SignupModal = ({ open, onClose, onLogin }: { open: boolean; onClose: () => void; onLogin: () => void }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', refer: '', accept: false, password: '', confirm: '' });
  const [errors, setErrors] = useState<any>({});
  const [showToast, setShowToast] = useState(false);

  // Scroll lock
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Reset on close
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setStep(1);
        setPhone('');
        setOtp('');
        setForm({ firstName: '', lastName: '', email: '', phone: '', refer: '', accept: false, password: '', confirm: '' });
        setErrors({});
        setShowToast(false);
      }, 300);
    }
  }, [open]);

  // Step 1: Phone
  const handlePhone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setErrors({ phone: "Enter valid 10-digit phone" });
      return;
    }
    setErrors({});
    setForm(f => ({ ...f, phone: '+91' + phone }));
    setStep(2);
  };

  // Step 2: OTP
  const handleOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(otp)) {
      setErrors({ otp: "Enter 6 digit OTP" });
      return;
    }
    setErrors({});
    setStep(3);
  };

  // Step 3: Signup Form (styled like image)
  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: any = {};
    if (!form.firstName.trim()) errs.firstName = "Required";
    if (!form.lastName.trim()) errs.lastName = "Required";
    if (!form.email.trim()) errs.email = "Required";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) errs.email = "Invalid email";
    if (!form.phone.trim()) errs.phone = "Required";
    if (!form.password) errs.password = "Required";
    else if (form.password.length < 6) errs.password = "Min 6 chars";
    if (!form.confirm) errs.confirm = "Required";
    else if (form.password !== form.confirm) errs.confirm = "Passwords do not match";
    if (!form.accept) errs.accept = "Accept terms";
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setStep(4);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        onClose();
        onLogin();
      }, 1500);
    }
  };

  // OTP input focus logic
  const otpRefs = Array.from({ length: 6 }, () => useRef<HTMLInputElement>(null));
  const handleOtpChange = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const arr = otp.split('');
    arr[i] = val;
    setOtp(arr.join('').padEnd(6, ''));
    if (val && i < 5) otpRefs[i + 1].current?.focus();
  };
  const handleOtpKey = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) otpRefs[i - 1].current?.focus();
  };

  if (!open) return null;
  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-2">
        <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-4 md:p-8 mx-auto">
          <button
            className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
          {/* Step 1: Phone */}
          {step === 1 && (
            <form className="w-full max-w-xs mx-auto" onSubmit={handlePhone}>
              <div className="flex flex-col items-center mb-6">
                <img src="/logo.png" alt="Healthy Foods" className="h-14 mb-2" />
                <span className="text-green-700 font-semibold text-base">Healthy Foods</span>
              </div>
              <label className="block text-xs font-medium text-black mb-1">Phone Number</label>
              <input
                type="tel"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-200 text-sm mb-2 text-black"
                placeholder="Enter phone number"
                value={phone}
                onChange={e => setPhone(e.target.value.replace(/\D/g, ""))}
                maxLength={10}
              />
              {errors.phone && <div className="text-xs text-red-500 mb-2">{errors.phone}</div>}
              <button type="submit" className="w-full py-2 rounded-lg bg-[#b4e549] text-[#111] font-semibold hover:bg-[#8dc63f] transition">Send OTP</button>
            </form>
          )}
          {/* Step 2: OTP */}
          {step === 2 && (
            <form className="w-full max-w-xs mx-auto" onSubmit={handleOtp}>
              <div className="flex flex-col items-center mb-6">
                <img src="/logo.png" alt="Healthy Foods" className="h-14 mb-2" />
                <span className="text-green-700 font-semibold text-base">Healthy Foods</span>
              </div>
              <div className="mb-2 text-xs text-black text-center">Enter OTP sent to <span className="font-semibold">{phone}</span></div>
              <div className="flex gap-2 justify-center mb-2">
                {[...Array(6)].map((_, i) => (
                  <input
                    key={i}
                    ref={otpRefs[i]}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    className="w-10 h-10 text-center border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-green-200 text-black"
                    value={otp[i] || ""}
                    onChange={e => handleOtpChange(i, e.target.value)}
                    onKeyDown={e => handleOtpKey(i, e)}
                  />
                ))}
              </div>
              {errors.otp && <div className="text-xs text-red-500 mb-2">{errors.otp}</div>}
              <button type="submit" className="w-full py-2 rounded-lg bg-[#b4e549] text-[#111] font-semibold hover:bg-[#8dc63f] transition">Verify OTP</button>
            </form>
          )}
          {/* Step 3: Signup Form (like image) */}
          {step === 3 && (
            <form className="w-full max-w-2xl mx-auto" onSubmit={handleForm}>
              <div className="flex flex-col items-center mb-2">
                <img src="/logo.png" alt="Healthy Foods" className="h-14 mb-2" />
                <span className="text-green-700 font-semibold text-base">Healthy Foods</span>
                <h2 className="text-2xl font-bold mt-2 mb-1 text-black">Sign Up</h2>
              </div>
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-black mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a7.5 7.5 0 0113 0"/></svg>
                    </span>
                    <input
                      type="text"
                      className={`pl-9 pr-3 py-2 w-full rounded-lg border ${errors.firstName ? "border-red-400" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-green-200 text-sm text-black`}
                      placeholder="First Name"
                      value={form.firstName}
                      onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                    />
                  </div>
                  {errors.firstName && <div className="text-xs text-red-500 mt-1">{errors.firstName}</div>}
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-black mb-1">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a7.5 7.5 0 0113 0"/></svg>
                    </span>
                    <input
                      type="text"
                      className={`pl-9 pr-3 py-2 w-full rounded-lg border ${errors.lastName ? "border-red-400" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-green-200 text-sm text-black`}
                      placeholder="Last Name"
                      value={form.lastName}
                      onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                    />
                  </div>
                  {errors.lastName && <div className="text-xs text-red-500 mt-1">{errors.lastName}</div>}
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-black mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M22 7L12 13 2 7"/></svg>
                    </span>
                    <input
                      type="email"
                      className={`pl-9 pr-3 py-2 w-full rounded-lg border ${errors.email ? "border-red-400" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-green-200 text-sm text-black`}
                      placeholder="Email"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    />
                  </div>
                  {errors.email && <div className="text-xs text-red-500 mt-1">{errors.email}</div>}
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-black mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex">
                    <span className="flex items-center px-2 border-r border-gray-300 bg-gray-50 rounded-l-lg text-sm">
                      <img src="https://flagcdn.com/in.svg" alt="IN" className="w-5 h-5 mr-1 rounded" />
                      +91
                    </span>
                    <input
                      type="tel"
                      className={`pl-2 pr-3 py-2 w-full rounded-r-lg border-t border-b border-r ${errors.phone ? "border-red-400" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-green-200 text-sm text-black`}
                      placeholder="Phone"
                      value={form.phone.replace(/^\+91/, '')}
                      onChange={e => setForm(f => ({ ...f, phone: '+91' + e.target.value.replace(/\D/g, "") }))}
                      maxLength={10}
                    />
                  </div>
                  {errors.phone && <div className="text-xs text-red-500 mt-1">{errors.phone}</div>}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-xs font-medium text-black mb-1">
                  Refer Code (Optional)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><circle cx="16" cy="3" r="4"/></svg>
                  </span>
                  <input
                    type="text"
                    className="pl-9 pr-3 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-200 text-sm text-black"
                    placeholder="Refer Code (Optional)"
                    value={form.refer}
                    onChange={e => setForm(f => ({ ...f, refer: e.target.value }))}
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-black mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    className={`pl-3 pr-3 py-2 w-full rounded-lg border ${errors.password ? "border-red-400" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-green-200 text-sm text-black`}
                    placeholder="Password"
                    value={form.password}
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  />
                  {errors.password && <div className="text-xs text-red-500 mt-1">{errors.password}</div>}
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-black mb-1">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    className={`pl-3 pr-3 py-2 w-full rounded-lg border ${errors.confirm ? "border-red-400" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-green-200 text-sm text-black`}
                    placeholder="Confirm Password"
                    value={form.confirm}
                    onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))}
                  />
                  {errors.confirm && <div className="text-xs text-red-500 mt-1">{errors.confirm}</div>}
                </div>
              </div>
              <div className="flex items-center mb-4">
                <input
                  id="accept"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  checked={form.accept}
                  onChange={e => setForm(f => ({ ...f, accept: e.target.checked }))}
                />
                <label htmlFor="accept" className="ml-2 block text-xs text-black">
                  I accept all the <span className="text-red-500">*</span>{" "}
                  <a href="#" className="text-blue-600 underline">Terms and conditions</a>
                </label>
                {errors.accept && <div className="text-xs text-red-500 ml-2">{errors.accept}</div>}
              </div>
              <button
                type="submit"
                className={`w-full py-2 rounded-lg font-semibold text-base transition ${
                  false
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-200 text-green-700 hover:bg-[#b4e549] hover:text-[#111]"
                }`}
              >
                Sign Up
              </button>
            </form>
          )}
          {/* Step 4: Success Toast */}
          {step === 4 && (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="bg-green-500 text-white px-6 py-3 rounded-xl shadow-xl flex items-center gap-2 font-semibold text-base">
                <span>✅</span> Login Successful!
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Toast notification (centered at top) */}
      {showToast && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 transition-all">
          <div className="bg-green-500 text-white px-6 py-3 rounded-xl shadow-xl flex items-center gap-2 font-semibold text-base">
            <span>✅</span> Login Successful!
          </div>
        </div>
      )}
    </>
  );
};

// --- Profile Dropdown ---
const ProfileDropdown = ({ onLogout }: { onLogout: () => void }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-green-100 transition"
        onClick={() => setOpen(o => !o)}
        aria-label="User menu"
      >
        <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <circle cx="12" cy="7" r="4"/>
          <path d="M5.5 21a7.5 7.5 0 0113 0"/>
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2 z-50 border">
          <a href="#" className="block px-4 py-2 text-sm text-black hover:bg-green-50">My Profile</a>
          <a href="#" className="block px-4 py-2 text-sm text-black hover:bg-green-50">Settings</a>
          <button
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            onClick={onLogout}
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

// --- Navbar ---
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
}) => {
  const [signupOpen, setSignupOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  return (
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
          {!loggedIn ? (
            <>
              <button
                className="flex items-center gap-2 text-base font-semibold text-black hover:text-green-600 transition"
                onClick={() => setSignupOpen(true)}
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <circle cx="12" cy="7" r="4"/>
                  <path d="M5.5 21a7.5 7.5 0 0113 0"/>
                </svg>
                <span className="hidden md:inline">Sign In</span>
              </button>
              <button
                className="flex items-center gap-2 text-base font-semibold text-black hover:text-green-600 transition border border-green-600 px-3 py-1 rounded"
                onClick={() => setSignupOpen(true)}
              >
                <span className="hidden md:inline">Sign Up</span>
              </button>
            </>
          ) : (
            <>
              <button className="hover:text-green-700 transition" aria-label="Notifications">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6.002 6.002 0 0 0-4-5.659V5a2 2 0 1 0-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9"/>
                </svg>
              </button>
              <button className="hover:text-green-700 transition" aria-label="Wishlist">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M12 21C12 21 4 13.5 4 8.5C4 5.5 6.5 3 9.5 3C11.24 3 12.91 4.06 13.44 5.68C13.97 4.06 15.64 3 17.38 3C20.38 3 22.88 5.5 22.88 8.5C22.88 13.5 15 21 15 21H12Z"/>
                </svg>
              </button>
              <ProfileDropdown onLogout={() => setLoggedIn(false)} />
            </>
          )}
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
      <SignupModal open={signupOpen} onClose={() => setSignupOpen(false)} onLogin={() => setLoggedIn(true)} />
    </nav>
  );
};

export default Navbar;
