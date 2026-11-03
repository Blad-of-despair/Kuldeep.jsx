import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const themePresets = {
  dark: {
    name: 'Obsidian Dark',
    '--bg-primary': '#030712',
    '--bg-secondary': '#0f172a',
    '--bg-card': 'rgba(15, 23, 42, 0.7)',
    '--text-primary': '#f8fafc',
    '--text-secondary': '#94a3b8',
    '--accent-primary': '#6366f1',
    '--accent-secondary': '#8b5cf6',
    '--border-color': 'rgba(148, 163, 184, 0.1)',
    '--gradient-main': 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    '--gradient-glow': 'radial-gradient(circle, rgba(99, 102, 241, 0.15), transparent 70%)',
    '--shadow-card': '0 4px 20px rgba(0, 0, 0, 0.3)',
    '--shadow-glow': '0 8px 32px rgba(99, 102, 241, 0.3)',
    '--bg-card-hover': 'rgba(30, 41, 59, 0.85)',
    '--accent-light': 'rgba(99, 102, 241, 0.15)',
    '--accent': 'var(--accent-primary)',
    '--border': 'var(--border-color)',
    '--shadow': 'var(--shadow-card)',
    '--shadow-hover': 'var(--shadow-glow)',
  },
  light: {
    name: 'Clean Light',
    '--bg-primary': '#ffffff',
    '--bg-secondary': '#f8fafc',
    '--bg-card': 'rgba(255, 255, 255, 0.95)',
    '--text-primary': '#0f172a',
    '--text-secondary': '#475569',
    '--accent-primary': '#6366f1',
    '--accent-secondary': '#8b5cf6',
    '--border-color': 'rgba(15, 23, 42, 0.12)',
    '--gradient-main': 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    '--gradient-glow': 'radial-gradient(circle, rgba(99, 102, 241, 0.1), transparent 70%)',
    '--shadow-card': '0 6px 24px rgba(15, 23, 42, 0.1)',
    '--shadow-glow': '0 8px 32px rgba(99, 102, 241, 0.2)',
    '--bg-card-hover': 'rgba(255, 255, 255, 1)',
    '--accent-light': 'rgba(79, 70, 229, 0.08)',
    '--accent': 'var(--accent-primary)',
    '--border': 'var(--border-color)',
    '--shadow': 'var(--shadow-card)',
    '--shadow-hover': 'var(--shadow-glow)',
  },
  cherryBlossom: {
    name: 'Cherry Blossom',
    '--bg-primary': '#fff5f7',
    '--bg-secondary': '#ffe4e9',
    '--bg-card': 'rgba(255, 255, 255, 0.9)',
    '--text-primary': '#4a1a2c',
    '--text-secondary': '#8b5770',
    '--accent-primary': '#e91e63',
    '--accent-secondary': '#f06292',
    '--border-color': 'rgba(71, 85, 105, 0.18)',
    '--gradient-main': 'linear-gradient(135deg, #e91e63 0%, #f48fb1 100%)',
    '--gradient-glow': 'radial-gradient(circle, rgba(233, 30, 99, 0.15), transparent 70%)',
    '--shadow-card': '0 6px 24px rgba(160, 40, 90, 0.15)',
    '--shadow-glow': '0 8px 32px rgba(233, 30, 99, 0.25)',
    '--bg-card-hover': 'rgba(255, 255, 255, 1)',
    '--accent-light': 'rgba(233, 30, 99, 0.1)',
    '--accent': 'var(--accent-primary)',
    '--border': 'var(--border-color)',
    '--shadow': 'var(--shadow-card)',
    '--shadow-hover': 'var(--shadow-glow)',
  },
  ocean: {
    name: 'Ocean Blue',
    '--bg-primary': '#0a1929',
    '--bg-secondary': '#132f4c',
    '--bg-card': 'rgba(19, 47, 76, 0.7)',
    '--text-primary': '#e3f2fd',
    '--text-secondary': '#90caf9',
    '--accent-primary': '#00bcd4',
    '--accent-secondary': '#26c6da',
    '--border-color': 'rgba(0, 188, 212, 0.15)',
    '--gradient-main': 'linear-gradient(135deg, #00bcd4 0%, #0097a7 100%)',
    '--gradient-glow': 'radial-gradient(circle, rgba(0, 188, 212, 0.2), transparent 70%)',
    '--shadow-card': '0 4px 20px rgba(0, 0, 0, 0.4)',
    '--shadow-glow': '0 8px 32px rgba(0, 188, 212, 0.3)',
    '--bg-card-hover': 'rgba(26, 54, 82, 0.85)',
    '--accent-light': 'rgba(0, 188, 212, 0.12)',
    '--accent': 'var(--accent-primary)',
    '--border': 'var(--border-color)',
    '--shadow': 'var(--shadow-card)',
    '--shadow-hover': 'var(--shadow-glow)',
  },
  sunset: {
    name: 'Sunset Warm',
    '--bg-primary': '#1a0f0a',
    '--bg-secondary': '#2d1810',
    '--bg-card': 'rgba(45, 24, 16, 0.7)',
    '--text-primary': '#fff8f0',
    '--text-secondary': '#ffb088',
    '--accent-primary': '#ff6b35',
    '--accent-secondary': '#f7931e',
    '--border-color': 'rgba(255, 107, 53, 0.15)',
    '--gradient-main': 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
    '--gradient-glow': 'radial-gradient(circle, rgba(255, 107, 53, 0.2), transparent 70%)',
    '--shadow-card': '0 4px 20px rgba(0, 0, 0, 0.4)',
    '--shadow-glow': '0 8px 32px rgba(255, 107, 53, 0.3)',
    '--bg-card-hover': 'rgba(56, 31, 20, 0.85)',
    '--accent-light': 'rgba(255, 107, 53, 0.12)',
    '--accent': 'var(--accent-primary)',
    '--border': 'var(--border-color)',
    '--shadow': 'var(--shadow-card)',
    '--shadow-hover': 'var(--shadow-glow)',
  },
  forest: {
    name: 'Forest Green',
    '--bg-primary': '#0d1b0f',
    '--bg-secondary': '#1a2e1f',
    '--bg-card': 'rgba(26, 46, 31, 0.7)',
    '--text-primary': '#e8f5e9',
    '--text-secondary': '#81c784',
    '--accent-primary': '#4caf50',
    '--accent-secondary': '#66bb6a',
    '--border-color': 'rgba(76, 175, 80, 0.15)',
    '--gradient-main': 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)',
    '--gradient-glow': 'radial-gradient(circle, rgba(76, 175, 80, 0.2), transparent 70%)',
    '--shadow-card': '0 4px 20px rgba(0, 0, 0, 0.4)',
    '--shadow-glow': '0 8px 32px rgba(76, 175, 80, 0.3)',
    '--bg-card-hover': 'rgba(32, 58, 37, 0.85)',
    '--accent-light': 'rgba(76, 175, 80, 0.12)',
    '--accent': 'var(--accent-primary)',
    '--border': 'var(--border-color)',
    '--shadow': 'var(--shadow-card)',
    '--shadow-hover': 'var(--shadow-glow)',
  },
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('portfolio_theme');
    return savedTheme || 'dark';
  });

  const [customColors, setCustomColors] = useState(() => {
    const saved = localStorage.getItem('portfolio_custom_colors');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('portfolio_theme', theme);
    const colors = customColors || themePresets[theme];

    // Apply CSS variables
    Object.entries(colors).forEach(([key, value]) => {
      if (key.startsWith('--')) {
        document.documentElement.style.setProperty(key, value);
      }
    });

    // Set data-theme attribute for light/dark mode
    const isLight = theme === 'light' || theme === 'cherryBlossom';
    document.documentElement.setAttribute('data-theme', isLight ? 'light' : 'dark');
  }, [theme, customColors]);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    setCustomColors(null);
    localStorage.removeItem('portfolio_custom_colors');
  };

  const setCustomTheme = (colors) => {
    setCustomColors(colors);
    localStorage.setItem('portfolio_custom_colors', JSON.stringify(colors));
    setTheme('custom');
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    setCustomColors(null);
    localStorage.removeItem('portfolio_custom_colors');
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      toggleTheme,
      changeTheme,
      setCustomTheme,
      customColors,
      themePresets
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
