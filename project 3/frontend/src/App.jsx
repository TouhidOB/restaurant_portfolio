import React from 'react';
import { CMSProvider } from './context/CMSContext';

// Common Components & Modals
import Preloader from './components/common/Preloader';
import Navigation from './components/common/Navigation';
import DishDetailModal from './components/common/DishDetailModal';
import ReservationModal from './components/common/ReservationModal';
import Lightbox from './components/common/Lightbox';
import Footer from './components/common/Footer';

// 13 Editorial Sections
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

export default function App() {
  return (
    <CMSProvider>
      {/* S01: Luxury Preloader */}
      <Preloader />

      {/* Global Navigation */}
      <Navigation />

      {/* 13 Sequential Editorial Sections */}
      <main>
        {/* S02: Hero Section with 3D Architectural Villa Canvas */}
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

      {/* S15: Editorial Brand Footer */}
      <Footer />

      {/* Interactive Global Modals */}
      <DishDetailModal />
      <ReservationModal />
      <Lightbox />
    </CMSProvider>
  );
}
