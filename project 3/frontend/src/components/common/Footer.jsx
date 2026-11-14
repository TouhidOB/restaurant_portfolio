import React, { useState } from 'react';
import { Compass, Send, Check, ShieldCheck, Phone, Mail, MapPin } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function Footer() {
  const { data } = useCMS();
  const settings = data.settings || {};
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer
      style={{
        backgroundColor: '#061118',
        color: '#FAF9F5',
        paddingTop: '96px',
        paddingBottom: '44px',
        borderTop: '1px solid rgba(197, 160, 89, 0.3)',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Newsletter Editorial Strip */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(13, 37, 51, 0.7) 0%, rgba(8, 23, 33, 0.9) 100%)',
            border: '1px solid rgba(197, 160, 89, 0.35)',
            borderRadius: '24px',
            padding: '52px 46px',
            marginBottom: '76px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '36px',
            alignItems: 'center',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
          }}
        >
          <div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                color: '#C5A059',
                display: 'block',
                marginBottom: '10px',
                fontWeight: 600,
              }}
            >
              THE COASTAL DISPATCH
            </span>
            <h3 style={{ fontSize: '2.4rem', color: '#FAF9F5', lineHeight: 1.15 }}>
              Receive Seasonal Menu Reveals & Harvest Vintages
            </h3>
            <p style={{ color: '#D5E5EB', fontSize: '1rem', marginTop: '10px' }}>
              Quarterly culinary essays from Chef Matteo Bellini and Master Sommelier Elena Costa.
            </p>
          </div>

          <div>
            {subscribed ? (
              <div
                style={{
                  background: 'rgba(197, 160, 89, 0.2)',
                  border: '1px solid #C5A059',
                  color: '#DFBA73',
                  padding: '16px 24px',
                  borderRadius: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
              >
                <Check size={18} color="#C5A059" />
                <span>You have been subscribed to the private coastal dispatch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    flex: 1,
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(197, 160, 89, 0.4)',
                    padding: '16px 22px',
                    borderRadius: '40px',
                    color: '#FFFFFF',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  className="btn-gold"
                  style={{
                    padding: '16px 28px',
                    fontWeight: 600,
                  }}
                >
                  <Send size={15} />
                  <span>Join</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Brand Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: '44px',
            marginBottom: '70px',
          }}
        >
          {/* Column 1: Brand Info */}
          <div>
            <h4
              style={{
                fontSize: '2.2rem',
                fontFamily: 'var(--font-serif)',
                fontWeight: 600,
                letterSpacing: '0.12em',
                color: '#FAF9F5',
                marginBottom: '10px',
              }}
            >
              {settings.brand_name || 'AURA MARINA'}
            </h4>
            <p style={{ color: '#D5E5EB', fontSize: '0.96rem', lineHeight: 1.65, marginBottom: '18px' }}>
              {settings.tagline || 'Where the Coast Meets the Table'}
            </p>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: '#C5A059',
                letterSpacing: '0.08em',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Compass size={14} color="#C5A059" />
              <span>{settings.coordinates_display || '40.6281° N, 14.4850° E'}</span>
            </div>
          </div>

          {/* Column 2: Hours */}
          <div>
            <h5
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#C5A059',
                marginBottom: '18px',
                fontWeight: 600,
              }}
            >
              Hours of Service
            </h5>
            <div style={{ color: '#D2DEE2', fontSize: '0.92rem', lineHeight: 1.85 }}>
              <p><strong>Lunch:</strong> 12:30 — 15:30</p>
              <p><strong>Sunset Aperitivo:</strong> 18:00 — 19:30</p>
              <p><strong>Dinner:</strong> 19:30 — 23:30</p>
              <p style={{ color: '#DFBA73', marginTop: '6px', fontSize: '0.88rem' }}>
                Open 7 Days • Season 2026
              </p>
            </div>
          </div>

          {/* Column 3: Contact & Arrival */}
          <div>
            <h5
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#C5A059',
                marginBottom: '18px',
                fontWeight: 600,
              }}
            >
              Arrival & Mooring
            </h5>
            <div style={{ color: '#D2DEE2', fontSize: '0.92rem', lineHeight: 1.85 }}>
              <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={14} color="#C5A059" />
                <span>{settings.address_line1 || 'Via Panoramica 48'}</span>
              </p>
              <p style={{ marginLeft: '22px' }}>{settings.city_region || 'Positano, Amalfi Coast, Italy'}</p>
              <p style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                <Phone size={14} color="#C5A059" />
                <span>{settings.phone || '+39 089 875 219'}</span>
              </p>
              <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={14} color="#C5A059" />
                <span>{settings.email || 'reservations@auramarina.it'}</span>
              </p>
            </div>
          </div>

          {/* Column 4: Studio & Policies */}
          <div>
            <h5
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#C5A059',
                marginBottom: '18px',
                fontWeight: 600,
              }}
            >
              Management Console
            </h5>
            <p style={{ color: '#D2DEE2', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '18px' }}>
              Manage menus, 3D viewpoints, and guest inquiries via our decoupled studio console.
            </p>
            <a
              href="/cms/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(197, 160, 89, 0.12)',
                border: '1px solid rgba(197, 160, 89, 0.45)',
                color: '#DFBA73',
                padding: '10px 18px',
                borderRadius: '30px',
                fontSize: '12px',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                transition: 'all 0.25s',
                fontWeight: 600,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#C5A059';
                e.currentTarget.style.color = '#081721';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(197, 160, 89, 0.12)';
                e.currentTarget.style.color = '#DFBA73';
              }}
            >
              <ShieldCheck size={14} />
              <span>Launch CMS Studio ↗</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            paddingTop: '32px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '12px',
            color: '#7A7E80',
          }}
        >
          <div>
            © 2026 Aura Marina Ristorante & Villa Sanctuary. All rights reserved. Michelin Selected.
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="#hero" style={{ color: '#C5A059' }}>Back to Top ↑</a>
            <a href="/cms/login/" style={{ color: '#C5A059' }}>Staff Portal</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
