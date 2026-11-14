import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { submitReservation } from '../services/api';

export default function S13_Reservation() {
  const { content } = useCMS();
  const resData = content?.editorial_sections?.s13_reservation || {
    badge: "BOOK YOUR TABLE",
    title: "Reserve Your Pocha Spot",
    description: "Walk-ins are always welcomed, but reservations are recommended for groups of 4 or more during peak night hours (20:00 – 01:00).",
    notice: "Reservations are held for 15 minutes. Casual street attire warmly welcomed."
  };

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '20:00',
    guests: 4,
    experience: 'Street Pocha Table',
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
    <section id="reservations" className="editorial-section" style={{ backgroundColor: 'var(--color-midnight)' }}>
      <div className="container">
        
        <div
          style={{
            backgroundColor: 'var(--color-charcoal)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 46, 136, 0.3)',
            boxShadow: '0 16px 50px rgba(0, 0, 0, 0.5), 0 0 25px rgba(255, 46, 136, 0.1)',
            padding: 'clamp(32px, 5vw, 60px)',
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
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
                color: '#F6F4F0',
                lineHeight: 1.15,
                marginBottom: '12px',
              }}
            >
              {resData.title}
            </h2>
            <p style={{ color: 'var(--color-silver)', fontSize: '0.96rem', lineHeight: 1.65, maxWidth: '640px', margin: '0 auto' }}>
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
                  backgroundColor: 'rgba(33, 212, 232, 0.15)',
                  color: 'var(--color-cyan)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  margin: '0 auto 18px auto',
                  border: '2px solid var(--color-cyan)',
                  boxShadow: '0 0 20px rgba(33, 212, 232, 0.3)',
                }}
              >
                ✓
              </div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2rem', color: '#FFFFFF', marginBottom: '8px' }}>
                Inquiry Successfully Logged!
              </h3>
              <p style={{ color: 'var(--color-silver)', fontSize: '0.95rem', marginBottom: '20px' }}>
                Thanks, <strong>{formData.name}</strong>. Our pocha staff will save your spot for <strong>{formData.guests} people</strong> on <strong>{formData.date} at {formData.time}</strong>.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="btn-secondary"
              >
                Make Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {errorMsg && (
                <div style={{ backgroundColor: 'rgba(255, 46, 136, 0.15)', color: '#FF70A6', padding: '12px', borderRadius: '6px', fontSize: '0.85rem' }}>
                  {errorMsg}
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-cyan)', textTransform: 'uppercase', marginBottom: '6px', fontFamily: "'Barlow Condensed', sans-serif" }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Min-jun Park"
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '6px',
                      border: '1px solid var(--color-border)',
                      backgroundColor: '#111316',
                      color: '#F6F4F0',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-cyan)', textTransform: 'uppercase', marginBottom: '6px', fontFamily: "'Barlow Condensed', sans-serif" }}>
                    Phone / Kakao *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+82 10 9988 7766"
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '6px',
                      border: '1px solid var(--color-border)',
                      backgroundColor: '#111316',
                      color: '#F6F4F0',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '18px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-cyan)', textTransform: 'uppercase', marginBottom: '6px', fontFamily: "'Barlow Condensed', sans-serif" }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="guest@domain.com"
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '6px',
                      border: '1px solid var(--color-border)',
                      backgroundColor: '#111316',
                      color: '#F6F4F0',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-cyan)', textTransform: 'uppercase', marginBottom: '6px', fontFamily: "'Barlow Condensed', sans-serif" }}>
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
                      border: '1px solid var(--color-border)',
                      backgroundColor: '#111316',
                      color: '#F6F4F0',
                      fontSize: '0.9rem',
                    }}
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12, 14].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-cyan)', textTransform: 'uppercase', marginBottom: '6px', fontFamily: "'Barlow Condensed', sans-serif" }}>
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
                      border: '1px solid var(--color-border)',
                      backgroundColor: '#111316',
                      color: '#F6F4F0',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-cyan)', textTransform: 'uppercase', marginBottom: '6px', fontFamily: "'Barlow Condensed', sans-serif" }}>
                    Time Slot *
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '6px',
                      border: '1px solid var(--color-border)',
                      backgroundColor: '#111316',
                      color: '#F6F4F0',
                      fontSize: '0.9rem',
                    }}
                  >
                    <option value="18:00">18:00 — Early Evening</option>
                    <option value="19:30">19:30 — Peak Dinner</option>
                    <option value="21:00">21:00 — Night Vibe</option>
                    <option value="22:30">22:30 — Late Night Soju</option>
                    <option value="00:30">00:30 — Midnight Feast</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-cyan)', textTransform: 'uppercase', marginBottom: '6px', fontFamily: "'Barlow Condensed', sans-serif" }}>
                  Selected Experience
                </label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '6px',
                    border: '1px solid var(--color-border)',
                    backgroundColor: '#111316',
                    color: '#F6F4F0',
                    fontSize: '0.9rem',
                  }}
                >
                  <option value="Street Pocha Table">Street Pocha Table (Main Floor)</option>
                  <option value="Midnight Pocha Feast">Midnight Pocha Feast (Group Sharing)</option>
                  <option value="Late Night Soju Tasting">Late Night Soju & Anju Tasting</option>
                  <option value="Chimaek VIP Party">Chimaek VIP Party (Chicken & Beer)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-cyan)', textTransform: 'uppercase', marginBottom: '6px', fontFamily: "'Barlow Condensed', sans-serif" }}>
                  Notes & Special Requests
                </label>
                <textarea
                  name="notes"
                  rows="3"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Extra spicy buldak challenge, birthday toast, booth seating preference..."
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '6px',
                    border: '1px solid var(--color-border)',
                    backgroundColor: '#111316',
                    color: '#F6F4F0',
                    fontSize: '0.9rem',
                    resize: 'vertical',
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginTop: '6px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-concrete)' }}>
                  {resData.notice}
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
                  style={{ padding: '1rem 2.6rem' }}
                >
                  {isSubmitting ? 'Transmitting Request...' : 'Request Pocha Table &rarr;'}
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </section>
  );
}
