import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchFullContent } from '../services/api';
import { fallbackData } from '../data/fallbackData';

const CMSContext = createContext(null);

export function CMSProvider({ children }) {
  const [data, setData] = useState(fallbackData);
  const [loading, setLoading] = useState(true);
  
  // 3D Tour State
  const [activeTourIndex, setActiveTourIndex] = useState(0);
  const [tourLightingMode, setTourLightingMode] = useState('golden'); // 'day', 'golden', 'dusk'
  const [tourDisplayMode, setTourDisplayMode] = useState('3d'); // '3d', 'photo'
  
  // Interactive Modals
  const [selectedDish, setSelectedDish] = useState(null);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);

  const loadData = async () => {
    try {
      const content = await fetchFullContent();
      setData(content);
    } catch (e) {
      console.error("Failed to load CMS content:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const viewpoints = data.tour_viewpoints || fallbackData.tour_viewpoints;
  const currentViewpoint = viewpoints[activeTourIndex] || viewpoints[0];

  const value = {
    data,
    loading,
    reloadContent: loadData,
    // Tour
    viewpoints,
    activeTourIndex,
    setActiveTourIndex,
    currentViewpoint,
    tourLightingMode,
    setTourLightingMode,
    tourDisplayMode,
    setTourDisplayMode,
    // Modals
    selectedDish,
    setSelectedDish,
    isReservationModalOpen,
    setIsReservationModalOpen,
    lightboxImage,
    setLightboxImage,
  };

  return <CMSContext.Provider value={value}>{children}</CMSContext.Provider>;
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
}
