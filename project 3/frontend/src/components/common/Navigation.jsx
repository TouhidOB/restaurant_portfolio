import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, Compass, ShieldCheck, ChevronDown, Sparkles } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function Navigation({ currentPath = '/', onNavigate, onNavigateHome, onOpenReservation }) {
  const { data, customPages, setIsReservationModalOpen } = useCMS();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pagesDropdownOpen, setPagesDropdownOpen] = useState(false);

  const brandName = data.settings?.brand_name || "AURA MARINA";
  const handleReserve = onOpenReservation || (() => setIsReservationModalOpen(true));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "Heritage", path: "/story" },
    { label: "3D Tour", path: "/tour" },
    { label: "Spaces", path: "/interior" },
    { label: "Signatures", path: "/signatures" },
    { label: "Menu", path: "/menu" },
    { label: "Journal", path: "/blog" },
    { label: "Contact", path: "/contact" },
  ];

  const handleLinkClick = (e, path) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setPagesDropdownOpen(false);
    if (onNavigate) {
      onNavigate(path);
    }
  };

  const navCustomPages = (customPages || []).filter((p) => p.is_published && p.show_in_navigation);

  const isLinkActive = (path) => {
    if (path === '/blog') {
      return currentPath === '/blog' || currentPath.startsWith('/blog/');
    }
    return currentPath === path;
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 900,
        transition: 'all 0.35s ease',
        padding: scrolled ? '12px 0' : '22px 0',
        backgroundColor: scrolled ? 'rgba(252, 251, 248, 0.96)' : 'rgba(252, 251, 248, 0.88)',
        backdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid rgba(197, 160, 89, 0.3)' : '1px solid rgba(197, 160, 89, 0.15)',
        boxShadow: scrolled ? '0 8px 30px rgba(8, 23, 33, 0.05)' : 'none',
      }}
    >
      <div className="container" style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Monogram & Wordmark */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            if (onNavigateHome) onNavigateHome();
          }}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', cursor: 'pointer' }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #0A1C27 0%, #15384B 100%)',
              border: '1px solid #C5A059',
              color: '#DFBA73',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-serif, serif)',
              fontSize: '17px',
              fontWeight: 700,
              boxShadow: '0 4px 15px rgba(197, 160, 89, 0.25)',
              flexShrink: 0,
            }}
          >
            AM
          </div>
          <div>
            <span
              style={{
                fontFamily: 'var(--font-serif, serif)',
                fontSize: '1.25rem',
                fontWeight: 600,
                color: '#081721',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                display: 'block',
                lineHeight: 1,
              }}
            >
              {brandName}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '9px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#C5A059',
                marginTop: '3px',
                display: 'block',
                fontWeight: 600,
              }}
            >
              Positano • Amalfi Coast
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '22px',
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.path}
              onClick={(e) => handleLinkClick(e, link.path)}
              style={{
                fontSize: '0.78rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: isLinkActive(link.path) ? '#C5A059' : '#1C2022',
                borderBottom: isLinkActive(link.path) ? '2px solid #C5A059' : '2px solid transparent',
                paddingBottom: '2px',
                textDecoration: 'none',
                transition: 'all 0.2s',
                position: 'relative',
              }}
            >
              {link.label}
            </a>
          ))}

          {/* Custom Standalone Pages Dropdown */}
          {navCustomPages.length > 0 && (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setPagesDropdownOpen(!pagesDropdownOpen)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: currentPath.startsWith('/page/') ? '#C5A059' : '#1C2022',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: 0,
                }}
              >
                <span>Pages</span>
                <ChevronDown size={13} />
              </button>

              {pagesDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '12px',
                    width: '240px',
                    background: '#FFFFFF',
                    border: '1px solid #E2DAD0',
                    borderRadius: '8px',
                    boxShadow: '0 10px 30px rgba(8, 23, 33, 0.1)',
                    padding: '8px 0',
                    zIndex: 1000,
                  }}
                >
                  {navCustomPages.map((page) => (
                    <a
                      key={page.id}
                      href={`/page/${page.slug}`}
                      onClick={(e) => handleLinkClick(e, `/page/${page.slug}`)}
                      style={{
                        display: 'block',
                        padding: '10px 16px',
                        fontSize: '12.5px',
                        color: '#081721',
                        textDecoration: 'none',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={(e) => (e.target.style.background = '#FAF8F4')}
                      onMouseLeave={(e) => (e.target.style.background = 'transparent')}
                    >
                      <div style={{ fontWeight: 600 }}>{page.title}</div>
                      <small style={{ color: '#7A7E80', fontSize: '10.5px' }}>/page/{page.slug}</small>
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Right Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a
            href="/cms/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '10.5px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#081721',
              background: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid rgba(197, 160, 89, 0.45)',
              padding: '7px 14px',
              borderRadius: '24px',
              transition: 'all 0.2s',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            <ShieldCheck size={13} color="#C5A059" />
            <span>CMS Studio</span>
          </a>

          <button
            onClick={handleReserve}
            className="btn-gold"
            style={{ padding: '9px 18px', fontSize: '0.76rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <Calendar size={13} />
            <span>Reserve Table</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              background: 'transparent',
              border: 'none',
              color: '#081721',
              cursor: 'pointer',
              padding: '6px',
            }}
            className="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{ background: '#FFFFFF', borderTop: '1px solid #E2DAD0', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.path}
              onClick={(e) => handleLinkClick(e, link.path)}
              style={{
                fontSize: '14px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: isLinkActive(link.path) ? '#C5A059' : '#081721',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </a>
          ))}
          {navCustomPages.map((page) => (
            <a
              key={page.id}
              href={`/page/${page.slug}`}
              onClick={(e) => handleLinkClick(e, `/page/${page.slug}`)}
              style={{
                fontSize: '13px',
                color: '#2A6F85',
                textDecoration: 'none',
                paddingLeft: '10px',
              }}
            >
              ✦ {page.title}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
