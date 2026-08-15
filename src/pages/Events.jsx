import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { EventCountdownCard } from '../components/UI/EventCountdownCard';
import { EVENTS } from '../data/events';

export default function Events() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 'clamp(5.5rem, 12vw, 8rem) clamp(1rem, 5vw, 5vw) 4rem', minHeight: '100vh', maxWidth: '1200px', margin: '0 auto' }}>
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)', color: 'var(--ecell-teal)', borderBottom: '2px solid var(--text-primary)', paddingBottom: '0.75rem', marginBottom: 'clamp(1.5rem, 4vw, 3rem)' }}
      >
        Upcoming Events
      </motion.h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '2rem 1.5rem', placeItems: 'center' }}>
        {EVENTS.map((event) => (
          <EventCountdownCard 
            key={event.id}
            title={event.title}
            date={event.date}
            image={event.image}
            attendees={event.attendees}
            onJoin={() => navigate(`/events/${event.id}`)}
            onClick={() => navigate(`/events/${event.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
