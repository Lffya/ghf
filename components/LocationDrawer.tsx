"use client";
import React from "react";

interface LocationDrawerProps {
  open: boolean;
  onClose: () => void;
  onSelect: (location: string) => void;
  locations: string[];
}

const MapSelector = () => (
  <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
    <span className="text-gray-500">[Map Placeholder]</span>
  </div>
);

const LocationDrawer: React.FC<LocationDrawerProps> = ({ open, onClose, onSelect, locations }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      {/* Drawer */}
      <div className="relative bg-white w-80 max-w-full h-full shadow-xl p-6 z-50 animate-slideInLeft">
        <button className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500" onClick={onClose}>&times;</button>
        <h2 className="text-xl font-bold mb-4 text-green-700">Select Location</h2>
        <MapSelector />
        <ul className="space-y-2">
          {locations.map((loc) => (
            <li key={loc}>
              <button
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-green-50 text-black font-medium"
                onClick={() => { onSelect(loc); onClose(); }}
              >
                {loc}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LocationDrawer;
