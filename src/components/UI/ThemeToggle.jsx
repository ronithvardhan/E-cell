import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      onClick={toggleTheme}
      className="theme-toggle-btn"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '38px',
        height: '38px',
        borderRadius: '50%',
        background: 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
        color: 'var(--text-primary)',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          y: isDark ? 0 : 30,
          opacity: isDark ? 1 : 0,
          rotate: isDark ? 0 : -90
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{ position: 'absolute' }}
      >
        <Moon size={18} fill="currentColor" opacity={0.8} />
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          y: isDark ? -30 : 0,
          opacity: isDark ? 0 : 1,
          rotate: isDark ? 90 : 0
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{ position: 'absolute' }}
      >
        <Sun size={18} fill="var(--ecell-saffron)" />
      </motion.div>

      {/* Hover halo effect */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: isDark 
            ? 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(229,169,0,0.15) 0%, transparent 70%)',
          zIndex: 0
        }}
      />
    </motion.button>
  );
}
