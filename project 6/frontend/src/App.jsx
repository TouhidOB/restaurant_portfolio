import React, { useState, useEffect } from 'react';
import { CMSProvider } from './context/CMSContext';

// Common Components
import Preloader from './components/common/Preloader';
import Navigation from './components/common/Navigation';
import DishDetailModal from './components/common/DishDetailModal';
import ReservationModal from './components/common/ReservationModal';
import Lightbox from './components/common/Lightbox';
import Footer from './components/common/Footer';

// Dynamic Standalone Page Builder Component
import CustomPageView from './components/pages/CustomPageView';

// 14 Section Components
import HeroSection from './components/sections/HeroSection';
import IntroSection from './components/sections/IntroSection';
import PhilosophySection from './components/sections/PhilosophySection';
import SignatureDishesSection from './components/sections/SignatureDishesSection';
import MenuExplorerSection from './components/sections/MenuExplorerSection';
import DinerStorySection from './components/sections/DinerStorySection';
import DinerArchitectureSection from './components/sections/DinerArchitectureSection';
import TourSection from './components/sections/TourSection';
import DinerExperienceSection from './components/sections/DinerExperienceSection';
import GallerySection from './components/sections/GallerySection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import ReservationSection from './components/sections/ReservationSection';
import LocationContactSection from './components/sections/LocationContactSection';
import FAQSection from './components/sections/FAQSection';

function getInitialPageSlug() {
  const path = window.location.pathname;
  const match = path.match(/^\/page\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

export default function App() {
  const [activePageSlug, setActivePageSlug] = useState(getInitialPageSlug);

  useEffect(() => {
    const handlePopState = () => {
      setActivePageSlug(getInitialPageSlug());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToPage = (slug) => {
    setActivePageSlug(slug);
    window.history.pushState({}, '', `/page/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setActivePageSlug(null);
    window.history.pushState({}, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <CMSProvider>
      <Preloader />
      <Navigation
        activePageSlug={activePageSlug}
        onNavigateHome={navigateToHome}
        onNavigatePage={navigateToPage}
      />

      <main>
        {activePageSlug ? (
          <CustomPageView slug={activePageSlug} onNavigateHome={navigateToHome} />
        ) : (
          <>
            {/* Section 01: Hero */}
            <HeroSection />

            {/* Section 02: Editorial Intro */}
            <IntroSection />

            {/* Section 03: Philosophy */}
            <PhilosophySection />

            {/* Section 04: Signature Dishes Highlights */}
            <SignatureDishesSection />

            {/* Section 05: Menu Explorer */}
            <MenuExplorerSection />

            {/* Section 06: Diner Story */}
            <DinerStorySection />

            {/* Section 07: Diner Architecture */}
            <DinerArchitectureSection />

            {/* Section 08: 3D Spatial Virtual Tour */}
            <TourSection />

            {/* Section 09: Diner Experience */}
            <DinerExperienceSection />

            {/* Section 10: Restaurant Gallery Archive */}
            <GallerySection />

            {/* Section 11: Guest Testimonials */}
            <TestimonialsSection />

            {/* Section 12: Table Reservation Inquiry */}
            <ReservationSection />

            {/* Section 13: Location, Hours & Map */}
            <LocationContactSection />

            {/* Section 14: FAQs & Policies */}
            <FAQSection />
          </>
        )}
      </main>

      {/* Section 15: Colophon & Logistics Footer */}
      <Footer />

      {/* Interactive Global Modals */}
      <DishDetailModal />
      <ReservationModal />
      <Lightbox />
    </CMSProvider>
  );
}
