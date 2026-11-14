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
    preferred_zone: 'PAVILION',
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
        backgroundColor: 'rgba(15, 28, 22, 0.88)',
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
          backgroundColor: 'var(--bg-forest)',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-md)',
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
            backgroundColor: 'rgba(26, 47, 37, 0.85)',
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
                backgroundColor: 'rgba(82, 116, 90, 0.3)',
                border: '2px solid var(--botanical-green)',
                color: 'var(--accent-citrus)',
                fontSize: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
              }}
            >
              ✓
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2.2rem',
                color: 'var(--text-ivory)',
                marginBottom: '0.5rem',
              }}
            >
              Reservation Confirmed
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1rem',
                color: 'var(--accent-terracotta)',
                marginBottom: '1.25rem',
                letterSpacing: '0.08em',
              }}
            >
              REF #{successResult.reference_code || 'TROP-SAVED'}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                color: 'var(--text-sand)',
                lineHeight: 1.6,
                maxWidth: '460px',
                margin: '0 auto 2rem',
              }}
            >
              Thank you, <strong>{successResult.guest_name}</strong>. We have allocated seating for{' '}
              <strong>{successResult.party_size} guests</strong> on{' '}
              <strong>{successResult.reservation_date}</strong> at{' '}
              <strong>{successResult.reservation_time}</strong>. An advisory note has been forwarded to{' '}
              <strong>{successResult.email}</strong>.
            </p>
            <button onClick={handleReset} className="btn-terracotta" style={{ padding: '0.85rem 2.5rem' }}>
              <span>RETURN TO VERDANT</span>
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
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2.2rem',
                  color: 'var(--text-ivory)',
                  lineHeight: 1.1,
                  marginBottom: '0.5rem',
                }}
              >
                Reserve Your Experience
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.95rem',
                  color: 'var(--text-sand)',
                }}
              >
                Select your preferred tropical dining environment and arrival details.
              </p>
            </div>

            {errorMsg && (
              <div
                style={{
                  padding: '0.75rem 1rem',
                  marginBottom: '1.25rem',
                  backgroundColor: 'rgba(188, 70, 70, 0.2)',
                  border: '1px solid #C04A4A',
                  color: '#FFB8B8',
                  borderRadius: 'var(--radius-sm)',
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
                      color: 'var(--sage-mist)',
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
                    placeholder="e.g. Elena Rostova"
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.9rem',
                      backgroundColor: 'var(--bg-forest-deep)',
                      border: '1px solid var(--border-botanical)',
                      borderRadius: 'var(--radius-sm)',
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
                      color: 'var(--sage-mist)',
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
                    placeholder="elena@example.com"
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.9rem',
                      backgroundColor: 'var(--bg-forest-deep)',
                      border: '1px solid var(--border-botanical)',
                      borderRadius: 'var(--radius-sm)',
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
                      color: 'var(--sage-mist)',
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
                    placeholder="+1 (305) 555-0199"
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.9rem',
                      backgroundColor: 'var(--bg-forest-deep)',
                      border: '1px solid var(--border-botanical)',
                      borderRadius: 'var(--radius-sm)',
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
                      color: 'var(--sage-mist)',
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
                      backgroundColor: 'var(--bg-forest-deep)',
                      border: '1px solid var(--border-botanical)',
                      borderRadius: 'var(--radius-sm)',
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
                      color: 'var(--sage-mist)',
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
                      backgroundColor: 'var(--bg-forest-deep)',
                      border: '1px solid var(--border-botanical)',
                      borderRadius: 'var(--radius-sm)',
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
                      color: 'var(--sage-mist)',
                      marginBottom: '0.4rem',
                      textTransform: 'uppercase',
                    }}
                  >
                    Service Seating Time *
                  </label>
                  <select
                    name="reservation_time"
                    value={formData.reservation_time}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.9rem',
                      backgroundColor: 'var(--bg-forest-deep)',
                      border: '1px solid var(--border-botanical)',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--text-ivory)',
                      outline: 'none',
                    }}
                  >
                    <option value="12:00">12:00 PM — Botanical Lunch</option>
                    <option value="13:30">1:30 PM — Afternoon Canopy</option>
                    <option value="17:30">5:30 PM — Sunset Twilight</option>
                    <option value="19:00">7:00 PM — Prime Dinner</option>
                    <option value="20:30">8:30 PM — Evening Feast</option>
                    <option value="21:45">9:45 PM — Night Hearth</option>
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
                    color: 'var(--sage-mist)',
                    marginBottom: '0.4rem',
                    textTransform: 'uppercase',
                  }}
                >
                  Preferred Tropical Zone
                </label>
                <select
                  name="preferred_zone"
                  value={formData.preferred_zone}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.9rem',
                    backgroundColor: 'var(--bg-forest-deep)',
                    border: '1px solid var(--border-botanical)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-ivory)',
                    outline: 'none',
                  }}
                >
                  <option value="PAVILION">Main Open-Air Dining Pavilion</option>
                  <option value="CANOPY">Exterior Palm Canopy Elevation</option>
                  <option value="TERRACE">Garden Terrace & Palm Oasis</option>
                  <option value="COURT">Botanical Entrance & Reflection Pond</option>
                  <option value="HEARTH">Teak Wood Hearth & Botanical Bar</option>
                </select>
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.08em',
                    color: 'var(--sage-mist)',
                    marginBottom: '0.4rem',
                    textTransform: 'uppercase',
                  }}
                >
                  Dietary Restrictions / Special Requests
                </label>
                <textarea
                  name="special_requests"
                  rows="2"
                  value={formData.special_requests}
                  onChange={handleChange}
                  placeholder="e.g. Celebrating an anniversary, severe shellfish allergy, prefer garden view."
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.9rem',
                    backgroundColor: 'var(--bg-forest-deep)',
                    border: '1px solid var(--border-botanical)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-ivory)',
                    outline: 'none',
                    resize: 'none',
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-terracotta"
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '0.95rem',
                  marginTop: '0.5rem',
                  opacity: loading ? 0.7 : 1,
                }}
              >
                <span>{loading ? 'CONFIRMING WITH CONCIERGE...' : 'CONFIRM RESERVATION'}</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
