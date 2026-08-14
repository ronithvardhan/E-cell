import React from "react";
import { motion } from "framer-motion";

const LinkedinIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);
const TwitterIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);
const InstagramIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);
import { Autoplay, EffectCreative, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";

const teamMembers = [
  { name: "John Doe", role: "President", quote: "Building the future of entrepreneurship, one idea at a time.", image: "https://i.pravatar.cc/400?img=11", socials: { linkedin: "#", twitter: "#", instagram: "#" } },
  { name: "Jane Smith", role: "Vice President", quote: "Innovation is the key to unlocking true potential.", image: "https://i.pravatar.cc/400?img=12", socials: { linkedin: "#", twitter: "#", instagram: "#" } },
  { name: "Alice Johnson", role: "Treasurer", quote: "Ensuring our resources are utilized to their maximum impact.", image: "https://i.pravatar.cc/400?img=13", socials: { linkedin: "#", twitter: "#", instagram: "#" } },
  { name: "Bob Williams", role: "PR Team Lead", quote: "Connecting brilliant minds and fostering lifelong relationships.", image: "https://i.pravatar.cc/400?img=14", socials: { linkedin: "#", twitter: "#", instagram: "#" } },
  { name: "Charlie Brown", role: "Design Lead", quote: "Good design is good business. Let's make it beautiful.", image: "https://i.pravatar.cc/400?img=15", socials: { linkedin: "#", twitter: "#", instagram: "#" } },
  { name: "Diana Prince", role: "Logistics Lead", quote: "Execution is everything. The magic is in the details.", image: "https://i.pravatar.cc/400?img=16", socials: { linkedin: "#", twitter: "#", instagram: "#" } },
  { name: "Eve Davis", role: "Tech Team Lead", quote: "Code is poetry. Building robust systems for the future.", image: "https://i.pravatar.cc/400?img=17", socials: { linkedin: "#", twitter: "#", instagram: "#" } },
  { name: "Frank Miller", role: "Media Team Lead", quote: "A picture is worth a thousand words. Let's tell our story.", image: "https://i.pravatar.cc/400?img=18", socials: { linkedin: "#", twitter: "#", instagram: "#" } },
  { name: "Grace Lee", role: "Editorial Team Lead", quote: "Words have power. Curating the voice of tomorrow.", image: "https://i.pravatar.cc/400?img=19", socials: { linkedin: "#", twitter: "#", instagram: "#" } },
  { name: "Henry Taylor", role: "Social Media Leader", quote: "Engage, inspire, connect. Building our digital community.", image: "https://i.pravatar.cc/400?img=20", socials: { linkedin: "#", twitter: "#", instagram: "#" } },
  { name: "Ivy Clark", role: "General Secretary", quote: "Supporting the vision at every step of the journey.", image: "https://i.pravatar.cc/400?img=21", socials: { linkedin: "#", twitter: "#", instagram: "#" } },
];

export default function TeamCarousel() {
  const css = `
    .team-carousel-container {
      width: 100%;
      height: 480px;
      padding-bottom: 60px !important;
      position: relative;
    }
    
    .team-carousel-container .swiper-slide {
      background-position: center;
      background-size: cover;
      border-radius: 40px;
      clip-path: inset(0 round 40px); /* Strict clipping to fix WebKit 3D backdrop-filter bug */
      -webkit-clip-path: inset(0 round 40px);
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.15);
      background: rgba(15, 32, 60, 0.75);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      
      /* Hardware acceleration fixes */
      transform: translateZ(0);
      -webkit-transform: translateZ(0);
    }

    .swiper-slide-shadow {
      display: none !important;
    }

    .team-carousel-container .swiper-pagination-bullet {
      background-color: var(--brand-primary) !important;
      width: 10px;
      height: 10px;
      transition: all 0.3s ease;
    }
    
    .team-carousel-container .swiper-pagination-bullet-active {
      width: 24px;
      border-radius: 5px;
    }
    
    .nav-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 10;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: var(--brand-primary);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(228, 71, 46, 0.4);
      transition: all 0.3s ease;
    }
    
    .nav-btn:hover {
      transform: translateY(-50%) scale(1.1);
      background: var(--brand-secondary);
    }
    
    .nav-btn.swiper-button-disabled {
      opacity: 0;
      pointer-events: none;
    }
    
    .nav-prev { left: -25px; }
    .nav-next { right: -25px; }
    
    @media (max-width: 768px) {
      .team-card-inner {
        flex-direction: column !important;
      }
      .team-img-wrapper {
        flex: 0 0 200px !important;
      }
      .team-role {
        position: relative !important;
        bottom: 0 !important;
        right: 0 !important;
        margin-top: 1.5rem;
        text-align: right;
      }
    }
  `;

  return (
    <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
      <style>{css}</style>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Swiper
          spaceBetween={40}
          autoplay={{
            delay: 4000,
            disableOnInteraction: true,
          }}
          effect="creative"
          grabCursor={true}
          slidesPerView={1}
          centeredSlides={true}
          loop={true}
          pagination={{
            clickable: true,
          }}
          creativeEffect={{
            prev: {
              shadow: false,
              translate: ["-20%", 0, -400],
              opacity: 0,
            },
            next: {
              shadow: false,
              translate: ["100%", 0, 0],
            },
          }}
          navigation={{
            prevEl: '.custom-nav-prev',
            nextEl: '.custom-nav-next',
          }}
          modules={[EffectCreative, Pagination, Autoplay, Navigation]}
          className="team-carousel-container"
        >
          {teamMembers.map((member, index) => (
            <SwiperSlide key={index}>
              <div style={{ display: 'flex', height: '100%', width: '100%' }}>
                
                {/* Left side: Image */}
                <div style={{ width: '40%', height: '100%', position: 'relative' }}>
                  <img
                    src={member.image}
                    alt={member.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to right, rgba(15, 32, 60, 0) 60%, rgba(15, 32, 60, 1) 100%)' }} />
                </div>
                
                {/* Right side: Content */}
                <div style={{ padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '60%', position: 'relative' }}>
                  
                  {/* Name */}
                  <h2 style={{ 
                    fontFamily: 'var(--font-heading)', 
                    fontSize: 'clamp(2rem, 4vw, 3.5rem)', 
                    color: '#ffffff', 
                    margin: '0 0 1rem 0',
                    lineHeight: '1.1',
                    textTransform: 'uppercase'
                  }}>
                    {member.name}
                  </h2>
                  
                  {/* Quote */}
                  <p style={{ 
                    fontSize: '1.25rem', 
                    color: 'rgba(255, 255, 255, 0.85)', 
                    fontStyle: 'italic', 
                    lineHeight: '1.6',
                    position: 'relative',
                    paddingLeft: '1rem',
                    borderLeft: '3px solid var(--brand-primary)',
                    maxWidth: '85%'
                  }}>
                    "{member.quote}"
                  </p>
                  
                  {/* Social Handles */}
                  <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto', position: 'relative', zIndex: 20 }}>
                    <a href={member.socials.linkedin} style={{ color: '#ffffff', transition: 'color 0.2s ease' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--brand-primary)'} onMouseOut={(e) => e.currentTarget.style.color = '#ffffff'}>
                      <LinkedinIcon size={24} />
                    </a>
                    <a href={member.socials.twitter} style={{ color: '#ffffff', transition: 'color 0.2s ease' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--brand-primary)'} onMouseOut={(e) => e.currentTarget.style.color = '#ffffff'}>
                      <TwitterIcon size={24} />
                    </a>
                    <a href={member.socials.instagram} style={{ color: '#ffffff', transition: 'color 0.2s ease' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--brand-primary)'} onMouseOut={(e) => e.currentTarget.style.color = '#ffffff'}>
                      <InstagramIcon size={24} />
                    </a>
                  </div>
                  
                  {/* Role Floating in Bottom Right */}
                  <div style={{
                    position: 'absolute',
                    bottom: '2rem',
                    right: '2rem',
                    color: 'var(--brand-primary)',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    zIndex: 20
                  }}>
                    {member.role}
                  </div>
                  
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* Invisible Click Zones for Navigation */}
          <div className="custom-nav-prev" style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '15%', zIndex: 10, cursor: 'pointer' }} />
          <div className="custom-nav-next" style={{ position: 'absolute', top: 0, right: 0, bottom: '25%', width: '15%', zIndex: 10, cursor: 'pointer' }} />
          
        </Swiper>
      </motion.div>
    </div>
  );
}
