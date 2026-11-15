import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function ContactPage({ onNavigateHome, onOpenReservation }) {
  const { content } = useCMS();
  const restaurant = content.restaurant || {};
  const faqs = content.faqs || [];

  return (
    <div style={{ paddingTop: 'calc(var(--header-height) + 3rem)', paddingBottom: '6rem', minHeight: '100vh', backgroundColor: 'var(--bg-dark)' }}>
      <div className="container-brutal">
        {/* Navigation Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
          <button onClick={onNavigateHome} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0 }}>
            INDEX
          </button>
          <span style={{ color: 'var(--border-light)' }}>/</span>
          <span style={{ color: 'var(--accent-orange)' }}>13. CONTACT &amp; LOCATION</span>
        </div>

        {/* Hero Header */}
        <div style={{ borderBottom: '2px solid var(--border-steel)', paddingBottom: '2.5rem', marginBottom: '3.5rem' }}>
          <span className="section-tag">COORDINATES &bull; CONCIERGE &bull; LOGISTICS</span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, marginTop: '0.75rem', textTransform: 'uppercase' }}>
            LOCATION &amp; INQUIRIES.
          </h1>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.9rem, 2vw, 1.15rem)', color: 'var(--accent-orange)', marginTop: '1rem', maxWidth: '800px', lineHeight: 1.6 }}>
            {restaurant.coordinates_display || '40.7128° N, 74.0060° W — SECTOR 09'}
          </p>
        </div>

        {/* Contact Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-steel)', padding: '2rem' }}>
            <span className="section-tag" style={{ fontSize: '0.7rem' }}>PHYSICAL ADDRESS</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0.5rem 0', textTransform: 'uppercase' }}>
              DISTRICT 09 NYC
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              {restaurant.address || '480 Industrial Avenue, District 09'}<br />
              {restaurant.city || 'New York, NY 10014'}
            </p>
          </div>

          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-steel)', padding: '2rem' }}>
            <span className="section-tag" style={{ fontSize: '0.7rem' }}>OPERATIONAL HOURS</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0.5rem 0', textTransform: 'uppercase' }}>
              SHIFT SCHEDULE
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              {restaurant.opening_hours_summary || 'TUE — SUN / 17:30 — 00:00 (CLOSED MON)'}<br />
              Lunch: 12:00 — 15:30 (Thu — Sun)
            </p>
          </div>

          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-steel)', padding: '2rem' }}>
            <span className="section-tag" style={{ fontSize: '0.7rem' }}>CONCIERGE DESK</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0.5rem 0', textTransform: 'uppercase' }}>
              DIRECT CHANNELS
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              PHONE: <strong style={{ color: 'var(--accent-orange)' }}>{restaurant.phone || '+1 (212) 555-0198'}</strong><br />
              EMAIL: <strong style={{ color: '#fff' }}>{restaurant.email || 'concierge@monolith-dining.com'}</strong>
            </p>
          </div>
        </div>

        {/* Action Button & Inquiries */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-steel)', padding: '2.5rem', marginBottom: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              RESERVE YOUR TABLE ONLINE
            </h3>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Two-shift booking system with instant reference code lookup and live table confirmation.
            </p>
          </div>
          <button onClick={onOpenReservation} className="btn-orange" style={{ padding: '0.75rem 2rem' }}>
            OPEN RESERVATION DESK &rarr;
          </button>
        </div>

        {/* FAQs Section */}
        <div style={{ borderTop: '1px solid var(--border-steel)', paddingTop: '3.5rem' }}>
          <span className="section-tag">LOGISTICS &amp; PROTOCOL</span>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, margin: '0.75rem 0 2rem', textTransform: 'uppercase' }}>
            FREQUENT INQUIRIES
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {faqs.map((faq, idx) => (
              <div key={faq.id || idx} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-steel)', padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--accent-orange)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                  {faq.question}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
