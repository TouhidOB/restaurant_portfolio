import React, { useState, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { fetchMenuItems } from '../services/api';
import { Search, Plus } from 'lucide-react';

export default function S07_MenuExplorer() {
  const { data, setSelectedDish } = useCMS();
  const categories = data?.categories || [];
  const [activeCat, setActiveCat] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadItems = async () => {
      setLoading(true);
      const res = await fetchMenuItems(activeCat, searchTerm);
      if (res && res.length > 0) {
        setItems(res);
      } else {
        // Fallback filter from featured_steaks if API call empty
        let combined = [...(data.featured_steaks || [])];
        if (activeCat !== 'all') {
          combined = combined.filter((i) => i.category_slug === activeCat || i.category === activeCat);
        }
        if (searchTerm) {
          const q = searchTerm.toLowerCase();
          combined = combined.filter((i) => i.name.toLowerCase().includes(q) || i.description?.toLowerCase().includes(q));
        }
        setItems(combined);
      }
      setLoading(false);
    };

    loadItems();
  }, [activeCat, searchTerm, data]);

  return (
    <section id="menu" style={{ backgroundColor: 'var(--color-charcoal)', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="section-container">
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>
            CULINARY REPERTOIRE
          </div>
          <h2 className="section-title">
            Complete Menu Explorer
          </h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Browse our full seasonal menu—from wood-roasted caviar starters to prime dry-aged loins and rare single-barrel bourbon cocktails.
          </p>
        </div>

        {/* Filter Controls Bar: Category Tabs & Search */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          marginBottom: '48px'
        }}>
          {/* Category Tabs */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '8px',
            maxWidth: '960px'
          }}>
            <button
              onClick={() => setActiveCat('all')}
              style={{
                background: activeCat === 'all' ? 'var(--color-bronze)' : 'rgba(41, 39, 36, 0.7)',
                color: activeCat === 'all' ? 'var(--color-obsidian)' : 'var(--color-ivory)',
                border: activeCat === 'all' ? '1px solid var(--color-bronze)' : '1px solid var(--border-subtle)',
                padding: '8px 18px',
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
              All Selections
            </button>
            {categories.map((c) => (
              <button
                key={c.id || c.slug}
                onClick={() => setActiveCat(c.slug)}
                style={{
                  background: activeCat === c.slug ? 'var(--color-bronze)' : 'rgba(41, 39, 36, 0.7)',
                  color: activeCat === c.slug ? 'var(--color-obsidian)' : 'var(--color-ivory)',
                  border: activeCat === c.slug ? '1px solid var(--color-bronze)' : '1px solid var(--border-subtle)',
                  padding: '8px 18px',
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
                {c.name}
              </button>
            ))}
          </div>

          {/* Search Input Box */}
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '420px'
          }}>
            <Search
              size={16}
              style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-taupe)'
              }}
            />
            <input
              type="text"
              placeholder="Search cuts, truffles, seafood..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                background: 'var(--color-graphite)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '2px',
                padding: '10px 14px 10px 40px',
                color: 'var(--color-ivory)',
                fontSize: '13px',
                fontFamily: 'var(--font-heading)',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Menu Items Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '24px'
        }}>
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedDish(item)}
              style={{
                background: 'var(--color-graphite)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '3px',
                padding: '24px',
                cursor: 'pointer',
                display: 'flex',
                gap: '20px',
                alignItems: 'center',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-champagne)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Thumbnail Image */}
              {(item.image || item.image_url) && (
                <div style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  flexShrink: 0
                }}>
                  <img
                    src={item.image || item.image_url}
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              )}

              {/* Content */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                  <h4 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '20px',
                    color: 'var(--color-ivory)',
                    fontWeight: 600
                  }}>
                    {item.name}
                  </h4>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '20px',
                    color: 'var(--color-champagne)',
                    fontWeight: 600,
                    marginLeft: '8px'
                  }}>
                    {item.currency || '$'}{item.price}
                  </span>
                </div>

                {item.cut_type && (
                  <div style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '10px',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    color: 'var(--color-bronze)',
                    marginBottom: '6px'
                  }}>
                    {item.cut_type}
                  </div>
                )}

                <p style={{
                  fontSize: '12px',
                  color: 'var(--color-taupe)',
                  lineHeight: '1.5',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {item.short_description || item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
