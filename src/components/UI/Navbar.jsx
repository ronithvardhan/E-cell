import React, { useState } from 'react';
import { Bell, Menu, X, Home, Lightbulb, Users, HeartHandshake, CalendarDays, UserCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const navLinks = [
  {
    name: 'Home',
    path: '/',
    icon: <Home size={18} />,
    gradient: "radial-gradient(circle, rgba(228,71,46,0.15) 0%, rgba(228,71,46,0.06) 50%, rgba(228,71,46,0) 100%)",
    iconColor: "var(--brand-primary)",
  },
  {
    name: 'Initiatives',
    path: '/initiatives',
    icon: <Lightbulb size={18} />,
    gradient: "radial-gradient(circle, rgba(49,87,164,0.15) 0%, rgba(49,87,164,0.06) 50%, rgba(49,87,164,0) 100%)",
    iconColor: "var(--brand-secondary)",
  },
  {
    name: 'Team',
    path: '/team',
    icon: <Users size={18} />,
    gradient: "radial-gradient(circle, rgba(22,140,131,0.15) 0%, rgba(22,140,131,0.06) 50%, rgba(22,140,131,0) 100%)",
    iconColor: "var(--ecell-teal)",
  },
  {
    name: 'Sponsors',
    path: '/sponsors',
    icon: <HeartHandshake size={18} />,
    gradient: "radial-gradient(circle, rgba(229,169,0,0.15) 0%, rgba(229,169,0,0.06) 50%, rgba(229,169,0,0) 100%)",
    iconColor: "var(--ecell-saffron)",
  },
  {
    name: 'Events',
    path: '/events',
    icon: <CalendarDays size={18} />,
    gradient: "radial-gradient(circle, rgba(232,111,97,0.15) 0%, rgba(232,111,97,0.06) 50%, rgba(232,111,97,0) 100%)",
    iconColor: "var(--ecell-coral)",
  }
];

const itemVariants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
};

const backVariants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
};

const glowVariants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      scale: { duration: 0.5, type: "spring", stiffness: 300, damping: 25 },
    },
  },
};

const navGlowVariants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
};

const sharedTransition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  duration: 0.5,
};

