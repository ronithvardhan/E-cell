import React from 'react';
import { motion } from 'framer-motion';
import CrowdCanvas from '../components/UI/CrowdCanvas';
import TeamCarousel from '../components/UI/TeamCarousel';

const teamData = [
  { role: 'Core Committee', count: 12 },
  { role: 'Tech & Development', count: 10 },
  { role: 'Design & Creative', count: 8 },
  { role: 'Marketing & Outreach', count: 15 },
  { role: 'Public Relations', count: 6 },
];

export default function Team() {
  return (
    <div style={{ minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      
      {/* Hero Section (100vh) */}
      <div style={{ position: 'relative', width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CrowdCanvas src="/images/peeps/all-peeps.png" rows={15} cols={7} />
        
        <div 
          className="team-hero-container" 
          style={{ position: 'relative', zIndex: 10, width: '100%', marginTop: '-10vh', display: 'flex', justifyContent: 'center' }}
        >
          <h1 className="team-title-3d">MEET THE CREW</h1>
        </div>
      </div>
      
      {/* Team Content Section */}
      <div style={{ padding: '6rem 5vw', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <TeamCarousel />
      </div>

    </div>
  );
}
