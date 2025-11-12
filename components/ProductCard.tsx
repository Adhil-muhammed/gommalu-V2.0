

import type React from 'react';
import type { Product } from '../types';
import { Heart } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';
import { useCurrency } from '../CurrencyContext';

interface ProductCardProps {
  product: Product;
  quantity: number;
  isFavorited: boolean;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onSelectProduct: (productId: number) => void;
  onToggleFavorite: (productId: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, quantity, isFavorited, onUpdateQuantity, onSelectProduct, onToggleFavorite }) => {
  const { formatPrice } = useCurrency();
  
  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdateQuantity(product.id, quantity + 1);
  };
  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdateQuantity(product.id, quantity - 1);
  };
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(product.id);
  }
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-md relative">
       <button onClick={handleToggleFavorite} className="absolute top-2 right-2 z-10 p-1.5 bg-white/70 dark:bg-slate-700/70 backdrop-blur-sm rounded-full text-red-500 hover:bg-white dark:hover:bg-slate-600 transition-colors">
         {isFavorited ? <Heart className="w-5 h-5" fill="currentColor" /> : <Heart className="w-5 h-5" />}
         <span className="sr-only">Toggle Favorite</span>
       </button>
      <div onClick={() => onSelectProduct(product.id)} className="cursor-pointer p-3">
        <ImageWithFallback src={product.imageUrl} alt={product.name} className="w-full h-28 md:h-36 object-cover rounded-lg" />
        <div className="pt-3 flex flex-col flex-grow">
          <h3 
            className="font-bold text-sm md:text-base text-slate-800 dark:text-slate-100 overflow-hidden text-ellipsis"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {product.name}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 font-semibold text-lg my-2">{formatPrice(product.price)}</p>
        </div>
      </div>
      <div className="px-3 pb-3 mt-auto">
        {quantity === 0 ? (
            <button 
              onClick={handleIncrement}
              className="w-full bg-green-100 text-green-700 font-bold py-2 rounded-lg text-sm hover:bg-green-200 transition-colors"
            >
              Add
            </button>
          ) : (
            <div className="flex items-center justify-between bg-green-500 text-white rounded-lg">
              <button onClick={handleDecrement} className="px-3 py-2 font-bold text-xl rounded-l-lg hover:bg-green-600 transition-colors">-</button>
              <span className="font-bold text-base">{quantity}</span>
              <button onClick={handleIncrement} className="px-3 py-2 font-bold text-xl rounded-r-lg hover:bg-green-600 transition-colors">+</button>
            </div>
          )}
      </div>
    </div>
  );
};