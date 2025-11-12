


import React from 'react';
import { X, Trash2, ShoppingCart } from 'lucide-react';
import { CartDetailItem } from '../types';
import ImageWithFallback from './ImageWithFallback';
import { useCurrency } from '../CurrencyContext';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartDetails: CartDetailItem[];
  totalPrice: number;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onStartShopping: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, cartDetails, totalPrice, onUpdateQuantity, onStartShopping }) => {
  const { formatPrice } = useCurrency();
  
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-40 flex items-end md:items-center justify-center" 
      aria-modal="true" 
      role="dialog"
    >
      <div 
        className="bg-card w-full max-w-lg max-h-[80vh] rounded-t-2xl md:rounded-2xl shadow-xl flex flex-col transition-transform transform duration-300 ease-out"
        style={{ transform: isOpen ? 'translateY(0)' : 'translateY(100%)' }}
      >
        <header className="flex items-center justify-between p-4 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800">My Cart</h2>
          <button onClick={onClose} className="p-1 text-slate-500 hover:text-slate-800 rounded-full hover:bg-slate-200">
            <X className="w-6 h-6" />
            <span className="sr-only">Close cart</span>
          </button>
        </header>
        
        <div className="flex-grow overflow-y-auto p-4">
          {cartDetails.length === 0 ? (
            <div className="text-center py-12 flex flex-col items-center">
              <ShoppingCart className="w-16 h-16 text-slate-300 mb-4" />
              <p className="text-slate-600 font-semibold text-lg">Your cart is empty.</p>
              <p className="text-sm text-slate-400 mt-2">Looks like you haven't added anything yet.</p>
              <button 
                onClick={onStartShopping}
                className="mt-8 bg-green-500 text-white font-bold py-3 px-8 rounded-xl hover:bg-green-600 transition-colors shadow-lg shadow-green-500/30"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {cartDetails.map(item => (
                <li key={item.id} className="flex items-center space-x-4">
                  <ImageWithFallback src={item.imageUrl} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
                  <div className="flex-grow">
                    <p className="font-bold text-slate-800">{item.name}</p>
                    <p className="text-sm text-slate-500">{formatPrice(item.price)}</p>
                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center justify-between bg-background text-green-700 rounded-lg border border-border">
                          <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 font-bold text-lg rounded-l-lg hover:bg-accent transition-colors">-</button>
                          <span className="font-bold text-sm px-2 text-slate-800">{item.quantity}</span>
                          <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 font-bold text-lg rounded-r-lg hover:bg-accent transition-colors">+</button>
                        </div>
                        <p className="font-bold text-slate-800">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                  <button onClick={() => onUpdateQuantity(item.id, 0)} className="p-2 text-slate-400 hover:text-red-500">
                      <Trash2 className="w-5 h-5"/>
                      <span className="sr-only">Remove item</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {cartDetails.length > 0 && (
          <footer className="p-4 border-t border-slate-200 bg-card md:rounded-b-2xl">
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-600 font-semibold">Total</span>
              <span className="text-2xl font-bold text-slate-900">{formatPrice(totalPrice)}</span>
            </div>
            <button className="w-full bg-green-500 text-white font-bold py-3 rounded-xl hover:bg-green-600 transition-colors shadow-lg shadow-green-500/30">
              Proceed to Checkout
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};

export default CartModal;