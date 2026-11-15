import React, { useState, useEffect } from 'react';
import { CMSProvider, useCMS } from './context/CMSContext';

// Common Components & Overlays
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

// 14 Editorial Sections on Landing Page (Section 15 is Footer)
import HeroSection from './components/sections/HeroSection';
import IntroSection from './components/sections/IntroSection';
import PhilosophySection from './components/sections/PhilosophySection';
import SignatureDishesSection from './components/sections/SignatureDishesSection';
import MenuExplorerSection from './components/sections/MenuExplorerSection';
import CulinaryStorySection from './components/sections/CulinaryStorySection';
import TropicalArchitectureSection from './components/sections/TropicalArchitectureSection';
import TourSection from './components/sections/TourSection';
import DiningExperienceSection from './components/sections/DiningExperienceSection';
import GallerySection from './components/sections/GallerySection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import ReservationSection from './components/sections/ReservationSection';
import LocationHoursSection from './components/sections/LocationHoursSection';
import FAQSection from './components/sections/FAQSection';

function getNormalizedPath() {
  const p = window.location.pathname.replace(/\/+$/, '') || '/';
  return p;
}

function VerdantAppContent() {
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

  // Dynamic Route Matching
  const customPageMatch = currentPath.match(/^\/page\/([a-zA-Z0-9_-]+)/);
  const activeCustomSlug = customPageMatch ? customPageMatch[1] : null;

  const blogPostMatch = currentPath.match(/^\/blog\/([a-zA-Z0-9_-]+)/);
  const activeBlogSlug = blogPostMatch ? blogPostMatch[1] : null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1A2F25', color: '#F6F2E9', overflowX: 'hidden' }}>
      {/* Preloader */}
      <Preloader />

      {/* Global Navigation */}
      <Navigation
        currentPath={currentPath}
        onNavigate={navigateTo}
        onNavigateHome={navigateToHome}
        onOpenReservation={openReservation}
      />

      {/* Standalone Pages vs 15-Section Landing Page */}
      {activeCustomSlug ? (
        <CustomPageView
          slug={activeCustomSlug}
          onNavigateHome={navigateToHome}
          onNavigateTo={navigateTo}
        />
      ) : activeBlogSlug ? (
        <BlogPostDetailPage
          slug={activeBlogSlug}
          onNavigateHome={navigateToHome}
          onNavigateTo={navigateTo}
        />
      ) : currentPath === '/blog' ? (
        <BlogListPage
          onNavigateHome={navigateToHome}
          onNavigateTo={navigateTo}
        />
      ) : currentPath === '/story' || currentPath === '/manifesto' ? (
        <BrandPage
          onNavigateHome={navigateToHome}
          onOpenReservation={openReservation}
        />
      ) : currentPath === '/signatures' ? (
        <SignaturesPage
          onNavigateHome={navigateToHome}
          onOpenReservation={openReservation}
        />
      ) : currentPath === '/menu' ? (
        <MenuPage
          onNavigateHome={navigateToHome}
          onOpenReservation={openReservation}
        />
      ) : currentPath === '/process' || currentPath === '/philosophy' ? (
        <StoryPage
          onNavigateHome={navigateToHome}
          onOpenReservation={openReservation}
        />
      ) : currentPath === '/architecture' || currentPath === '/space' ? (
        <InteriorPage
          onNavigateHome={navigateToHome}
          onOpenReservation={openReservation}
        />
      ) : currentPath === '/tour' ? (
        <TourPage
          onNavigateHome={navigateToHome}
          onOpenReservation={openReservation}
        />
      ) : currentPath === '/experience' ? (
        <ExperiencePage
          onNavigateHome={navigateToHome}
          onOpenReservation={openReservation}
        />
      ) : currentPath === '/contact' ? (
        <ContactPage
          onNavigateHome={navigateToHome}
          onOpenReservation={openReservation}
        />
      ) : (
        /* Full 15-Section Editorial Landing Page */
        <main>
          {/* Section 01: Hero */}
          <HeroSection />

          {/* Section 02: Editorial Intro */}
          <IntroSection />

          {/* Section 03: Philosophy */}
          <PhilosophySection />

          {/* Section 04: Signature Dishes */}
          <SignatureDishesSection />

          {/* Section 05: Menu Explorer */}
          <MenuExplorerSection />

          {/* Section 06: Culinary Story */}
          <CulinaryStorySection />

          {/* Section 07: Tropical Architecture */}
          <TropicalArchitectureSection />

          {/* Section 08: 3D Virtual Tour */}
          <TourSection />

          {/* Section 09: Dining Experience */}
          <DiningExperienceSection />

          {/* Section 10: Botanical Archive / Gallery */}
          <GallerySection />

          {/* Section 11: Critical Acclaim */}
          <TestimonialsSection />

          {/* Section 12: In-Page Reservation Booking */}
          <ReservationSection />

          {/* Section 13: Location, Hours & Map */}
          <LocationHoursSection />

          {/* Section 14: FAQs & Policies */}
          <FAQSection />
        </main>
      )}

      {/* Section 15: Footer & Colophon */}
      <Footer
        onNavigate={navigateTo}
        onNavigateHome={navigateToHome}
        onOpenReservation={openReservation}
      />

      {/* Dynamic Overlays & Modals */}
      <DishDetailModal />
      <ReservationModal />
      <Lightbox />
    </div>
  );
}

export default function App() {
  return (
    <CMSProvider>
      <VerdantAppContent />
    </CMSProvider>
  );
}
