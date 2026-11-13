import React, { useState } from 'react';
import { Instagram, Facebook, Youtube, ArrowUp } from 'lucide-react';

export default function Footer({ restaurant }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setTimeout(() => setEmail(''), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-charcoal)',
        color: 'var(--color-rice-paper)',
        padding: '90px 0 40px',
        borderTop: '1px solid rgba(182, 161, 123, 0.25)',
      }}
    >
      <div className="zen-container">
        {/* Top Tier */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '48px',
            marginBottom: '64px',
          }}
        >
          {/* Brand Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <span className="zen-seal">相</span>
              <h2 style={{ fontSize: '30px', color: '#FFFFFF', letterSpacing: '0.12em', margin: 0 }}>
                {restaurant.name}
              </h2>
            </div>
            <p className="font-jp" style={{ fontSize: '14px', color: 'var(--color-bamboo)', marginBottom: '12px' }}>
              {restaurant.footer?.japaneseStatement || '心静かに、美味しさを味わう。'}
            </p>
            <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--color-stone)', maxWidth: '380px' }}>
              {restaurant.footer?.closingStatement || 'An Invitation to Experience Dining Differently.'}
            </p>
          </div>

          {/* Hours Column */}
          <div>
            <h4 style={{ fontSize: '16px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-bamboo)', marginBottom: '18px' }}>
              Opening Hours
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: 'var(--color-stone)' }}>
              {restaurant.hours?.map((h, i) => (
                <div key={i}>
                  <div style={{ color: 'var(--color-rice-paper)', fontWeight: 500 }}>{h.days}</div>
                  <div>{h.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Box */}
          <div>
            <h4 style={{ fontSize: '16px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-bamboo)', marginBottom: '18px' }}>
              Zen Sanctuary Letters
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--color-stone)', marginBottom: '16px', lineHeight: 1.6 }}>
              Receive seasonal omakase announcements and invitations to private tea ceremonies.
            </p>

            {subscribed ? (
              <div style={{ padding: '12px', backgroundColor: 'rgba(105, 116, 91, 0.25)', border: '1px solid var(--color-moss)', color: '#C6D8BE', fontSize: '13px' }}>
                Thank you for connecting with our sanctuary.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#FFFFFF',
                    fontSize: '13px',
                    borderRadius: '2px',
                    outline: 'none',
                  }}
                />
                <button type="submit" className="btn-zen btn-zen-primary" style={{ padding: '10px 18px', backgroundColor: 'var(--color-bamboo)', borderColor: 'var(--color-bamboo)' }}>
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Tier */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '28px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            fontSize: '12px',
            color: 'var(--color-stone)',
          }}
        >
          <div>{restaurant.footer?.copyright || '© 2026 ENSO 圓相 Japanese Zen Dining. All Rights Reserved.'}</div>

          <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
            <span>Privacy Policy</span>
            <span>&bull;</span>
            <span>Terms of Service</span>
            <span>&bull;</span>
            <a
              href="http://127.0.0.1:8001/cms/"
              target="_blank"
              rel="noreferrer"
              style={{
                color: 'var(--color-bamboo)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                letterSpacing: '0.08em',
              }}
              title="Site Admin CMS Studio"
            >
              <span>Admin Studio</span>
              <span style={{ fontSize: '10px' }}>↗</span>
            </a>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-bamboo)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
