import React, { useState, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';

export default function Navigation() {
  const { content, openReservation } = useCMS();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Héritage', href: '#heritage' },
    { label: 'Visite 3D', href: '#visite-3d' },
    { label: 'La Carte', href: '#carte' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Le Chef', href: '#chef' },
    { label: 'Expériences', href: '#experiences' },
    { label: 'Galerie', href: '#galerie' },
    { label: 'Accès', href: '#acces' },
  ];

  const brandName = content?.hero?.restaurant_name || "L'ÉTOILE ROYALE";

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        height: 'var(--nav-height)',
        display: 'flex',
        alignItems: 'center',
        transition: 'all 0.35s ease',
        backgroundColor: scrolled ? 'rgba(32, 33, 36, 0.94)' : 'rgba(32, 33, 36, 0.4)',
        backdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid rgba(197, 164, 109, 0.25)' : '1px solid transparent',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        {/* Brand Crest & Title */}
        <a
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.9rem',
            textDecoration: 'none',
          }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--color-gold) 0%, var(--color-burgundy) 100%)',
              border: '1px solid var(--color-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-ivory)',
              fontSize: '1.1rem',
              fontFamily: 'var(--font-display)',
            }}
          >
            ✦
          </div>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-ivory)',
                fontWeight: 600,
                lineHeight: 1.1,
              }}
            >
              {brandName}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: '0.78rem',
                color: 'var(--color-gold)',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
              }}
            >
              Paris • Place Vendôme
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '1.75rem',
          }}
          className="desktop-links"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                color: 'var(--color-taupe)',
                textDecoration: 'none',
                fontSize: '0.86rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontWeight: 500,
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--color-gold)')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--color-taupe)')}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Actions (CMS Studio + Reservation CTA) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a
            href="http://127.0.0.1:8001/cms/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '0.45rem 0.9rem',
              borderRadius: '4px',
              border: '1px solid rgba(197, 164, 109, 0.4)',
              color: 'var(--color-gold)',
              fontSize: '0.78rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
            title="Accéder au panneau d'administration CMS Django"
          >
            <span>⚙ Studio CMS</span>
          </a>

          <button
            onClick={() => openReservation()}
            className="btn-primary"
            style={{
              padding: '0.65rem 1.4rem',
              fontSize: '0.8rem',
            }}
          >
            Réserver
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-btn"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--color-ivory)',
              fontSize: '1.5rem',
              cursor: 'pointer',
              display: 'none',
              padding: '0.4rem',
            }}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'var(--nav-height)',
            left: 0,
            width: '100%',
            backgroundColor: '#202124',
            borderBottom: '1px solid rgba(197, 164, 109, 0.3)',
            padding: '1.5rem 2rem 2.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.2rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                color: 'var(--color-ivory)',
                textDecoration: 'none',
                fontSize: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="http://127.0.0.1:8001/cms/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--color-gold)',
              textDecoration: 'none',
              fontSize: '0.95rem',
              marginTop: '0.5rem',
              fontWeight: 600,
            }}
          >
            ⚙ Ouvrir le Studio CMS Django
          </a>
        </div>
      )}

      <style>{`
        @media (min-width: 992px) {
          .desktop-links {
            display: flex !important;
          }
        }
        @media (max-width: 991px) {
          .mobile-btn {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
}
