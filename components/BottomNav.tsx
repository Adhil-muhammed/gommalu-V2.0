
import type React from 'react';
import { Home, ShoppingCart, ClipboardList, Heart, User } from 'lucide-react';
import { View } from '../App';

interface BottomNavProps {
  totalItems: number;
  onCartClick: () => void;
  activeView: View;
  onNavigate: (view: View) => void;
}

const NavItem: React.FC<{ icon: React.FC<React.SVGProps<SVGSVGElement>>; label: string; active?: boolean; onClick?: () => void }> = ({ icon: Icon, label, active, onClick }) => (
  <button onClick={onClick} className={`flex flex-col items-center justify-center text-xs font-medium w-full relative transition-all duration-200 ${active ? 'text-green-500 scale-110' : 'text-slate-400 dark:text-slate-500 hover:text-green-500'}`}>
    <Icon className="w-6 h-6 mb-1" />
    <span>{label}</span>
  </button>
);


export const BottomNav: React.FC<BottomNavProps> = ({ totalItems, onCartClick, activeView, onNavigate }) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 h-20 bg-transparent z-20">
      <div className="relative max-w-lg mx-auto h-full">
        {/* Cart Button */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-10">
          <button 
            onClick={onCartClick} 
            className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/40 transform hover:scale-110 transition-transform duration-300"
            aria-label={`Open cart with ${totalItems} items`}
          >
            <ShoppingCart className="w-8 h-8" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Navigation bar background */}
        <div className="absolute bottom-0 left-0 right-0 h-[70px] bg-white dark:bg-slate-800 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] dark:shadow-[0_-2px_10px_rgba(0,0,0,0.2)] rounded-t-2xl">
          <nav className="flex items-center justify-around h-full px-2">
            <div className="w-1/5">
              <NavItem icon={Home} label="Home" active={activeView === 'home'} onClick={() => onNavigate('home')} />
            </div>
            <div className="w-1/5">
              <NavItem icon={Heart} label="Favorites" active={activeView === 'favorites'} onClick={() => onNavigate('favorites')} />
            </div>
            <div className="w-1/5" /> {/* Placeholder for the central cart button */}
            <div className="w-1/5">
              <NavItem icon={ClipboardList} label="Orders" active={activeView === 'orders'} onClick={() => onNavigate('orders')} />
            </div>
            <div className="w-1/5">
              <NavItem icon={User} label="Profile" active={activeView === 'profile'} onClick={() => onNavigate('profile')} />
            </div>
          </nav>
        </div>
      </div>
    </footer>
  );
};