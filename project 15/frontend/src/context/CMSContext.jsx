import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fallbackData } from '../data/fallbackData';
import { fetchPublicContent, submitReservation } from '../services/api';

const CMSContext = createContext(null);

export function CMSProvider({ children }) {
  const [data, setData] = useState(fallbackData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Active Interactive States
  const [activeViewpointIndex, setActiveViewpointIndex] = useState(0);
  const [selectedDish, setSelectedDish] = useState(null);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [tourMood, setTourMood] = useState('neon'); // 'day', 'neon', 'midnight'
  const [viewMode, setViewMode] = useState('3d'); // '3d' or 'photo'

  const loadData = useCallback(async () => {
    try {
      const apiData = await fetchPublicContent();
      if (apiData && (apiData.config || apiData.content || apiData.menu_items)) {
        setData({
          config: { ...fallbackData.config, ...(apiData.config || apiData.content || {}) },
          content: apiData.content || apiData.config || fallbackData.config,
          categories: apiData.categories?.length ? apiData.categories : (apiData.menu_categories?.length ? apiData.menu_categories : fallbackData.categories),
          menu_items: apiData.menu_items?.length ? apiData.menu_items : fallbackData.menu_items,
          viewpoints: apiData.viewpoints?.length ? apiData.viewpoints : fallbackData.viewpoints,
          experiences: apiData.experiences?.length ? apiData.experiences : fallbackData.experiences,
          team: apiData.team?.length ? apiData.team : fallbackData.team,
          testimonials: apiData.testimonials?.length ? apiData.testimonials : fallbackData.testimonials,
          gallery: apiData.gallery?.length ? apiData.gallery : fallbackData.gallery,
          custom_pages: apiData.custom_pages?.length ? apiData.custom_pages : fallbackData.custom_pages,
          blog_categories: apiData.blog_categories?.length ? apiData.blog_categories : fallbackData.blog_categories,
          blog_posts: apiData.blog_posts?.length ? apiData.blog_posts : fallbackData.blog_posts,
          philosophy: fallbackData.philosophy
        });
      } else {
        setData(fallbackData);
      }
    } catch (err) {
      console.warn('Using fallback data due to fetch error:', err);
      setData(fallbackData);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const activeViewpoint = data.viewpoints && data.viewpoints.length > 0 
    ? data.viewpoints[activeViewpointIndex] || data.viewpoints[0]
    : fallbackData.viewpoints[0];

  const handleBookingSubmit = async (formData) => {
    return await submitReservation(formData);
  };

  const openReservation = (experience = '') => {
    setSelectedExperience(experience);
    setIsReservationModalOpen(true);
  };

  const closeReservation = () => {
    setIsReservationModalOpen(false);
    setSelectedExperience('');
  };

  const t = (path, fallback = '') => {
    const parts = path.split('.');
    let cur = data.content || data.config;
    for (const p of parts) {
      if (!cur || typeof cur !== 'object') return fallback;
      cur = cur[p];
    }
    return cur !== undefined ? cur : fallback;
  };

  return (
    <CMSContext.Provider
      value={{
        data,
        content: data.content || data.config,
        config: data.config,
        customPages: data.custom_pages || fallbackData.custom_pages || [],
        blogPosts: data.blog_posts || fallbackData.blog_posts || [],
        blogCategories: data.blog_categories || fallbackData.blog_categories || [],
        loading,
        error,
        refreshContent: loadData,
        refetch: loadData,
        // Tour state
        activeViewpointIndex,
        setActiveViewpointIndex,
        activeViewpoint,
        tourMood,
        setTourMood,
        viewMode,
        setViewMode,
        // Modals state
        selectedDish,
        setSelectedDish,
        isReservationModalOpen,
        setIsReservationModalOpen,
        openReservation,
        openReservationModal: openReservation,
        closeReservation,
        selectedExperience,
        setSelectedExperience,
        lightboxIndex,
        setLightboxIndex,
        // Helpers
        handleBookingSubmit,
        t,
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
