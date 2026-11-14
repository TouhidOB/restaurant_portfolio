import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Users, CheckCircle, AlertCircle } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { submitReservation } from '../../services/api';

export default function ReservationModal() {
  const { isReservationOpen, closeReservation, selectedExperience } = useCMS();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '7:30 PM',
    guests: '2',
    occasion: 'Fine Dining Dinner',
    experience: '',
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (selectedExperience) {
      setFormData((prev) => ({ ...prev, experience: selectedExperience }));
    }
  }, [selectedExperience]);

  if (!isReservationOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

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
      setSuccessMsg(res.message || "Your reservation inquiry has been received. Our concierge will contact you shortly.");
    } catch (err) {
      setErrorMsg("Unable to process inquiry at this moment. Please call our concierge directly at +1 (212) 840-7832.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(16, 16, 16, 0.88)',
        backdropFilter: 'blur(10px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={closeReservation}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '560px',
          background: 'var(--color-charcoal)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '4px',
          padding: '36px',
          boxShadow: '0 30px 80px rgba(0,0,0,0.9)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeReservation}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'transparent',
            border: 'none',
            color: 'var(--color-taupe)',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>
            TABLE RESERVATION INQUIRY
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '32px',
            color: 'var(--color-ivory)'
          }}>
            Reserve Your Evening
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--color-taupe)', marginTop: '6px' }}>
            {formData.experience ? `Requested: ${formData.experience}` : 'An intimate dining experience curated around hardwood flame and prime beef.'}
          </p>
        </div>

        {successMsg ? (
          <div style={{ textAlign: 'center', padding: '30px 10px' }}>
            <CheckCircle size={48} color="#C4A878" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--color-ivory)', marginBottom: '8px' }}>
              Inquiry Received
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--color-taupe)', lineHeight: '1.6', marginBottom: '24px' }}>
              {successMsg}
            </p>
            <button onClick={closeReservation} className="btn-prime" style={{ width: '100%', justifyContent: 'center' }}>
              Return to Website
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            {errorMsg && (
              <div style={{
                gridColumn: 'span 2',
                background: 'rgba(122, 35, 35, 0.3)',
                border: '1px solid #a83232',
                padding: '10px 14px',
                borderRadius: '3px',
                color: '#ff9999',
                fontSize: '12px'
              }}>
                {errorMsg}
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
                placeholder="e.g. Lord Sterling"
                style={{
                  width: '100%',
                  background: 'var(--color-graphite)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '2px',
                  padding: '10px 12px',
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
                  background: 'var(--color-graphite)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '2px',
                  padding: '10px 12px',
                  color: 'var(--color-ivory)',
                  fontSize: '13px',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-heading)', color: 'var(--color-taupe)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="concierge@luxury.com"
                style={{
                  width: '100%',
                  background: 'var(--color-graphite)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '2px',
                  padding: '10px 12px',
                  color: 'var(--color-ivory)',
                  fontSize: '13px',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-heading)', color: 'var(--color-taupe)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>
                Date *
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                style={{
                  width: '100%',
                  background: 'var(--color-graphite)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '2px',
                  padding: '10px 12px',
                  color: 'var(--color-ivory)',
                  fontSize: '13px',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-heading)', color: 'var(--color-taupe)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>
                Time & Seating *
              </label>
              <select
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                style={{
                  width: '100%',
                  background: 'var(--color-graphite)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '2px',
                  padding: '10px 12px',
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
                <option value="9:30 PM">9:30 PM</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-heading)', color: 'var(--color-taupe)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>
                Party Size *
              </label>
              <select
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                style={{
                  width: '100%',
                  background: 'var(--color-graphite)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '2px',
                  padding: '10px 12px',
                  color: 'var(--color-ivory)',
                  fontSize: '13px',
                  outline: 'none'
                }}
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="6">6 Guests (Hearth View)</option>
                <option value="8">8 Guests (Chef Table)</option>
                <option value="12">12+ Guests (Private Salon)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-heading)', color: 'var(--color-taupe)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>
                Dining Occasion
              </label>
              <select
                value={formData.occasion}
                onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                style={{
                  width: '100%',
                  background: 'var(--color-graphite)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '2px',
                  padding: '10px 12px',
                  color: 'var(--color-ivory)',
                  fontSize: '13px',
                  outline: 'none'
                }}
              >
                <option value="Fine Dining Dinner">Fine Dining Dinner</option>
                <option value="Anniversary">Anniversary</option>
                <option value="Executive Business Dinner">Executive Business Dinner</option>
                <option value="Birthday Celebration">Birthday Celebration</option>
                <option value="Wine Pairing Evening">Wine Pairing Evening</option>
              </select>
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-heading)', color: 'var(--color-taupe)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>
                Special Dietary or Seating Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Specific wine requests, allergies, or preferred booth location..."
                style={{
                  width: '100%',
                  background: 'var(--color-graphite)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '2px',
                  padding: '8px 12px',
                  color: 'var(--color-ivory)',
                  fontSize: '13px',
                  outline: 'none',
                  minHeight: '60px'
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
              <div style={{ textAlign: 'center', fontSize: '11px', color: 'var(--color-taupe)', marginTop: '8px' }}>
                All online inquiries require dining concierge confirmation via SMS or phone.
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
