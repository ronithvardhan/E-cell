import React from 'react';
import { motion } from 'framer-motion';
import { HoverExpand } from '../components/UI/SponsorHoverExpand';

const sponsorsData = [
  {
    label: "Acme Corp",
    sublabel: "Platinum Sponsor",
    image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=1200",
    description: "Innovating the future of enterprise."
  },
  {
    label: "TechFlow",
    sublabel: "Technology Partner",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
    description: "Streamlining data processes worldwide."
  },
  {
    label: "GlobalVentures",
    sublabel: "Investment Partner",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    description: "Funding the next generation of startups."
  },
  {
    label: "InnovateX",
    sublabel: "Gold Sponsor",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200",
    description: "Pushing the boundaries of AI."
  },
  {
    label: "BuildFast Inc",
    sublabel: "Infrastructure Partner",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=1200",
    description: "Solid foundations for modern web apps."
  }
];

import { RadialBackground } from '../components/UI/RadialBackground';

export default function Sponsors() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', color: 'var(--text-primary)' }}>
      <RadialBackground />
      <div style={{ padding: 'clamp(6rem, 15vw, 10rem) clamp(1rem, 5vw, 5vw) 4rem', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Title */}
      <div style={{ marginBottom: 'clamp(2rem, 5vw, 4rem)', textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: 'clamp(2rem, 6vw, 5rem)', 
          marginBottom: '0.75rem',
          fontFamily: 'var(--font-heading)',
          color: 'var(--text-primary)',
          fontWeight: 700,
          textTransform: 'uppercase'
        }}>
          OUR SPONSORS
        </h1>
        <p style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.25rem)', color: 'var(--text-secondary)' }}>
          The visionaries and partners who make our initiatives possible.
        </p>
      </div>
      
      {/* Hover Expand Accordion */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="sponsor-hover-container"
        style={{
          background: 'var(--glass-bg)',
          borderRadius: 'clamp(14px, 3vw, 24px)',
          padding: 'clamp(1rem, 3vw, 2rem)',
          border: '1px solid var(--glass-border)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.2)'
        }}
      >
        <HoverExpand items={sponsorsData} />
      </motion.div>
      
      </div>
    </div>
  );
}
