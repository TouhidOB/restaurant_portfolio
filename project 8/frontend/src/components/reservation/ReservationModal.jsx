import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { submitReservation } from '../../services/api';

export default function ReservationModal() {
  const { activeReservationModal, closeReservation, content } = useCMS();
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    date: new Date().toISOString().split('T')[0],
    time: '7:30 PM',
    guests: '2 Guests',
    occasion: 'Casual Dining',
    special_requests: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  if (!activeReservationModal) return null;

  const resConfig = content?.reservation || {};
  const experiences = resConfig.experiences_list || [
    'Main Warehouse Dining Table',
    'Pitmaster Counter (Front Row Fire)',
    'The Foundry Private Loft',
    'Bar & High-Top Lounge',
  ];
  const timeSlots = resConfig.time_slots || ['12:00 PM', '1:30 PM', '5:00 PM', '6:30 PM', '7:30 PM', '8:30 PM', '9:45 PM'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await submitReservation(formData);
      setSuccess(true);
    } catch (err) {
      setError('Failed to submit reservation inquiry. Please verify your details or contact our host desk directly.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccess(false);
    closeReservation();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        backgroundColor: 'rgba(10, 11, 12, 0.88)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeReservation();
      }}
    >
      <div
        style={{
          backgroundColor: '#181A1C',
          border: '2px solid var(--color-brick)',
          borderRadius: '2px',
          maxWidth: '620px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '2.5rem',
          position: 'relative',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',
        }}
      >
        <button
          onClick={closeReservation}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'transparent',
            border: 'none',
            color: 'var(--color-concrete)',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: '0.2rem',
          }}
          aria-label="Close"
        >
          ✕
        </button>

        {success ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '2px',
                background: 'rgba(184, 115, 69, 0.2)',
                border: '2px solid var(--color-copper)',
                color: 'var(--color-copper)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.6rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                margin: '0 auto 1.5rem',
              }}
            >
              UT
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.8rem',
                color: 'var(--color-offwhite)',
                marginBottom: '0.75rem',
                textTransform: 'uppercase',
              }}
            >
              Reservation Inquiry Received
            </h3>
            <p style={{ color: 'var(--color-concrete)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
              Thank you, <strong>{formData.full_name}</strong>. Our host team has received your request for <strong>{formData.guests} on {formData.date} at {formData.time}</strong>. We will review availability and contact you shortly.
            </p>
            <button onClick={handleReset} className="btn-primary">
              Done
            </button>
          </div>
        ) : (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span className="section-label">Industrial Dining Table</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--color-offwhite)', textTransform: 'uppercase' }}>
                Reserve Your Table
              </h3>
              <p style={{ color: 'var(--color-concrete)', fontSize: '0.88rem' }}>
                Open Fire Kitchen • Craft Smokehouse • 420 Ironworks Ave
              </p>
            </div>

            {error && (
              <div
                style={{
                  background: 'rgba(145, 77, 55, 0.4)',
                  border: '1px solid #e06044',
                  color: '#ffb8a8',
                  padding: '0.75rem 1rem',
                  borderRadius: '2px',
                  marginBottom: '1.5rem',
                  fontSize: '0.88rem',
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-copper)', marginBottom: '0.35rem', fontWeight: 700 }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    placeholder="Marcus Vance"
                    style={{
                      width: '100%',
                      padding: '0.7rem 0.9rem',
                      background: 'var(--color-graphite)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '2px',
                      color: 'var(--color-offwhite)',
                      outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-copper)', marginBottom: '0.35rem', fontWeight: 700 }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    style={{
                      width: '100%',
                      padding: '0.7rem 0.9rem',
                      background: 'var(--color-graphite)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '2px',
                      color: 'var(--color-offwhite)',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-copper)', marginBottom: '0.35rem', fontWeight: 700 }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="guest@example.com"
                  style={{
                    width: '100%',
                    padding: '0.7rem 0.9rem',
                    background: 'var(--color-graphite)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '2px',
                    color: 'var(--color-offwhite)',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-copper)', marginBottom: '0.35rem', fontWeight: 700 }}>
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.7rem 0.5rem',
                      background: 'var(--color-graphite)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '2px',
                      color: 'var(--color-offwhite)',
                      outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-copper)', marginBottom: '0.35rem', fontWeight: 700 }}>
                    Time Slot
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.7rem 0.5rem',
                      background: 'var(--color-graphite)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '2px',
                      color: 'var(--color-offwhite)',
                      outline: 'none',
                    }}
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-copper)', marginBottom: '0.35rem', fontWeight: 700 }}>
                    Party Size
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.7rem 0.5rem',
                      background: 'var(--color-graphite)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '2px',
                      color: 'var(--color-offwhite)',
                      outline: 'none',
                    }}
                  >
                    <option value="1 Guest">1 Guest</option>
                    <option value="2 Guests">2 Guests</option>
                    <option value="3 Guests">3 Guests</option>
                    <option value="4 Guests">4 Guests</option>
                    <option value="5-8 Guests">5-8 Guests</option>
                    <option value="Foundry Loft (9-20)">Foundry Loft (9-20)</option>
                    <option value="Warehouse Buyout">Full Warehouse Buyout</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-copper)', marginBottom: '0.35rem', fontWeight: 700 }}>
                  Occasion & Dining Preference
                </label>
                <input
                  type="text"
                  value={formData.occasion}
                  onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                  placeholder="Casual Dinner, Smokehouse Feast, Birthday, Corporate..."
                  style={{
                    width: '100%',
                    padding: '0.7rem 0.9rem',
                    background: 'var(--color-graphite)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '2px',
                    color: 'var(--color-offwhite)',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-copper)', marginBottom: '0.35rem', fontWeight: 700 }}>
                  Special Requests / Dietary Notes
                </label>
                <textarea
                  rows="2"
                  value={formData.special_requests}
                  onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
                  placeholder="Booth seating, gluten-free requests, high-top preference..."
                  style={{
                    width: '100%',
                    padding: '0.7rem 0.9rem',
                    background: 'var(--color-graphite)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '2px',
                    color: 'var(--color-offwhite)',
                    outline: 'none',
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{ width: '100%', padding: '0.95rem', fontSize: '0.9rem', marginTop: '0.5rem' }}
              >
                {loading ? 'Transmitting Request...' : 'Submit Reservation Request'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
