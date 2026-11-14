import React, { useState, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';

export default function Navigation() {
  const { content, lang, toggleLanguage, t, openReservation } = useCMS();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: { en: 'Our Story', bn: 'আমাদের গল্প' }, href: '#story' },
    { label: { en: '3D Virtual Tour', bn: 'ভার্চুয়াল ট্যুর' }, href: '#tour' },
    { label: { en: 'Philosophy', bn: 'ভোজন দর্শন' }, href: '#philosophy' },
    { label: { en: 'Signature Dishes', bn: 'স্বাক্ষর পদ' }, href: '#dishes' },
    { label: { en: 'Menu Explorer', bn: 'মেনু' }, href: '#menu' },
    { label: { en: 'Architecture', bn: 'স্থাপত্য' }, href: '#architecture' },
    { label: { en: 'Chef', bn: 'শেফ' }, href: '#chef' },
    { label: { en: 'Feasts', bn: 'উৎসব' }, href: '#experiences' },
    { label: { en: 'Location', bn: 'ঠিকানা' }, href: '#location' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        backgroundColor: scrolled ? 'rgba(25, 36, 51, 0.95)' : 'rgba(16, 24, 34, 0.72)',
        backdropFilter: 'blur(14px)',
        borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid rgba(255, 255, 255, 0.05)',
        height: 'var(--nav-height)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem' }}>
        {/* Brand Crest & Title */}
        <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', textDecoration: 'none' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              background: 'linear-gradient(135deg, var(--color-terracotta) 0%, var(--color-indigo-card) 100%)',
              border: '1px solid var(--color-brass)',
              borderRadius: '3px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-ivory)',
              fontFamily: 'var(--font-display-bn)',
              fontSize: '1.4rem',
              fontWeight: 700,
            }}
          >
            ঐ
          </div>
          <div>
            <div
              style={{
                fontFamily: lang === 'bn' ? 'var(--font-display-bn)' : 'var(--font-display-en)',
                fontSize: '1.35rem',
                color: 'var(--color-ivory)',
                letterSpacing: '0.06em',
                fontWeight: 600,
                lineHeight: 1,
              }}
            >
              {t(content?.hero?.restaurant_name) || 'BENGAL HERITAGE'}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body-en)',
                fontSize: '0.68rem',
                color: 'var(--color-brass)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                fontWeight: 600,
                marginTop: '2px',
              }}
            >
              HERITAGE DINING &bull; DHAKA
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }} className="desktop-nav">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              style={{
                color: 'var(--color-ivory)',
                textDecoration: 'none',
                fontSize: '0.82rem',
                fontFamily: lang === 'bn' ? 'var(--font-body-bn)' : 'var(--font-body-en)',
                fontWeight: 600,
                letterSpacing: '0.04em',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--color-brass)')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--color-ivory)')}
            >
              {t(link.label)}
            </a>
          ))}
        </nav>

        {/* Language Switcher, CMS Studio & Table Booking */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Language Toggle Button */}
          <button
            onClick={toggleLanguage}
            style={{
              padding: '0.45rem 0.85rem',
              borderRadius: '20px',
              border: '1px solid var(--color-border)',
              background: 'rgba(177, 138, 84, 0.15)',
              color: 'var(--color-brass)',
              fontFamily: 'var(--font-display-bn)',
              fontSize: '0.85rem',
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
              border: '1px solid var(--color-border)',
              color: 'var(--color-brass)',
              fontFamily: 'var(--font-body-en)',
              fontSize: '0.74rem',
              fontWeight: 700,
              textDecoration: 'none',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-brass)' }} />
            CMS Studio
          </a>

          <button
            onClick={() => openReservation()}
            className="btn-heritage-terracotta"
            style={{ padding: '0.65rem 1.35rem', fontSize: '0.8rem' }}
          >
            {lang === 'bn' ? 'বুকিং করুন' : 'Reserve Table'}
          </button>
        </div>
      </div>
    </header>
  );
}
