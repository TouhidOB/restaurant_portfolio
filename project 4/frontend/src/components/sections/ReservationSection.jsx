import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { submitReservation } from '../../services/api';

export default function ReservationSection() {
  const { content } = useCMS();
  const s12 = content.sections?.reservation || {};
  const r = content.restaurant || {};

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    reservation_date: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    reservation_time: '19:45',
    guest_count: 2,
    seating_area: 'Main Concrete Hall',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');
    try {
      const res = await submitReservation(formData);
      setSuccess(res);
    } catch (err) {
      setErrorMsg(err.message || 'Transmission failed. Please verify fields.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="reservation" className="section-shell">
      <div className="container-brutal">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'clamp(2.5rem, 5vw, 4.5rem)', alignItems: 'center' }}>
          {/* Left Column: Guidelines & Policy */}
          <div>
            <div className="section-tag">
              SECTION 12 // {s12.eyebrow || 'RESERVATIONS'}
            </div>
            <h2 className="section-heading">
              {s12.title || 'YOUR TABLE IS WAITING.'}
            </h2>
            <p className="section-lead" style={{ marginBottom: '2rem' }}>
              {s12.subtitle || 'Reservations unlock 30 days in advance at 09:00 EST. Walk-ins accommodated at the steel bar.'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ borderLeft: '2px solid var(--accent-orange)', paddingLeft: '1.25rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-orange)', fontWeight: 700 }}>
                  01 // SEATING ARC
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                  Tables are allocated for 2.5 hours to allow an unhurried progression through our 12-course wood-fired repertoire.
                </p>
              </div>

              <div style={{ borderLeft: '2px solid var(--border-steel)', paddingLeft: '1.25rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--concrete-raw)', fontWeight: 700 }}>
                  02 // PRIVATE ATELIER
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                  Parties of 6 to 18 may reserve the Concrete Atelier with dedicated wood-fired hearth and private sommeliers.
                </p>
              </div>

              <div style={{ borderLeft: '2px solid var(--border-steel)', paddingLeft: '1.25rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--concrete-raw)', fontWeight: 700 }}>
                  03 // DIRECT INQUIRIES
                </div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                  TEL: {r.phone} &bull; {r.email}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: In-page Brutalist Booking Terminal */}
          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-steel)',
              padding: 'clamp(1.5rem, 4vw, 2.5rem)',
              position: 'relative',
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--accent-orange)' }} />

            <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-steel)', paddingBottom: '1rem' }}>
              <span className="section-tag" style={{ marginBottom: '0.4rem' }}>
                TERMINAL &bull; SECTOR 09
              </span>
              <h3 style={{ fontSize: '1.4rem' }}>DISPATCH RESERVATION</h3>
            </div>

            {success ? (
              <div
                style={{
                  background: 'rgba(240, 90, 40, 0.08)',
                  border: '1px solid var(--accent-orange)',
                  padding: '1.5rem',
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-orange)', marginBottom: '0.25rem' }}>
                  STATUS: REGISTRY CONFIRMED
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem' }}>
                  {success.reference_code}
                </div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                  Your inquiry has been cataloged. Our concierge will review dietary notes and confirm details within two hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSuccess(null)}
                  className="btn-outline-brutal"
                  style={{ width: '100%', padding: '0.75rem' }}
                >
                  NEW RESERVATION &rarr;
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {errorMsg && (
                  <div style={{ color: '#f87171', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', marginBottom: '1rem' }}>
                    {errorMsg}
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                      FULL NAME
                    </label>
                    <input
                      type="text"
                      name="full_name"
                      required
                      value={formData.full_name}
                      onChange={handleChange}
                      placeholder="e.g. Julian Vance"
                      style={{
                        width: '100%',
                        background: 'var(--bg-dark)',
                        border: '1px solid var(--border-steel)',
                        color: '#fff',
                        padding: '0.6rem 0.75rem',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.85rem',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                      EMAIL
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="julian@arch.org"
                      style={{
                        width: '100%',
                        background: 'var(--bg-dark)',
                        border: '1px solid var(--border-steel)',
                        color: '#fff',
                        padding: '0.6rem 0.75rem',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.85rem',
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                      DATE
                    </label>
                    <input
                      type="date"
                      name="reservation_date"
                      required
                      value={formData.reservation_date}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        background: 'var(--bg-dark)',
                        border: '1px solid var(--border-steel)',
                        color: '#fff',
                        padding: '0.6rem 0.5rem',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8rem',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                      TIME
                    </label>
                    <select
                      name="reservation_time"
                      value={formData.reservation_time}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        background: 'var(--bg-dark)',
                        border: '1px solid var(--border-steel)',
                        color: '#fff',
                        padding: '0.6rem 0.5rem',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8rem',
                      }}
                    >
                      <option value="17:30">17:30</option>
                      <option value="18:00">18:00</option>
                      <option value="19:45">19:45</option>
                      <option value="20:15">20:15</option>
                      <option value="21:30">21:30</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                      GUESTS
                    </label>
                    <select
                      name="guest_count"
                      value={formData.guest_count}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        background: 'var(--bg-dark)',
                        border: '1px solid var(--border-steel)',
                        color: '#fff',
                        padding: '0.6rem 0.5rem',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8rem',
                      }}
                    >
                      {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((n) => (
                        <option key={n} value={n}>
                          {n} PAX
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                    PHONE NUMBER
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (212) 555-0198"
                    style={{
                      width: '100%',
                      background: 'var(--bg-dark)',
                      border: '1px solid var(--border-steel)',
                      color: '#fff',
                      padding: '0.6rem 0.75rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-orange"
                  style={{ width: '100%', padding: '0.85rem' }}
                >
                  {submitting ? 'TRANSMITTING...' : 'DISPATCH RESERVATION &rarr;'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
