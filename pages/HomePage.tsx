

import React, { useState, useMemo } from 'react';
import { Header } from '../components/Header';
import { CategoryNav } from '../components/CategoryNav';
import { ProductCard } from '../components/ProductCard';
import { Product, Category } from '../types';
import ShopBannerSlider from '../components/ShopBannerSlider'; // Import the new slider
import { SHOP_BANNERS } from '../constants'; // Import the banner data

interface HomePageProps {
    products: Product[];
    categories: Category[];
    favorites: Set<number>;
    getProductQuantity: (productId: number) => number;
    handleUpdateQuantity: (productId: number, quantity: number) => void;
    handleSelectProduct: (productId: number) => void;
    toggleFavorite: (productId: number) => void;
}

// Removed the static ShopBanner definition from here

const HomePage: React.FC<HomePageProps> = ({ 
    products, 
    categories,
    favorites, 
    getProductQuantity, 
    handleUpdateQuantity, 
    handleSelectProduct,
    toggleFavorite
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return products
      .filter(product => product.category === selectedCategory)
      .filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [products, selectedCategory, searchQuery]);

  const currentCategoryName = useMemo(() => {
    return categories.find(c => c.id === selectedCategory)?.name.replace('-', ' ') || '';
  }, [categories, selectedCategory]);

  return (
    <>
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main className="px-4 py-4 md:px-6">
        <ShopBannerSlider banners={SHOP_BANNERS} /> {/* Render the slider here */}
        
        <CategoryNav 
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={(id) => {
            setSelectedCategory(id);
            setSearchQuery(''); // Reset search on category change
          }}
        />

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 capitalize">
            {currentCategoryName}
          </h2>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id}
                  product={product}
                  quantity={getProductQuantity(product.id)}
                  onUpdateQuantity={handleUpdateQuantity}
                  onSelectProduct={handleSelectProduct}
                  isFavorited={favorites.has(product.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          ) : (
             <div className="text-center py-12">
              <p className="text-slate-500">No products found.</p>
              <p className="text-sm text-slate-400 mt-2">Try a different category or search term.</p>
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default HomePage;