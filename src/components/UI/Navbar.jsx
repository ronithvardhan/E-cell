import React, { useState } from 'react';
import { Bell, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Initiatives', path: '/initiatives' },
  { name: 'Team', path: '/team' },
  { name: 'Sponsors', path: '/sponsors' },
  { name: 'Events', path: '/events' },
  { name: 'Registrations', path: '/registrations' }
];

export default function Navbar() {
  const [showAnnouncements, setShowAnnouncements] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const announcements = [
    { id: 1, title: 'Hackathon Registrations Open', time: '2 hours ago' },
    { id: 2, title: 'Ideation Workshop Tomorrow', time: '1 day ago' },
    { id: 3, title: 'New Incubation Cohort announced', time: '3 days ago' }
  ];

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        padding: '1rem 3rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 50,
        background: 'rgba(247, 241, 227, 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(24,24,24,0.05)'
      }}>
        {/* Brand */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: '1.5rem',
            color: 'var(--brand-primary)',
            letterSpacing: '0.02em'
          }}>
            E-CELL <span style={{ color: 'var(--text-primary)' }}>UCEOU</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div style={{ display: 'none', '@media (min-width: 768px)': { display: 'flex' }, gap: '2rem', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              style={{
                textDecoration: 'none',
                color: location.pathname === link.path ? 'var(--brand-primary)' : 'var(--text-primary)',
                fontWeight: location.pathname === link.path ? 700 : 500,
                fontSize: '1rem',
                transition: 'color 0.2s ease'
              }}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Icons / Actions */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button 
            onClick={() => setShowAnnouncements(!showAnnouncements)}
            style={{
              background: 'transparent',
              border: '1px solid rgba(24, 24, 24, 0.1)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-primary)',
              transition: 'all 0.2s ease'
            }}
          >
            <Bell size={18} />
          </button>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-primary)',
              display: 'none' // Handled via CSS for media queries
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Announcements Pop-up */}
      <AnimatePresence>
        {showAnnouncements && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              top: '80px',
              right: '3rem',
              width: '320px',
              background: 'rgba(247, 241, 227, 0.95)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(36, 36, 36, 0.1)',
              borderRadius: '12px',
              padding: '1.5rem',
              zIndex: 50,
              boxShadow: '0 10px 40px rgba(36, 36, 36, 0.15)',
            }}
          >
            <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid rgba(36,36,36,0.1)', paddingBottom: '0.5rem' }}>Recent Updates</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {announcements.map(ann => (
                <li key={ann.id}>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{ann.title}</div>
                  <div style={{ fontSize: '0.8rem', color: 'rgba(36,36,36,0.6)', marginTop: '0.25rem' }}>{ann.time}</div>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
