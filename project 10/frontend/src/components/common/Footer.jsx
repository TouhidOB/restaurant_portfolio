import React from 'react';
import { useCMS } from '../../context/CMSContext';

export default function Footer() {
  const { content, lang, t, openReservation } = useCMS();
  const hero = content?.hero || {};
  const loc = content?.location || {};
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: '#192433',
        borderTop: '2px solid var(--color-terracotta)',
        padding: '5rem 2rem 2.5rem',
        color: 'var(--color-jute)',
        position: 'relative',
      }}
    >
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
        {/* Brand Column */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                background: 'linear-gradient(135deg, var(--color-terracotta) 0%, var(--color-indigo-card) 100%)',
                border: '1px solid var(--color-brass)',
                borderRadius: '3px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-ivory)',
                fontFamily: 'var(--font-display-bn)',
                fontSize: '1.3rem',
                fontWeight: 700,
              }}
            >
              ঐ
            </div>
            <h3 style={{ fontFamily: lang === 'bn' ? 'var(--font-display-bn)' : 'var(--font-display-en)', fontSize: '1.5rem', color: 'var(--color-ivory)', letterSpacing: '0.06em' }}>
              {t(hero.restaurant_name) || 'BENGAL HERITAGE DINING'}
            </h3>
          </div>
          <p style={{ fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '320px' }}>
            {t(hero.lead_description)}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-brass)', boxShadow: '0 0 8px var(--color-brass)' }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--color-brass)', fontFamily: 'var(--font-body-en)', fontWeight: 600 }}>
              Gulshan Heritage Enclave &bull; Open for Dining
            </span>
          </div>
        </div>

        {/* Location & Contact Column */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-body-en)', fontSize: '0.82rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-brass)', marginBottom: '1.25rem', fontWeight: 700 }}>
            {lang === 'bn' ? 'ঠিকানা ও যোগাযোগ' : 'Heritage Coordinates'}
          </h4>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-ivory)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
            {t(loc.address)}
          </p>
          <div style={{ fontSize: '0.86rem', color: 'var(--color-brass)' }}>
            <strong>Phone:</strong> {loc.phone || '+880 1711-234567'}
          </div>
          <div style={{ fontSize: '0.86rem', color: 'var(--color-jute)', marginTop: '0.25rem' }}>
            <strong>WhatsApp:</strong> {loc.whatsapp || '+880 1711-234567'}
          </div>
          <div style={{ fontSize: '0.86rem', color: 'var(--color-jute)', marginTop: '0.25rem' }}>
            <strong>Email:</strong> {loc.email || 'hospitality@bengalheritage.com'}
          </div>
        </div>

        {/* Service Hours Column */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-body-en)', fontSize: '0.82rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-brass)', marginBottom: '1.25rem', fontWeight: 700 }}>
            {lang === 'bn' ? 'পরিবেশন সময়সূচি' : 'Service Schedule'}
          </h4>
          <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--color-ivory)', marginBottom: '0.5rem' }}>
            {t(loc.hours)}
          </p>
          <p style={{ fontSize: '0.82rem', color: 'var(--color-jute)', marginBottom: '1.5rem' }}>
            {lang === 'bn' ? 'ঐতিহ্যবাহী মেজবানি ও থালি পরিবেশন প্রতিদিন দুপুর এবং সন্ধ্যায়।' : 'Ancestral feasts & thalis served daily during lunch and dinner sessions.'}
          </p>
          <button
            onClick={() => openReservation()}
            className="btn-heritage-terracotta"
            style={{ padding: '0.65rem 1.4rem', fontSize: '0.78rem' }}
          >
            {lang === 'bn' ? 'টেবিল বুকিং করুন' : 'Table Reservation'}
          </button>
        </div>

        {/* Administration & Technical Architecture */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-body-en)', fontSize: '0.82rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-brass)', marginBottom: '1.25rem', fontWeight: 700 }}>
            {lang === 'bn' ? 'সিস্টেম ও সিএমএস' : 'System & Studio'}
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.86rem' }}>
            <li>
              <a href="http://127.0.0.1:8001/cms/" target="_blank" rel="noreferrer" style={{ color: 'var(--color-brass)', textDecoration: 'none' }}>
                &rarr; Bengali Heritage CMS Studio (Admin)
              </a>
            </li>
            <li>
              <a href="http://127.0.0.1:8001/api/content/" target="_blank" rel="noreferrer" style={{ color: 'var(--color-jute)', textDecoration: 'none' }}>
                &bull; Public Headless Content API (JSON)
              </a>
            </li>
            <li>
              <a href="#tour" style={{ color: 'var(--color-jute)', textDecoration: 'none' }}>
                &bull; 3D Restaurant Virtual Tour
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.8rem' }}>
        <div>
          {content?.footer?.copyright || `© ${currentYear} BENGAL HERITAGE DINING. All rights reserved.`}
        </div>
        <div style={{ color: 'var(--color-brass)', fontFamily: 'var(--font-body-en)' }}>
          Decoupled Architecture &bull; React 18 + Three.js &bull; Django 5 + DRF
        </div>
      </div>
    </footer>
  );
}
