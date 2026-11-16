import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Users, CheckCircle, AlertCircle, Search } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { submitReservation, lookupReservation } from '../../services/api';

export default function ReservationModal() {
  const { isReservationOpen, closeReservation, selectedExperience } = useCMS();
  const [activeTab, setActiveTab] = useState('request'); // 'request' or 'lookup'

  // Request form state
  const [shift, setShift] = useState('dinner'); // 'lunch' or 'dinner'
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: new Date().toISOString().split('T')[0],
    time: '7:30 PM',
    guests: '2',
    occasion: 'Fine Dining Steakhouse Dinner',
    experience: 'Main Hearth & Grill Room',
    dietary: '',
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [createdRef, setCreatedRef] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Lookup state
  const [lookupCode, setLookupCode] = useState('');
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupResult, setLookupResult] = useState(null);
  const [lookupError, setLookupError] = useState(null);

  useEffect(() => {
    if (selectedExperience) {
      setFormData((prev) => ({ ...prev, experience: selectedExperience }));
    }
  }, [selectedExperience]);

  useEffect(() => {
    if (shift === 'lunch') {
      setFormData((prev) => ({ ...prev, time: '12:30 PM' }));
    } else {
      setFormData((prev) => ({ ...prev, time: '7:30 PM' }));
    }
  }, [shift]);

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
        shift: shift,
        guests: parseInt(formData.guests) || 2,
        occasion: formData.occasion,
        selected_experience: formData.experience,
        dietary_notes: formData.dietary,
        special_requests: formData.notes
      };

      const res = await submitReservation(payload);
      setCreatedRef(res.reference_code || res.data?.reference_code || "PRIME-CONFIRMED");
      setSuccessMsg(res.message || "Your reservation request has been submitted to the Charred & Prime host desk.");
    } catch (err) {
      setErrorMsg(err.message || "Unable to process reservation. Please contact concierge at +1 (212) 840-7832.");
    } finally {
      setLoading(false);
    }
  };

  const handleLookup = async (e) => {
    e.preventDefault();
    if (!lookupCode.trim()) return;
    setLookupLoading(true);
    setLookupError(null);
    setLookupResult(null);

    try {
      const res = await lookupReservation(lookupCode.trim());
      if (res.success && res.data) {
        setLookupResult(res.data);
      } else {
        setLookupError(res.error || `No booking found for reference code: ${lookupCode.trim()}`);
      }
    } catch (err) {
      setLookupError("Network error while searching reservation code.");
    } finally {
      setLookupLoading(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(16, 16, 16, 0.92)',
        backdropFilter: 'blur(12px)',
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
          maxWidth: '620px',
          maxHeight: '92vh',
          overflowY: 'auto',
          background: 'var(--color-charcoal)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '4px',
          padding: '36px',
          boxShadow: '0 30px 80px rgba(0,0,0,0.95)',
          position: 'relative',
          color: 'var(--color-ivory)'
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
            cursor: 'pointer',
            padding: '4px'
          }}
        >
          <X size={22} />
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-bronze)', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>
            CHARRED & PRIME • CONCIERGE DESK
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--color-ivory)', marginTop: '4px' }}>
            Table Reservation & Dining Inquiry
          </h2>
          <div style={{ width: '40px', height: '2px', background: 'var(--color-bronze)', margin: '10px auto 0' }} />
        </div>

        {/* Dual Tab Switcher */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '24px', background: 'var(--color-obsidian)', padding: '4px', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}>
          <button
            type="button"
            onClick={() => setActiveTab('request')}
            style={{
              padding: '10px',
              border: 'none',
              background: activeTab === 'request' ? 'var(--color-graphite)' : 'transparent',
              color: activeTab === 'request' ? 'var(--color-champagne)' : 'var(--color-taupe)',
              fontFamily: 'var(--font-heading)',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              borderRadius: '2px',
              transition: 'all 0.2s'
            }}
          >
            Request Reservation
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('lookup')}
            style={{
              padding: '10px',
              border: 'none',
              background: activeTab === 'lookup' ? 'var(--color-graphite)' : 'transparent',
              color: activeTab === 'lookup' ? 'var(--color-champagne)' : 'var(--color-taupe)',
              fontFamily: 'var(--font-heading)',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              borderRadius: '2px',
              transition: 'all 0.2s'
            }}
          >
            Lookup Reservation
          </button>
        </div>

        {activeTab === 'request' ? (
          <div>
            {successMsg ? (
              <div style={{ textAlign: 'center', padding: '30px 20px', background: 'rgba(72, 187, 120, 0.08)', border: '1px solid #38a169', borderRadius: '4px' }}>
                <CheckCircle size={44} style={{ color: '#68d391', margin: '0 auto 12px' }} />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--color-ivory)', marginBottom: '8px' }}>
                  Reservation Request Logged
                </h3>
                <p style={{ color: 'var(--color-taupe)', fontSize: '13px', lineHeight: 1.6, marginBottom: '20px' }}>
                  {successMsg}
                </p>
                <div style={{ background: 'var(--color-obsidian)', border: '1px dashed var(--color-champagne)', padding: '16px', borderRadius: '4px', maxWidth: '320px', margin: '0 auto 20px' }}>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--color-taupe)', letterSpacing: '1px' }}>Your Booking Reference Code</div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 800, color: 'var(--color-champagne)', marginTop: '4px', letterSpacing: '2px' }}>
                    {createdRef}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => { setSuccessMsg(null); closeReservation(); }}
                  style={{ padding: '10px 28px', background: 'var(--color-bronze)', border: 'none', borderRadius: '2px', color: '#101010', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer' }}
                >
                  Close Desk
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                {/* Shift Selector */}
                <div>
                  <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-taupe)', marginBottom: '8px', fontWeight: 600 }}>
                    Select Dining Shift *
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <button
                      type="button"
                      onClick={() => setShift('lunch')}
                      style={{
                        padding: '12px',
                        borderRadius: '2px',
                        border: shift === 'lunch' ? '1px solid var(--color-amber)' : '1px solid var(--border-subtle)',
                        background: shift === 'lunch' ? 'rgba(216, 154, 75, 0.15)' : 'var(--color-graphite)',
                        color: shift === 'lunch' ? 'var(--color-amber)' : 'var(--color-taupe)',
                        fontWeight: 700,
                        fontSize: '12px',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        textAlign: 'center'
                      }}
                    >
                      ☀️ Daylight Lunch
                      <div style={{ fontSize: '10px', fontWeight: 'normal', marginTop: '2px' }}>11:30 AM – 2:30 PM</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShift('dinner')}
                      style={{
                        padding: '12px',
                        borderRadius: '2px',
                        border: shift === 'dinner' ? '1px solid var(--color-champagne)' : '1px solid var(--border-subtle)',
                        background: shift === 'dinner' ? 'rgba(196, 168, 120, 0.15)' : 'var(--color-graphite)',
                        color: shift === 'dinner' ? 'var(--color-champagne)' : 'var(--color-taupe)',
                        fontWeight: 700,
                        fontSize: '12px',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        textAlign: 'center'
                      }}
                    >
                      🌙 Twilight Prime Dinner
                      <div style={{ fontSize: '10px', fontWeight: 'normal', marginTop: '2px' }}>5:00 PM – 11:30 PM</div>
                    </button>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-taupe)', marginBottom: '6px', fontWeight: 600 }}>Guest Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Harrison Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', background: 'var(--color-graphite)', border: '1px solid var(--border-subtle)', borderRadius: '2px', color: 'var(--color-ivory)', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-taupe)', marginBottom: '6px', fontWeight: 600 }}>Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (212) 555-0199"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', background: 'var(--color-graphite)', border: '1px solid var(--border-subtle)', borderRadius: '2px', color: 'var(--color-ivory)', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-taupe)', marginBottom: '6px', fontWeight: 600 }}>Email Address</label>
                    <input
                      type="email"
                      placeholder="you@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', background: 'var(--color-graphite)', border: '1px solid var(--border-subtle)', borderRadius: '2px', color: 'var(--color-ivory)', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-taupe)', marginBottom: '6px', fontWeight: 600 }}>Party Size *</label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', background: 'var(--color-graphite)', border: '1px solid var(--border-subtle)', borderRadius: '2px', color: 'var(--color-ivory)', outline: 'none' }}
                    >
                      <option value="1">1 Guest (Single Diner)</option>
                      <option value="2">2 Guests (Couple Table)</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests (Executive Table)</option>
                      <option value="6">6 Guests (Board / Group)</option>
                      <option value="8">8 Guests (Chef Hearth Table)</option>
                      <option value="12">12 Guests (Private Wine Vault)</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-taupe)', marginBottom: '6px', fontWeight: 600 }}>Preferred Date *</label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', background: 'var(--color-graphite)', border: '1px solid var(--border-subtle)', borderRadius: '2px', color: 'var(--color-ivory)', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-taupe)', marginBottom: '6px', fontWeight: 600 }}>Preferred Time Slot *</label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', background: 'var(--color-graphite)', border: '1px solid var(--border-subtle)', borderRadius: '2px', color: 'var(--color-ivory)', outline: 'none' }}
                    >
                      {shift === 'lunch' ? (
                        <>
                          <option value="11:30 AM">11:30 AM</option>
                          <option value="12:00 PM">12:00 PM</option>
                          <option value="12:30 PM">12:30 PM</option>
                          <option value="1:00 PM">1:00 PM</option>
                          <option value="1:30 PM">1:30 PM</option>
                        </>
                      ) : (
                        <>
                          <option value="5:30 PM">5:30 PM</option>
                          <option value="6:00 PM">6:00 PM</option>
                          <option value="6:30 PM">6:30 PM</option>
                          <option value="7:00 PM">7:00 PM</option>
                          <option value="7:30 PM">7:30 PM</option>
                          <option value="8:00 PM">8:00 PM</option>
                          <option value="8:30 PM">8:30 PM</option>
                          <option value="9:00 PM">9:00 PM</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-taupe)', marginBottom: '6px', fontWeight: 600 }}>Seating Zone Preference</label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', background: 'var(--color-graphite)', border: '1px solid var(--border-subtle)', borderRadius: '2px', color: 'var(--color-ivory)', outline: 'none' }}
                  >
                    <option value="Main Hearth & Grill Room">Main Hearth & Grill Room (Leather Banquette)</option>
                    <option value="Himalayan Salt Cave View">Himalayan Salt Cave View Booth</option>
                    <option value="Subterranean Wine Vault">Subterranean Wine Vault (Private Dining)</option>
                    <option value="Bourbon & Cut Counter">Bourbon & Cut Counter (Front-Row Experience)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-taupe)', marginBottom: '6px', fontWeight: 600 }}>Dietary / Cut Temperature Preferences</label>
                  <input
                    type="text"
                    placeholder="e.g. Bone-in ribeye medium rare preference, red wine pairing requested"
                    value={formData.dietary}
                    onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', background: 'var(--color-graphite)', border: '1px solid var(--border-subtle)', borderRadius: '2px', color: 'var(--color-ivory)', outline: 'none' }}
                  />
                </div>

                {errorMsg && (
                  <div style={{ padding: '10px 14px', background: 'rgba(229, 62, 62, 0.15)', border: '1px solid #e53e3e', color: '#fc8181', borderRadius: '2px', fontSize: '12px' }}>
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    padding: '14px',
                    background: 'var(--color-bronze)',
                    border: 'none',
                    borderRadius: '2px',
                    color: '#101010',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '13px',
                    fontWeight: 700,
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    marginTop: '8px',
                    transition: 'all 0.2s'
                  }}
                >
                  {loading ? 'Submitting Request...' : 'Confirm Reservation Request'}
                </button>
              </form>
            )}
          </div>
        ) : (
          /* Lookup Reservation Tab */
          <div>
            <form onSubmit={handleLookup} style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-taupe)', marginBottom: '6px', fontWeight: 600 }}>
                Enter Booking Reference Code
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  required
                  placeholder="e.g. PRIME-261116-LUN1"
                  value={lookupCode}
                  onChange={(e) => setLookupCode(e.target.value.toUpperCase())}
                  style={{ flex: 1, padding: '12px 14px', background: 'var(--color-graphite)', border: '1px solid var(--border-subtle)', borderRadius: '2px', color: 'var(--color-champagne)', fontFamily: 'var(--font-heading)', letterSpacing: '1.5px', fontWeight: 700, outline: 'none' }}
                />
                <button
                  type="submit"
                  disabled={lookupLoading}
                  className="btn-submit-lookup"
                  style={{
                    padding: '0 24px',
                    background: 'var(--color-bronze)',
                    border: 'none',
                    borderRadius: '2px',
                    color: '#101010',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    cursor: lookupLoading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Search size={16} /> Search
                </button>
              </div>
            </form>

            {lookupLoading && (
              <div style={{ textAlign: 'center', padding: '30px', color: 'var(--color-taupe)' }}>
                Querying Charred & Prime host desk records...
              </div>
            )}

            {lookupError && (
              <div style={{ padding: '12px 16px', background: 'rgba(229, 62, 62, 0.15)', border: '1px solid #e53e3e', color: '#fc8181', borderRadius: '2px', fontSize: '13px', textAlign: 'center' }}>
                {lookupError}
              </div>
            )}

            {lookupResult && (
              <div style={{ background: 'var(--color-obsidian)', border: '1px solid var(--border-subtle)', borderRadius: '4px', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(148, 115, 79, 0.2)', paddingBottom: '12px', marginBottom: '16px' }}>
                  <div>
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-taupe)' }}>REFERENCE CODE</span>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 800, color: 'var(--color-champagne)', letterSpacing: '1.5px' }}>
                      {lookupResult.reference_code}
                    </div>
                  </div>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '2px',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    background: lookupResult.status === 'confirmed' ? 'rgba(72, 187, 120, 0.2)' : 'rgba(216, 154, 75, 0.2)',
                    color: lookupResult.status === 'confirmed' ? '#68d391' : '#f3be7a',
                    border: lookupResult.status === 'confirmed' ? '1px solid #38a169' : '1px solid #d89a4b'
                  }}>
                    {lookupResult.status}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '13px' }}>
                  <div>
                    <span style={{ color: 'var(--color-taupe)', fontSize: '11px', textTransform: 'uppercase' }}>Guest Name:</span>
                    <div style={{ fontWeight: 600, color: 'var(--color-ivory)' }}>{lookupResult.guest_name || lookupResult.full_name}</div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-taupe)', fontSize: '11px', textTransform: 'uppercase' }}>Party & Occasion:</span>
                    <div style={{ fontWeight: 600, color: 'var(--color-ivory)' }}>{lookupResult.party_size || lookupResult.guests} Pax • {lookupResult.occasion || 'Dinner'}</div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-taupe)', fontSize: '11px', textTransform: 'uppercase' }}>Date & Shift:</span>
                    <div style={{ fontWeight: 600, color: 'var(--color-champagne)' }}>
                      {lookupResult.reservation_date || lookupResult.preferred_date} ({lookupResult.shift?.toUpperCase() || 'DINNER'})
                    </div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-taupe)', fontSize: '11px', textTransform: 'uppercase' }}>Seating Time:</span>
                    <div style={{ fontWeight: 600, color: 'var(--color-ivory)' }}>{lookupResult.time_slot || lookupResult.preferred_time}</div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-taupe)', fontSize: '11px', textTransform: 'uppercase' }}>Seating Area:</span>
                    <div style={{ fontWeight: 600, color: 'var(--color-ivory)' }}>{lookupResult.preferred_zone || lookupResult.selected_experience || 'Main Dining'}</div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-taupe)', fontSize: '11px', textTransform: 'uppercase' }}>Table Assigned:</span>
                    <div style={{ fontWeight: 600, color: lookupResult.table_number ? 'var(--color-champagne)' : 'var(--color-taupe)' }}>
                      {lookupResult.table_number || 'Pending Host Table Assignment'}
                    </div>
                  </div>
                </div>

                {lookupResult.dietary_notes && (
                  <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: '12px' }}>
                    <span style={{ color: 'var(--color-taupe)' }}>Dietary Preferences: </span>
                    <span style={{ color: 'var(--color-champagne)' }}>{lookupResult.dietary_notes}</span>
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
