import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function TestimonialsSection({ testimonials }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex] || testimonials[0];

  return (
    <section
      id="testimonials"
      className="section-padding"
      style={{
        backgroundColor: 'var(--color-obsidian)',
        position: 'relative',
        borderBottom: '1px solid var(--color-border-gold-subtle)',
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>
            PATRON REFLECTIONS
          </div>
          <h2
            style={{
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              color: 'var(--color-pearl)',
              marginBottom: '16px',
            }}
          >
            Words from Our Guests.
          </h2>
          <p
            style={{
              maxWidth: '560px',
              margin: '0 auto',
              fontSize: '15px',
              color: 'var(--color-pearl-muted)',
              lineHeight: 1.6,
            }}
          >
            The moments that matter most are the memories and impressions our guests carry with them.
          </p>
          <div className="gold-divider">
            <span className="deco-diamond" />
          </div>
        </div>

        {/* Testimonial Carousel Card */}
        <div
          className="deco-frame"
          style={{
            maxWidth: '820px',
            margin: '0 auto',
            backgroundColor: 'var(--color-obsidian-soft)',
            padding: '54px 48px',
            position: 'relative',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          }}
        >
          {/* Subtle Decorative Quote Icon */}
          <Quote
            size={64}
            color="var(--color-gold)"
            style={{
              position: 'absolute',
              top: '24px',
              left: '32px',
              opacity: 0.12,
              pointerEvents: 'none',
            }}
          />

          {/* 5-Star Rating */}
          <div style={{ display: 'flex', gap: '6px', marginBottom: '24px', justifyContent: 'center' }}>
            {[...Array(current.rating || 5)].map((_, i) => (
              <Star key={i} size={16} fill="var(--color-gold)" color="var(--color-gold)" />
            ))}
          </div>

          {/* Testimonial Quote */}
          <blockquote
            style={{
              fontFamily: 'var(--font-accent)',
              fontSize: 'clamp(20px, 2.5vw, 28px)',
              fontStyle: 'italic',
              lineHeight: 1.5,
              color: 'var(--color-pearl)',
              textAlign: 'center',
              marginBottom: '32px',
            }}
          >
            "{current.quote}"
          </blockquote>

          {/* Author Details */}
          <div style={{ textAlign: 'center' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '20px',
                color: 'var(--color-gold)',
                display: 'block',
                marginBottom: '4px',
              }}
            >
              {current.author}
            </span>
            <span
              style={{
                fontSize: '11px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--color-jade)',
              }}
            >
              {current.title} • {current.date}
            </span>
          </div>

          {/* Navigation Controls */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '40px',
              borderTop: '1px solid var(--color-border-gold-subtle)',
              paddingTop: '20px',
            }}
          >
            <button
              onClick={handlePrev}
              aria-label="Previous Testimonial"
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: 'transparent',
                border: '1px solid var(--color-border-gold)',
                color: 'var(--color-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-gold)'; e.currentTarget.style.color = '#17191A'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--color-gold)'; }}
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Show testimonial ${idx + 1}`}
                  style={{
                    width: idx === currentIndex ? '24px' : '8px',
                    height: '4px',
                    borderRadius: '2px',
                    background: idx === currentIndex ? 'var(--color-gold)' : 'rgba(214, 184, 121, 0.3)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              aria-label="Next Testimonial"
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: 'transparent',
                border: '1px solid var(--color-border-gold)',
                color: 'var(--color-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-gold)'; e.currentTarget.style.color = '#17191A'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--color-gold)'; }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
