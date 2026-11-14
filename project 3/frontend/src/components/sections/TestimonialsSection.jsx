import React from 'react';
import { Star, Quote, Award } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function TestimonialsSection() {
  const { data } = useCMS();
  const testimonials = data.testimonials || [];
  const section = data.sections?.testimonials || {};

  return (
    <section id="testimonials" className="section-wrapper" style={{ backgroundColor: '#F6F4EE' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            {section.badge || 'ACCLAIM & RECOGNITION'}
          </div>
          <h2 className="section-title">
            What Our Guests & <em>Critics Say</em>
          </h2>
          <p className="section-subtitle">
            {section.subtitle || 'Reflections from international culinary travelers, yacht captains, and leading gastronomic publications.'}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))',
            gap: '32px',
          }}
        >
          {testimonials.map((t, idx) => (
            <div
              key={t.id || idx}
              className="luxury-card"
              style={{
                padding: '40px 36px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
                  {/* 5 Stars */}
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} size={16} fill="#C5A059" color="#C5A059" />
                    ))}
                  </div>

                  {/* Micro Award Badge */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#C5A059', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    <Award size={13} color="#C5A059" />
                    <span>VERIFIED CRITIC</span>
                  </div>
                </div>

                <Quote size={30} color="#C5A059" style={{ opacity: 0.7, marginBottom: '14px' }} />

                <p
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.3rem',
                    fontStyle: 'italic',
                    color: '#081721',
                    lineHeight: 1.55,
                    marginBottom: '26px',
                  }}
                >
                  "{t.quote}"
                </p>
              </div>

              <div style={{ borderTop: '1px solid rgba(197, 160, 89, 0.25)', paddingTop: '18px' }}>
                <h4 style={{ fontSize: '1.2rem', color: '#081721', marginBottom: '3px' }}>
                  {t.guest_name}
                </h4>
                <p style={{ fontSize: '0.88rem', color: '#7A7E80' }}>
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
