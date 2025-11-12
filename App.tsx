
import React, { useState, useMemo, useEffect } from 'react';
import { BottomNav } from './components/BottomNav';
import CartModal from './components/CartModal';
import ProductDetail from './components/ProductDetail';
import { fetchCategories, fetchProducts, fetchOrders } from './api';
import { CartItem, Product, Category, CartDetailItem, Order } from './types';

import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import OrdersPage from './pages/OrdersPage';
import ProfilePage from './pages/ProfilePage';

export type View = 'home' | 'favorites' | 'orders' | 'profile';
type ModalView = 'list' | 'detail';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [modalView, setModalView] = useState<ModalView>('list');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [currentView, setCurrentView] = useState<View>('home');
  
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [categoriesData, productsData, ordersData] = await Promise.all([
          fetchCategories(),
          fetchProducts(),
          fetchOrders(),
        ]);
        setCategories(categoriesData);
        setProducts(productsData);
        setOrders(ordersData);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.productId === productId);
      if (quantity <= 0) {
        return prevCart.filter(item => item.productId !== productId);
      }
      if (existingItem) {
        return prevCart.map(item =>
          item.productId === productId ? { ...item, quantity } : item
        );
      }
      return [...prevCart, { productId, quantity }];
    });
  };

  const handleSelectProduct = (productId: number) => {
    setSelectedProductId(productId);
    setModalView('detail');
  };

  const handleCloseDetail = () => {
    setModalView('list');
    setTimeout(() => setSelectedProductId(null), 300);
  };

  const toggleFavorite = (productId: number) => {
    setFavorites(prevFavorites => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const handleStartShopping = () => {
    setIsCartOpen(false);
    setCurrentView('home');
  };

  const { cartDetails, totalPrice } = useMemo(() => {
    const details: CartDetailItem[] = cart
      .map(cartItem => {
        const product = products.find(p => p.id === cartItem.productId);
        return product ? { ...product, quantity: cartItem.quantity } : null;
      })
      .filter((item): item is CartDetailItem => item !== null);
    
    const total = details.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return { cartDetails: details, totalPrice: total };
  }, [cart, products]);

  const totalCartItems = useMemo(() => 
    cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );
  
  const getProductQuantity = (productId: number): number => {
    return cart.find(item => item.productId === productId)?.quantity || 0;
  };
  
  const selectedProduct = useMemo(() => {
    if (!selectedProductId) return null;
    return products.find(p => p.id === selectedProductId) || null;
  }, [selectedProductId, products]);
  
  const favoritedProducts = useMemo(() => 
    products.filter(p => favorites.has(p.id)),
    [products, favorites]
  );

  const renderContent = () => {
    switch(currentView) {
      case 'home':
        return <HomePage 
                  products={products} 
                  categories={categories} 
                  getProductQuantity={getProductQuantity}
                  handleUpdateQuantity={handleUpdateQuantity}
                  handleSelectProduct={handleSelectProduct}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />;
      case 'favorites':
        return <FavoritesPage 
                  favoritedProducts={favoritedProducts}
                  getProductQuantity={getProductQuantity}
                  handleUpdateQuantity={handleUpdateQuantity}
                  handleSelectProduct={handleSelectProduct}
                  toggleFavorite={toggleFavorite}
               />;
      case 'orders':
        return <OrdersPage orders={orders} products={products} />;
      case 'profile':
        return <ProfilePage />;
      default:
        return null;
    }
  };


  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <p className="text-3xl font-bold text-green-600" style={{fontFamily: 'Manjari, sans-serif'}}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 pb-28">
      <div className="transition-opacity duration-300 ease-in-out">
        {renderContent()}
      </div>

      <BottomNav 
        activeView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        totalItems={totalCartItems} 
        onCartClick={() => setIsCartOpen(true)} 
      />
      <CartModal 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartDetails={cartDetails}
        totalPrice={totalPrice}
        onUpdateQuantity={handleUpdateQuantity}
        onStartShopping={handleStartShopping}
      />
      {selectedProduct && (
        <ProductDetail
            isOpen={modalView === 'detail'}
            product={selectedProduct}
            quantity={getProductQuantity(selectedProduct.id)}
            onClose={handleCloseDetail}
            onUpdateQuantity={handleUpdateQuantity}
        />
      )}
    </div>
  );
}

export default App;