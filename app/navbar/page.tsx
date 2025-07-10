"use client";
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import LocationDrawer from "../../components/LocationDrawer";
import CartDrawer, { CartItem } from "../../components/CartDrawer";
import BMIPopup from "../bmi-popup";

const LOCATIONS = [
  "Bangalore Central", "Koramangala", "Indiranagar", "HSR Layout", "Jayanagar", "Whitefield"
];

export default function Page() {
  const [address, setAddress] = useState("Select Location");
  const [locationOpen, setLocationOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [bmiOpen, setBmiOpen] = useState(false);

  // Add to cart event handler (simulate product add)
  React.useEffect(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent;
      setCartOpen(true);
      if (customEvent.detail) {
        setCart((prev) => {
          const idx = prev.findIndex((item) => item.id === customEvent.detail.id);
          if (idx > -1) {
            const updated = [...prev];
            updated[idx].qty += customEvent.detail.qty;
            return updated;
          }
          return [...prev, customEvent.detail];
        });
      }
    };
    window.addEventListener("add-to-cart", handler);
    return () => window.removeEventListener("add-to-cart", handler);
  }, []);

  const handleUpdateQty = (id: number, qty: number) => {
    setCart((prev) => prev.map((item) => item.id === id ? { ...item, qty } : item));
  };
  const handleRemove = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      <Navbar
        address={address}
        onLocationClick={() => setLocationOpen(true)}
        cartCount={cart.reduce((sum, item) => sum + item.qty, 0)}
        onCartClick={() => setCartOpen(true)}
        onBmiClick={() => setBmiOpen(true)}
      />
      <LocationDrawer
        open={locationOpen}
        onClose={() => setLocationOpen(false)}
        onSelect={setAddress}
        locations={LOCATIONS}
      />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemove}
      />
      <BMIPopup open={bmiOpen} onClose={() => setBmiOpen(false)} />
      <div className="h-[60px] md:h-[68px]" />
    </>
  );
}