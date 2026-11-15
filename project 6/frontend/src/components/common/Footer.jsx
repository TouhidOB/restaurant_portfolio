import React from 'react';
import { useCMS } from '../../context/CMSContext';

export default function Footer({ onNavigate }) {
  const { content, openReservation } = useCMS();
  const restaurant = content?.restaurant || {};
  const footerSection = content?.sections?.footer || {};

  return (
    <footer
      style={{
        backgroundColor: '#090F1B',
        borderTop: '1px solid var(--border-diner)',
        position: 'relative',
        color: 'var(--text-cream)',
      }}
    >
      {/* Iconic 1950s Checkerboard Accent Line */}
      <div className="checkerboard-trim" />

      <div className="container-diner" style={{ paddingTop: 'clamp(4.5rem, 8vw, 7rem)', paddingBottom: '3rem' }}>
        {/* Editorial Statement Banner */}
        <div
          style={{
            borderBottom: '1px solid var(--border-diner)',
            paddingBottom: 'clamp(3rem, 5vw, 4.5rem)',
            marginBottom: 'clamp(3rem, 5vw, 4.5rem)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          <span className="section-tag" style={{ alignSelf: 'flex-start' }}>
            {footerSection.eyebrow || 'FINAL BRAND STATEMENT // EST. 1955'}
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 6.5vw, 5.2rem)',
              color: '#FFFFFF',
              lineHeight: 1.05,
              maxWidth: '22ch',
              textShadow: '0 0 20px rgba(67, 217, 232, 0.25)',
            }}
          >
            {footerSection.title || 'GOOD TIMES NEVER GO OUT OF STYLE.'}
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1.15rem',
              color: 'var(--text-muted)',
              maxWidth: '58ch',
            }}
          >
            {footerSection.subtitle ||
              'Stardust Diner celebrates timeless roadside hospitality, sizzling flat tops, and futuristic atomic age design.'}
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
                  backgroundColor: 'var(--cherry-red)',
                  borderRadius: 'var(--radius-xs)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFF',
                  fontWeight: 700,
                }}
              >
                ★
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.4rem',
                  color: '#FFFFFF',
                  fontWeight: 700,
                }}
              >
                STARDUST
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              {restaurant.short_description ||
                'A neon-infused destination where classic 1950s American diner culture converges with atomic-age science fiction and modern comfort gastronomy.'}
            </p>
            <div className="meta-chip" style={{ display: 'inline-block' }}>
              {restaurant.coordinates_display || '41.8781° N, 87.6298° W — ATOMIC DISTRICT'}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                letterSpacing: '0.12em',
                color: 'var(--neon-cyan)',
                marginBottom: '1.25rem',
                textTransform: 'uppercase',
              }}
            >
              EXPLORE REPERTOIRE
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', padding: 0 }}>
              {[
                { label: 'Diner Philosophy', path: '/philosophy' },
                { label: 'Signature Dishes', path: '/signatures' },
                { label: 'Full Menu Explorer', path: '/menu' },
                { label: 'The Diner Story', path: '/story' },
                { label: 'Diner Architecture', path: '/architecture' },
                { label: '3D Spatial Tour', path: '/tour' },
                { label: 'The Diner Experience', path: '/experience' },
                { label: 'Location & Contact', path: '/contact' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      if (onNavigate) onNavigate(item.path);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{
                      fontSize: '0.9rem',
                      color: 'var(--text-cream)',
                      transition: 'color var(--transition-fast)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--neon-cyan)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-cream)')}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Service Hours */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                letterSpacing: '0.12em',
                color: 'var(--neon-cyan)',
                marginBottom: '1.25rem',
                textTransform: 'uppercase',
              }}
            >
              DINER SERVICE HOURS
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem' }}>
              <div>
                <strong style={{ color: '#FFFFFF', display: 'block' }}>Monday — Thursday</strong>
                <span>Breakfast & Lunch: 08:00 — 16:00</span>
                <br />
                <span>Dinner & Malts: 17:00 — 00:00</span>
              </div>
              <div>
                <strong style={{ color: 'var(--atomic-yellow)', display: 'block' }}>Friday — Sunday</strong>
                <span>Continuous Service: 08:00 — 02:00</span>
                <br />
                <span>Midnight Patty Melt Service</span>
              </div>
            </div>
          </div>

          {/* Col 4: Location, Concierge & CMS */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                letterSpacing: '0.12em',
                color: 'var(--neon-cyan)',
                marginBottom: '1.25rem',
                textTransform: 'uppercase',
              }}
            >
              LOCATION & STUDIO
            </h4>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem' }}>
              {restaurant.address || '550 Neon Boulevard, Atomic District'}
              <br />
              {restaurant.city || 'Chicago, IL 60611'}
            </p>
            <p style={{ fontSize: '0.88rem', marginBottom: '1.25rem' }}>
              <a href={`tel:${restaurant.phone || '+13125551955'}`} style={{ color: '#FFFFFF', display: 'block' }}>
                {restaurant.phone || '+1 (312) 555-1955'}
              </a>
              <a href={`mailto:${restaurant.email || 'concierge@stardustdiner.com'}`} style={{ color: 'var(--text-muted)' }}>
                {restaurant.email || 'concierge@stardustdiner.com'}
              </a>
            </p>

            <button
              onClick={openReservation}
              className="btn-cherry"
              style={{ width: '100%', padding: '0.65rem 1rem', fontSize: '0.85rem', marginBottom: '0.85rem' }}
            >
              <span>BOOK A BOOTH</span>
            </button>

            {/* Direct CMS Studio Portal Link with credentials badge */}
            <div
              style={{
                padding: '0.75rem',
                backgroundColor: 'rgba(67, 217, 232, 0.08)',
                border: '1px solid rgba(67, 217, 232, 0.3)',
                borderRadius: 'var(--radius-xs)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--neon-cyan)' }}>
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
                  color: '#FFFFFF',
                  textDecoration: 'underline',
                  marginBottom: '0.35rem',
                }}
              >
                Launch Studio Desk ↗
              </a>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)' }}>
                Login: <code>admin</code> / <code>adminpassword123</code>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid var(--border-diner)',
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
          <div>© 2026 STARDUST DINER HOSPITALITY GROUP. ALL RIGHTS RESERVED.</div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>PRIVACY DISCLOSURE</span>
            <span>TERMS OF SERVICE</span>
            <span>JUKEBOX ARCHIVES</span>
          </div>
          <div style={{ color: 'var(--neon-cyan)' }}>● SYSTEM STATUS: RETRO API LIVE</div>
        </div>
      </div>
    </footer>
  );
}
