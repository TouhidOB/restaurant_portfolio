import React from 'react';
import { useCMS } from '../context/CMSContext';
import { MapPin, Phone, Mail, Clock, Navigation as NavIcon } from 'lucide-react';

export default function S14_Location() {
  const { data } = useCMS();
  const loc = data?.content?.location || {};
  const site = data?.content?.site || {};

  return (
    <section id="location" style={{ backgroundColor: 'var(--color-obsidian)', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="section-container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '60px',
          alignItems: 'center'
        }}>
          {/* Left: Contact, Address, Transit */}
          <div>
            <div className="section-eyebrow">
              {loc.eyebrow || 'MANHATTAN MIDTOWN EAST'}
            </div>
            <h2 className="section-title">
              {loc.heading || 'LOCATION & HOURS'}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', margin: '32px 0' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ background: 'var(--color-graphite)', padding: '10px', borderRadius: '2px', border: '1px solid var(--border-subtle)' }}>
                  <MapPin size={18} color="var(--color-champagne)" />
                </div>
                <div>
                  <div style={{ fontSize: '11px', fontFamily: 'var(--font-heading)', color: 'var(--color-taupe)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    Address
                  </div>
                  <div style={{ fontSize: '15px', color: 'var(--color-ivory)', fontWeight: 500, marginTop: '2px' }}>
                    {loc.address || site.address || '482 Lexington Avenue, Manhattan, NY 10017'}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-taupe)', marginTop: '4px' }}>
                    {loc.transit_note || 'Subway: 4, 5, 6, 7, S at Grand Central Terminal (3 minute walk). Valet parking available on Lexington Ave.'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ background: 'var(--color-graphite)', padding: '10px', borderRadius: '2px', border: '1px solid var(--border-subtle)' }}>
                  <Clock size={18} color="var(--color-champagne)" />
                </div>
                <div>
                  <div style={{ fontSize: '11px', fontFamily: 'var(--font-heading)', color: 'var(--color-taupe)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    Dinner Service Hours
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--color-ivory)', marginTop: '2px', lineHeight: '1.6' }}>
                    Tuesday – Sunday: 5:00 PM – 11:30 PM (Grill till 11:00 PM)<br />
                    <span style={{ color: 'var(--color-bronze)', fontSize: '12px' }}>Monday: Closed for Cellar Curation</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ background: 'var(--color-graphite)', padding: '10px', borderRadius: '2px', border: '1px solid var(--border-subtle)' }}>
                  <Phone size={18} color="var(--color-champagne)" />
                </div>
                <div>
                  <div style={{ fontSize: '11px', fontFamily: 'var(--font-heading)', color: 'var(--color-taupe)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    Concierge & Private Dining
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--color-ivory)', marginTop: '2px' }}>
                    {loc.phone || site.phone || '+1 (212) 840-7832'}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-champagne)', marginTop: '2px' }}>
                    {loc.email || site.email || 'concierge@charredandprime.com'}
                  </div>
                </div>
              </div>
            </div>

            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              <NavIcon size={14} /> Open in Google Maps
            </a>
          </div>

          {/* Right: Map / Architectural Venue Frame */}
          <div style={{ position: 'relative' }}>
            <div style={{
              borderRadius: '3px',
              overflow: 'hidden',
              border: '1px solid var(--border-subtle)',
              height: '420px',
              position: 'relative',
              background: 'var(--color-graphite)'
            }}>
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
                alt="Charred & Prime Exterior Lexington Avenue"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(16,16,16,0.92) 0%, transparent 60%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '28px'
              }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '24px',
                  color: 'var(--color-ivory)'
                }}>
                  Lexington Avenue Architectural Façade
                </div>
                <div style={{
                  fontSize: '12px',
                  color: 'var(--color-champagne)',
                  fontFamily: 'var(--font-heading)',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  marginTop: '4px'
                }}>
                  Grand Central East • Manhattan
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
