import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';

export default function ContactPage({ onNavigate }) {
  const { data, openReservation, openReservationModal } = useCMS();
  const triggerReservation = openReservationModal || openReservation;
  const site = data?.content?.site || {};
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', topic: 'general', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ backgroundColor: 'var(--color-obsidian)', color: 'var(--color-ivory)', minHeight: '100vh', paddingTop: '100px' }}>
      
      {/* Hero Header */}
      <section style={{ padding: '80px 0 60px 0', borderBottom: '1px solid var(--border-subtle)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-100px', right: '15%', width: '450px', height: '450px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(148, 115, 79, 0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="section-container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '820px', margin: '0 auto', padding: '0 24px' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-bronze)', fontFamily: 'var(--font-heading)', fontWeight: 700, display: 'inline-block', marginBottom: '12px' }}>
            MANHATTAN MIDTOWN EAST
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.6rem, 5vw, 4.2rem)', fontWeight: 600, lineHeight: 1.15, marginBottom: '18px', color: 'var(--color-ivory)' }}>
            Location & Concierge Inquiries
          </h1>
          <div style={{ width: '60px', height: '2px', background: 'var(--color-bronze)', margin: '0 auto 24px auto' }} />
          <p style={{ color: 'var(--color-taupe)', fontSize: '1.15rem', lineHeight: 1.8 }}>
            Steps from Grand Central Terminal on Lexington Avenue. Join us for executive daylight lunch or evening prime steakhouse dining.
          </p>
        </div>
      </section>

      {/* Logistics Cards */}
      <section style={{ padding: '70px 0', backgroundColor: 'var(--color-charcoal)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="section-container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            
            <div style={{ background: 'var(--color-graphite)', border: '1px solid var(--border-subtle)', borderRadius: '4px', padding: '32px 24px' }}>
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>📍</div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', color: 'var(--color-champagne)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Physical Address</h4>
              <p style={{ color: 'var(--color-ivory)', fontSize: '0.95rem', lineHeight: 1.6 }}>{site.address || '482 Lexington Avenue, Manhattan, NY 10017'}</p>
            </div>

            <div style={{ background: 'var(--color-graphite)', border: '1px solid var(--border-subtle)', borderRadius: '4px', padding: '32px 24px' }}>
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>🚇</div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', color: 'var(--color-champagne)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Transit & Arrival</h4>
              <p style={{ color: 'var(--color-taupe)', fontSize: '0.92rem', lineHeight: 1.6 }}>Lines 4, 5, 6, 7, S at Grand Central Terminal (3 min walk). Valet parking available on Lexington Ave.</p>
            </div>

            <div style={{ background: 'var(--color-graphite)', border: '1px solid var(--border-subtle)', borderRadius: '4px', padding: '32px 24px' }}>
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>⏰</div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', color: 'var(--color-champagne)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Dining Hours</h4>
              <p style={{ color: 'var(--color-taupe)', fontSize: '0.92rem', lineHeight: 1.6 }}>{site.hours || 'Tuesday – Sunday: 5:00 PM – 11:30 PM. Executive Lunch: Tue–Fri 11:30 AM – 2:30 PM.'}</p>
            </div>

            <div style={{ background: 'var(--color-graphite)', border: '1px solid var(--border-subtle)', borderRadius: '4px', padding: '32px 24px' }}>
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>📞</div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', color: 'var(--color-champagne)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Concierge Desk</h4>
              <p style={{ color: 'var(--color-ivory)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '4px' }}>{site.phone || '+1 (212) 840-7832'}</p>
              <p style={{ color: 'var(--color-taupe)', fontSize: '0.88rem' }}>{site.email || 'concierge@charredandprime.com'}</p>
            </div>

          </div>
        </div>
      </section>

      {/* Inquiry Form & Map */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--color-obsidian)' }}>
        <div className="section-container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '48px', alignItems: 'start' }}>
            
            {/* Form */}
            <div style={{ background: 'var(--color-charcoal)', border: '1px solid var(--border-subtle)', borderRadius: '4px', padding: '40px 36px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--color-ivory)', marginBottom: '8px' }}>
                Contact Dining Concierge
              </h3>
              <p style={{ color: 'var(--color-taupe)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '28px' }}>
                For private dining salon buyouts, corporate reservations, media inquiries, or custom wine cellar pairings.
              </p>

              {submitted ? (
                <div style={{ background: 'rgba(72, 187, 120, 0.1)', border: '1px solid #38a169', borderRadius: '4px', padding: '24px', textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', color: '#68d391', marginBottom: '8px' }}>✓</div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: 'var(--color-ivory)', marginBottom: '6px' }}>Message Received</h4>
                  <p style={{ color: 'var(--color-taupe)', fontSize: '13px' }}>Our sommelier concierge desk will reply within 24 business hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-taupe)', marginBottom: '6px', fontWeight: 600 }}>Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Harrison Vance"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', background: 'var(--color-graphite)', border: '1px solid var(--border-subtle)', borderRadius: '2px', color: 'var(--color-ivory)', outline: 'none' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-taupe)', marginBottom: '6px', fontWeight: 600 }}>Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="you@domain.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        style={{ width: '100%', padding: '12px 14px', background: 'var(--color-graphite)', border: '1px solid var(--border-subtle)', borderRadius: '2px', color: 'var(--color-ivory)', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-taupe)', marginBottom: '6px', fontWeight: 600 }}>Phone Number</label>
                      <input
                        type="tel"
                        placeholder="+1 (212)..."
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        style={{ width: '100%', padding: '12px 14px', background: 'var(--color-graphite)', border: '1px solid var(--border-subtle)', borderRadius: '2px', color: 'var(--color-ivory)', outline: 'none' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-taupe)', marginBottom: '6px', fontWeight: 600 }}>Inquiry Subject</label>
                    <select
                      value={form.topic}
                      onChange={(e) => setForm({ ...form, topic: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', background: 'var(--color-graphite)', border: '1px solid var(--border-subtle)', borderRadius: '2px', color: 'var(--color-ivory)', outline: 'none' }}
                    >
                      <option value="general">General Inquiries</option>
                      <option value="private-dining">Private Dining Salon (Sommelier Room / Mezzanine)</option>
                      <option value="chef-table">Chef's Hearth Table Experience</option>
                      <option value="cellar">Wine Cellar & Corkage Consultation</option>
                      <option value="press">Press & Media</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-taupe)', marginBottom: '6px', fontWeight: 600 }}>Message *</label>
                    <textarea
                      rows="4"
                      required
                      placeholder="Party size, preferred dates, cut or wine preferences..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', background: 'var(--color-graphite)', border: '1px solid var(--border-subtle)', borderRadius: '2px', color: 'var(--color-ivory)', outline: 'none', resize: 'vertical' }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{ padding: '14px', background: 'var(--color-bronze)', border: 'none', borderRadius: '2px', color: '#101010', fontFamily: 'var(--font-heading)', fontSize: '12px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer' }}
                  >
                    Submit Concierge Request
                  </button>
                </form>
              )}
            </div>

            {/* Map Placeholder & Direct Booking Box */}
            <div>
              <div style={{ background: 'var(--color-charcoal)', border: '1px solid var(--border-subtle)', borderRadius: '4px', overflow: 'hidden', marginBottom: '24px' }}>
                <div style={{ height: '320px', background: '#181715', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px', textAlign: 'center' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--color-bronze)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', color: '#101010', marginBottom: '16px', boxShadow: '0 0 25px rgba(148, 115, 79, 0.4)' }}>
                    📍
                  </div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--color-ivory)', marginBottom: '8px' }}>
                    Midtown East Sanctuary
                  </h4>
                  <p style={{ color: 'var(--color-taupe)', fontSize: '0.92rem', maxWidth: '360px', lineHeight: 1.6 }}>
                    482 Lexington Avenue (between 46th & 47th St). 3-minute stroll from Grand Central Terminal.
                  </p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    style={{ marginTop: '20px', padding: '10px 24px', background: 'transparent', border: '1px solid var(--border-subtle)', borderRadius: '2px', color: 'var(--color-champagne)', fontSize: '11px', fontFamily: 'var(--font-heading)', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', textDecoration: 'none' }}
                  >
                    Open in Google Maps ↗
                  </a>
                </div>
              </div>

              <div style={{ background: 'rgba(148, 115, 79, 0.1)', border: '1px solid var(--color-bronze)', borderRadius: '4px', padding: '32px 28px', textAlign: 'center' }}>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: 'var(--color-ivory)', marginBottom: '8px' }}>
                  Immediate Table Booking
                </h4>
                <p style={{ color: 'var(--color-taupe)', fontSize: '0.95rem', marginBottom: '20px', lineHeight: 1.6 }}>
                  Reserve table seating for daylight executive lunch or twilight dinner service.
                </p>
                <button
                  onClick={() => triggerReservation('Contact Page Seating')}
                  style={{ padding: '12px 28px', background: 'var(--color-bronze)', border: 'none', borderRadius: '2px', color: '#101010', fontFamily: 'var(--font-heading)', fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer' }}
                >
                  Book Table Reservation
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
