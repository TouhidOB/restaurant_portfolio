import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { createReservation } from '../../services/api';

export default function ReservationSection() {
  const { content } = useCMS();
  const resSection = content?.sections?.reservation || {};
  const restaurant = content?.restaurant || {};

  const [formData, setFormData] = useState({
    guest_name: '',
    email: '',
    phone: '',
    reservation_date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    reservation_time: '19:15',
    party_size: 2,
    preferred_zone: 'Retro Leather Booth',
    occasion: 'casual',
    dietary_notes: '',
    special_requests: '',
  });

  const [shiftFilter, setShiftFilter] = useState('dinner');
  const [loading, setLoading] = useState(false);
  const [successResult, setSuccessResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const LUNCH_SLOTS = ['11:30', '12:00', '12:30', '13:00', '13:30', '14:00'];
  const DINNER_SLOTS = ['17:30', '18:00', '18:45', '19:15', '20:00', '20:45', '21:30', '22:15'];

  const SEATING_ZONES = [
    { id: 'Retro Leather Booth', name: 'Red Leather Booth', desc: 'Cozy vinyl booth with table jukebox' },
    { id: 'Starlight Dining Table', name: 'Starlight Dining Table', desc: 'Center room with chrome fixtures' },
    { id: 'Chrome Counter Stools', name: 'Stainless Counter', desc: 'Front-row view of the flat-top grill' },
    { id: 'VIP Galactic Salon', name: 'VIP Galactic Salon', desc: 'Semi-private vault for groups' },
  ];

  const OCCASIONS = [
    { id: 'casual', name: 'Casual Dining' },
    { id: 'birthday', name: 'Birthday Celebration 🎉' },
    { id: 'anniversary', name: 'Anniversary 🥂' },
    { id: 'date', name: 'Romantic Date ❤️' },
    { id: 'business', name: 'Business Dinner 💼' },
    { id: 'celebration', name: 'Special Celebration ✨' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const payload = {
      ...formData,
      party_size: parseInt(formData.party_size, 10),
    };

    const res = await createReservation(payload);
    setLoading(false);

    if (res.success) {
      setSuccessResult(res.data);
    } else {
      setErrorMsg(res.error || 'Failed to submit reservation. Please check your network connection.');
    }
  };

  const handleCopyCode = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const downloadICS = (res) => {
    const dateStr = (res.reservation_date || '').replace(/-/g, '');
    const [hours, mins] = (res.reservation_time || '19:15').split(':');
    const startHour = hours ? hours.padStart(2, '0') : '19';
    const startMin = mins ? mins.padStart(2, '0') : '15';
    const endHour = String((parseInt(startHour, 10) + 2) % 24).padStart(2, '0');

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Stardust Diner//Table Reservation//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `SUMMARY:Table at Stardust Diner (${res.reference_code})`,
      `DESCRIPTION:Table reserved for ${res.party_size || res.guest_count} guests at ${res.seating_area}. Reference: ${res.reference_code}.`,
      'LOCATION:88 Observatory Way, Neon Heights, CA 90210',
      `DTSTART:${dateStr}T${startHour}${startMin}00`,
      `DTEND:${dateStr}T${endHour}${startMin}00`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `stardust-reservation-${res.reference_code}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="reservations" className="section-shell">
      <div className="container-diner">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(2.5rem, 5vw, 5rem)',
            alignItems: 'flex-start',
          }}
        >
          {/* Left Column: Context & Guidelines */}
          <div>
            <span className="section-tag">
              {resSection.eyebrow || 'TABLE INQUIRY & RESERVATION'}
            </span>
            <h2 className="section-heading">
              {resSection.title || "COME ON IN. YOUR TABLE IS READY TO REQUEST."}
            </h2>
            <p className="section-lead" style={{ marginBottom: '2rem' }}>
              {resSection.subtitle ||
                'Planning a visit? Send us your reservation request and our Maitre D\' concierge team will confirm your seating.'}
            </p>

            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-diner)',
                borderRadius: 'var(--radius-sm)',
                padding: '1.75rem',
                marginBottom: '2rem',
              }}
            >
              <h4
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  letterSpacing: '0.1em',
                  color: 'var(--neon-cyan)',
                  textTransform: 'uppercase',
                  marginBottom: '0.75rem',
                }}
              >
                ★ DINER SEATING POLICIES
              </h4>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  fontSize: '0.9rem',
                  color: 'var(--text-cream)',
                }}
              >
                <li style={{ display: 'flex', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--cherry-red)' }}>★</span>
                  <span>Walk-ins are always welcomed at our 24-seat chrome counter.</span>
                </li>
                <li style={{ display: 'flex', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--cherry-red)' }}>★</span>
                  <span>Booth reservations are held for 15 minutes past arrival time.</span>
                </li>
                <li style={{ display: 'flex', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--cherry-red)' }}>★</span>
                  <span>Instant confirmation code issued on booking submission.</span>
                </li>
              </ul>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.9rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                DIRECT PHONE RESERVATIONS & CONCIERGE
              </span>
              <a href={`tel:${restaurant.phone || '+13125551955'}`} style={{ color: '#FFFFFF', fontWeight: 700 }}>
                {restaurant.phone || '+1 (312) 555-1955'}
              </a>
              <a href={`mailto:${restaurant.email || 'concierge@stardustdiner.com'}`} style={{ color: 'var(--neon-cyan)' }}>
                {restaurant.email || 'concierge@stardustdiner.com'}
              </a>
            </div>
          </div>

          {/* Right Column: In-Page Booking Terminal Form */}
          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-sm)',
              padding: 'clamp(2rem, 4vw, 2.75rem)',
              boxShadow: '0 20px 48px rgba(0, 0, 0, 0.5), 0 0 30px rgba(67, 217, 232, 0.1)',
            }}
          >
            {successResult ? (
              <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(242, 201, 76, 0.2)',
                    border: '2px solid var(--atomic-yellow)',
                    color: 'var(--atomic-yellow)',
                    fontSize: '1.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem',
                    boxShadow: '0 0 20px rgba(242, 201, 76, 0.35)',
                  }}
                >
                  ⏳
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2rem',
                    color: '#FFFFFF',
                    marginBottom: '0.5rem',
                  }}
                >
                  Reservation Request Received
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.95rem',
                    color: 'var(--neon-cyan)',
                    marginBottom: '1rem',
                  }}
                >
                  REF #{successResult.reference_code || 'RETRO-SAVED'}
                </p>

                {/* Digital Ticket */}
                <div
                  style={{
                    backgroundColor: 'var(--bg-midnight-deep)',
                    border: '1px dashed var(--atomic-yellow)',
                    borderRadius: '6px',
                    padding: '1.25rem',
                    textAlign: 'left',
                    marginBottom: '1.5rem',
                    fontSize: '0.85rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>MAITRE D' REQUEST PASS</span>
                    <button
                      type="button"
                      onClick={() => handleCopyCode(successResult.reference_code)}
                      style={{
                        background: 'transparent',
                        border: '1px solid var(--neon-cyan)',
                        color: 'var(--neon-cyan)',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '3px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        cursor: 'pointer',
                      }}
                    >
                      {copiedCode ? '✓ COPIED' : 'COPY'}
                    </button>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', color: 'var(--text-cream)' }}>
                    <div>Guest: <strong style={{ color: '#FFF' }}>{successResult.guest_name}</strong></div>
                    <div>Requested: <strong style={{ color: 'var(--atomic-yellow)' }}>{successResult.party_size} PAX</strong></div>
                    <div>Date: <strong style={{ color: '#FFF' }}>{successResult.reservation_date}</strong></div>
                    <div>Time: <strong style={{ color: '#FFF' }}>{successResult.reservation_time}</strong></div>
                    <div>Zone: <strong style={{ color: 'var(--neon-cyan)' }}>{successResult.seating_area}</strong></div>
                    <div>Status: <span style={{ color: 'var(--atomic-yellow)', fontWeight: 700 }}>⏳ PENDING APPROVAL</span></div>
                  </div>
                  <div style={{ marginTop: '0.75rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.08)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Our host team will review and approve your table request. Use your code to track approval status.
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => setSuccessResult(null)}
                    className="btn-outline-diner"
                    style={{ padding: '0.65rem 1.25rem', fontSize: '0.8rem' }}
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.85rem',
                    color: '#FFFFFF',
                    marginBottom: '0.25rem',
                  }}
                >
                  Table Reservation Terminal
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                  Choose your preferred service shift, arrival time, and seating area.
                </p>

                {errorMsg && (
                  <div
                    style={{
                      padding: '0.75rem 1rem',
                      backgroundColor: 'rgba(216, 58, 69, 0.2)',
                      border: '1px solid var(--cherry-red)',
                      color: '#FFA5AC',
                      borderRadius: 'var(--radius-xs)',
                      fontSize: '0.85rem',
                    }}
                  >
                    {errorMsg}
                  </div>
                )}

                {/* Name & Phone */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: 'var(--neon-cyan)',
                        marginBottom: '0.35rem',
                      }}
                    >
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      name="guest_name"
                      required
                      value={formData.guest_name}
                      onChange={handleChange}
                      placeholder="e.g. Donna Hayward"
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.85rem',
                        backgroundColor: 'var(--bg-midnight-deep)',
                        border: '1px solid var(--border-diner)',
                        borderRadius: 'var(--radius-xs)',
                        color: 'var(--text-ivory)',
                        outline: 'none',
                        fontSize: '0.88rem',
                      }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: 'var(--neon-cyan)',
                        marginBottom: '0.35rem',
                      }}
                    >
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="donna@stardust.com"
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.85rem',
                        backgroundColor: 'var(--bg-midnight-deep)',
                        border: '1px solid var(--border-diner)',
                        borderRadius: 'var(--radius-xs)',
                        color: 'var(--text-ivory)',
                        outline: 'none',
                        fontSize: '0.88rem',
                      }}
                    />
                  </div>
                </div>

                {/* Phone & Party */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: 'var(--neon-cyan)',
                        marginBottom: '0.35rem',
                      }}
                    >
                      PHONE NUMBER *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (312) 555-0182"
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.85rem',
                        backgroundColor: 'var(--bg-midnight-deep)',
                        border: '1px solid var(--border-diner)',
                        borderRadius: 'var(--radius-xs)',
                        color: 'var(--text-ivory)',
                        outline: 'none',
                        fontSize: '0.88rem',
                      }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: 'var(--neon-cyan)',
                        marginBottom: '0.35rem',
                      }}
                    >
                      GUEST COUNT *
                    </label>
                    <select
                      name="party_size"
                      value={formData.party_size}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.85rem',
                        backgroundColor: 'var(--bg-midnight-deep)',
                        border: '1px solid var(--border-diner)',
                        borderRadius: 'var(--radius-xs)',
                        color: 'var(--text-ivory)',
                        outline: 'none',
                        fontSize: '0.88rem',
                      }}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? 'Guest (Counter)' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Date & Shift */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: 'var(--neon-cyan)',
                        marginBottom: '0.35rem',
                      }}
                    >
                      DATE *
                    </label>
                    <input
                      type="date"
                      name="reservation_date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.reservation_date}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.85rem',
                        backgroundColor: 'var(--bg-midnight-deep)',
                        border: '1px solid var(--border-diner)',
                        borderRadius: 'var(--radius-xs)',
                        color: 'var(--text-ivory)',
                        outline: 'none',
                        fontSize: '0.88rem',
                      }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: 'var(--neon-cyan)',
                        marginBottom: '0.35rem',
                      }}
                    >
                      OCCASION
                    </label>
                    <select
                      name="occasion"
                      value={formData.occasion}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.85rem',
                        backgroundColor: 'var(--bg-midnight-deep)',
                        border: '1px solid var(--border-diner)',
                        borderRadius: 'var(--radius-xs)',
                        color: 'var(--text-ivory)',
                        outline: 'none',
                        fontSize: '0.88rem',
                      }}
                    >
                      {OCCASIONS.map((occ) => (
                        <option key={occ.id} value={occ.id}>{occ.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Service Shift & Time Slots */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <label
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: 'var(--neon-cyan)',
                      }}
                    >
                      ARRIVAL TIME *
                    </label>
                    <div style={{ display: 'flex', gap: '0.2rem' }}>
                      <button
                        type="button"
                        onClick={() => setShiftFilter('lunch')}
                        style={{
                          padding: '0.2rem 0.5rem',
                          fontSize: '0.65rem',
                          fontFamily: 'var(--font-mono)',
                          borderRadius: '3px',
                          border: shiftFilter === 'lunch' ? '1px solid var(--atomic-yellow)' : '1px solid var(--border-diner)',
                          background: shiftFilter === 'lunch' ? 'rgba(242, 201, 76, 0.2)' : 'transparent',
                          color: shiftFilter === 'lunch' ? 'var(--atomic-yellow)' : 'var(--text-muted)',
                          cursor: 'pointer',
                        }}
                      >
                        LUNCH
                      </button>
                      <button
                        type="button"
                        onClick={() => setShiftFilter('dinner')}
                        style={{
                          padding: '0.2rem 0.5rem',
                          fontSize: '0.65rem',
                          fontFamily: 'var(--font-mono)',
                          borderRadius: '3px',
                          border: shiftFilter === 'dinner' ? '1px solid var(--neon-cyan)' : '1px solid var(--border-diner)',
                          background: shiftFilter === 'dinner' ? 'rgba(67, 217, 232, 0.2)' : 'transparent',
                          color: shiftFilter === 'dinner' ? 'var(--neon-cyan)' : 'var(--text-muted)',
                          cursor: 'pointer',
                        }}
                      >
                        DINNER
                      </button>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                    {(shiftFilter === 'lunch' ? LUNCH_SLOTS : DINNER_SLOTS).map((t) => {
                      const isSelected = formData.reservation_time === t;
                      return (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, reservation_time: t }))}
                          style={{
                            padding: '0.4rem 0.75rem',
                            borderRadius: '3px',
                            border: isSelected ? '1px solid var(--neon-cyan)' : '1px solid var(--border-diner)',
                            backgroundColor: isSelected ? 'rgba(67, 217, 232, 0.2)' : 'var(--bg-midnight-deep)',
                            color: isSelected ? 'var(--neon-cyan)' : 'var(--text-ivory)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.75rem',
                            fontWeight: isSelected ? 700 : 400,
                            cursor: 'pointer',
                          }}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Seating Area */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: 'var(--neon-cyan)',
                      marginBottom: '0.4rem',
                    }}
                  >
                    PREFERRED DINING ZONE
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.4rem' }}>
                    {SEATING_ZONES.map((zone) => {
                      const isSelected = formData.preferred_zone === zone.id;
                      return (
                        <div
                          key={zone.id}
                          onClick={() => setFormData((prev) => ({ ...prev, preferred_zone: zone.id }))}
                          style={{
                            padding: '0.6rem',
                            borderRadius: '4px',
                            border: isSelected ? '1px solid var(--neon-cyan)' : '1px solid var(--border-diner)',
                            backgroundColor: isSelected ? 'rgba(67, 217, 232, 0.12)' : 'var(--bg-midnight-deep)',
                            cursor: 'pointer',
                          }}
                        >
                          <div style={{ fontWeight: 700, fontSize: '0.75rem', color: isSelected ? 'var(--neon-cyan)' : '#FFF' }}>
                            {zone.name}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Dietary Notes */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: 'var(--neon-cyan)',
                      marginBottom: '0.35rem',
                    }}
                  >
                    DIETARY REQUIREMENTS / ALLERGIES
                  </label>
                  <input
                    type="text"
                    name="dietary_notes"
                    value={formData.dietary_notes}
                    onChange={handleChange}
                    placeholder="e.g. Gluten-free, nut allergy, celebration candle"
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      backgroundColor: 'var(--bg-midnight-deep)',
                      border: '1px solid var(--border-diner)',
                      borderRadius: 'var(--radius-xs)',
                      color: 'var(--text-ivory)',
                      outline: 'none',
                      fontSize: '0.82rem',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-cherry"
                  style={{
                    width: '100%',
                    padding: '0.9rem',
                    fontSize: '0.9rem',
                    marginTop: '0.4rem',
                    opacity: loading ? 0.7 : 1,
                  }}
                >
                  <span>{loading ? 'CONFIRMING TABLE...' : 'CONFIRM TABLE RESERVATION'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
