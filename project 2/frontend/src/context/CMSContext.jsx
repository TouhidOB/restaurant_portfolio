import React, { createContext, useContext, useState, useEffect } from 'react';
import { fallbackData } from '../data/fallbackData';
import { api } from '../services/api';

const CMSContext = createContext(null);

export function CMSProvider({ children }) {
  const [config, setConfig] = useState(fallbackData);
  const [isLoading, setIsLoading] = useState(true);

  // Hydrate from Django REST API
  useEffect(() => {
    async function loadContent() {
      try {
        const data = await api.getPublicContent();
        if (data && data.exists && data.content) {
          setConfig((prev) => ({
            ...prev,
            ...data.content,
            theme: {
              ...prev.theme,
              ...(data.content.theme || {}),
              colors: { ...(prev.theme?.colors || {}), ...(data.content.theme?.colors || {}) },
              typography: { ...(prev.theme?.typography || {}), ...(data.content.theme?.typography || {}) },
            },
          }));
        }
      } catch (e) {
        console.warn('API hydration error, staying on fallback data:', e);
      } finally {
        setIsLoading(false);
      }
    }
    loadContent();
  }, []);

  // Update dynamic CSS variables based on active config
  useEffect(() => {
    if (!config?.theme?.colors) return;
    const root = document.documentElement;
    const colors = config.theme.colors;
    const typo = config.theme.typography || {};

    if (colors.charcoal) root.style.setProperty('--color-charcoal', colors.charcoal);
    if (colors.ricePaper) root.style.setProperty('--color-rice-paper', colors.ricePaper);
    if (colors.bamboo) root.style.setProperty('--color-bamboo', colors.bamboo);
    if (colors.moss) root.style.setProperty('--color-moss', colors.moss);
    if (colors.vermilion) root.style.setProperty('--color-vermilion', colors.vermilion);
    if (colors.stone) root.style.setProperty('--color-stone', colors.stone);

    if (colors.primaryButtonBg) root.style.setProperty('--btn-primary-bg', colors.primaryButtonBg);
    if (colors.primaryButtonText) root.style.setProperty('--btn-primary-text', colors.primaryButtonText);
    if (colors.primaryButtonBorder) root.style.setProperty('--btn-primary-border', colors.primaryButtonBorder);

    if (typo.fontDisplay) root.style.setProperty('--font-display', typo.fontDisplay);
    if (typo.fontBody) root.style.setProperty('--font-body', typo.fontBody);
    if (typo.fontJapanese) root.style.setProperty('--font-jp', typo.fontJapanese);
    if (typo.heroHeadingSize) root.style.setProperty('--hero-heading-size', `${typo.heroHeadingSize}px`);
    if (typo.sectionHeadingSize) root.style.setProperty('--section-heading-size', `${typo.sectionHeadingSize}px`);
  }, [config]);

  return (
    <CMSContext.Provider value={{ config, isLoading }}>
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
}
