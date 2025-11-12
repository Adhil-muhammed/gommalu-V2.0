

import React from 'react';
import { Search } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <header className="sticky top-0 z-10 bg-slate-50/80 backdrop-blur-md px-4 py-3 md:px-6">
      <div className="relative">
        <input 
          type="text" 
          placeholder="Search for groceries..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-full shadow-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          <Search className="w-5 h-5" />
        </div>
      </div>
    </header>
  );
};