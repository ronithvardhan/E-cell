import React from 'react';
import { AuthUI } from '../components/UI/AuthUI';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Auth() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ position: 'relative', width: '100%', minHeight: '100vh' }}
    >
      {/* Back to Home — shown instead of Navbar */}
      <Link
        to="/"
        style={{
          position: 'fixed',
          top: '1.5rem',
          left: '2rem',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          textDecoration: 'none',
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          color: 'var(--text-primary)',
          fontWeight: 600,
          fontSize: '0.9rem',
          padding: '0.5rem 1.1rem',
          borderRadius: '9999px',
          border: '1px solid rgba(255,255,255,0.6)',
          boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
          transition: 'all 0.2s ease'
        }}
        onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)'; }}
        onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.08)'; }}
      >
        <ArrowLeft size={16} /> Back to Home
      </Link>

      <AuthUI />
    </motion.div>
  );
}
