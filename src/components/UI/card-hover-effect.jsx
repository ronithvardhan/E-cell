import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const HoverEffect = ({ items, className = "" }) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "1.5rem",
        padding: "2.5rem 0",
      }}
      className={className}
    >
      {items.map((item, idx) => (
        <div
          key={item?.title || idx}
          style={{
            position: "relative",
            display: "block",
            padding: "0.5rem",
            height: "100%",
            width: "100%",
            cursor: "pointer",
          }}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                style={{
                  position: "absolute",
                  inset: 0,
                  height: "100%",
                  width: "100%",
                  background: "linear-gradient(135deg, var(--brand-primary) 0%, rgba(22, 140, 131, 0.2) 100%)", 
                  display: "block",
                  borderRadius: "1.5rem",
                  zIndex: 0,
                  filter: "blur(12px)", // Gives it a glowing aura effect
                  opacity: 0.8
                }}
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 0.8,
                  transition: { duration: 0.3 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.3, delay: 0.1 },
                }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 30,
                  mass: 0.8,
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            {item.icon && (
              <div 
                style={{ 
                  marginBottom: "1.5rem", 
                  background: "rgba(22,140,131,0.15)", 
                  width: "60px", 
                  height: "60px", 
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(22,140,131,0.3)"
                }}
              >
                {item.icon}
              </div>
            )}
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className = "",
  children,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderRadius: "1.25rem",
        height: "100%",
        width: "100%",
        padding: "1.5rem",
        overflow: "hidden",
        backgroundColor: "var(--bg-primary)", // slightly transparent so aura shines through
        border: isHovered ? "1px solid var(--brand-primary)" : "1px solid var(--glass-border)",
        boxShadow: isHovered ? "0 10px 30px -10px var(--brand-primary)" : "0 4px 20px rgba(0,0,0,0.4)",
        position: "relative",
        zIndex: 20,
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
      }}
      className={className}
    >
      <div style={{ position: "relative", zIndex: 50 }}>
        <div style={{ padding: "1rem" }}>{children}</div>
      </div>
    </div>
  );
};

export const CardTitle = ({
  className = "",
  children,
}) => {
  return (
    <h4 
      style={{
        color: "#f4f4f5", // text-zinc-100
        fontWeight: "bold",
        letterSpacing: "0.025em",
        marginTop: "1rem",
        fontSize: "1.25rem",
        fontFamily: "var(--font-heading)"
      }}
      className={className}
    >
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className = "",
  children,
}) => {
  return (
    <p
      style={{
        marginTop: "2rem",
        color: "#a1a1aa", // text-zinc-400
        letterSpacing: "0.025em",
        lineHeight: 1.625,
        fontSize: "0.875rem",
      }}
      className={className}
    >
      {children}
    </p>
  );
};
