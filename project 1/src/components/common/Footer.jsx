import React, { useState } from 'react';
import { ArrowUp, Instagram, Facebook, Youtube, Send, Check } from 'lucide-react';

export default function Footer({ restaurant }) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes('@')) {
      setSubscribed(true);
      setTimeout(() => setNewsletterEmail(''), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        backgroundColor: '#091513',
        color: 'var(--color-pearl)',
        position: 'relative',
        borderTop: '1px solid var(--color-border-gold)',
        paddingTop: '80px',
        paddingBottom: '40px',
      }}
    >
      <div className="container">
        {/* Top Tier: Logo & Newsletter */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '48px',
            marginBottom: '64px',
            alignItems: 'center',
          }}
        >
          {/* Brand Identity */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  border: '1px solid var(--color-gold)',
                  transform: 'rotate(45deg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'var(--color-emerald)',
                }}
              >
                <span style={{ transform: 'rotate(-45deg)', fontFamily: 'var(--font-display)', color: 'var(--color-gold)', fontWeight: 700 }}>
                  A
                </span>
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '34px',
                  letterSpacing: '0.15em',
                  color: 'var(--color-pearl)',
                  margin: 0,
                }}
              >
                {restaurant.name}
              </h2>
            </div>
            <p
              style={{
                fontFamily: 'var(--font-accent)',
                fontSize: '18px',
                fontStyle: 'italic',
                color: 'var(--color-gold)',
                maxWidth: '440px',
                lineHeight: 1.5,
              }}
            >
              An exceptional dining experience, crafted with passion and served with distinction.
            </p>
          </div>

          {/* Newsletter Box */}
          <div
            className="deco-frame"
            style={{
              padding: '28px',
              backgroundColor: 'rgba(23, 25, 26, 0.7)',
            }}
          >
            <h4 style={{ fontSize: '18px', color: 'var(--color-pearl)', marginBottom: '8px' }}>
              Stay Connected to Our Salon
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--color-pearl-muted)', marginBottom: '18px' }}>
              Receive exclusive invitations to private seasonal tasting menus and sommelier evenings.
            </p>

            {subscribed ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-gold)', fontSize: '13px' }}>
                <Check size={16} /> <span>Thank you. Your address is registered with our concierge.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  style={{
                    flex: 1,
                    padding: '12px 14px',
                    backgroundColor: '#17191A',
                    border: '1px solid var(--color-border-gold-subtle)',
                    color: 'var(--color-pearl)',
                    fontSize: '13px',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  style={{
                    backgroundColor: 'var(--color-gold)',
                    border: 'none',
                    color: '#17191A',
                    padding: '0 20px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'opacity 0.2s',
                  }}
                >
                  <Send size={15} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Middle Tier: Links Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '36px',
            borderTop: '1px solid var(--color-border-gold-subtle)',
            paddingTop: '48px',
            marginBottom: '48px',
          }}
        >
          {/* Quick Links */}
          <div>
            <h5 style={{ fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '18px' }}>
              Navigation
            </h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <li><a href="#hero" style={{ color: 'var(--color-pearl-muted)', textDecoration: 'none' }}>Home</a></li>
              <li><a href="#story" style={{ color: 'var(--color-pearl-muted)', textDecoration: 'none' }}>Our Story</a></li>
              <li><a href="#tour" style={{ color: 'var(--color-pearl-muted)', textDecoration: 'none' }}>Virtual Tour</a></li>
              <li><a href="#signature" style={{ color: 'var(--color-pearl-muted)', textDecoration: 'none' }}>Signature Dishes</a></li>
              <li><a href="#menu" style={{ color: 'var(--color-pearl-muted)', textDecoration: 'none' }}>Full Menu</a></li>
              <li><a href="#gallery" style={{ color: 'var(--color-pearl-muted)', textDecoration: 'none' }}>Gallery</a></li>
            </ul>
          </div>

          {/* Experiences */}
          <div>
            <h5 style={{ fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '18px' }}>
              Experiences
            </h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <li><a href="#experiences" style={{ color: 'var(--color-pearl-muted)', textDecoration: 'none' }}>The Salon Privé</a></li>
              <li><a href="#experiences" style={{ color: 'var(--color-pearl-muted)', textDecoration: 'none' }}>Family Celebrations</a></li>
              <li><a href="#experiences" style={{ color: 'var(--color-pearl-muted)', textDecoration: 'none' }}>Anniversaries &amp; Soirées</a></li>
              <li><a href="#experiences" style={{ color: 'var(--color-pearl-muted)', textDecoration: 'none' }}>Corporate Dining</a></li>
              <li><a href="#chef" style={{ color: 'var(--color-pearl-muted)', textDecoration: 'none' }}>Chef's Degustation</a></li>
            </ul>
          </div>

          {/* Salon Address */}
          <div>
            <h5 style={{ fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '18px' }}>
              Location &amp; Concierge
            </h5>
            <p style={{ fontSize: '13px', color: 'var(--color-pearl-muted)', lineHeight: 1.6, marginBottom: '12px' }}>
              {restaurant.contact.fullAddress}
            </p>
            <p style={{ fontSize: '13px', color: 'var(--color-gold)' }}>
              Tel: {restaurant.contact.phoneDisplay}
            </p>
            <p style={{ fontSize: '13px', color: 'var(--color-pearl-muted)' }}>
              Email: {restaurant.contact.email}
            </p>
          </div>

          {/* Social Presence */}
          <div>
            <h5 style={{ fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '18px' }}>
              Social Channels
            </h5>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
              <a
                href={restaurant.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{
                  width: '38px',
                  height: '38px',
                  border: '1px solid var(--color-border-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-gold)',
                  textDecoration: 'none',
                }}
              >
                <Instagram size={18} />
              </a>
              <a
                href={restaurant.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                style={{
                  width: '38px',
                  height: '38px',
                  border: '1px solid var(--color-border-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-gold)',
                  textDecoration: 'none',
                }}
              >
                <Facebook size={18} />
              </a>
              <a
                href={restaurant.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                style={{
                  width: '38px',
                  height: '38px',
                  border: '1px solid var(--color-border-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-gold)',
                  textDecoration: 'none',
                }}
              >
                <Youtube size={18} />
              </a>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--color-jade)' }}>
              #AureliaDining #ArtDecoGlamour
            </p>
          </div>
        </div>

        {/* Bottom Tier: Copyright, Legal & Back to Top */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            borderTop: '1px solid rgba(214, 184, 121, 0.15)',
            paddingTop: '28px',
            fontSize: '12px',
            color: 'var(--color-jade)',
          }}
        >
          <div>
            © {new Date().getFullYear()} {restaurant.name} Salon. All Rights Reserved.
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
            <span>•</span>
            <span style={{ cursor: 'pointer' }}>Terms of Service</span>
            <span>•</span>
            <span style={{ cursor: 'pointer' }}>Reservation Policy</span>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Return to top of page"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--color-gold)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              fontSize: '11px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
