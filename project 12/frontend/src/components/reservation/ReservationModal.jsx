import React, { useState, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';
import { submitReservation, checkReservationAvailability, lookupReservation } from '../../services/api';

export default function ReservationModal() {
  const { isReservationModalOpen, isReservationOpen, closeReservationModal, closeReservation } = useCMS();
  const isOpen = isReservationModalOpen || isReservationOpen;

  const [activeTab, setActiveTab] = useState('book'); // 'book' | 'lookup'

  // Booking Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    time: '12:30',
    shift: 'lunch', // 'lunch' | 'dinner'
    guests: 2,
    seating: 'Cliffside Balcony & Sea Panorama',
    notes: '',
    dietary: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);
  const [bookingError, setBookingError] = useState('');
  const [availability, setAvailability] = useState({ is_available: true, remaining_covers: 40 });

  // Lookup Form State
  const [lookupCode, setLookupCode] = useState('');
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupResult, setLookupResult] = useState(null);
  const [lookupError, setLookupError] = useState('');

  // Check shift availability when date or shift changes
  useEffect(() => {
    if (formData.date) {
      checkReservationAvailability(formData.date, formData.shift).then(res => {
        if (res) setAvailability(res);
      });
    }
  }, [formData.date, formData.shift]);

  if (!isOpen) return null;

  const handleClose = () => {
    setBookingResult(null);
    setBookingError('');
    setLookupResult(null);
    setLookupError('');
    if (closeReservationModal) closeReservationModal();
    if (closeReservation) closeReservation();
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setBookingError('');

    try {
      const payload = {
        full_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: formData.date,
        time: formData.time,
        shift: formData.shift,
        guests: parseInt(formData.guests, 10),
        seating_area: formData.seating,
        special_requests: formData.notes,
        dietary_notes: formData.dietary,
      };

      const res = await submitReservation(payload);
      setIsSubmitting(false);

      if (res.ok) {
        setBookingResult(res.data.reservation || res.data);
      } else {
        setBookingError(res.error || 'Unable to submit reservation. Please try again.');
      }
    } catch (err) {
      setIsSubmitting(false);
      setBookingError(err.message || 'An error occurred while submitting.');
    }
  };

  const handleLookupSubmit = async (e) => {
    e.preventDefault();
    if (!lookupCode.trim()) return;

    setLookupLoading(true);
    setLookupError('');
    setLookupResult(null);

    try {
      const res = await lookupReservation(lookupCode.trim());
      setLookupLoading(false);
      const data = res.reservation || res;
      setLookupResult(data);
    } catch (err) {
      setLookupLoading(false);
      setLookupError(err.message || `No reservation found for reference ${lookupCode.toUpperCase()}`);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        backgroundColor: 'rgba(24, 37, 46, 0.82)',
        backdropFilter: 'blur(8px)',
        overflowY: 'auto',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '680px',
          backgroundColor: '#1F303C',
          borderRadius: '4px',
          border: '1px solid rgba(233, 223, 207, 0.25)',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.6)',
          padding: '2.5rem',
          position: 'relative',
          color: '#F7F3EA',
          margin: 'auto',
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'none',
            border: 'none',
            color: '#A9BDB5',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: '4px 8px',
            lineHeight: 1,
          }}
        >
          ✕
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>🏛️</div>
          <span style={{ color: '#B96F4F', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>
            VILLA RIVIERA &bull; SAINT-JEAN-CAP-FERRAT
          </span>
          <h2 style={{ fontFamily: 'var(--font-display, "Cormorant Garamond")', fontSize: '2.2rem', color: '#F7F3EA', margin: 0 }}>
            {activeTab === 'book' ? 'Table Reservation & Visit Inquiry' : 'Reservation Reference Lookup'}
          </h2>
          <p style={{ color: '#E9DFCF', fontSize: '0.9rem', marginTop: '0.4rem' }}>
            {activeTab === 'book'
              ? 'Reserve an unhurried table overlooking the Mediterranean waters of Cap-Ferrat.'
              : 'Enter your booking reference code to check confirmation status and host desk table assignments.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(233, 223, 207, 0.2)', marginBottom: '2rem' }}>
          <button
            type="button"
            onClick={() => setActiveTab('book')}
            style={{
              flex: 1,
              padding: '0.85rem',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'book' ? '2px solid #B96F4F' : '2px solid transparent',
              color: activeTab === 'book' ? '#F7F3EA' : '#A9BDB5',
              fontWeight: 700,
              fontSize: '0.85rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            Request Reservation
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('lookup')}
            style={{
              flex: 1,
              padding: '0.85rem',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'lookup' ? '2px solid #B96F4F' : '2px solid transparent',
              color: activeTab === 'lookup' ? '#F7F3EA' : '#A9BDB5',
              fontWeight: 700,
              fontSize: '0.85rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            Lookup Reservation
          </button>
        </div>

        {/* TAB 1: BOOKING FORM */}
        {activeTab === 'book' && (
          <div>
            {bookingResult ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <div style={{ fontSize: '3rem', color: '#C5D6AB', marginBottom: '1rem' }}>✓</div>
                <h3 style={{ fontFamily: 'var(--font-display, "Cormorant Garamond")', fontSize: '1.8rem', color: '#F7F3EA', marginBottom: '0.75rem' }}>
                  Reservation Request Received
                </h3>
                <p style={{ color: '#E9DFCF', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '480px', margin: '0 auto' }}>
                  Thank you, <strong>{formData.name}</strong>. Your reservation inquiry for Villa Riviera has been submitted to our Maitre D'.
                </p>

                <div style={{ backgroundColor: '#18252E', border: '1px solid #B96F4F', borderRadius: '4px', padding: '1.5rem', margin: '1.5rem 0', textAlign: 'left' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', borderBottom: '1px solid rgba(233, 223, 207, 0.15)', paddingBottom: '0.5rem' }}>
                    <span style={{ color: '#A9BDB5', fontSize: '0.82rem' }}>Reference Code:</span>
                    <span style={{ fontFamily: 'monospace', fontWeight: 800, color: '#F7F3EA', fontSize: '1.05rem' }}>
                      {bookingResult.reference_code}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                    <span style={{ color: '#E9DFCF' }}>Guest:</span>
                    <span style={{ fontWeight: 600 }}>{bookingResult.full_name || formData.name}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                    <span style={{ color: '#E9DFCF' }}>Date &amp; Shift:</span>
                    <span style={{ fontWeight: 600 }}>
                      {formData.date} &bull; {formData.shift === 'lunch' ? '☀️ Daylight Lunch' : '🌙 Twilight Dinner'} ({formData.time})
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: '#E9DFCF' }}>Party Size:</span>
                    <span style={{ fontWeight: 600 }}>{formData.guests} Guests ({formData.seating})</span>
                  </div>
                </div>

                <p style={{ color: '#A9BDB5', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                  Please save your booking reference code. You can look up your approval status anytime in the "Lookup Reservation" tab.
                </p>

                <button
                  type="button"
                  onClick={handleClose}
                  style={{
                    padding: '0.75rem 2rem',
                    backgroundColor: '#B96F4F',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '3px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                  }}
                >
                  Close &amp; Return
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {bookingError && (
                  <div style={{ padding: '0.85rem', backgroundColor: 'rgba(180, 50, 50, 0.25)', border: '1px solid #FF8888', borderRadius: '3px', color: '#FF9999', fontSize: '0.85rem' }}>
                    {bookingError}
                  </div>
                )}

                {/* Service Shift Toggle */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#A9BDB5', marginBottom: '0.5rem' }}>
                    SELECT SERVICE SHIFT
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, shift: 'lunch', time: '12:30' })}
                      style={{
                        padding: '0.85rem',
                        borderRadius: '3px',
                        border: `1px solid ${formData.shift === 'lunch' ? '#B96F4F' : 'rgba(233, 223, 207, 0.2)'}`,
                        backgroundColor: formData.shift === 'lunch' ? 'rgba(185, 111, 79, 0.25)' : '#18252E',
                        color: formData.shift === 'lunch' ? '#F7F3EA' : '#A9BDB5',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.2s',
                      }}
                    >
                      <div style={{ fontSize: '1rem', marginBottom: '0.2rem' }}>☀️ Daylight Lunch</div>
                      <div style={{ fontSize: '0.72rem', opacity: 0.8 }}>12:00 – 15:00 Service</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, shift: 'dinner', time: '20:00' })}
                      style={{
                        padding: '0.85rem',
                        borderRadius: '3px',
                        border: `1px solid ${formData.shift === 'dinner' ? '#B96F4F' : 'rgba(233, 223, 207, 0.2)'}`,
                        backgroundColor: formData.shift === 'dinner' ? 'rgba(185, 111, 79, 0.25)' : '#18252E',
                        color: formData.shift === 'dinner' ? '#F7F3EA' : '#A9BDB5',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.2s',
                      }}
                    >
                      <div style={{ fontSize: '1rem', marginBottom: '0.2rem' }}>🌙 Twilight Dinner</div>
                      <div style={{ fontSize: '0.72rem', opacity: 0.8 }}>19:30 – 23:30 Service</div>
                    </button>
                  </div>
                </div>

                {/* Date and Time Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#A9BDB5', marginBottom: '0.35rem' }}>
                      RESERVATION DATE
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', backgroundColor: '#18252E', border: '1px solid rgba(233, 223, 207, 0.25)', borderRadius: '2px', color: '#F7F3EA', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#A9BDB5', marginBottom: '0.35rem' }}>
                      SEATING TIME
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', backgroundColor: '#18252E', border: '1px solid rgba(233, 223, 207, 0.25)', borderRadius: '2px', color: '#F7F3EA', outline: 'none' }}
                    >
                      {formData.shift === 'lunch' ? (
                        <>
                          <option value="12:00">12:00 PM</option>
                          <option value="12:30">12:30 PM</option>
                          <option value="13:00">01:00 PM</option>
                          <option value="13:30">01:30 PM</option>
                          <option value="14:00">02:00 PM</option>
                        </>
                      ) : (
                        <>
                          <option value="19:30">07:30 PM</option>
                          <option value="20:00">08:00 PM</option>
                          <option value="20:30">08:30 PM</option>
                          <option value="21:00">09:00 PM</option>
                          <option value="21:30">09:30 PM</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>

                {/* Party Size & Seating Zone Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#A9BDB5', marginBottom: '0.35rem' }}>
                      GUESTS
                    </label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', backgroundColor: '#18252E', border: '1px solid rgba(233, 223, 207, 0.25)', borderRadius: '2px', color: '#F7F3EA', outline: 'none' }}
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="5">5 Guests</option>
                      <option value="6">6 Guests</option>
                      <option value="8">8 Guests (Private Colonnade)</option>
                      <option value="12">12 Guests (Villa Salon Buyout)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#A9BDB5', marginBottom: '0.35rem' }}>
                      SEATING ZONE
                    </label>
                    <select
                      value={formData.seating}
                      onChange={(e) => setFormData({ ...formData, seating: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', backgroundColor: '#18252E', border: '1px solid rgba(233, 223, 207, 0.25)', borderRadius: '2px', color: '#F7F3EA', outline: 'none' }}
                    >
                      <option value="Cliffside Balcony & Sea Panorama">Cliffside Balcony &amp; Sea Panorama</option>
                      <option value="Arched Limestone Colonnade">Arched Limestone Colonnade</option>
                      <option value="Terracotta Fountain Courtyard">Terracotta Fountain Courtyard</option>
                      <option value="Grand Dining Salon Vaults">Grand Dining Salon Vaults</option>
                      <option value="Subterranean Wine Cellar Table">Subterranean Wine Cellar Table</option>
                    </select>
                  </div>
                </div>

                {/* Guest Contact Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#A9BDB5', marginBottom: '0.35rem' }}>
                      FULL NAME
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Countess Hélène de Valois"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', backgroundColor: '#18252E', border: '1px solid rgba(233, 223, 207, 0.25)', borderRadius: '2px', color: '#F7F3EA', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#A9BDB5', marginBottom: '0.35rem' }}>
                      TELEPHONE
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+33 4 93 01 00 00"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', backgroundColor: '#18252E', border: '1px solid rgba(233, 223, 207, 0.25)', borderRadius: '2px', color: '#F7F3EA', outline: 'none' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#A9BDB5', marginBottom: '0.35rem' }}>
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. helene@valois.fr"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', backgroundColor: '#18252E', border: '1px solid rgba(233, 223, 207, 0.25)', borderRadius: '2px', color: '#F7F3EA', outline: 'none' }}
                  />
                </div>

                {/* Dietary Notes */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#A9BDB5', marginBottom: '0.35rem' }}>
                    DIETARY PREFERENCES &amp; ALLERGIES
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Gluten-sensitive, pescatarian, no shellfish..."
                    value={formData.dietary}
                    onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', backgroundColor: '#18252E', border: '1px solid rgba(233, 223, 207, 0.25)', borderRadius: '2px', color: '#F7F3EA', outline: 'none' }}
                  />
                </div>

                {/* Special Requests */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#A9BDB5', marginBottom: '0.35rem' }}>
                    SPECIAL NOTES OR YACHT TENDER ARRIVAL
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Anniversary celebration, yacht arrival coordinates, or sommelier requests..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', backgroundColor: '#18252E', border: '1px solid rgba(233, 223, 207, 0.25)', borderRadius: '2px', color: '#F7F3EA', outline: 'none' }}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    padding: '0.95rem',
                    backgroundColor: isSubmitting ? '#9E5B3D' : '#B96F4F',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '3px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    marginTop: '0.5rem',
                    transition: 'background-color 0.2s',
                  }}
                >
                  {isSubmitting ? 'Submitting to Concierge...' : 'Submit Table Reservation Request'}
                </button>
              </form>
            )}
          </div>
        )}

        {/* TAB 2: LOOKUP RESERVATION */}
        {activeTab === 'lookup' && (
          <div>
            <form onSubmit={handleLookupSubmit} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <input
                type="text"
                required
                value={lookupCode}
                onChange={(e) => setLookupCode(e.target.value)}
                placeholder="Enter Reference Code (e.g. RIV-261116-LUN1)"
                style={{
                  flex: 1,
                  padding: '0.85rem 1rem',
                  backgroundColor: '#18252E',
                  border: '1px solid rgba(233, 223, 207, 0.25)',
                  borderRadius: '2px',
                  color: '#F7F3EA',
                  fontFamily: 'monospace',
                  fontSize: '0.95rem',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                disabled={lookupLoading}
                className="btn-submit-lookup"
                style={{
                  padding: '0.85rem 1.75rem',
                  backgroundColor: '#B96F4F',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '2px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  cursor: lookupLoading ? 'not-allowed' : 'pointer',
                }}
              >
                {lookupLoading ? 'Checking...' : 'Check Status'}
              </button>
            </form>

            {lookupError && (
              <div style={{ padding: '1rem', backgroundColor: 'rgba(180, 50, 50, 0.25)', border: '1px solid #FF8888', borderRadius: '3px', color: '#FF9999', fontSize: '0.88rem', textAlign: 'center' }}>
                {lookupError}
              </div>
            )}

            {lookupResult && (
              <div style={{ backgroundColor: '#18252E', border: '1px solid rgba(233, 223, 207, 0.3)', borderRadius: '4px', padding: '1.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid rgba(233, 223, 207, 0.15)', paddingBottom: '0.75rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#A9BDB5', textTransform: 'uppercase' }}>Booking Reference</span>
                    <div style={{ fontFamily: 'monospace', fontSize: '1.2rem', fontWeight: 800, color: '#F7F3EA' }}>
                      {lookupResult.reference_code}
                    </div>
                  </div>
                  <div>
                    <span
                      style={{
                        padding: '4px 12px',
                        borderRadius: '2px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        backgroundColor: lookupResult.status === 'confirmed' ? 'rgba(89, 100, 72, 0.4)' : lookupResult.status === 'pending' ? 'rgba(185, 111, 79, 0.4)' : 'rgba(38, 58, 72, 0.4)',
                        color: lookupResult.status === 'confirmed' ? '#C5D6AB' : lookupResult.status === 'pending' ? '#FFB793' : '#A9BDB5',
                        border: '1px solid currentColor',
                      }}
                    >
                      {lookupResult.status}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.88rem' }}>
                  <div>
                    <div style={{ color: '#A9BDB5', fontSize: '0.75rem' }}>Guest Name</div>
                    <div style={{ fontWeight: 700, marginTop: '2px' }}>{lookupResult.full_name}</div>
                  </div>
                  <div>
                    <div style={{ color: '#A9BDB5', fontSize: '0.75rem' }}>Dining Shift &amp; Time</div>
                    <div style={{ fontWeight: 700, marginTop: '2px' }}>
                      {lookupResult.shift === 'lunch' ? '☀️ Daylight Lunch' : '🌙 Twilight Dinner'} ({lookupResult.time})
                    </div>
                  </div>
                  <div>
                    <div style={{ color: '#A9BDB5', fontSize: '0.75rem' }}>Reservation Date</div>
                    <div style={{ fontWeight: 700, marginTop: '2px' }}>{lookupResult.date}</div>
                  </div>
                  <div>
                    <div style={{ color: '#A9BDB5', fontSize: '0.75rem' }}>Guests &amp; Zone</div>
                    <div style={{ fontWeight: 700, marginTop: '2px' }}>{lookupResult.guests} Guests &bull; {lookupResult.seating_area}</div>
                  </div>
                  {lookupResult.table_number && (
                    <div style={{ gridColumn: '1 / -1', marginTop: '0.5rem', padding: '0.65rem 1rem', backgroundColor: 'rgba(185, 111, 79, 0.2)', border: '1px solid #B96F4F', borderRadius: '3px' }}>
                      <span style={{ color: '#A9BDB5', fontSize: '0.75rem' }}>Assigned Host Desk Table: </span>
                      <strong style={{ color: '#F7F3EA' }}>{lookupResult.table_number}</strong>
                    </div>
                  )}
                  {lookupResult.dietary_notes && (
                    <div style={{ gridColumn: '1 / -1', marginTop: '0.25rem' }}>
                      <span style={{ color: '#A9BDB5', fontSize: '0.75rem' }}>Dietary Profile: </span>
                      <span style={{ color: '#FFB793' }}>{lookupResult.dietary_notes}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
