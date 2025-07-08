"use client";
import React, { useState } from 'react';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import CategorySection from './CategorySection';
import TopRatedSection from './TopRatedSection';
import DeliverySection from './DeliverySection';
import TestimonialSection from './TestimonialSection';
import PartnersSection from './PartnersSection';
import NewsletterSection from './NewsletterSection';
import Navbar from './Navbar';
import Footer from '../footer/Footer'; 
// --- ICONS (Lucide SVGs for demo, replace with lucide-react if available) ---
const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const EditIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M12 20h9"/>
    <path d="M16.5 3.5a2.121 2.121 0 113 3L7 19.5 3 21l1.5-4L16.5 3.5z"/>
  </svg>
);

// --- MapSelector (placeholder) ---
const MapSelector = ({ onSelect }: { onSelect: (address: string) => void }) => (
  <div className="flex flex-col items-center justify-center h-64 bg-gray-100 rounded-lg">
    <div className="w-full h-40 bg-gray-300 flex items-center justify-center rounded mb-4">
      <span className="text-gray-500">[Map Placeholder]</span>
    </div>
    <button
      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      onClick={() => onSelect("123 Main St, City, Country")}
    >
      Select This Location
    </button>
  </div>
);

// --- CartItem ---
const CartItem = ({
  item,
  onEdit,
  onRemove,
}: {
  item: { id: number; name: string; image: string; price: number; quantity: number };
  onEdit: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}) => (
  <div className="flex items-center gap-4 py-3 border-b">
    <img src={item.image} alt={item.name} className="w-14 h-14 rounded object-cover" />
    <div className="flex-1">
      <div className="font-semibold">{item.name}</div>
      <div className="text-sm text-gray-500">₹{item.price} x {item.quantity}</div>
      <div className="flex items-center gap-2 mt-1">
        <button
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => onEdit(item.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
        >-</button>
        <span>{item.quantity}</span>
        <button
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => onEdit(item.id, item.quantity + 1)}
        >+</button>
        <button
          className="ml-2 text-red-500 hover:text-red-700"
          onClick={() => onRemove(item.id)}
        >
          <CloseIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
    <div className="font-bold">₹{item.price * item.quantity}</div>
  </div>
);

// --- LocationDrawer ---
const LocationDrawer = ({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (address: string) => void;
}) => (
  <div
    className={`fixed inset-0 z-40 transition-all duration-300 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
    aria-hidden={!open}
  >
    {/* Overlay */}
    <div
      className={`absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
      onClick={onClose}
    />
    {/* Drawer */}
    <aside
      className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <span className="font-bold text-lg">Select Location</span>
        <button onClick={onClose}><CloseIcon className="w-6 h-6" /></button>
      </div>
      <div className="p-4">
        <MapSelector onSelect={address => { onSelect(address); onClose(); }} />
      </div>
    </aside>
  </div>
);

// --- CartDrawer ---
const CartDrawer = ({
  open,
  onClose,
  cart,
  onEdit,
  onRemove,
}: {
  open: boolean;
  onClose: () => void;
  cart: { id: number; name: string; image: string; price: number; quantity: number }[];
  onEdit: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}) => (
  <div
    className={`fixed inset-0 z-40 transition-all duration-300 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
    aria-hidden={!open}
  >
    {/* Overlay */}
    <div
      className={`absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
      onClick={onClose}
    />
    {/* Drawer */}
    <aside
      className={`fixed top-0 right-0 h-full w-96 max-w-full bg-white shadow-lg z-50 transform transition-transform duration-300
        ${open ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <span className="font-bold text-lg">Your Cart</span>
        <button onClick={onClose}><CloseIcon className="w-6 h-6" /></button>
      </div>
      <div className="p-4 flex flex-col h-[calc(100%-56px)]">
        <div className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="text-center text-gray-400 mt-10">Your cart is empty.</div>
          ) : (
            cart.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onEdit={onEdit}
                onRemove={onRemove}
              />
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="pt-4 border-t mt-4">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>
                ₹{cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
              </span>
            </div>
            <button className="w-full mt-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
              Checkout
            </button>
          </div>
        )}
      </div>
    </aside>
  </div>
);

// --- Main Page ---
const initialCart = [
  // Example cart items
  // { id: 1, name: "Salad Bowl", image: "/salad.jpg", price: 120, quantity: 2 },
  // { id: 2, name: "Fruit Juice", image: "/juice.jpg", price: 80, quantity: 1 },
];

const Index = () => {
  const [locationDrawerOpen, setLocationDrawerOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [address, setAddress] = useState("149-B, Chokkalinga Nagar, Rai...");
  const [cart, setCart] = useState(initialCart);

  const handleEditCart = (id: number, quantity: number) => {
    setCart(cart =>
      cart.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };
  const handleRemoveCart = (id: number) => {
    setCart(cart => cart.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        address={address}
        onLocationClick={() => setLocationDrawerOpen(true)}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setCartDrawerOpen(true)}
      />
      <LocationDrawer
        open={locationDrawerOpen}
        onClose={() => setLocationDrawerOpen(false)}
        onSelect={setAddress}
      />
      <CartDrawer
        open={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cart={cart}
        onEdit={handleEditCart}
        onRemove={handleRemoveCart}
      />
      <main className="pt-20 md:pt-24 px-2 md:px-6">
        <HeroSection />
        <AboutSection />
        <CategorySection />
        <TopRatedSection />
        <DeliverySection />
        <TestimonialSection />
        <PartnersSection />
        <NewsletterSection />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
