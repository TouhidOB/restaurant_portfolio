import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { Shield } from 'lucide-react';

export default function Footer() {
  const { data, openReservation } = useCMS();
  const site = data?.content?.site || {};
  const footer = data?.content?.footer || {};

  return (
    <footer style={{
      backgroundColor: 'var(--color-obsidian)',
      borderTop: '1px solid var(--border-subtle)',
      paddingTop: '80px',
      paddingBottom: '40px',
      position: 'relative'
    }}>
      <div className="section-container" style={{ padding: '0 32px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '40px',
          marginBottom: '60px'
        }}>
          {/* Col 1: Brand Info */}
          <div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '28px',
              letterSpacing: '2px',
              color: 'var(--color-ivory)',
              marginBottom: '14px'
            }}>
              CHARRED <span style={{ color: 'var(--color-bronze)' }}>&</span> PRIME
            </h2>
            <p style={{
              fontSize: '13px',
              color: 'var(--color-taupe)',
              lineHeight: '1.7',
              marginBottom: '20px',
              maxWidth: '320px'
            }}>
              {footer.description || 'An architectural sanctuary celebrating heritage dry-aged beef, open-fire cooking, and fine hospitality.'}
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <a
                href="/cms/"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '11px',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: 'var(--color-champagne)',
                  background: 'rgba(148, 115, 79, 0.1)',
                  border: '1px solid var(--border-subtle)',
                  padding: '6px 12px',
                  borderRadius: '2px'
                }}
              >
                <Shield size={12} /> CMS Studio Desk
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--color-champagne)',
              marginBottom: '18px'
            }}>
              Editorial Sections
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: 'var(--color-taupe)' }}>
              <li><a href="#story" style={{ transition: 'color 0.2s' }}>Brand Story</a></li>
              <li><a href="#tour" style={{ transition: 'color 0.2s' }}>5-Viewpoint 3D Tour</a></li>
              <li><a href="#philosophy" style={{ transition: 'color 0.2s' }}>Culinary Provenance</a></li>
              <li><a href="#signature-steaks" style={{ transition: 'color 0.2s' }}>Signature Steaks</a></li>
              <li><a href="#menu" style={{ transition: 'color 0.2s' }}>Complete Menu Explorer</a></li>
              <li><a href="#hearth" style={{ transition: 'color 0.2s' }}>The Open Hearth</a></li>
              <li><a href="#private-dining" style={{ transition: 'color 0.2s' }}>Private Dining Salons</a></li>
            </ul>
          </div>

          {/* Col 3: Dining Hours */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--color-champagne)',
              marginBottom: '18px'
            }}>
              Service Hours
            </h4>
            <div style={{ fontSize: '13px', color: 'var(--color-taupe)', lineHeight: '1.8' }}>
              <div><strong style={{ color: 'var(--color-ivory)' }}>Tuesday – Thursday:</strong> 5:00 PM – 11:00 PM</div>
              <div><strong style={{ color: 'var(--color-ivory)' }}>Friday – Saturday:</strong> 5:00 PM – 11:30 PM</div>
              <div><strong style={{ color: 'var(--color-ivory)' }}>Sunday:</strong> 4:30 PM – 10:30 PM</div>
              <div style={{ color: 'var(--color-bronze)', marginTop: '8px' }}>Monday: Closed for Dry-Age Cellar Maintenance</div>
            </div>
          </div>

          {/* Col 4: Concierge & Reservations */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--color-champagne)',
              marginBottom: '18px'
            }}>
              Dining Concierge
            </h4>
            <div style={{ fontSize: '13px', color: 'var(--color-taupe)', lineHeight: '1.8', marginBottom: '18px' }}>
              <div>{site.address || '482 Lexington Avenue, Manhattan, NY 10017'}</div>
              <div>{site.phone || '+1 (212) 840-7832'}</div>
              <div>{site.email || 'concierge@charredandprime.com'}</div>
            </div>
            <button onClick={() => openReservation()} className="btn-prime" style={{ padding: '10px 18px', fontSize: '11px' }}>
              Request Seating
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(148, 115, 79, 0.15)',
          paddingTop: '28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '12px',
          color: 'var(--color-taupe)'
        }}>
          <div>
            {footer.copyright || '© 2026 Charred & Prime Steakhouse. All rights reserved.'}
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#terms">Terms & Hospitality Guidelines</a>
            <a href="#privacy">Privacy Policy</a>
            <a href="/cms/">Admin Login</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
