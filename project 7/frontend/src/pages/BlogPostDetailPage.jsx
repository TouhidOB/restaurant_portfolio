import React, { useState, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { fetchBlogPostDetail } from '../services/api';

export default function BlogPostDetailPage({ slug }) {
  const { content, openReservation } = useCMS();
  const [post, setPost] = useState(
    (content?.blog_posts || []).find((p) => p.slug === slug) || null
  );
  const [loading, setLoading] = useState(!post);

  useEffect(() => {
    async function loadPost() {
      try {
        setLoading(true);
        const data = await fetchBlogPostDetail(slug);
        if (data) {
          setPost(data.post || data);
        }
      } catch (err) {
        console.warn('Error loading post:', err);
      } finally {
        setLoading(false);
      }
    }
    loadPost();
  }, [slug]);

  const navigateBack = () => {
    window.history.pushState({}, '', '/blog');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  if (loading && !post) {
    return (
      <div style={{ backgroundColor: '#202124', color: 'var(--color-ivory)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--color-gold)', fontSize: '1.2rem', fontFamily: 'var(--font-display)' }}>
          Chargement de la chronique royale...
        </p>
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ backgroundColor: '#202124', color: 'var(--color-ivory)', minHeight: '100vh', paddingTop: '150px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-gold)', fontSize: '2.5rem' }}>
          Chronique Introuvable
        </h2>
        <p style={{ color: 'var(--color-taupe)', marginBottom: '2rem' }}>
          Cette page ou cet article n'est plus accessible dans nos archives.
        </p>
        <button onClick={navigateBack} className="btn-primary">
          ← Retour aux Chroniques
        </button>
      </div>
    );
  }

  const categoryName = typeof post.category === 'object' ? post.category?.name : post.category;

  return (
    <div style={{ backgroundColor: '#202124', color: 'var(--color-ivory)', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Article Header Banner */}
      <div style={{ background: 'linear-gradient(180deg, #3B1A21 0%, #202124 100%)', padding: '5rem 1.5rem 3rem', borderBottom: '1px solid rgba(197, 164, 109, 0.3)' }}>
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <button
            onClick={navigateBack}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--color-gold)',
              fontSize: '0.88rem',
              cursor: 'pointer',
              marginBottom: '1.5rem',
              padding: 0,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            ← Retour au Journal de l'Étoile
          </button>

          {categoryName && (
            <span
              style={{
                display: 'inline-block',
                backgroundColor: 'rgba(84, 37, 47, 0.8)',
                color: 'var(--color-gold-light)',
                border: '1px solid var(--color-gold)',
                padding: '0.25rem 0.65rem',
                borderRadius: '4px',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontWeight: 600,
                marginBottom: '1rem',
              }}
            >
              {categoryName}
            </span>
          )}

          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.8rem', color: 'var(--color-ivory)', lineHeight: '1.25', marginBottom: '1.5rem' }}>
            {post.title}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', color: 'var(--color-taupe)', fontSize: '0.88rem' }}>
            <span>Auteur : <strong style={{ color: 'var(--color-ivory)' }}>{post.author_name || 'Alexandre de Morbihan'}</strong></span>
            <span>•</span>
            <span>Temps de lecture : {post.read_time || '5 min'}</span>
            {post.published_at && (
              <>
                <span>•</span>
                <span>{new Date(post.published_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '850px', margin: '3rem auto 6rem', padding: '0 1.5rem' }}>
        {/* Cover Image */}
        {post.cover_image && (
          <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(197, 164, 109, 0.4)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', marginBottom: '3.5rem' }}>
            <img
              src={post.cover_image}
              alt={post.title}
              style={{ width: '100%', height: '440px', objectFit: 'cover' }}
            />
          </div>
        )}

        {/* Excerpt Lead */}
        {post.excerpt && (
          <div style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--color-gold-light)', fontStyle: 'italic', borderLeft: '3px solid var(--color-gold)', paddingLeft: '1.5rem', marginBottom: '2.5rem' }}>
            {post.excerpt}
          </div>
        )}

        {/* Content Body */}
        <div
          style={{
            color: 'var(--color-ivory)',
            fontSize: '1.05rem',
            lineHeight: '1.9',
            fontFamily: 'var(--font-sans)',
          }}
        >
          {post.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx} style={{ marginBottom: '1.75rem', color: 'rgba(245, 240, 231, 0.9)' }}>
              {paragraph}
            </p>
          ))}
        </div>

        {/* Article Footer & Reservation CTA */}
        <div style={{ marginTop: '5rem', paddingTop: '3rem', borderTop: '1px solid rgba(197, 164, 109, 0.3)', textAlign: 'center' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--color-ivory)', marginBottom: '0.75rem' }}>
            Venez Découvrir Nos Créations
          </h3>
          <p style={{ color: 'var(--color-taupe)', maxWidth: '480px', margin: '0 auto 2rem', fontSize: '0.95rem' }}>
            Réservez dès à présent votre table au Grand Salon d'Honneur pour déguster la cuisine du Chef Alexandre de Morbihan.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button onClick={navigateBack} style={{ padding: '0.85rem 1.8rem', background: '#25262A', border: '1px solid rgba(197, 164, 109, 0.4)', color: 'var(--color-ivory)', borderRadius: '4px', cursor: 'pointer' }}>
              ← Retour au Journal
            </button>
            <button onClick={() => openReservation()} className="btn-primary" style={{ padding: '0.85rem 2rem' }}>
              Réserver une Table
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
