import React, { useState, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';

export default function Navigation({ currentPath = '/', onNavigate }) {
  const { content, lang, toggleLanguage, t, openReservation, customPages } = useCMS();
  const [scrolled, setScrolled] = useState(false);
  const [pagesDropdownOpen, setPagesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: { en: 'Home', bn: 'মূলপাতা' }, path: '/' },
    { label: { en: 'Our Story', bn: 'আমাদের গল্প' }, path: '/story' },
    { label: { en: 'Signatures', bn: 'স্বাক্ষর পদ' }, path: '/signatures' },
    { label: { en: 'Menu', bn: 'মেনু' }, path: '/menu' },
    { label: { en: '3D Tour', bn: 'ভার্চুয়াল ট্যুর' }, path: '/tour' },
    { label: { en: 'The Chef', bn: 'মাস্টার শেফ' }, path: '/chef' },
    { label: { en: 'Architecture', bn: 'স্থাপত্য' }, path: '/architecture' },
    { label: { en: 'Feasts', bn: 'রাজকীয় উৎসব' }, path: '/experience' },
    { label: { en: 'Journal', bn: 'হেরিটেজ জার্নাল' }, path: '/blog' },
    { label: { en: 'Location', bn: 'ঠিকানা' }, path: '/contact' },
  ];

  const handleNavClick = (e, path) => {
    e.preventDefault();
    setPagesDropdownOpen(false);
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const isCurrentActive = (path) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        backgroundColor: scrolled ? 'rgba(25, 36, 51, 0.96)' : 'rgba(16, 24, 34, 0.85)',
        backdropFilter: 'blur(14px)',
        borderBottom: scrolled ? '1px solid #D4AF37' : '1px solid rgba(255, 255, 255, 0.08)',
        height: 'var(--nav-height, 80px)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem', width: '100%' }}>
        {/* Brand Crest & Title */}
        <a href="/" onClick={(e) => handleNavClick(e, '/')} style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', textDecoration: 'none' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              background: 'linear-gradient(135deg, var(--color-terracotta, #A6533B) 0%, #1A2536 100%)',
              border: '1px solid var(--color-brass, #B18A54)',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#F4EBDD',
              fontFamily: 'var(--font-display-bn, "Noto Serif Bengali")',
              fontSize: '1.4rem',
              fontWeight: 700,
            }}
          >
            ঐ
          </div>
          <div>
            <div
              style={{
                fontFamily: lang === 'bn' ? 'var(--font-display-bn, "Noto Serif Bengali")' : 'var(--font-display-en, "Cormorant Garamond")',
                fontSize: '1.35rem',
                color: '#F4EBDD',
                letterSpacing: '0.06em',
                fontWeight: 600,
                lineHeight: 1,
              }}
            >
              {t(content?.hero?.restaurant_name) || 'BENGAL HERITAGE'}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body-en, "Manrope")',
                fontSize: '0.68rem',
                color: '#D4AF37',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                fontWeight: 700,
                marginTop: '2px',
              }}
            >
              ZAMINDARI HERITAGE &bull; DHAKA
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }} className="desktop-nav">
          {navLinks.map((link, idx) => {
            const active = isCurrentActive(link.path);
            return (
              <a
                key={idx}
                href={link.path}
                onClick={(e) => handleNavClick(e, link.path)}
                style={{
                  color: active ? '#D4AF37' : '#F4EBDD',
                  textDecoration: 'none',
                  fontSize: '0.8rem',
                  fontFamily: lang === 'bn' ? 'var(--font-body-bn, "Noto Sans Bengali")' : 'var(--font-body-en, "Manrope")',
                  fontWeight: active ? 800 : 600,
                  letterSpacing: '0.04em',
                  transition: 'color 0.2s ease',
                  borderBottom: active ? '2px solid #D4AF37' : '2px solid transparent',
                  paddingBottom: '4px',
                }}
                onMouseEnter={(e) => (e.target.style.color = '#D4AF37')}
                onMouseLeave={(e) => (e.target.style.color = active ? '#D4AF37' : '#F4EBDD')}
              >
                {t(link.label)}
              </a>
            );
          })}

          {/* Custom Pages Dropdown */}
          {customPages && customPages.length > 0 && (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setPagesDropdownOpen(!pagesDropdownOpen)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#F4EBDD',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-body-en, "Manrope")',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                }}
              >
                Pages ▾
              </button>
              {pagesDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    backgroundColor: '#1A2536',
                    border: '1px solid #D4AF37',
                    borderRadius: '4px',
                    padding: '0.5rem 0',
                    minWidth: '220px',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
                    zIndex: 100,
                  }}
                >
                  {customPages.map((cp) => (
                    <a
                      key={cp.slug}
                      href={`/page/${cp.slug}`}
                      onClick={(e) => handleNavClick(e, `/page/${cp.slug}`)}
                      style={{
                        display: 'block',
                        padding: '0.6rem 1rem',
                        color: '#F4EBDD',
                        textDecoration: 'none',
                        fontSize: '0.82rem',
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'rgba(166, 83, 59, 0.35)';
                        e.target.style.color = '#D4AF37';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = '#F4EBDD';
                      }}
                    >
                      {cp.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Language Switcher, CMS Studio & Table Booking */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Language Toggle Button */}
          <button
            onClick={toggleLanguage}
            style={{
              padding: '0.45rem 0.85rem',
              borderRadius: '20px',
              border: '1px solid #D4AF37',
              background: 'rgba(212, 175, 55, 0.15)',
              color: '#D4AF37',
              fontFamily: 'var(--font-display-bn, "Noto Serif Bengali")',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              transition: 'all 0.2s ease',
            }}
          >
            <span>{lang === 'en' ? 'বাংলা' : 'English'}</span>
          </button>

          <a
            href="http://127.0.0.1:8001/cms/"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.45rem 0.85rem',
              borderRadius: '999px',
              background: 'rgba(38, 52, 74, 0.45)',
              border: '1px solid #D4AF37',
              color: '#D4AF37',
              fontFamily: 'var(--font-body-en, "Manrope")',
              fontSize: '0.74rem',
              fontWeight: 700,
              textDecoration: 'none',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#D4AF37' }} />
            CMS Studio
          </a>

          <button
            onClick={() => openReservation()}
            className="btn-reserve-nav"
            style={{
              backgroundColor: '#A6533B',
              color: '#fff',
              border: '1px solid #D4AF37',
              padding: '0.65rem 1.35rem',
              fontSize: '0.8rem',
              fontWeight: 700,
              borderRadius: '3px',
              cursor: 'pointer',
            }}
          >
            {lang === 'bn' ? 'বুকিং করুন' : 'Reserve Table'}
          </button>
        </div>
      </div>
    </header>
  );
}
