import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';

export default function ContactPage({ onNavigate }) {
  const { content, openReservation } = useCMS();
  const loc = content?.location || {};
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ backgroundColor: '#1A2B24', color: '#F4F0E6', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(38, 63, 53, 0.5) 0%, #1A2B24 100%)',
          padding: '4.5rem 1.5rem 3rem',
          textAlign: 'center',
          borderBottom: '1px solid rgba(166, 181, 160, 0.25)',
        }}
      >
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span
            style={{
              color: '#A87958',
              fontSize: '0.82rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              display: 'inline-block',
              marginBottom: '0.75rem',
            }}
          >
            {loc.subtitle || 'FIND OUR SANCTUARY'}
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display, "Cormorant Garamond")',
              fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
              letterSpacing: '0.03em',
              color: '#F4F0E6',
              margin: '0.6rem 0 1rem',
            }}
          >
            {loc.title || 'Hours, Location & Concierge'}
          </h1>
          <div style={{ width: '80px', height: '2px', background: '#A87958', margin: '1rem auto' }} />
          <p style={{ color: '#D8D2C5', fontSize: '1.15rem', lineHeight: 1.7, marginTop: '1rem' }}>
            We invite you to step away from the urban noise into our light-washed botanical haven.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '60px 24px 90px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '50px',
            alignItems: 'start',
          }}
        >
          {/* Coordinates & Logistics Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div
              style={{
                backgroundColor: '#263F35',
                padding: '36px',
                borderRadius: '4px',
                border: '1px solid rgba(166, 181, 160, 0.25)',
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-display, "Cormorant Garamond")', fontSize: '1.75rem', color: '#FFFFFF', marginBottom: '20px' }}>
                Glasshouse Sanctuary
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <span style={{ fontSize: '11px', color: '#A87958', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                    ADDRESS
                  </span>
                  <p style={{ color: '#F4F0E6', fontSize: '15px', margin: 0 }}>
                    {loc.address || '42 Conservatory Lane, Botanical Arts District, CA 94107'}
                  </p>
                </div>

                <div>
                  <span style={{ fontSize: '11px', color: '#A87958', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                    HOURS OF HOSPITALITY
                  </span>
                  <p style={{ color: '#F4F0E6', fontSize: '15px', margin: 0, whiteSpace: 'pre-line' }}>
                    {loc.hours || 'Monday – Sunday: 7:30 AM – 8:00 PM (Kitchen closes at 6:30 PM)'}
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <span style={{ fontSize: '11px', color: '#A87958', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                      TELEPHONE
                    </span>
                    <a href={`tel:${loc.phone}`} style={{ color: '#F4F0E6', textDecoration: 'none', fontSize: '14px' }}>
                      {loc.phone || '+1 (415) 890-4321'}
                    </a>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: '#A87958', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                      CONCIERGE EMAIL
                    </span>
                    <a href={`mailto:${loc.email}`} style={{ color: '#F4F0E6', textDecoration: 'none', fontSize: '14px' }}>
                      {loc.email || 'hello@verdantatrium.com'}
                    </a>
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '11px', color: '#A87958', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                    COORDINATES & TRANSIT
                  </span>
                  <p style={{ color: '#D8D2C5', fontSize: '13px', margin: 0 }}>
                    {loc.coordinates || '37.7749° N, 122.4194° W • Botanical Arts District'}
                  </p>
                  <p style={{ color: '#A6B5A0', fontSize: '13px', marginTop: '6px' }}>
                    {loc.arrival_notes || 'Complimentary bicycle parking and EV charging stations available beside the glasshouse entrance.'}
                  </p>
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#1E332B',
                padding: '30px',
                borderRadius: '4px',
                border: '1px solid rgba(166, 181, 160, 0.25)',
                textAlign: 'center',
              }}
            >
              <h4 style={{ fontFamily: 'var(--font-display, "Cormorant Garamond")', fontSize: '1.4rem', color: '#FFFFFF', marginBottom: '10px' }}>
                Looking to Reserve a Table?
              </h4>
              <p style={{ color: '#D8D2C5', fontSize: '0.95rem', marginBottom: '20px' }}>
                Join us for Daylight Brunch or Twilight Botanical Dinners under the stars.
              </p>
              <button
                onClick={() => openReservation()}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#A87958',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '3px',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
              >
                Open Reservation Desk
              </button>
            </div>
          </div>

          {/* Contact Inquiry Form */}
          <div
            style={{
              backgroundColor: '#263F35',
              padding: '40px',
              borderRadius: '4px',
              border: '1px solid rgba(166, 181, 160, 0.25)',
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-display, "Cormorant Garamond")', fontSize: '1.8rem', color: '#FFFFFF', marginBottom: '8px' }}>
              Direct Botanical Concierge
            </h3>
            <p style={{ color: '#D8D2C5', fontSize: '0.95rem', marginBottom: '28px' }}>
              For event inquiries, media requests, or private masterclass bookings, send a message to our hospitality director.
            </p>

            {submitted ? (
              <div style={{ backgroundColor: 'rgba(166, 181, 160, 0.15)', border: '1px solid #A6B5A0', padding: '30px', borderRadius: '4px', textAlign: 'center' }}>
                <span style={{ fontSize: '32px', display: 'block', marginBottom: '10px' }}>🌿</span>
                <h4 style={{ fontFamily: 'var(--font-display, "Cormorant Garamond")', fontSize: '1.6rem', color: '#FFFFFF', marginBottom: '8px' }}>
                  Thank You for Writing
                </h4>
                <p style={{ color: '#D8D2C5', fontSize: '0.95rem', margin: 0 }}>
                  Our concierge team has received your inquiry and will reply within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#A6B5A0', display: 'block', marginBottom: '8px' }}>
                    YOUR FULL NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Eleanor Vance"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      backgroundColor: '#1A2B24',
                      border: '1px solid rgba(166, 181, 160, 0.3)',
                      borderRadius: '3px',
                      color: '#F4F0E6',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#A6B5A0', display: 'block', marginBottom: '8px' }}>
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. eleanor@botanical-arts.org"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      backgroundColor: '#1A2B24',
                      border: '1px solid rgba(166, 181, 160, 0.3)',
                      borderRadius: '3px',
                      color: '#F4F0E6',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#A6B5A0', display: 'block', marginBottom: '8px' }}>
                    INQUIRY FOCUS
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      backgroundColor: '#1A2B24',
                      border: '1px solid rgba(166, 181, 160, 0.3)',
                      borderRadius: '3px',
                      color: '#F4F0E6',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Private Glasshouse Buyout">Private Glasshouse Buyout</option>
                    <option value="Coffee Cupping Workshop">Coffee Cupping Workshop</option>
                    <option value="Editorial & Press Production">Editorial & Press Production</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#A6B5A0', display: 'block', marginBottom: '8px' }}>
                    MESSAGE
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your gathering, dates, or details..."
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      backgroundColor: '#1A2B24',
                      border: '1px solid rgba(166, 181, 160, 0.3)',
                      borderRadius: '3px',
                      color: '#F4F0E6',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                      resize: 'vertical',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    padding: '14px 28px',
                    backgroundColor: '#A87958',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '3px',
                    fontSize: '13px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    marginTop: '8px',
                  }}
                >
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
