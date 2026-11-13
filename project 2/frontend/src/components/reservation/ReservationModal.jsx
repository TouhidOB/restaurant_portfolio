import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Clock, Calendar, Users, Sparkles } from 'lucide-react';
import { api } from '../../services/api';

export default function ReservationModal({ isOpen, onClose, restaurant, preselectedExperience = null }) {
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    date: '',
    time: '7:30 PM',
    guests: '2 Guests',
    occasion: 'Casual Dining',
    experience: preselectedExperience || 'Standard Dining',
    special_requests: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [inquiryId, setInquiryId] = useState('');

  useEffect(() => {
    if (preselectedExperience) {
      setFormData((prev) => ({ ...prev, experience: preselectedExperience }));
    }
  }, [preselectedExperience]);

  // Keyboard ESC listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await api.submitReservation(formData);
      setIsSuccess(true);
      setInquiryId(res.inquiry_id || 'ZEN-INQUIRY');
    } catch (err) {
      setErrorMsg(err.message || 'Unable to submit reservation inquiry. Please check your network.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormData({
      full_name: '',
      phone: '',
      email: '',
      date: '',
      time: '7:30 PM',
      guests: '2 Guests',
      occasion: 'Casual Dining',
      experience: 'Standard Dining',
      special_requests: '',
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100000,
        backgroundColor: 'rgba(20, 22, 21, 0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '580px',
          backgroundColor: '#FFFFFF',
          borderRadius: '2px',
          padding: '38px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto',
          border: '1px solid var(--color-border)',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close reservation modal"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: 'var(--color-stone)',
            cursor: 'pointer',
          }}
        >
          <X size={22} />
        </button>

        {isSuccess ? (
          <div style={{ textAlign: 'center', padding: '30px 10px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'rgba(105, 116, 91, 0.15)',
                color: 'var(--color-moss)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}
            >
              <CheckCircle size={36} />
            </div>

            <h3 style={{ fontSize: '28px', color: 'var(--color-charcoal)', marginBottom: '8px' }}>
              Your Inquiry Has Been Received
            </h3>

            <div style={{ fontSize: '13px', color: 'var(--color-bamboo)', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '16px' }}>
              Reference ID: {inquiryId}
            </div>

            <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--color-stone)', marginBottom: '28px', maxWidth: '420px', margin: '0 auto 28px' }}>
              Thank you for choosing {restaurant.name}. Our concierge team will review your inquiry and reach out via telephone or WhatsApp to confirm your table arrangements.
            </p>

            <button onClick={handleReset} className="btn-zen btn-zen-primary">
              Return to Website
            </button>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span className="zen-seal">席</span>
              <span className="zen-eyebrow" style={{ margin: 0 }}>
                {restaurant.reservationSection?.eyebrow || 'TABLE INQUIRY'}
              </span>
            </div>

            <h3 style={{ fontSize: '28px', color: 'var(--color-charcoal)', marginBottom: '6px' }}>
              Reserve Your Table
            </h3>

            <p style={{ fontSize: '13px', color: 'var(--color-stone)', marginBottom: '24px' }}>
              Please share your preferred dining arrangement. We look forward to welcoming you with quiet omotenashi care.
            </p>

            {errorMsg && (
              <div style={{ padding: '12px', backgroundColor: '#F8E9E7', color: 'var(--color-vermilion)', fontSize: '13px', marginBottom: '18px', borderRadius: '2px' }}>
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="full_name"
                    required
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder="Guest name"
                    className="form-control"
                  />
                </div>
                <div>
                  <label>Contact Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+880 1711..."
                    className="form-control"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label>Email (Optional)</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="guest@example.com"
                    className="form-control"
                  />
                </div>
                <div>
                  <label>Reservation Date *</label>
                  <input
                    type="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label>Preferred Time *</label>
                  <select name="time" value={formData.time} onChange={handleChange} className="form-control">
                    <option value="12:30 PM">12:30 PM (Lunch)</option>
                    <option value="1:30 PM">1:30 PM (Lunch)</option>
                    <option value="6:30 PM">6:30 PM (Early Dinner)</option>
                    <option value="7:30 PM">7:30 PM (Dinner &amp; Omakase)</option>
                    <option value="8:30 PM">8:30 PM (Dinner &amp; Omakase)</option>
                    <option value="9:30 PM">9:30 PM (Late Seating)</option>
                  </select>
                </div>
                <div>
                  <label>Party Size *</label>
                  <select name="guests" value={formData.guests} onChange={handleChange} className="form-control">
                    <option value="1 Guest">1 Guest (Solo Counter)</option>
                    <option value="2 Guests">2 Guests</option>
                    <option value="3-4 Guests">3 – 4 Guests</option>
                    <option value="5-6 Guests">5 – 6 Guests</option>
                    <option value="7+ Guests">7+ Guests (Private Salon)</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label>Dining Experience</label>
                <select name="experience" value={formData.experience} onChange={handleChange} className="form-control">
                  <option value="Standard Dining">Standard Main Dining Salon</option>
                  <option value="The Chef's Omakase Counter">The Chef's Omakase Counter (14-Course)</option>
                  <option value="Private Tatami Salon (Zashiki)">Private Tatami Salon (Zashiki)</option>
                  <option value="Zen Tea & Sweet Pairing Ceremony">Zen Tea &amp; Sweet Pairing Ceremony</option>
                </select>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label>Dietary Restrictions or Special Requests</label>
                <textarea
                  name="special_requests"
                  rows={3}
                  value={formData.special_requests}
                  onChange={handleChange}
                  placeholder="e.g. Seafood allergies, gluten-free, window-side seating..."
                  className="form-control"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-zen btn-zen-primary"
                style={{ width: '100%', padding: '14px' }}
              >
                {isSubmitting ? 'Transmitting Request...' : 'Submit Reservation Request'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
