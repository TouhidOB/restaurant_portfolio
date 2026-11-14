import React, { useState } from 'react';
import { Calendar, CheckCircle, Clock, Users, MapPin, Sparkles, AlertCircle } from 'lucide-react';
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
    <section id="reservations" className="section-wrapper" style={{ backgroundColor: '#FAF9F5' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            {section.badge || 'TABLE ENQUIRY'}
          </div>
          <h2 className="section-title">
            {section.title || 'RESERVE YOUR COASTAL EXPERIENCE'}
          </h2>
          <p className="section-subtitle">
            {section.subtitle || 'Advance bookings are recommended 14 to 30 days ahead for cliffside terrace seatings.'}
          </p>
        </div>

        {/* Dual Column Layout: Policy Guidelines & Form Card */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '50px',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Hospitality Policies & Yacht Concierge */}
          <div>
            <h3 style={{ fontSize: '2rem', color: '#174A63', marginBottom: '16px' }}>
              Bespoke Seaside Hospitality
            </h3>
            <p style={{ fontSize: '1.05rem', color: '#4A4E4D', lineHeight: 1.7, marginBottom: '24px' }}>
              Whether anchoring in Positano bay or arriving along the coastal roads, our dedicated concierge team coordinates every detail of your evening.
            </p>

            <div style={{ background: '#F8F6F0', border: '1px solid #E0D6C5', borderRadius: '12px', padding: '24px', marginBottom: '20px' }}>
              <h4 style={{ fontSize: '1.15rem', color: '#174A63', marginBottom: '6px' }}>
                Private Tender Boat Service
              </h4>
              <p style={{ fontSize: '0.9rem', color: '#68765A', lineHeight: 1.5 }}>
                {settings.boat_access_notes || 'Private tender boat shuttle provided for yachts anchoring in Positano bay. VHF Ch 72'}
              </p>
            </div>

            <div style={{ background: '#F8F6F0', border: '1px solid #E0D6C5', borderRadius: '12px', padding: '24px', marginBottom: '20px' }}>
              <h4 style={{ fontSize: '1.15rem', color: '#174A63', marginBottom: '6px' }}>
                Dress Code Policy
              </h4>
              <p style={{ fontSize: '0.9rem', color: '#68765A', lineHeight: 1.5 }}>
                {settings.dress_code || 'Coastal Elegant / Smart Casual — Footwear required; no beach attire during evening service'}
              </p>
            </div>

            <div style={{ background: '#F0F6F7', border: '1px solid #C9DDE0', borderRadius: '12px', padding: '24px' }}>
              <h4 style={{ fontSize: '1.15rem', color: '#174A63', marginBottom: '6px' }}>
                Michelin Distinction
              </h4>
              <p style={{ fontSize: '0.9rem', color: '#367E94', lineHeight: 1.5 }}>
                {settings.michelin_distinction || 'Michelin Guide Selected 2024–2026'}
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Reservation Form */}
          <div
            className="luxury-card"
            style={{
              padding: '40px',
              background: '#FFFFFF',
              boxShadow: '0 12px 40px rgba(23, 74, 99, 0.07)',
            }}
          >
            {result ? (
              <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                <div
                  style={{
                    width: '68px',
                    height: '68px',
                    borderRadius: '50%',
                    background: '#EFF8FA',
                    border: '1px solid #C9DDE0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                  }}
                >
                  <CheckCircle size={36} color="#174A63" />
                </div>
                <h4 style={{ fontSize: '2rem', color: '#174A63', marginBottom: '8px' }}>
                  Inquiry Confirmed
                </h4>
                <p style={{ color: '#4A4E4D', fontSize: '1rem', lineHeight: 1.6, marginBottom: '24px' }}>
                  {result.message || 'Your table inquiry has been received. Our concierge will contact you within 2 hours.'}
                </p>
                <div
                  style={{
                    background: '#FAF8F2',
                    border: '1px dashed #C8B69B',
                    padding: '16px',
                    borderRadius: '8px',
                    marginBottom: '28px',
                  }}
                >
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8C8981', display: 'block', marginBottom: '4px' }}>
                    Reservation Reference Code
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 600, color: '#174A63' }}>
                    {result.reference_code}
                  </span>
                </div>
                <button
                  onClick={() => setResult(null)}
                  className="btn-secondary"
                  style={{ padding: '12px 28px' }}
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontSize: '1.6rem', color: '#174A63', marginBottom: '24px' }}>
                  Request Table Reservation
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#174A63', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                      Guest Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Elena Rostova"
                      value={formData.guest_name}
                      onChange={(e) => setFormData({ ...formData, guest_name: e.target.value })}
                      style={{ width: '100%', padding: '11px 14px', border: '1px solid #D8CCB8', borderRadius: '6px', fontSize: '13px', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#174A63', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ width: '100%', padding: '11px 14px', border: '1px solid #D8CCB8', borderRadius: '6px', fontSize: '13px', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#174A63', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+39 089 ..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ width: '100%', padding: '11px 14px', border: '1px solid #D8CCB8', borderRadius: '6px', fontSize: '13px', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#174A63', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                      Party Size *
                    </label>
                    <select
                      value={formData.party_size}
                      onChange={(e) => setFormData({ ...formData, party_size: parseInt(e.target.value) })}
                      style={{ width: '100%', padding: '11px 14px', border: '1px solid #D8CCB8', borderRadius: '6px', fontSize: '13px', outline: 'none', background: '#FFFFFF' }}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option key={n} value={n}>{n} Guests</option>
                      ))}
                      <option value={10}>9+ Guests (Villa Buyout)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#174A63', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                      Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.reservation_date}
                      onChange={(e) => setFormData({ ...formData, reservation_date: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', border: '1px solid #D8CCB8', borderRadius: '6px', fontSize: '13px', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#174A63', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                      Seating Space
                    </label>
                    <select
                      value={formData.seating_preference}
                      onChange={(e) => setFormData({ ...formData, seating_preference: e.target.value })}
                      style={{ width: '100%', padding: '11px 14px', border: '1px solid #D8CCB8', borderRadius: '6px', fontSize: '13px', outline: 'none', background: '#FFFFFF' }}
                    >
                      <option value="The Belvedere Sea Terrace">The Belvedere Sea Terrace</option>
                      <option value="The Olive Pergola Courtyard">The Olive Pergola Courtyard</option>
                      <option value="The Travertine Sala (Indoor)">The Travertine Sala (Indoor)</option>
                      <option value="Private Cliffside Alcove">Private Cliffside Alcove</option>
                      <option value="The Raw Bar Counter">The Raw Bar Counter</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#174A63', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                      Service Time
                    </label>
                    <select
                      value={formData.reservation_time}
                      onChange={(e) => setFormData({ ...formData, reservation_time: e.target.value })}
                      style={{ width: '100%', padding: '11px 14px', border: '1px solid #D8CCB8', borderRadius: '6px', fontSize: '13px', outline: 'none', background: '#FFFFFF' }}
                    >
                      <option value="12:30">12:30 — Lunch</option>
                      <option value="13:30">13:30 — Lunch</option>
                      <option value="19:00">19:00 — Sunset Aperitivo Seating</option>
                      <option value="20:00">20:00 — Evening Seating</option>
                      <option value="21:15">21:15 — Twilight Seating</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '22px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#174A63', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                    Occasion & Yacht Tender Details
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Yacht tender arrival requested from Positano mooring; celebrating anniversary; dietary preferences..."
                    value={formData.special_requests}
                    onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', border: '1px solid #D8CCB8', borderRadius: '6px', fontSize: '13px', outline: 'none' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary"
                  style={{ width: '100%', padding: '16px', fontSize: '0.95rem' }}
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
