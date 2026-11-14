import React, { useState, useMemo } from 'react';
import { Search, Filter, Sparkles, Wine, ChevronRight } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function MenuExplorerSection() {
  const { data, setSelectedDish } = useCMS();
  const categories = data.menu_categories || [];
  const section = data.sections?.menu || {};

  const [activeCategorySlug, setActiveCategorySlug] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDietary, setSelectedDietary] = useState('all');

  // Filter items
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
    <section id="menu" className="section-wrapper" style={{ backgroundColor: '#FAF9F5' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            {section.badge || 'CULINARY REPERTOIRE'}
          </div>
          <h2 className="section-title">
            {section.title || 'THE TASTING & A LA CARTE MENU'}
          </h2>
          <p className="section-subtitle">
            {section.subtitle || 'An evolving dialogue between traditional southern Italian coastlines and refined contemporary technique.'}
          </p>
        </div>

        {/* Search & Dietary Filters Bar */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #D8CCB8',
            borderRadius: '16px',
            padding: '20px 24px',
            marginBottom: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '18px',
            boxShadow: '0 4px 15px rgba(23, 74, 99, 0.03)',
          }}
        >
          {/* Keyword Search */}
          <div style={{ position: 'relative', minWidth: '260px', flex: '1 1 280px' }}>
            <Search
              size={16}
              color="#8C8981"
              style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              placeholder="Search dishes, catches, truffles, citrus..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px 10px 38px',
                border: '1px solid #D8CCB8',
                borderRadius: '30px',
                fontSize: '13px',
                outline: 'none',
                background: '#FAF9F5',
                color: '#174A63',
              }}
            />
          </div>

          {/* Dietary Filter Pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#8C8981', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Dietary:
            </span>
            {dietaryOptions.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedDietary(tag)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  border: selectedDietary === tag ? '1px solid #174A63' : '1px solid #E0D6C5',
                  background: selectedDietary === tag ? '#174A63' : '#FAF9F5',
                  color: selectedDietary === tag ? '#FFFFFF' : '#174A63',
                  transition: 'all 0.2s',
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
            gap: '10px',
            overflowX: 'auto',
            paddingBottom: '16px',
            marginBottom: '36px',
            scrollbarWidth: 'none',
          }}
        >
          <button
            onClick={() => setActiveCategorySlug('all')}
            style={{
              padding: '10px 20px',
              borderRadius: '30px',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              background: activeCategorySlug === 'all' ? '#174A63' : '#FFFFFF',
              color: activeCategorySlug === 'all' ? '#FFFFFF' : '#174A63',
              border: activeCategorySlug === 'all' ? '1px solid #174A63' : '1px solid #D8CCB8',
              boxShadow: activeCategorySlug === 'all' ? '0 4px 12px rgba(23,74,99,0.2)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            Full Tasting Repertoire
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug || cat.id}
              onClick={() => setActiveCategorySlug(cat.slug)}
              style={{
                padding: '10px 20px',
                borderRadius: '30px',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                background: activeCategorySlug === cat.slug ? '#174A63' : '#FFFFFF',
                color: activeCategorySlug === cat.slug ? '#FFFFFF' : '#174A63',
                border: activeCategorySlug === cat.slug ? '1px solid #174A63' : '1px solid #D8CCB8',
                boxShadow: activeCategorySlug === cat.slug ? '0 4px 12px rgba(23,74,99,0.2)' : 'none',
                transition: 'all 0.2s',
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '24px',
          }}
        >
          {filteredDishes.map((dish) => (
            <div
              key={dish.slug || dish.id}
              className="luxury-card"
              onClick={() => setSelectedDish(dish)}
              style={{
                padding: '24px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: '#FFFFFF',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                  <div style={{ paddingRight: '12px' }}>
                    <h3 style={{ fontSize: '1.4rem', color: '#174A63', lineHeight: 1.2 }}>
                      {dish.name}
                    </h3>
                    <p style={{ fontSize: '0.86rem', fontStyle: 'italic', color: '#8C8981', marginTop: '2px' }}>
                      {dish.english_name}
                    </p>
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      color: '#174A63',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {dish.currency_symbol || '€'}{dish.price}
                  </span>
                </div>

                <p style={{ fontSize: '0.92rem', color: '#4A4E4D', lineHeight: 1.5, margin: '12px 0 16px' }}>
                  {dish.description}
                </p>
              </div>

              <div>
                {/* Pairing & Category micro-strip */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F0ECE4', paddingTop: '12px', fontSize: '11px', color: '#68765A' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', color: '#367E94' }}>
                    {dish.categoryName}
                  </span>
                  {dish.wine_pairing && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#B86E50' }}>
                      <Wine size={12} />
                      <span>{dish.wine_pairing.split(',')[0]}</span>
                    </span>
                  )}
                </div>

                {/* Tags & Action */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {(dish.dietary_tags || []).map((tag, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '10px',
                          background: '#F0F6F7',
                          color: '#174A63',
                          padding: '2px 8px',
                          borderRadius: '10px',
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
                      color: '#367E94',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                    }}
                  >
                    <span>Details</span>
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
