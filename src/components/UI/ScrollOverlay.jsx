import React, { forwardRef } from 'react';
import Waypoints from './Waypoints';
import StaticContent from './StaticContent';

const ScrollOverlay = forwardRef((props, ref) => {
  return (
    <div 
      className="scroll-overlay"
      ref={ref}
      style={{
        height: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden'
      }}
    >
      <div style={{ height: '100vh' }}>
        {/* Empty space for Hero 3D text */}
      </div>

      <Waypoints />

      <StaticContent />
    </div>
  );
});

export default ScrollOverlay;
