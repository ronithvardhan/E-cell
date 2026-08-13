import React from 'react';
import { motion } from 'framer-motion';

const waypointsData = [
  {
    id: 1,
    title: "The Starting Line",
    description: "Every great startup begins with a spark. Our ideation workshops help you find your engine.",
    color: "var(--accent-1)",
    align: "left"
  },
  {
    id: 2,
    title: "Building the Chassis",
    description: "Hands-on technical workshops to build your MVP. Learn to code, design, and prototype.",
    color: "var(--accent-2)",
    align: "right"
  },
  {
    id: 3,
    title: "The Accelerator",
    description: "Join our incubation cohort. Get mentorship, funding, and the tools to shift into high gear.",
    color: "var(--accent-3)",
    align: "left"
  },
  {
    id: 4,
    title: "Reaching the Destination",
    description: "Pitching in front of VCs and angel investors. The final stretch before your startup goes public.",
    color: "var(--accent-4)",
    align: "right"
  },
  {
    id: 5,
    title: "ARE YOU READY TO BE A PART OF E CELL FAMILY",
    description: "Join us in our journey of transforming ideas into reality.",
    color: "var(--text-primary)",
    align: "center"
  }
];

export default function Waypoints() {
  return (
    <div style={{ pointerEvents: 'none' }}>
      {waypointsData.map((wp) => (
        <div 
          key={wp.id} 
          className="waypoint"
          style={{ 
            margin: '4rem 0',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: wp.align === 'center' ? 'center' : (wp.align === 'left' ? 'flex-start' : 'flex-end'),
            padding: '0 5vw',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="waypoint-card glass-panel"
            style={{ 
              borderColor: wp.color,
              borderLeft: wp.align === 'center' ? undefined : `4px solid ${wp.color}`,
              borderTop: wp.align === 'center' ? `4px solid var(--accent-1)` : undefined,
              textAlign: wp.align === 'center' ? 'center' : 'left'
            }}
          >
            <h2 style={{ color: wp.color, marginBottom: '1rem', fontSize: wp.align === 'center' ? '2.5rem' : '2rem' }}>
              {wp.title}
            </h2>
            <p style={{ fontSize: '1.2rem' }}>
              {wp.description}
            </p>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
