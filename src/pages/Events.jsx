import React from 'react';
import { motion } from 'framer-motion';
import { EventCountdownCard } from '../components/UI/EventCountdownCard';

const UNSPLASH = (id) =>
  `https://images.unsplash.com/photo-${id}?w=640&h=640&fit=crop&q=70&auto=format`;

const EVENTS = [
  {
    title: "E-Summit 2026",
    date: new Date(Date.now() + 60 * 24 * 3600 * 1000), // ~60 days from now
    image: UNSPLASH("1540575467063-178a50c2df87"),
    attendees: 1200,
  },
  {
    title: "Startup Bootcamp",
    date: new Date(Date.now() + 15 * 24 * 3600 * 1000), // ~15 days from now
    image: UNSPLASH("1519681393784-d120267933ba"),
    attendees: 350,
  },
  {
    title: "Pitch Tank",
    date: new Date(Date.now() + 5 * 24 * 3600 * 1000), // ~5 days from now
    image: UNSPLASH("1556761175-5973dc0f32e7"),
    attendees: 85,
  },
  {
    title: "Founders Meetup",
    date: new Date(Date.now() + 10 * 3600 * 1000), // ~10 hours from now
    image: UNSPLASH("1470071459604-3b5ec3a7fe05"),
    attendees: 120,
  },
  {
    title: "Hackathon '26",
    date: new Date(Date.now() - 5 * 24 * 3600 * 1000), // Past event
    image: UNSPLASH("1504384308090-c894fdcc538d"),
    attendees: 500,
  }
];

export default function Events() {
  return (
    <div style={{ padding: '8rem 5vw 4rem', minHeight: '100vh', maxWidth: '1200px', margin: '0 auto' }}>
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ fontSize: '3rem', color: 'var(--ecell-teal)', borderBottom: '2px solid var(--text-primary)', paddingBottom: '1rem', marginBottom: '3rem' }}
      >
        Upcoming Events
      </motion.h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem 2rem', placeItems: 'center' }}>
        {EVENTS.map((event, idx) => (
          <EventCountdownCard 
            key={idx}
            title={event.title}
            date={event.date}
            image={event.image}
            attendees={event.attendees}
          />
        ))}
      </div>
    </div>
  );
}
