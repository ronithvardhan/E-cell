import React from 'react';
import { motion } from 'framer-motion';

const waypointsData = [
  {
    id: 1,
    title: "The Starting Line",
    description: "Every great startup begins with a spark. Our ideation workshops help you find your engine.",
    color: "#E4472E", // Vermilion — Energy, action, entrepreneurship
    align: "left"
  },
  {
    id: 2,
    title: "Building the Chassis",
    description: "Hands-on technical workshops to build your MVP. Learn to code, design, and prototype.",
    color: "#3157A4", // Cobalt — Intelligence, technology, credibility
    align: "right"
  },
  {
    id: 3,
    title: "The Accelerator",
    description: "Join our incubation cohort. Get mentorship, funding, and the tools to shift into high gear.",
    color: "#168C83", // Teal — Innovation, exploration, fresh thinking
    align: "left"
  },
  {
    id: 4,
    title: "Reaching the Destination",
    description: "Pitching in front of VCs and angel investors. The final stretch before your startup goes public.",
    color: "#E5A900", // Saffron — Curiosity, optimism, bright ideas
    align: "right"
  },
  {
    id: 5,
    title: "ARE YOU READY?",
    description: "Join us in our journey of transforming ideas into reality.",
    color: "#E4472E", // Vermilion — CTA energy
    align: "center"
  }
];

export default function Waypoints() {
  return (
    <div className="relative py-12 md:py-24 px-4 sm:px-6 max-w-5xl mx-auto manrope" style={{ color: 'var(--text-primary)' }}>
      
      {/* Section Header */}
      <div className="text-center mb-20 md:mb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-[1px] w-8" style={{ backgroundColor: 'rgba(228,71,46,0.5)' }}></div>
            <span className="text-[10px] tracking-[0.3em] uppercase font-bold" style={{ color: '#E4472E' }}>The Blueprint</span>
            <div className="h-[1px] w-8" style={{ backgroundColor: 'rgba(228,71,46,0.5)' }}></div>
          </div>
          <h2 className="serif text-5xl md:text-7xl mb-6 leading-tight">The Journey</h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            From a raw spark to a fully actualized venture, we are with you at every waypoint.
          </p>
        </motion.div>
      </div>

      <div className="relative">
        {/* Timeline glowing line */}
        <div
          className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] transform md:-translate-x-1/2 rounded-full overflow-hidden"
          style={{ backgroundColor: 'var(--glass-border)' }}
        >
          <motion.div 
            style={{ height: '30%', background: 'linear-gradient(to bottom, #E4472E, rgba(229,169,0,0.4), transparent)' }}
            initial={{ y: "-100%" }}
            whileInView={{ y: ["100%", "300%"] }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          />
        </div>

        {waypointsData.map((wp, index) => {
          const isCenter = wp.align === 'center';
          const isLeft = wp.align === 'left';
          
          return (
            <motion.div 
              key={wp.id} 
              className={`relative flex items-center mb-16 md:mb-24 ${
                isCenter
                  ? 'justify-center'
                  : isLeft
                  ? 'justify-start'
                  : 'justify-end md:justify-end justify-start'
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              {/* Timeline Dot */}
              <div 
                className="absolute left-[16px] md:left-1/2 transform md:-translate-x-1/2 w-[10px] h-[10px] rounded-full z-10 hidden sm:block"
                style={{ backgroundColor: wp.color, boxShadow: `0 0 16px ${wp.color}60` }}
              />

              <div className={`ml-12 md:ml-0 ${isCenter ? 'w-full md:w-2/3 text-center' : 'w-full md:w-[45%]'}`}>
                <div 
                  className="p-8 md:p-10 rounded-3xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500 cursor-default"
                  style={{ 
                    background: 'var(--glass-bg)', 
                    border: `1px solid ${wp.color}25`, 
                    backdropFilter: 'blur(16px)' 
                  }}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
                    style={{ background: `radial-gradient(circle at center, ${wp.color}0A, transparent 70%)` }}
                  />
                  
                  <span
                    className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4 block"
                    style={{ color: wp.color }}
                  >
                    Waypoint 0{index + 1}
                  </span>
                  
                  <h3 className="serif text-3xl md:text-4xl mb-4" style={{ color: 'var(--text-primary)' }}>
                    {wp.title}
                  </h3>
                  
                  <p className="font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {wp.description}
                  </p>

                  {/* Bottom accent bar using E-Cell brand color */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px] opacity-40 pointer-events-none"
                    style={{ background: `linear-gradient(to right, ${wp.color}, transparent)` }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
