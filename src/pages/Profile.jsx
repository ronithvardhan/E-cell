import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  User, Mail, GraduationCap, CalendarCheck, Bookmark,
  Settings, LogOut, ChevronRight, Award, Star, TrendingUp, ArrowLeft
} from 'lucide-react';
import { EVENTS } from '../data/events';

const MOCK_USER = {
  name: "Ronit Vardhan",
  email: "ronit@uceou.ac.in",
  role: "Member",
  department: "Computer Science & Engineering",
  year: "3rd Year",
  joinedDate: "August 2024",
  eventsAttended: 7,
  upcomingEvents: 3,
  avatarInitials: "RV",
};

// Pick a few events as "registered"
const REGISTERED_EVENTS = EVENTS.slice(0, 3);

function StatCard({ icon, value, label, color }) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(0,0,0,0.1)' }}
      style={{
        background: 'white', borderRadius: '16px', padding: '1.5rem',
        border: '1px solid rgba(0,0,0,0.07)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
        cursor: 'default', transition: 'box-shadow 0.25s ease',
      }}
    >
      <div style={{
        width: '48px', height: '48px', borderRadius: '50%',
        background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <span style={{ color }}>{icon}</span>
      </div>
      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
        {value}
      </div>
      <div style={{ fontSize: '0.8rem', color: '#888', fontWeight: 500, textAlign: 'center' }}>{label}</div>
    </motion.div>
  );
}

