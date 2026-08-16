import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { useLocation } from "react-router-dom";

export const RadialBackground = () => {
  const { theme } = useTheme();
  const location = useLocation();
  const isEventsPage = location.pathname.startsWith('/events');

  // ONLY render the dark mode vignette if theme is STRICTLY 'dark' AND we are on the events page
  if (theme === "dark" && isEventsPage) {
    return (
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] pointer-events-none"></div>
    );
  }

  // Render absolutely nothing in light mode or on non-event pages
  return null;
};

