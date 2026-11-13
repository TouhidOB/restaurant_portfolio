import React, { useState, useMemo } from 'react';
import { Search, Filter, Sparkles } from 'lucide-react';

export default function S07FullMenu({ categories, onSelectDish, onOpenReservation }) {
  const [activeTab, setActiveTab] = useState(categories[0]?.id || 'sushi-sashimi');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('ALL');

  const tags = ['ALL', 'GF', 'V', 'VG', 'SPICY'];

  // Current active category object
  const currentCategory = useMemo(() => {
    return categories.find((c) => c.id === activeTab) || categories[0];
  }, [categories, activeTab]);

  // Filter items by category, query, and dietary tag
  const filteredItems = useMemo(() => {
    if (!currentCategory || !currentCategory.items) return [];
    return currentCategory.items.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTag =
        selectedTag === 'ALL' || (item.tags && item.tags.includes(selectedTag));

      return matchesSearch && matchesTag;
    });
  }, [currentCategory, searchQuery, selectedTag]);

  return (
    <section
      id="menu"
      style={{
        padding: 'var(--section-spacing) 0',
        backgroundColor: '#EBE7DD',
      }}
    >
      <div className="zen-container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px' }}>
          <div className="zen-eyebrow" style={{ justifyContent: 'center' }}>
            SEASONAL GASTRONOMY
          </div>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, var(--section-heading-size))', color: 'var(--color-charcoal)', marginBottom: '8px' }}>
            The Complete Menu Experience
          </h2>
          <p className="font-jp" style={{ fontSize: '15px', color: 'var(--color-moss)' }}>
            旬の恵みとお品書き
          </p>
        </div>

        {/* Search Bar & Dietary Filter Pills */}
        <div
          style={{
            maxWidth: '820px',
            margin: '0 auto 36px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Search Input */}
          <div
            style={{
              flex: '1 1 280px',
              position: 'relative',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--color-border)',
              borderRadius: '2px',
              display: 'flex',
              alignItems: 'center',
              padding: '0 14px',
            }}
          >
            <Search size={16} color="var(--color-stone)" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, ingredients (e.g. wagyu, matcha, ramen)..."
              style={{
                width: '100%',
                padding: '12px 10px',
                border: 'none',
                outline: 'none',
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                backgroundColor: 'transparent',
              }}
            />
          </div>

          {/* Dietary Filter Buttons */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                style={{
                  padding: '8px 12px',
                  backgroundColor: selectedTag === tag ? 'var(--color-charcoal)' : '#FFFFFF',
                  color: selectedTag === tag ? 'var(--color-rice-paper)' : 'var(--color-charcoal)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '2px',
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {tag === 'ALL' ? 'All Dietary' : tag}
              </button>
            ))}
          </div>
        </div>

        {/* Category Horizontal Navigation */}
        <div
          style={{
            display: 'flex',
            gap: '10px',
            overflowX: 'auto',
            paddingBottom: '16px',
            marginBottom: '36px',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveTab(cat.id);
                setSearchQuery('');
              }}
              style={{
                padding: '10px 18px',
                backgroundColor: activeTab === cat.id ? '#FFFFFF' : 'transparent',
                color: activeTab === cat.id ? 'var(--color-charcoal)' : 'var(--color-stone)',
                border: activeTab === cat.id ? '1px solid var(--color-border)' : '1px solid transparent',
                borderRadius: '2px',
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Category Description Banner */}
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <p style={{ fontSize: '14px', color: 'var(--color-moss)', fontStyle: 'italic', maxWidth: '600px', margin: '0 auto' }}>
            {currentCategory?.description}
          </p>
        </div>

        {/* Menu Items Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '24px',
          }}
        >
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => onSelectDish({ ...item, category: currentCategory.name })}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--color-border)',
                padding: '22px 24px',
                borderRadius: '2px',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-bamboo)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                  <h4 style={{ fontSize: '18px', color: 'var(--color-charcoal)', fontWeight: 600 }}>
                    {item.name}
                  </h4>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-charcoal)' }}>
                    {item.price}
                  </span>
                </div>

                <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--color-charcoal)', opacity: 0.8, marginBottom: '12px' }}>
                  {item.description}
                </p>
              </div>

              {item.tags && item.tags.length > 0 && (
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '8px' }}>
                  {item.tags.map((t, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: '10px',
                        padding: '2px 7px',
                        backgroundColor: '#F5F2EA',
                        color: 'var(--color-charcoal)',
                        borderRadius: '2px',
                        fontWeight: 600,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px', color: 'var(--color-stone)' }}>
              No dishes match your search criteria.
            </div>
          )}
        </div>

        {/* Bottom Menu Reassurance & Reservation CTA */}
        <div style={{ marginTop: '54px', textAlign: 'center' }}>
          <p style={{ fontSize: '13px', color: 'var(--color-stone)', marginBottom: '16px' }}>
            Seasonal menu items are prepared daily based on market arrivals.
          </p>
          <button onClick={onOpenReservation} className="btn-zen btn-zen-primary">
            Reserve Table To Taste Menu
          </button>
        </div>
      </div>
    </section>
  );
}
