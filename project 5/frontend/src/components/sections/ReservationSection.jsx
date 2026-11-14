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
    preferred_zone: 'PAVILION',
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
      <div className="container-tropical">
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
              {resSection.eyebrow || 'RESERVATIONS'}
            </span>
            <h2 className="section-heading">
              {resSection.title || "LET'S MAKE ROOM FOR GOOD MOMENTS."}
            </h2>
            <p className="section-lead" style={{ marginBottom: '2rem' }}>
              {resSection.subtitle ||
                'Planning a visit? Send us your reservation request and our team will help you arrange your dining experience.'}
            </p>

            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-botanical)',
                borderRadius: 'var(--radius-md)',
                padding: '1.75rem',
                marginBottom: '2rem',
              }}
            >
              <h4
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  letterSpacing: '0.1em',
                  color: 'var(--accent-citrus)',
                  textTransform: 'uppercase',
                  marginBottom: '0.75rem',
                }}
              >
                HOSPITALITY PROTOCOLS
              </h4>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  fontSize: '0.9rem',
                  color: 'var(--text-sand)',
                }}
              >
                <li style={{ display: 'flex', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--accent-terracotta)' }}>✦</span>
                  <span>Tables held for 15 minutes past scheduled seating time.</span>
                </li>
                <li style={{ display: 'flex', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--accent-terracotta)' }}>✦</span>
                  <span>Canopy garden seating is sheltered and operable during light coastal rain.</span>
                </li>
                <li style={{ display: 'flex', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--accent-terracotta)' }}>✦</span>
                  <span>Parties of 9 or more require advance coordination with our private events team.</span>
                </li>
              </ul>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.9rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--sage-mist)' }}>
                DIRECT CONCIERGE DESK
              </span>
              <a href={`tel:${restaurant.phone || '+13055550428'}`} style={{ color: 'var(--text-ivory)', fontWeight: 600 }}>
                {restaurant.phone || '+1 (305) 555-0428'}
              </a>
              <a href={`mailto:${restaurant.email || 'concierge@verdant-dining.com'}`} style={{ color: 'var(--accent-terracotta)' }}>
                {restaurant.email || 'concierge@verdant-dining.com'}
              </a>
            </div>
          </div>

          {/* Right Column: In-Page Booking Terminal Form */}
          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              padding: 'clamp(2rem, 4vw, 3rem)',
              boxShadow: '0 20px 48px rgba(0, 0, 0, 0.4)',
            }}
          >
            {successResult ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(82, 116, 90, 0.3)',
                    border: '2px solid var(--botanical-green)',
                    color: 'var(--accent-citrus)',
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
                    fontFamily: 'var(--font-serif)',
                    fontSize: '2rem',
                    color: 'var(--text-ivory)',
                    marginBottom: '0.5rem',
                  }}
                >
                  Table Confirmed
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.95rem',
                    color: 'var(--accent-terracotta)',
                    marginBottom: '1rem',
                  }}
                >
                  CODE: {successResult.reference_code || 'TROP-SAVED'}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    color: 'var(--text-sand)',
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    marginBottom: '1.75rem',
                  }}
                >
                  Thank you, <strong>{successResult.guest_name}</strong>. We look forward to hosting you in our{' '}
                  <strong>{formData.preferred_zone}</strong> area on <strong>{successResult.reservation_date}</strong>.
                </p>
                <button
                  onClick={() => setSuccessResult(null)}
                  className="btn-outline-tropical"
                  style={{ padding: '0.75rem 2rem' }}
                >
                  New Reservation Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.85rem',
                    color: 'var(--text-ivory)',
                    marginBottom: '0.5rem',
                  }}
                >
                  Table Reservation Form
                </h3>

                {errorMsg && (
                  <div
                    style={{
                      padding: '0.75rem 1rem',
                      backgroundColor: 'rgba(188, 70, 70, 0.2)',
                      border: '1px solid #C04A4A',
                      color: '#FFB8B8',
                      borderRadius: 'var(--radius-sm)',
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
                        color: 'var(--sage-mist)',
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
                      placeholder="e.g. Maya Lin"
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.85rem',
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
                        fontSize: '0.7rem',
                        color: 'var(--sage-mist)',
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
                      placeholder="maya@atelier.com"
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.85rem',
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
                        fontSize: '0.7rem',
                        color: 'var(--sage-mist)',
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
                      placeholder="+1 (305) 555-0182"
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.85rem',
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
                        fontSize: '0.7rem',
                        color: 'var(--sage-mist)',
                        marginBottom: '0.35rem',
                      }}
                    >
                      PARTY SIZE *
                    </label>
                    <select
                      name="party_size"
                      value={formData.party_size}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.85rem',
                        backgroundColor: 'var(--bg-forest-deep)',
                        border: '1px solid var(--border-botanical)',
                        borderRadius: 'var(--radius-sm)',
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
                        color: 'var(--sage-mist)',
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
                        fontSize: '0.7rem',
                        color: 'var(--sage-mist)',
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
                        backgroundColor: 'var(--bg-forest-deep)',
                        border: '1px solid var(--border-botanical)',
                        borderRadius: 'var(--radius-sm)',
                        color: 'var(--text-ivory)',
                        outline: 'none',
                      }}
                    >
                      <option value="12:00">12:00 PM</option>
                      <option value="13:30">1:30 PM</option>
                      <option value="17:30">5:30 PM</option>
                      <option value="19:00">7:00 PM</option>
                      <option value="20:30">8:30 PM</option>
                      <option value="21:45">9:45 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: 'var(--sage-mist)',
                      marginBottom: '0.35rem',
                    }}
                  >
                    PREFERRED DINING ZONE
                  </label>
                  <select
                    name="preferred_zone"
                    value={formData.preferred_zone}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.85rem',
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
                    <option value="HEARTH">Teak Wood Hearth Bar</option>
                  </select>
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: 'var(--sage-mist)',
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
                    placeholder="Dietary requirements, celebrations, or preferences..."
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.85rem',
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
                  <span>{loading ? 'SECURING TABLE...' : 'SUBMIT RESERVATION REQUEST'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
