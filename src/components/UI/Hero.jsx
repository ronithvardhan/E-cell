import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    
    // Clear any existing canvas
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const count = 1500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for(let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 25;
      colors[i] = Math.random();
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const material = new THREE.PointsMaterial({
      size: 0.025,
      color: 0xE4472E, // E-Cell Vermilion
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);
    camera.position.z = 10;

    let mouseX = 0, mouseY = 0;
    let mouseMoveThrottled = false;
    const handleMouseMove = (e) => {
      if (mouseMoveThrottled) return;
      mouseMoveThrottled = true;
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      requestAnimationFrame(() => { mouseMoveThrottled = false; });
    };
    document.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animationFrameId;
    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      points.rotation.y += 0.0005;
      points.rotation.x += 0.0002;
      
      points.position.x += (mouseX * 0.5 - points.position.x) * 0.05;
      points.position.y += (-mouseY * 0.5 - points.position.y) * 0.05;
      
      renderer.render(scene, camera);
    }

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-screen flex flex-col justify-center p-6 md:p-12 overflow-hidden pointer-events-none">
      
      {/* Interactive Background Layer */}
      <div 
        ref={containerRef}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'auto' }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-end pb-12 md:pb-24 manrope pointer-events-none">
          
          <div className="md:col-span-9 fade-in-up pointer-events-none" style={{ transform: 'translateY(60px)' }}>
            
            <div className="mb-8 inline-flex items-center gap-4">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: '#E4472E' }}></span>
                <span className="relative inline-flex rounded-full h-3 w-3" style={{ backgroundColor: '#E4472E' }}></span>
              </div>
              <span className="text-[10px] tracking-[0.4em] uppercase font-bold" style={{ color: 'rgba(229,169,0,0.7)' }}>Ideas Igniting · BPHC</span>
            </div>

            <h1 className="serif mb-10 pointer-events-auto"
              style={{ color: 'var(--text-primary)', fontSize: 'clamp(3.5rem, 12vw, 10rem)', lineHeight: 0.85, letterSpacing: '-0.04em' }}>
              Innovation<br/>
              <span style={{ color: 'transparent', WebkitTextStroke: '1px var(--text-muted)' }}>
                from chaos.
              </span>
            </h1>

            <div className="flex flex-col md:flex-row gap-10 items-start md:items-center pointer-events-auto">
              <button 
                className="btn-glow" 
                style={{ 
                  background: 'linear-gradient(135deg, var(--brand-primary) 0%, #C53821 100%)', 
                  color: 'white', 
                  padding: '20px 48px', 
                  fontWeight: 800, 
                  borderRadius: '9999px', 
                  fontSize: '0.9rem', 
                  letterSpacing: '0.06em',
                  cursor: 'pointer',
                  boxShadow: '0 0 30px rgba(228,71,46,0.3)',
                  border: '1px solid rgba(228,71,46,0.4)'
                }}>
                EXPLORE INITIATIVES
              </button>

              <div className="flex items-center gap-6">
                <div className="h-12 w-[1px] bg-white/10 hidden md:block"></div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase mb-1" style={{ color: 'rgba(49,87,164,0.7)' }}>Est. BPHC 2018</span>
                  <span className="text-sm font-medium" style={{ color: '#E5A900' }}>Entrepreneurship Cell</span>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 fade-in-up pointer-events-auto" style={{ animationDelay: '0.4s', transform: 'translateY(60px)' }}>
            <div className="p-8 rounded-3xl"
              style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', backdropFilter: 'blur(12px)' }}>
              <p className="text-lg leading-relaxed font-light" style={{ color: 'var(--text-secondary)' }}>
                We inspire students to explore ideas, experiment fearlessly, build solutions, and create impact.
              </p>
              <div className="mt-6 flex gap-2">
                <div className="h-1 w-8 rounded-full" style={{ backgroundColor: 'rgba(228,71,46,0.5)' }}></div>
                <div className="h-1 w-2 rounded-full" style={{ backgroundColor: 'rgba(22,140,131,0.4)' }}></div>
                <div className="h-1 w-2 rounded-full" style={{ backgroundColor: 'rgba(229,169,0,0.4)' }}></div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

