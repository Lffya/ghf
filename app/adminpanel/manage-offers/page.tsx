import { useState } from 'react';
import { PRODUCT_MOCK_DATA as CONST_PRODUCT_MOCK_DATA } from '../../../constants';

// Deep copy to allow local price updates
const initialProducts = CONST_PRODUCT_MOCK_DATA.map(p => ({ ...p }));


export default function ManageOffers() {
  const [products, setProducts] = useState(initialProducts);
  const [offerInputs, setOfferInputs] = useState<{ [id: number]: string }>({});

  const handleInputChange = (id: number, value: string) => {
    setOfferInputs(prev => ({ ...prev, [id]: value }));
  };

  const handleApplyOffer = (id: number) => {
    const percent = Number(offerInputs[id]);
    if (isNaN(percent) || percent <= 0 || percent > 100) return;
    setProducts(prev => prev.map(product => {
      if (product.id === id) {
        const originalPrice = CONST_PRODUCT_MOCK_DATA.find(p => p.id === id)?.price || 0;
        const discount = (originalPrice * percent) / 100;
        return { ...product, price: +(originalPrice - discount).toFixed(2) };
      }
      return product;
    }));
    setOfferInputs(prev => ({ ...prev, [id]: '' }));
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-8 text-emerald-600">Manage Product Offers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(product => {
          const original = CONST_PRODUCT_MOCK_DATA.find(p => p.id === product.id)?.price;
          return (
            <div key={product.id} className="bg-white rounded-xl shadow p-6 flex flex-col items-start border border-gray-100">
              <div className="mb-2">
                <span className="inline-block px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700 mb-2">{product.category}</span>
                <h2 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h2>
                <p className="text-sm text-gray-500 mb-2">{product.description}</p>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-emerald-700 font-bold text-xl">₹{product.price.toFixed(2)}</span>
                {original !== undefined && product.price !== original && (
                  <span className="text-gray-400 line-through text-sm">₹{original.toFixed(2)}</span>
                )}
              </div>
              <div className="flex items-center gap-2 w-full mt-2">
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={offerInputs[product.id] ?? ''}
                  onChange={e => handleInputChange(product.id, e.target.value)}
                  placeholder="Offer %"
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 w-24"
                />
                <button
                  onClick={() => handleApplyOffer(product.id)}
                  className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 font-medium"
                  disabled={!offerInputs[product.id] || Number(offerInputs[product.id]) <= 0 || Number(offerInputs[product.id]) > 100}
                >
                  Apply Coupon
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
