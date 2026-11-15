import React, { useState, useEffect } from 'react';
import { fetchBlogPostDetail } from '../services/api';

export default function BlogPostDetailPage({ slug, onNavigateHome, onNavigateTo }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchBlogPostDetail(slug).then((data) => {
      if (mounted) {
        setPost(data);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div style={{ paddingTop: '10rem', minHeight: '100vh', backgroundColor: '#1A2F25', textAlign: 'center', color: '#AAB9A0', fontFamily: 'var(--font-mono, monospace)' }}>
        RETRIEVING DISPATCH FROM VERDANT ARCHIVES...
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ paddingTop: '10rem', minHeight: '100vh', backgroundColor: '#1A2F25', textAlign: 'center', color: '#F6F2E9' }}>
        <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '2rem', marginBottom: '1rem' }}>DISPATCH NOT FOUND</h1>
        <p style={{ color: '#AAB9A0', marginBottom: '2rem', fontFamily: 'var(--font-mono, monospace)' }}>
          The requested journal dispatch could not be located.
        </p>
        <button
          onClick={() => onNavigateTo('/blog')}
          style={{
            padding: '0.75rem 2rem',
            background: '#BC7153',
            border: 'none',
            borderRadius: '4px',
            color: '#fff',
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          RETURN TO JOURNAL &rarr;
        </button>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: 'calc(var(--header-height, 80px) + 3rem)', paddingBottom: '6rem', minHeight: '100vh', backgroundColor: '#1A2F25', color: '#F6F2E9' }}>
      <div className="container-tropical" style={{ maxWidth: '860px' }}>
        {/* Navigation Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem' }}>
          <button onClick={onNavigateHome} style={{ background: 'none', border: 'none', color: '#AAB9A0', cursor: 'pointer', padding: 0 }}>
            INDEX
          </button>
          <span style={{ color: 'rgba(170, 185, 160, 0.4)' }}>/</span>
          <button onClick={() => onNavigateTo('/blog')} style={{ background: 'none', border: 'none', color: '#AAB9A0', cursor: 'pointer', padding: 0 }}>
            JOURNAL
          </button>
          <span style={{ color: 'rgba(170, 185, 160, 0.4)' }}>/</span>
          <span style={{ color: '#BC7153' }}>{post.title}</span>
        </div>

        {/* Article Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            {post.category && (
              <span style={{ background: '#BC7153', color: '#fff', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.72rem', fontWeight: 700, padding: '0.25rem 0.65rem', borderRadius: '3px' }}>
                {post.category.name}
              </span>
            )}
            <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem', color: '#AAB9A0' }}>
              {post.read_time || '5 min read'} &bull; {post.views_count || 0} READS
            </span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '1.25rem' }}>
            {post.title}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderTop: '1px solid rgba(170, 185, 160, 0.25)', borderBottom: '1px solid rgba(170, 185, 160, 0.25)', padding: '0.75rem 0' }}>
            <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.8rem', color: '#AAB9A0' }}>
              BY <strong style={{ color: '#F6F2E9' }}>{post.author_name || 'VERDANT ATELIER'}</strong>
            </span>
            <span style={{ color: 'rgba(170, 185, 160, 0.3)' }}>&bull;</span>
            <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem', color: '#C8B99F' }}>
              PUBLISHED DISPATCH
            </span>
          </div>
        </div>

        {/* Cover Photo */}
        {post.cover_image && (
          <div style={{ marginBottom: '2.5rem', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(170, 185, 160, 0.3)', maxHeight: '460px' }}>
            <img
              src={post.cover_image}
              alt={post.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}

        {/* Article Excerpt */}
        {post.excerpt && (
          <div style={{ background: '#243F32', borderLeft: '3px solid #BC7153', padding: '1.5rem', borderRadius: '4px', marginBottom: '2.5rem', fontFamily: 'var(--font-serif, serif)', fontSize: '1.25rem', fontStyle: 'italic', color: '#D9B84E', lineHeight: 1.6 }}>
            "{post.excerpt}"
          </div>
        )}

        {/* Body Content */}
        <div style={{ fontSize: '1.05rem', lineHeight: 1.85, color: '#E5D7C2', whiteSpace: 'pre-line', marginBottom: '4rem' }}>
          {post.content}
        </div>

        {/* Article Footer & Return Link */}
        <div style={{ borderTop: '1px solid rgba(170, 185, 160, 0.3)', paddingTop: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <button
            onClick={() => onNavigateTo('/blog')}
            style={{
              padding: '0.75rem 1.75rem',
              background: '#243F32',
              border: '1px solid rgba(170, 185, 160, 0.3)',
              borderRadius: '4px',
              color: '#F6F2E9',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.85rem',
              cursor: 'pointer',
            }}
          >
            &larr; BACK TO JOURNAL
          </button>
          <button
            onClick={() => {
              window.history.pushState({}, '', '/menu');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            style={{
              padding: '0.75rem 1.75rem',
              background: '#BC7153',
              border: 'none',
              borderRadius: '4px',
              color: '#fff',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            DISCOVER THE MENU &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
