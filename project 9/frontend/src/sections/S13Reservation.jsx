import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { submitReservation } from '../services/api';

export default function S13Reservation() {
  const { content } = useCMS();
  const resCfg = content?.reservation || {};
  const times = resCfg.times || ["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM"];
  const seatingOptions = resCfg.seating_options || [
    { value: 'outdoor_terrace', label: 'Open-Air Sunset Terrace' },
    { value: 'indoor_lounge', label: 'Indoor Sky Lounge' },
    { value: 'window_side', label: 'Horizon Window Table' },
    { value: 'private_room', label: 'Private Horizon Suite' },
    { value: 'any', label: 'Best Available Seating' }
  ];

  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    date: '',
    time: '7:00 PM',
    guests: '2 Guests',
    seating_preference: 'outdoor_terrace',
    occasion: 'Elevated Dining',
    special_requests: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await submitReservation(formData);
      setSuccess(true);
      setFormData({
        full_name: '',
        phone: '',
        email: '',
        date: '',
        time: '7:00 PM',
        guests: '2 Guests',
        seating_preference: 'outdoor_terrace',
        occasion: 'Elevated Dining',
        special_requests: '',
      });
    } catch (err) {
      setError(err.message || 'Failed to submit reservation inquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="reservation" className="section-pad" style={{ backgroundColor: 'var(--color-midnight)' }}>
      <div className="container" style={{ maxWidth: '980px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-label">{resCfg.subtitle || 'Secure Your Place Above the City'}</span>
          <h2 className="section-title">{resCfg.title || 'Table Reservations'}</h2>
          <div className="horizon-divider horizon-divider-center" />
          <p className="section-subtitle">
            {resCfg.description ||
              'Reservations open 30 days in advance. For parties of 7 or more or private Horizon Suite buyouts, please contact our VIP Guest Relations desk directly.'}
          </p>
        </div>

        <div
          style={{
            background: 'var(--color-midnight-card)',
            border: '1px solid var(--color-border)',
            borderRadius: '4px',
            padding: '3rem 2.5rem',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          }}
        >
          {success ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🥂</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: 'var(--color-champagne)', marginBottom: '0.5rem' }}>
                Table Reservation Inquiry Submitted
              </h3>
              <p style={{ color: 'var(--color-cloud-ivory)', fontSize: '1rem', maxWidth: '480px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
                Your elevated dining inquiry has been transmitted to our Level 54 VIP Host team. You will receive SMS &amp; email confirmation shortly.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="btn-skyline-outline"
              >
                Submit Another Reservation
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {error && (
                <div style={{ padding: '0.85rem 1.25rem', background: 'rgba(196, 122, 86, 0.25)', borderLeft: '3px solid var(--color-sunset-copper)', color: '#FFB59E', fontSize: '0.88rem' }}>
                  {error}
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-champagne)', marginBottom: '0.45rem', fontWeight: 700 }}>
                    Guest Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    placeholder="E.g., Alexander Wright"
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      background: 'var(--color-midnight)',
                      border: '1px solid var(--color-border-subtle)',
                      borderRadius: '3px',
                      color: 'var(--color-cloud-ivory)',
                      fontFamily: 'var(--font-body)',
                      outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-champagne)', marginBottom: '0.45rem', fontWeight: 700 }}>
                    Contact Telephone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      background: 'var(--color-midnight)',
                      border: '1px solid var(--color-border-subtle)',
                      borderRadius: '3px',
                      color: 'var(--color-cloud-ivory)',
                      fontFamily: 'var(--font-body)',
                      outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-champagne)', marginBottom: '0.45rem', fontWeight: 700 }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alexander@domain.com"
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      background: 'var(--color-midnight)',
                      border: '1px solid var(--color-border-subtle)',
                      borderRadius: '3px',
                      color: 'var(--color-cloud-ivory)',
                      fontFamily: 'var(--font-body)',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-champagne)', marginBottom: '0.45rem', fontWeight: 700 }}>
                    Dining Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      background: 'var(--color-midnight)',
                      border: '1px solid var(--color-border-subtle)',
                      borderRadius: '3px',
                      color: 'var(--color-cloud-ivory)',
                      fontFamily: 'var(--font-body)',
                      outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-champagne)', marginBottom: '0.45rem', fontWeight: 700 }}>
                    Seating Time *
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      background: 'var(--color-midnight)',
                      border: '1px solid var(--color-border-subtle)',
                      borderRadius: '3px',
                      color: 'var(--color-cloud-ivory)',
                      fontFamily: 'var(--font-body)',
                      outline: 'none',
                    }}
                  >
                    {times.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-champagne)', marginBottom: '0.45rem', fontWeight: 700 }}>
                    Party Size *
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      background: 'var(--color-midnight)',
                      border: '1px solid var(--color-border-subtle)',
                      borderRadius: '3px',
                      color: 'var(--color-cloud-ivory)',
                      fontFamily: 'var(--font-body)',
                      outline: 'none',
                    }}
                  >
                    {['1 Guest', '2 Guests', '3 Guests', '4 Guests', '5 Guests', '6 Guests', '7+ Guests (Private Suite)'].map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-champagne)', marginBottom: '0.45rem', fontWeight: 700 }}>
                  Atmosphere / Seating Dimension Preference *
                </label>
                <select
                  value={formData.seating_preference}
                  onChange={(e) => setFormData({ ...formData, seating_preference: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    background: 'var(--color-midnight)',
                    border: '1px solid var(--color-border-subtle)',
                    borderRadius: '3px',
                    color: 'var(--color-cloud-ivory)',
                    fontFamily: 'var(--font-body)',
                    outline: 'none',
                  }}
                >
                  {seatingOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-champagne)', marginBottom: '0.45rem', fontWeight: 700 }}>
                  Special Requests, Occasions, Allergies
                </label>
                <textarea
                  rows="3"
                  value={formData.special_requests}
                  onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
                  placeholder="E.g., Window view requested, celebration of anniversary, dietary preferences..."
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    background: 'var(--color-midnight)',
                    border: '1px solid var(--color-border-subtle)',
                    borderRadius: '3px',
                    color: 'var(--color-cloud-ivory)',
                    fontFamily: 'var(--font-body)',
                    outline: 'none',
                    resize: 'vertical',
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginTop: '0.5rem' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--color-twilight-slate)' }}>
                  {resCfg.policy || 'Smart elegant dress code requested. 48-hour cancellation policy.'}
                </span>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-skyline-primary"
                  style={{ padding: '0.95rem 2.5rem' }}
                >
                  {submitting ? 'Transmitting to Level 54...' : 'Confirm Table Reservation'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
