/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect } from 'react';

const defaultContext = {
  theme: 'dark',
  isDark: true,
  toggleTheme: () => {},
};

const ThemeContext = createContext(defaultContext);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  return context || defaultContext;
};

export const ThemeProvider = ({ children }) => {
  useEffect(() => {
    try {
      localStorage.setItem('theme', 'dark');
    } catch {}
    document.documentElement.classList.add('dark-theme');
    document.documentElement.classList.remove('light-theme');
  }, []);

  return (
    <ThemeContext.Provider value={defaultContext}>
      {children}
    </ThemeContext.Provider>
  );
};

