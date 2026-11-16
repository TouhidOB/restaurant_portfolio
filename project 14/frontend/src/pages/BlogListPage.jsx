import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';

export default function BlogListPage({ onNavigate }) {
  const { blogPosts, blogCategories, openReservation, openReservationModal } = useCMS();
  const triggerReservation = openReservationModal || openReservation;
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredPosts = selectedCategory === 'all'
    ? blogPosts
    : blogPosts.filter(p => p.category === selectedCategory || p.category_slug === selectedCategory || p.category_name?.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <div style={{ backgroundColor: 'var(--color-obsidian)', color: 'var(--color-ivory)', minHeight: '100vh', paddingTop: '100px' }}>
      
      {/* Hero Header */}
      <section style={{ padding: '80px 0 50px 0', borderBottom: '1px solid var(--border-subtle)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-100px', left: '15%', width: '450px', height: '450px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(148, 115, 79, 0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="section-container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '820px', margin: '0 auto', padding: '0 24px' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-bronze)', fontFamily: 'var(--font-heading)', fontWeight: 700, display: 'inline-block', marginBottom: '12px' }}>
            EDITORIAL GAZETTE & CELLAR JOURNAL
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.6rem, 5vw, 4.2rem)', fontWeight: 600, lineHeight: 1.15, marginBottom: '18px', color: 'var(--color-ivory)' }}>
            Steakhouse Gazette
          </h1>
          <div style={{ width: '60px', height: '2px', background: 'var(--color-bronze)', margin: '0 auto 24px auto' }} />
          <p style={{ color: 'var(--color-taupe)', fontSize: '1.15rem', lineHeight: 1.8 }}>
            Chronicles of Himalayan salt dry-aging science, kiln-dried white oak live fire, library vintage Bordeaux cellars, and heritage cattle provenance.
          </p>
        </div>
      </section>

      {/* Category Pills Bar */}
      <section style={{ padding: '24px 0', backgroundColor: 'var(--color-charcoal)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="section-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setSelectedCategory('all')}
            style={{
              padding: '8px 20px',
              borderRadius: '2px',
              border: selectedCategory === 'all' ? '1px solid var(--color-bronze)' : '1px solid var(--border-subtle)',
              background: selectedCategory === 'all' ? 'var(--color-bronze)' : 'transparent',
              color: selectedCategory === 'all' ? '#101010' : 'var(--color-taupe)',
              fontFamily: 'var(--font-heading)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            All Chronicles
          </button>

          {blogCategories.map((cat) => {
            const isActive = selectedCategory === cat.slug || selectedCategory === cat.name;
            return (
              <button
                key={cat.id || cat.slug}
                onClick={() => setSelectedCategory(cat.slug || cat.name)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '2px',
                  border: isActive ? '1px solid var(--color-champagne)' : '1px solid var(--border-subtle)',
                  background: isActive ? 'rgba(196, 168, 120, 0.15)' : 'transparent',
                  color: isActive ? 'var(--color-champagne)' : 'var(--color-taupe)',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </section>

      {/* Article Cards Grid */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--color-obsidian)' }}>
        <div className="section-container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 32px' }}>
          {filteredPosts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--color-taupe)' }}>
              No articles found in this category.
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '36px' }}>
              {filteredPosts.map((post) => (
                <article
                  key={post.id || post.slug}
                  onClick={() => onNavigate && onNavigate(`/blog/${post.slug}`)}
                  style={{
                    background: 'var(--color-charcoal)',
                    borderRadius: '4px',
                    border: '1px solid var(--border-subtle)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 15px 40px rgba(0,0,0,0.5)',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease, border-color 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.borderColor = 'var(--color-champagne)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  }}
                >
                  <div>
                    <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                      <img
                        src={post.featured_image || 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=80'}
                        alt={post.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'rgba(16, 16, 16, 0.85)', backdropFilter: 'blur(8px)', padding: '4px 12px', borderRadius: '2px', border: '1px solid var(--border-subtle)', fontSize: '10px', color: 'var(--color-champagne)', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>
                        {post.category_name || post.category || 'Gazette'}
                      </div>
                    </div>

                    <div style={{ padding: '28px 26px 20px' }}>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '11px', color: 'var(--color-taupe)', marginBottom: '10px', fontFamily: 'var(--font-heading)' }}>
                        <span>{post.published_date || 'November 2026'}</span>
                        <span>•</span>
                        <span>{post.reading_time || '5 min read'}</span>
                      </div>

                      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: 'var(--color-ivory)', lineHeight: 1.3, marginBottom: '12px' }}>
                        {post.title}
                      </h2>

                      <p style={{ color: 'var(--color-taupe)', fontSize: '0.94rem', lineHeight: 1.7, marginBottom: '18px' }}>
                        {post.excerpt || post.content?.slice(0, 140) + '...'}
                      </p>
                    </div>
                  </div>

                  <div style={{ padding: '0 26px 24px', borderTop: '1px solid rgba(148, 115, 79, 0.15)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', color: 'var(--color-champagne)', fontFamily: 'var(--font-heading)' }}>
                      By {post.author ? post.author.split('—')[0] : 'Steak Sommelier'}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--color-bronze)', fontFamily: 'var(--font-heading)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
                      Read Article →
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Booking Prompt */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--color-charcoal)', borderTop: '1px solid var(--border-subtle)', textAlign: 'center' }}>
        <div className="section-container" style={{ maxWidth: '680px', margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--color-ivory)', marginBottom: '16px' }}>
            Experience These Recipes at the Table
          </h2>
          <p style={{ color: 'var(--color-taupe)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '32px' }}>
            Book table seating at Charred & Prime and let our master chefs and sommeliers prepare these cuts for you.
          </p>
          <button
            onClick={() => triggerReservation('Gazette Reader Booking')}
            style={{ padding: '14px 34px', background: 'var(--color-bronze)', border: 'none', borderRadius: '2px', color: '#101010', fontFamily: 'var(--font-heading)', fontSize: '12px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer' }}
          >
            Reserve Table at Charred & Prime
          </button>
        </div>
      </section>

    </div>
  );
}
