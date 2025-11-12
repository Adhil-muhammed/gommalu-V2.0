
import React from 'react';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';
import { Heart } from 'lucide-react';

interface FavoritesPageProps {
  favoritedProducts: Product[];
  getProductQuantity: (productId: number) => number;
  handleUpdateQuantity: (productId: number, quantity: number) => void;
  handleSelectProduct: (productId: number) => void;
  toggleFavorite: (productId: number) => void;
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({
  favoritedProducts,
  getProductQuantity,
  handleUpdateQuantity,
  handleSelectProduct,
  toggleFavorite,
}) => {
  return (
    <>
      <header className="sticky top-0 z-10 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-md px-4 py-4 md:px-6 border-b border-slate-200 dark:border-slate-700">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 text-center">My Favorites</h1>
      </header>
      <main className="px-4 py-6 md:px-6">
        {favoritedProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {favoritedProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                quantity={getProductQuantity(product.id)}
                onUpdateQuantity={handleUpdateQuantity}
                onSelectProduct={handleSelectProduct}
                isFavorited={true} // Always true on this page
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-600" />
            <h2 className="mt-4 text-xl font-semibold text-slate-700 dark:text-slate-200">No Favorites Yet</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Tap the heart on any product to save it here.</p>
          </div>
        )}
      </main>
    </>
  );
};

export default FavoritesPage;