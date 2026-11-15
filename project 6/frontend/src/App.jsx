import React, { useState, useEffect } from 'react';
import { CMSProvider } from './context/CMSContext';

// Common Components
import Preloader from './components/common/Preloader';
import Navigation from './components/common/Navigation';
import DishDetailModal from './components/common/DishDetailModal';
import ReservationModal from './components/common/ReservationModal';
import Lightbox from './components/common/Lightbox';
import Footer from './components/common/Footer';

// Dedicated Navbar Pages
import PhilosophyPage from './components/pages/PhilosophyPage';
import SignaturesPage from './components/pages/SignaturesPage';
import MenuPage from './components/pages/MenuPage';
import StoryPage from './components/pages/StoryPage';
import ArchitecturePage from './components/pages/ArchitecturePage';
import TourPage from './components/pages/TourPage';
import ExperiencePage from './components/pages/ExperiencePage';
import ContactPage from './components/pages/ContactPage';
import BlogListPage from './components/pages/BlogListPage';
import BlogPostDetailPage from './components/pages/BlogPostDetailPage';

// Dynamic Standalone Page Builder Component
import CustomPageView from './components/pages/CustomPageView';

// 14 Complete Landing Page Sections
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

function getNormalizedPath() {
  const p = window.location.pathname.replace(/\/+$/, '') || '/';
  return p;
}

export default function App() {
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

  const navigateToPageKey = (key) => {
    navigateTo(`/${key}`);
  };

  const navigateToCustomPage = (slug) => {
    navigateTo(`/page/${slug}`);
  };

  // Determine active custom page slug if on /page/:slug
  const customPageMatch = currentPath.match(/^\/page\/([a-zA-Z0-9_-]+)/);
  const activeCustomSlug = customPageMatch ? customPageMatch[1] : null;

  // Determine active blog post slug if on /blog/:slug
  const blogPostMatch = currentPath.match(/^\/blog\/([a-zA-Z0-9_-]+)/);
  const activeBlogSlug = blogPostMatch ? blogPostMatch[1] : null;

  return (
    <CMSProvider>
      <Preloader />
      <Navigation
        currentPath={currentPath}
        activePageSlug={activeCustomSlug}
        onNavigate={navigateTo}
        onNavigateHome={navigateToHome}
        onNavigatePage={navigateToCustomPage}
      />

      <main>
        {/* Route 01: Dedicated Philosophy Page */}
        {currentPath === '/philosophy' && (
          <PhilosophyPage onNavigateHome={navigateToHome} onNavigatePage={navigateToPageKey} />
        )}

        {/* Route 02: Dedicated Signatures Page */}
        {currentPath === '/signatures' && (
          <SignaturesPage onNavigateHome={navigateToHome} onNavigatePage={navigateToPageKey} />
        )}

        {/* Route 03: Dedicated Full Menu Page */}
        {currentPath === '/menu' && (
          <MenuPage onNavigateHome={navigateToHome} onNavigatePage={navigateToPageKey} />
        )}

        {/* Route 04: Dedicated Diner Story Page */}
        {currentPath === '/story' && (
          <StoryPage onNavigateHome={navigateToHome} onNavigatePage={navigateToPageKey} />
        )}

        {/* Route 05: Dedicated Architecture & Design Page */}
        {currentPath === '/architecture' && (
          <ArchitecturePage onNavigateHome={navigateToHome} onNavigatePage={navigateToPageKey} />
        )}

        {/* Route 06: Dedicated 3D Spatial Tour Page */}
        {currentPath === '/tour' && (
          <TourPage onNavigateHome={navigateToHome} onNavigatePage={navigateToPageKey} />
        )}

        {/* Route 07: Dedicated Diner Experience Page */}
        {currentPath === '/experience' && (
          <ExperiencePage onNavigateHome={navigateToHome} onNavigatePage={navigateToPageKey} />
        )}

        {/* Route 08: Dedicated Contact & Location Page */}
        {(currentPath === '/contact' || currentPath === '/location') && (
          <ContactPage onNavigateHome={navigateToHome} onNavigatePage={navigateToPageKey} />
        )}

        {/* Route 09: Dedicated Editorial Blog List Page */}
        {currentPath === '/blog' && (
          <BlogListPage
            onNavigateHome={navigateToHome}
            onNavigatePost={(slug) => navigateTo(`/blog/${slug}`)}
          />
        )}

        {/* Route 10: Dedicated Editorial Blog Post Detail Page */}
        {activeBlogSlug && (
          <BlogPostDetailPage
            slug={activeBlogSlug}
            onNavigateHome={navigateToHome}
            onNavigateBlog={() => navigateTo('/blog')}
            onNavigatePost={(slug) => navigateTo(`/blog/${slug}`)}
          />
        )}

        {/* Route 11: Dynamic Custom Standalone CMS Page */}
        {activeCustomSlug && (
          <CustomPageView slug={activeCustomSlug} onNavigateHome={navigateToHome} />
        )}

        {/* Route 12: Complete Landing Page (All 14 Sections Uninterrupted) */}
        {currentPath === '/' && (
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
      <Footer onNavigate={navigateTo} />

      {/* Interactive Global Modals */}
      <DishDetailModal />
      <ReservationModal />
      <Lightbox />
    </CMSProvider>
  );
}