export default function Navbar() {
  const [showAnnouncements, setShowAnnouncements] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const announcements = [
    { id: 1, title: 'Hackathon Registrations Open', time: '2 hours ago' },
    { id: 2, title: 'Ideation Workshop Tomorrow', time: '1 day ago' },
    { id: 3, title: 'New Incubation Cohort announced', time: '3 days ago' }
  ];

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: '1rem',
        left: '3rem',
        right: '3rem',
        padding: '0.75rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 50,
        background: 'rgba(255, 255, 255, 0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.6)',
        borderRadius: '24px',
        boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Brand */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: '1.4rem',
            color: 'var(--brand-primary)',
            letterSpacing: '0.02em',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem'
          }}>
            E-CELL <span style={{ color: 'var(--text-primary)' }}>UCEOU</span>
          </div>
        </Link>

        {/* Desktop Links (3D Rotating Glow Menu) */}
        <div style={{ display: 'none' }} className="desktop-nav">
          <motion.ul 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              listStyle: 'none', 
              margin: 0, 
              padding: 0,
              position: 'relative'
            }}
            initial="initial"
            whileHover="hover"
          >
            {/* Nav Background Glow */}
            <motion.div
              style={{
                position: 'absolute',
                inset: '-10px',
                background: 'radial-gradient(circle at center, rgba(57,136,184,0.15) 0%, rgba(228,71,46,0.1) 50%, transparent 100%)',
                borderRadius: '24px',
                zIndex: 0,
                pointerEvents: 'none'
              }}
              variants={navGlowVariants}
            />

            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <motion.li key={link.name} style={{ position: 'relative', zIndex: 10 }}>
                  <motion.div
                    style={{ perspective: '600px', display: 'block', borderRadius: '12px' }}
                    whileHover="hover"
                    initial="initial"
                  >
                    {/* Active Background OR Hover Glow */}
                    <motion.div
                      variants={glowVariants}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 0,
                        pointerEvents: 'none',
                        background: link.gradient,
                        borderRadius: '12px',
                      }}
                    />
                    
                    {/* Front Face (Default State) */}
                    <Link to={link.path} style={{ textDecoration: 'none' }}>
                      <motion.div
                        variants={itemVariants}
                        transition={sharedTransition}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.5rem 1rem',
                          position: 'relative',
                          zIndex: 10,
                          color: isActive ? link.iconColor : 'var(--text-primary)',
                          fontWeight: isActive ? 700 : 500,
                          fontSize: '0.95rem',
                          transformStyle: 'preserve-3d',
                          transformOrigin: 'center bottom',
                        }}
                      >
                        <span style={{ 
                          color: isActive ? link.iconColor : 'inherit', 
                          display: 'flex', 
                          alignItems: 'center' 
                        }}>
                          {link.icon}
                        </span>
                        <span>{link.name}</span>
                      </motion.div>
                    </Link>

                    {/* Bottom Face (Hover State) */}
                    <Link to={link.path} style={{ textDecoration: 'none' }}>
                      <motion.div
                        variants={backVariants}
                        transition={sharedTransition}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.5rem 1rem',
                          position: 'absolute',
                          inset: 0,
                          zIndex: 10,
                          color: 'var(--text-primary)',
                          fontWeight: 600,
                          fontSize: '0.95rem',
                          transformStyle: 'preserve-3d',
                          transformOrigin: 'center top',
                          rotateX: 90,
                        }}
                      >
                        <span style={{ 
                          color: link.iconColor, 
                          display: 'flex', 
                          alignItems: 'center' 
                        }}>
                          {link.icon}
                        </span>
                        <span>{link.name}</span>
                      </motion.div>
                    </Link>
                  </motion.div>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>

        {/* Icons / Actions */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          
          {/* Profile Link */}
          <Link
            to="/profile"
            style={{
              display: 'flex', alignItems: 'center', gap: '0.45rem',
              textDecoration: 'none',
              color: location.pathname === '/profile' ? 'var(--brand-primary)' : 'var(--text-primary)',
              fontWeight: 600, fontSize: '0.9rem',
              padding: '0.4rem 0.9rem',
              borderRadius: '9999px',
              background: location.pathname === '/profile' ? 'rgba(228,71,46,0.08)' : 'transparent',
              border: location.pathname === '/profile' ? '1px solid rgba(228,71,46,0.2)' : '1px solid transparent',
              transition: 'all 0.2s ease'
            }}
          >
            <UserCircle size={18} />
            <span className="profile-label">Profile</span>
          </Link>

          <Link
            to="/auth"
            style={{
              textDecoration: 'none',
              background: 'var(--brand-primary)',
              color: 'var(--text-inverse)',
              padding: '0.5rem 1.25rem',
              borderRadius: '9999px',
              fontWeight: 600,
              fontSize: '0.9rem',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(228, 71, 46, 0.3)'
            }}
            onMouseOver={(e) => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseOut={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            Login
          </Link>

          <button
            onClick={() => setShowAnnouncements(!showAnnouncements)}
            aria-label={showAnnouncements ? 'Close announcements' : 'Open announcements'}
            aria-expanded={showAnnouncements}
            aria-controls="announcements-panel"
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
            onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.05)'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; }}
          >
            <Bell size={18} />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
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
            id="announcements-panel"
            role="region"
            aria-label="Recent announcements"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={() => {
              setShowAnnouncements(false);
              navigate('/announcements');
            }}
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
              cursor: 'pointer',
            }}
            whileHover={{ scale: 1.02 }}
          >
            <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid rgba(36,36,36,0.1)', paddingBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              Recent Updates
              <span style={{ fontSize: '0.75rem', fontWeight: '500', color: 'var(--brand-primary)' }}>View All &rarr;</span>
            </h3>
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
