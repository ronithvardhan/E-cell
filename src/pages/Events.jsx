import React from 'react';
import { motion } from 'framer-motion';

export default function Events() {
  return (
    <div style={{ padding: '8rem 5vw 4rem', minHeight: '100vh', maxWidth: '1200px', margin: '0 auto' }}>
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ fontSize: '3rem', color: 'var(--ecell-teal)', borderBottom: '2px solid var(--text-primary)', paddingBottom: '1rem', marginBottom: '3rem' }}
      >
        Upcoming Events
      </motion.h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {[1, 2, 3].map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel"
            style={{ padding: '2rem' }}
          >
            <div style={{ width: '100%', height: '150px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', marginBottom: '1.5rem' }}></div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>E-Summit {2026 + idx}</h3>
            <p style={{ color: 'var(--brand-secondary)', marginBottom: '1rem' }}>October 15, {2026 + idx}</p>
            <p style={{ color: 'var(--text-secondary)' }}>
              Join us for the biggest entrepreneurial summit of the year featuring keynote speakers, pitch battles, and more.
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
