import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Word = ({ word, i, total, scrollYProgress }) => {
  const step = 1 / total;
  const start = i * step * 0.5;
  const end = start + 0.5;

  const rotateX = useTransform(scrollYProgress, [start, end], [80, 0]);
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const y = useTransform(scrollYProgress, [start, end], [40, 0]);

  return (
    <motion.span
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
};

export default function TextReveal3D({ text, style = {} }) {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
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
        perspective: '1000px',
        ...style
      }}
    >
      {words.map((word, i) => (
        <Word key={i} word={word} i={i} total={words.length} scrollYProgress={scrollYProgress} />
      ))}
    </div>
  );
}