export default function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('events');

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', paddingTop: '7rem', paddingBottom: '5rem' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 5vw' }}>

        {/* Back link */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Link to="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            color: '#888', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none',
            marginBottom: '2rem'
          }}>
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </motion.div>

        {/* Profile Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background: 'white', borderRadius: '24px', overflow: 'hidden',
            border: '1px solid rgba(0,0,0,0.07)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.07)',
            marginBottom: '2rem'
          }}
        >
          {/* Cover banner */}
          <div style={{
            height: '120px',
            background: 'linear-gradient(135deg, var(--ecell-vermilion) 0%, var(--ecell-cobalt) 60%, var(--ecell-teal) 100%)',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.12) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 50%)'
            }} />
          </div>

          <div style={{ padding: '0 2rem 2rem' }}>
            {/* Avatar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '-36px', marginBottom: '1.25rem' }}>
              <motion.div
                whileHover={{ scale: 1.06 }}
                style={{
                  width: '80px', height: '80px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--ecell-vermilion), var(--ecell-cobalt))',
                  border: '4px solid white', boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontWeight: 800, fontSize: '1.6rem',
                  fontFamily: 'var(--font-heading)', cursor: 'default', flexShrink: 0
                }}
              >
                {MOCK_USER.avatarInitials}
              </motion.div>

              <div style={{ display: 'flex', gap: '0.75rem', paddingBottom: '0.25rem' }}>
                <motion.button
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  style={{
                    background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.1)',
                    borderRadius: '9999px', padding: '0.45rem 1rem',
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                    cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem',
                    color: 'var(--text-primary)', fontFamily: 'var(--font-body)'
                  }}
                >
                  <Settings size={15} /> Edit Profile
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/auth')}
                  style={{
                    background: 'rgba(228,71,46,0.08)', border: '1px solid rgba(228,71,46,0.2)',
                    borderRadius: '9999px', padding: '0.45rem 1rem',
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                    cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem',
                    color: 'var(--brand-primary)', fontFamily: 'var(--font-body)'
                  }}
                >
                  <LogOut size={15} /> Sign Out
                </motion.button>
              </div>
            </div>

            {/* Name & Details */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
              <div>
                <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.7rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  {MOCK_USER.name}
                </h1>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem', alignItems: 'center' }}>
                  <span style={{
                    padding: '0.2rem 0.75rem', borderRadius: '9999px',
                    background: 'linear-gradient(135deg, var(--ecell-vermilion), var(--ecell-cobalt))',
                    color: 'white', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.04em'
                  }}>
                    {MOCK_USER.role}
                  </span>
                  <span style={{ color: '#888', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <GraduationCap size={14} /> {MOCK_USER.department} · {MOCK_USER.year}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '1.25rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                  <span style={{ color: '#666', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Mail size={14} /> {MOCK_USER.email}
                  </span>
                  <span style={{ color: '#666', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <CalendarCheck size={14} /> Member since {MOCK_USER.joinedDate}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '2rem' }}
        >
          <StatCard icon={<Award size={22} />} value={MOCK_USER.eventsAttended} label="Events Attended" color="var(--brand-primary)" />
          <StatCard icon={<CalendarCheck size={22} />} value={MOCK_USER.upcomingEvents} label="Upcoming Events" color="var(--ecell-teal)" />
          <StatCard icon={<Star size={22} />} value="4" label="Events Saved" color="var(--ecell-saffron)" />
          <StatCard icon={<TrendingUp size={22} />} value="Top 10%" label="Engagement" color="var(--ecell-cobalt)" />
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          style={{
            background: 'white', borderRadius: '20px', overflow: 'hidden',
            border: '1px solid rgba(0,0,0,0.07)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
          }}
        >
          {/* Tab Headers */}
          <div style={{ display: 'flex', borderBottom: '1px solid rgba(0,0,0,0.07)', padding: '0 1.5rem' }}>
            {[
              { key: 'events', label: 'My Events', icon: <CalendarCheck size={16} /> },
              { key: 'saved', label: 'Saved', icon: <Bookmark size={16} /> },
              { key: 'about', label: 'About', icon: <User size={16} /> },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  padding: '1rem 1.25rem', fontWeight: 600, fontSize: '0.9rem',
                  border: 'none', background: 'transparent', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                  color: activeTab === tab.key ? 'var(--brand-primary)' : '#888',
                  borderBottom: activeTab === tab.key ? '2px solid var(--brand-primary)' : '2px solid transparent',
                  transition: 'all 0.2s ease', fontFamily: 'var(--font-body)',
                  marginBottom: '-1px'
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div style={{ padding: '1.5rem' }}>

            {activeTab === 'events' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p style={{ color: '#888', fontSize: '0.85rem', margin: '0 0 0.5rem' }}>Events you're registered for:</p>
                {REGISTERED_EVENTS.map((ev, i) => (
                  <motion.div
                    key={ev.id}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    onClick={() => navigate(`/events/${ev.id}`)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '1rem',
                      padding: '1rem 1.25rem', borderRadius: '14px',
                      border: '1px solid rgba(0,0,0,0.07)',
                      cursor: 'pointer', transition: 'all 0.2s ease',
                      background: 'rgba(247,241,227,0.4)'
                    }}
                    whileHover={{ x: 4, background: 'rgba(228,71,46,0.04)', borderColor: 'rgba(228,71,46,0.2)' }}
                  >
                    <img
                      src={ev.image}
                      alt={ev.title}
                      style={{ width: '56px', height: '56px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ev.title}</div>
                      <div style={{ fontSize: '0.82rem', color: '#888' }}>{ev.date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} · {ev.location}</div>
                    </div>
                    <span style={{
                      padding: '0.2rem 0.7rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700,
                      background: ev.date > new Date() ? 'rgba(22,140,131,0.1)' : 'rgba(0,0,0,0.07)',
                      color: ev.date > new Date() ? 'var(--ecell-teal)' : '#888',
                      flexShrink: 0
                    }}>
                      {ev.date > new Date() ? 'Upcoming' : 'Attended'}
                    </span>
                    <ChevronRight size={16} color="#ccc" style={{ flexShrink: 0 }} />
                  </motion.div>
                ))}
                <Link to="/events" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  padding: '0.85rem', borderRadius: '12px',
                  border: '1.5px dashed rgba(228,71,46,0.3)',
                  color: 'var(--brand-primary)', fontWeight: 600, fontSize: '0.9rem',
                  textDecoration: 'none', marginTop: '0.25rem',
                  transition: 'all 0.2s ease'
                }}>
                  + Browse more events
                </Link>
              </div>
            )}

            {activeTab === 'saved' && (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#aaa' }}>
                <Bookmark size={40} style={{ marginBottom: '1rem', opacity: 0.4 }} />
                <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>No saved events yet</p>
                <p style={{ fontSize: '0.85rem' }}>Bookmark events from the events page to see them here.</p>
              </div>
            )}

            {activeTab === 'about' && (
              <div style={{ display: 'grid', gap: '1rem' }}>
                {[
                  { label: 'Full Name', value: MOCK_USER.name, icon: <User size={16} /> },
                  { label: 'Email Address', value: MOCK_USER.email, icon: <Mail size={16} /> },
                  { label: 'Department', value: MOCK_USER.department, icon: <GraduationCap size={16} /> },
                  { label: 'Year', value: MOCK_USER.year, icon: <GraduationCap size={16} /> },
                  { label: 'Member Since', value: MOCK_USER.joinedDate, icon: <CalendarCheck size={16} /> },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    padding: '0.9rem 1.1rem', borderRadius: '12px',
                    background: 'rgba(247,241,227,0.5)', border: '1px solid rgba(0,0,0,0.06)'
                  }}>
                    <span style={{ color: 'var(--brand-primary)' }}>{item.icon}</span>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#888', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{item.label}</div>
                      <div style={{ fontSize: '0.93rem', color: 'var(--text-primary)', fontWeight: 600, marginTop: '0.15rem' }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
