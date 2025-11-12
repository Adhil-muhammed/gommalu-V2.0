

import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Product } from '../types';
import ImageWithFallback from './ImageWithFallback';
import { useCurrency } from '../CurrencyContext';

interface ProductDetailProps {
  isOpen: boolean;
  product: Product;
  quantity: number;
  onClose: () => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ isOpen, product, quantity, onClose, onUpdateQuantity }) => {
  const { formatPrice } = useCurrency();
  const handleIncrement = () => onUpdateQuantity(product.id, quantity + 1);
  const handleDecrement = () => onUpdateQuantity(product.id, quantity - 1);

  return (
    <div 
      className={`fixed inset-0 bg-black/50 z-30 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
      aria-modal="true" 
      role="dialog"
      onClick={onClose}
    >
      <div 
        className={`fixed inset-x-0 bottom-0 bg-slate-50 dark:bg-slate-800 w-full max-w-lg mx-auto max-h-[90vh] rounded-t-2xl shadow-xl flex flex-col transition-transform duration-300 ease-out ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
        onClick={e => e.stopPropagation()}
      >
        <header className="absolute top-0 left-0 p-4 z-10">
          <button onClick={onClose} className="p-2 text-white bg-black/40 hover:bg-black/60 rounded-full shadow-md transition-all duration-200">
            <ChevronLeft className="w-7 h-7" strokeWidth={2.5} />
            <span className="sr-only">Back to products</span>
          </button>
        </header>

        <div className="flex-grow overflow-y-auto">
            <div className="h-64 md:h-80 bg-slate-200 dark:bg-slate-700">
                <ImageWithFallback src={product.imageUrl} alt={product.name} className="w-full h-full object-cover"/>
            </div>

            <div className="p-4 md:p-6">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">{product.name}</h2>
                <p className="text-3xl font-bold text-green-600 my-3">{formatPrice(product.price)}</p>
                
                {product.description && (
                    <p className="text-slate-600 dark:text-slate-300 mt-4">{product.description}</p>
                )}

                {product.details && product.details.length > 0 && (
                     <div className="mt-6 border-t border-slate-200 dark:border-slate-700 pt-4">
                        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Product Details</h3>
                        <div className="mt-2 space-y-2 text-slate-600 dark:text-slate-400">
                            {product.details.map((detail, index) => (
                                <div key={index} className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700/50 last:border-b-0">
                                    <span className="font-medium text-slate-700 dark:text-slate-300">{detail.title}</span>
                                    <span>{detail.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
        
        <footer className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 sticky bottom-0">
          {quantity === 0 ? (
              <button 
                onClick={handleIncrement}
                className="w-full bg-green-500 text-white font-bold py-3 rounded-xl hover:bg-green-600 transition-colors shadow-lg shadow-green-500/30"
              >
                Add to Cart
              </button>
            ) : (
              <div className="flex items-center justify-between bg-green-500 text-white rounded-xl h-12 shadow-lg shadow-green-500/30">
                <button onClick={handleDecrement} className="px-5 py-2 font-bold text-2xl rounded-l-xl hover:bg-green-600 transition-colors">-</button>
                <span className="font-bold text-lg">{quantity} in cart</span>
                <button onClick={handleIncrement} className="px-5 py-2 font-bold text-2xl rounded-r-xl hover:bg-green-600 transition-colors">+</button>
              </div>
            )}
        </footer>
      </div>
    </div>
  );
};

export default ProductDetail;