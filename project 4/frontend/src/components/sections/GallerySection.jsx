import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';

export default function GallerySection() {
  const { content, openLightbox } = useCMS();
  const s10 = content.sections?.gallery || {};
  const gallery = content.gallery || [];
  const [selectedFilter, setSelectedFilter] = useState('all');

  const categories = [
    { label: 'ALL ENTRIES', value: 'all' },
    { label: 'CULINARY', value: 'food' },
    { label: 'CONCRETE INTERIOR', value: 'interior' },
    { label: 'BRUTALIST ARCHITECTURE', value: 'exterior' },
    { label: 'RAW DETAILS', value: 'details' },
  ];

  const filtered = selectedFilter === 'all'
    ? gallery
    : gallery.filter((img) => img.category === selectedFilter);

  return (
    <section id="gallery" className="section-shell">
      <div className="container-brutal">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
          <div>
            <div className="section-tag">
              SECTION 10 // {s10.eyebrow || 'THE ARCHIVE'}
            </div>
            <h2 className="section-heading" style={{ marginBottom: '0.5rem' }}>
              {s10.title || 'VISUAL RECORD.'}
            </h2>
            <p className="section-lead">
              {s10.subtitle || 'A stark monochrome and high-chroma record of dishes, spatial geometry, and textures.'}
            </p>
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {categories.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => setSelectedFilter(c.value)}
                style={{
                  background: selectedFilter === c.value ? 'var(--accent-orange)' : 'transparent',
                  color: selectedFilter === c.value ? '#000' : 'var(--text-secondary)',
                  border: '1px solid',
                  borderColor: selectedFilter === c.value ? 'var(--accent-orange)' : 'var(--border-steel)',
                  padding: '0.4rem 0.8rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetrical Masonry Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {filtered.map((item, idx) => (
            <div
              key={item.id || idx}
              style={{
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: '#1b1c19',
                border: '1px solid var(--border-steel)',
                cursor: 'pointer',
                aspectRatio: idx % 3 === 0 ? '4/5' : '16/11',
              }}
              onClick={() => openLightbox(item)}
            >
              <img
                src={item.image_url}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.4s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(32,33,31,0.95) 0%, transparent 60%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '1.25rem',
                }}
              >
                <span className="meta-chip" style={{ alignSelf: 'flex-start', marginBottom: '0.5rem', fontSize: '0.65rem' }}>
                  {item.category?.toUpperCase()}
                </span>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.05rem' }}>
                  {item.title}
                </div>
                {item.caption && (
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                    {item.caption}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
