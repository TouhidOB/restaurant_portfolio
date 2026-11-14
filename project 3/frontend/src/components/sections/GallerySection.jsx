import React, { useState } from 'react';
import { Eye, Camera } from 'lucide-react';
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
    <section id="gallery" className="section-wrapper" style={{ backgroundColor: '#FAF9F5' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            {section.badge || 'VISUAL ESSENCE'}
          </div>
          <h2 className="section-title">
            {section.title || 'MEDITERRANEAN MOMENTS & TEXTURES'}
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
            gap: '8px',
            flexWrap: 'wrap',
            marginBottom: '40px',
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: '8px 18px',
                borderRadius: '24px',
                fontSize: '12px',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.04em',
                cursor: 'pointer',
                background: activeTab === tab.key ? '#174A63' : '#FFFFFF',
                color: activeTab === tab.key ? '#FFFFFF' : '#174A63',
                border: activeTab === tab.key ? '1px solid #174A63' : '1px solid #D8CCB8',
                transition: 'all 0.2s',
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {filteredItems.map((item) => (
            <div
              key={item.id || item.title}
              onClick={() => setLightboxImage(item)}
              style={{
                position: 'relative',
                height: '280px',
                borderRadius: '12px',
                overflow: 'hidden',
                cursor: 'pointer',
                border: '1px solid #D8CCB8',
                boxShadow: '0 4px 15px rgba(23, 74, 99, 0.05)',
              }}
            >
              <img
                src={item.image_url || item.image}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(15, 49, 66, 0.85) 0%, rgba(15, 49, 66, 0) 60%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '20px',
                  color: '#FAF9F5',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: '#C9DDE0',
                    marginBottom: '4px',
                  }}
                >
                  {item.category}
                </span>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: '#FAF9F5' }}>
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
