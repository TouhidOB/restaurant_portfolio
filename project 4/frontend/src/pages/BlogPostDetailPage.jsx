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
      <div style={{ paddingTop: '10rem', minHeight: '100vh', backgroundColor: 'var(--bg-dark)', textAlign: 'center', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
        RETRIEVING DISPATCH FROM ARCHIVE...
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ paddingTop: '10rem', minHeight: '100vh', backgroundColor: 'var(--bg-dark)', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>DISPATCH NOT FOUND</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontFamily: 'var(--font-mono)' }}>
          The requested journal article could not be located in the Monolith registry.
        </p>
        <button onClick={() => onNavigateTo('/blog')} className="btn-orange">
          RETURN TO JOURNAL &rarr;
        </button>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: 'calc(var(--header-height) + 3rem)', paddingBottom: '6rem', minHeight: '100vh', backgroundColor: 'var(--bg-dark)' }}>
      <div className="container-brutal" style={{ maxWidth: '860px' }}>
        {/* Navigation Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
          <button onClick={onNavigateHome} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0 }}>
            INDEX
          </button>
          <span style={{ color: 'var(--border-light)' }}>/</span>
          <button onClick={() => onNavigateTo('/blog')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0 }}>
            JOURNAL
          </button>
          <span style={{ color: 'var(--border-light)' }}>/</span>
          <span style={{ color: 'var(--accent-orange)' }}>{post.title}</span>
        </div>

        {/* Article Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            {post.category && (
              <span className="section-tag" style={{ marginBottom: 0 }}>
                {post.category.name}
              </span>
            )}
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {post.read_time || '5 min read'} &bull; {post.views_count || 0} READS
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1, textTransform: 'uppercase', marginBottom: '1.25rem' }}>
            {post.title}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderTop: '1px solid var(--border-steel)', borderBottom: '1px solid var(--border-steel)', padding: '0.75rem 0' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              BY <strong style={{ color: '#fff' }}>{post.author_name || 'MONOLITH EDITORIAL BOARD'}</strong>
            </span>
            <span style={{ color: 'var(--border-steel)' }}>&bull;</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              PUBLISHED IN DISTRICT 09
            </span>
          </div>
        </div>

        {/* Cover Photo */}
        {post.cover_image && (
          <div style={{ width: '100%', height: 'clamp(280px, 40vw, 440px)', background: '#000', border: '1px solid var(--border-steel)', overflow: 'hidden', marginBottom: '3rem' }}>
            <img
              src={post.cover_image}
              alt={post.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}

        {/* Excerpt Lead */}
        {post.excerpt && (
          <div style={{ background: 'var(--bg-surface)', borderLeft: '4px solid var(--accent-orange)', padding: '1.5rem', marginBottom: '2.5rem', fontFamily: 'var(--font-mono)', fontSize: '1rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
            {post.excerpt}
          </div>
        )}

        {/* Main Body */}
        <div style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text-secondary)', marginBottom: '4rem', whiteSpace: 'pre-line' }}>
          {post.content}
        </div>

        {/* Footer Navigation */}
        <div style={{ borderTop: '1px solid var(--border-steel)', paddingTop: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={() => onNavigateTo('/blog')} className="btn-brutal-secondary">
            &larr; BACK TO ALL DISPATCHES
          </button>
          <button onClick={onNavigateHome} className="btn-brutal-secondary">
            RETURN TO INDEX
          </button>
        </div>
      </div>
    </div>
  );
}
