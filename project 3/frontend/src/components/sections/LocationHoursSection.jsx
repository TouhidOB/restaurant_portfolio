import React from 'react';
import { MapPin, Phone, Mail, Compass, Clock, Anchor, Car, Plane } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function LocationHoursSection() {
  const { data } = useCMS();
  const settings = data.settings || {};
  const hours = data.opening_hours || [];
  const section = data.sections?.location || {};

  return (
    <section id="location" className="section-wrapper" style={{ backgroundColor: '#F6F4EE' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            {section.badge || 'VISIT & ARRIVAL'}
          </div>
          <h2 className="section-title">
            Cliffside Promenade, <em>Positano</em>
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
            gap: '36px',
          }}
        >
          {/* Card 1: Arrival & Transport Modes */}
          <div className="luxury-card" style={{ padding: '36px 32px' }}>
            <h3 style={{ fontSize: '1.75rem', color: '#081721', marginBottom: '24px' }}>
              Coastal Arrival Routes
            </h3>

            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, #0A1C27 0%, #15384B 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid #C5A059' }}>
                <Anchor size={19} color="#DFBA73" />
              </div>
              <div>
                <h4 style={{ fontSize: '1.15rem', color: '#081721', marginBottom: '4px' }}>
                  By Sea / Yacht Tender
                </h4>
                <p style={{ fontSize: '0.9rem', color: '#4A5255', lineHeight: 1.55 }}>
                  Mooring Berth 04 in Positano bay. Private tender shuttle on VHF Ch 72. 4 minutes from anchor to cliffside dock.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#F0ECE4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid #D5CBB9' }}>
                <Car size={19} color="#2A6F85" />
              </div>
              <div>
                <h4 style={{ fontSize: '1.15rem', color: '#081721', marginBottom: '4px' }}>
                  By Road & Valet
                </h4>
                <p style={{ fontSize: '0.9rem', color: '#4A5255', lineHeight: 1.55 }}>
                  Via Panoramica 48. Complimentary white-glove valet parking provided at our private limestone motor court.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#EFF8FA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid #C9DDE0' }}>
                <Plane size={19} color="#253B2F" />
              </div>
              <div>
                <h4 style={{ fontSize: '1.15rem', color: '#081721', marginBottom: '4px' }}>
                  Helicopter Transfers
                </h4>
                <p style={{ fontSize: '0.9rem', color: '#4A5255', lineHeight: 1.55 }}>
                  Coordinated transfers from Ravello helipad (12 mins) or Naples Capodichino International Airport (25 mins).
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: 7-Day Hours Table */}
          <div className="luxury-card" style={{ padding: '36px 32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <Clock size={22} color="#C5A059" />
              <h3 style={{ fontSize: '1.75rem', color: '#081721', margin: 0 }}>
                Hours of Service
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {hours.map((h) => (
                <div
                  key={h.id || h.day_of_week}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingBottom: '12px',
                    borderBottom: '1px solid rgba(197, 160, 89, 0.2)',
                    fontSize: '13.5px',
                  }}
                >
                  <span style={{ fontWeight: 600, color: '#081721', minWidth: '90px' }}>
                    {h.day_of_week}
                  </span>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', color: '#081721', fontWeight: 600, display: 'block' }}>
                      {h.dinner_hours}
                    </span>
                    <span style={{ fontSize: '11.5px', color: '#7A7E80' }}>
                      Lunch: {h.lunch_hours}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '22px', background: 'rgba(197, 160, 89, 0.1)', padding: '14px 18px', borderRadius: '10px', border: '1px solid rgba(197, 160, 89, 0.3)', fontSize: '12.5px', color: '#081721' }}>
              Sunset aperitivo and raw bar opens daily at 18:00 on the Belvedere Pergola.
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
            }}
          >
            {/* Visual Map Imagery */}
            <div style={{ position: 'relative', height: '240px', background: '#D6E6EC', overflow: 'hidden' }}>
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
                  background: 'rgba(8, 23, 33, 0.94)',
                  backdropFilter: 'blur(8px)',
                  color: '#DFBA73',
                  padding: '12px 22px',
                  borderRadius: '30px',
                  border: '1px solid #C5A059',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '15px',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                }}
              >
                <MapPin size={17} color="#DFBA73" />
                <span>AURA MARINA POSITANO</span>
              </div>
            </div>

            <div style={{ padding: '30px', flex: 1 }}>
              <h4 style={{ fontSize: '1.35rem', color: '#081721', marginBottom: '6px' }}>
                {settings.address_line1 || 'Via Panoramica 48, Cliffside Promenade'}
              </h4>
              <p style={{ fontSize: '0.92rem', color: '#7A7E80', marginBottom: '18px' }}>
                {settings.city_region || 'Positano, Amalfi Coast 84017, Italy'}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px', color: '#081721', borderTop: '1px solid rgba(197, 160, 89, 0.25)', paddingTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Phone size={15} color="#C5A059" />
                  <span>{settings.phone || '+39 089 875 219'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Mail size={15} color="#C5A059" />
                  <span>{settings.email || 'reservations@auramarina.it'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-mono)', fontSize: '11.5px', color: '#253B2F' }}>
                  <Compass size={15} color="#C5A059" />
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
