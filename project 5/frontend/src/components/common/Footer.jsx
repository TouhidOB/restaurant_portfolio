import React from 'react';
import { useCMS } from '../../context/CMSContext';

export default function Footer() {
  const { content, openReservation } = useCMS();
  const restaurant = content?.restaurant || {};
  const footerSection = content?.sections?.footer || {};

  return (
    <footer
      style={{
        backgroundColor: '#14251D',
        borderTop: '1px solid var(--border-botanical)',
        paddingTop: 'clamp(4.5rem, 8vw, 7rem)',
        paddingBottom: '3rem',
        color: 'var(--text-sand)',
      }}
    >
      <div className="container-tropical">
        {/* Big Editorial Statement Banner */}
        <div
          style={{
            borderBottom: '1px solid var(--border-botanical)',
            paddingBottom: 'clamp(3rem, 5vw, 4.5rem)',
            marginBottom: 'clamp(3rem, 5vw, 4.5rem)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          <span className="section-tag" style={{ alignSelf: 'flex-start' }}>
            {footerSection.eyebrow || 'COLOPHON // BOTANICAL MODERNISM'}
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.4rem, 6.5vw, 5.2rem)',
              color: 'var(--text-ivory)',
              lineHeight: 1.05,
              maxWidth: '22ch',
            }}
          >
            {footerSection.title || 'GOOD FOOD. NATURAL SPACES. BETTER MOMENTS.'}
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1.15rem',
              color: 'var(--sage-mist)',
              maxWidth: '58ch',
            }}
          >
            {footerSection.subtitle ||
              'Verdant is committed to regenerative agriculture, low-waste kitchen practices, and local mangrove preservation.'}
          </p>
        </div>

        {/* 4-Column Logistics Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2.5rem',
            marginBottom: '4rem',
          }}
        >
          {/* Col 1: Brand & Ethos */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: 'var(--accent-terracotta)',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                </svg>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.4rem',
                  color: 'var(--text-ivory)',
                  fontWeight: 600,
                }}
              >
                VERDANT
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              {restaurant.short_description ||
                'A contemporary dining destination immersed in lush botanical landscapes, open-air timber architecture, and nature-inspired gastronomy.'}
            </p>
            <div className="meta-chip" style={{ display: 'inline-block' }}>
              {restaurant.coordinates_display || '25.7617° N, 80.1918° W — PALM GROVE'}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                letterSpacing: '0.12em',
                color: 'var(--text-ivory)',
                marginBottom: '1.25rem',
                textTransform: 'uppercase',
              }}
            >
              EXPLORE
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', padding: 0 }}>
              {[
                { label: 'Culinary Philosophy', href: '#philosophy' },
                { label: 'Chef Signature Highlights', href: '#signatures' },
                { label: 'Seasonal Menu Explorer', href: '#menu' },
                { label: 'Tropical Architecture', href: '#architecture' },
                { label: '3D Spatial Tour', href: '#tour' },
                { label: 'Dining Experience', href: '#experience' },
                { label: 'Botanical Photo Archive', href: '#gallery' },
                { label: 'FAQ & Dining Policies', href: '#faqs' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    style={{
                      fontSize: '0.9rem',
                      color: 'var(--text-sand)',
                      transition: 'color var(--transition-fast)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-terracotta)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-sand)')}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Hours & Service */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                letterSpacing: '0.12em',
                color: 'var(--text-ivory)',
                marginBottom: '1.25rem',
                textTransform: 'uppercase',
              }}
            >
              SERVICE HOURS
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem' }}>
              <div>
                <strong style={{ color: 'var(--text-ivory)', display: 'block' }}>Tuesday — Friday</strong>
                <span>Lunch: 12:00 — 15:30</span>
                <br />
                <span>Dinner: 17:30 — 23:30</span>
              </div>
              <div>
                <strong style={{ color: 'var(--text-ivory)', display: 'block' }}>Saturday — Sunday</strong>
                <span>Continuous Service: 12:00 — 23:30</span>
              </div>
              <div>
                <strong style={{ color: 'var(--accent-terracotta)', display: 'block' }}>Monday</strong>
                <span>Closed for botanical sanctuary maintenance</span>
              </div>
            </div>
          </div>

          {/* Col 4: Location, Booking & CMS */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                letterSpacing: '0.12em',
                color: 'var(--text-ivory)',
                marginBottom: '1.25rem',
                textTransform: 'uppercase',
              }}
            >
              CONCIERGE & CMS
            </h4>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem' }}>
              {restaurant.address || '840 Palm Grove Way, Tropical Corridor'}
              <br />
              {restaurant.city || 'Miami, FL 33139'}
            </p>
            <p style={{ fontSize: '0.88rem', marginBottom: '1.25rem' }}>
              <a href={`tel:${restaurant.phone || '+13055550428'}`} style={{ color: 'var(--text-ivory)', display: 'block' }}>
                {restaurant.phone || '+1 (305) 555-0428'}
              </a>
              <a href={`mailto:${restaurant.email || 'concierge@verdant-dining.com'}`} style={{ color: 'var(--sage-mist)' }}>
                {restaurant.email || 'concierge@verdant-dining.com'}
              </a>
            </p>

            <button
              onClick={openReservation}
              className="btn-terracotta"
              style={{ width: '100%', padding: '0.65rem 1rem', fontSize: '0.85rem', marginBottom: '0.85rem' }}
            >
              <span>BOOK A TABLE</span>
            </button>

            {/* Direct CMS Studio Portal Link with credentials badge */}
            <div
              style={{
                padding: '0.75rem',
                backgroundColor: 'rgba(217, 184, 78, 0.08)',
                border: '1px solid rgba(217, 184, 78, 0.3)',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--accent-citrus)' }}>
                  HEADLESS CMS STUDIO
                </span>
                <span className="meta-chip" style={{ fontSize: '0.62rem', padding: '0.15rem 0.4rem' }}>
                  DJANGO 5
                </span>
              </div>
              <a
                href="/cms/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--text-ivory)',
                  textDecoration: 'underline',
                  marginBottom: '0.35rem',
                }}
              >
                Launch Studio Desk ↗
              </a>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--sage-mist)' }}>
                Login: <code>admin</code> / <code>adminpassword123</code>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Colophon Bar */}
        <div
          style={{
            borderTop: '1px solid var(--border-botanical)',
            paddingTop: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
          }}
        >
          <div>© 2026 VERDANT RESTAURANT GROUP. ALL RIGHTS RESERVED.</div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>PRIVACY DISCLOSURE</span>
            <span>TERMS OF SERVICE</span>
            <span>BOTANICAL ARCHIVES</span>
          </div>
          <div style={{ color: 'var(--accent-citrus)' }}>● SYSTEM STATUS: VERDANT API LIVE</div>
        </div>
      </div>
    </footer>
  );
}
