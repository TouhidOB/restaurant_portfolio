import React, { useState, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';
import { createReservation } from '../../services/api';

export default function ReservationModal() {
  const { isReservationOpen, closeReservation } = useCMS();

  const [formData, setFormData] = useState({
    guest_name: '',
    email: '',
    phone: '',
    reservation_date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    reservation_time: '19:30',
    party_size: 2,
    preferred_zone: 'Retro Leather Booth',
    special_requests: '',
  });

  const [loading, setLoading] = useState(false);
  const [successResult, setSuccessResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeReservation();
    };
    if (isReservationOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isReservationOpen, closeReservation]);

  if (!isReservationOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const payload = {
      ...formData,
      party_size: parseInt(formData.party_size, 10),
    };

    const res = await createReservation(payload);
    setLoading(false);

    if (res.success) {
      setSuccessResult(res.data);
    } else {
      setErrorMsg(res.error || 'Failed to submit reservation. Please check your connection.');
    }
  };

  const handleReset = () => {
    setSuccessResult(null);
    closeReservation();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        backgroundColor: 'rgba(9, 15, 27, 0.9)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
      onClick={handleReset}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '640px',
          maxHeight: '92vh',
          overflowY: 'auto',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-sm)',
          boxShadow: '0 24px 70px rgba(0, 0, 0, 0.7)',
          padding: '2.5rem',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleReset}
          aria-label="Close reservation dialog"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            backgroundColor: 'rgba(9, 15, 27, 0.85)',
            border: '1px solid var(--border-light)',
            color: 'var(--text-ivory)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          ✕
        </button>

        {successResult ? (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'rgba(67, 217, 232, 0.2)',
                border: '2px solid var(--neon-cyan)',
                color: 'var(--neon-cyan)',
                fontSize: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                boxShadow: '0 0 20px rgba(67, 217, 232, 0.4)',
              }}
            >
              ✓
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2.2rem',
                color: '#FFFFFF',
                marginBottom: '0.5rem',
              }}
            >
              Reservation Confirmed
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1rem',
                color: 'var(--neon-cyan)',
                marginBottom: '1.25rem',
                letterSpacing: '0.08em',
              }}
            >
              CODE #{successResult.reference_code || 'RETRO-SAVED'}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                color: 'var(--text-cream)',
                lineHeight: 1.6,
                maxWidth: '460px',
                margin: '0 auto 2rem',
              }}
            >
              Thank you, <strong>{successResult.guest_name}</strong>. We have allocated seating for{' '}
              <strong>{successResult.party_size} guests</strong> on{' '}
              <strong>{successResult.reservation_date}</strong> at{' '}
              <strong>{successResult.reservation_time}</strong>. An acknowledgment notice has been sent to{' '}
              <strong>{successResult.email}</strong>.
            </p>
            <button onClick={handleReset} className="btn-cherry" style={{ padding: '0.85rem 2.5rem' }}>
              <span>RETURN TO STARDUST</span>
            </button>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '1.75rem' }}>
              <span className="section-tag" style={{ marginBottom: '0.75rem' }}>
                TABLE INQUIRY & BOOKING
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.2rem',
                  color: '#FFFFFF',
                  lineHeight: 1.1,
                  marginBottom: '0.5rem',
                }}
              >
                Reserve Your Booth
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.95rem',
                  color: 'var(--text-cream)',
                }}
              >
                Select your preferred dining zone and arrival details.
              </p>
            </div>

            {errorMsg && (
              <div
                style={{
                  padding: '0.75rem 1rem',
                  marginBottom: '1.25rem',
                  backgroundColor: 'rgba(216, 58, 69, 0.2)',
                  border: '1px solid var(--cherry-red)',
                  color: '#FFA5AC',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '0.88rem',
                }}
              >
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.08em',
                      color: 'var(--neon-cyan)',
                      marginBottom: '0.4rem',
                      textTransform: 'uppercase',
                    }}
                  >
                    Guest Name *
                  </label>
                  <input
                    type="text"
                    name="guest_name"
                    required
                    value={formData.guest_name}
                    onChange={handleChange}
                    placeholder="e.g. Betty Cooper"
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.9rem',
                      backgroundColor: 'var(--bg-midnight-deep)',
                      border: '1px solid var(--border-diner)',
                      borderRadius: 'var(--radius-xs)',
                      color: 'var(--text-ivory)',
                      outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.08em',
                      color: 'var(--neon-cyan)',
                      marginBottom: '0.4rem',
                      textTransform: 'uppercase',
                    }}
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="betty@stardust.com"
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.9rem',
                      backgroundColor: 'var(--bg-midnight-deep)',
                      border: '1px solid var(--border-diner)',
                      borderRadius: 'var(--radius-xs)',
                      color: 'var(--text-ivory)',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.08em',
                      color: 'var(--neon-cyan)',
                      marginBottom: '0.4rem',
                      textTransform: 'uppercase',
                    }}
                  >
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (312) 555-0199"
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.9rem',
                      backgroundColor: 'var(--bg-midnight-deep)',
                      border: '1px solid var(--border-diner)',
                      borderRadius: 'var(--radius-xs)',
                      color: 'var(--text-ivory)',
                      outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.08em',
                      color: 'var(--neon-cyan)',
                      marginBottom: '0.4rem',
                      textTransform: 'uppercase',
                    }}
                  >
                    Party Size (PAX) *
                  </label>
                  <select
                    name="party_size"
                    value={formData.party_size}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.9rem',
                      backgroundColor: 'var(--bg-midnight-deep)',
                      border: '1px solid var(--border-diner)',
                      borderRadius: 'var(--radius-xs)',
                      color: 'var(--text-ivory)',
                      outline: 'none',
                    }}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.08em',
                      color: 'var(--neon-cyan)',
                      marginBottom: '0.4rem',
                      textTransform: 'uppercase',
                    }}
                  >
                    Dining Date *
                  </label>
                  <input
                    type="date"
                    name="reservation_date"
                    required
                    value={formData.reservation_date}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.9rem',
                      backgroundColor: 'var(--bg-midnight-deep)',
                      border: '1px solid var(--border-diner)',
                      borderRadius: 'var(--radius-xs)',
                      color: 'var(--text-ivory)',
                      outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.08em',
                      color: 'var(--neon-cyan)',
                      marginBottom: '0.4rem',
                      textTransform: 'uppercase',
                    }}
                  >
                    Seating Time *
                  </label>
                  <select
                    name="reservation_time"
                    value={formData.reservation_time}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.9rem',
                      backgroundColor: 'var(--bg-midnight-deep)',
                      border: '1px solid var(--border-diner)',
                      borderRadius: 'var(--radius-xs)',
                      color: 'var(--text-ivory)',
                      outline: 'none',
                    }}
                  >
                    <option value="11:30">11:30 AM — Diner Lunch</option>
                    <option value="13:00">1:00 PM — Midday Service</option>
                    <option value="17:30">5:30 PM — Twilight Sizzle</option>
                    <option value="19:30">7:30 PM — Prime Dinner</option>
                    <option value="21:30">9:30 PM — Jukebox Hour</option>
                    <option value="23:30">11:30 PM — Midnight Shake Service</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.08em',
                    color: 'var(--neon-cyan)',
                    marginBottom: '0.4rem',
                    textTransform: 'uppercase',
                  }}
                >
                  Preferred Diner Area
                </label>
                <select
                  name="preferred_zone"
                  value={formData.preferred_zone}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.9rem',
                    backgroundColor: 'var(--bg-midnight-deep)',
                    border: '1px solid var(--border-diner)',
                    borderRadius: 'var(--radius-xs)',
                    color: 'var(--text-ivory)',
                    outline: 'none',
                  }}
                >
                  <option value="Retro Leather Booth">Red Leather Booth with Table Jukebox</option>
                  <option value="Stainless Steel Counter">40-Ft Stainless Steel Counter Stool</option>
                  <option value="Atomic Neon Lounge">Atomic Neon Cocktail Lounge</option>
                  <option value="Spaceport Terrace">Outdoor Roadside Terrace</option>
                </select>
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.08em',
                    color: 'var(--neon-cyan)',
                    marginBottom: '0.4rem',
                    textTransform: 'uppercase',
                  }}
                >
                  Special Requests / Dietary Notes
                </label>
                <textarea
                  name="special_requests"
                  rows="2"
                  value={formData.special_requests}
                  onChange={handleChange}
                  placeholder="e.g. Birthday celebration, gluten sensitivity, prefer corner booth."
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.9rem',
                    backgroundColor: 'var(--bg-midnight-deep)',
                    border: '1px solid var(--border-diner)',
                    borderRadius: 'var(--radius-xs)',
                    color: 'var(--text-ivory)',
                    outline: 'none',
                    resize: 'none',
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-cherry"
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '0.95rem',
                  marginTop: '0.5rem',
                  opacity: loading ? 0.7 : 1,
                }}
              >
                <span>{loading ? 'SECURING BOOTH...' : 'SUBMIT RESERVATION INQUIRY'}</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
