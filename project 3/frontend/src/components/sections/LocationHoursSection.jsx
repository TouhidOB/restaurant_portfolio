import React from 'react';
import { MapPin, Phone, Mail, Compass, Clock, Anchor, Car, Plane } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function LocationHoursSection() {
  const { data } = useCMS();
  const settings = data.settings || {};
  const hours = data.opening_hours || [];
  const section = data.sections?.location || {};

  return (
    <section id="location" className="section-wrapper" style={{ backgroundColor: '#F8F6F0' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            {section.badge || 'VISIT & ARRIVAL'}
          </div>
          <h2 className="section-title">
            {section.title || 'CLIFFSIDE PROMENADE, POSITANO'}
          </h2>
          <p className="section-subtitle">
            {section.subtitle || 'Arrive via scenic cliff road or our private sea tender directly from your boat mooring in Positano bay.'}
          </p>
        </div>

        {/* 3 Columns: Arrival Guide, Opening Hours Table, Map Mockup */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
          }}
        >
          {/* Card 1: Arrival & Transport Modes */}
          <div className="luxury-card" style={{ padding: '32px', background: '#FFFFFF' }}>
            <h3 style={{ fontSize: '1.6rem', color: '#174A63', marginBottom: '20px' }}>
              Coastal Arrival Routes
            </h3>

            <div style={{ display: 'flex', gap: '14px', marginBottom: '20px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#F0F6F7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Anchor size={18} color="#174A63" />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', color: '#174A63', marginBottom: '4px' }}>
                  By Sea / Yacht Tender
                </h4>
                <p style={{ fontSize: '0.88rem', color: '#4A4E4D', lineHeight: 1.5 }}>
                  Mooring Berth 04 in Positano bay. Private tender shuttle on VHF Ch 72. 4 minutes from anchor to cliffside dock.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px', marginBottom: '20px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#F7F4EC', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Car size={18} color="#367E94" />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', color: '#174A63', marginBottom: '4px' }}>
                  By Road & Valet
                </h4>
                <p style={{ fontSize: '0.88rem', color: '#4A4E4D', lineHeight: 1.5 }}>
                  Via Panoramica 48. Complimentary white-glove valet parking provided at our private limestone motor court.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#EFF8FA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Plane size={18} color="#68765A" />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', color: '#174A63', marginBottom: '4px' }}>
                  Helicopter Transfers
                </h4>
                <p style={{ fontSize: '0.88rem', color: '#4A4E4D', lineHeight: 1.5 }}>
                  Coordinated transfers from Ravello helipad (12 mins) or Naples Capodichino International Airport (25 mins).
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: 7-Day Hours Table */}
          <div className="luxury-card" style={{ padding: '32px', background: '#FFFFFF' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <Clock size={20} color="#174A63" />
              <h3 style={{ fontSize: '1.6rem', color: '#174A63', margin: 0 }}>
                Hours of Service
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {hours.map((h) => (
                <div
                  key={h.id || h.day_of_week}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingBottom: '10px',
                    borderBottom: '1px solid #F0ECE4',
                    fontSize: '13px',
                  }}
                >
                  <span style={{ fontWeight: 600, color: '#174A63', minWidth: '90px' }}>
                    {h.day_of_week}
                  </span>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', color: '#4A4E4D', display: 'block' }}>
                      {h.dinner_hours}
                    </span>
                    <span style={{ fontSize: '11px', color: '#8C8981' }}>
                      Lunch: {h.lunch_hours}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '20px', background: '#FAF8F2', padding: '12px', borderRadius: '8px', border: '1px solid #E8D9C2', fontSize: '12px', color: '#68765A' }}>
              Sunset aperitivo and raw bar opens daily at 18:00.
            </div>
          </div>

          {/* Card 3: Interactive Location & Nautical Coordinates Map */}
          <div
            className="luxury-card"
            style={{
              padding: '0',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              background: '#FFFFFF',
            }}
          >
            {/* Visual Map Imagery */}
            <div style={{ position: 'relative', height: '230px', background: '#E2EBF0', overflow: 'hidden' }}>
              <img
                src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80"
                alt="Amalfi Coast Map Perspective"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: 'rgba(23, 74, 99, 0.92)',
                  backdropFilter: 'blur(6px)',
                  color: '#FAF9F5',
                  padding: '10px 18px',
                  borderRadius: '30px',
                  border: '1px solid #C9DDE0',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '14px',
                  fontWeight: 600,
                }}
              >
                <MapPin size={16} color="#D6A854" />
                <span>AURA MARINA POSITANO</span>
              </div>
            </div>

            <div style={{ padding: '26px', flex: 1 }}>
              <h4 style={{ fontSize: '1.25rem', color: '#174A63', marginBottom: '8px' }}>
                {settings.address_line1 || 'Via Panoramica 48, Cliffside Promenade'}
              </h4>
              <p style={{ fontSize: '0.9rem', color: '#8C8981', marginBottom: '14px' }}>
                {settings.city_region || 'Positano, Amalfi Coast 84017, Italy'}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#174A63', borderTop: '1px solid #EFEAE0', paddingTop: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Phone size={14} color="#367E94" />
                  <span>{settings.phone || '+39 089 875 219'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Mail size={14} color="#367E94" />
                  <span>{settings.email || 'reservations@auramarina.it'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#68765A' }}>
                  <Compass size={14} color="#D6A854" />
                  <span>{settings.coordinates_display || '40.6281° N, 14.4850° E'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
