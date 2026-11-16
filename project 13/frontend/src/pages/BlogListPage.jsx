import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';

export default function BlogListPage({ onNavigate }) {
  const { blogPosts, blogCategories, openReservationModal } = useCMS();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredPosts = selectedCategory === 'all'
    ? blogPosts
    : blogPosts.filter(p => p.category === selectedCategory || p.category_slug === selectedCategory || p.category_name?.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <div style={{ backgroundColor: 'var(--color-midnight)', color: '#F6F4F0', minHeight: '100vh', paddingTop: '100px' }}>
      
      {/* Hero Header */}
      <section style={{ padding: '80px 0 50px 0', borderBottom: '1px solid var(--color-border)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-120px', left: '15%', width: '450px', height: '450px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255, 46, 136, 0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '800px' }}>
          <span className="text-eyebrow" style={{ display: 'inline-block', marginBottom: '12px' }}>
            HONGDAE DISPATCH & JOURNAL
          </span>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '16px' }}>
            Seoul Street Gazette
          </h1>
          <p style={{ color: 'var(--color-silver)', fontSize: '1.15rem', lineHeight: 1.8 }}>
            Chronicles of late-night pocha culture, wok flame secrets, slow fermentation archives, and Hongdae street food lore.
          </p>
        </div>
      </section>

      {/* Categories Filter Bar */}
      <section style={{ padding: '30px 0', borderBottom: '1px solid var(--color-border)', backgroundColor: '#0B0D0F' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setSelectedCategory('all')}
            style={{
              padding: '10px 22px',
              borderRadius: '999px',
              border: selectedCategory === 'all' ? '1px solid var(--color-magenta)' : '1px solid var(--color-border)',
              backgroundColor: selectedCategory === 'all' ? 'var(--color-magenta)' : 'transparent',
              color: '#FFFFFF',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '1rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: selectedCategory === 'all' ? '0 0 15px rgba(255, 46, 136, 0.4)' : 'none'
            }}
          >
            All Chronicles
          </button>

          {blogCategories && blogCategories.map((cat) => {
            const isActive = selectedCategory === cat.slug || selectedCategory === cat.name;
            return (
              <button
                key={cat.id || cat.slug}
                onClick={() => setSelectedCategory(cat.slug || cat.name)}
                style={{
                  padding: '10px 22px',
                  borderRadius: '999px',
                  border: isActive ? '1px solid var(--color-cyan)' : '1px solid var(--color-border)',
                  backgroundColor: isActive ? 'var(--color-cyan)' : 'transparent',
                  color: isActive ? '#0A0C0E' : '#D0D0D0',
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: '1rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 0 15px rgba(33, 212, 232, 0.4)' : 'none'
                }}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--color-midnight)' }}>
        <div className="container">
          {filteredPosts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--color-silver)' }}>
              No articles found in this category.
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '36px' }}>
              {filteredPosts.map((post) => (
                <article
                  key={post.id || post.slug}
                  onClick={() => onNavigate && onNavigate(`/blog/${post.slug}`)}
                  style={{
                    backgroundColor: 'var(--color-charcoal)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '1px solid var(--color-border)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.25s ease, border-color 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.borderColor = 'var(--color-magenta)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                  }}
                >
                  <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={post.featured_image || 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&q=80'}
                      alt={post.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                    />
                    <div style={{ position: 'absolute', top: '16px', left: '16px', backgroundColor: 'rgba(17, 19, 22, 0.85)', backdropFilter: 'blur(8px)', padding: '6px 14px', borderRadius: '999px', border: '1px solid rgba(255, 46, 136, 0.4)', fontSize: '0.8rem', color: 'var(--color-magenta)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      {post.category_name || post.category || 'Gazette'}
                    </div>
                  </div>

                  <div style={{ padding: '30px 28px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.84rem', color: 'var(--color-muted)', marginBottom: '12px' }}>
                        <span>{post.published_date || 'November 2026'}</span>
                        <span>•</span>
                        <span>{post.reading_time || '5 min read'}</span>
                      </div>

                      <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.45rem', color: '#FFFFFF', lineHeight: 1.3, marginBottom: '12px' }}>
                        {post.title}
                      </h2>

                      <p style={{ color: 'var(--color-silver)', fontSize: '0.94rem', lineHeight: 1.65, marginBottom: '20px' }}>
                        {post.excerpt || post.summary || post.meta_description}
                      </p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px' }}>
                      <span style={{ fontSize: '0.88rem', color: 'var(--color-cyan)', fontWeight: 600 }}>
                        By {post.author || 'Seoul Street Culinary Team'}
                      </span>
                      <span style={{ color: 'var(--color-magenta)', fontWeight: 700, fontSize: '0.92rem' }}>
                        Read Article →
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section style={{ padding: '80px 0', backgroundColor: '#0B0D0F', borderTop: '1px solid var(--color-border)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '680px' }}>
          <span className="text-eyebrow" style={{ display: 'inline-block', marginBottom: '8px' }}>STAY CONNECTED</span>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2.4rem', color: '#F6F4F0', marginBottom: '14px' }}>
            Dine With Us in Hongdae
          </h2>
          <p style={{ color: 'var(--color-silver)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '28px' }}>
            Book your next late-night gathering at Seoul Street and experience these recipes right off the flaming woks.
          </p>
          <button
            onClick={() => openReservationModal && openReservationModal('Gazette Reader Table')}
            className="btn btn-primary"
            style={{ padding: '14px 36px', fontSize: '1rem', fontWeight: 700, borderRadius: '8px' }}
          >
            Reserve Your Pocha Table
          </button>
        </div>
      </section>

    </div>
  );
}
