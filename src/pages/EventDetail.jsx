import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, Calendar, Clock, Users, MapPin, Tag,
  Mic, CheckCircle, Share2, BookmarkPlus
} from 'lucide-react';
import { EVENTS } from '../data/events';

function CountdownUnit({ value, label }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      background: 'rgba(228,71,46,0.07)',
      border: '1px solid rgba(228,71,46,0.15)',
      borderRadius: '14px',
      padding: '1rem 1.25rem',
      minWidth: '72px',
    }}>
      <span style={{
        fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 700,
        color: 'var(--brand-primary)', lineHeight: 1, fontVariantNumeric: 'tabular-nums'
      }}>
        {String(value).padStart(2, '0')}
      </span>
      <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '0.35rem' }}>
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
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--text-primary)' }}>Event not found</h2>
        <Link to="/events" style={{ color: 'var(--brand-primary)', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ArrowLeft size={18} /> Back to Events
        </Link>
      </div>
    );
  }

  const days = Math.floor(timeLeft / 86400);
  const hours = Math.floor((timeLeft % 86400) / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;
  const isPast = timeLeft === 0;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Hero Section */}
      <div style={{ position: 'relative', height: '60vh', minHeight: '380px', overflow: 'hidden' }}>
        <motion.img
          src={event.image}
          alt={event.title}
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.15) 40%, rgba(247,241,227,0.95) 100%)'
        }} />

        {/* Back button */}
        <Link to="/events" style={{ textDecoration: 'none' }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              position: 'absolute', top: '7rem', left: '5vw',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)',
              color: 'var(--text-primary)', padding: '0.5rem 1rem',
              borderRadius: '9999px', fontWeight: 600, fontSize: '0.9rem',
              border: '1px solid rgba(255,255,255,0.6)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              cursor: 'pointer',
            }}
            whileHover={{ y: -2, boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }}
          >
            <ArrowLeft size={16} /> Back to Events
          </motion.div>
        </Link>

        {/* Category Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          style={{
            position: 'absolute', top: '7rem', right: '5vw',
            background: 'var(--brand-primary)', color: 'white',
            padding: '0.35rem 1rem', borderRadius: '9999px',
            fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase'
          }}
        >
          {event.category}
        </motion.div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 5vw 6rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginTop: '-2rem', position: 'relative', zIndex: 2 }}
        >
          {/* Title + Actions Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 style={{
                fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 800, color: 'var(--text-primary)', margin: 0, lineHeight: 1.1
              }}>
                {event.title}
              </h1>
              <p style={{ color: 'var(--ecell-teal)', fontWeight: 600, margin: '0.5rem 0 0', fontSize: '1rem' }}>
                {event.tagline}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', paddingTop: '0.5rem' }}>
              <motion.button
                onClick={() => setSaved(s => !s)}
                whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
                style={{
                  background: saved ? 'rgba(228,71,46,0.1)' : 'rgba(0,0,0,0.05)',
                  border: saved ? '1px solid rgba(228,71,46,0.3)' : '1px solid rgba(0,0,0,0.1)',
                  borderRadius: '9999px', padding: '0.5rem 1rem',
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                  cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem',
                  color: saved ? 'var(--brand-primary)' : 'var(--text-primary)',
                  transition: 'all 0.2s ease'
                }}
              >
                <BookmarkPlus size={16} /> {saved ? 'Saved' : 'Save'}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
                style={{
                  background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: '9999px', padding: '0.5rem 1rem',
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                  cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem',
                  color: 'var(--text-primary)'
                }}
              >
                <Share2 size={16} /> Share
              </motion.button>
            </div>
          </div>

          {/* Meta Info Row */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '1.5rem',
            marginTop: '1.5rem', padding: '1.25rem 1.5rem',
            background: 'white', borderRadius: '16px',
            border: '1px solid rgba(0,0,0,0.07)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
          }}>
            {[
              { icon: <Calendar size={18} />, text: event.date.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }), color: 'var(--brand-primary)' },
              { icon: <Clock size={18} />, text: event.time, color: 'var(--ecell-teal)' },
              { icon: <MapPin size={18} />, text: event.location, color: 'var(--ecell-cobalt)' },
              { icon: <Users size={18} />, text: `${event.attendees} attending`, color: 'var(--ecell-saffron)' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                <span style={{ color: item.color }}>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>

          {/* Main Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr min(340px, 35%)', gap: '2.5rem', marginTop: '2.5rem' }}>
            {/* Left: Description + Speakers + Highlights */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

              {/* About */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Tag size={18} color="var(--brand-primary)" /> About this Event
                </h2>
                <p style={{ color: '#555', lineHeight: 1.8, fontSize: '0.97rem', margin: 0 }}>
                  {event.description}
                </p>
              </motion.section>

              {/* Highlights */}
              {event.highlights && (
                <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                    ✦ What to Expect
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {event.highlights.map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.07 }}
                        style={{
                          display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                          padding: '0.85rem 1rem',
                          background: 'white', borderRadius: '12px',
                          border: '1px solid rgba(0,0,0,0.06)',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                        }}
                      >
                        <CheckCircle size={18} color="var(--ecell-teal)" style={{ flexShrink: 0, marginTop: '1px' }} />
                        <span style={{ fontSize: '0.92rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>{h}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* Speakers */}
              {event.speakers && (
                <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Mic size={18} color="var(--ecell-cobalt)" /> Speakers
                  </h2>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                    {event.speakers.map((sp, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.35 + i * 0.08 }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '0.85rem',
                          padding: '0.85rem 1.2rem',
                          background: 'white', borderRadius: '14px',
                          border: '1px solid rgba(0,0,0,0.07)',
                          minWidth: '200px', flex: '1'
                        }}
                      >
                        <div style={{
                          width: '48px', height: '48px', borderRadius: '50%',
                          background: `linear-gradient(135deg, var(--ecell-cobalt), var(--ecell-teal))`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: 'white', fontWeight: 700, fontSize: '1.1rem',
                          flexShrink: 0, fontFamily: 'var(--font-heading)'
                        }}>
                          {sp.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>{sp.name}</div>
                          <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '0.15rem' }}>{sp.role}</div>
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
              style={{ position: 'sticky', top: '6rem', height: 'fit-content', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
            >
              {/* Countdown Card */}
              <div style={{
                background: 'white', borderRadius: '20px', padding: '1.75rem',
                border: '1px solid rgba(0,0,0,0.08)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.07)'
              }}>
                {isPast ? (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--ecell-teal)', marginBottom: '0.25rem' }}>Event Started!</div>
                    <div style={{ fontSize: '0.85rem', color: '#888' }}>Join now to participate</div>
                  </div>
                ) : (
                  <>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Clock size={14} /> Event starts in
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '0.5rem' }}>
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
                background: 'white', borderRadius: '16px', padding: '1.25rem 1.5rem',
                border: '1px solid rgba(0,0,0,0.07)',
                display: 'flex', alignItems: 'center', gap: '1rem'
              }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '50%',
                  background: 'rgba(228,71,46,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Users size={20} color="var(--brand-primary)" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1.3rem', color: 'var(--text-primary)', lineHeight: 1 }}>{event.attendees}</div>
                  <div style={{ fontSize: '0.82rem', color: '#888', marginTop: '0.2rem' }}>People attending</div>
                </div>
              </div>

              {/* Register CTA */}
              <motion.button
                onClick={() => setRegistered(r => !r)}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  width: '100%', padding: '1rem',
                  background: registered
                    ? 'linear-gradient(135deg, var(--ecell-teal), #0d7a72)'
                    : 'linear-gradient(135deg, var(--brand-primary), #c53821)',
                  color: 'white', border: 'none', borderRadius: '14px',
                  fontWeight: 700, fontSize: '1rem', cursor: 'pointer',
                  boxShadow: registered
                    ? '0 8px 24px rgba(22,140,131,0.35)'
                    : '0 8px 24px rgba(228,71,46,0.35)',
                  transition: 'background 0.3s, box-shadow 0.3s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  fontFamily: 'var(--font-body)'
                }}
              >
                {registered ? <><CheckCircle size={18} /> Registered!</> : 'Reserve Your Spot'}
              </motion.button>

              {registered && (
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ textAlign: 'center', fontSize: '0.82rem', color: 'var(--ecell-teal)', fontWeight: 600, margin: 0 }}
                >
                  🎉 You're on the list! Check your email for confirmation.
                </motion.p>
              )}

              {/* Tags */}
              {event.tags && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {event.tags.map((tag, i) => (
                    <span key={i} style={{
                      padding: '0.3rem 0.85rem', borderRadius: '9999px',
                      background: 'rgba(49,87,164,0.08)', color: 'var(--ecell-cobalt)',
                      fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.03em'
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
