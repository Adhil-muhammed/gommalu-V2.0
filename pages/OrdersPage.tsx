

import React from 'react';
import { Order, Product } from '../types';
import ImageWithFallback from '../components/ImageWithFallback';
import { useCurrency } from '../CurrencyContext';
import { useTheme } from '../ThemeContext';

interface OrdersPageProps {
  orders: Order[];
  products: Product[];
}

const OrdersPage: React.FC<OrdersPageProps> = ({ orders, products }) => {
  const { formatPrice } = useCurrency();
  const { theme } = useTheme();

  const getStatusColor = (status: Order['status']) => {
    if (theme === 'dark') {
      switch (status) {
        case 'Delivered':
          return 'bg-green-900/50 text-green-300';
        case 'Processing':
          return 'bg-blue-900/50 text-blue-300';
        case 'Cancelled':
          return 'bg-red-900/50 text-red-300';
        default:
          return 'bg-slate-700 text-slate-300';
      }
    }
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const getProductImage = (productId: number) => {
    return products.find(p => p.id === productId)?.imageUrl || '';
  }
  
  return (
    <>
      <header className="sticky top-0 z-10 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-md px-4 py-4 md:px-6 border-b border-slate-200 dark:border-slate-700">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 text-center">My Orders</h1>
      </header>
      <main className="px-4 py-6 md:px-6">
        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="font-bold text-slate-800 dark:text-slate-100">Order #{order.id}</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex items-center space-x-2 my-4">
                  {order.items.slice(0, 4).map(item => (
                    <ImageWithFallback key={item.productId} src={getProductImage(item.productId)} alt="" className="w-12 h-12 rounded-md object-cover border"/>
                  ))}
                  {order.items.length > 4 && (
                    <div className="w-12 h-12 rounded-md bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-sm font-bold text-slate-500 dark:text-slate-400">
                      +{order.items.length - 4}
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-slate-100 dark:border-slate-700">
                  <p className="text-sm text-slate-500 dark:text-slate-400">{order.items.length} item{order.items.length > 1 ? 's' : ''}</p>
                  <p className="font-bold text-slate-800 dark:text-slate-100">Total: {formatPrice(order.total)}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
             <h2 className="mt-4 text-xl font-semibold text-slate-700 dark:text-slate-200">No Order History</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Your past orders will appear here.</p>
          </div>
        )}
      </main>
    </>
  );
};

export default OrdersPage;