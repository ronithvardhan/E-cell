import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { EventCountdownCard } from '../components/UI/EventCountdownCard';
import { EVENTS } from '../data/events';

export default function Events() {
  const navigate = useNavigate();

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
