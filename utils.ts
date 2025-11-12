
export type Currency = 'USD' | 'INR';

const EXCHANGE_RATES: Record<Currency, number> = {
  USD: 1,
  INR: 83.50, // Approximate conversion rate
};

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: '$',
  INR: '₹',
};

/**
 * Converts a price from USD to the target currency and formats it.
 * @param priceInUsd The price in USD, which is the base currency in the app's data.
 * @param targetCurrency The currency to convert to.
 * @returns A formatted string with the currency symbol, e.g., "₹179.39" or "$2.15".
 */
export const convertAndFormatPrice = (priceInUsd: number, targetCurrency: Currency): string => {
  const rate = EXCHANGE_RATES[targetCurrency];
  const symbol = CURRENCY_SYMBOLS[targetCurrency];
  const convertedPrice = priceInUsd * rate;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: targetCurrency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Intl.NumberFormat might not have the Rupee symbol by default on all systems,
  // so we manually construct the string for consistency.
  if (targetCurrency === 'INR') {
    return `${symbol}${convertedPrice.toFixed(2)}`;
  }
  
  return formatter.format(convertedPrice).replace(targetCurrency, symbol).replace(/\s/g, '');
};
