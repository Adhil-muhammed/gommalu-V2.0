import React, { createContext, useContext, useMemo, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme: Theme = 'light';

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('dark');
    try {
      localStorage.setItem('theme', 'light');
    } catch (error) {
      console.warn('Could not access localStorage to set light theme.', error);
    }
  }, []);

  const toggleTheme = () => {
    // The application is now forced to be in light mode. This function does nothing.
  };

  const value = useMemo(() => ({
    theme,
    toggleTheme,
  }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
