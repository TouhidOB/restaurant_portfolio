import React, { useState, useEffect } from 'react';
import { CMSProvider, useCMS } from './context/CMSContext';

// Common Components & Modals
import Preloader from './components/common/Preloader';
import Navigation from './components/common/Navigation';
import DishDetailModal from './components/common/DishDetailModal';
import ReservationModal from './components/common/ReservationModal';
import Lightbox from './components/common/Lightbox';
import Footer from './components/common/Footer';

// Dedicated Standalone Pages
import BrandPage from './pages/BrandPage';
import SignaturesPage from './pages/SignaturesPage';
import MenuPage from './pages/MenuPage';
import StoryPage from './pages/StoryPage';
import InteriorPage from './pages/InteriorPage';
import TourPage from './pages/TourPage';
import ExperiencePage from './pages/ExperiencePage';
import ContactPage from './pages/ContactPage';
import BlogListPage from './pages/BlogListPage';
import BlogPostDetailPage from './pages/BlogPostDetailPage';
import CustomPageView from './pages/CustomPageView';

// 13 Editorial Homepage Sections (preserving full 15 sections including header & footer)
import HeroSection from './components/sections/HeroSection';
import StorySection from './components/sections/StorySection';
import TourSection from './components/sections/TourSection';
import DiningSpacesSection from './components/sections/DiningSpacesSection';
import SignatureDishesSection from './components/sections/SignatureDishesSection';
import MenuExplorerSection from './components/sections/MenuExplorerSection';
import PhilosophySection from './components/sections/PhilosophySection';
import CulinaryTeamSection from './components/sections/CulinaryTeamSection';
import PrivateEventsSection from './components/sections/PrivateEventsSection';
import GallerySection from './components/sections/GallerySection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import ReservationSection from './components/sections/ReservationSection';
import LocationHoursSection from './components/sections/LocationHoursSection';

function getNormalizedPath() {
  const p = window.location.pathname.replace(/\/+$/, '') || '/';
  return p;
}

function AuraMarinaExperience() {
  const { openReservation } = useCMS();
  const [currentPath, setCurrentPath] = useState(getNormalizedPath);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getNormalizedPath());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path) => {
    const normalized = path.replace(/\/+$/, '') || '/';
    setCurrentPath(normalized);
    window.history.pushState({}, '', normalized);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    navigateTo('/');
  };

  // Match dynamic routes
  const customPageMatch = currentPath.match(/^\/page\/([a-zA-Z0-9_-]+)/);
  const activeCustomSlug = customPageMatch ? customPageMatch[1] : null;

  const blogPostMatch = currentPath.match(/^\/blog\/([a-zA-Z0-9_-]+)/);
  const activeBlogSlug = blogPostMatch ? blogPostMatch[1] : null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FCFBF8', overflowX: 'hidden' }}>
      {/* S01: Luxury Preloader */}
      <Preloader />

      {/* Global Navigation */}
      <Navigation
        currentPath={currentPath}
        onNavigate={navigateTo}
        onNavigateHome={navigateToHome}
        onOpenReservation={openReservation}
      />

      {/* ROUTING LOGIC */}
      {activeCustomSlug ? (
        <CustomPageView
          slug={activeCustomSlug}
          onNavigateHome={navigateToHome}
        />
      ) : activeBlogSlug ? (
        <BlogPostDetailPage
          slug={activeBlogSlug}
          onNavigateHome={navigateToHome}
        />
      ) : currentPath === '/blog' ? (
        <BlogListPage
          onNavigateHome={navigateToHome}
        />
      ) : currentPath === '/story' || currentPath === '/brand' ? (
        <BrandPage />
      ) : currentPath === '/signatures' ? (
        <SignaturesPage />
      ) : currentPath === '/menu' ? (
        <MenuPage />
      ) : currentPath === '/chef' ? (
        <StoryPage />
      ) : currentPath === '/interior' || currentPath === '/spaces' || currentPath === '/architecture' ? (
        <InteriorPage />
      ) : currentPath === '/tour' ? (
        <TourPage />
      ) : currentPath === '/experience' || currentPath === '/experiences' || currentPath === '/philosophy' ? (
        <ExperiencePage />
      ) : currentPath === '/contact' || currentPath === '/location' ? (
        <ContactPage />
      ) : (
        /* Default: 13 Sequential Editorial Sections on Landing Page (S02 through S14) */
        <main>
          {/* S02: Hero Section */}
          <HeroSection />

          {/* S03: Brand & Architectural Heritage Story */}
          <StorySection />

          {/* S04: Interactive 3D Virtual Restaurant Tour */}
          <TourSection />

          {/* S05: Coastal Dining Spaces */}
          <DiningSpacesSection />

          {/* S06: Seasonal Coastal Signatures */}
          <SignatureDishesSection />

          {/* S07: Interactive Menu Explorer */}
          <MenuExplorerSection />

          {/* S08: Culinary Philosophy & Provenance */}
          <PhilosophySection />

          {/* S09: Culinary Leadership & Sommelier Masters */}
          <CulinaryTeamSection />

          {/* S10: Private Celebrations & Villa Buyouts */}
          <PrivateEventsSection />

          {/* S11: Visual Essence Gallery */}
          <GallerySection />

          {/* S12: Acclaim & Testimonials */}
          <TestimonialsSection />

          {/* S13: Reservation & Dining Inquiry Desk */}
          <ReservationSection />

          {/* S14: Location, Hours & Arrival Information */}
          <LocationHoursSection />
        </main>
      )}

      {/* S15: Editorial Brand Footer */}
      <Footer />

      {/* Interactive Global Modals */}
      <DishDetailModal />
      <ReservationModal />
      <Lightbox />
    </div>
  );
}

export default function App() {
  return (
    <CMSProvider>
      <AuraMarinaExperience />
    </CMSProvider>
  );
}
