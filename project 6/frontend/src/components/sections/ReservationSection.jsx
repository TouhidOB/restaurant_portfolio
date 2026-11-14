import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { createReservation } from '../../services/api';

export default function ReservationSection() {
  const { content } = useCMS();
  const resSection = content?.sections?.reservation || {};
  const restaurant = content?.restaurant || {};

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
      setErrorMsg(res.error || 'Failed to submit reservation. Please check your network connection.');
    }
  };

  return (
    <section id="reservations" className="section-shell">
      <div className="container-diner">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(2.5rem, 5vw, 5rem)',
            alignItems: 'flex-start',
          }}
        >
          {/* Left Column: Context & Guidelines */}
          <div>
            <span className="section-tag">
              {resSection.eyebrow || 'TABLE INQUIRY'}
            </span>
            <h2 className="section-heading">
              {resSection.title || "COME ON IN. YOUR TABLE IS READY TO REQUEST."}
            </h2>
            <p className="section-lead" style={{ marginBottom: '2rem' }}>
              {resSection.subtitle ||
                'Planning a visit? Send us your reservation request and our team will help arrange your dining experience.'}
            </p>

            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-diner)',
                borderRadius: 'var(--radius-sm)',
                padding: '1.75rem',
                marginBottom: '2rem',
              }}
            >
              <h4
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  letterSpacing: '0.1em',
                  color: 'var(--neon-cyan)',
                  textTransform: 'uppercase',
                  marginBottom: '0.75rem',
                }}
              >
                ★ DINER SEATING POLICIES
              </h4>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  fontSize: '0.9rem',
                  color: 'var(--text-cream)',
                }}
              >
                <li style={{ display: 'flex', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--cherry-red)' }}>★</span>
                  <span>Walk-ins are always welcomed at our 24-seat chrome counter.</span>
                </li>
                <li style={{ display: 'flex', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--cherry-red)' }}>★</span>
                  <span>Booth reservations are held for 15 minutes past arrival time.</span>
                </li>
                <li style={{ display: 'flex', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--cherry-red)' }}>★</span>
                  <span>For large groups of 9 or more, please submit your request 48 hours in advance.</span>
                </li>
              </ul>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.9rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                DIRECT PHONE RESERVATIONS
              </span>
              <a href={`tel:${restaurant.phone || '+13125551955'}`} style={{ color: '#FFFFFF', fontWeight: 700 }}>
                {restaurant.phone || '+1 (312) 555-1955'}
              </a>
              <a href={`mailto:${restaurant.email || 'concierge@stardustdiner.com'}`} style={{ color: 'var(--neon-cyan)' }}>
                {restaurant.email || 'concierge@stardustdiner.com'}
              </a>
            </div>
          </div>

          {/* Right Column: In-Page Booking Terminal Form */}
          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-sm)',
              padding: 'clamp(2rem, 4vw, 3rem)',
              boxShadow: '0 20px 48px rgba(0, 0, 0, 0.5)',
            }}
          >
            {successResult ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(67, 217, 232, 0.2)',
                    border: '2px solid var(--neon-cyan)',
                    color: 'var(--neon-cyan)',
                    fontSize: '1.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem',
                  }}
                >
                  ✓
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2rem',
                    color: '#FFFFFF',
                    marginBottom: '0.5rem',
                  }}
                >
                  Table Request Received
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.95rem',
                    color: 'var(--cherry-red)',
                    marginBottom: '1rem',
                  }}
                >
                  REF #{successResult.reference_code || 'RETRO-SAVED'}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    color: 'var(--text-cream)',
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    marginBottom: '1.75rem',
                  }}
                >
                  Thank you, <strong>{successResult.guest_name}</strong>. We look forward to welcoming you for{' '}
                  <strong>{successResult.party_size} guests</strong> on <strong>{successResult.reservation_date}</strong>.
                </p>
                <button
                  onClick={() => setSuccessResult(null)}
                  className="btn-outline-diner"
                  style={{ padding: '0.75rem 2rem' }}
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.85rem',
                    color: '#FFFFFF',
                    marginBottom: '0.5rem',
                  }}
                >
                  Booth Reservation Form
                </h3>

                {errorMsg && (
                  <div
                    style={{
                      padding: '0.75rem 1rem',
                      backgroundColor: 'rgba(216, 58, 69, 0.2)',
                      border: '1px solid var(--cherry-red)',
                      color: '#FFA5AC',
                      borderRadius: 'var(--radius-xs)',
                      fontSize: '0.85rem',
                    }}
                  >
                    {errorMsg}
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: 'var(--neon-cyan)',
                        marginBottom: '0.35rem',
                      }}
                    >
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      name="guest_name"
                      required
                      value={formData.guest_name}
                      onChange={handleChange}
                      placeholder="e.g. Donna Hayward"
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.85rem',
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
                        fontSize: '0.7rem',
                        color: 'var(--neon-cyan)',
                        marginBottom: '0.35rem',
                      }}
                    >
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="donna@stardust.com"
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.85rem',
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
                        fontSize: '0.7rem',
                        color: 'var(--neon-cyan)',
                        marginBottom: '0.35rem',
                      }}
                    >
                      PHONE NUMBER *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (312) 555-0182"
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.85rem',
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
                        fontSize: '0.7rem',
                        color: 'var(--neon-cyan)',
                        marginBottom: '0.35rem',
                      }}
                    >
                      GUEST COUNT *
                    </label>
                    <select
                      name="party_size"
                      value={formData.party_size}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.85rem',
                        backgroundColor: 'var(--bg-midnight-deep)',
                        border: '1px solid var(--border-diner)',
                        borderRadius: 'var(--radius-xs)',
                        color: 'var(--text-ivory)',
                        outline: 'none',
                      }}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 10].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? 'Guest' : 'Guests'}
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
                        fontSize: '0.7rem',
                        color: 'var(--neon-cyan)',
                        marginBottom: '0.35rem',
                      }}
                    >
                      DATE *
                    </label>
                    <input
                      type="date"
                      name="reservation_date"
                      required
                      value={formData.reservation_date}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.85rem',
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
                        fontSize: '0.7rem',
                        color: 'var(--neon-cyan)',
                        marginBottom: '0.35rem',
                      }}
                    >
                      TIME *
                    </label>
                    <select
                      name="reservation_time"
                      value={formData.reservation_time}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.85rem',
                        backgroundColor: 'var(--bg-midnight-deep)',
                        border: '1px solid var(--border-diner)',
                        borderRadius: 'var(--radius-xs)',
                        color: 'var(--text-ivory)',
                        outline: 'none',
                      }}
                    >
                      <option value="11:30">11:30 AM</option>
                      <option value="13:00">1:00 PM</option>
                      <option value="17:30">5:30 PM</option>
                      <option value="19:30">7:30 PM</option>
                      <option value="21:30">9:30 PM</option>
                      <option value="23:30">11:30 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: 'var(--neon-cyan)',
                      marginBottom: '0.35rem',
                    }}
                  >
                    PREFERRED DINING AREA
                  </label>
                  <select
                    name="preferred_zone"
                    value={formData.preferred_zone}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.85rem',
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
                  </select>
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: 'var(--neon-cyan)',
                      marginBottom: '0.35rem',
                    }}
                  >
                    NOTES & SPECIAL REQUESTS
                  </label>
                  <textarea
                    name="special_requests"
                    rows="2"
                    value={formData.special_requests}
                    onChange={handleChange}
                    placeholder="Dietary preferences, special celebrations, booth requests..."
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.85rem',
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
                  <span>{loading ? 'TRANSMITTING REQUEST...' : 'SUBMIT RESERVATION REQUEST'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
