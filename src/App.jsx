import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/UI/Navbar';
import Home from './pages/Home';
import Initiatives from './pages/Initiatives';
import Team from './pages/Team';
import Sponsors from './pages/Sponsors';
import Events from './pages/Events';
import Announcements from './pages/Announcements';

import Auth from './pages/Auth';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
          <a href="#main-content" className="skip-link">Skip to main content</a>
          <Navbar />

          {/* Main Content Area */}
          <main id="main-content" style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/initiatives" element={<Initiatives />} />
              <Route path="/team" element={<Team />} />
              <Route path="/sponsors" element={<Sponsors />} />
              <Route path="/events" element={<Events />} />
              <Route path="/announcements" element={<Announcements />} />

              <Route path="/auth" element={<Auth />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;