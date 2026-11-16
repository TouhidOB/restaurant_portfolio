import React, { useState, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';

export default function Navigation({ currentPath = '/', onNavigate }) {
  const { content, openReservationModal, openReservation } = useCMS();
  const triggerReservation = openReservation || openReservationModal;

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Story', path: '/story', hash: '#story' },
    { label: 'Signatures', path: '/signatures', hash: '#signatures' },
    { label: 'Full Menu', path: '/menu', hash: '#menu' },
    { label: '3D Tour', path: '/tour', hash: '#tour' },
    { label: 'Culture', path: '/culture', hash: '#culture' },
    { label: 'Kitchen & Brigade', path: '/chef', hash: '#kitchen' },
    { label: 'Experiences', path: '/experiences', hash: '#experiences' },
    { label: 'Gazette', path: '/blog', hash: '/blog' },
    { label: 'Location', path: '/contact', hash: '#location' },
  ];

  const handleLinkClick = (e, link) => {
    if (onNavigate) {
      e.preventDefault();
      setMobileMenuOpen(false);
      onNavigate(link.path);
    }
  };

  const handleLogoClick = (e) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate('/');
    }
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'all 0.3s ease',
        backgroundColor: scrolled ? 'rgba(17, 19, 22, 0.95)' : 'rgba(17, 19, 22, 0.65)',
        backdropFilter: 'blur(14px)',
        borderBottom: scrolled ? '1px solid rgba(255, 46, 136, 0.35)' : '1px solid rgba(255, 255, 255, 0.08)',
        padding: scrolled ? '12px 0' : '18px 0',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* Brand Logo */}
        <a
          href="/"
          onClick={handleLogoClick}
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '8px',
              backgroundColor: '#1B1D22',
              border: '1px solid #FF2E88',
              boxShadow: '0 0 12px rgba(255, 46, 136, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#21D4E8',
              fontFamily: "'Noto Sans KR', sans-serif",
              fontSize: '15px',
              fontWeight: 800,
            }}
          >
            포차
          </div>
          <div>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1.25rem',
                letterSpacing: '0.08em',
                fontWeight: 800,
                color: '#F6F4F0',
                textTransform: 'uppercase',
                display: 'block',
                lineHeight: 1,
              }}
            >
              {content?.restaurant_name || 'SEOUL STREET'}
            </span>
            <span
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '10px',
                letterSpacing: '0.18em',
                color: 'var(--color-cyan)',
                textTransform: 'uppercase',
                display: 'block',
                marginTop: '3px',
                fontWeight: 700,
              }}
            >
              Hongdae • Seoul
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav style={{ display: 'flex', gap: '18px', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path || (link.path === '/blog' && currentPath.startsWith('/blog'));
            return (
              <a
                key={link.label}
                href={link.path}
                onClick={(e) => handleLinkClick(e, link)}
                style={{
                  color: isActive ? '#FF2E88' : '#F6F4F0',
                  textDecoration: 'none',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  transition: 'color 0.2s ease',
                  borderBottom: isActive ? '2px solid #FF2E88' : '2px solid transparent',
                  paddingBottom: '2px',
                }}
                onMouseEnter={(e) => (e.target.style.color = '#FF2E88')}
                onMouseLeave={(e) => (e.target.style.color = isActive ? '#FF2E88' : '#F6F4F0')}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* CMS Studio Pill Shortcut */}
          <a
            href="/cms/"
            target="_blank"
            rel="noopener noreferrer"
            title="Open Decoupled CMS Studio"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '999px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 46, 136, 0.4)',
              color: '#F6F4F0',
              textDecoration: 'none',
              fontSize: '0.74rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontWeight: 700,
              fontFamily: "'Barlow Condensed', sans-serif",
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#FF2E88';
              e.currentTarget.style.boxShadow = '0 0 12px rgba(255, 46, 136, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#21D4E8', boxShadow: '0 0 6px #21D4E8', display: 'inline-block' }} />
            CMS Studio
          </a>

          {/* Reserve Table CTA */}
          <button
            onClick={triggerReservation}
            className="btn-primary btn-reserve-nav"
            style={{
              backgroundColor: '#FF2E88',
              color: '#FFFFFF',
              border: 'none',
              padding: '8px 18px',
              borderRadius: '4px',
              fontWeight: 700,
              fontSize: '0.8rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              boxShadow: '0 0 12px rgba(255, 46, 136, 0.4)',
            }}
          >
            Reserve Table
          </button>
        </div>
      </div>
    </header>
  );
}
