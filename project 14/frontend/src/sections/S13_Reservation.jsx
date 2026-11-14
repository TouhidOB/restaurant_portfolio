import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { submitReservation } from '../services/api';
import { CheckCircle, AlertCircle, Calendar, Clock, Users } from 'lucide-react';

export default function S13_Reservation() {
  const { data } = useCMS();
  const resInfo = data?.content?.reservation || {};

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '7:30 PM',
    guests: '2',
    occasion: 'Fine Dining Dinner',
    experience: 'Main Dining Room',
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        full_name: formData.name,
        phone: formData.phone,
        email: formData.email,
        preferred_date: formData.date || new Date().toISOString().split('T')[0],
        preferred_time: formData.time,
        guests: parseInt(formData.guests) || 2,
        occasion: formData.occasion,
        selected_experience: formData.experience,
        special_requests: formData.notes
      };

      const res = await submitReservation(payload);
      setSuccess(res.message || "Your inquiry has been received. Our team will contact you to confirm availability.");
    } catch (err) {
      setError("Unable to transmit reservation inquiry. Please call our concierge directly at +1 (212) 840-7832.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="reservation" style={{ backgroundColor: 'var(--color-charcoal)', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="section-container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '60px',
          alignItems: 'center'
        }}>
          {/* Left Column: Hospitality Policy & Information */}
          <div>
            <div className="section-eyebrow">
              {resInfo.eyebrow || 'TABLE RESERVATION & INQUIRY'}
            </div>
            <h2 className="section-title">
              {resInfo.heading || 'RESERVE YOUR EVENING'}
            </h2>
            <p style={{
              fontSize: '16px',
              color: 'var(--color-taupe)',
              lineHeight: '1.85',
              marginBottom: '28px'
            }}>
              {resInfo.description ||
                'We welcome table reservations up to 30 days in advance. For parties of six or more, or private dining salons, our sommelier concierge will coordinate tailored wine pairings and tasting menus.'}
            </p>

            <div style={{
              background: 'var(--color-graphite)',
              border: '1px solid var(--border-subtle)',
              borderLeft: '3px solid var(--color-champagne)',
              padding: '20px 24px',
              borderRadius: '2px',
              marginBottom: '32px'
            }}>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: 'var(--color-champagne)',
                marginBottom: '6px'
              }}>
                Hospitality Note
              </div>
              <div style={{ fontSize: '13px', color: 'var(--color-taupe)', lineHeight: '1.6' }}>
                {resInfo.policy_note ||
                  'A submitted reservation inquiry is promptly reviewed by our dining concierge and confirmed via SMS and email.'}
              </div>
            </div>

            <div style={{ fontSize: '13px', color: 'var(--color-taupe)' }}>
              Concierge Direct Line:{' '}
              <strong style={{ color: 'var(--color-champagne)' }}>+1 (212) 840-7832</strong>
            </div>
          </div>

          {/* Right Column: Reservation Engine Form Card */}
          <div style={{
            background: 'var(--color-graphite)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '4px',
            padding: '40px',
            boxShadow: '0 24px 60px rgba(0,0,0,0.85)'
          }}>
            {success ? (
              <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                <CheckCircle size={48} color="#C4A878" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', color: 'var(--color-ivory)', marginBottom: '10px' }}>
                  Inquiry Transmitted
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--color-taupe)', lineHeight: '1.6', marginBottom: '24px' }}>
                  {success}
                </p>
                <button
                  onClick={() => setSuccess(null)}
                  className="btn-secondary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Make Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {error && (
                  <div style={{
                    gridColumn: 'span 2',
                    background: 'rgba(122, 35, 35, 0.3)',
                    border: '1px solid #a83232',
                    padding: '10px 14px',
                    borderRadius: '2px',
                    color: '#ff9999',
                    fontSize: '12px'
                  }}>
                    {error}
                  </div>
                )}

                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-heading)', color: 'var(--color-taupe)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Guest Name"
                    style={{
                      width: '100%',
                      background: 'var(--color-charcoal)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '2px',
                      padding: '10px 14px',
                      color: 'var(--color-ivory)',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-heading)', color: 'var(--color-taupe)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (212) 000-0000"
                    style={{
                      width: '100%',
                      background: 'var(--color-charcoal)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '2px',
                      padding: '10px 14px',
                      color: 'var(--color-ivory)',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-heading)', color: 'var(--color-taupe)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="guest@domain.com"
                    style={{
                      width: '100%',
                      background: 'var(--color-charcoal)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '2px',
                      padding: '10px 14px',
                      color: 'var(--color-ivory)',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-heading)', color: 'var(--color-taupe)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'var(--color-charcoal)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '2px',
                      padding: '10px 14px',
                      color: 'var(--color-ivory)',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-heading)', color: 'var(--color-taupe)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Time Slot *
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'var(--color-charcoal)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '2px',
                      padding: '10px 14px',
                      color: 'var(--color-ivory)',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  >
                    <option value="5:30 PM">5:30 PM</option>
                    <option value="6:00 PM">6:00 PM</option>
                    <option value="6:30 PM">6:30 PM</option>
                    <option value="7:00 PM">7:00 PM</option>
                    <option value="7:30 PM">7:30 PM</option>
                    <option value="8:00 PM">8:00 PM</option>
                    <option value="8:30 PM">8:30 PM</option>
                    <option value="9:00 PM">9:00 PM</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-heading)', color: 'var(--color-taupe)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Number of Guests *
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'var(--color-charcoal)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '2px',
                      padding: '10px 14px',
                      color: 'var(--color-ivory)',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  >
                    <option value="2">2 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="6">6 Guests</option>
                    <option value="8">8 Guests (Chef Hearth Table)</option>
                    <option value="14">14 Guests (Sommelier Reserve)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-heading)', color: 'var(--color-taupe)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Selected Area
                  </label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'var(--color-charcoal)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '2px',
                      padding: '10px 14px',
                      color: 'var(--color-ivory)',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  >
                    <option value="Main Dining Room">Main Dining Room</option>
                    <option value="The Sommelier's Reserve Room">The Sommelier's Reserve Room</option>
                    <option value="The Chef's Hearth Table">The Chef's Hearth Table</option>
                    <option value="The Grand Mezzanine Salon">The Grand Mezzanine Salon</option>
                  </select>
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-heading)', color: 'var(--color-taupe)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Special Dietary or Seating Notes
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Allergies, wine pairing requests, or anniversary notes..."
                    style={{
                      width: '100%',
                      background: 'var(--color-charcoal)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '2px',
                      padding: '8px 14px',
                      color: 'var(--color-ivory)',
                      fontSize: '13px',
                      outline: 'none',
                      minHeight: '70px'
                    }}
                  />
                </div>

                <div style={{ gridColumn: 'span 2', marginTop: '10px' }}>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-prime"
                    style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
                  >
                    {loading ? 'Submitting Inquiry...' : 'Submit Reservation Inquiry'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
