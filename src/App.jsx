import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/UI/Navbar';
import Home from './pages/Home';
import Initiatives from './pages/Initiatives';
import Team from './pages/Team';
import Sponsors from './pages/Sponsors';
import Events from './pages/Events';
import Registrations from './pages/Registrations';
import './index.css';

function App() {
  return (
    <Router>
      <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
        <Navbar />
        
        {/* Main Content Area */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/initiatives" element={<Initiatives />} />
          <Route path="/team" element={<Team />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/events" element={<Events />} />
          <Route path="/registrations" element={<Registrations />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
