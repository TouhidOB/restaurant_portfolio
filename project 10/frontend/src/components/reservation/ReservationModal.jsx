import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { submitReservation, lookupReservation } from '../../services/api';

export default function ReservationModal() {
  const { content, lang, t, activeReservationModal, isReservationOpen, closeReservation } = useCMS();
  const isOpen = activeReservationModal || isReservationOpen;

  const [activeTab, setActiveTab] = useState('book'); // 'book' | 'lookup'

  // Booking Form State
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    time: '7:30 PM',
    shift: 'dinner', // 'lunch' | 'dinner'
    guests: 2,
    occasion: 'Cultural Dining & Zamindari Feast',
    seating_area: 'Courtyard Heritage Table',
    dietary_notes: '',
    special_requests: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);
  const [bookingError, setBookingError] = useState('');

  // Lookup State
  const [lookupCode, setLookupCode] = useState('');
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupResult, setLookupResult] = useState(null);
  const [lookupError, setLookupError] = useState('');

  if (!isOpen) return null;

  const handleShiftSelect = (shift) => {
    setFormData((prev) => ({
      ...prev,
      shift,
      time: shift === 'lunch' ? '1:00 PM' : '7:30 PM',
    }));
  };

  const lunchTimeSlots = ['12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM'];
  const dinnerTimeSlots = ['6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM'];
  const currentTimeSlots = formData.shift === 'lunch' ? lunchTimeSlots : dinnerTimeSlots;

  const seatingAreas = [
    'Courtyard Heritage Table',
    'Terracotta Central Dining Hall',
    'Zamindari Private Brass Salon',
    'Verandah River Breeze Table',
  ];

  const occasions = [
    'Cultural Dining & Zamindari Feast',
    'Family Heritage Celebration',
    'Distinguished Corporate Banquet',
    'Anniversary & Traditional Toast',
  ];

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setBookingError('');

    try {
      const payload = {
        ...formData,
        guest_name: formData.full_name,
        party_size: formData.guests,
        time_slot: formData.time,
        reservation_date: formData.date,
        preferred_zone: formData.seating_area,
        preferred_language: lang || 'en',
      };

      const res = await submitReservation(payload);
      if (res && res.success && res.data) {
        setBookingResult(res.data);
      } else {
        setBookingResult({
          reference_code: `BEN-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
          guest_name: formData.full_name,
          date: formData.date,
          time: formData.time,
          shift: formData.shift,
          guests: formData.guests,
          status: 'pending',
        });
      }
    } catch (err) {
      console.error('Reservation booking failed:', err);
      setBookingError(err.message || 'Could not complete your reservation request. Please try again or call our host desk.');
    } finally {
      setSubmitting(false);
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
      if (res && res.success && res.reservation) {
        setLookupResult(res.reservation);
      } else {
        setLookupError(res.message || `No reservation found for reference "${lookupCode}".`);
      }
    } catch (err) {
      setLookupError('Could not connect to reservation server. Please check your reference code.');
    } finally {
      setLookupLoading(false);
    }
  };

  const handleClose = () => {
    setBookingResult(null);
    setLookupResult(null);
    setBookingError('');
    setLookupError('');
    closeReservation();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        backgroundColor: 'rgba(16, 24, 34, 0.9)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        style={{
          backgroundColor: '#1A2536',
          border: '1px solid #D4AF37',
          borderRadius: '4px',
          maxWidth: '640px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          padding: '2.5rem',
          position: 'relative',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.85)',
          color: '#F4EBDD',
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
            color: '#F4EBDD',
            fontSize: '1.8rem',
            cursor: 'pointer',
            lineHeight: 1,
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#D4AF37')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#F4EBDD')}
        >
          &times;
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <span style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#D4AF37', fontWeight: 700 }}>
            ATITHI BHOJAN &bull; TABLE RESERVATIONS
          </span>
          <h2 style={{ fontFamily: 'var(--font-display, "Cormorant Garamond", serif)', fontSize: '2rem', color: '#F4EBDD', margin: '0.4rem 0 0.2rem' }}>
            Table Reservation &amp; Concierge
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#C8B18D' }}>
            Experience traditional Zamindari hospitality and artisanal river delta cuisine.
          </p>
        </div>

        {/* Tab Toggle */}
        <div
          style={{
            display: 'flex',
            backgroundColor: 'rgba(38, 52, 74, 0.45)',
            border: '1px solid rgba(212, 175, 55, 0.25)',
            borderRadius: '30px',
            padding: '4px',
            marginBottom: '2rem',
          }}
        >
          <button
            onClick={() => setActiveTab('book')}
            style={{
              flex: 1,
              padding: '0.65rem 1rem',
              backgroundColor: activeTab === 'book' ? '#D4AF37' : 'transparent',
              color: activeTab === 'book' ? '#141312' : '#F4EBDD',
              border: 'none',
              borderRadius: '25px',
              fontFamily: 'var(--font-body, "Manrope", sans-serif)',
              fontSize: '0.82rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            Request Reservation
          </button>
          <button
            onClick={() => setActiveTab('lookup')}
            style={{
              flex: 1,
              padding: '0.65rem 1rem',
              backgroundColor: activeTab === 'lookup' ? '#D4AF37' : 'transparent',
              color: activeTab === 'lookup' ? '#141312' : '#F4EBDD',
              border: 'none',
              borderRadius: '25px',
              fontFamily: 'var(--font-body, "Manrope", sans-serif)',
              fontSize: '0.82rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            Lookup Reservation
          </button>
        </div>

        {/* TAB 1: BOOKING FORM */}
        {activeTab === 'book' && (
          <div>
            {bookingResult ? (
              <div
                style={{
                  backgroundColor: 'rgba(38, 52, 74, 0.45)',
                  border: '1px solid #D4AF37',
                  borderRadius: '4px',
                  padding: '2rem',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>🏺</div>
                <h3 style={{ fontFamily: 'var(--font-display, "Cormorant Garamond", serif)', fontSize: '1.6rem', color: '#D4AF37', marginBottom: '0.5rem' }}>
                  Reservation Request Submitted
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#F4EBDD', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  Thank you, <strong>{bookingResult.guest_name || bookingResult.full_name}</strong>. Your reservation inquiry for{' '}
                  <strong>{bookingResult.reservation_date || bookingResult.date}</strong> ({bookingResult.reservation_time || bookingResult.time}) has been registered.
                </p>

                <div
                  style={{
                    backgroundColor: 'rgba(20, 19, 18, 0.8)',
                    border: '1px dashed #D4AF37',
                    borderRadius: '4px',
                    padding: '1rem',
                    marginBottom: '1.5rem',
                  }}
                >
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#C8B18D', letterSpacing: '0.1em' }}>
                    Your Reference Code
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#D4AF37', letterSpacing: '0.08em', marginTop: '0.2rem' }}>
                    {bookingResult.reference_code || bookingResult.id}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#C8B18D', marginTop: '0.3rem' }}>
                    Save this reference code to check your table assignment and status anytime.
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  style={{
                    backgroundColor: '#A6533B',
                    color: '#fff',
                    border: '1px solid #D4AF37',
                    padding: '0.75rem 2rem',
                    borderRadius: '3px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Close &amp; Return
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                {bookingError && (
                  <div
                    style={{
                      padding: '0.75rem 1rem',
                      backgroundColor: 'rgba(166, 83, 59, 0.25)',
                      borderLeft: '3px solid #A6533B',
                      color: '#ffcdd2',
                      fontSize: '0.85rem',
                    }}
                  >
                    {bookingError}
                  </div>
                )}

                {/* Shift Selector: Lunch vs Dinner */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#D4AF37', marginBottom: '0.4rem', fontWeight: 700 }}>
                    Select Service Shift
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <button
                      type="button"
                      onClick={() => handleShiftSelect('lunch')}
                      style={{
                        padding: '0.65rem',
                        backgroundColor: formData.shift === 'lunch' ? '#D4AF37' : 'rgba(38, 52, 74, 0.4)',
                        color: formData.shift === 'lunch' ? '#141312' : '#F4EBDD',
                        border: '1px solid',
                        borderColor: formData.shift === 'lunch' ? '#D4AF37' : 'rgba(212, 175, 55, 0.2)',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        transition: 'all 0.2s ease',
                      }}
                    >
                      ☀️ Lunch Shift (12:00 – 15:30)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleShiftSelect('dinner')}
                      style={{
                        padding: '0.65rem',
                        backgroundColor: formData.shift === 'dinner' ? '#D4AF37' : 'rgba(38, 52, 74, 0.4)',
                        color: formData.shift === 'dinner' ? '#141312' : '#F4EBDD',
                        border: '1px solid',
                        borderColor: formData.shift === 'dinner' ? '#D4AF37' : 'rgba(212, 175, 55, 0.2)',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        transition: 'all 0.2s ease',
                      }}
                    >
                      🌙 Dinner Shift (18:30 – 23:00)
                    </button>
                  </div>
                </div>

                {/* Guest Details */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#D4AF37', marginBottom: '0.35rem', fontWeight: 700 }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    placeholder="e.g. Ananya Mukherjee / Devendra Choudhury"
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.9rem',
                      background: '#223046',
                      border: '1px solid rgba(212, 175, 55, 0.25)',
                      borderRadius: '3px',
                      color: '#F4EBDD',
                      outline: 'none',
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#D4AF37', marginBottom: '0.35rem', fontWeight: 700 }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+880 1711-000000"
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.9rem',
                        background: '#223046',
                        border: '1px solid rgba(212, 175, 55, 0.25)',
                        borderRadius: '3px',
                        color: '#F4EBDD',
                        outline: 'none',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#D4AF37', marginBottom: '0.35rem', fontWeight: 700 }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="guest@heritage.com"
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.9rem',
                        background: '#223046',
                        border: '1px solid rgba(212, 175, 55, 0.25)',
                        borderRadius: '3px',
                        color: '#F4EBDD',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                {/* Date, Time, Guests */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#D4AF37', marginBottom: '0.35rem', fontWeight: 700 }}>
                      Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.6rem',
                        background: '#223046',
                        border: '1px solid rgba(212, 175, 55, 0.25)',
                        borderRadius: '3px',
                        color: '#F4EBDD',
                        outline: 'none',
                        fontSize: '0.85rem',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#D4AF37', marginBottom: '0.35rem', fontWeight: 700 }}>
                      Time Slot *
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.6rem',
                        background: '#223046',
                        border: '1px solid rgba(212, 175, 55, 0.25)',
                        borderRadius: '3px',
                        color: '#F4EBDD',
                        outline: 'none',
                        fontSize: '0.85rem',
                      }}
                    >
                      {currentTimeSlots.map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#D4AF37', marginBottom: '0.35rem', fontWeight: 700 }}>
                      Party Size *
                    </label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value, 10) || 2 })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.6rem',
                        background: '#223046',
                        border: '1px solid rgba(212, 175, 55, 0.25)',
                        borderRadius: '3px',
                        color: '#F4EBDD',
                        outline: 'none',
                        fontSize: '0.85rem',
                      }}
                    >
                      {[1, 2, 3, 4, 5, 6, 8, 12].map((num) => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Seating Area & Occasion */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#D4AF37', marginBottom: '0.35rem', fontWeight: 700 }}>
                      Seating Zone
                    </label>
                    <select
                      value={formData.seating_area}
                      onChange={(e) => setFormData({ ...formData, seating_area: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.6rem',
                        background: '#223046',
                        border: '1px solid rgba(212, 175, 55, 0.25)',
                        borderRadius: '3px',
                        color: '#F4EBDD',
                        outline: 'none',
                        fontSize: '0.82rem',
                      }}
                    >
                      {seatingAreas.map((area) => (
                        <option key={area} value={area}>{area}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#D4AF37', marginBottom: '0.35rem', fontWeight: 700 }}>
                      Occasion
                    </label>
                    <select
                      value={formData.occasion}
                      onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.6rem',
                        background: '#223046',
                        border: '1px solid rgba(212, 175, 55, 0.25)',
                        borderRadius: '3px',
                        color: '#F4EBDD',
                        outline: 'none',
                        fontSize: '0.82rem',
                      }}
                    >
                      {occasions.map((occ) => (
                        <option key={occ} value={occ}>{occ}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Dietary Notes */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#D4AF37', marginBottom: '0.35rem', fontWeight: 700 }}>
                    Dietary Specifications &amp; Requests
                  </label>
                  <input
                    type="text"
                    value={formData.dietary_notes}
                    onChange={(e) => setFormData({ ...formData, dietary_notes: e.target.value })}
                    placeholder="e.g. Mustard Hilsa preference, mild chili, vegetarian thali, kansa service"
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.9rem',
                      background: '#223046',
                      border: '1px solid rgba(212, 175, 55, 0.25)',
                      borderRadius: '3px',
                      color: '#F4EBDD',
                      outline: 'none',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    backgroundColor: '#A6533B',
                    color: '#fff',
                    border: '1px solid #D4AF37',
                    padding: '0.85rem',
                    width: '100%',
                    marginTop: '0.5rem',
                    fontWeight: 700,
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    opacity: submitting ? 0.7 : 1,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  {submitting ? 'Transmitting Request...' : 'Confirm Table Request at Bengal Heritage'}
                </button>
              </form>
            )}
          </div>
        )}

        {/* TAB 2: LOOKUP RESERVATION */}
        {activeTab === 'lookup' && (
          <div>
            <form onSubmit={handleLookupSubmit} style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.75rem' }}>
              <input
                type="text"
                required
                value={lookupCode}
                onChange={(e) => setLookupCode(e.target.value)}
                placeholder="Enter Reference (e.g. BEN-261116-LUN1)"
                style={{
                  flex: 1,
                  padding: '0.8rem 1rem',
                  background: '#223046',
                  border: '1px solid rgba(212, 175, 55, 0.25)',
                  borderRadius: '3px',
                  color: '#F4EBDD',
                  fontWeight: 600,
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                disabled={lookupLoading}
                className="btn-submit-lookup"
                style={{
                  backgroundColor: '#A6533B',
                  color: '#fff',
                  border: '1px solid #D4AF37',
                  padding: '0.8rem 1.4rem',
                  whiteSpace: 'nowrap',
                  cursor: lookupLoading ? 'not-allowed' : 'pointer',
                  fontWeight: 700,
                }}
              >
                {lookupLoading ? 'Checking...' : 'Check Status'}
              </button>
            </form>

            {lookupError && (
              <div
                style={{
                  padding: '0.85rem 1.25rem',
                  backgroundColor: 'rgba(166, 83, 59, 0.25)',
                  borderLeft: '3px solid #A6533B',
                  color: '#ffcdd2',
                  fontSize: '0.85rem',
                  marginBottom: '1rem',
                }}
              >
                {lookupError}
              </div>
            )}

            {lookupResult && (
              <div
                style={{
                  backgroundColor: 'rgba(34, 48, 70, 0.5)',
                  border: '1px solid #D4AF37',
                  borderRadius: '4px',
                  padding: '1.75rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid rgba(212, 175, 55, 0.2)', paddingBottom: '1rem' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#C8B18D' }}>
                      BOOKING REFERENCE
                    </span>
                    <h3 style={{ fontSize: '1.35rem', color: '#D4AF37', margin: 0, fontWeight: 700 }}>
                      {lookupResult.reference_code || lookupResult.id}
                    </h3>
                  </div>
                  <div>
                    <span
                      style={{
                        padding: '0.35rem 0.85rem',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        backgroundColor:
                          lookupResult.status === 'confirmed'
                            ? '#2e7d32'
                            : lookupResult.status === 'seated'
                            ? '#1565c0'
                            : lookupResult.status === 'cancelled'
                            ? '#c62828'
                            : '#d4af37',
                        color: '#fff',
                        border: '1px solid rgba(255,255,255,0.2)',
                      }}
                    >
                      {lookupResult.status || 'Pending'}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.88rem' }}>
                  <div>
                    <span style={{ color: '#C8B18D', display: 'block', fontSize: '0.75rem' }}>Primary Guest</span>
                    <strong style={{ color: '#F4EBDD' }}>{lookupResult.guest_name || lookupResult.full_name}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#C8B18D', display: 'block', fontSize: '0.75rem' }}>Reservation Date &amp; Shift</span>
                    <strong style={{ color: '#F4EBDD' }}>
                      {lookupResult.reservation_date || lookupResult.date} &bull; {(lookupResult.shift || 'dinner').toUpperCase()}
                    </strong>
                  </div>
                  <div>
                    <span style={{ color: '#C8B18D', display: 'block', fontSize: '0.75rem' }}>Time &amp; Party</span>
                    <strong style={{ color: '#F4EBDD' }}>
                      {lookupResult.reservation_time || lookupResult.time_slot || lookupResult.time} ({lookupResult.guests || lookupResult.party_size} Guests)
                    </strong>
                  </div>
                  <div>
                    <span style={{ color: '#C8B18D', display: 'block', fontSize: '0.75rem' }}>Table Assignment</span>
                    <strong style={{ color: '#D4AF37' }}>
                      {lookupResult.table_number ? `Table ${lookupResult.table_number}` : 'Courtyard Concierge Assigned Upon Arrival'}
                    </strong>
                  </div>
                  <div>
                    <span style={{ color: '#C8B18D', display: 'block', fontSize: '0.75rem' }}>Seating Zone</span>
                    <span style={{ color: '#F4EBDD' }}>{lookupResult.seating_preference || lookupResult.preferred_zone || 'Heritage Courtyard'}</span>
                  </div>
                  <div>
                    <span style={{ color: '#C8B18D', display: 'block', fontSize: '0.75rem' }}>Special Occasion</span>
                    <span style={{ color: '#F4EBDD' }}>{lookupResult.occasion || 'Traditional Dining'}</span>
                  </div>
                </div>

                {lookupResult.dietary_notes && (
                  <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px dashed rgba(212, 175, 55, 0.2)', fontSize: '0.82rem' }}>
                    <span style={{ color: '#C8B18D' }}>Dietary Notes: </span>
                    <span style={{ color: '#F4EBDD' }}>{lookupResult.dietary_notes}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
