import React, { useState, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';
import { submitReservation } from '../../services/api';

export default function ReservationModal() {
  const { activeReservationModal, closeReservation, content, initialOccasion } = useCMS();
  const resConfig = content?.reservation || {};

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: new Date().toISOString().split('T')[0],
    time: '11:00 AM',
    guests: 2,
    seating_preference: 'atrium',
    occasion: 'Botanical Brunch & Coffee',
    special_requests: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialOccasion) {
      setFormData((prev) => ({
        ...prev,
        occasion: initialOccasion,
      }));
    }
  }, [initialOccasion]);

  if (!activeReservationModal) return null;

  const times = resConfig.times || [
    '8:00 AM', '9:30 AM', '11:00 AM', '12:30 PM', '2:00 PM', '3:30 PM', '5:00 PM', '6:30 PM'
  ];

  const seatingOptions = resConfig.seating_options || [
    { value: 'atrium', label: 'Greenhouse Palm Atrium' },
    { value: 'terrace', label: 'Sunlit Garden Terrace' },
    { value: 'mezzanine', label: 'Orangerie Mezzanine Nook' },
    { value: 'bar', label: 'Botanical Brew Counter' },
    { value: 'any', label: 'Best Available Sunlit Table' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitReservation(formData);
      setSubmitted(true);
    } catch (err) {
      console.error('Reservation submit error:', err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        backgroundColor: 'rgba(26, 43, 36, 0.85)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        animation: 'fadeIn 0.25s ease-out',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeReservation();
      }}
    >
      <div
        style={{
          backgroundColor: '#FAF7F0',
          color: '#292D29',
          maxWidth: '680px',
          width: '100%',
          maxHeight: '90vh',
          borderRadius: '4px',
          overflowY: 'auto',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.45)',
          border: '1px solid rgba(168, 121, 88, 0.4)',
          position: 'relative',
          padding: '36px 32px',
          animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={closeReservation}
          aria-label="Close Modal"
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(38, 63, 53, 0.08)',
            border: 'none',
            color: 'var(--color-forest)',
            cursor: 'pointer',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ✕
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '30px 10px' }}>
            <div style={{ fontSize: '48px', marginBottom: '14px' }}>🌿</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--color-forest)', marginBottom: '10px' }}>
              Reservation Inquiry Received
            </h3>
            <p style={{ fontSize: '14.5px', color: '#555', lineHeight: 1.6, maxWidth: '500px', margin: '0 auto 24px auto' }}>
              Thank you, {formData.name}. Our café concierge will confirm availability for your party of {formData.guests} in the {formData.seating_preference} shortly.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                closeReservation();
              }}
              style={{
                padding: '12px 28px',
                backgroundColor: 'var(--color-forest)',
                color: '#FAF7F0',
                border: 'none',
                borderRadius: '2px',
                fontSize: '12px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-copper)', fontWeight: 700 }}>
                Glasshouse Sanctuary Visit
              </span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--color-forest)', margin: '4px 0 6px 0' }}>
                Reserve a Table
              </h2>
              <p style={{ fontSize: '13.5px', color: 'rgba(41, 45, 41, 0.75)' }}>
                {resConfig.policy || 'Reservations held for 15 minutes. Please notify us of severe botanical or dietary allergies.'}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-forest)', fontWeight: 600, marginBottom: '5px' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '2px', border: '1px solid rgba(38,63,53,0.3)', background: '#fff', fontSize: '14px', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-forest)', fontWeight: 600, marginBottom: '5px' }}>
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '2px', border: '1px solid rgba(38,63,53,0.3)', background: '#fff', fontSize: '14px', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-forest)', fontWeight: 600, marginBottom: '5px' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '2px', border: '1px solid rgba(38,63,53,0.3)', background: '#fff', fontSize: '14px', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-forest)', fontWeight: 600, marginBottom: '5px' }}>
                  Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '2px', border: '1px solid rgba(38,63,53,0.3)', background: '#fff', fontSize: '14px', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-forest)', fontWeight: 600, marginBottom: '5px' }}>
                  Preferred Time *
                </label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '2px', border: '1px solid rgba(38,63,53,0.3)', background: '#fff', fontSize: '14px', outline: 'none' }}
                >
                  {times.map((tVal, i) => (
                    <option key={i} value={tVal}>{tVal}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-forest)', fontWeight: 600, marginBottom: '5px' }}>
                  Party Size
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value, 10) })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '2px', border: '1px solid rgba(38,63,53,0.3)', background: '#fff', fontSize: '14px', outline: 'none' }}
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16].map((num) => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-forest)', fontWeight: 600, marginBottom: '5px' }}>
                Preferred Seating Zone
              </label>
              <select
                value={formData.seating_preference}
                onChange={(e) => setFormData({ ...formData, seating_preference: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '2px', border: '1px solid rgba(38,63,53,0.3)', background: '#fff', fontSize: '14px', outline: 'none' }}
              >
                {seatingOptions.map((opt, i) => (
                  <option key={i} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-forest)', fontWeight: 600, marginBottom: '5px' }}>
                Special Notes or Occasion
              </label>
              <textarea
                rows={2}
                value={formData.special_requests}
                onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
                placeholder="E.g. Table near palm trees, birthday celebration, high chair..."
                style={{ width: '100%', padding: '10px 12px', borderRadius: '2px', border: '1px solid rgba(38,63,53,0.3)', background: '#fff', fontSize: '13.5px', outline: 'none' }}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              style={{
                width: '100%',
                padding: '13px',
                backgroundColor: 'var(--color-forest)',
                color: '#FAF7F0',
                border: 'none',
                borderRadius: '2px',
                fontSize: '12.5px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 600,
                cursor: submitting ? 'wait' : 'pointer',
              }}
            >
              {submitting ? 'Transmitting Request...' : 'Confirm Table Reservation Request'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
