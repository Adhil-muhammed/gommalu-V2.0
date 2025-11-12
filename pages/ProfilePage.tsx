

import React from 'react';
import { 
  ChevronRight,
  MapPin,
  CreditCard,
  HelpCircle,
  LogOut,
  User,
  Coins,
  Sun,
  Moon,
} from 'lucide-react';
import ImageWithFallback from '../components/ImageWithFallback';
import { useCurrency } from '../CurrencyContext';
import { useTheme } from '../ThemeContext';

const ProfileOption: React.FC<{
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  isLogout?: boolean;
  strokeWidth?: number;
  onClick?: () => void;
  rightContent?: React.ReactNode;
}> = ({ icon: Icon, label, isLogout, strokeWidth = 1.5, onClick, rightContent }) => (
  <button onClick={onClick} className="flex items-center justify-between w-full p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
    <div className="flex items-center space-x-4">
      <Icon className={`w-6 h-6 ${isLogout ? 'text-red-500' : 'text-green-500'}`} strokeWidth={strokeWidth} />
      <span className={`font-semibold ${isLogout ? 'text-red-500' : 'text-slate-700 dark:text-slate-200'}`}>{label}</span>
    </div>
    {rightContent ? rightContent : (!isLogout && <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-500" strokeWidth={2.5} />)}
  </button>
);

const ProfilePage: React.FC = () => {
  const { currency, toggleCurrency } = useCurrency();
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <header className="sticky top-0 z-10 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-md px-4 py-4 md:px-6 border-b border-slate-200 dark:border-slate-700">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 text-center">My Profile</h1>
      </header>
      <main className="px-4 py-6 md:px-6">
        <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-full bg-slate-200 mb-4 flex items-center justify-center overflow-hidden">
                 <ImageWithFallback src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&h=200&fit=crop" alt="User Avatar" className="w-full h-full object-cover" />
            </div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Jane Doe</h2>
          <p className="text-slate-500 dark:text-slate-400">jane.doe@example.com</p>
        </div>
        
        <div className="space-y-3">
          <ProfileOption icon={User} label="My Details" strokeWidth={2} />
          <ProfileOption icon={MapPin} label="Delivery Address" />
          <ProfileOption icon={CreditCard} label="Payment Methods" />
          <ProfileOption 
            icon={Coins} 
            label="Currency" 
            onClick={toggleCurrency}
            rightContent={<span className="font-bold text-green-600">{currency}</span>}
          />
           <ProfileOption 
            icon={theme === 'light' ? Moon : Sun}
            label="Theme"
            onClick={toggleTheme}
            rightContent={<span className="font-medium text-slate-600 dark:text-slate-300 capitalize">{theme}</span>}
          />
          <ProfileOption icon={HelpCircle} label="Help Center" />
          <div className="pt-4">
             <ProfileOption icon={LogOut} label="Log Out" isLogout />
          </div>
        </div>
      </main>
    </>
  );
};

export default ProfilePage;