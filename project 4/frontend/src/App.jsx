import React from 'react';
import { CMSProvider } from './context/CMSContext';

// Common Components
import Preloader from './components/common/Preloader';
import Navigation from './components/common/Navigation';
import DishDetailModal from './components/common/DishDetailModal';
import ReservationModal from './components/common/ReservationModal';
import Lightbox from './components/common/Lightbox';
import Footer from './components/common/Footer';

// 14 Editorial Sections (Section 15 is Footer)
import HeroSection from './components/sections/HeroSection';
import IntroSection from './components/sections/IntroSection';
import PhilosophySection from './components/sections/PhilosophySection';
import SignatureDishesSection from './components/sections/SignatureDishesSection';
import MenuExplorerSection from './components/sections/MenuExplorerSection';
import CulinaryProcessSection from './components/sections/CulinaryProcessSection';
import ArchitectureSection from './components/sections/ArchitectureSection';
import TourSection from './components/sections/TourSection';
import DiningExperienceSection from './components/sections/DiningExperienceSection';
import GallerySection from './components/sections/GallerySection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import ReservationSection from './components/sections/ReservationSection';
import LocationHoursSection from './components/sections/LocationHoursSection';
import FAQSection from './components/sections/FAQSection';

export default function App() {
  return (
    <CMSProvider>
      <Preloader />
      <Navigation />
      
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

        {/* Section 06: Culinary Process */}
        <CulinaryProcessSection />

        {/* Section 07: Architecture & Materials */}
        <ArchitectureSection />

        {/* Section 08: 3D Virtual Tour (5 Viewpoints) */}
        <TourSection />

        {/* Section 09: Dining Experience */}
        <DiningExperienceSection />

        {/* Section 10: Gallery Archive */}
        <GallerySection />

        {/* Section 11: Critical Acclaim */}
        <TestimonialsSection />

        {/* Section 12: In-Page Reservation Terminal */}
        <ReservationSection />

        {/* Section 13: Location & Coordinates */}
        <LocationHoursSection />

        {/* Section 14: Frequent Inquiries (FAQ) */}
        <FAQSection />
      </main>

      {/* Section 15: Footer & Colophon */}
      <Footer />

      {/* Dynamic Overlays & Modals */}
      <DishDetailModal />
      <ReservationModal />
      <Lightbox />
    </CMSProvider>
  );
}
