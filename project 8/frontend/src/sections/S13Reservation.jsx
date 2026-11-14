import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { submitReservation } from '../services/api';

export default function S13Reservation() {
  const { content } = useCMS();
  const resConfig = content?.reservation || {};

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

  const timeSlots = resConfig.time_slots || ['12:00 PM', '1:30 PM', '5:00 PM', '6:30 PM', '7:30 PM', '8:30 PM', '9:45 PM'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await submitReservation(formData);
      setSuccess(true);
    } catch (err) {
      setError('Unable to submit inquiry. Please check your contact information or call our host desk directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="reservation" className="py-section" style={{ backgroundColor: 'var(--color-black)', position: 'relative' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '4rem', alignItems: 'flex-start' }}>
          {/* Left: Policy & Guidelines */}
          <div>
            <span className="section-label">{resConfig.subtitle || 'Reserve An Industrial Dining Experience'}</span>
            <h2 className="section-title">{resConfig.title || 'Table Reservation'}</h2>

            <div className="industrial-divider" />

            <p style={{ color: 'var(--color-offwhite)', fontSize: '1.05rem', lineHeight: '1.75', marginBottom: '2rem' }}>
              {resConfig.description ||
                'Due to high demand and prime smokehouse cuts, advance table reservations are strongly encouraged for parties of all sizes.'}
            </p>

            <div
              style={{
                backgroundColor: 'var(--color-black-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '2px',
                padding: '1.75rem',
                marginBottom: '2rem',
              }}
            >
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--color-copper)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                ✦ Seating Guidelines & Walk-in Policy
              </h4>
              <p style={{ color: 'var(--color-concrete)', fontSize: '0.88rem', lineHeight: '1.65' }}>
                {resConfig.policy ||
                  'Walk-ins are welcomed at our 30-seat copper bar and outdoor patio on a first-come, first-served basis. Reservations held for 15 minutes.'}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem', color: 'var(--color-concrete)' }}>
              <div>
                <strong style={{ color: 'var(--color-offwhite)' }}>Host Desk Phone:</strong> +1 (555) 789-2044
              </div>
              <div>
                <strong style={{ color: 'var(--color-offwhite)' }}>Group Buyouts & Events:</strong> table@urbankitchen.com
              </div>
            </div>
          </div>

          {/* Right: Reservation Form */}
          <div
            style={{
              backgroundColor: 'var(--color-black-card)',
              border: '2px solid var(--color-brick)',
              borderRadius: '2px',
              padding: '2.5rem',
              boxShadow: '0 15px 40px rgba(0,0,0,0.5)',
            }}
          >
            {success ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <div style={{ fontSize: '2.5rem', color: 'var(--color-copper)', marginBottom: '1rem' }}>🔥</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--color-offwhite)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                  Request Received
                </h3>
                <p style={{ color: 'var(--color-concrete)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                  Thank you, <strong>{formData.full_name}</strong>. We have logged your request for <strong>{formData.guests} on {formData.date} at {formData.time}</strong>. Our host team will reach out shortly.
                </p>
                <button onClick={() => setSuccess(false)} className="btn-primary">
                  New Reservation Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--color-offwhite)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                  Inquiry Details
                </h3>

                {error && (
                  <div style={{ background: 'rgba(145, 77, 55, 0.4)', border: '1px solid #e06044', color: '#ffb8a8', padding: '0.75rem', borderRadius: '2px', fontSize: '0.85rem' }}>
                    {error}
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-copper)', marginBottom: '0.35rem', fontWeight: 800 }}>
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
                        padding: '0.75rem 0.9rem',
                        background: 'var(--color-graphite)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '2px',
                        color: 'var(--color-offwhite)',
                        outline: 'none',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-copper)', marginBottom: '0.35rem', fontWeight: 800 }}>
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) ..."
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.9rem',
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
                  <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-copper)', marginBottom: '0.35rem', fontWeight: 800 }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="guest@example.com"
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.9rem',
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
                    <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-copper)', marginBottom: '0.35rem', fontWeight: 800 }}>
                      Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.5rem',
                        background: 'var(--color-graphite)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '2px',
                        color: 'var(--color-offwhite)',
                        outline: 'none',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-copper)', marginBottom: '0.35rem', fontWeight: 800 }}>
                      Time
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.5rem',
                        background: 'var(--color-graphite)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '2px',
                        color: 'var(--color-offwhite)',
                        outline: 'none',
                      }}
                    >
                      {timeSlots.map((ts) => (
                        <option key={ts} value={ts}>{ts}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-copper)', marginBottom: '0.35rem', fontWeight: 800 }}>
                      Party Size
                    </label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.5rem',
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
                      <option value="Warehouse Buyout">Full Buyout</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-copper)', marginBottom: '0.35rem', fontWeight: 800 }}>
                    Dining Occasion
                  </label>
                  <input
                    type="text"
                    value={formData.occasion}
                    onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                    placeholder="Casual Dinner, Smokehouse Feast, Birthday..."
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.9rem',
                      background: 'var(--color-graphite)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '2px',
                      color: 'var(--color-offwhite)',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-copper)', marginBottom: '0.35rem', fontWeight: 800 }}>
                    Special Requests / Dietary Notes
                  </label>
                  <textarea
                    rows="2"
                    value={formData.special_requests}
                    onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
                    placeholder="High-top preference, booth seating, allergies..."
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.9rem',
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
                  {loading ? 'Submitting Request...' : 'Submit Table Reservation'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
