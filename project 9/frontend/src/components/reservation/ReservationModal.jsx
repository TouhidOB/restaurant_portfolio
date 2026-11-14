import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { submitReservation } from '../../services/api';

export default function ReservationModal() {
  const { content, activeReservationModal, closeReservation } = useCMS();
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

  if (!activeReservationModal) return null;

  const resCfg = content?.reservation || {};
  const times = resCfg.times || ["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM"];
  const seatingOptions = resCfg.seating_options || [
    { value: 'outdoor_terrace', label: 'Open-Air Sunset Terrace' },
    { value: 'indoor_lounge', label: 'Indoor Sky Lounge' },
    { value: 'window_side', label: 'Horizon Window Table' },
    { value: 'private_room', label: 'Private Horizon Suite' },
    { value: 'any', label: 'Best Available Seating' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await submitReservation(formData);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        closeReservation();
      }, 2500);
    } catch (err) {
      setError(err.message || 'Unable to submit reservation inquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(10, 18, 29, 0.85)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={closeReservation}
    >
      <div
        style={{
          background: 'var(--color-midnight)',
          border: '1px solid var(--color-border)',
          borderRadius: '4px',
          maxWidth: '560px',
          width: '100%',
          padding: '2.5rem',
          boxShadow: '0 25px 50px rgba(0,0,0,0.6)',
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeReservation}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'none',
            border: 'none',
            color: 'var(--color-cloud-ivory)',
            fontSize: '1.6rem',
            cursor: 'pointer',
            lineHeight: 1,
          }}
        >
          &times;
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <span className="section-label">LEVEL 54 &bull; RESERVATION</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--color-cloud-ivory)', marginTop: '0.2rem' }}>
            {resCfg.title || 'Table Reservations'}
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-twilight-slate)', marginTop: '0.4rem' }}>
            {resCfg.policy || 'Smart elegant attire requested. We uphold a 48-hour cancellation policy.'}
          </p>
        </div>

        {success ? (
          <div style={{ padding: '2.5rem 1rem', textAlign: 'center', background: 'rgba(38, 63, 90, 0.5)', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
            <div style={{ fontSize: '2.4rem', marginBottom: '0.8rem' }}>🥂</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--color-champagne)', marginBottom: '0.4rem' }}>
              Inquiry Confirmed
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-cloud-ivory)' }}>
              Thank you, {formData.full_name}. Our Level 54 VIP Guest Concierge will review and confirm your table shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            {error && (
              <div style={{ padding: '0.75rem 1rem', background: 'rgba(196, 122, 86, 0.25)', borderLeft: '3px solid var(--color-sunset-copper)', color: '#FFB59E', fontSize: '0.85rem' }}>
                {error}
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-champagne)', marginBottom: '0.35rem', fontWeight: 700 }}>
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                placeholder="Lord / Lady / Mr. / Ms. Alexander Wright"
                style={{
                  width: '100%',
                  padding: '0.75rem 0.9rem',
                  background: 'var(--color-midnight-card)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: '3px',
                  color: 'var(--color-cloud-ivory)',
                  fontFamily: 'var(--font-body)',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-champagne)', marginBottom: '0.35rem', fontWeight: 700 }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.9rem',
                    background: 'var(--color-midnight-card)',
                    border: '1px solid var(--color-border-subtle)',
                    borderRadius: '3px',
                    color: 'var(--color-cloud-ivory)',
                    fontFamily: 'var(--font-body)',
                    outline: 'none',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-champagne)', marginBottom: '0.35rem', fontWeight: 700 }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alexander@domain.com"
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.9rem',
                    background: 'var(--color-midnight-card)',
                    border: '1px solid var(--color-border-subtle)',
                    borderRadius: '3px',
                    color: 'var(--color-cloud-ivory)',
                    fontFamily: 'var(--font-body)',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.85rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-champagne)', marginBottom: '0.35rem', fontWeight: 700 }}>
                  Date
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.9rem',
                    background: 'var(--color-midnight-card)',
                    border: '1px solid var(--color-border-subtle)',
                    borderRadius: '3px',
                    color: 'var(--color-cloud-ivory)',
                    fontFamily: 'var(--font-body)',
                    outline: 'none',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-champagne)', marginBottom: '0.35rem', fontWeight: 700 }}>
                  Time
                </label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.9rem',
                    background: 'var(--color-midnight-card)',
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
                <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-champagne)', marginBottom: '0.35rem', fontWeight: 700 }}>
                  Guests
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.9rem',
                    background: 'var(--color-midnight-card)',
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
              <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-champagne)', marginBottom: '0.35rem', fontWeight: 700 }}>
                Seating Atmosphere Preference
              </label>
              <select
                value={formData.seating_preference}
                onChange={(e) => setFormData({ ...formData, seating_preference: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem 0.9rem',
                  background: 'var(--color-midnight-card)',
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
              <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-champagne)', marginBottom: '0.35rem', fontWeight: 700 }}>
                Special Occasion or Dietary Preferences
              </label>
              <textarea
                rows="2"
                value={formData.special_requests}
                onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
                placeholder="E.g., Anniversary dinner, window view requested, gluten-free tasting menu..."
                style={{
                  width: '100%',
                  padding: '0.75rem 0.9rem',
                  background: 'var(--color-midnight-card)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: '3px',
                  color: 'var(--color-cloud-ivory)',
                  fontFamily: 'var(--font-body)',
                  outline: 'none',
                  resize: 'none',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-skyline-primary"
              style={{ marginTop: '0.5rem', width: '100%', padding: '0.95rem' }}
            >
              {submitting ? 'Confirming with Level 54 Concierge...' : 'Submit Table Reservation'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
