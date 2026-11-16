import React from 'react';
import { useCMS } from '../../context/CMSContext';

export default function Footer({ onNavigate }) {
  const { content, openReservation } = useCMS();
  const f = content?.footer || {};
  const loc = content?.location || {};

  const handleLinkClick = (e, path) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const hoursString = typeof loc.hours === 'object' ? loc.hours.en || Object.values(loc.hours)[0] : loc.hours;

  return (
    <footer
      id="footer"
      style={{
        backgroundColor: '#1A2B24',
        color: '#F4F0E6',
        padding: '80px 0 36px 0',
        borderTop: '2px solid #A87958',
      }}
    >
      <div
        className="container"
        style={{
          padding: '0 24px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '40px',
            marginBottom: '60px',
          }}
        >
          {/* Col 1: Brand & Ethos */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <span style={{ fontSize: '24px' }}>🌿</span>
              <span
                style={{
                  fontFamily: 'var(--font-display, "Cormorant Garamond")',
                  fontSize: '22px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  color: '#FAF7F0',
                }}
              >
                VERDANT ATRIUM
              </span>
            </div>
            <p
              style={{
                fontSize: '13.5px',
                lineHeight: 1.7,
                color: 'rgba(244, 240, 230, 0.78)',
                marginBottom: '18px',
              }}
            >
              A contemporary botanical glasshouse café where natural daylight, living tropical greenery, and artisanal coffee harmonize into restorative daily rituals.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a href={f.social?.instagram || 'https://instagram.com'} target="_blank" rel="noreferrer" style={{ color: '#A6B5A0', fontSize: '13px', textDecoration: 'none' }}>Instagram ↗</a>
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>
              <a href={f.social?.facebook || 'https://facebook.com'} target="_blank" rel="noreferrer" style={{ color: '#A6B5A0', fontSize: '13px', textDecoration: 'none' }}>Facebook ↗</a>
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>
              <a href={f.social?.pinterest || 'https://pinterest.com'} target="_blank" rel="noreferrer" style={{ color: '#A6B5A0', fontSize: '13px', textDecoration: 'none' }}>Pinterest ↗</a>
            </div>
          </div>

          {/* Col 2: Sanctuary & Hours */}
          <div>
            <div
              style={{
                fontSize: '11.5px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#A87958',
                fontWeight: 600,
                marginBottom: '12px',
              }}
            >
              Hours &amp; Service
            </div>
            <p style={{ fontSize: '13.5px', color: 'rgba(244, 240, 230, 0.85)', lineHeight: 1.6, margin: '0 0 10px 0' }}>
              {hoursString}
            </p>
            <p style={{ fontSize: '12.5px', color: 'rgba(244, 240, 230, 0.65)', lineHeight: 1.5, margin: 0 }}>
              Kitchen closes daily at 6:30 PM. Pour-overs, cold brew, and pastries served until close.
            </p>
            <div style={{ marginTop: '1.25rem' }}>
              <button
                onClick={() => openReservation()}
                style={{
                  backgroundColor: '#A87958',
                  color: '#FAF7F0',
                  border: 'none',
                  padding: '7px 16px',
                  borderRadius: '2px',
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Table Reservation
              </button>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <div
              style={{
                fontSize: '11.5px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#A87958',
                fontWeight: 600,
                marginBottom: '12px',
              }}
            >
              Glasshouse Navigation
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><a href="/story" onClick={(e) => handleLinkClick(e, '/story')} style={{ color: 'rgba(244, 240, 230, 0.75)', textDecoration: 'none', fontSize: '13px' }}>The Greenhouse Ethos</a></li>
              <li><a href="/signatures" onClick={(e) => handleLinkClick(e, '/signatures')} style={{ color: 'rgba(244, 240, 230, 0.75)', textDecoration: 'none', fontSize: '13px' }}>Signature Drinks</a></li>
              <li><a href="/menu" onClick={(e) => handleLinkClick(e, '/menu')} style={{ color: 'rgba(244, 240, 230, 0.75)', textDecoration: 'none', fontSize: '13px' }}>Seasonal Café Menu</a></li>
              <li><a href="/tour" onClick={(e) => handleLinkClick(e, '/tour')} style={{ color: 'rgba(244, 240, 230, 0.75)', textDecoration: 'none', fontSize: '13px' }}>3D Virtual Tour</a></li>
              <li><a href="/space" onClick={(e) => handleLinkClick(e, '/space')} style={{ color: 'rgba(244, 240, 230, 0.75)', textDecoration: 'none', fontSize: '13px' }}>Conservatory Architecture</a></li>
              <li><a href="/experience" onClick={(e) => handleLinkClick(e, '/experience')} style={{ color: 'rgba(244, 240, 230, 0.75)', textDecoration: 'none', fontSize: '13px' }}>Botanical Gatherings</a></li>
              <li><a href="/blog" onClick={(e) => handleLinkClick(e, '/blog')} style={{ color: 'rgba(244, 240, 230, 0.75)', textDecoration: 'none', fontSize: '13px' }}>Glasshouse Gazette</a></li>
              <li><a href="/contact" onClick={(e) => handleLinkClick(e, '/contact')} style={{ color: 'rgba(244, 240, 230, 0.75)', textDecoration: 'none', fontSize: '13px' }}>Location &amp; Directions</a></li>
            </ul>
          </div>

          {/* Col 4: Address & Concierge */}
          <div>
            <div
              style={{
                fontSize: '11.5px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#A87958',
                fontWeight: 600,
                marginBottom: '12px',
              }}
            >
              Sanctuary Enclave
            </div>
            <p style={{ fontSize: '13.5px', color: 'rgba(244, 240, 230, 0.85)', lineHeight: 1.6, margin: '0 0 8px 0' }}>
              {loc.address || '42 Conservatory Lane, Botanical Arts District'}
            </p>
            <p style={{ fontSize: '13px', color: '#A6B5A0', margin: '0 0 16px 0' }}>
              {loc.phone || '+1 (415) 890-4321'}
            </p>
            <a
              href="http://127.0.0.1:8001/cms/"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                backgroundColor: 'rgba(168, 121, 88, 0.2)',
                border: '1px solid #A87958',
                color: '#FFD2B8',
                borderRadius: '2px',
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              🔒 Staff CMS Studio
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(166, 181, 160, 0.2)',
            paddingTop: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            fontSize: '12px',
            color: 'rgba(244, 240, 230, 0.6)',
          }}
        >
          <div>{f.copyright || '© 2026 VERDANT ATRIUM BOTANICAL GLASSHOUSE CAFÉ. All rights reserved.'}</div>
          <div style={{ display: 'flex', gap: '18px' }}>
            <span>Architecture meets Nature</span>
            <span>•</span>
            <span>Single-Origin Specialty Coffee</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
