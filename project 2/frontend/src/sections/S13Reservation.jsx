import React, { useState } from 'react';
import { api } from '../services/api';
import { CheckCircle } from 'lucide-react';

export default function S13Reservation({ restaurant, sectionData }) {
  const [formData, setFormData] = useState({
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [inquiryId, setInquiryId] = useState('');

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
      setErrorMsg(err.message || 'Unable to submit reservation request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="reservation"
      style={{
        padding: 'var(--section-spacing) 0',
        backgroundColor: 'var(--color-rice-paper)',
      }}
    >
      <div className="zen-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '64px',
            alignItems: 'center',
          }}
        >
          {/* Left Narrative Column */}
          <div>
            <div className="zen-eyebrow">
              {sectionData?.eyebrow || 'TABLE INQUIRY & RESERVATION'}
            </div>

            <h2 style={{ fontSize: 'clamp(32px, 5vw, var(--section-heading-size))', color: 'var(--color-charcoal)', marginBottom: '8px' }}>
              {sectionData?.title || 'Your Table Awaits.'}
            </h2>

            {sectionData?.japaneseSubtitle && (
              <div className="font-jp" style={{ fontSize: '16px', color: 'var(--color-moss)', marginBottom: '20px' }}>
                {sectionData.japaneseSubtitle}
              </div>
            )}

            <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--color-charcoal)', opacity: 0.9, marginBottom: '24px' }}>
              {sectionData?.description || 'Share your preferred dining date and details. Our team will review your request and contact you to confirm availability.'}
            </p>

            <div
              style={{
                padding: '20px 24px',
                backgroundColor: '#FFFFFF',
                borderLeft: '3px solid var(--color-bamboo)',
                border: '1px solid var(--color-border)',
                borderRadius: '2px',
                marginBottom: '28px',
              }}
            >
              <h4 style={{ fontSize: '13px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-charcoal)', marginBottom: '6px' }}>
                Omotenashi Booking Notice
              </h4>
              <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--color-stone)' }}>
                {sectionData?.note || 'For parties exceeding 6 guests or exclusive omakase counter bookings, please provide 48 hours notice.'}
              </p>
            </div>

            <div style={{ fontSize: '13px', color: 'var(--color-stone)' }}>
              Concierge Direct: <strong style={{ color: 'var(--color-charcoal)' }}>{restaurant.contact?.phone}</strong>
            </div>
          </div>

          {/* Right Form Card */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--color-border)',
              padding: '38px',
              borderRadius: '2px',
              boxShadow: '0 15px 40px rgba(0,0,0,0.04)',
            }}
          >
            {isSuccess ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(105, 116, 91, 0.15)',
                    color: 'var(--color-moss)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                  }}
                >
                  <CheckCircle size={32} />
                </div>
                <h3 style={{ fontSize: '24px', color: 'var(--color-charcoal)', marginBottom: '8px' }}>
                  Request Received
                </h3>
                <div style={{ fontSize: '13px', color: 'var(--color-bamboo)', fontWeight: 600, marginBottom: '14px' }}>
                  Reference ID: {inquiryId}
                </div>
                <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--color-stone)', marginBottom: '24px' }}>
                  Our concierge will contact you shortly to confirm your table arrangements.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="btn-zen btn-zen-outline"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontSize: '22px', color: 'var(--color-charcoal)', marginBottom: '20px' }}>
                  Dining Inquiry Details
                </h3>

                {errorMsg && (
                  <div style={{ padding: '12px', backgroundColor: '#F8E9E7', color: 'var(--color-vermilion)', fontSize: '13px', marginBottom: '16px' }}>
                    {errorMsg}
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                  <div>
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="full_name"
                      required
                      value={formData.full_name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="form-control"
                    />
                  </div>
                  <div>
                    <label>Phone Number *</label>
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

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
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
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                  <div>
                    <label>Party Size *</label>
                    <select name="guests" value={formData.guests} onChange={handleChange} className="form-control">
                      <option value="1 Guest">1 Guest</option>
                      <option value="2 Guests">2 Guests</option>
                      <option value="3-4 Guests">3 – 4 Guests</option>
                      <option value="5-6 Guests">5 – 6 Guests</option>
                      <option value="7+ Guests">7+ Guests</option>
                    </select>
                  </div>
                  <div>
                    <label>Occasion</label>
                    <select name="occasion" value={formData.occasion} onChange={handleChange} className="form-control">
                      <option value="Casual Dining">Casual Dining</option>
                      <option value="Anniversary">Anniversary</option>
                      <option value="Birthday">Birthday</option>
                      <option value="Executive Dinner">Executive Dinner</option>
                      <option value="Family Gathering">Family Gathering</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label>Special Culinary Requests</label>
                  <textarea
                    name="special_requests"
                    rows={2}
                    value={formData.special_requests}
                    onChange={handleChange}
                    placeholder="Dietary allergies, preferred seating..."
                    className="form-control"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-zen btn-zen-primary"
                  style={{ width: '100%', padding: '14px' }}
                >
                  {isSubmitting ? 'Transmitting Request...' : 'Submit Inquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
