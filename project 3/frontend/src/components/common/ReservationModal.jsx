import React, { useState } from 'react';
import { X, Calendar, CheckCircle, Search, Clock, Users, MapPin, AlertCircle } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { submitReservation, lookupReservation } from '../../services/api';

export default function ReservationModal() {
  const { isReservationModalOpen, setIsReservationModalOpen } = useCMS();

  const [activeTab, setActiveTab] = useState('book'); // 'book' or 'lookup'

  // Booking Form State
  const [formData, setFormData] = useState({
    guest_name: '',
    email: '',
    phone: '',
    party_size: 2,
    reservation_date: new Date().toISOString().split('T')[0],
    reservation_time: '20:00',
    shift: 'dinner', // 'lunch' or 'dinner'
    seating_preference: 'The Belvedere Sea Terrace',
    occasion: 'Romantic Dinner',
    dietary_notes: '',
    special_requests: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  // Lookup State
  const [lookupQuery, setLookupQuery] = useState({ code: '', phone: '' });
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupResult, setLookupResult] = useState(null);
  const [lookupError, setLookupError] = useState('');

  if (!isReservationModalOpen) return null;

  const handleShiftSelect = (shift) => {
    setFormData((prev) => ({
      ...prev,
      shift,
      reservation_time: shift === 'lunch' ? '13:00' : '20:00',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await submitReservation(formData);
    setSubmitting(false);
    setResult(res);
  };

  const handleLookup = async (e) => {
    e.preventDefault();
    if (!lookupQuery.code && !lookupQuery.phone) {
      setLookupError('Please enter a reference code or phone number.');
      return;
    }
    setLookupLoading(true);
    setLookupError('');
    setLookupResult(null);

    const res = await lookupReservation(lookupQuery);
    setLookupLoading(false);
    if (res.success && res.reservations?.length > 0) {
      setLookupResult(res.reservations[0]);
    } else {
      setLookupError(res.message || 'No reservation found matching the details provided.');
    }
  };

  const resetAndClose = () => {
    setResult(null);
    setLookupResult(null);
    setLookupError('');
    setIsReservationModalOpen(false);
  };

  return (
    <div className="modal-backdrop" onClick={resetAndClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px', width: '92%' }}>
        {/* Header */}
        <div style={{ padding: '22px 28px', borderBottom: '1px solid rgba(197, 160, 89, 0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FAF8F4' }}>
          <div>
            <h3 style={{ fontSize: '1.7rem', color: '#081721', margin: 0, fontFamily: 'var(--font-serif, serif)' }}>
              Table Reservation & Host Concierge
            </h3>
            <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '11px', color: '#C5A059', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>
              Aura Marina • Positano Cliffside Sanctuary
            </span>
          </div>
          <button
            onClick={resetAndClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#7A7E80',
              cursor: 'pointer',
              padding: '6px',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', borderBottom: '1px solid #EAE5DB', background: '#F8F6F0' }}>
          <button
            type="button"
            onClick={() => setActiveTab('book')}
            style={{
              flex: 1,
              padding: '12px',
              border: 'none',
              background: activeTab === 'book' ? '#FFFFFF' : 'transparent',
              borderBottom: activeTab === 'book' ? '2px solid #C5A059' : 'none',
              color: activeTab === 'book' ? '#081721' : '#7A7E80',
              fontWeight: 600,
              fontSize: '12.5px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontFamily: 'var(--font-mono, monospace)',
            }}
          >
            Book A Shift
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('lookup')}
            style={{
              flex: 1,
              padding: '12px',
              border: 'none',
              background: activeTab === 'lookup' ? '#FFFFFF' : 'transparent',
              borderBottom: activeTab === 'lookup' ? '2px solid #C5A059' : 'none',
              color: activeTab === 'lookup' ? '#081721' : '#7A7E80',
              fontWeight: 600,
              fontSize: '12.5px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontFamily: 'var(--font-mono, monospace)',
            }}
          >
            Lookup Reservation
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '28px' }}>
          {activeTab === 'book' ? (
            result ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #0A1C27 0%, #15384B 100%)', border: '1px solid #C5A059', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 8px 25px rgba(197, 160, 89, 0.3)' }}>
                  <CheckCircle size={32} color="#DFBA73" />
                </div>
                <h4 style={{ fontSize: '1.8rem', color: '#081721', marginBottom: '8px', fontFamily: 'var(--font-serif, serif)' }}>
                  Reservation Request Received
                </h4>
                <p style={{ color: '#4A5255', fontSize: '0.95rem', marginBottom: '20px' }}>
                  {result.message || "Thank you. Your inquiry has been forwarded to our Head Concierge for shift confirmation."}
                </p>
                <div style={{ background: '#FAF8F4', border: '1px dashed #C5A059', padding: '16px', borderRadius: '10px', maxWidth: '340px', margin: '0 auto 24px' }}>
                  <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', color: '#7A7E80', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '4px' }}>
                    Confirmation Reference Code
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '1.4rem', fontWeight: 700, color: '#C5A059' }}>
                    {result.reference_code}
                  </span>
                </div>
                <button onClick={resetAndClose} className="btn-gold" style={{ padding: '12px 30px', cursor: 'pointer' }}>
                  Return to Experience
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Shift Selector */}
                <div style={{ marginBottom: '18px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', fontWeight: 600, color: '#081721', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
                    Select Service Shift *
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div
                      onClick={() => handleShiftSelect('lunch')}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '8px',
                        border: formData.shift === 'lunch' ? '2px solid #C5A059' : '1px solid #D5E5EB',
                        background: formData.shift === 'lunch' ? 'rgba(197, 160, 89, 0.12)' : '#FFFFFF',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      <div style={{ fontWeight: 700, fontSize: '13px', color: '#081721' }}>☀️ Lunch Service</div>
                      <div style={{ fontSize: '11px', color: '#7A7E80', fontFamily: 'var(--font-mono, monospace)' }}>12:00 — 15:30</div>
                    </div>
                    <div
                      onClick={() => handleShiftSelect('dinner')}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '8px',
                        border: formData.shift === 'dinner' ? '2px solid #2A6F85' : '1px solid #D5E5EB',
                        background: formData.shift === 'dinner' ? 'rgba(42, 111, 133, 0.12)' : '#FFFFFF',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      <div style={{ fontWeight: 700, fontSize: '13px', color: '#081721' }}>🌙 Sunset & Dinner</div>
                      <div style={{ fontSize: '11px', color: '#7A7E80', fontFamily: 'var(--font-mono, monospace)' }}>19:00 — 23:30</div>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', fontWeight: 600, color: '#081721', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                      Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.reservation_date}
                      onChange={(e) => setFormData({ ...formData, reservation_date: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', border: '1px solid #E2DAD0', borderRadius: '6px', fontSize: '13.5px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', fontWeight: 600, color: '#081721', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                      Seating Time *
                    </label>
                    <select
                      value={formData.reservation_time}
                      onChange={(e) => setFormData({ ...formData, reservation_time: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', border: '1px solid #E2DAD0', borderRadius: '6px', fontSize: '13.5px' }}
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
                          <option value="19:00">07:00 PM (Sunset)</option>
                          <option value="19:30">07:30 PM</option>
                          <option value="20:00">08:00 PM</option>
                          <option value="20:30">08:30 PM</option>
                          <option value="21:00">09:00 PM</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', fontWeight: 600, color: '#081721', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                      Guest Count *
                    </label>
                    <select
                      value={formData.party_size}
                      onChange={(e) => setFormData({ ...formData, party_size: parseInt(e.target.value) })}
                      style={{ width: '100%', padding: '9px 12px', border: '1px solid #E2DAD0', borderRadius: '6px', fontSize: '13.5px' }}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((n) => (
                        <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', fontWeight: 600, color: '#081721', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                      Dining Zone Preference
                    </label>
                    <select
                      value={formData.seating_preference}
                      onChange={(e) => setFormData({ ...formData, seating_preference: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', border: '1px solid #E2DAD0', borderRadius: '6px', fontSize: '13.5px' }}
                    >
                      <option value="The Belvedere Sea Terrace">The Belvedere Sea Terrace</option>
                      <option value="The Travertine Sala">The Travertine Sala</option>
                      <option value="The Crudo & Wine Vault">The Crudo & Wine Vault</option>
                      <option value="The Colonnade Vestibule">The Colonnade Vestibule</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', fontWeight: 600, color: '#081721', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sofia Loren"
                      value={formData.guest_name}
                      onChange={(e) => setFormData({ ...formData, guest_name: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', border: '1px solid #E2DAD0', borderRadius: '6px', fontSize: '13px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', fontWeight: 600, color: '#081721', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="sofia@villa.it"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', border: '1px solid #E2DAD0', borderRadius: '6px', fontSize: '13px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', fontWeight: 600, color: '#081721', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                      Phone / Mobile *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+39 089 ..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', border: '1px solid #E2DAD0', borderRadius: '6px', fontSize: '13px' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', fontWeight: 600, color: '#081721', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                    Dietary Requirements & Allergies
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Shellfish sensitivity, celiac, vegetarian..."
                    value={formData.dietary_notes}
                    onChange={(e) => setFormData({ ...formData, dietary_notes: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid #E2DAD0', borderRadius: '6px', fontSize: '13px' }}
                  />
                </div>

                <div style={{ marginBottom: '22px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', fontWeight: 600, color: '#081721', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                    Special Requests / Yacht Boat Access
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Arriving by yacht tender, anniversary champagne..."
                    value={formData.special_requests}
                    onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid #E2DAD0', borderRadius: '6px', fontSize: '13px', resize: 'vertical' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-gold"
                  style={{ width: '100%', padding: '13px', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}
                >
                  {submitting ? 'Transmitting Request...' : 'Submit Table Reservation Request'}
                </button>
              </form>
            )
          ) : (
            <div>
              <form onSubmit={handleLookup} style={{ marginBottom: '24px' }}>
                <p style={{ fontSize: '13px', color: '#7A7E80', marginBottom: '16px' }}>
                  Look up your reservation status by entering your reference code (e.g. <span style={{ fontFamily: 'var(--font-mono, monospace)', color: '#2A6F85' }}>AUM-2611...</span>) or contact phone.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', fontWeight: 600, color: '#081721', textTransform: 'uppercase', marginBottom: '6px' }}>
                      Reference Code
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. AUM-XXXXXX"
                      value={lookupQuery.code}
                      onChange={(e) => setLookupQuery({ ...lookupQuery, code: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', border: '1px solid #E2DAD0', borderRadius: '6px', fontSize: '13px', textTransform: 'uppercase' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', fontWeight: 600, color: '#081721', textTransform: 'uppercase', marginBottom: '6px' }}>
                      Or Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +39 089..."
                      value={lookupQuery.phone}
                      onChange={(e) => setLookupQuery({ ...lookupQuery, phone: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', border: '1px solid #E2DAD0', borderRadius: '6px', fontSize: '13px' }}
                    />
                  </div>
                </div>

                {lookupError && (
                  <div style={{ padding: '10px 14px', background: '#FDE8E8', color: '#9B1C1C', borderRadius: '6px', fontSize: '12.5px', marginBottom: '14px' }}>
                    {lookupError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={lookupLoading}
                  className="btn-gold"
                  style={{ width: '100%', padding: '11px', cursor: 'pointer', fontSize: '12.5px', textTransform: 'uppercase', letterSpacing: '0.08em' }}
                >
                  {lookupLoading ? 'Searching Manifest...' : 'Search Reservation Status'}
                </button>
              </form>

              {lookupResult && (
                <div style={{ background: '#FAF8F4', border: '1px solid #E2DAD0', borderRadius: '10px', padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '14px', fontWeight: 700, color: '#2A6F85' }}>
                      {lookupResult.reference_code}
                    </span>
                    <span style={{
                      padding: '3px 10px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono, monospace)',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      background: lookupResult.status === 'confirmed' ? '#DEF7EC' : lookupResult.status === 'seated' ? '#E1EFFE' : '#FEF3C7',
                      color: lookupResult.status === 'confirmed' ? '#03543F' : lookupResult.status === 'seated' ? '#1E429F' : '#92400E',
                    }}>
                      {lookupResult.status === 'confirmed' ? '✓ Confirmed' : lookupResult.status === 'seated' ? 'Seated' : 'Pending Review'}
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '13px', color: '#4A5255' }}>
                    <div><strong>Guest:</strong> {lookupResult.guest_name || lookupResult.full_name}</div>
                    <div><strong>Date:</strong> {lookupResult.reservation_date || lookupResult.date}</div>
                    <div><strong>Time / Shift:</strong> {lookupResult.reservation_time || lookupResult.time}</div>
                    <div><strong>Party Size:</strong> {lookupResult.party_size || lookupResult.guests} Guests</div>
                    <div><strong>Zone:</strong> {lookupResult.seating_preference || lookupResult.seatingArea}</div>
                    <div><strong>Table #:</strong> {lookupResult.table_number || 'To be assigned on arrival'}</div>
                  </div>

                  {lookupResult.dietary_notes && (
                    <div style={{ marginTop: '10px', fontSize: '12px', color: '#B65A3D' }}>
                      <strong>Dietary Notes:</strong> {lookupResult.dietary_notes}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
