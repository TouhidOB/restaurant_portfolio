import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S14_Location() {
  const { content } = useCMS();
  const locData = content?.editorial_sections?.s14_location || {
    badge: "FIND US IN SEOUL",
    title: "Location & Night Arrival",
    address: "28 Wausan-ro 21-gil, Mapo-gu, Seoul, South Korea (Hongdae Night Market)",
    subway: "Subway: Line 2 Hongik Univ. Station, Exit 9 (5 min walk through pedestrian street)",
    phone: "+82 2 312 9988",
    email: "hello@seoulstreetfood.com",
    hours: "Daily: 17:00 – 04:00 (Kitchen closes at 03:15)"
  };

  return (
    <section id="location" className="editorial-section" style={{ backgroundColor: '#0B0D0F' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
          <span className="text-eyebrow" style={{ display: 'block', marginBottom: '8px' }}>
            {locData.badge}
          </span>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
              color: '#F6F4F0',
              lineHeight: 1.15,
              marginBottom: '16px',
            }}
          >
            {locData.title}
          </h2>
          <p style={{ color: 'var(--color-silver)', fontSize: '1rem', lineHeight: 1.7 }}>
            Located in the pulsing heart of the Hongdae midnight pedestrian alley.
          </p>
        </div>

        {/* Location Logistics Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '3rem',
          }}
        >
          {/* Card 1: Address */}
          <div
            style={{
              backgroundColor: 'var(--color-charcoal)',
              borderRadius: '12px',
              padding: '32px 26px',
              border: '1px solid var(--color-border)',
            }}
          >
            <div style={{ fontSize: '28px', marginBottom: '14px' }}>📍</div>
            <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.4rem', color: '#FFFFFF', marginBottom: '8px' }}>
              Hongdae Street Pocha
            </h4>
            <p style={{ color: 'var(--color-silver)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '14px' }}>
              {locData.address}
            </p>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-magenta)', fontWeight: 700 }}>
              Tel: {locData.phone}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-cyan)' }}>
              {locData.email}
            </div>
          </div>

          {/* Card 2: Subway Directions */}
          <div
            style={{
              backgroundColor: 'var(--color-charcoal)',
              borderRadius: '12px',
              padding: '32px 26px',
              border: '1px solid var(--color-border)',
            }}
          >
            <div style={{ fontSize: '28px', marginBottom: '14px' }}>🚇</div>
            <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.4rem', color: '#FFFFFF', marginBottom: '8px' }}>
              Subway Access
            </h4>
            <p style={{ color: 'var(--color-silver)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '14px' }}>
              {locData.subway}
            </p>
            <span className="badge-tag">
              Line 2 &bull; AREX Airport Express
            </span>
          </div>

          {/* Card 3: Late Night Hours */}
          <div
            style={{
              backgroundColor: 'var(--color-charcoal)',
              borderRadius: '12px',
              padding: '32px 26px',
              border: '1px solid var(--color-border)',
            }}
          >
            <div style={{ fontSize: '28px', marginBottom: '14px' }}>🏮</div>
            <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.4rem', color: '#FFFFFF', marginBottom: '8px' }}>
              Midnight Hours
            </h4>
            <p style={{ color: 'var(--color-silver)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '10px' }}>
              {locData.hours}
            </p>
            <span className="badge-tag" style={{ color: 'var(--color-amber)', borderColor: 'rgba(255, 179, 71, 0.4)' }}>
              Late Night Alcohol & Anju License
            </span>
          </div>
        </div>

        {/* GPS Map Coordinates Simulation Box */}
        <div
          style={{
            backgroundColor: 'var(--color-charcoal)',
            borderRadius: '14px',
            padding: '40px',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
            border: '1px solid rgba(33, 212, 232, 0.3)',
            boxShadow: '0 0 25px rgba(33, 212, 232, 0.1)',
          }}
        >
          <div>
            <span style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.78rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-cyan)', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
              SEOUL MAP COORDINATES
            </span>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.8rem', color: '#F6F4F0', fontWeight: 800 }}>
              37° 33' 18.2" N &nbsp;|&nbsp; 126° 55' 24.1" E
            </div>
            <p style={{ color: 'var(--color-silver)', fontSize: '0.88rem', marginTop: '6px' }}>
              Mapo-gu, Hongdae Youth Walking Street • 200m from Hongik Children's Park
            </p>
          </div>

          <a
            href="https://maps.google.com/?q=Hongdae+Street+Seoul"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Open in Google Maps &rarr;
          </a>
        </div>

      </div>
    </section>
  );
}
