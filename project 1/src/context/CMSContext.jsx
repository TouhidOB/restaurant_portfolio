import React, { createContext, useContext, useState, useEffect } from 'react';
import { restaurantConfig } from '../data/restaurant';

const CMS_STORAGE_KEY = 'aurelia_restaurant_cms_data_v1';

const defaultTheme = {
  colors: {
    emerald: '#123B35',
    gold: '#D6B879',
    obsidian: '#17191A',
    pearl: '#F3EDE1',
    jade: '#718C7D',
    bronze: '#99764B',
    primaryButtonBg: '#123B35',
    primaryButtonText: '#E8D3A2',
    primaryButtonBorder: '#D6B879',
  },
  typography: {
    fontDisplay: 'Bodoni Moda',
    fontBody: 'Montserrat',
    fontAccent: 'Cormorant Garamond',
    heroHeadingSize: 84,
    sectionHeadingSize: 56,
    bodySize: 16,
  },
};

const initialFullConfig = {
  ...restaurantConfig,
  theme: defaultTheme,
};

const CMSContext = createContext(null);

export function CMSProvider({ children }) {
  const [config, setConfig] = useState(() => {
    try {
      const saved = localStorage.getItem(CMS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...initialFullConfig,
          ...parsed,
          theme: {
            ...defaultTheme,
            ...(parsed.theme || {}),
            colors: { ...defaultTheme.colors, ...(parsed.theme?.colors || {}) },
            typography: { ...defaultTheme.typography, ...(parsed.theme?.typography || {}) },
          },
        };
      }
    } catch (e) {
      console.warn('Could not read CMS config from localStorage', e);
    }
    return initialFullConfig;
  });

  const [isCMSOpen, setIsCMSOpen] = useState(false);
  const [activeCMSTab, setActiveCMSTab] = useState('theme');
  const [saveStatus, setSaveStatus] = useState('');

  // Dynamically inject CSS variables into document root whenever theme changes
  useEffect(() => {
    if (!config?.theme) return;
    const { colors, typography } = config.theme;
    const root = document.documentElement;

    if (colors) {
      if (colors.emerald) root.style.setProperty('--color-emerald', colors.emerald);
      if (colors.gold) root.style.setProperty('--color-gold', colors.gold);
      if (colors.obsidian) root.style.setProperty('--color-obsidian', colors.obsidian);
      if (colors.pearl) root.style.setProperty('--color-pearl', colors.pearl);
      if (colors.jade) root.style.setProperty('--color-jade', colors.jade);
      if (colors.bronze) root.style.setProperty('--color-bronze', colors.bronze);
    }

    if (typography) {
      if (typography.fontDisplay) {
        root.style.setProperty('--font-display', `"${typography.fontDisplay}", serif`);
      }
      if (typography.fontBody) {
        root.style.setProperty('--font-body', `"${typography.fontBody}", sans-serif`);
      }
      if (typography.fontAccent) {
        root.style.setProperty('--font-accent', `"${typography.fontAccent}", serif`);
      }
      if (typography.bodySize) {
        root.style.fontSize = `${typography.bodySize}px`;
      }
    }
  }, [config.theme]);

  // Persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(config));
      setSaveStatus('All changes saved locally');
      const timer = setTimeout(() => setSaveStatus(''), 2500);
      return () => clearTimeout(timer);
    } catch (e) {
      console.warn('Failed to save CMS config', e);
    }
  }, [config]);

  const updateSection = (sectionKey, updatedData) => {
    setConfig((prev) => ({
      ...prev,
      [sectionKey]: {
        ...(prev[sectionKey] || {}),
        ...updatedData,
      },
    }));
  };

  const updateRootField = (fieldName, value) => {
    setConfig((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const updateTheme = (updatedTheme) => {
    setConfig((prev) => ({
      ...prev,
      theme: {
        ...prev.theme,
        ...updatedTheme,
        colors: { ...(prev.theme?.colors || {}), ...(updatedTheme.colors || {}) },
        typography: { ...(prev.theme?.typography || {}), ...(updatedTheme.typography || {}) },
      },
    }));
  };

  const resetToDefaults = () => {
    if (window.confirm('Reset all website content, images, colors, and typography back to the original template defaults?')) {
      try {
        localStorage.removeItem(CMS_STORAGE_KEY);
      } catch (e) {}
      setConfig(initialFullConfig);
      // Reset root CSS variables
      const root = document.documentElement;
      root.style.removeProperty('--color-emerald');
      root.style.removeProperty('--color-gold');
      root.style.removeProperty('--color-obsidian');
      root.style.removeProperty('--color-pearl');
      root.style.removeProperty('--color-jade');
      root.style.removeProperty('--color-bronze');
      root.style.removeProperty('--font-display');
      root.style.removeProperty('--font-body');
      root.style.removeProperty('--font-accent');
      root.style.fontSize = '16px';
      setSaveStatus('Reset to default template');
    }
  };

  const exportConfigJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(config, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${(config.name || 'restaurant').toLowerCase()}_cms_config.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importConfigJson = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      setConfig(parsed);
      setSaveStatus('Imported configuration successfully');
    } catch (err) {
      alert('Invalid JSON file format.');
    }
  };

  return (
    <CMSContext.Provider
      value={{
        config,
        updateSection,
        updateRootField,
        updateTheme,
        resetToDefaults,
        exportConfigJson,
        importConfigJson,
        isCMSOpen,
        setIsCMSOpen,
        activeCMSTab,
        setActiveCMSTab,
        saveStatus,
      }}
    >
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
