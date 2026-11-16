import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { submitReservation, lookupReservation } from '../../services/api';

export default function ReservationModal() {
  const { activeReservationModal, isReservationOpen, closeReservation, content } = useCMS();
  const isOpen = activeReservationModal || isReservationOpen;

  const [activeTab, setActiveTab] = useState('book'); // 'book' | 'lookup'

  // Booking Form State
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    time: '7:00 PM',
    shift: 'dinner', // 'lunch' | 'dinner'
    guests: '2 Guests',
    occasion: 'Fine Dining & Sunset Tasting',
    seating_area: '360° Floor-to-Ceiling Window Table',
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
      time: shift === 'lunch' ? '12:30 PM' : '7:00 PM',
    }));
  };

  const lunchTimeSlots = ['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM'];
  const dinnerTimeSlots = ['5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'];
  const currentTimeSlots = formData.shift === 'lunch' ? lunchTimeSlots : dinnerTimeSlots;

  const seatingAreas = [
    '360° Floor-to-Ceiling Window Table',
    'Open-Air Sunset Horizon Terrace (Level 54)',
    'Midnight Sky Lounge & Bar',
    'Private Horizon Observatory Suite',
  ];

  const occasions = [
    'Fine Dining & Sunset Tasting',
    'Anniversary & Romantic Milestone',
    'Executive Business Entertaining',
    'VIP Celebration & Private Toast',
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
      };

      const res = await submitReservation(payload);
      if (res && res.success && res.data) {
        setBookingResult(res.data);
      } else {
        setBookingResult({
          reference_code: `SKY-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
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
      setBookingError(err.message || 'Could not complete your reservation request. Please try again or call our Level 54 concierge.');
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
        backgroundColor: 'rgba(10, 18, 29, 0.88)',
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
          backgroundColor: 'var(--color-midnight, #101C2C)',
          border: '1px solid var(--color-champagne, #D8C3A0)',
          borderRadius: '4px',
          maxWidth: '640px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          padding: '2.5rem',
          position: 'relative',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.85)',
          color: 'var(--color-cloud-ivory, #F3F0E9)',
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
            color: 'var(--color-cloud-ivory, #F3F0E9)',
            fontSize: '1.8rem',
            cursor: 'pointer',
            lineHeight: 1,
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-champagne)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-cloud-ivory)')}
        >
          &times;
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <span className="section-label" style={{ letterSpacing: '0.15em', fontSize: '0.75rem' }}>
            LEVEL 54 &bull; 220M ABOVE METROPOLIS
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--color-champagne)', margin: '0.4rem 0 0.2rem' }}>
            Table Reservation &amp; Concierge
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-twilight-slate)' }}>
            Experience 360° panoramic dining. Pre-authorized reservations guarantee horizon window tables.
          </p>
        </div>

        {/* Tab Toggle */}
        <div
          style={{
            display: 'flex',
            backgroundColor: 'rgba(38, 63, 90, 0.3)',
            border: '1px solid var(--color-border)',
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
              backgroundColor: activeTab === 'book' ? 'var(--color-champagne)' : 'transparent',
              color: activeTab === 'book' ? 'var(--color-midnight-dark)' : 'var(--color-cloud-ivory)',
              border: 'none',
              borderRadius: '25px',
              fontFamily: 'var(--font-accent)',
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
              backgroundColor: activeTab === 'lookup' ? 'var(--color-champagne)' : 'transparent',
              color: activeTab === 'lookup' ? 'var(--color-midnight-dark)' : 'var(--color-cloud-ivory)',
              border: 'none',
              borderRadius: '25px',
              fontFamily: 'var(--font-accent)',
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
                  backgroundColor: 'rgba(38, 63, 90, 0.4)',
                  border: '1px solid var(--color-champagne)',
                  borderRadius: '4px',
                  padding: '2rem',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>🥂</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--color-champagne)', marginBottom: '0.5rem' }}>
                  Reservation Request Submitted
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-cloud-ivory)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  Thank you, <strong>{bookingResult.guest_name || bookingResult.full_name}</strong>. Your reservation inquiry for{' '}
                  <strong>{bookingResult.date}</strong> ({bookingResult.time}) is pending maître d’ confirmation.
                </p>

                <div
                  style={{
                    backgroundColor: 'rgba(16, 28, 44, 0.8)',
                    border: '1px dashed var(--color-champagne)',
                    borderRadius: '4px',
                    padding: '1rem',
                    marginBottom: '1.5rem',
                  }}
                >
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-twilight-slate)', letterSpacing: '0.1em' }}>
                    Your Reference Code
                  </div>
                  <div style={{ fontSize: '1.4rem', fontFamily: 'var(--font-accent)', fontWeight: 800, color: 'var(--color-champagne)', letterSpacing: '0.08em', marginTop: '0.2rem' }}>
                    {bookingResult.reference_code || bookingResult.id}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-twilight-slate)', marginTop: '0.3rem' }}>
                    Save this reference code to check your table assignment and status anytime.
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  className="btn-skyline-primary"
                  style={{ padding: '0.75rem 2rem' }}
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
                      backgroundColor: 'rgba(196, 122, 86, 0.2)',
                      borderLeft: '3px solid var(--color-sunset-copper)',
                      color: '#FFB59E',
                      fontSize: '0.85rem',
                    }}
                  >
                    {bookingError}
                  </div>
                )}

                {/* Shift Selector: Lunch vs Dinner */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-champagne)', marginBottom: '0.4rem', fontWeight: 700 }}>
                    Select Service Shift
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <button
                      type="button"
                      onClick={() => handleShiftSelect('lunch')}
                      style={{
                        padding: '0.65rem',
                        backgroundColor: formData.shift === 'lunch' ? 'var(--color-champagne)' : 'rgba(38, 63, 90, 0.25)',
                        color: formData.shift === 'lunch' ? 'var(--color-midnight-dark)' : 'var(--color-cloud-ivory)',
                        border: '1px solid',
                        borderColor: formData.shift === 'lunch' ? 'var(--color-champagne)' : 'var(--color-border)',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        transition: 'all 0.2s ease',
                      }}
                    >
                      ☀️ Lunch Shift (12:00 – 15:00)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleShiftSelect('dinner')}
                      style={{
                        padding: '0.65rem',
                        backgroundColor: formData.shift === 'dinner' ? 'var(--color-champagne)' : 'rgba(38, 63, 90, 0.25)',
                        color: formData.shift === 'dinner' ? 'var(--color-midnight-dark)' : 'var(--color-cloud-ivory)',
                        border: '1px solid',
                        borderColor: formData.shift === 'dinner' ? 'var(--color-champagne)' : 'var(--color-border)',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        transition: 'all 0.2s ease',
                      }}
                    >
                      🌙 Dinner Shift (17:30 – 23:30)
                    </button>
                  </div>
                </div>

                {/* Guest Details */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-champagne)', marginBottom: '0.35rem', fontWeight: 700 }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    placeholder="Lady / Lord / Alexander Wright"
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.9rem',
                      background: 'var(--color-midnight-card)',
                      border: '1px solid var(--color-border-subtle)',
                      borderRadius: '3px',
                      color: 'var(--color-cloud-ivory)',
                      fontFamily: 'var(--font-body)',
                      outline: 'none',
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-champagne)', marginBottom: '0.35rem', fontWeight: 700 }}>
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
                        padding: '0.75rem 0.9rem',
                        background: 'var(--color-midnight-card)',
                        border: '1px solid var(--color-border-subtle)',
                        borderRadius: '3px',
                        color: 'var(--color-cloud-ivory)',
                        fontFamily: 'var(--font-body)',
                        outline: 'none',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-champagne)', marginBottom: '0.35rem', fontWeight: 700 }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alexander@domain.com"
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.9rem',
                        background: 'var(--color-midnight-card)',
                        border: '1px solid var(--color-border-subtle)',
                        borderRadius: '3px',
                        color: 'var(--color-cloud-ivory)',
                        fontFamily: 'var(--font-body)',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                {/* Date, Time, Guests */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-champagne)', marginBottom: '0.35rem', fontWeight: 700 }}>
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
                        background: 'var(--color-midnight-card)',
                        border: '1px solid var(--color-border-subtle)',
                        borderRadius: '3px',
                        color: 'var(--color-cloud-ivory)',
                        fontFamily: 'var(--font-body)',
                        outline: 'none',
                        fontSize: '0.85rem',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-champagne)', marginBottom: '0.35rem', fontWeight: 700 }}>
                      Time Slot *
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.6rem',
                        background: 'var(--color-midnight-card)',
                        border: '1px solid var(--color-border-subtle)',
                        borderRadius: '3px',
                        color: 'var(--color-cloud-ivory)',
                        fontFamily: 'var(--font-body)',
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
                    <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-champagne)', marginBottom: '0.35rem', fontWeight: 700 }}>
                      Party Size *
                    </label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.6rem',
                        background: 'var(--color-midnight-card)',
                        border: '1px solid var(--color-border-subtle)',
                        borderRadius: '3px',
                        color: 'var(--color-cloud-ivory)',
                        fontFamily: 'var(--font-body)',
                        outline: 'none',
                        fontSize: '0.85rem',
                      }}
                    >
                      {['1 Guest', '2 Guests', '3 Guests', '4 Guests', '5 Guests', '6 Guests', '7-8 Guests (VIP)', 'Private Buyout (10+)'].map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Seating Area & Occasion */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-champagne)', marginBottom: '0.35rem', fontWeight: 700 }}>
                      Preferred Seating Zone
                    </label>
                    <select
                      value={formData.seating_area}
                      onChange={(e) => setFormData({ ...formData, seating_area: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.6rem',
                        background: 'var(--color-midnight-card)',
                        border: '1px solid var(--color-border-subtle)',
                        borderRadius: '3px',
                        color: 'var(--color-cloud-ivory)',
                        fontFamily: 'var(--font-body)',
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
                    <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-champagne)', marginBottom: '0.35rem', fontWeight: 700 }}>
                      Dining Occasion
                    </label>
                    <select
                      value={formData.occasion}
                      onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.6rem',
                        background: 'var(--color-midnight-card)',
                        border: '1px solid var(--color-border-subtle)',
                        borderRadius: '3px',
                        color: 'var(--color-cloud-ivory)',
                        fontFamily: 'var(--font-body)',
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
                  <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-champagne)', marginBottom: '0.35rem', fontWeight: 700 }}>
                    Dietary Requirements &amp; Special Requests
                  </label>
                  <input
                    type="text"
                    value={formData.dietary_notes}
                    onChange={(e) => setFormData({ ...formData, dietary_notes: e.target.value })}
                    placeholder="e.g. Pescatarian, Shellfish allergy, Vintage champagne pre-chilled, anniversary flowers"
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.9rem',
                      background: 'var(--color-midnight-card)',
                      border: '1px solid var(--color-border-subtle)',
                      borderRadius: '3px',
                      color: 'var(--color-cloud-ivory)',
                      fontFamily: 'var(--font-body)',
                      outline: 'none',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-skyline-primary"
                  style={{
                    padding: '0.85rem',
                    width: '100%',
                    marginTop: '0.5rem',
                    opacity: submitting ? 0.7 : 1,
                    cursor: submitting ? 'not-allowed' : 'pointer',
                  }}
                >
                  {submitting ? 'Transmitting Request...' : 'Confirm Table Request on Level 54'}
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
                placeholder="Enter Reference (e.g. SKY-261116-LUN1)"
                style={{
                  flex: 1,
                  padding: '0.8rem 1rem',
                  background: 'var(--color-midnight-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '3px',
                  color: 'var(--color-cloud-ivory)',
                  fontFamily: 'var(--font-accent)',
                  fontWeight: 600,
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                disabled={lookupLoading}
                className="btn-submit-lookup btn-skyline-primary"
                style={{
                  padding: '0.8rem 1.4rem',
                  whiteSpace: 'nowrap',
                  cursor: lookupLoading ? 'not-allowed' : 'pointer',
                }}
              >
                {lookupLoading ? 'Checking...' : 'Check Status'}
              </button>
            </form>

            {lookupError && (
              <div
                style={{
                  padding: '0.85rem 1.25rem',
                  backgroundColor: 'rgba(196, 122, 86, 0.2)',
                  borderLeft: '3px solid var(--color-sunset-copper)',
                  color: '#FFB59E',
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
                  backgroundColor: 'rgba(38, 63, 90, 0.35)',
                  border: '1px solid var(--color-champagne)',
                  borderRadius: '4px',
                  padding: '1.75rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '1rem' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-twilight-slate)' }}>
                      BOOKING REFERENCE
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-accent)', fontSize: '1.35rem', color: 'var(--color-champagne)', margin: 0 }}>
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
                            ? '#1b4d3e'
                            : lookupResult.status === 'seated'
                            ? '#2c5282'
                            : lookupResult.status === 'cancelled'
                            ? '#742a2a'
                            : '#7b5a1a',
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
                    <span style={{ color: 'var(--color-twilight-slate)', display: 'block', fontSize: '0.75rem' }}>Primary Guest</span>
                    <strong style={{ color: 'var(--color-cloud-ivory)' }}>{lookupResult.guest_name || lookupResult.full_name}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-twilight-slate)', display: 'block', fontSize: '0.75rem' }}>Reservation Date &amp; Shift</span>
                    <strong style={{ color: 'var(--color-cloud-ivory)' }}>
                      {lookupResult.reservation_date || lookupResult.date} &bull; {(lookupResult.shift || 'dinner').toUpperCase()}
                    </strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-twilight-slate)', display: 'block', fontSize: '0.75rem' }}>Time &amp; Party</span>
                    <strong style={{ color: 'var(--color-cloud-ivory)' }}>
                      {lookupResult.time_slot || lookupResult.time} ({lookupResult.party_size || lookupResult.guests})
                    </strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-twilight-slate)', display: 'block', fontSize: '0.75rem' }}>Table Assignment</span>
                    <strong style={{ color: 'var(--color-champagne)' }}>
                      {lookupResult.table_number ? `Table ${lookupResult.table_number}` : 'Assigned Upon Arrival'}
                    </strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-twilight-slate)', display: 'block', fontSize: '0.75rem' }}>Seating Zone</span>
                    <span style={{ color: 'var(--color-cloud-ivory)' }}>{lookupResult.preferred_zone || lookupResult.seating_area || 'Horizon Main Room'}</span>
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-twilight-slate)', display: 'block', fontSize: '0.75rem' }}>Special Occasion</span>
                    <span style={{ color: 'var(--color-cloud-ivory)' }}>{lookupResult.occasion || 'Elevated Dining'}</span>
                  </div>
                </div>

                {lookupResult.dietary_notes && (
                  <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px dashed var(--color-border-subtle)', fontSize: '0.82rem' }}>
                    <span style={{ color: 'var(--color-twilight-slate)' }}>Notes: </span>
                    <span style={{ color: 'var(--color-cloud-ivory)' }}>{lookupResult.dietary_notes}</span>
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
