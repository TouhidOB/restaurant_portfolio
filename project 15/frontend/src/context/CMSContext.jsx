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
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [tourMood, setTourMood] = useState('neon'); // 'day', 'neon', 'midnight'
  const [viewMode, setViewMode] = useState('3d'); // '3d' or 'photo'

  const loadData = useCallback(async () => {
    try {
      const apiData = await fetchPublicContent();
      if (apiData && apiData.config) {
        setData({
          config: { ...fallbackData.config, ...apiData.config },
          categories: apiData.categories?.length ? apiData.categories : fallbackData.categories,
          menu_items: apiData.menu_items?.length ? apiData.menu_items : fallbackData.menu_items,
          viewpoints: apiData.viewpoints?.length ? apiData.viewpoints : fallbackData.viewpoints,
          experiences: apiData.experiences?.length ? apiData.experiences : fallbackData.experiences,
          team: apiData.team?.length ? apiData.team : fallbackData.team,
          testimonials: apiData.testimonials?.length ? apiData.testimonials : fallbackData.testimonials,
          gallery: apiData.gallery?.length ? apiData.gallery : fallbackData.gallery,
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

  return (
    <CMSContext.Provider
      value={{
        data,
        loading,
        error,
        refreshContent: loadData,
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
        lightboxIndex,
        setLightboxIndex,
        // Booking submit helper
        handleBookingSubmit
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
