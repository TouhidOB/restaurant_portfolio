import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';

export default function GallerySection() {
  const { data, setLightboxImage } = useCMS();
  const gallery = data.gallery_items || [];
  const section = data.sections?.gallery || {};

  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { key: 'all', label: 'All Perspectives' },
    { key: 'architecture', label: 'Architecture & Arches' },
    { key: 'cuisine', label: 'Seafood & Raw Bar' },
    { key: 'atmosphere', label: 'Sunset & Terrace' },
    { key: 'wine', label: 'Cellar & Spritz' },
  ];

  const filteredItems = activeTab === 'all'
    ? gallery
    : gallery.filter((item) => item.category === activeTab);

  return (
    <section id="gallery" className="section-wrapper" style={{ backgroundColor: '#FCFBF8' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            {section.badge || 'VISUAL ESSENCE'}
          </div>
          <h2 className="section-title">
            Mediterranean Moments & <em>Textures</em>
          </h2>
          <p className="section-subtitle">
            {section.subtitle || 'Limestone arches, golden sunsets, glistening seafood, and the serene rhythm of the sea.'}
          </p>
        </div>

        {/* Category Tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: '44px',
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: '9px 20px',
                borderRadius: '30px',
                fontSize: '12px',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.06em',
                cursor: 'pointer',
                background: activeTab === tab.key ? 'var(--grad-gold)' : '#FFFFFF',
                color: activeTab === tab.key ? '#081721' : '#4A5255',
                border: activeTab === tab.key ? '1px solid #C5A059' : '1px solid #E5DDCF',
                fontWeight: activeTab === tab.key ? 700 : 500,
                boxShadow: activeTab === tab.key ? '0 4px 15px rgba(197, 160, 89, 0.3)' : 'none',
                transition: 'all 0.25s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Masonry Style Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '28px',
          }}
        >
          {filteredItems.map((item) => (
            <div
              key={item.id || item.title}
              onClick={() => setLightboxImage(item)}
              style={{
                position: 'relative',
                height: '300px',
                borderRadius: '16px',
                overflow: 'hidden',
                cursor: 'pointer',
                border: '1px solid rgba(197, 160, 89, 0.3)',
                boxShadow: '0 8px 25px rgba(8, 23, 33, 0.06)',
              }}
            >
              <img
                src={item.image_url || item.image}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(8, 23, 33, 0.88) 0%, rgba(8, 23, 33, 0) 65%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '24px',
                  color: '#FAF9F5',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    color: '#DFBA73',
                    marginBottom: '4px',
                    fontWeight: 600,
                  }}
                >
                  {item.category}
                </span>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#FAF9F5' }}>
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
