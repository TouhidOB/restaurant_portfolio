import React from 'react';
import { useCMS } from '../../context/CMSContext';

export default function Footer({ onNavigate }) {
  const { content, lang, t, openReservation } = useCMS();
  const hero = content?.hero || {};
  const loc = content?.location || {};
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e, path) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const hoursString = typeof loc.hours === 'object' ? t(loc.hours) : loc.hours;

  return (
    <footer
      style={{
        backgroundColor: '#192433',
        borderTop: '2px solid var(--color-terracotta, #A6533B)',
        padding: '5rem 2rem 2.5rem',
        color: '#C8B18D',
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
                background: 'linear-gradient(135deg, #A6533B 0%, #223046 100%)',
                border: '1px solid #D4AF37',
                borderRadius: '3px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#F4EBDD',
                fontFamily: 'var(--font-display-bn, "Noto Serif Bengali")',
                fontSize: '1.3rem',
                fontWeight: 700,
              }}
            >
              ঐ
            </div>
            <h3 style={{ fontFamily: lang === 'bn' ? 'var(--font-display-bn, "Noto Serif Bengali")' : 'var(--font-display-en, "Cormorant Garamond")', fontSize: '1.5rem', color: '#F4EBDD', letterSpacing: '0.06em' }}>
              {t(hero.restaurant_name) || 'BENGAL HERITAGE DINING'}
            </h3>
          </div>
          <p style={{ fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '320px', color: '#C8B18D' }}>
            {t(hero.lead_description)}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#D4AF37', boxShadow: '0 0 8px #D4AF37' }} />
            <span style={{ fontSize: '0.8rem', color: '#D4AF37', fontFamily: 'var(--font-body-en, "Manrope")', fontWeight: 600 }}>
              Gulshan Heritage Enclave &bull; Open for Dining
            </span>
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-body-en, "Manrope")', fontSize: '0.82rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#D4AF37', marginBottom: '1.25rem', fontWeight: 700 }}>
            {lang === 'bn' ? 'দরকারী লিংক' : 'Heritage Navigation'}
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.86rem' }}>
            <li>
              <a href="/story" onClick={(e) => handleLinkClick(e, '/story')} style={{ color: '#F4EBDD', textDecoration: 'none' }}>
                &bull; {lang === 'bn' ? 'আমাদের গল্প' : 'Heritage Story'}
              </a>
            </li>
            <li>
              <a href="/signatures" onClick={(e) => handleLinkClick(e, '/signatures')} style={{ color: '#F4EBDD', textDecoration: 'none' }}>
                &bull; {lang === 'bn' ? 'স্বাক্ষর পদ' : 'Signature Dishes'}
              </a>
            </li>
            <li>
              <a href="/menu" onClick={(e) => handleLinkClick(e, '/menu')} style={{ color: '#F4EBDD', textDecoration: 'none' }}>
                &bull; {lang === 'bn' ? 'পূর্ণাঙ্গ মেনু' : 'Full Menu Explorer'}
              </a>
            </li>
            <li>
              <a href="/tour" onClick={(e) => handleLinkClick(e, '/tour')} style={{ color: '#F4EBDD', textDecoration: 'none' }}>
                &bull; {lang === 'bn' ? '৩ডি ভার্চুয়াল ট্যুর' : '3D Spatial Tour'}
              </a>
            </li>
            <li>
              <a href="/chef" onClick={(e) => handleLinkClick(e, '/chef')} style={{ color: '#F4EBDD', textDecoration: 'none' }}>
                &bull; {lang === 'bn' ? 'মাস্টার শেফ' : 'Master Chef Brigade'}
              </a>
            </li>
            <li>
              <a href="/architecture" onClick={(e) => handleLinkClick(e, '/architecture')} style={{ color: '#F4EBDD', textDecoration: 'none' }}>
                &bull; {lang === 'bn' ? 'স্থাপত্য ও কারুকাজ' : 'Architecture & Craft'}
              </a>
            </li>
            <li>
              <a href="/experience" onClick={(e) => handleLinkClick(e, '/experience')} style={{ color: '#F4EBDD', textDecoration: 'none' }}>
                &bull; {lang === 'bn' ? 'রাজকীয় উৎসব' : 'Cultural Feasts'}
              </a>
            </li>
            <li>
              <a href="/blog" onClick={(e) => handleLinkClick(e, '/blog')} style={{ color: '#F4EBDD', textDecoration: 'none' }}>
                &bull; {lang === 'bn' ? 'হেরিটেজ জার্নাল' : 'Heritage Gazette'}
              </a>
            </li>
          </ul>
        </div>

        {/* Location & Contact Column */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-body-en, "Manrope")', fontSize: '0.82rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#D4AF37', marginBottom: '1.25rem', fontWeight: 700 }}>
            {lang === 'bn' ? 'ঠিকানা ও যোগাযোগ' : 'Heritage Coordinates'}
          </h4>
          <p style={{ fontSize: '0.88rem', color: '#F4EBDD', lineHeight: 1.6, marginBottom: '0.75rem' }}>
            {t(loc.address)}
          </p>
          <div style={{ fontSize: '0.86rem', color: '#D4AF37' }}>
            <strong>Phone:</strong> {loc.phone || '+880 1711-234567'}
          </div>
          <div style={{ fontSize: '0.86rem', color: '#C8B18D', marginTop: '0.25rem' }}>
            <strong>WhatsApp:</strong> {loc.whatsapp || '+880 1711-234567'}
          </div>
          <div style={{ fontSize: '0.86rem', color: '#C8B18D', marginTop: '0.25rem' }}>
            <strong>Email:</strong> {loc.email || 'hospitality@bengalheritage.com'}
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <button
              onClick={() => openReservation()}
              style={{
                backgroundColor: '#A6533B',
                color: '#F4EBDD',
                border: 'none',
                padding: '0.65rem 1.4rem',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                borderRadius: '2px',
                cursor: 'pointer',
              }}
            >
              {lang === 'bn' ? 'টেবিল বুকিং করুন' : 'Table Reservation'}
            </button>
          </div>
        </div>

        {/* Administration & Technical Architecture */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-body-en, "Manrope")', fontSize: '0.82rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#D4AF37', marginBottom: '1.25rem', fontWeight: 700 }}>
            {lang === 'bn' ? 'সিস্টেম ও সিএমএস' : 'System & Studio'}
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.86rem' }}>
            <li>
              <a href="http://127.0.0.1:8001/cms/" target="_blank" rel="noreferrer" style={{ color: '#D4AF37', textDecoration: 'none', fontWeight: 700 }}>
                &rarr; Bengali Heritage CMS Studio (Admin)
              </a>
            </li>
            <li>
              <a href="http://127.0.0.1:8001/api/content/" target="_blank" rel="noreferrer" style={{ color: '#C8B18D', textDecoration: 'none' }}>
                &bull; Public Headless Content API (JSON)
              </a>
            </li>
            <li>
              <a href="/tour" onClick={(e) => handleLinkClick(e, '/tour')} style={{ color: '#C8B18D', textDecoration: 'none' }}>
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
        <div style={{ color: '#D4AF37', fontFamily: 'var(--font-body-en, "Manrope")' }}>
          Decoupled Architecture &bull; React 18 + Three.js &bull; Django 5 + DRF
        </div>
      </div>
    </footer>
  );
}
