import React, { useState } from 'react';
import { Compass, Send, Check, ShieldCheck, Instagram, Phone, Mail, MapPin } from 'lucide-react';
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
        backgroundColor: '#0F3142',
        color: '#FAF9F5',
        paddingTop: '90px',
        paddingBottom: '40px',
        borderTop: '1px solid rgba(201, 221, 224, 0.15)',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Newsletter Editorial Strip */}
        <div
          style={{
            background: 'rgba(23, 74, 99, 0.4)',
            border: '1px solid rgba(201, 221, 224, 0.2)',
            borderRadius: '16px',
            padding: '48px 40px',
            marginBottom: '70px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            alignItems: 'center',
          }}
        >
          <div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: '#C9DDE0',
                display: 'block',
                marginBottom: '8px',
              }}
            >
              THE COASTAL DISPATCH
            </span>
            <h3 style={{ fontSize: '2.2rem', color: '#FAF9F5', lineHeight: 1.15 }}>
              Receive Seasonal Menu Reveals & Harvest Vintages
            </h3>
            <p style={{ color: '#C9DDE0', fontSize: '0.95rem', marginTop: '8px' }}>
              Quarterly culinary essays from Chef Matteo Bellini and Master Sommelier Elena Costa.
            </p>
          </div>

          <div>
            {subscribed ? (
              <div
                style={{
                  background: 'rgba(104, 118, 90, 0.25)',
                  border: '1px solid #68765A',
                  color: '#FAF9F5',
                  padding: '14px 20px',
                  borderRadius: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '14px',
                }}
              >
                <Check size={18} color="#C9DDE0" />
                <span>You have been subscribed to the private coastal dispatch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    flex: 1,
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(201, 221, 224, 0.3)',
                    padding: '14px 18px',
                    borderRadius: '30px',
                    color: '#FFFFFF',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    background: '#C8B69B',
                    color: '#0F3142',
                    padding: '14px 24px',
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '40px',
            marginBottom: '60px',
          }}
        >
          {/* Column 1: Brand Info */}
          <div>
            <h4
              style={{
                fontSize: '2rem',
                fontFamily: 'var(--font-serif)',
                fontWeight: 600,
                letterSpacing: '0.1em',
                color: '#FAF9F5',
                marginBottom: '10px',
              }}
            >
              {settings.brand_name || 'AURA MARINA'}
            </h4>
            <p style={{ color: '#C9DDE0', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '16px' }}>
              {settings.tagline || 'Where the Coast Meets the Table'}
            </p>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: '#D6A854',
                letterSpacing: '0.06em',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Compass size={14} />
              <span>{settings.coordinates_display || '40.6281° N, 14.4850° E'}</span>
            </div>
          </div>

          {/* Column 2: Hours */}
          <div>
            <h5
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#C8B69B',
                marginBottom: '16px',
              }}
            >
              Hours of Service
            </h5>
            <div style={{ color: '#D2DEE2', fontSize: '0.9rem', lineHeight: 1.8 }}>
              <p><strong>Lunch:</strong> 12:30 — 15:30</p>
              <p><strong>Sunset Aperitivo:</strong> 18:00 — 19:30</p>
              <p><strong>Dinner:</strong> 19:30 — 23:30</p>
              <p style={{ color: '#D6A854', marginTop: '6px', fontSize: '0.85rem' }}>
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
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#C8B69B',
                marginBottom: '16px',
              }}
            >
              Arrival & Mooring
            </h5>
            <div style={{ color: '#D2DEE2', fontSize: '0.9rem', lineHeight: 1.8 }}>
              <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={14} color="#C9DDE0" />
                <span>{settings.address_line1 || 'Via Panoramica 48'}</span>
              </p>
              <p style={{ marginLeft: '22px' }}>{settings.city_region || 'Positano, Amalfi Coast, Italy'}</p>
              <p style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                <Phone size={14} color="#C9DDE0" />
                <span>{settings.phone || '+39 089 875 219'}</span>
              </p>
              <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={14} color="#C9DDE0" />
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
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#C8B69B',
                marginBottom: '16px',
              }}
            >
              Studio & Management
            </h5>
            <p style={{ color: '#D2DEE2', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '16px' }}>
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
                background: 'rgba(201, 221, 224, 0.12)',
                border: '1px solid rgba(201, 221, 224, 0.3)',
                color: '#FAF9F5',
                padding: '8px 16px',
                borderRadius: '6px',
                fontSize: '12px',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#C8B69B';
                e.currentTarget.style.color = '#0F3142';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(201, 221, 224, 0.12)';
                e.currentTarget.style.color = '#FAF9F5';
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
            paddingTop: '30px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '12px',
            color: '#8C8981',
          }}
        >
          <div>
            © 2026 Aura Marina Ristorante & Villa Sanctuary. All rights reserved. Michelin Selected.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#hero" style={{ color: '#C9DDE0' }}>Back to Top ↑</a>
            <a href="/cms/login/" style={{ color: '#C9DDE0' }}>Staff Login</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
