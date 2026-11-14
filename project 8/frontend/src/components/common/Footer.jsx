import React from 'react';
import { useCMS } from '../../context/CMSContext';

export default function Footer() {
  const { content, openReservation } = useCMS();
  const loc = content?.location || {};
  const brandName = content?.hero?.restaurant_name || 'URBAN TABLE';

  return (
    <footer
      style={{
        backgroundColor: '#111314',
        borderTop: '2px solid var(--color-brick)',
        paddingTop: '5rem',
        paddingBottom: '3rem',
        position: 'relative',
        color: 'var(--color-steel)',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem',
          }}
        >
          {/* Column 1: Brand & Philosophy */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.25rem' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '2px',
                  background: 'var(--color-brick)',
                  border: '1px solid var(--color-copper)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-copper)',
                  fontSize: '1rem',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                }}
              >
                UT
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--color-offwhite)',
                }}
              >
                {brandName}
              </h3>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '1.5rem', color: 'var(--color-concrete)' }}>
              Open Fire & Craft Smokehouse housed inside a restored 1920s locomotive foundry. Uncompromised meats, roaring hearths, and industrial culture.
            </p>
            <button
              onClick={() => openReservation()}
              className="btn-primary"
              style={{ fontSize: '0.78rem', padding: '0.65rem 1.4rem' }}
            >
              Reserve Your Table
            </button>
          </div>

          {/* Column 2: Hours */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--color-copper)',
                fontSize: '1.15rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
              }}
            >
              Hearth Operating Hours
            </h4>
            <div style={{ fontSize: '0.88rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <div>
                <strong style={{ color: 'var(--color-offwhite)', display: 'block' }}>Tuesday – Thursday</strong>
                <span>4:00 PM – 11:00 PM (Smoke & Grill)</span>
              </div>
              <div>
                <strong style={{ color: 'var(--color-offwhite)', display: 'block' }}>Friday & Saturday</strong>
                <span>12:00 PM – Midnight (Late Night Bar)</span>
              </div>
              <div>
                <strong style={{ color: 'var(--color-offwhite)', display: 'block' }}>Sunday Smokehouse</strong>
                <span>12:00 PM – 10:00 PM</span>
              </div>
              <div>
                <strong style={{ color: 'var(--color-offwhite)', display: 'block' }}>Monday</strong>
                <span>Closed for Kitchen Cure & Prep</span>
              </div>
            </div>
          </div>

          {/* Column 3: Contact & Address */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--color-copper)',
                fontSize: '1.15rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
              }}
            >
              The Warehouse
            </h4>
            <div style={{ fontSize: '0.88rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <p style={{ color: 'var(--color-concrete)' }}>{loc.address || '420 Ironworks Avenue, Warehouse District'}</p>
              <p>Phone: <a href={`tel:${loc.phone}`} style={{ color: 'var(--color-offwhite)', textDecoration: 'none', fontWeight: 600 }}>{loc.phone || '+1 (555) 789-2044'}</a></p>
              <p>Email: <a href={`mailto:${loc.email}`} style={{ color: 'var(--color-copper)', textDecoration: 'none' }}>{loc.email || 'table@urbankitchen.com'}</a></p>
              <p style={{ marginTop: '0.4rem', fontSize: '0.82rem', color: 'var(--color-concrete)' }}>
                {loc.transit || 'Foundry Station (Subway Lines B & D) • Free On-Site Parking'}
              </p>
            </div>
          </div>

          {/* Column 4: Admin & API */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--color-copper)',
                fontSize: '1.15rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
              }}
            >
              Admin & System
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem' }}>
              <li>
                <a
                  href="http://127.0.0.1:8001/cms/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--color-copper)', textDecoration: 'none', fontWeight: 700 }}
                >
                  ⚙ Industrial CMS Studio (Port 8001) ↗
                </a>
              </li>
              <li>
                <a
                  href="http://127.0.0.1:8001/admin/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--color-concrete)', textDecoration: 'none' }}
                >
                  Django SuperAdmin ↗
                </a>
              </li>
              <li>
                <a
                  href="http://127.0.0.1:8001/api/content/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--color-concrete)', textDecoration: 'none' }}
                >
                  Public JSON REST API (/api/content/) ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.8rem',
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} {brandName}. All rights reserved. Raw architecture meets contemporary culinary culture.
          </div>
          <div>
            <span>Architecture: React 18 + Three.js + Django 5 REST Framework</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
