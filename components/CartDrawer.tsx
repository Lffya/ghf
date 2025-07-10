"use client";
import React from "react";
import Image from "next/image";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  image?: string;
}

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (id: number, qty: number) => void;
  onRemove: (id: number) => void;
}

const sampleImages = [
  "/logo.png",
  "/vercel.svg",
  "/next.svg",
  "/window.svg",
  "/globe.svg",
  "/file.svg"
];

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose, cart, onUpdateQty, onRemove }) => {
  if (!open) return null;
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      {/* Drawer */}
      <div className="relative bg-white w-96 max-w-full h-full shadow-xl p-6 z-50 animate-slideInRight flex flex-col">
        <button className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500" onClick={onClose}>&times;</button>
        <h2 className="text-xl font-bold mb-4 text-green-700">Your Cart</h2>
        <div className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="text-gray-500 text-center mt-16">Your cart is empty.</div>
          ) : (
            <ul className="space-y-4">
              {cart.map((item, idx) => (
                <li key={item.id} className="flex items-center gap-4 border-b pb-4">
                  <div className="w-16 h-16 relative rounded-lg bg-gray-100 overflow-hidden">
                    <Image
                      src={item.image || sampleImages[idx % sampleImages.length]}
                      alt={item.name}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-black">{item.name}</div>
                    <div className="text-green-700 font-bold">₹{item.price}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => onUpdateQty(item.id, Math.max(1, item.qty - 1))} className="px-2 py-1 bg-gray-200 rounded">-</button>
                      <span className="px-2">{item.qty}</span>
                      <button onClick={() => onUpdateQty(item.id, item.qty + 1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                    </div>
                  </div>
                  <button onClick={() => onRemove(item.id)} className="text-red-500 hover:underline ml-2">Remove</button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mt-6 border-t pt-4 flex justify-between items-center">
          <span className="font-bold text-lg">Total:</span>
          <span className="text-green-700 font-bold text-xl">₹{total}</span>
        </div>
        <button className="w-full mt-4 py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition">Checkout</button>
      </div>
    </div>
  );
};

export default CartDrawer;
