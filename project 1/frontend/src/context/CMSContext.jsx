import React, { createContext, useContext, useState, useEffect } from 'react';
import { restaurantConfig } from '../data/restaurant';
import { api } from '../services/api';

const CMS_STORAGE_KEY = 'aurelia_restaurant_cms_data_v1';
const CMS_TOKEN_KEY = 'aurelia_admin_token_v1';

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
    } catch (e) {}
    return initialFullConfig;
  });

  // Admin Auth State
  const [adminToken, setAdminToken] = useState(() => localStorage.getItem(CMS_TOKEN_KEY) || '');
  const [adminUser, setAdminUser] = useState(null);
  const [isCMSOpen, setIsCMSOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [activeCMSTab, setActiveCMSTab] = useState('theme');
  const [saveStatus, setSaveStatus] = useState('');
  const [reservations, setReservations] = useState([]);
  const [isLoadingBackend, setIsLoadingBackend] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const [customPages, setCustomPages] = useState([]);
  const [blogPosts, setBlogPosts] = useState(restaurantConfig.blog_posts || []);
  const [blogCategories, setBlogCategories] = useState(restaurantConfig.blog_categories || []);

  const openReservation = () => setIsReservationOpen(true);
  const closeReservation = () => setIsReservationOpen(false);
  const openDish = (dish) => setSelectedDish(dish);
  const closeDish = () => setSelectedDish(null);

  // 1. Fetch live published content from Django Backend on initial load
  useEffect(() => {
    async function loadBackendData() {
      const res = await api.getPublicContent();
      if (res) {
        if (res.exists && res.content) {
          setConfig((prev) => ({
            ...prev,
            ...res.content,
            theme: {
              ...defaultTheme,
              ...(res.content.theme || {}),
              colors: { ...defaultTheme.colors, ...(res.content.theme?.colors || {}) },
              typography: { ...defaultTheme.typography, ...(res.content.theme?.typography || {}) },
            },
          }));
        }
        if (res.custom_pages) setCustomPages(res.custom_pages);
        if (res.blog_posts) setBlogPosts(res.blog_posts);
        if (res.blog_categories) setBlogCategories(res.blog_categories);
      }
    }
    loadBackendData();
  }, []);

  // 2. Verify stored admin token on mount
  useEffect(() => {
    if (!adminToken) {
      setAdminUser(null);
      return;
    }
    api.getMe(adminToken)
      .then((user) => {
        setAdminUser(user);
      })
      .catch(() => {
        setAdminToken('');
        setAdminUser(null);
        localStorage.removeItem(CMS_TOKEN_KEY);
      });
  }, [adminToken]);

  // 3. Inject CSS Variables whenever theme changes
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

  // 4. Save to localStorage for instant client fallback
  useEffect(() => {
    try {
      localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(config));
    } catch (e) {}
  }, [config]);

  // Admin Actions
  const loginAdmin = async (username, password) => {
    setIsLoadingBackend(true);
    try {
      const res = await api.loginAdmin(username, password);
      setAdminToken(res.token);
      setAdminUser(res.user);
      localStorage.setItem(CMS_TOKEN_KEY, res.token);
      setIsLoginModalOpen(false);
      setIsCMSOpen(true);
      setSaveStatus(`Logged in as ${res.user.username}`);
      // Load reservations for admin
      loadReservations(res.token);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setIsLoadingBackend(false);
    }
  };

  const logoutAdmin = async () => {
    if (adminToken) {
      await api.logoutAdmin(adminToken);
    }
    setAdminToken('');
    setAdminUser(null);
    localStorage.removeItem(CMS_TOKEN_KEY);
    setIsCMSOpen(false);
    setSaveStatus('Logged out of Admin Portal');
  };

  const saveToDjangoBackend = async () => {
    if (!adminToken) {
      setIsLoginModalOpen(true);
      return;
    }
    setIsLoadingBackend(true);
    try {
      const res = await api.saveContent(config, adminToken);
      setSaveStatus('Saved & Published to Django Backend');
      setTimeout(() => setSaveStatus(''), 3000);
      alert('Content successfully saved & published to the Django backend database!');
    } catch (err) {
      alert(`Error saving to backend: ${err.message}`);
    } finally {
      setIsLoadingBackend(false);
    }
  };

  const loadReservations = async (token = adminToken) => {
    if (!token) return;
    try {
      const data = await api.getReservations(token);
      setReservations(data);
    } catch (err) {
      console.warn('Failed to load reservations:', err);
    }
  };

  const updateReservationStatus = async (id, status) => {
    if (!adminToken) return;
    try {
      await api.updateReservationStatus(id, status, adminToken);
      setReservations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
    } catch (err) {
      alert(`Failed to update status: ${err.message}`);
    }
  };

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
    if (window.confirm('Reset all website content and styles back to original template defaults?')) {
      try {
        localStorage.removeItem(CMS_STORAGE_KEY);
      } catch (e) {}
      setConfig(initialFullConfig);
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
        content: config,
        updateSection,
        updateRootField,
        updateTheme,
        resetToDefaults,
        exportConfigJson,
        importConfigJson,
        isCMSOpen,
        setIsCMSOpen,
        isLoginModalOpen,
        setIsLoginModalOpen,
        activeCMSTab,
        setActiveCMSTab,
        saveStatus,
        adminToken,
        adminUser,
        loginAdmin,
        logoutAdmin,
        saveToDjangoBackend,
        reservations,
        loadReservations,
        updateReservationStatus,
        isLoadingBackend,
        isReservationOpen,
        openReservation,
        closeReservation,
        selectedDish,
        openDish,
        closeDish,
        customPages,
        blogPosts,
        blogCategories,
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
