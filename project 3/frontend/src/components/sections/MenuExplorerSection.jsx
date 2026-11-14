import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Wine, ChevronRight, Check } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function MenuExplorerSection() {
  const { data, setSelectedDish } = useCMS();
  const categories = data.menu_categories || [];
  const section = data.sections?.menu || {};

  const [activeCategorySlug, setActiveCategorySlug] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDietary, setSelectedDietary] = useState('all');

  const filteredDishes = useMemo(() => {
    let list = [];
    categories.forEach((cat) => {
      if (activeCategorySlug === 'all' || cat.slug === activeCategorySlug) {
        (cat.items || []).forEach((item) => {
          list.push({ ...item, categoryName: cat.name });
        });
      }
    });

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          (d.english_name && d.english_name.toLowerCase().includes(q)) ||
          (d.description && d.description.toLowerCase().includes(q)) ||
          (d.origin && d.origin.toLowerCase().includes(q))
      );
    }

    if (selectedDietary !== 'all') {
      list = list.filter(
        (d) => d.dietary_tags && d.dietary_tags.includes(selectedDietary)
      );
    }

    return list;
  }, [categories, activeCategorySlug, searchQuery, selectedDietary]);

  const dietaryOptions = ['all', 'Pescatarian', 'Gluten-Free', 'Vegetarian'];

  return (
    <section id="menu" className="section-wrapper" style={{ backgroundColor: '#FCFBF8' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            {section.badge || 'CULINARY REPERTOIRE'}
          </div>
          <h2 className="section-title">
            The Tasting & À La Carte <em>Menu</em>
          </h2>
          <p className="section-subtitle">
            {section.subtitle || 'An evolving dialogue between traditional southern Italian coastlines and refined contemporary technique.'}
          </p>
        </div>

        {/* Search & Dietary Filters Bar */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid rgba(197, 160, 89, 0.35)',
            borderRadius: '20px',
            padding: '22px 28px',
            marginBottom: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
            boxShadow: '0 8px 30px rgba(8, 23, 33, 0.04)',
          }}
        >
          {/* Keyword Search */}
          <div style={{ position: 'relative', minWidth: '280px', flex: '1 1 300px' }}>
            <Search
              size={17}
              color="#C5A059"
              style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              placeholder="Search dishes, catches, truffles, citrus..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px 12px 42px',
                border: '1px solid #E5DDCF',
                borderRadius: '30px',
                fontSize: '13.5px',
                outline: 'none',
                background: '#FAF8F4',
                color: '#081721',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#C5A059')}
              onBlur={(e) => (e.target.style.borderColor = '#E5DDCF')}
            />
          </div>

          {/* Dietary Filter Pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#7A7E80', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
              Dietary:
            </span>
            {dietaryOptions.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedDietary(tag)}
                style={{
                  padding: '7px 16px',
                  borderRadius: '30px',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  border: selectedDietary === tag ? '1px solid #C5A059' : '1px solid #E5DDCF',
                  background: selectedDietary === tag ? 'var(--grad-gold)' : 'transparent',
                  color: selectedDietary === tag ? '#081721' : '#4A5255',
                  fontWeight: selectedDietary === tag ? 700 : 500,
                  transition: 'all 0.25s',
                }}
              >
                {tag === 'all' ? 'All Diets' : tag}
              </button>
            ))}
          </div>
        </div>

        {/* Category Navigation Pills */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            overflowX: 'auto',
            paddingBottom: '18px',
            marginBottom: '40px',
            scrollbarWidth: 'none',
          }}
        >
          <button
            onClick={() => setActiveCategorySlug('all')}
            style={{
              padding: '12px 24px',
              borderRadius: '30px',
              fontSize: '13px',
              fontWeight: activeCategorySlug === 'all' ? 700 : 500,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              background: activeCategorySlug === 'all' ? 'var(--grad-midnight)' : '#FFFFFF',
              color: activeCategorySlug === 'all' ? '#DFBA73' : '#081721',
              border: activeCategorySlug === 'all' ? '1px solid #C5A059' : '1px solid #E5DDCF',
              boxShadow: activeCategorySlug === 'all' ? '0 6px 20px rgba(8,23,33,0.18)' : 'none',
              transition: 'all 0.25s',
            }}
          >
            Full Tasting Repertoire
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug || cat.id}
              onClick={() => setActiveCategorySlug(cat.slug)}
              style={{
                padding: '12px 24px',
                borderRadius: '30px',
                fontSize: '13px',
                fontWeight: activeCategorySlug === cat.slug ? 700 : 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                background: activeCategorySlug === cat.slug ? 'var(--grad-midnight)' : '#FFFFFF',
                color: activeCategorySlug === cat.slug ? '#DFBA73' : '#081721',
                border: activeCategorySlug === cat.slug ? '1px solid #C5A059' : '1px solid #E5DDCF',
                boxShadow: activeCategorySlug === cat.slug ? '0 6px 20px rgba(8,23,33,0.18)' : 'none',
                transition: 'all 0.25s',
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Dishes Listing */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
            gap: '28px',
          }}
        >
          {filteredDishes.map((dish) => (
            <div
              key={dish.slug || dish.id}
              className="luxury-card"
              onClick={() => setSelectedDish(dish)}
              style={{
                padding: '28px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div style={{ paddingRight: '16px' }}>
                    <h3 style={{ fontSize: '1.5rem', color: '#081721', lineHeight: 1.2 }}>
                      {dish.name}
                    </h3>
                    <p style={{ fontSize: '0.88rem', fontStyle: 'italic', color: '#7A7E80', marginTop: '3px' }}>
                      {dish.english_name}
                    </p>
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.6rem',
                      fontWeight: 600,
                      color: '#C5A059',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {dish.currency_symbol || '€'}{dish.price}
                  </span>
                </div>

                <p style={{ fontSize: '0.95rem', color: '#4A5255', lineHeight: 1.6, margin: '14px 0 18px' }}>
                  {dish.description}
                </p>
              </div>

              <div>
                {/* Pairing & Category micro-strip */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(197, 160, 89, 0.25)', paddingTop: '14px', fontSize: '12px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', color: '#2A6F85', fontWeight: 600 }}>
                    {dish.categoryName}
                  </span>
                  {dish.wine_pairing && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#B65A3D' }}>
                      <Wine size={13} />
                      <span>{dish.wine_pairing.split(',')[0]}</span>
                    </span>
                  )}
                </div>

                {/* Dietary Tags & Action Button */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px' }}>
                  <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                    {(dish.dietary_tags || []).map((tag, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '10.5px',
                          background: '#F0F6F8',
                          color: '#2A6F85',
                          padding: '3px 9px',
                          borderRadius: '12px',
                          fontWeight: 500,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono)',
                      color: '#C5A059',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                    }}
                  >
                    <span>Tasting Notes</span>
                    <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
