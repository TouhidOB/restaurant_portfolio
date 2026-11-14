import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { submitReservation } from '../../services/api';

export default function ReservationModal() {
  const { isReservationModalOpen, closeReservationModal } = useCMS();
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

  if (!isReservationModalOpen) return null;

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

  const handleClose = () => {
    setIsSuccess(false);
    setErrorMsg('');
    closeReservationModal();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: 'rgba(17, 19, 22, 0.88)',
        backdropFilter: 'blur(10px)',
        animation: 'fadeIn 0.25s ease',
      }}
      onClick={handleClose}
    >
      <div
        style={{
          backgroundColor: '#1B1D22',
          borderRadius: '14px',
          maxWidth: '560px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
          border: '1px solid rgba(255, 46, 136, 0.35)',
          position: 'relative',
          padding: '36px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            background: 'none',
            border: 'none',
            fontSize: '22px',
            cursor: 'pointer',
            color: 'var(--color-silver)',
          }}
          aria-label="Close modal"
        >
          ✕
        </button>

        {isSuccess ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
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
                margin: '0 auto 16px auto',
                border: '2px solid var(--color-cyan)',
                boxShadow: '0 0 20px rgba(33, 212, 232, 0.3)',
              }}
            >
              ✓
            </div>
            <h3
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '2rem',
                color: '#F6F4F0',
                marginBottom: '8px',
              }}
            >
              Pocha Table Requested!
            </h3>
            <p style={{ color: 'var(--color-silver)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px' }}>
              Cheers, <strong>{formData.name}</strong>! Your inquiry for <strong>{formData.guests} guests</strong> on <strong>{formData.date} at {formData.time}</strong> has been received at our Hongdae pocha desk.
            </p>
            <div style={{ background: '#111316', padding: '16px', borderRadius: '8px', border: '1px solid var(--color-border)', marginBottom: '24px', fontSize: '0.85rem', color: 'var(--color-silver)' }}>
              We will confirm your table shortly. Walk-ins are always welcomed if you arrive earlier!
            </div>
            <button onClick={handleClose} className="btn-primary" style={{ width: '100%' }}>
              Back to Seoul Street
            </button>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <span className="text-eyebrow" style={{ display: 'block', marginBottom: '6px' }}>Book Your Night</span>
              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '2.1rem',
                  color: '#F6F4F0',
                  lineHeight: 1.1,
                }}
              >
                Reserve a Pocha Spot
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-silver)', marginTop: '4px' }}>
                Join us for sizzling street dishes, spicy tteokbokki, and ice-cold soju in Hongdae.
              </p>
            </div>

            {errorMsg && (
              <div style={{ backgroundColor: 'rgba(255, 46, 136, 0.15)', color: '#FF70A6', padding: '10px 14px', borderRadius: '6px', fontSize: '0.85rem', marginBottom: '18px', border: '1px solid rgba(255, 46, 136, 0.3)' }}>
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
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
                      padding: '10px 12px',
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
                    placeholder="+82 10 1234 5678"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '6px',
                      border: '1px solid var(--color-border)',
                      backgroundColor: '#111316',
                      color: '#F6F4F0',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
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
                      padding: '10px 12px',
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
                      padding: '10px 12px',
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
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
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
                      padding: '10px 12px',
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
                      padding: '10px 12px',
                      borderRadius: '6px',
                      border: '1px solid var(--color-border)',
                      backgroundColor: '#111316',
                      color: '#F6F4F0',
                      fontSize: '0.9rem',
                    }}
                  >
                    <optgroup label="Early Evening">
                      <option value="17:30">17:30</option>
                      <option value="18:30">18:30</option>
                      <option value="19:30">19:30</option>
                    </optgroup>
                    <optgroup label="Night Peak">
                      <option value="20:30">20:30</option>
                      <option value="21:30">21:30</option>
                      <option value="22:30">22:30</option>
                    </optgroup>
                    <optgroup label="Late Night (Pocha Hours)">
                      <option value="23:30">23:30</option>
                      <option value="00:30">00:30</option>
                      <option value="01:30">01:30</option>
                    </optgroup>
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
                    padding: '10px 12px',
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
                  Special Requests / Dietary
                </label>
                <textarea
                  name="notes"
                  rows="3"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Halal preference, mild spice level, birthday occasion..."
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    border: '1px solid var(--color-border)',
                    backgroundColor: '#111316',
                    color: '#F6F4F0',
                    fontSize: '0.9rem',
                    resize: 'vertical',
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
                style={{ width: '100%', marginTop: '6px', padding: '12px' }}
              >
                {isSubmitting ? 'Transmitting Request...' : 'Confirm Table Inquiry &rarr;'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
