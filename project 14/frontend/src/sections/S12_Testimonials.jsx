import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Star, Quote } from 'lucide-react';

export default function S12_Testimonials() {
  const { data } = useCMS();
  const reviews = data?.testimonials || [];

  return (
    <section id="reviews" style={{ backgroundColor: 'var(--color-obsidian)', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="section-container">
        <div style={{ textAlign: 'center', marginBottom: '52px' }}>
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>
            CRITICAL ACCLAIM & HOSPITALITY RECORD
          </div>
          <h2 className="section-title">
            Guest Reviews & Press Features
          </h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Reflections from renowned culinary critics, travel journals, and our cherished evening patrons.
          </p>
        </div>

        {/* Reviews Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '28px'
        }}>
          {reviews.map((r) => (
            <div
              key={r.id}
              style={{
                background: 'var(--color-charcoal)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '4px',
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-champagne)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div>
                {/* 5 Stars */}
                <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                  {[...Array(r.rating || 5)].map((_, i) => (
                    <Star key={i} size={14} fill="#C4A878" color="#C4A878" />
                  ))}
                </div>

                <p style={{
                  fontSize: '14px',
                  color: 'var(--color-ivory)',
                  fontStyle: 'italic',
                  lineHeight: '1.75',
                  marginBottom: '24px'
                }}>
                  "{r.review_text}"
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
                <h4 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '18px',
                  color: 'var(--color-champagne)'
                }}>
                  {r.guest_name}
                </h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--color-taupe)', marginTop: '2px' }}>
                  <span>{r.source}</span>
                  <span>{r.review_date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
