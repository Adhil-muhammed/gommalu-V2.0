
import React, { createContext, useState, useContext, useMemo, useCallback } from 'react';
import { convertAndFormatPrice, Currency } from './utils';

interface CurrencyContextType {
  currency: Currency;
  toggleCurrency: () => void;
  formatPrice: (priceInUsd: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('INR'); // Default to INR

  const toggleCurrency = useCallback(() => {
    setCurrency(current => (current === 'INR' ? 'USD' : 'INR'));
  }, []);

  const formatPrice = useCallback((priceInUsd: number) => {
    return convertAndFormatPrice(priceInUsd, currency);
  }, [currency]);

  const value = useMemo(() => ({
    currency,
    toggleCurrency,
    formatPrice,
  }), [currency, toggleCurrency, formatPrice]);

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
