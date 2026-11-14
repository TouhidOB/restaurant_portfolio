import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { Maximize2 } from 'lucide-react';

export default function S11_Gallery() {
  const { data, setLightboxImage } = useCMS();
  const gallery = data?.gallery || [];
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { label: 'All Photographs', id: 'all' },
    { label: 'Steaks & Food', id: 'food' },
    { label: 'Interior Design', id: 'interior' },
    { label: 'Exterior Architecture', id: 'exterior' },
    { label: 'Hearth & Flame', id: 'kitchen' },
    { label: 'Private Salons', id: 'events' },
  ];

  const filtered = activeTab === 'all'
    ? gallery
    : gallery.filter((item) => item.category === activeTab);

  return (
    <section id="gallery" style={{ backgroundColor: 'var(--color-charcoal)', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="section-container">
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>
            ATMOSPHERE & MOMENTS
          </div>
          <h2 className="section-title">
            Architectural & Culinary Gallery
          </h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            A visual chronicle of hand-chiselled stone, aged oak embers, vintage cellar vaults, and prime beef craft.
          </p>
        </div>

        {/* Filter Tabs */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '40px'
        }}>
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                background: activeTab === t.id ? 'var(--color-bronze)' : 'rgba(41, 39, 36, 0.7)',
                color: activeTab === t.id ? 'var(--color-obsidian)' : 'var(--color-ivory)',
                border: activeTab === t.id ? '1px solid var(--color-bronze)' : '1px solid var(--border-subtle)',
                padding: '8px 16px',
                borderRadius: '2px',
                fontFamily: 'var(--font-heading)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxImage(item)}
              style={{
                position: 'relative',
                height: '260px',
                borderRadius: '3px',
                overflow: 'hidden',
                cursor: 'pointer',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <img
                src={item.image || item.image_url}
                alt={item.alt_text || item.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.4s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(16,16,16,0.85) 0%, transparent 60%)',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                padding: '16px',
                opacity: 0.9
              }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '18px',
                  color: 'var(--color-ivory)'
                }}>
                  {item.title}
                </span>
                <Maximize2 size={16} color="var(--color-champagne)" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
