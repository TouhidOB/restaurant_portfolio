import React from 'react';
import { Star, Quote } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function TestimonialsSection() {
  const { data } = useCMS();
  const testimonials = data.testimonials || [];
  const section = data.sections?.testimonials || {};

  return (
    <section id="testimonials" className="section-wrapper" style={{ backgroundColor: '#F8F6F0' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            {section.badge || 'ACCLAIM & RECOGNITION'}
          </div>
          <h2 className="section-title">
            {section.title || 'WHAT OUR GUESTS & CRITICS SAY'}
          </h2>
          <p className="section-subtitle">
            {section.subtitle || 'Reflections from international culinary travelers, yacht captains, and leading gastronomic publications.'}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px',
          }}
        >
          {testimonials.map((t, idx) => (
            <div
              key={t.id || idx}
              className="luxury-card"
              style={{
                padding: '36px 32px',
                background: '#FFFFFF',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                {/* 5 Stars */}
                <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} size={16} fill="#D6A854" color="#D6A854" />
                  ))}
                </div>

                <Quote size={28} color="#C9DDE0" style={{ marginBottom: '12px' }} />

                <p
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.25rem',
                    fontStyle: 'italic',
                    color: '#174A63',
                    lineHeight: 1.5,
                    marginBottom: '24px',
                  }}
                >
                  "{t.quote}"
                </p>
              </div>

              <div style={{ borderTop: '1px solid #EFEAE0', paddingTop: '16px' }}>
                <h4 style={{ fontSize: '1.1rem', color: '#174A63', marginBottom: '2px' }}>
                  {t.guest_name}
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#8C8981' }}>
                  {t.source_or_title} • {t.visit_date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
