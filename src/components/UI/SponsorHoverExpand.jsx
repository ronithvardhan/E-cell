import React, { useState } from "react";
import { motion } from "framer-motion";

export function HoverExpand({
  items,
  collapsedHeight = 70,
  expandedHeight = 300,
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <div style={{ width: '100%', borderTop: '1px solid rgba(255, 255, 255, 0.15)' }} />

      {items.map((item, i) => {
        const isHovered = hoveredIndex === i;
        const isOtherHovered = hoveredIndex !== null && !isHovered;

        return (
          <React.Fragment key={i}>
            <motion.div
              style={{
                position: 'relative',
                width: '100%',
                overflow: 'hidden',
                cursor: 'pointer',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                willChange: 'height, opacity',
                transform: 'translateZ(0)', /* Force GPU rendering */
                WebkitTransform: 'translateZ(0)'
              }}
              animate={{
                height: isHovered ? expandedHeight : collapsedHeight,
                opacity: isOtherHovered ? 0.38 : 1,
              }}
              transition={{
                height: {
                  type: "spring",
                  stiffness: 200, /* Smoother, less rigid spring */
                  damping: 30,
                  mass: 1,
                },
                opacity: { duration: 0.25, ease: "easeInOut" },
              }}
              onHoverStart={() => setHoveredIndex(i)}
              onHoverEnd={() => setHoveredIndex(null)}
              onClick={() => setHoveredIndex(isHovered ? null : i)}
            >
              {/* Image & Gradient Overlay */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  width: '100%',
                  height: '100%',
                  transformOrigin: 'center',
                  willChange: 'transform, opacity',
                  transform: 'translateZ(0)'
                }}
                initial={false}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  scale: isHovered ? 1 : 1.05,
                }}
                transition={{
                  opacity: { duration: 0.4, ease: [0.25, 1, 0.5, 1] },
                  scale: { duration: 0.6, ease: [0.25, 1, 0.5, 1] },
                }}
              >
                <img
                  src={item.image}
                  alt={item.imageAlt || item.label}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  loading="lazy"
                  decoding="async"
                />
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)'
                }} />
              </motion.div>

              {/* Content Overlay */}
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                display: 'flex',
                alignItems: 'flex-end',
                padding: '0 clamp(0.75rem, 3vw, 2rem) 1rem clamp(0.75rem, 3vw, 2rem)',
                pointerEvents: 'none'
              }}>
                <div style={{
                  display: 'flex',
                  width: '100%',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  gap: '1rem'
                }}>
                  
                  {/* Left Side: Number, Label, Description */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '1rem',
                    minWidth: 0,
                  }}>
                    <motion.span
                      style={{
                        fontSize: '1rem',
                        fontVariantNumeric: 'tabular-nums',
                        flexShrink: 0,
                        fontWeight: 600,
                        fontFamily: 'var(--font-heading)'
                      }}
                      animate={{
                        color: isHovered ? "var(--brand-primary)" : "rgba(255, 255, 255, 0.8)",
                        opacity: isHovered ? 1 : 0.6,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </motion.span>

                    <motion.span
                      style={{
                        fontWeight: 700,
                        letterSpacing: '-0.025em',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                        fontFamily: 'var(--font-heading)',
                        textTransform: 'uppercase'
                      }}
                      animate={{
                        color: isHovered ? "#ffffff" : "rgba(255, 255, 255, 0.9)",
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.label}
                    </motion.span>

                    {item.description && (
                      <motion.span
                        style={{
                          fontSize: '1rem',
                          color: 'rgba(255,255,255,0.85)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          fontStyle: 'italic',
                          display: 'none' /* Will be toggled on larger screens via CSS if needed, but flex handles it well enough */
                        }}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{
                          opacity: isHovered ? 1 : 0,
                          x: isHovered ? 0 : -8,
                          display: isHovered ? 'block' : 'none'
                        }}
                        transition={{
                          duration: 0.3,
                          delay: isHovered ? 0.12 : 0,
                          ease: [0.23, 1, 0.32, 1],
                        }}
                      >
                        — {item.description}
                      </motion.span>
                    )}
                  </div>

                  {/* Right Side: Sublabel */}
                  {item.sublabel && (
                    <motion.span
                      style={{
                        fontSize: '0.875rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        flexShrink: 0,
                        fontWeight: 600
                      }}
                      animate={{
                        color: isHovered
                          ? "rgba(255,255,255,0.7)"
                          : "rgba(255,255,255,0.6)",
                        opacity: isHovered ? 1 : 0.8,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.sublabel}
                    </motion.span>
                  )}
                </div>
              </div>
            </motion.div>

            <div style={{ width: '100%', borderTop: '1px solid rgba(255, 255, 255, 0.15)' }} />
          </React.Fragment>
        );
      })}
    </div>
  );
}
