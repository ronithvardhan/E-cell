import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TextReveal3DGSAP({ text }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = textRef.current.querySelectorAll('.word');
      
      gsap.fromTo(
        words,
        {
          opacity: 0,
          rotationX: -90, // Folded down in 3D space
          y: 150, // Drops straight down
          z: -100, // Pushed back slightly
          transformOrigin: '50% 100%' // Hinge squarely from the bottom center
        },
        {
          opacity: 1,
          rotationX: 0,
          y: 0,
          z: 0,
          stagger: 0.15,
          duration: 1.5,
          ease: 'power2.inOut', // S-curve velocity map (curvature in motion)
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            end: 'center center',
            scrub: 2, // Extremely smooth scrub
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Ensure text is an array for row-by-row rendering
  const lines = Array.isArray(text) ? text : [text];

  return (
    <div 
      ref={containerRef} 
      style={{
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        perspective: '1500px', // Deeper perspective for intense 3D curve
        width: '100%',
        padding: '2rem 0'
      }}
    >
      <h2 
        ref={textRef} 
        style={{ 
          margin: 0, 
          display: 'flex', 
          flexDirection: 'column', // Each item on a new row
          alignItems: 'center',
          rowGap: '0.4em', 
          fontFamily: '"Orbitron", "Arial Black", Impact, system-ui, sans-serif', // Extremely thick font stack
          fontSize: 'clamp(4rem, 9vw, 9rem)', // Even larger
          fontWeight: 900, // Maximum thickness
          lineHeight: 1,
          color: '#ffffff',
          textAlign: 'center',
          maxWidth: '1200px'
        }}
      >
        {lines.map((line, lineIndex) => (
          <div key={lineIndex} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', columnGap: '0.3em' }}>
            {line.split(' ').map((word, index) => (
              <span 
                key={index} 
                className="word" 
                style={{ 
                  display: 'inline-block', 
                  transformStyle: 'preserve-3d', 
                  willChange: 'transform, opacity',
                  // Extruded 3D Text Shadow Effect
                  textShadow: '0 1px 0 #9c9c9c, 0 2px 0 #888, 0 3px 0 #777, 0 4px 0 #666, 0 5px 0 #555, 0 6px 15px rgba(0,0,0,0.6)'
                }}
              >
                {word}
              </span>
            ))}
          </div>
        ))}
      </h2>
    </div>
  );
}
