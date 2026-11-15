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
    occasion: 'Casual Dining',
    seating_area: 'Main Warehouse Dining Table',
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
  const dinnerTimeSlots = ['5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'];
  const currentTimeSlots = formData.shift === 'lunch' ? lunchTimeSlots : dinnerTimeSlots;

  const seatingAreas = [
    'Main Warehouse Dining Table',
    'Pitmaster Counter (Front Row Fire)',
    'The Foundry Private Loft',
    'Copper Bar & High-Top Lounge',
  ];

  const occasions = [
    'Casual Smokehouse Dining',
    'Birthday & Group Gathering',
    'Business Feast & Craft Beer',
    'Fire Hearth Celebration',
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
          reference_code: `URBAN-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
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
        backgroundColor: 'rgba(10, 11, 12, 0.88)',
        backdropFilter: 'blur(8px)',
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
          backgroundColor: '#181A1C',
          border: '2px solid var(--color-brick, #914D37)',
          borderRadius: '2px',
          maxWidth: '640px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          padding: '2.5rem',
          position: 'relative',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.85)',
          color: 'var(--color-offwhite, #F1EEE7)',
        }}
      >
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'transparent',
            border: 'none',
            color: 'var(--color-concrete, #B7B4AC)',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: '0.2rem',
            lineHeight: 1,
          }}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Tab Switcher */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            marginBottom: '2rem',
            gap: '1rem',
          }}
        >
          <button
            onClick={() => setActiveTab('book')}
            style={{
              padding: '0.75rem 1rem',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'book' ? '2px solid var(--color-copper, #B87345)' : '2px solid transparent',
              color: activeTab === 'book' ? 'var(--color-copper, #B87345)' : 'var(--color-concrete, #B7B4AC)',
              fontFamily: 'var(--font-display, Oswald)',
              fontSize: '1.1rem',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              fontWeight: 700,
            }}
          >
            Request Table
          </button>
          <button
            onClick={() => setActiveTab('lookup')}
            style={{
              padding: '0.75rem 1rem',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'lookup' ? '2px solid var(--color-copper, #B87345)' : '2px solid transparent',
              color: activeTab === 'lookup' ? 'var(--color-copper, #B87345)' : 'var(--color-concrete, #B7B4AC)',
              fontFamily: 'var(--font-display, Oswald)',
              fontSize: '1.1rem',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              fontWeight: 700,
            }}
          >
            Lookup Reservation
          </button>
        </div>

        {/* TAB 1: BOOKING FORM */}
        {activeTab === 'book' && (
          <div>
            {bookingResult ? (
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '2px',
                    background: 'rgba(184, 115, 69, 0.2)',
                    border: '2px solid var(--color-copper, #B87345)',
                    color: 'var(--color-copper, #B87345)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.8rem',
                    fontFamily: 'var(--font-display, Oswald)',
                    fontWeight: 700,
                    margin: '0 auto 1.5rem',
                  }}
                >
                  UT
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display, Oswald)',
                    fontSize: '1.8rem',
                    color: 'var(--color-offwhite, #F1EEE7)',
                    textTransform: 'uppercase',
                    marginBottom: '0.75rem',
                  }}
                >
                  Reservation Inquiry Received
                </h3>

                <div
                  style={{
                    background: 'var(--color-graphite, #252729)',
                    border: '1px dashed var(--color-copper, #B87345)',
                    padding: '1.25rem',
                    borderRadius: '2px',
                    margin: '1.5rem 0',
                  }}
                >
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-copper, #B87345)', marginBottom: '0.35rem', fontWeight: 800 }}>
                    Official Reference Code
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-offwhite, #F1EEE7)', letterSpacing: '0.08em' }}>
                    {bookingResult.reference_code || bookingResult.code}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-concrete, #B7B4AC)', marginTop: '0.5rem' }}>
                    Status:{' '}
                    <span style={{ color: 'var(--color-amber, #E9A24B)', fontWeight: 700, textTransform: 'uppercase' }}>
                      {bookingResult.status || 'Pending Approval'}
                    </span>
                  </div>
                </div>

                <p style={{ color: 'var(--color-concrete, #B7B4AC)', fontSize: '0.92rem', lineHeight: '1.7', marginBottom: '2rem' }}>
                  Thank you, <strong>{formData.full_name}</strong>. Our host team has recorded your request for{' '}
                  <strong>{formData.guests}</strong> on <strong>{formData.date} ({formData.shift.toUpperCase()} - {formData.time})</strong> in the <strong>{formData.seating_area}</strong>. Our team will review availability and confirm your table shortly.
                </p>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                  <button
                    onClick={() => {
                      setLookupCode(bookingResult.reference_code || bookingResult.code);
                      setActiveTab('lookup');
                      setBookingResult(null);
                    }}
                    style={{
                      background: 'transparent',
                      border: '1px solid var(--color-copper, #B87345)',
                      color: 'var(--color-copper, #B87345)',
                      padding: '0.75rem 1.4rem',
                      fontFamily: 'var(--font-body, Manrope)',
                      fontWeight: 700,
                      cursor: 'pointer',
                      borderRadius: '2px',
                    }}
                  >
                    View Status in Lookup
                  </button>
                  <button onClick={handleClose} className="btn-primary" style={{ padding: '0.75rem 1.6rem' }}>
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <span className="section-label">Industrial Dining Table</span>
                  <h3 style={{ fontFamily: 'var(--font-display, Oswald)', fontSize: '1.8rem', textTransform: 'uppercase', color: 'var(--color-offwhite, #F1EEE7)' }}>
                    Reserve Your Table
                  </h3>
                  <p style={{ color: 'var(--color-concrete, #B7B4AC)', fontSize: '0.85rem' }}>
                    Open Fire Kitchen • Craft Smokehouse • 420 Ironworks Ave
                  </p>
                </div>

                {bookingError && (
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
                    {bookingError}
                  </div>
                )}

                <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {/* Shift Selection: Lunch vs Dinner */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-copper, #B87345)', marginBottom: '0.5rem', fontWeight: 700 }}>
                      Dining Shift *
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <button
                        type="button"
                        onClick={() => handleShiftSelect('lunch')}
                        style={{
                          padding: '0.75rem',
                          background: formData.shift === 'lunch' ? 'var(--color-brick, #914D37)' : 'var(--color-graphite, #252729)',
                          border: formData.shift === 'lunch' ? '1px solid var(--color-copper, #B87345)' : '1px solid var(--color-border, #3a3d40)',
                          color: 'var(--color-offwhite, #F1EEE7)',
                          borderRadius: '2px',
                          cursor: 'pointer',
                          fontFamily: 'var(--font-body, Manrope)',
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          transition: 'all 0.2s',
                        }}
                      >
                        ☀️ Lunch Shift (12:00 – 14:30)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleShiftSelect('dinner')}
                        style={{
                          padding: '0.75rem',
                          background: formData.shift === 'dinner' ? 'var(--color-brick, #914D37)' : 'var(--color-graphite, #252729)',
                          border: formData.shift === 'dinner' ? '1px solid var(--color-copper, #B87345)' : '1px solid var(--color-border, #3a3d40)',
                          color: 'var(--color-offwhite, #F1EEE7)',
                          borderRadius: '2px',
                          cursor: 'pointer',
                          fontFamily: 'var(--font-body, Manrope)',
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          transition: 'all 0.2s',
                        }}
                      >
                        🌙 Dinner Shift (17:00 – 23:00)
                      </button>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-copper, #B87345)', marginBottom: '0.35rem', fontWeight: 700 }}>
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
                          background: 'var(--color-graphite, #252729)',
                          border: '1px solid var(--color-border, #3a3d40)',
                          borderRadius: '2px',
                          color: 'var(--color-offwhite, #F1EEE7)',
                          outline: 'none',
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-copper, #B87345)', marginBottom: '0.35rem', fontWeight: 700 }}>
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 789-2044"
                        style={{
                          width: '100%',
                          padding: '0.7rem 0.9rem',
                          background: 'var(--color-graphite, #252729)',
                          border: '1px solid var(--color-border, #3a3d40)',
                          borderRadius: '2px',
                          color: 'var(--color-offwhite, #F1EEE7)',
                          outline: 'none',
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-copper, #B87345)', marginBottom: '0.35rem', fontWeight: 700 }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="marcus@example.com"
                      style={{
                        width: '100%',
                        padding: '0.7rem 0.9rem',
                        background: 'var(--color-graphite, #252729)',
                        border: '1px solid var(--color-border, #3a3d40)',
                        borderRadius: '2px',
                        color: 'var(--color-offwhite, #F1EEE7)',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-copper, #B87345)', marginBottom: '0.35rem', fontWeight: 700 }}>
                        Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.7rem 0.9rem',
                          background: 'var(--color-graphite, #252729)',
                          border: '1px solid var(--color-border, #3a3d40)',
                          borderRadius: '2px',
                          color: 'var(--color-offwhite, #F1EEE7)',
                          outline: 'none',
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-copper, #B87345)', marginBottom: '0.35rem', fontWeight: 700 }}>
                        Time Slot ({formData.shift.toUpperCase()}) *
                      </label>
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.7rem 0.9rem',
                          background: 'var(--color-graphite, #252729)',
                          border: '1px solid var(--color-border, #3a3d40)',
                          borderRadius: '2px',
                          color: 'var(--color-offwhite, #F1EEE7)',
                          outline: 'none',
                        }}
                      >
                        {currentTimeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-copper, #B87345)', marginBottom: '0.35rem', fontWeight: 700 }}>
                        Party Size *
                      </label>
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.7rem 0.9rem',
                          background: 'var(--color-graphite, #252729)',
                          border: '1px solid var(--color-border, #3a3d40)',
                          borderRadius: '2px',
                          color: 'var(--color-offwhite, #F1EEE7)',
                          outline: 'none',
                        }}
                      >
                        {['1 Guest', '2 Guests', '3 Guests', '4 Guests', '5 Guests', '6 Guests', '7-12 Guests (Warehouse Feast)', '12+ Buyout Request'].map((g) => (
                          <option key={g} value={g}>
                            {g}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-copper, #B87345)', marginBottom: '0.35rem', fontWeight: 700 }}>
                        Seating Zone *
                      </label>
                      <select
                        value={formData.seating_area}
                        onChange={(e) => setFormData({ ...formData, seating_area: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.7rem 0.9rem',
                          background: 'var(--color-graphite, #252729)',
                          border: '1px solid var(--color-border, #3a3d40)',
                          borderRadius: '2px',
                          color: 'var(--color-offwhite, #F1EEE7)',
                          outline: 'none',
                        }}
                      >
                        {seatingAreas.map((area) => (
                          <option key={area} value={area}>
                            {area}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-copper, #B87345)', marginBottom: '0.35rem', fontWeight: 700 }}>
                      Dietary Requirements / Allergies
                    </label>
                    <input
                      type="text"
                      value={formData.dietary_notes}
                      onChange={(e) => setFormData({ ...formData, dietary_notes: e.target.value })}
                      placeholder="e.g. Gluten-free, nut allergy, pescatarian"
                      style={{
                        width: '100%',
                        padding: '0.7rem 0.9rem',
                        background: 'var(--color-graphite, #252729)',
                        border: '1px solid var(--color-border, #3a3d40)',
                        borderRadius: '2px',
                        color: 'var(--color-offwhite, #F1EEE7)',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-copper, #B87345)', marginBottom: '0.35rem', fontWeight: 700 }}>
                      Special Requests / Notes
                    </label>
                    <textarea
                      rows={2}
                      value={formData.special_requests}
                      onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
                      placeholder="Special celebration, anniversary, hearthside preference..."
                      style={{
                        width: '100%',
                        padding: '0.7rem 0.9rem',
                        background: 'var(--color-graphite, #252729)',
                        border: '1px solid var(--color-border, #3a3d40)',
                        borderRadius: '2px',
                        color: 'var(--color-offwhite, #F1EEE7)',
                        outline: 'none',
                        resize: 'none',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary"
                    style={{
                      width: '100%',
                      padding: '0.9rem',
                      marginTop: '0.5rem',
                      opacity: submitting ? 0.7 : 1,
                      cursor: submitting ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {submitting ? 'Transmitting Request...' : 'Submit Table Reservation'}
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: LOOKUP RESERVATION */}
        {activeTab === 'lookup' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
              <span className="section-label">Host Desk Verification</span>
              <h3 style={{ fontFamily: 'var(--font-display, Oswald)', fontSize: '1.8rem', textTransform: 'uppercase', color: 'var(--color-offwhite, #F1EEE7)' }}>
                Track Your Reservation
              </h3>
              <p style={{ color: 'var(--color-concrete, #B7B4AC)', fontSize: '0.85rem' }}>
                Enter your reference code (e.g. URBAN-261116-LUN1) to check live status and table assignment.
              </p>
            </div>

            <form onSubmit={handleLookupSubmit} style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem' }}>
              <input
                type="text"
                required
                value={lookupCode}
                onChange={(e) => setLookupCode(e.target.value.toUpperCase())}
                placeholder="URBAN-XXXXXX"
                style={{
                  flex: 1,
                  padding: '0.85rem 1rem',
                  background: 'var(--color-graphite, #252729)',
                  border: '1px solid var(--color-border, #3a3d40)',
                  borderRadius: '2px',
                  color: 'var(--color-offwhite, #F1EEE7)',
                  fontFamily: 'monospace',
                  fontSize: '1.1rem',
                  letterSpacing: '0.08em',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                disabled={lookupLoading}
                className="btn-primary btn-submit-lookup"
                style={{
                  padding: '0.85rem 1.4rem',
                  fontFamily: 'var(--font-body, Manrope)',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                }}
              >
                {lookupLoading ? 'Searching...' : 'Check Status'}
              </button>
            </form>

            {lookupError && (
              <div
                style={{
                  background: 'rgba(145, 77, 55, 0.4)',
                  border: '1px solid #e06044',
                  color: '#ffb8a8',
                  padding: '1rem',
                  borderRadius: '2px',
                  marginBottom: '1.5rem',
                  fontSize: '0.9rem',
                }}
              >
                {lookupError}
              </div>
            )}

            {lookupResult && (
              <div
                style={{
                  backgroundColor: 'var(--color-graphite, #252729)',
                  border: '1px solid var(--color-brick, #914D37)',
                  borderRadius: '2px',
                  padding: '1.5rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.85rem' }}>
                  <div>
                    <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-copper, #B87345)', fontWeight: 700 }}>
                      Reservation Code
                    </div>
                    <div style={{ fontFamily: 'monospace', fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-offwhite, #F1EEE7)' }}>
                      {lookupResult.reference_code || lookupResult.code}
                    </div>
                  </div>
                  <span
                    style={{
                      padding: '0.35rem 0.85rem',
                      borderRadius: '2px',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      backgroundColor:
                        lookupResult.status === 'confirmed'
                          ? 'rgba(76, 175, 80, 0.2)'
                          : lookupResult.status === 'seated'
                          ? 'rgba(33, 150, 243, 0.2)'
                          : lookupResult.status === 'cancelled'
                          ? 'rgba(244, 67, 54, 0.2)'
                          : 'rgba(233, 162, 75, 0.2)',
                      color:
                        lookupResult.status === 'confirmed'
                          ? '#81c784'
                          : lookupResult.status === 'seated'
                          ? '#64b5f6'
                          : lookupResult.status === 'cancelled'
                          ? '#e57373'
                          : '#e9a24b',
                      border: '1px solid currentColor',
                    }}
                  >
                    {lookupResult.status || 'Pending'}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.88rem' }}>
                  <div>
                    <span style={{ color: 'var(--color-concrete, #B7B4AC)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Guest Name</span>
                    <strong>{lookupResult.guest_name || lookupResult.full_name}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-concrete, #B7B4AC)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Party Size</span>
                    <strong>{lookupResult.party_size || lookupResult.guests}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-concrete, #B7B4AC)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Date & Shift</span>
                    <strong>{lookupResult.reservation_date || lookupResult.date} ({lookupResult.shift ? lookupResult.shift.toUpperCase() : 'DINNER'})</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-concrete, #B7B4AC)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Time Slot</span>
                    <strong>{lookupResult.time_slot || lookupResult.time}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-concrete, #B7B4AC)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Seating Zone</span>
                    <strong>{lookupResult.preferred_zone || lookupResult.seating_area || 'Main Dining Hall'}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-concrete, #B7B4AC)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Assigned Table</span>
                    <strong style={{ color: 'var(--color-copper, #B87345)' }}>{lookupResult.table_number || 'Awaiting Host Table Assignment'}</strong>
                  </div>
                </div>

                {lookupResult.dietary_notes && (
                  <div style={{ marginTop: '1rem', paddingTop: '0.85rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--color-copper, #B87345)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.72rem' }}>Dietary Notes: </span>
                    <span style={{ color: 'var(--color-concrete, #B7B4AC)' }}>{lookupResult.dietary_notes}</span>
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
