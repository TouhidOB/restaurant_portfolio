import React, { useState, useMemo } from 'react';
import { useCMS } from '../context/CMSContext';
import { ArrowLeft, Sparkles, BookOpen, Clock, Calendar } from 'lucide-react';

export default function BlogListPage({ onNavigate }) {
  const { blogPosts, blogCategories } = useCMS();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'all') return blogPosts;
    return blogPosts.filter((p) => {
      const slug = p.category_slug || (p.category && p.category.slug);
      return slug === selectedCategory;
    });
  }, [blogPosts, selectedCategory]);

  return (
    <div style={{ backgroundColor: '#0A0A0C', color: '#FFF', minHeight: '100vh', paddingTop: '110px', paddingBottom: '90px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Navigation back */}
        <div style={{ marginBottom: '32px' }}>
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('/'); }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#FFDD00',
              textDecoration: 'none',
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 700,
              fontSize: '13px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
          >
            <ArrowLeft size={16} /> Back to Studio Home
          </a>
        </div>

        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 48px auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(255, 221, 0, 0.12)', border: '1px solid rgba(255, 221, 0, 0.3)', color: '#FFDD00', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px' }}>
            <BookOpen size={13} /> EDITORIAL JOURNAL // POP GAZETTE
          </div>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-1px', marginBottom: '16px' }}>
            THE POP FOOD GAZETTE.
          </h1>
          <p style={{ color: '#8E8EA0', fontSize: '16px', lineHeight: 1.6 }}>
            Chronicles of culinary pop art, the thermodynamic science of smash burgers, and neon cocktail mixology from our Arts District laboratory.
          </p>
        </div>

        {/* Category Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '40px' }}>
          <button
            onClick={() => setSelectedCategory('all')}
            style={{
              padding: '8px 18px',
              borderRadius: '999px',
              border: selectedCategory === 'all' ? '1px solid #FFDD00' : '1px solid rgba(255, 255, 255, 0.08)',
              background: selectedCategory === 'all' ? '#FFDD00' : '#141418',
              color: selectedCategory === 'all' ? '#000' : '#8E8EA0',
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              cursor: 'pointer'
            }}
          >
            All Dispatches
          </button>
          {blogCategories.map((c) => (
            <button
              key={c.id || c.slug}
              onClick={() => setSelectedCategory(c.slug)}
              style={{
                padding: '8px 18px',
                borderRadius: '999px',
                border: selectedCategory === c.slug ? '1px solid #FFDD00' : '1px solid rgba(255, 255, 255, 0.08)',
                background: selectedCategory === c.slug ? '#FFDD00' : '#141418',
                color: selectedCategory === c.slug ? '#000' : '#8E8EA0',
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                cursor: 'pointer'
              }}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Article Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px', marginBottom: '60px' }}>
          {filteredPosts.map((post) => (
            <article
              key={post.id || post.slug}
              onClick={() => onNavigate && onNavigate(`/blog/${post.slug}`)}
              style={{
                background: '#141418',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '8px',
                overflow: 'hidden',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#FFDD00';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <div style={{ height: '220px', position: 'relative' }}>
                <img
                  src={post.display_image || post.featured_image_url || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'}
                  alt={post.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '12px', left: '12px', background: '#FFDD00', color: '#000', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', padding: '3px 8px', borderRadius: '3px' }}>
                  {post.category_name || (post.category && post.category.name) || 'Pop Story'}
                </div>
              </div>

              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11px', color: '#8E8EA0', marginBottom: '10px' }}>
                  <span>{post.author_name || 'POP! Studio Team'}</span>
                  <span>•</span>
                  <span>{post.read_time || '4 min read'}</span>
                </div>
                <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '20px', fontWeight: 700, color: '#FFF', marginBottom: '10px', lineHeight: 1.3 }}>
                  {post.title}
                </h2>
                <p style={{ color: '#8E8EA0', fontSize: '13px', lineHeight: 1.6, flex: 1, marginBottom: '20px' }}>
                  {post.excerpt}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#FFDD00', fontFamily: 'Space Grotesk, sans-serif', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  <span>Read Article</span>
                  <span>&rarr;</span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}
