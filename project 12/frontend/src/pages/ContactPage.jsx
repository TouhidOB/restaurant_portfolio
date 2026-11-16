import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';

export default function ContactPage({ onNavigate }) {
  const { content, openReservationModal, openReservation } = useCMS();
  const triggerReservation = openReservation || openReservationModal;
  const locSection = content?.editorial_sections?.s14_location || {};
  const siteConfig = content?.site_config || {};

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Dining Inquiry',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div style={{ backgroundColor: '#18252E', color: '#F7F3EA', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(38, 58, 72, 0.65) 0%, #18252E 100%)',
          padding: '5rem 1.5rem',
          textAlign: 'center',
          borderBottom: '1px solid rgba(233, 223, 207, 0.2)',
        }}
      >
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span
            style={{
              color: '#B96F4F',
              fontSize: '0.82rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              display: 'inline-block',
              marginBottom: '0.75rem',
            }}
          >
            {locSection.badge || 'VISIT & CONTACT'}
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display, "Cormorant Garamond")',
              fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
              letterSpacing: '0.03em',
              color: '#F7F3EA',
              margin: '0.6rem 0 1.25rem',
            }}
          >
            {locSection.title || 'Coordinates & Arrival by Sea or Land'}
          </h1>
          <div style={{ width: '80px', height: '2px', background: '#B96F4F', margin: '1rem auto' }} />
          <p style={{ color: '#E9DFCF', fontSize: '1.15rem', lineHeight: 1.7, marginTop: '1.25rem' }}>
            {locSection.description || 'Perched discreetly on the eastern cliffs of Saint-Jean-Cap-Ferrat, accessible via coastal road or private yacht tender.'}
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1140px', margin: '4.5rem auto 6rem', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem' }}>
          {/* Coordinates & Arrival Logistics */}
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-display, "Cormorant Garamond")',
                fontSize: '2rem',
                color: '#F7F3EA',
                marginBottom: '1.5rem',
              }}
            >
              Estate Location & Hours
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ backgroundColor: '#263A48', padding: '1.5rem', borderRadius: '6px', border: '1px solid rgba(233, 223, 207, 0.15)' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#B96F4F', letterSpacing: '0.08em', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>
                  Physical Address
                </span>
                <p style={{ color: '#F7F3EA', fontSize: '1rem', lineHeight: 1.5, margin: 0 }}>
                  {siteConfig.address || 'Chemin des Douaniers, 06230 Saint-Jean-Cap-Ferrat, France'}
                </p>
                <span style={{ fontSize: '0.8rem', color: '#A9BDB5', marginTop: '0.4rem', display: 'block' }}>
                  GPS: 43.6842° N, 7.3328° E
                </span>
              </div>

              <div style={{ backgroundColor: '#263A48', padding: '1.5rem', borderRadius: '6px', border: '1px solid rgba(233, 223, 207, 0.15)' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#B96F4F', letterSpacing: '0.08em', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>
                  Dining Shifts & Hours
                </span>
                <p style={{ color: '#F7F3EA', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                  <strong>Daylight Lunch:</strong> 12:00 – 15:30 (Last seating 14:00)<br />
                  <strong>Twilight Dinner:</strong> 19:00 – 23:30 (Last seating 21:30)<br />
                  <em>Wednesday through Sunday (Closed Mondays & Tuesdays)</em>
                </p>
              </div>

              <div style={{ backgroundColor: '#263A48', padding: '1.5rem', borderRadius: '6px', border: '1px solid rgba(233, 223, 207, 0.15)' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#B96F4F', letterSpacing: '0.08em', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>
                  Yacht Tender Arrival
                </span>
                <p style={{ color: '#E9DFCF', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>
                  Patrons arriving by sea may moor at our private deep-water pier. Please notify our concierge on <strong>VHF Channel 68</strong> 20 minutes prior to approach.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={triggerReservation}
                style={{
                  backgroundColor: '#B96F4F',
                  color: '#FFFFFF',
                  padding: '12px 28px',
                  borderRadius: '3px',
                  border: 'none',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
              >
                Book a Table
              </button>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-block',
                  backgroundColor: 'transparent',
                  color: '#E9DFCF',
                  border: '1px solid rgba(233, 223, 207, 0.3)',
                  padding: '12px 22px',
                  borderRadius: '3px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Open in Maps ↗
              </a>
            </div>
          </div>

          {/* Concierge Message Form */}
          <div
            style={{
              backgroundColor: '#263A48',
              borderRadius: '8px',
              border: '1px solid rgba(233, 223, 207, 0.2)',
              padding: '2.5rem',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-display, "Cormorant Garamond")',
                fontSize: '1.8rem',
                color: '#F7F3EA',
                marginBottom: '0.5rem',
              }}
            >
              Concierge Inquiries
            </h3>
            <p style={{ color: '#E9DFCF', fontSize: '0.9rem', marginBottom: '1.75rem' }}>
              For private buyouts, yacht tender reservations, or bespoke cellar tastings.
            </p>

            {formSubmitted ? (
              <div
                style={{
                  padding: '2rem',
                  backgroundColor: 'rgba(24, 37, 46, 0.8)',
                  border: '1px solid #596448',
                  borderRadius: '4px',
                  textAlign: 'center',
                }}
              >
                <div style={{ color: '#A9BDB5', fontSize: '2rem', marginBottom: '0.5rem' }}>✓</div>
                <h4 style={{ color: '#F7F3EA', marginBottom: '0.5rem' }}>Inquiry Received</h4>
                <p style={{ color: '#E9DFCF', fontSize: '0.9rem' }}>
                  Our Maître d'Hôtel will contact you within 4 hours. Merci.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#A9BDB5', textTransform: 'uppercase', marginBottom: '0.35rem', fontWeight: 600 }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      backgroundColor: '#18252E',
                      border: '1px solid rgba(233, 223, 207, 0.2)',
                      borderRadius: '4px',
                      color: '#F7F3EA',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#A9BDB5', textTransform: 'uppercase', marginBottom: '0.35rem', fontWeight: 600 }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      backgroundColor: '#18252E',
                      border: '1px solid rgba(233, 223, 207, 0.2)',
                      borderRadius: '4px',
                      color: '#F7F3EA',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#A9BDB5', textTransform: 'uppercase', marginBottom: '0.35rem', fontWeight: 600 }}>
                    Nature of Inquiry
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      backgroundColor: '#18252E',
                      border: '1px solid rgba(233, 223, 207, 0.2)',
                      borderRadius: '4px',
                      color: '#F7F3EA',
                      fontSize: '0.9rem',
                    }}
                  >
                    <option value="Dining Inquiry">General Dining Inquiry</option>
                    <option value="Private Villa Buyout">Private Villa Buyout</option>
                    <option value="Yacht Tender Arrival">Yacht Tender Arrival Logistics</option>
                    <option value="Wine Cellar Tasting">Subterranean Cellar Tasting</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#A9BDB5', textTransform: 'uppercase', marginBottom: '0.35rem', fontWeight: 600 }}>
                    Message Details
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Preferred dates, guest count, dietary notes..."
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      backgroundColor: '#18252E',
                      border: '1px solid rgba(233, 223, 207, 0.2)',
                      borderRadius: '4px',
                      color: '#F7F3EA',
                      fontSize: '0.9rem',
                      fontFamily: 'inherit',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    backgroundColor: '#B96F4F',
                    color: '#FFFFFF',
                    padding: '12px',
                    border: 'none',
                    borderRadius: '3px',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    marginTop: '0.5rem',
                  }}
                >
                  Send Inquiry to Concierge
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
