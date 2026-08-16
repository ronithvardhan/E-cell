import React from 'react';
import { motion } from 'framer-motion';

import { RadialBackground } from '../components/UI/RadialBackground';

export default function Initiatives() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', color: 'var(--text-primary)' }}>
      <RadialBackground />
      <div style={{ padding: 'clamp(5.5rem, 12vw, 8rem) clamp(1rem, 5vw, 5vw) 4rem', maxWidth: '1200px', margin: '0 auto' }}>
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)', color: 'var(--brand-primary)', borderBottom: '2px solid var(--text-primary)', paddingBottom: '0.75rem', marginBottom: 'clamp(1.5rem, 4vw, 3rem)' }}
      >
        Our Initiatives
      </motion.h1>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="glass-panel"
        style={{ padding: '4rem 2rem', textAlign: 'center' }}
      >
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Coming Soon</h2>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
          We are currently working on exciting new initiatives. Stay tuned!
        </p>
      </motion.div>
      </div>
    </div>
  );
}
