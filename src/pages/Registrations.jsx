import React from 'react';
import { motion } from 'framer-motion';

export default function Registrations() {
  return (
    <div style={{ padding: '8rem 5vw 4rem', minHeight: '100vh', maxWidth: '800px', margin: '0 auto' }}>
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ fontSize: '3rem', color: 'var(--brand-primary)', borderBottom: '2px solid var(--text-primary)', paddingBottom: '1rem', marginBottom: '3rem', textAlign: 'center' }}
      >
        Registrations
      </motion.h1>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-panel"
        style={{ padding: '3rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
      >
        <p style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
          Sign up to join the E-Cell family or register for our upcoming events.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontWeight: 600 }}>Full Name</label>
          <input type="text" placeholder="John Doe" style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.2)', color: 'white' }} />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontWeight: 600 }}>Email Address</label>
          <input type="email" placeholder="john@example.com" style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.2)', color: 'white' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontWeight: 600 }}>Interested In</label>
          <select style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.2)', color: 'white' }}>
            <option value="membership">E-Cell Membership</option>
            <option value="esummit">E-Summit 2026</option>
            <option value="workshop">Upcoming Workshop</option>
          </select>
        </div>
        
        <button style={{ 
          marginTop: '1rem', 
          padding: '1rem', 
          backgroundColor: 'var(--brand-primary)', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px', 
          fontWeight: 700, 
          fontSize: '1.1rem',
          cursor: 'pointer'
        }}>
          Submit Registration
        </button>
      </motion.div>
    </div>
  );
}
