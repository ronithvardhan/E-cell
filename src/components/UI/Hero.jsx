import React, { Suspense, lazy, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Lazy load Spline to improve initial page load performance
const Spline = lazy(() => import('@splinetool/react-spline'));

export default function Hero() {
  const letters = ['E', '-', 'C', 'E', 'L', 'L'];
  const containerRef = useRef(null);

  // Aggressively hide the Spline watermark via MutationObserver
  useEffect(() => {
    const hideWatermark = () => {
      if (!containerRef.current) return;
      // The watermark is an <a> tag with the Spline logo, rendered by the spline-viewer web component
      const allLinks = containerRef.current.querySelectorAll('a[href*="spline"]');
      allLinks.forEach(el => el.style.display = 'none');

      // Also try inside Shadow DOM of spline-viewer
      const splineViewer = containerRef.current.querySelector('spline-viewer');
      if (splineViewer?.shadowRoot) {
        const logo = splineViewer.shadowRoot.getElementById('logo');
        if (logo) logo.style.display = 'none';
        // Also hide any <a> links inside shadow root
        splineViewer.shadowRoot.querySelectorAll('a').forEach(el => el.style.display = 'none');
        // Inject a <style> into the shadow root to keep it hidden permanently
        if (!splineViewer.shadowRoot.querySelector('#hide-watermark-style')) {
          const style = document.createElement('style');
          style.id = 'hide-watermark-style';
          style.textContent = '#logo, a[href*="spline"] { display: none !important; }';
          splineViewer.shadowRoot.appendChild(style);
        }
      }
    };

    // Run immediately
    hideWatermark();

    // Watch for DOM changes (Spline renders asynchronously)
    const observer = new MutationObserver(hideWatermark);
    if (containerRef.current) {
      observer.observe(containerRef.current, { childList: true, subtree: true });
    }

    // Also poll a few times as a safety net
    const timers = [500, 1000, 2000, 4000].map(ms => setTimeout(hideWatermark, ms));

    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  const handleSplineLoad = (splineApp) => {
    // Attempt to hide the text behind the robot ("neobot")
    const allObjects = splineApp.getAllObjects();
    
    allObjects.forEach(obj => {
      const name = obj.name.toLowerCase();
      // Hide the text background layer which is composed of "logo" and "Shape X" objects
      if (name === 'logo' || name.startsWith('shape ')) {
        obj.visible = false;
      }
    });
  };

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      
      {/* 3D Spline Background */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <Suspense fallback={<div style={{ width: '100%', height: '100%', backgroundColor: 'var(--bg-primary)' }} />}>
          <Spline 
            scene="https://prod.spline.design/hgZfrvSoh4-Lwllz/scene.splinecode" 
            onLoad={handleSplineLoad}
          />
        </Suspense>
      </div>

      {/* Watermark cover — sits above the Spline layer as a visual failsafe */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: '250px',
        height: '60px',
        background: '#F7F1E3', /* exact --ecell-warm-ivory hex value */
        zIndex: 9,
        pointerEvents: 'none'
      }} />

      {/* Foreground Overlay */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          zIndex: 10,
          pointerEvents: 'none', // Let clicks pass through to Spline
          marginTop: '40px'
        }}
      >
        <h1 
          className="select-none" 
          style={{ 
            lineHeight: 1, 
            margin: 0,
            textTransform: 'uppercase',
            display: 'inline-block' 
          }}
        >
          <span 
            style={{ 
              display: 'block', 
              overflow: 'hidden',
              fontSize: 'clamp(4.2rem, 14vw, 11rem)', // Increased size further
              fontWeight: 800
            }}
          >
            {letters.map((letter, i) => (
              <span 
                key={i}
                style={{ 
                  display: 'inline-block', 
                  animation: `letterSlideIn 0.8s ease-out forwards`,
                  animationDelay: `${i * 0.1}s`,
                  transform: 'translateY(-100%)', 
                  opacity: 0, 
                  clipPath: 'inset(0 0 100% 0)',
                  // Apply gradient individually to bypass transform clipping bugs
                  background: 'linear-gradient(90deg, var(--ecell-vermilion) 0%, var(--ecell-saffron) 100%)',
                  backgroundSize: `${letters.length * 100}% 100%`,
                  backgroundPosition: `${(i / (letters.length - 1)) * 100}% 0`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent' // Fallback
                }}
              >
                {letter}
              </span>
            ))}
            
            <style>
              {`
                @keyframes letterSlideIn {
                  0% {
                    transform: translateY(-100%);
                    opacity: 0;
                    clip-path: inset(0 0 100% 0);
                  }
                  50% {
                    opacity: 0.5;
                    clip-path: inset(0 0 50% 0);
                  }
                  100% {
                    transform: translateY(0);
                    opacity: 1;
                    clip-path: inset(0 0 0% 0);
                  }
                }
              `}
            </style>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }} // Delay to appear after letters
          style={{
            fontSize: 'clamp(0.96rem, 1.8vw, 1.32rem)', // Increased by 20%
            color: '#FFFFFF', // Changed to pure white
            marginTop: '0.2rem',
            letterSpacing: '0.6em', // Slightly increased spacing to compensate for smaller size
            textTransform: 'uppercase',
            fontWeight: 600
          }}
        >
          UCEOU
        </motion.p>
      </div>
    </div>
  );
}
