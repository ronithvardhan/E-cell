import React from 'react';
import Hero from '../components/UI/Hero';
import Waypoints from '../components/UI/Waypoints';

export default function Home() {
  return (
    <div className="font-sans selection:bg-orange-200 selection:text-black overflow-hidden relative w-full"
      style={{
        backgroundColor: 'var(--bg-primary)', 
        color: 'var(--text-primary)', 
        backgroundImage: 'radial-gradient(var(--grid-pattern-color) 1px, transparent 1px)', 
        backgroundSize: '48px 48px',
        minHeight: '100vh',
        transition: 'background-color 0.3s ease, color 0.3s ease'
      }}>
      {/* Font utility classes — actual font loading is in index.html */}
      <style>
        {`
          .serif {
            font-family: 'DM Serif Display', serif;
          }

          .manrope {
            font-family: 'Manrope', sans-serif;
          }
        `}
      </style>
      <Hero />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 0', position: 'relative', zIndex: 10 }}>
        <Waypoints />
      </div>
    </div>
  );
}
