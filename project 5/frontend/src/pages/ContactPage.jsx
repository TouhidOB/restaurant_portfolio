import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';

export default function ContactPage({ onNavigateHome, onOpenReservation }) {
  const { content } = useCMS();
  const restaurant = content.restaurant || {};

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Private Dining & Buyouts',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div style={{ paddingTop: 'calc(var(--header-height, 80px) + 3rem)', paddingBottom: '6rem', minHeight: '100vh', backgroundColor: '#1A2F25', color: '#F6F2E9' }}>
      <div className="container-tropical">
        {/* Navigation Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem' }}>
          <button onClick={onNavigateHome} style={{ background: 'none', border: 'none', color: '#AAB9A0', cursor: 'pointer', padding: 0 }}>
            INDEX
          </button>
          <span style={{ color: 'rgba(170, 185, 160, 0.4)' }}>/</span>
          <span style={{ color: '#BC7153' }}>08. CONCIERGE &amp; LOCATION</span>
        </div>

        {/* Hero Header */}
        <div style={{ borderBottom: '1px solid rgba(170, 185, 160, 0.3)', paddingBottom: '2.5rem', marginBottom: '3.5rem' }}>
          <span style={{ display: 'inline-block', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem', color: '#BC7153', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
            LOCATION &bull; INQUIRIES &bull; CONCIERGE
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 'clamp(2.5rem, 6vw, 4.2rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0.5rem 0 1rem' }}>
            FIND YOUR PLACE HERE.
          </h1>
          <p style={{ fontFamily: 'var(--font-sans, sans-serif)', fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#AAB9A0', maxWidth: '820px', lineHeight: 1.6 }}>
            Nestled in the lush Palm Grove corridor, surrounded by protected sub-tropical flora and cooling ocean trade winds.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
          {/* Logistics Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ background: '#243F32', border: '1px solid rgba(170, 185, 160, 0.25)', borderRadius: '8px', padding: '2rem' }}>
              <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.72rem', color: '#D9B84E', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                PHYSICAL SANCTUARY
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '1.8rem', color: '#F6F2E9', marginBottom: '0.75rem' }}>
                {restaurant.address || '840 Palm Grove Way, Tropical Corridor'}
              </h3>
              <p style={{ color: '#AAB9A0', fontSize: '0.95rem', margin: '0 0 1rem' }}>
                {restaurant.city || 'Miami, FL 33139'}
              </p>
              <div style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.78rem', color: '#BC7153', borderTop: '1px solid rgba(170, 185, 160, 0.2)', paddingTop: '0.75rem' }}>
                COORDINATES: {restaurant.coordinates_display || '25.7617° N, 80.1918° W — PALM GROVE'}
              </div>
            </div>

            <div style={{ background: '#243F32', border: '1px solid rgba(170, 185, 160, 0.25)', borderRadius: '8px', padding: '2rem' }}>
              <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.72rem', color: '#D9B84E', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                HOURS OF SERVICE
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '1.6rem', color: '#F6F2E9', marginBottom: '0.5rem' }}>
                TUESDAY — SUNDAY
              </h3>
              <p style={{ color: '#AAB9A0', fontSize: '0.95rem', margin: '0 0 0.5rem' }}>
                Lunch Service: 12:00 — 15:30
              </p>
              <p style={{ color: '#AAB9A0', fontSize: '0.95rem', margin: '0 0 1rem' }}>
                Dinner Service: 17:30 — 23:30 (Kitchen closes 22:30)
              </p>
              <div style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem', color: '#E5D7C2', background: 'rgba(26, 47, 37, 0.6)', padding: '0.5rem 0.85rem', borderRadius: '4px' }}>
                CLOSED MONDAYS FOR HORTICULTURAL REST &amp; FORAGE
              </div>
            </div>

            <div style={{ background: '#243F32', border: '1px solid rgba(170, 185, 160, 0.25)', borderRadius: '8px', padding: '2rem' }}>
              <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.72rem', color: '#D9B84E', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                DIRECT CONTACT
              </span>
              <p style={{ margin: '0 0 0.5rem', fontSize: '0.95rem' }}>
                <span style={{ color: '#AAB9A0' }}>Phone:</span> <strong style={{ color: '#F6F2E9' }}>{restaurant.phone || '+1 (305) 555-0428'}</strong>
              </p>
              <p style={{ margin: 0, fontSize: '0.95rem' }}>
                <span style={{ color: '#AAB9A0' }}>Email:</span> <strong style={{ color: '#F6F2E9' }}>{restaurant.email || 'concierge@verdant-dining.com'}</strong>
              </p>
            </div>
          </div>

          {/* Event Inquiry Form */}
          <div style={{ background: '#243F32', border: '1px solid rgba(170, 185, 160, 0.3)', borderRadius: '8px', padding: '2.5rem' }}>
            <span style={{ display: 'inline-block', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.72rem', color: '#BC7153', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
              BESPOKE INQUIRY DESK
            </span>
            <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '1.8rem', fontWeight: 700, margin: '0 0 1rem', color: '#F6F2E9' }}>
              COMMISSION A PRIVATE EVENT
            </h3>
            <p style={{ color: '#AAB9A0', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              For Glasshouse buyouts, botanical weddings, and private tastings exceeding 12 guests, submit your details below.
            </p>

            {formSubmitted ? (
              <div style={{ padding: '2rem 1.5rem', background: '#1A2F25', border: '1px solid #4ade80', borderRadius: '6px', textAlign: 'center' }}>
                <div style={{ color: '#4ade80', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                  ✓ INQUIRY DISPATCHED
                </div>
                <h4 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '1.4rem', color: '#F6F2E9', marginBottom: '0.5rem' }}>
                  Thank you, {formData.name || 'valued guest'}.
                </h4>
                <p style={{ color: '#AAB9A0', fontSize: '0.85rem' }}>
                  Our private events concierge will contact you within 24 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono, monospace)', color: '#AAB9A0', marginBottom: '0.3rem' }}>
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: '#14251D',
                      border: '1px solid rgba(170, 185, 160, 0.3)',
                      borderRadius: '4px',
                      color: '#F6F2E9',
                      fontFamily: 'var(--font-sans, sans-serif)',
                      fontSize: '0.9rem',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono, monospace)', color: '#AAB9A0', marginBottom: '0.3rem' }}>
                    CONTACT EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: '#14251D',
                      border: '1px solid rgba(170, 185, 160, 0.3)',
                      borderRadius: '4px',
                      color: '#F6F2E9',
                      fontFamily: 'var(--font-sans, sans-serif)',
                      fontSize: '0.9rem',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono, monospace)', color: '#AAB9A0', marginBottom: '0.3rem' }}>
                    INQUIRY TYPE
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: '#14251D',
                      border: '1px solid rgba(170, 185, 160, 0.3)',
                      borderRadius: '4px',
                      color: '#F6F2E9',
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '0.85rem',
                      boxSizing: 'border-box',
                    }}
                  >
                    <option value="Private Dining & Buyouts">Private Dining &amp; Glasshouse Buyouts</option>
                    <option value="Botanical Weddings">Botanical Weddings &amp; Receptions</option>
                    <option value="Corporate Retreats">Corporate Retreats &amp; Seminars</option>
                    <option value="Press & Media Inquiries">Press, Editorial &amp; Media</option>
                  </select>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono, monospace)', color: '#AAB9A0', marginBottom: '0.3rem' }}>
                    INQUIRY DETAILS
                  </label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Guest count, proposed dates, special dietary formats..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: '#14251D',
                      border: '1px solid rgba(170, 185, 160, 0.3)',
                      borderRadius: '4px',
                      color: '#F6F2E9',
                      fontFamily: 'var(--font-sans, sans-serif)',
                      fontSize: '0.9rem',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '0.9rem',
                    background: '#BC7153',
                    border: 'none',
                    borderRadius: '4px',
                    color: '#fff',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    cursor: 'pointer',
                  }}
                >
                  TRANSMIT INQUIRY TO CONCIERGE &rarr;
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
