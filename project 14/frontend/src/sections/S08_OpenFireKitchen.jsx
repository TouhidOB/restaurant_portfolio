import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Flame, Compass, Thermometer } from 'lucide-react';

export default function S08_OpenFireKitchen() {
  const { data } = useCMS();
  const fire = data?.content?.open_fire_kitchen || {};

  return (
    <section id="hearth" style={{ backgroundColor: 'var(--color-obsidian)', borderBottom: '1px solid var(--border-subtle)', position: 'relative' }}>
      <div className="section-container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '64px',
          alignItems: 'center'
        }}>
          {/* Left Column: Image with Warm Glowing Embers Overlay */}
          <div style={{ position: 'relative' }}>
            <div style={{
              borderRadius: '2px',
              overflow: 'hidden',
              boxShadow: '0 24px 60px rgba(0,0,0,0.9)',
              border: '1px solid var(--border-subtle)',
              position: 'relative'
            }}>
              <img
                src={fire.image || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80'}
                alt="Open-Fire Parrilla Grill"
                style={{
                  width: '100%',
                  height: '480px',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(16,16,16,0.9) 0%, rgba(216,154,75,0.15) 50%, transparent 100%)'
              }} />
            </div>

            {/* Floating Hearth Badge */}
            <div style={{
              position: 'absolute',
              bottom: '24px',
              left: '24px',
              background: 'rgba(28, 27, 25, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '1px solid var(--color-amber)',
              borderRadius: '2px',
              padding: '14px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <Flame size={24} color="var(--color-amber)" />
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--color-taupe)' }}>
                  HEARTH THERMAL SPEC
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: 'var(--color-ivory)', fontWeight: 600 }}>
                  1,200°F Hardwood Embers
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Fire Narrative & Wood Types */}
          <div>
            <div className="section-eyebrow">
              {fire.eyebrow || 'THE SACRED FLAME'}
            </div>

            <h2 className="section-title">
              {fire.heading || 'CRAFTED OVER FIRE. SERVED WITH PURPOSE.'}
            </h2>

            <p style={{
              fontSize: '16px',
              color: 'var(--color-taupe)',
              lineHeight: '1.85',
              marginBottom: '32px'
            }}>
              {fire.description ||
                'Our open hearth is the beating heart of the dining room. Live embers, wood smoke aromas, and the hypnotic sizzle of cast iron form an elemental backdrop to an evening of culinary drama.'}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>
              <div style={{ background: 'var(--color-graphite)', padding: '18px', borderRadius: '3px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ color: 'var(--color-champagne)', fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>
                  Kiln-Dried Post Oak
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-taupe)', lineHeight: '1.6' }}>
                  Provides clean high-heatBTUs and subtle, sweet wood notes that do not overpower prime beef marbling.
                </div>
              </div>

              <div style={{ background: 'var(--color-graphite)', padding: '18px', borderRadius: '3px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ color: 'var(--color-champagne)', fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>
                  Japanese Binchotan
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-taupe)', lineHeight: '1.6' }}>
                  Ultra-dense white oak charcoal that burns smoke-free with intense infrared heat for instantaneous crust searing.
                </div>
              </div>
            </div>

            <div style={{
              borderLeft: '2px solid var(--color-bronze)',
              paddingLeft: '18px',
              fontStyle: 'italic',
              color: 'var(--color-ivory)',
              fontFamily: 'var(--font-display)',
              fontSize: '18px',
              lineHeight: '1.5'
            }}>
              "Fire is not merely our fuel—it is our primary seasoning and our deepest discipline."
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
