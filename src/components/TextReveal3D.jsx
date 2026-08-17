import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function TextReveal3D({ text, style = {} }) {
  const containerRef = useRef(null);
  
  // Track scroll progress over this container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Start when the top of the element hits the bottom of the viewport
    // End when the center of the element hits the center of the viewport
    offset: ["start 90%", "center center"] 
  });

  const words = text.split(" ");

  return (
    <div 
      ref={containerRef} 
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '0.25em',
        perspective: '1000px', // Crucial for the 3D hinge effect
        ...style
      }}
    >
      {words.map((word, i) => {
        // Calculate dynamic stagger range for each word
        const step = 1 / words.length;
        const start = i * step * 0.5; // Starts progressively later
        const end = start + 0.5;      // Takes 50% of the scroll to complete

        // 3D transformations bound to scroll progress
        const rotateX = useTransform(scrollYProgress, [start, end], [80, 0]);
        const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
        const y = useTransform(scrollYProgress, [start, end], [40, 0]);

        return (
          <motion.span
            key={i}
            style={{
              rotateX,
              opacity,
              y,
              transformOrigin: "bottom center",
              display: 'inline-block',
              transformStyle: 'preserve-3d',
              willChange: 'transform, opacity'
            }}
          >
            {word}
          </motion.span>
        );
      })}
    </div>
  );
}
