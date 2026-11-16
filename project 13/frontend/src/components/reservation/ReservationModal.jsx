import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { submitReservation, lookupReservation } from '../../services/api';

export default function ReservationModal() {
  const { isReservationModalOpen, isReservationOpen, closeReservationModal, closeReservation } = useCMS();
  const isOpen = isReservationModalOpen || isReservationOpen;
  const handleCloseTrigger = closeReservation || closeReservationModal;

  const [activeTab, setActiveTab] = useState('book'); // 'book' or 'lookup'

  // Booking Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '2026-11-20',
    time: '20:00',
    shift: 'dinner',
    guests: 4,
    experience: 'Street Pocha Table',
    dietary: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [bookingError, setBookingError] = useState('');

  // Lookup Form State
  const [lookupCode, setLookupCode] = useState('');
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupResult, setLookupResult] = useState(null);
  const [lookupError, setLookupError] = useState('');

  if (!isOpen) return null;

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setBookingError('');

    try {
      const res = await submitReservation({
        full_name: formData.name,
        phone: formData.phone,
        email: formData.email,
        preferred_date: formData.date,
        preferred_time: formData.time,
        shift: formData.shift,
        guests: parseInt(formData.guests, 10) || 2,
        selected_experience: formData.experience,
        dietary_notes: formData.dietary,
        special_requests: formData.notes,
      });

      setIsSubmitting(false);
      if (res.ok) {
        setBookingSuccess(res.data?.reservation || res.data);
      } else {
        setBookingError(res.error || 'Failed to submit reservation. Please try again.');
      }
    } catch (err) {
      setIsSubmitting(false);
      setBookingError(err.message || 'Submission error');
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
      if (res && res.reservation) {
        setLookupResult(res.reservation);
      } else if (res) {
        setLookupResult(res);
      } else {
        setLookupError('No reservation found matching this reference code.');
      }
    } catch (err) {
      setLookupLoading(false);
      setLookupError(err.message || 'No reservation found matching this reference code.');
    }
  };

  const closeModal = () => {
    setBookingSuccess(null);
    setBookingError('');
    setLookupResult(null);
    setLookupError('');
    if (handleCloseTrigger) handleCloseTrigger();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: 'rgba(17, 19, 22, 0.92)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '580px',
          maxHeight: '92vh',
          overflowY: 'auto',
          backgroundColor: '#1B1D22',
          border: '1px solid rgba(255, 46, 136, 0.4)',
          borderRadius: '8px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 24px rgba(255, 46, 136, 0.25)',
          padding: '2.5rem 2rem',
          color: '#F6F4F0',
        }}
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'transparent',
            border: 'none',
            color: '#B6BAC2',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: '4px 8px',
            lineHeight: 1,
          }}
        >
          ✕
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#21D4E8', fontWeight: 700, fontFamily: 'var(--font-condensed)' }}>
            HONGDAE NIGHT MARKET • SEOUL STREET
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: '#FFFFFF', margin: '0.25rem 0' }}>
            Table Reservation Desk <span style={{ color: '#FF2E88', fontFamily: 'var(--font-korean)' }}>포차</span>
          </h2>
          <div style={{ width: '60px', height: '2px', background: '#FF2E88', margin: '0.6rem auto' }} />
        </div>

        {/* Tab Switcher */}
        <div
          style={{
            display: 'flex',
            backgroundColor: '#111316',
            borderRadius: '4px',
            padding: '4px',
            marginBottom: '1.75rem',
            border: '1px solid rgba(246, 244, 240, 0.1)',
          }}
        >
          <button
            onClick={() => setActiveTab('book')}
            style={{
              flex: 1,
              padding: '10px',
              border: 'none',
              borderRadius: '3px',
              backgroundColor: activeTab === 'book' ? '#FF2E88' : 'transparent',
              color: activeTab === 'book' ? '#FFFFFF' : '#B6BAC2',
              fontWeight: 700,
              fontSize: '0.85rem',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            Book a Table
          </button>
          <button
            onClick={() => setActiveTab('lookup')}
            style={{
              flex: 1,
              padding: '10px',
              border: 'none',
              borderRadius: '3px',
              backgroundColor: activeTab === 'lookup' ? '#21D4E8' : 'transparent',
              color: activeTab === 'lookup' ? '#000000' : '#B6BAC2',
              fontWeight: 700,
              fontSize: '0.85rem',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            Lookup Reservation
          </button>
        </div>

        {/* TAB 1: BOOK TABLE */}
        {activeTab === 'book' && (
          <div>
            {bookingSuccess ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '2rem 1.5rem',
                  backgroundColor: '#111316',
                  borderRadius: '6px',
                  border: '1px solid rgba(33, 212, 232, 0.5)',
                }}
              >
                <div style={{ color: '#21D4E8', fontSize: '2.5rem', marginBottom: '0.5rem' }}>✓</div>
                <h3 style={{ color: '#FFFFFF', fontFamily: 'var(--font-display)', fontSize: '1.6rem', marginBottom: '0.5rem' }}>
                  Reservation Request Submitted
                </h3>
                <p style={{ color: '#B6BAC2', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  Your reference code has been generated. Please present this code to the pocha host upon arrival.
                </p>

                <div
                  style={{
                    backgroundColor: '#1B1D22',
                    padding: '1.25rem',
                    borderRadius: '4px',
                    border: '1px solid rgba(255, 46, 136, 0.4)',
                    marginBottom: '1.5rem',
                  }}
                >
                  <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#21D4E8', letterSpacing: '0.1em', display: 'block', marginBottom: '4px' }}>
                    Official Reference Code
                  </span>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FF2E88', fontFamily: 'monospace', letterSpacing: '0.1em' }}>
                    {bookingSuccess.reference_code || 'SEO-CONFIRMED'}
                  </div>
                </div>

                <div style={{ fontSize: '0.85rem', color: '#B6BAC2', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                  <strong>Guest:</strong> {bookingSuccess.full_name || formData.name}<br />
                  <strong>Date &amp; Shift:</strong> {bookingSuccess.preferred_date || formData.date} ({formData.shift === 'lunch' ? 'Daylight Lunch' : 'Twilight Pocha'})<br />
                  <strong>Party Size:</strong> {bookingSuccess.guests || formData.guests} Guests
                </div>

                <button
                  onClick={() => {
                    setBookingSuccess(null);
                    closeModal();
                  }}
                  style={{
                    backgroundColor: '#FF2E88',
                    color: '#FFFFFF',
                    padding: '12px 28px',
                    border: 'none',
                    borderRadius: '3px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                  }}
                >
                  Done &amp; Return
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {bookingError && (
                  <div style={{ padding: '0.75rem 1rem', backgroundColor: 'rgba(255, 89, 77, 0.2)', border: '1px solid #FF594D', borderRadius: '4px', color: '#FF8888', fontSize: '0.85rem' }}>
                    {bookingError}
                  </div>
                )}

                {/* Shift Selector */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#21D4E8', marginBottom: '0.5rem', fontFamily: 'var(--font-condensed)' }}>
                    Select Service Shift
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, shift: 'lunch', time: '12:30' })}
                      style={{
                        padding: '10px',
                        backgroundColor: formData.shift === 'lunch' ? 'rgba(33, 212, 232, 0.2)' : '#111316',
                        border: formData.shift === 'lunch' ? '2px solid #21D4E8' : '1px solid rgba(246, 244, 240, 0.15)',
                        borderRadius: '4px',
                        color: formData.shift === 'lunch' ? '#21D4E8' : '#B6BAC2',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '2px',
                      }}
                    >
                      <span>☀️ Daylight Lunch</span>
                      <span style={{ fontSize: '0.7rem', color: '#777B83' }}>11:30 – 15:30</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, shift: 'dinner', time: '20:00' })}
                      style={{
                        padding: '10px',
                        backgroundColor: formData.shift === 'dinner' ? 'rgba(255, 46, 136, 0.2)' : '#111316',
                        border: formData.shift === 'dinner' ? '2px solid #FF2E88' : '1px solid rgba(246, 244, 240, 0.15)',
                        borderRadius: '4px',
                        color: formData.shift === 'dinner' ? '#FFA1C9' : '#B6BAC2',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '2px',
                      }}
                    >
                      <span>🌙 Twilight Pocha</span>
                      <span style={{ fontSize: '0.7rem', color: '#777B83' }}>17:00 – 04:00</span>
                    </button>
                  </div>
                </div>

                {/* Name & Phone */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#21D4E8', marginBottom: '0.35rem', fontFamily: 'var(--font-condensed)' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Min-jun Kim"
                      style={{ width: '100%', padding: '0.75rem', backgroundColor: '#111316', border: '1px solid rgba(246, 244, 240, 0.15)', borderRadius: '4px', color: '#F6F4F0', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#21D4E8', marginBottom: '0.35rem', fontFamily: 'var(--font-condensed)' }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+82 10 1234 5678"
                      style={{ width: '100%', padding: '0.75rem', backgroundColor: '#111316', border: '1px solid rgba(246, 244, 240, 0.15)', borderRadius: '4px', color: '#F6F4F0', outline: 'none' }}
                    />
                  </div>
                </div>

                {/* Date, Time & Guests */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#21D4E8', marginBottom: '0.35rem', fontFamily: 'var(--font-condensed)' }}>
                      Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', backgroundColor: '#111316', border: '1px solid rgba(246, 244, 240, 0.15)', borderRadius: '4px', color: '#F6F4F0', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#21D4E8', marginBottom: '0.35rem', fontFamily: 'var(--font-condensed)' }}>
                      Time *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      placeholder="20:00"
                      style={{ width: '100%', padding: '0.75rem', backgroundColor: '#111316', border: '1px solid rgba(246, 244, 240, 0.15)', borderRadius: '4px', color: '#F6F4F0', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#21D4E8', marginBottom: '0.35rem', fontFamily: 'var(--font-condensed)' }}>
                      Guests *
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      required
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', backgroundColor: '#111316', border: '1px solid rgba(246, 244, 240, 0.15)', borderRadius: '4px', color: '#F6F4F0', outline: 'none' }}
                    />
                  </div>
                </div>

                {/* Seating Zone / Experience */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#21D4E8', marginBottom: '0.35rem', fontFamily: 'var(--font-condensed)' }}>
                    Preferred Seating Zone
                  </label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', backgroundColor: '#111316', border: '1px solid rgba(246, 244, 240, 0.15)', borderRadius: '4px', color: '#F6F4F0', outline: 'none' }}
                  >
                    <option value="Street Pocha Table">Street Pocha Table (Round Stainless Steel)</option>
                    <option value="Hongdae Neon Pocha Tent">Hongdae Neon Pocha Tent (Atmospheric Tarp)</option>
                    <option value="Wok Bar Counter">Wok Bar Counter (Front-row High Heat)</option>
                    <option value="Hongdae Private Room">Hongdae Private Pocha Room (Groups 6-20)</option>
                  </select>
                </div>

                {/* Dietary Notes */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#21D4E8', marginBottom: '0.35rem', fontFamily: 'var(--font-condensed)' }}>
                    Dietary Notes or Spice Preference
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mild spice, vegetarian mandu, halal-friendly..."
                    value={formData.dietary}
                    onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', backgroundColor: '#111316', border: '1px solid rgba(246, 244, 240, 0.15)', borderRadius: '4px', color: '#F6F4F0', outline: 'none' }}
                  />
                </div>

                {/* Special Requests */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#21D4E8', marginBottom: '0.35rem', fontFamily: 'var(--font-condensed)' }}>
                    Special Requests or Occasion
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Birthday celebration, soju tasting bucket..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', backgroundColor: '#111316', border: '1px solid rgba(246, 244, 240, 0.15)', borderRadius: '4px', color: '#F6F4F0', outline: 'none' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    padding: '0.95rem',
                    backgroundColor: isSubmitting ? '#E01E74' : '#FF2E88',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    boxShadow: '0 0 16px rgba(255, 46, 136, 0.4)',
                    marginTop: '0.5rem',
                  }}
                >
                  {isSubmitting ? 'Submitting to Host Desk...' : 'Submit Table Reservation Request'}
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
                placeholder="Enter Reference Code (e.g. SEO-261116-LUN1)"
                style={{
                  flex: 1,
                  padding: '0.85rem 1rem',
                  backgroundColor: '#111316',
                  border: '1px solid rgba(246, 244, 240, 0.2)',
                  borderRadius: '4px',
                  color: '#FFFFFF',
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
                  backgroundColor: '#21D4E8',
                  color: '#000000',
                  border: 'none',
                  borderRadius: '4px',
                  fontWeight: 800,
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
              <div style={{ padding: '1rem', backgroundColor: 'rgba(255, 89, 77, 0.15)', border: '1px solid #FF594D', borderRadius: '4px', color: '#FF8888', fontSize: '0.88rem', textAlign: 'center' }}>
                {lookupError}
              </div>
            )}

            {lookupResult && (
              <div
                style={{
                  backgroundColor: '#111316',
                  borderRadius: '6px',
                  border: '1px solid rgba(33, 212, 232, 0.4)',
                  padding: '1.5rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid rgba(246, 244, 240, 0.1)', paddingBottom: '0.75rem' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#21D4E8', letterSpacing: '0.08em' }}>Reference Code</span>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FF2E88', fontFamily: 'monospace' }}>
                      {lookupResult.reference_code}
                    </div>
                  </div>
                  <div>
                    <span
                      style={{
                        padding: '4px 10px',
                        borderRadius: '3px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        backgroundColor: lookupResult.status === 'confirmed' ? 'rgba(33, 212, 232, 0.2)' : 'rgba(255, 179, 71, 0.2)',
                        color: lookupResult.status === 'confirmed' ? '#21D4E8' : '#FFB347',
                        border: lookupResult.status === 'confirmed' ? '1px solid #21D4E8' : '1px solid #FFB347',
                      }}
                    >
                      {lookupResult.status}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', fontSize: '0.88rem' }}>
                  <div>
                    <span style={{ color: '#777B83', fontSize: '0.75rem', display: 'block' }}>Guest Name:</span>
                    <strong>{lookupResult.full_name || lookupResult.guest_name}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#777B83', fontSize: '0.75rem', display: 'block' }}>Shift:</span>
                    <strong style={{ color: '#21D4E8', textTransform: 'capitalize' }}>
                      {lookupResult.shift === 'lunch' ? '☀️ Daylight Lunch' : '🌙 Twilight Pocha'}
                    </strong>
                  </div>
                  <div>
                    <span style={{ color: '#777B83', fontSize: '0.75rem', display: 'block' }}>Date &amp; Time:</span>
                    <strong>{lookupResult.preferred_date || lookupResult.reservation_date} • {lookupResult.preferred_time || lookupResult.time_slot}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#777B83', fontSize: '0.75rem', display: 'block' }}>Party Size:</span>
                    <strong>{lookupResult.guests || lookupResult.party_size} Guests</strong>
                  </div>
                  <div>
                    <span style={{ color: '#777B83', fontSize: '0.75rem', display: 'block' }}>Assigned Table:</span>
                    <strong>{lookupResult.table_number || 'Host will assign on arrival'}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#777B83', fontSize: '0.75rem', display: 'block' }}>Seating Zone:</span>
                    <strong>{lookupResult.selected_experience || lookupResult.preferred_zone || 'Street Pocha Table'}</strong>
                  </div>
                </div>

                {lookupResult.dietary_notes && (
                  <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(246, 244, 240, 0.08)', fontSize: '0.82rem', color: '#FFA1C9' }}>
                    <strong>Dietary Notes:</strong> {lookupResult.dietary_notes}
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
