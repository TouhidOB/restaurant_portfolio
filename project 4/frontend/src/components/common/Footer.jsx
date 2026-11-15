import React from 'react';
import { useCMS } from '../../context/CMSContext';

export default function Footer({ onNavigate, onNavigateHome, onOpenReservation }) {
  const { content, openReservation } = useCMS();
  const r = content.restaurant || {};
  const s15 = content.sections?.footer || {};

  const handleLink = (e, path) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.href = path;
    }
  };

  return (
    <footer
      id="colophon"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderTop: '2px solid var(--border-steel)',
        paddingTop: 'clamp(4rem, 8vw, 6rem)',
        paddingBottom: '3rem',
        position: 'relative',
      }}
    >
      <div className="container-brutal">
        {/* Oversized Brand Closing Statement */}
        <div style={{ marginBottom: '4rem' }}>
          <div className="section-tag" style={{ marginBottom: '1rem' }}>
            SECTION 15 // {s15.eyebrow || 'COLOPHON'}
          </div>
          <h2
            style={{
              fontSize: 'clamp(2.4rem, 6.5vw, 5.5rem)',
              lineHeight: 1.05,
              fontWeight: 700,
              maxWidth: '22ch',
              marginBottom: '1.5rem',
            }}
          >
            {s15.title || 'GOOD FOOD. STRONG FORMS. LASTING IMPRESSIONS.'}
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.9rem, 1.4vw, 1.15rem)',
              color: 'var(--text-secondary)',
              maxWidth: '65ch',
            }}
          >
            {s15.subtitle || r.short_description}
          </p>
        </div>

        {/* 4-Column Brutalist Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2.5rem',
            borderTop: '1px solid var(--border-steel)',
            paddingTop: '3rem',
            marginBottom: '3.5rem',
          }}
        >
          {/* Column 1: Coordinates & Sector */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-orange)', marginBottom: '0.85rem' }}>
              01 // LOCATION SPECS
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem' }}>
              {r.name || 'MONOLITH'}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {r.address}<br />
              {r.city}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              {r.coordinates_display}
            </div>
          </div>

          {/* Column 2: Hours */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-orange)', marginBottom: '0.85rem' }}>
              02 // OPERATIONAL HOURS
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem' }}>
              DINING ROOM &amp; BAR
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {r.opening_hours_summary}<br />
              SEATING BLOCKS: 17:30 / 19:45 / 22:00
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              WALK-INS AT STEEL BAR WELCOME
            </div>
          </div>

          {/* Column 3: Communications */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-orange)', marginBottom: '0.85rem' }}>
              03 // DIRECT DISPATCH
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              TEL: {r.phone}<br />
              EMAIL: {r.email}
            </div>
            <div style={{ marginTop: '0.75rem' }}>
              <a
                href={`mailto:${r.email}`}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--accent-orange)',
                  textDecoration: 'underline',
                }}
              >
                DISPATCH INQUIRY &rarr;
              </a>
            </div>
          </div>

          {/* Column 4: Studio Portal */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-orange)', marginBottom: '0.85rem' }}>
              04 // CMS ENGINE
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem' }}>
              STUDIO TERMINAL
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Django REST Framework powered headless management interface.
            </p>
            <a
              href="/cms/"
              className="btn-brutal-secondary"
              style={{
                display: 'inline-block',
                border: '1px solid var(--accent-orange)',
                color: 'var(--accent-orange)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                padding: '0.5rem 1rem',
              }}
            >
              ACCESS CMS STUDIO &rarr;
            </a>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            borderTop: '1px solid var(--border-steel)',
            paddingTop: '2rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
          }}
        >
          <div>
            {s15.custom_content?.copyright || '© 2026 MONOLITH RESTAURANT GROUP. ALL RIGHTS RESERVED.'}
          </div>
          <div>
            ARCHITECTURAL BRUTALISM &bull; THREE.JS &bull; REACT 18 &bull; DJANGO 5
          </div>
        </div>
      </div>
    </footer>
  );
}
