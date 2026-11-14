import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S14_Location() {
  const { content } = useCMS();
  const locData = content?.editorial_sections?.s14_location || {
    badge: "HOW TO REACH US",
    title: "Arrival at Saint-Jean-Cap-Ferrat",
    address: "14 Chemin des Calanques, 06230 Saint-Jean-Cap-Ferrat, Côte d'Azur, France",
    phone: "+33 4 93 01 88 00",
    email: "concierge@villariviera.com",
    tender_access: "Private tender dock coordinates: 43°41'22.4\"N 7°20'08.2\"E (VHF Channel 72)",
    valet: "Complimentary valet parking & secure vehicle storage on arrival.",
    helicopter: "Private helipad transfers available via Monaco Heliport (12 min flight)."
  };

  return (
    <section id="location" className="editorial-section" style={{ backgroundColor: 'var(--c-limestone-light)' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
          <span className="text-eyebrow" style={{ display: 'block', marginBottom: '8px' }}>
            {locData.badge}
          </span>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
              color: 'var(--c-navy)',
              lineHeight: 1.15,
              marginBottom: '16px',
            }}
          >
            {locData.title}
          </h2>
          <p style={{ color: '#595752', fontSize: '1rem', lineHeight: 1.7 }}>
            A secluded private peninsula overlooking the azure bays of the French Riviera.
          </p>
        </div>

        {/* Arrival Logistics Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '3rem',
          }}
        >
          {/* Card 1: Coastal Address */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '32px 26px',
              border: '1px solid var(--c-border)',
            }}
          >
            <div style={{ fontSize: '26px', marginBottom: '14px' }}>📍</div>
            <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.45rem', color: 'var(--c-navy)', marginBottom: '8px' }}>
              Estate Address
            </h4>
            <p style={{ color: '#595752', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '14px' }}>
              {locData.address}
            </p>
            <div style={{ fontSize: '0.85rem', color: 'var(--c-terracotta)', fontWeight: 600 }}>
              Tel: {locData.phone}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#596448' }}>
              {locData.email}
            </div>
          </div>

          {/* Card 2: Yacht Tender Pier */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '32px 26px',
              border: '1px solid var(--c-border)',
            }}
          >
            <div style={{ fontSize: '26px', marginBottom: '14px' }}>⚓</div>
            <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.45rem', color: 'var(--c-navy)', marginBottom: '8px' }}>
              Private Tender Dock
            </h4>
            <p style={{ color: '#595752', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '14px' }}>
              {locData.tender_access}
            </p>
            <span className="badge-tag">
              Mooring Assistance Available
            </span>
          </div>

          {/* Card 3: Valet & Heliport */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '32px 26px',
              border: '1px solid var(--c-border)',
            }}
          >
            <div style={{ fontSize: '26px', marginBottom: '14px' }}>🚁</div>
            <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.45rem', color: 'var(--c-navy)', marginBottom: '8px' }}>
              Valet & Air Transfers
            </h4>
            <p style={{ color: '#595752', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '10px' }}>
              {locData.valet}
            </p>
            <p style={{ color: '#595752', fontSize: '0.92rem', lineHeight: 1.6 }}>
              {locData.helicopter}
            </p>
          </div>
        </div>

        {/* Coastal Map Simulation Container */}
        <div
          style={{
            backgroundColor: '#1E2F3C',
            borderRadius: '14px',
            padding: '40px',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
            border: '1px solid rgba(233, 223, 207, 0.25)',
          }}
        >
          <div>
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FFD2B8', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
              GPS NAVIGATION COORDINATES
            </span>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: '#F7F3EA', fontWeight: 600 }}>
              43° 41' 22.4" N &nbsp;|&nbsp; 7° 20' 08.2" E
            </div>
            <p style={{ color: '#A9BDB5', fontSize: '0.88rem', marginTop: '6px' }}>
              25 minutes from Nice Côte d'Azur International Airport (NCE) &bull; 18 minutes from Monaco Port Hercule
            </p>
          </div>

          <a
            href="https://maps.google.com/?q=Saint-Jean-Cap-Ferrat"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-white"
          >
            Open in Google Maps &rarr;
          </a>
        </div>

      </div>
    </section>
  );
}
