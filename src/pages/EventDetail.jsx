import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, Calendar, Clock, Users, MapPin, Tag,
  Mic, CheckCircle, Share2, BookmarkPlus
} from 'lucide-react';
import { EVENTS } from '../data/events';

// ─── Palette ────────────────────────────────────────────────────────────────
const VERMILION = '#E4472E';
const COBALT    = '#3157A4';
const TEAL      = '#168C83';
const SAFFRON   = '#E5A900';

const card = {
  background: 'var(--glass-bg)',
  border: '1px solid var(--glass-border)',
  borderRadius: '16px',
};

function CountdownUnit({ value, label }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      background: `rgba(228,71,46,0.07)`,
      border: `1px solid rgba(228,71,46,0.18)`,
      borderRadius: '12px',
      padding: '0.75rem 0.5rem',
      minWidth: 0, flex: 1,
    }}>
      <span style={{
        fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.25rem, 4vw, 2rem)', fontWeight: 700,
        color: VERMILION, lineHeight: 1, fontVariantNumeric: 'tabular-nums'
      }}>
        {String(value).padStart(2, '0')}
      </span>
      <span style={{ fontSize: '0.6rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '0.3rem' }}>
        {label}
      </span>
    </div>
  );
}

export default function EventDetail() {
  const { id } = useParams();
  const event = EVENTS.find(e => e.id === id);

  const [timeLeft, setTimeLeft] = useState(() =>
    event ? Math.max(0, Math.floor((+event.date - Date.now()) / 1000)) : 0
  );
  const [registered, setRegistered] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!event) return;
    const interval = setInterval(() => {
      setTimeLeft(Math.max(0, Math.floor((+event.date - Date.now()) / 1000)));
    }, 1000);
    return () => clearInterval(interval);
  }, [event]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  if (!event) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', padding: '2rem', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--text-primary)', textAlign: 'center' }}>Event not found</h2>
        <Link to="/events" style={{ color: VERMILION, fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ArrowLeft size={18} /> Back to Events
        </Link>
      </div>
    );
  }

  const days    = Math.floor(timeLeft / 86400);
  const hours   = Math.floor((timeLeft % 86400) / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;
  const isPast  = timeLeft === 0;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', transition: 'background-color 0.3s ease, color 0.3s ease' }}>

      {/* Hero Image */}
      <div style={{ position: 'relative', height: 'clamp(250px, 50vh, 500px)', overflow: 'hidden' }}>
        <motion.img
          src={event.image}
          alt={event.title}
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        {/* Theme fade — matches the background */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, transparent 0%, transparent 40%, var(--bg-primary) 100%)'
        }} />

        {/* Back button */}
        <Link to="/events" style={{ textDecoration: 'none' }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              position: 'absolute', top: 'clamp(4.5rem, 12vw, 7rem)', left: 'clamp(1rem, 5vw, 5vw)',
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              background: 'var(--glass-bg)', backdropFilter: 'blur(12px)',
              color: 'var(--text-primary)', padding: '0.45rem 0.85rem',
              borderRadius: '9999px', fontWeight: 600, fontSize: '0.82rem',
              border: '1px solid var(--glass-border)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              cursor: 'pointer',
            }}
            whileHover={{ y: -2 }}
          >
            <ArrowLeft size={14} /> Back
          </motion.div>
        </Link>

        {/* Category Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          style={{
            position: 'absolute', top: 'clamp(4.5rem, 12vw, 7rem)', right: 'clamp(1rem, 5vw, 5vw)',
            background: VERMILION, color: 'white',
            padding: '0.3rem 0.85rem', borderRadius: '9999px',
            fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase',
            boxShadow: `0 4px 16px rgba(228,71,46,0.4)`
          }}
        >
          {event.category}
        </motion.div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 5vw) 4rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginTop: '-1.5rem', position: 'relative', zIndex: 2 }}
        >
          {/* Title + Actions Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div style={{ flex: '1 1 auto', minWidth: 0 }}>
              <h1 style={{
                fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 5vw, 3.5rem)',
                fontWeight: 800, color: 'var(--text-primary)', margin: 0, lineHeight: 1.1
              }}>
                {event.title}
              </h1>
              <p style={{ color: TEAL, fontWeight: 600, margin: '0.4rem 0 0', fontSize: 'clamp(0.82rem, 2vw, 1rem)' }}>
                {event.tagline}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexShrink: 0 }}>
              <motion.button
                onClick={() => setSaved(s => !s)}
                whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
                style={{
                  background: saved ? `rgba(228,71,46,0.12)` : 'rgba(255,255,255,0.05)',
                  border: saved ? `1px solid rgba(228,71,46,0.3)` : '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '9999px', padding: '0.4rem 0.75rem',
                  display: 'flex', alignItems: 'center', gap: '0.35rem',
                  cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem',
                  color: saved ? VERMILION : 'var(--text-secondary)',
                  transition: 'all 0.2s ease'
                }}
              >
                <BookmarkPlus size={14} /> {saved ? 'Saved' : 'Save'}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
                style={{
                  background: 'var(--glass-bg)', border: '1px solid var(--glass-border)',
                  borderRadius: '9999px', padding: '0.4rem 0.75rem',
                  display: 'flex', alignItems: 'center', gap: '0.35rem',
                  cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem',
                  color: 'var(--text-secondary)'
                }}
              >
                <Share2 size={14} /> Share
              </motion.button>
            </div>
          </div>

          {/* Meta Info Row */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '0.75rem 1.25rem',
            marginTop: '1.25rem', padding: 'clamp(0.85rem, 2vw, 1.25rem) clamp(1rem, 2vw, 1.5rem)',
            background: 'var(--glass-bg)',
            borderRadius: '14px',
            border: '1px solid var(--glass-border)',
          }}>
            {[
              { icon: <Calendar size={16} />, text: event.date.toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }), color: VERMILION },
              { icon: <Clock size={16} />,    text: event.time,                   color: TEAL    },
              { icon: <MapPin size={16} />,   text: event.location,               color: COBALT  },
              { icon: <Users size={16} />,    text: `${event.attendees} attending`, color: SAFFRON },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                <span style={{ color: item.color, display: 'flex', flexShrink: 0 }}>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>

          {/* Main Grid */}
          <div className="event-detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr min(340px, 35%)', gap: '2rem', marginTop: '2rem' }}>

            {/* Left: Description + Speakers + Highlights */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', minWidth: 0 }}>

              {/* About */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.15rem, 3vw, 1.4rem)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Tag size={16} color={VERMILION} /> About this Event
                </h2>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '0.92rem', margin: 0 }}>
                  {event.description}
                </p>
              </motion.section>

              {/* Highlights */}
              {event.highlights && (
                <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.15rem, 3vw, 1.4rem)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.85rem' }}>
                    ✦ What to Expect
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {event.highlights.map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.07 }}
                        style={{
                          display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
                          padding: '0.7rem 0.85rem',
                          background: 'rgba(22,140,131,0.05)',
                          borderRadius: '10px',
                          border: '1px solid rgba(22,140,131,0.15)',
                        }}
                      >
                        <CheckCircle size={16} color={TEAL} style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{h}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* Speakers */}
              {event.speakers && event.speakers.length > 0 && (
                <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.15rem, 3vw, 1.4rem)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Mic size={16} color={COBALT} /> Speakers
                  </h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))', gap: '0.75rem' }}>
                    {event.speakers.map((sp, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.35 + i * 0.08 }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '0.75rem',
                          padding: '0.75rem 1rem',
                          background: 'rgba(49,87,164,0.06)',
                          borderRadius: '12px',
                          border: '1px solid rgba(49,87,164,0.15)',
                        }}
                      >
                        <div style={{
                          width: '40px', height: '40px', borderRadius: '50%',
                          background: `linear-gradient(135deg, ${COBALT}, ${TEAL})`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: 'white', fontWeight: 700, fontSize: '0.9rem',
                          flexShrink: 0, fontFamily: 'var(--font-heading)'
                        }}>
                          {sp.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)' }}>{sp.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{sp.role}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              )}
            </div>

            {/* Right: Countdown + Register */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="event-detail-sidebar"
              style={{ position: 'sticky', top: '5rem', height: 'fit-content', display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              {/* Countdown Card */}
              <div style={{
                ...card,
                padding: 'clamp(1.25rem, 3vw, 1.75rem)',
                borderRadius: '18px',
              }}>
                {isPast ? (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: TEAL, marginBottom: '0.25rem' }}>Event Started!</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Join now to participate</div>
                  </div>
                ) : (
                  <>
                    <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Clock size={13} /> Event starts in
                    </div>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <CountdownUnit value={days} label="Days" />
                      <CountdownUnit value={hours} label="Hrs" />
                      <CountdownUnit value={minutes} label="Min" />
                      <CountdownUnit value={seconds} label="Sec" />
                    </div>
                  </>
                )}
              </div>

              {/* Attendees */}
              <div style={{
                ...card,
                padding: '1rem 1.25rem',
                display: 'flex', alignItems: 'center', gap: '0.85rem'
              }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  background: 'rgba(228,71,46,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Users size={18} color={VERMILION} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--text-primary)', lineHeight: 1 }}>{event.attendees}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>People attending</div>
                </div>
              </div>

              {/* Register CTA */}
              <motion.button
                onClick={() => setRegistered(r => !r)}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  width: '100%', padding: '0.9rem',
                  background: registered
                    ? `linear-gradient(135deg, ${TEAL}, #0d7a72)`
                    : `linear-gradient(135deg, ${VERMILION}, #c53821)`,
                  color: 'white', border: 'none', borderRadius: '12px',
                  fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer',
                  boxShadow: registered
                    ? `0 8px 24px rgba(22,140,131,0.35)`
                    : `0 8px 24px rgba(228,71,46,0.35)`,
                  transition: 'background 0.3s, box-shadow 0.3s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  fontFamily: 'var(--font-body)', letterSpacing: '0.03em'
                }}
              >
                {registered ? <><CheckCircle size={16} /> Registered!</> : 'Reserve Your Spot'}
              </motion.button>

              {registered && (
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ textAlign: 'center', fontSize: '0.78rem', color: TEAL, fontWeight: 600, margin: 0 }}
                >
                  🎉 You're on the list! Check your email for confirmation.
                </motion.p>
              )}

              {/* Tags */}
              {event.tags && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {event.tags.map((tag, i) => (
                    <span key={i} style={{
                      padding: '0.25rem 0.7rem', borderRadius: '9999px',
                      background: `rgba(49,87,164,0.1)`, color: COBALT,
                      border: `1px solid rgba(49,87,164,0.2)`,
                      fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.03em'
                    }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
