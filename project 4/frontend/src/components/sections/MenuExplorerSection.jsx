import React, { useState, useMemo } from 'react';
import { useCMS } from '../../context/CMSContext';

export default function MenuExplorerSection() {
  const { content, openDish } = useCMS();
  const s05 = content.sections?.menu_explorer || {};
  const categories = content.categories || [];

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiet, setSelectedDiet] = useState('ALL');

  // Flatten all items with category metadata
  const allItems = useMemo(() => {
    const list = [];
    categories.forEach((cat) => {
      (cat.items || []).forEach((item) => {
        list.push({ ...item, categorySlug: cat.slug, categoryName: cat.name });
      });
    });
    return list;
  }, [categories]);

  // Filter items based on category, search query, dietary
  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      // Category check
      if (activeCategory !== 'all' && item.categorySlug !== activeCategory) {
        return false;
      }
      // Dietary check
      if (selectedDiet !== 'ALL') {
        if (!item.dietary_information || !item.dietary_information.includes(selectedDiet)) {
          return false;
        }
      }
      // Search query check
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inName = item.name.toLowerCase().includes(q);
        const inDesc = (item.short_description || '').toLowerCase().includes(q);
        if (!inName && !inDesc) return false;
      }
      return true;
    });
  }, [allItems, activeCategory, searchQuery, selectedDiet]);

  return (
    <section id="menu" className="section-shell">
      <div className="container-brutal">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
          <div>
            <div className="section-tag">
              SECTION 05 // {s05.eyebrow || 'MENU EXPLORER'}
            </div>
            <h2 className="section-heading" style={{ marginBottom: '0.5rem' }}>
              {s05.title || 'THE MENU IS AN OPEN EXPERIMENT.'}
            </h2>
            <p className="section-lead">
              {s05.subtitle || 'Seasonally shifting compositions categorized by elemental discipline.'}
            </p>
          </div>

          <div
            style={{
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-steel)',
              padding: '0.75rem 1.25rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
            }}
          >
            <div style={{ color: 'var(--accent-orange)', fontWeight: 700 }}>
              TASTING FORMAT // 12 COURSES
            </div>
            <div style={{ color: 'var(--text-primary)', marginTop: '0.2rem' }}>
              {s05.custom_content?.tasting_menu_price || '$195 PER GUEST'} &bull; {s05.custom_content?.pairing_price || '$120 PAIRING'}
            </div>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
            borderBottom: '1px solid var(--border-steel)',
            paddingBottom: '1.5rem',
          }}
        >
          {/* Category Tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              style={{
                background: activeCategory === 'all' ? 'var(--accent-orange)' : 'transparent',
                color: activeCategory === 'all' ? '#000' : 'var(--text-secondary)',
                border: '1px solid',
                borderColor: activeCategory === 'all' ? 'var(--accent-orange)' : 'var(--border-steel)',
                padding: '0.45rem 0.9rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              ALL [ {allItems.length} ]
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id || cat.slug}
                type="button"
                onClick={() => setActiveCategory(cat.slug)}
                style={{
                  background: activeCategory === cat.slug ? 'var(--accent-orange)' : 'transparent',
                  color: activeCategory === cat.slug ? '#000' : 'var(--text-secondary)',
                  border: '1px solid',
                  borderColor: activeCategory === cat.slug ? 'var(--accent-orange)' : 'var(--border-steel)',
                  padding: '0.45rem 0.9rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                {cat.name.toUpperCase()} [ {(cat.items || []).length} ]
              </button>
            ))}
          </div>

          {/* Search Box & Dietary Filters */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Search dishes or ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-steel)',
                color: '#fff',
                padding: '0.45rem 0.85rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                minWidth: '220px',
              }}
            />

            <select
              value={selectedDiet}
              onChange={(e) => setSelectedDiet(e.target.value)}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-steel)',
                color: '#fff',
                padding: '0.45rem 0.85rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
              }}
            >
              <option value="ALL">ALL DIETS</option>
              <option value="GF">GLUTEN FREE (GF)</option>
              <option value="VG">VEGAN (VG)</option>
              <option value="DF">DAIRY FREE (DF)</option>
              <option value="SF">SHELLFISH (SF)</option>
            </select>
          </div>
        </div>

        {/* Dishes List */}
        {filteredItems.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="brutalist-card"
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '1.25rem',
                  transition: 'border-color 0.2s',
                }}
                onClick={() => openDish(item)}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      {item.categoryName?.toUpperCase()}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--accent-orange)', fontWeight: 700 }}>
                      {item.currency_symbol || '$'}{item.price}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', marginBottom: '0.4rem' }}>
                    {item.name}
                  </h3>

                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.85rem' }}>
                    {item.short_description}
                  </p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid var(--border-steel)',
                    paddingTop: '0.65rem',
                  }}
                >
                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    {item.dietary_information?.map((d) => (
                      <span key={d} className="meta-chip" style={{ fontSize: '0.65rem', padding: '0.1rem 0.35rem' }}>
                        {d}
                      </span>
                    ))}
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    DETAILS &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              padding: '3rem',
              textAlign: 'center',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-steel)',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-muted)',
            }}
          >
            No dishes matching the specified filters in the Monolith registry.
          </div>
        )}
      </div>
    </section>
  );
}
