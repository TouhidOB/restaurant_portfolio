import React, { useState } from 'react';
import { Calendar, CheckCircle, Clock, Users, MapPin, Sparkles, Anchor, Shield } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { submitReservation } from '../../services/api';

export default function ReservationSection() {
  const { data } = useCMS();
  const settings = data.settings || {};
  const section = data.sections?.reservation || {};

  const [formData, setFormData] = useState({
    guest_name: '',
    email: '',
    phone: '',
    party_size: 2,
    reservation_date: '2026-06-25',
    reservation_time: '20:00',
    seating_preference: 'The Belvedere Sea Terrace',
    occasion: 'Anniversary Dinner',
    special_requests: '',
    dietary_notes: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await submitReservation(formData);
    setSubmitting(false);
    setResult(res);
  };

  return (
    <section id="reservations" className="section-wrapper" style={{ backgroundColor: '#FCFBF8' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            {section.badge || 'TABLE ENQUIRY'}
          </div>
          <h2 className="section-title">
            Reserve Your <em>Coastal Experience</em>
          </h2>
          <p className="section-subtitle">
            {section.subtitle || 'Advance bookings are recommended 14 to 30 days ahead for cliffside terrace seatings.'}
          </p>
        </div>

        {/* Dual Column Layout: Hospitality Policies & Form Card */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
            gap: '56px',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Hospitality Policies & Yacht Concierge */}
          <div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: '#C5A059',
                display: 'block',
                marginBottom: '10px',
                fontWeight: 600,
              }}
            >
              CONCIERGE & ACCESS
            </span>
            <h3 style={{ fontSize: '2.4rem', color: '#081721', marginBottom: '18px', lineHeight: 1.15 }}>
              Bespoke Seaside Hospitality & Private Mooring
            </h3>
            <p style={{ fontSize: '1.08rem', color: '#4A5255', lineHeight: 1.75, marginBottom: '28px' }}>
              Whether anchoring your yacht in Positano bay or arriving along the scenic Amalfi cliff road, our dedicated concierge coordinates every detail of your evening with discreet Mediterranean hospitality.
            </p>

            <div style={{ background: '#FAF8F4', border: '1px solid rgba(197, 160, 89, 0.3)', borderRadius: '16px', padding: '24px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <Anchor size={16} color="#C5A059" />
                <h4 style={{ fontSize: '1.2rem', color: '#081721', margin: 0 }}>
                  Private Tender Boat Shuttle
                </h4>
              </div>
              <p style={{ fontSize: '0.92rem', color: '#253B2F', lineHeight: 1.6 }}>
                {settings.boat_access_notes || 'Private tender boat shuttle provided for yachts anchoring in Positano bay. VHF Ch 72'}
              </p>
            </div>

            <div style={{ background: '#FAF8F4', border: '1px solid rgba(197, 160, 89, 0.3)', borderRadius: '16px', padding: '24px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <Shield size={16} color="#C5A059" />
                <h4 style={{ fontSize: '1.2rem', color: '#081721', margin: 0 }}>
                  Dress Code Standard
                </h4>
              </div>
              <p style={{ fontSize: '0.92rem', color: '#253B2F', lineHeight: 1.6 }}>
                {settings.dress_code || 'Coastal Elegant / Smart Casual — Footwear required; no beach attire during evening service'}
              </p>
            </div>

            <div style={{ background: '#F0F6F8', border: '1px solid #D5E5EB', borderRadius: '16px', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <Sparkles size={16} color="#2A6F85" />
                <h4 style={{ fontSize: '1.2rem', color: '#081721', margin: 0 }}>
                  Gastronomic Recognition
                </h4>
              </div>
              <p style={{ fontSize: '0.92rem', color: '#2A6F85', lineHeight: 1.6 }}>
                {settings.michelin_distinction || 'Michelin Guide Selected 2024–2026'}
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Reservation Form Card */}
          <div
            className="luxury-card"
            style={{
              padding: '44px 38px',
              border: '1px solid rgba(197, 160, 89, 0.4)',
              boxShadow: '0 20px 60px rgba(8, 23, 33, 0.08)',
            }}
          >
            {result ? (
              <div style={{ textAlign: 'center', padding: '32px 12px' }}>
                <div
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #0A1C27 0%, #15384B 100%)',
                    border: '1px solid #C5A059',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 22px',
                    boxShadow: '0 8px 25px rgba(197, 160, 89, 0.3)',
                  }}
                >
                  <CheckCircle size={38} color="#DFBA73" />
                </div>
                <h4 style={{ fontSize: '2.2rem', color: '#081721', marginBottom: '8px' }}>
                  Inquiry Confirmed
                </h4>
                <p style={{ color: '#4A5255', fontSize: '1.02rem', lineHeight: 1.65, marginBottom: '26px' }}>
                  {result.message || 'Your table inquiry has been received. Our concierge will contact you within 2 hours.'}
                </p>
                <div
                  style={{
                    background: '#FAF8F4',
                    border: '1px dashed #C5A059',
                    padding: '18px',
                    borderRadius: '10px',
                    marginBottom: '30px',
                  }}
                >
                  <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#7A7E80', display: 'block', marginBottom: '4px' }}>
                    Reservation Reference Code
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 600, color: '#C5A059' }}>
                    {result.reference_code}
                  </span>
                </div>
                <button
                  onClick={() => setResult(null)}
                  className="btn-gold"
                  style={{ padding: '14px 32px' }}
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontSize: '1.8rem', color: '#081721', marginBottom: '26px' }}>
                  Request Table Reservation
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '18px', marginBottom: '18px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#081721', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                      Guest Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lady Vivienne Sterling"
                      value={formData.guest_name}
                      onChange={(e) => setFormData({ ...formData, guest_name: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', border: '1px solid #E5DDCF', borderRadius: '8px', fontSize: '13.5px', outline: 'none', background: '#FAF8F4' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#081721', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@luxurymail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', border: '1px solid #E5DDCF', borderRadius: '8px', fontSize: '13.5px', outline: 'none', background: '#FAF8F4' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '18px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#081721', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+39 089 ..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', border: '1px solid #E5DDCF', borderRadius: '8px', fontSize: '13.5px', outline: 'none', background: '#FAF8F4' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#081721', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                      Party Size *
                    </label>
                    <select
                      value={formData.party_size}
                      onChange={(e) => setFormData({ ...formData, party_size: parseInt(e.target.value) })}
                      style={{ width: '100%', padding: '12px 14px', border: '1px solid #E5DDCF', borderRadius: '8px', fontSize: '13.5px', outline: 'none', background: '#FAF8F4' }}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option key={n} value={n}>{n} Guests</option>
                      ))}
                      <option value={10}>9+ Guests (Villa Buyout)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#081721', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                      Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.reservation_date}
                      onChange={(e) => setFormData({ ...formData, reservation_date: e.target.value })}
                      style={{ width: '100%', padding: '11px 14px', border: '1px solid #E5DDCF', borderRadius: '8px', fontSize: '13.5px', outline: 'none', background: '#FAF8F4' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '18px', marginBottom: '18px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#081721', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                      Seating Space
                    </label>
                    <select
                      value={formData.seating_preference}
                      onChange={(e) => setFormData({ ...formData, seating_preference: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', border: '1px solid #E5DDCF', borderRadius: '8px', fontSize: '13.5px', outline: 'none', background: '#FAF8F4' }}
                    >
                      <option value="The Belvedere Sea Terrace">The Belvedere Sea Terrace</option>
                      <option value="The Olive Pergola Courtyard">The Olive Pergola Courtyard</option>
                      <option value="The Travertine Sala (Indoor)">The Travertine Sala (Indoor)</option>
                      <option value="Private Cliffside Alcove">Private Cliffside Alcove</option>
                      <option value="The Raw Bar Counter">The Raw Bar Counter</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#081721', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                      Service Time
                    </label>
                    <select
                      value={formData.reservation_time}
                      onChange={(e) => setFormData({ ...formData, reservation_time: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', border: '1px solid #E5DDCF', borderRadius: '8px', fontSize: '13.5px', outline: 'none', background: '#FAF8F4' }}
                    >
                      <option value="12:30">12:30 — Lunch</option>
                      <option value="13:30">13:30 — Lunch</option>
                      <option value="19:00">19:00 — Sunset Seating</option>
                      <option value="20:00">20:00 — Evening Seating</option>
                      <option value="21:15">21:15 — Twilight Seating</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '26px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#081721', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                    Occasion & Yacht Tender Details
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Yacht tender arrival requested from Positano mooring; celebrating anniversary; dietary preferences..."
                    value={formData.special_requests}
                    onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', border: '1px solid #E5DDCF', borderRadius: '8px', fontSize: '13.5px', outline: 'none', background: '#FAF8F4' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-gold"
                  style={{ width: '100%', padding: '17px', fontSize: '0.92rem' }}
                >
                  {submitting ? 'Transmitting to Concierge...' : 'Submit Reservation Inquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
