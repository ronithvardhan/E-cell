import React from 'react';
import Hero from '../components/UI/Hero';
import Waypoints from '../components/UI/Waypoints';

export default function Home() {
  return (
    <div>
      <Hero />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 0' }}>
        <Waypoints />
      </div>
    </div>
  );
}
