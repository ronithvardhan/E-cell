import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/UI/Navbar';
import Home from './pages/Home';
import Initiatives from './pages/Initiatives';
import Team from './pages/Team';
import Sponsors from './pages/Sponsors';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Announcements from './pages/Announcements';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

// Paths where the Navbar should be hidden
const HIDE_NAVBAR_PATHS = ['/auth'];

function Layout() {
  const location = useLocation();
  const hideNavbar = HIDE_NAVBAR_PATHS.includes(location.pathname);

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      {!hideNavbar && <Navbar />}

      {/* Main Content Area */}
      <main id="main-content" style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/initiatives" element={<Initiatives />} />
          <Route path="/team" element={<Team />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Layout />
      </Router>
    </ErrorBoundary>
  );
}

export default App;