import React from 'react';
import { motion } from 'framer-motion';

const sponsorsData = [
  "Acme Corp", "TechFlow", "GlobalVentures", "InnovateX", "BuildFast Inc", "NextGen Solutions"
];

export default function Sponsors() {
  return (
    <div style={{ padding: '8rem 5vw 4rem', minHeight: '100vh', maxWidth: '1200px', margin: '0 auto' }}>
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ fontSize: '3rem', color: 'var(--ecell-teal)', borderBottom: '2px solid var(--text-primary)', paddingBottom: '1rem', marginBottom: '3rem' }}
      >
        Our Sponsors
      </motion.h1>
      
      <div className="grid-sponsors">
        {sponsorsData.map((sponsor, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="sponsor-card glass-panel"
            style={{ padding: '3rem 1rem', fontSize: '1.5rem', fontWeight: 600, textAlign: 'center' }}
          >
            {sponsor}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
