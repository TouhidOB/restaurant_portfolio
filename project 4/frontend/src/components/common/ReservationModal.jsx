import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { submitReservation } from '../../services/api';

export default function ReservationModal() {
  const { isReservationOpen, closeReservation } = useCMS();

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    reservation_date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    reservation_time: '19:30',
    guest_count: 2,
    seating_area: 'Main Concrete Hall',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [successResult, setSuccessResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isReservationOpen) return null;

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
      setSuccessResult(res);
    } catch (err) {
      setErrorMsg(err.message || 'An error occurred while confirming your reservation.');
    } finally {
      setSubmitting(false);
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
        zIndex: 2000,
        backgroundColor: 'rgba(15, 16, 14, 0.88)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={closeReservation}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '580px',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-steel)',
          position: 'relative',
          padding: 'clamp(1.5rem, 4vw, 2.5rem)',
          boxShadow: '0 24px 48px rgba(0,0,0,0.8)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--accent-orange)' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div>
            <span className="section-tag" style={{ marginBottom: '0.4rem' }}>
              TABLE INQUIRY &bull; SECTOR 09
            </span>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700 }}>RESERVATION PORTAL</h2>
          </div>
          <button
            type="button"
            onClick={closeReservation}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '1.5rem',
              cursor: 'pointer',
              lineHeight: 1,
            }}
          >
            &times;
          </button>
        </div>

        {successResult ? (
          <div>
            <div
              style={{
                background: 'rgba(240, 90, 40, 0.1)',
                border: '1px solid var(--accent-orange)',
                padding: '1.5rem',
                marginBottom: '1.5rem',
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-orange)', marginBottom: '0.4rem' }}>
                STATUS: INQUIRY REGISTERED
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>REFERENCE CODE:</h3>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.6rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  letterSpacing: '0.05em',
                  marginBottom: '0.5rem',
                }}
              >
                {successResult.reference_code}
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Our maître d' will confirm your reservation via email/SMS within 2 hours.
              </p>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="btn-orange"
              style={{ width: '100%' }}
            >
              RETURN TO MONOLITH &rarr;
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {errorMsg && (
              <div
                style={{
                  background: 'rgba(248, 113, 113, 0.15)',
                  border: '1px solid #f87171',
                  color: '#f87171',
                  padding: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  marginBottom: '1.25rem',
                }}
              >
                {errorMsg}
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label className="form-label" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
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
                    padding: '0.65rem 0.85rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                  }}
                />
              </div>

              <div>
                <label className="form-label" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="julian@architecture.org"
                  style={{
                    width: '100%',
                    background: 'var(--bg-dark)',
                    border: '1px solid var(--border-steel)',
                    color: '#fff',
                    padding: '0.65rem 0.85rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label className="form-label" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                  PHONE NUMBER
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (212) 555-0199"
                  style={{
                    width: '100%',
                    background: 'var(--bg-dark)',
                    border: '1px solid var(--border-steel)',
                    color: '#fff',
                    padding: '0.65rem 0.85rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                  }}
                />
              </div>

              <div>
                <label className="form-label" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
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
                    padding: '0.65rem 0.85rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                  }}
                />
              </div>

              <div>
                <label className="form-label" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                  GUEST COUNT
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
                    padding: '0.65rem 0.85rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                  }}
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label className="form-label" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                SPATIAL SEATING AREA
              </label>
              <select
                name="seating_area"
                value={formData.seating_area}
                onChange={handleChange}
                style={{
                  width: '100%',
                  background: 'var(--bg-dark)',
                  border: '1px solid var(--border-steel)',
                  color: '#fff',
                  padding: '0.65rem 0.85rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                }}
              >
                <option value="Main Concrete Hall">Main Concrete Hall (Basalt Monolith Table)</option>
                <option value="Blackened Steel Bar">Blackened Steel Bar (Beverage Lab Counter)</option>
                <option value="Hearth Counter">Hearth Counter (Direct Open Fire View)</option>
                <option value="Private Concrete Atelier">Private Concrete Atelier (Parties of 6+)</option>
              </select>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label className="form-label" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                DIETARY RESTRICTIONS &amp; ARCHITECTURAL REQUESTS
              </label>
              <textarea
                name="message"
                rows="2"
                value={formData.message}
                onChange={handleChange}
                placeholder="Mention severe allergies, anniversary notes, or spatial preferences..."
                style={{
                  width: '100%',
                  background: 'var(--bg-dark)',
                  border: '1px solid var(--border-steel)',
                  color: '#fff',
                  padding: '0.65rem 0.85rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-orange"
              style={{ width: '100%' }}
            >
              {submitting ? 'TRANSMITTING INQUIRY...' : 'CONFIRM RESERVATION INQUIRY &rarr;'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
