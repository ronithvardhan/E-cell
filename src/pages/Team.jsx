import React from 'react';
import { motion } from 'framer-motion';

const teamData = [
  { role: 'Core Committee', count: 12 },
  { role: 'Tech & Development', count: 10 },
  { role: 'Design & Creative', count: 8 },
  { role: 'Marketing & Outreach', count: 15 },
  { role: 'Public Relations', count: 6 },
];

export default function Team() {
  return (
    <div style={{ padding: '8rem 5vw 4rem', minHeight: '100vh', maxWidth: '1200px', margin: '0 auto' }}>
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ fontSize: '3rem', color: 'var(--brand-primary)', borderBottom: '2px solid var(--text-primary)', paddingBottom: '1rem', marginBottom: '3rem' }}
      >
        Our Team
      </motion.h1>
      
      <div className="grid-team">
        {teamData.map((team, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="team-card glass-panel"
            style={{ padding: '2rem' }}
          >
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{team.role}</h3>
            <div style={{ color: 'var(--brand-secondary)', fontWeight: 600, fontSize: '1.5rem' }}>
              {team.count} Members
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
