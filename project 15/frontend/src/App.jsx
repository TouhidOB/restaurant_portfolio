import React, { useState, useEffect } from 'react';
import { CMSProvider } from './context/CMSContext';

// Common Components
import Preloader from './components/common/Preloader';
import Navigation from './components/common/Navigation';
import DishDetailModal from './components/common/DishDetailModal';
import ReservationModal from './components/common/ReservationModal';
import Lightbox from './components/common/Lightbox';
import Footer from './components/common/Footer';

// 13 Editorial Sections (Preserved on /)
import S02_Hero from './sections/S02_Hero';
import S03_BrandStory from './sections/S03_BrandStory';
import S04_VirtualTour from './sections/S04_VirtualTour';
import S05_FoodPhilosophy from './sections/S05_FoodPhilosophy';
import S06_FeaturedDishes from './sections/S06_FeaturedDishes';
import S07_MenuExplorer from './sections/S07_MenuExplorer';
import S08_KitchenStudio from './sections/S08_KitchenStudio';
import S09_CulinaryTeam from './sections/S09_CulinaryTeam';
import S10_EventsExperiences from './sections/S10_EventsExperiences';
import S11_Gallery from './sections/S11_Gallery';
import S12_Testimonials from './sections/S12_Testimonials';
import S13_Reservation from './sections/S13_Reservation';
import S14_Location from './sections/S14_Location';

// Standalone Dedicated Pages
import StoryPage from './pages/StoryPage';
import FeaturedPage from './pages/FeaturedPage';
import MenuPage from './pages/MenuPage';
import TourPage from './pages/TourPage';
import PhilosophyPage from './pages/PhilosophyPage';
import KitchenPage from './pages/KitchenPage';
import TeamPage from './pages/TeamPage';
import ExperiencesPage from './pages/ExperiencesPage';
import ContactPage from './pages/ContactPage';
import BlogListPage from './pages/BlogListPage';
import BlogPostDetailPage from './pages/BlogPostDetailPage';
import CustomPageView from './pages/CustomPageView';

function AppContent() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    if (path.startsWith('#')) {
      if (currentPath !== '/') {
        window.history.pushState({}, '', '/' + path);
        setCurrentPath('/');
        setTimeout(() => {
          const el = document.querySelector(path);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.querySelector(path);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    const cleanPath = currentPath.replace(/\/+$/, '') || '/';

    // Dynamic blog article route: /blog/:slug
    if (cleanPath.startsWith('/blog/')) {
      const slug = cleanPath.replace('/blog/', '');
      return <BlogPostDetailPage slug={slug} onNavigate={navigate} />;
    }

    // Dynamic custom page route: /page/:slug
    if (cleanPath.startsWith('/page/')) {
      const slug = cleanPath.replace('/page/', '');
      return <CustomPageView slug={slug} onNavigate={navigate} />;
    }

    switch (cleanPath) {
      case '/story':
        return <StoryPage onNavigate={navigate} />;
      case '/featured':
        return <FeaturedPage onNavigate={navigate} />;
      case '/menu':
        return <MenuPage onNavigate={navigate} />;
      case '/tour':
        return <TourPage onNavigate={navigate} />;
      case '/philosophy':
        return <PhilosophyPage onNavigate={navigate} />;
      case '/kitchen':
      case '/the-lab':
        return <KitchenPage onNavigate={navigate} />;
      case '/team':
        return <TeamPage onNavigate={navigate} />;
      case '/experiences':
      case '/happenings':
        return <ExperiencesPage onNavigate={navigate} />;
      case '/contact':
      case '/location':
        return <ContactPage onNavigate={navigate} />;
      case '/blog':
        return <BlogListPage onNavigate={navigate} />;
      case '/':
      default:
        return (
          <main>
            <S02_Hero />
            <S03_BrandStory />
            <S04_VirtualTour />
            <S05_FoodPhilosophy />
            <S06_FeaturedDishes />
            <S07_MenuExplorer />
            <S08_KitchenStudio />
            <S09_CulinaryTeam />
            <S10_EventsExperiences />
            <S11_Gallery />
            <S12_Testimonials />
            <S13_Reservation />
            <S14_Location />
          </main>
        );
    }
  };

  return (
    <div className="pop-food-studio-app">
      {/* S01: Pop-Art Preloader */}
      {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}

      {/* Global Navigation */}
      <Navigation currentPath={currentPath} onNavigate={navigate} />

      {/* Main Content Router */}
      {renderContent()}

      {/* S15: Massive Pop Footer */}
      <Footer onNavigate={navigate} />

      {/* Global Pop-Art Interactive Modals */}
      <DishDetailModal />
      <ReservationModal />
      <Lightbox />
    </div>
  );
}

export default function App() {
  return (
    <CMSProvider>
      <AppContent />
    </CMSProvider>
  );
}
