import React from 'react';
import { useCMS } from '../context/CMSContext';
import { MapPin, Phone, Mail, Clock, Anchor, Compass, Calendar, ShieldCheck } from 'lucide-react';

export default function ContactPage() {
  const { data, openReservation } = useCMS();
  const settings = data.settings || {};
  const hours = data.opening_hours || [];

  return (
    <div style={{ paddingTop: '100px', backgroundColor: '#FCFBF8', minHeight: '100vh', color: '#1C2022' }}>
      {/* Header */}
      <section style={{ padding: '60px 0 60px', background: 'linear-gradient(180deg, #F5F2EA 0%, #FCFBF8 100%)', borderBottom: '1px solid #E2DAD0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '30px', background: 'rgba(197, 160, 89, 0.15)', border: '1px solid rgba(197, 160, 89, 0.4)', color: '#9E7B36', fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, marginBottom: '16px' }}>
            <MapPin size={13} />
            <span>Concierge Desk & Coordinates</span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', color: '#081721', lineHeight: 1.15, marginBottom: '18px', fontWeight: 600 }}>
            Arrival & Concierge Desk
          </h1>

          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#5C6366', maxWidth: '700px', margin: '0 auto 28px' }}>
            Whether arriving via winding cliffside stone steps or by private yacht tender onto our reception pier, our concierge team is at your complete disposal.
          </p>

          <button onClick={openReservation} className="btn-gold" style={{ padding: '12px 28px', fontSize: '12.5px', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            <Calendar size={15} style={{ marginRight: '8px', display: 'inline' }} />
            Submit Shift Reservation
          </button>
        </div>
      </section>

      {/* Main Logistics Grid */}
      <section style={{ padding: '70px 0 90px' }}>
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '36px' }}>
            {/* Contact Details Card */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2DAD0', borderRadius: '12px', padding: '36px', boxShadow: '0 4px 15px rgba(8, 23, 33, 0.03)' }}>
              <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '1.8rem', color: '#081721', marginBottom: '24px' }}>
                Direct Concierge Contacts
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#F0F6F8', color: '#2A6F85', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', color: '#7A7E80', textTransform: 'uppercase' }}>Physical Sanctuary</div>
                    <div style={{ fontWeight: 600, color: '#081721', fontSize: '14px', marginTop: '2px' }}>
                      {settings.address_line1 || "Via Cristoforo Colombo, 84"}
                    </div>
                    <div style={{ color: '#5C6366', fontSize: '13px' }}>
                      {settings.city_region || "84017 Positano (SA), Amalfi Coast, Italy"}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#F0F6F8', color: '#2A6F85', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Compass size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', color: '#7A7E80', textTransform: 'uppercase' }}>GPS Coordinates</div>
                    <div style={{ fontWeight: 600, color: '#081721', fontSize: '13.5px', fontFamily: 'var(--font-mono, monospace)', marginTop: '2px' }}>
                      {settings.coordinates_display || "40.6281° N, 14.4850° E"}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#F0F6F8', color: '#2A6F85', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Phone size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', color: '#7A7E80', textTransform: 'uppercase' }}>Phone & WhatsApp</div>
                    <div style={{ fontWeight: 600, color: '#081721', fontSize: '13.5px', fontFamily: 'var(--font-mono, monospace)', marginTop: '2px' }}>
                      {settings.phone || "+39 089 875 119"}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#F0F6F8', color: '#2A6F85', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', color: '#7A7E80', textTransform: 'uppercase' }}>Concierge Desk Email</div>
                    <div style={{ fontWeight: 600, color: '#081721', fontSize: '13.5px', marginTop: '2px' }}>
                      {settings.email || "concierge@auramarina-positano.it"}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#F0F6F8', color: '#2A6F85', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Anchor size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', color: '#7A7E80', textTransform: 'uppercase' }}>Private Yacht Tender & Dock</div>
                    <div style={{ color: '#5C6366', fontSize: '12.5px', marginTop: '2px', lineHeight: 1.5 }}>
                      {settings.boat_access_notes || "Private tender service departs continuously from Positano Harbour and coordinates with anchored yachts via VHF Channel 72."}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Shifts Card */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2DAD0', borderRadius: '12px', padding: '36px', boxShadow: '0 4px 15px rgba(8, 23, 33, 0.03)' }}>
              <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '1.8rem', color: '#081721', marginBottom: '24px' }}>
                Service Shifts & Seating Hours
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
                <div style={{ background: '#FAF8F4', border: '1px solid #E2DAD0', borderRadius: '8px', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <strong style={{ color: '#081721' }}>☀️ Lunch Service Shift</strong>
                    <span style={{ fontFamily: 'var(--font-mono, monospace)', color: '#9E7B36', fontWeight: 700 }}>12:00 — 15:30</span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#7A7E80', margin: 0 }}>
                    Terrace dining, crudo repertoire, and afternoon aperitivo.
                  </p>
                </div>

                <div style={{ background: '#FAF8F4', border: '1px solid #E2DAD0', borderRadius: '8px', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <strong style={{ color: '#081721' }}>🌙 Sunset & Dinner Shift</strong>
                    <span style={{ fontFamily: 'var(--font-mono, monospace)', color: '#2A6F85', fontWeight: 700 }}>19:00 — 23:30</span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#7A7E80', margin: 0 }}>
                    Multi-course tasting menus, volcanic pairings, and starlit ambiance.
                  </p>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #E2DAD0', paddingTop: '20px' }}>
                <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', color: '#7A7E80', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Guest Dress Code
                </div>
                <p style={{ fontSize: '13px', color: '#4A5255', margin: '0 0 20px', lineHeight: 1.5 }}>
                  {settings.dress_code || "Elegant Resort Casual for lunch. Smart Elegant for dinner. Swimwear not permitted."}
                </p>
                <button onClick={openReservation} className="btn-gold" style={{ width: '100%', padding: '12px', fontSize: '12.5px', textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer' }}>
                  Check Table Availability
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
