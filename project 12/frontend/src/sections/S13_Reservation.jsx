import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { submitReservation } from '../services/api';

export default function S13_Reservation() {
  const { content } = useCMS();
  const resData = content?.editorial_sections?.s13_reservation || {
    badge: "CONCIERGE DESK",
    title: "Reserve Your Riviera Experience",
    description: "Table reservations open 60 days in advance. For parties exceeding 8 guests or private villa buyouts, our concierge is at your service.",
    notice: "Smart elegant attire requested. Children welcome from age 8."
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '20:00',
    guests: 2,
    seating: 'Sunset Terrace & Sea View',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    const res = await submitReservation(formData);
    setIsSubmitting(false);

    if (res.ok) {
      setIsSuccess(true);
    } else {
      setErrorMsg(res.data?.message || 'Unable to submit reservation. Please try again.');
    }
  };

  return (
    <section id="reservations" className="editorial-section" style={{ backgroundColor: 'var(--c-ivory)' }}>
      <div className="container">
        
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid var(--c-border)',
            boxShadow: '0 16px 50px rgba(38, 58, 72, 0.06)',
            padding: ' clamp(32px, 5vw, 60px)',
            maxWidth: '920px',
            margin: '0 auto',
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="text-eyebrow" style={{ display: 'block', marginBottom: '8px' }}>
              {resData.badge}
            </span>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
                color: 'var(--c-navy)',
                lineHeight: 1.15,
                marginBottom: '12px',
              }}
            >
              {resData.title}
            </h2>
            <p style={{ color: '#595752', fontSize: '0.96rem', lineHeight: 1.65, maxWidth: '640px', margin: '0 auto' }}>
              {resData.description}
            </p>
          </div>

          {isSuccess ? (
            <div style={{ textAlign: 'center', padding: '36px 20px' }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  backgroundColor: '#ECFDF5',
                  color: '#059669',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  margin: '0 auto 18px auto',
                  border: '2px solid #A7F3D0',
                }}
              >
                ✓
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', color: 'var(--c-navy)', marginBottom: '8px' }}>
                Inquiry Successfully Logged
              </h3>
              <p style={{ color: '#595752', fontSize: '0.95rem', marginBottom: '20px' }}>
                Thank you, <strong>{formData.name}</strong>. Our Maître de Maison will confirm your table for <strong>{formData.guests} guests</strong> on <strong>{formData.date} at {formData.time}</strong>.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="btn-secondary"
              >
                Make Another Reservation
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {errorMsg && (
                <div style={{ backgroundColor: '#FEF2F2', color: '#991B1B', padding: '12px', borderRadius: '6px', fontSize: '0.85rem' }}>
                  {errorMsg}
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--c-navy)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Baroness Hélène de Rothschild"
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '6px',
                      border: '1px solid var(--c-border)',
                      backgroundColor: 'var(--c-ivory)',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--c-navy)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="helene@domain.com"
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '6px',
                      border: '1px solid var(--c-border)',
                      backgroundColor: 'var(--c-ivory)',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '18px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--c-navy)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Telephone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+33 6 40 00 12 34"
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '6px',
                      border: '1px solid var(--c-border)',
                      backgroundColor: 'var(--c-ivory)',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--c-navy)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Party Size *
                  </label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '6px',
                      border: '1px solid var(--c-border)',
                      backgroundColor: 'var(--c-ivory)',
                      fontSize: '0.9rem',
                    }}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--c-navy)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '6px',
                      border: '1px solid var(--c-border)',
                      backgroundColor: 'var(--c-ivory)',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--c-navy)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Time Seating *
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '6px',
                      border: '1px solid var(--c-border)',
                      backgroundColor: 'var(--c-ivory)',
                      fontSize: '0.9rem',
                    }}
                  >
                    <option value="12:30">Lunch — 12:30</option>
                    <option value="13:00">Lunch — 13:00</option>
                    <option value="19:30">Dinner — 19:30</option>
                    <option value="20:00">Dinner — 20:00</option>
                    <option value="20:30">Dinner — 20:30</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--c-navy)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Dining Ambiance
                </label>
                <select
                  name="seating"
                  value={formData.seating}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '6px',
                    border: '1px solid var(--c-border)',
                    backgroundColor: 'var(--c-ivory)',
                    fontSize: '0.9rem',
                  }}
                >
                  <option value="Sunset Terrace & Sea View">Sunset Terrace (Panoramic Cliffside)</option>
                  <option value="Main Dining Salon Vaults">Main Dining Salon (Limestone Vaults)</option>
                  <option value="Olive Grove Pergola">The Olive Grove Pergola (Private Garden)</option>
                  <option value="Sommelier Vault">Subterranean Sommelier Cave Tasting</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--c-navy)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Notes & Special Requests
                </label>
                <textarea
                  name="notes"
                  rows="3"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Dietary requirements, private yacht tender docking, celebratory occasion..."
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '6px',
                    border: '1px solid var(--c-border)',
                    backgroundColor: 'var(--c-ivory)',
                    fontSize: '0.9rem',
                    resize: 'vertical',
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginTop: '6px' }}>
                <span style={{ fontSize: '0.8rem', color: '#8C847B' }}>
                  {resData.notice}
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
                  style={{ padding: '1rem 2.6rem' }}
                >
                  {isSubmitting ? 'Submitting...' : 'Request Table Reservation &rarr;'}
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </section>
  );
}
