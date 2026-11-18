import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Journey from './pages/Journey';
import Projects from './pages/Projects';

function parseLocation() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  const hash = window.location.hash.replace(/^#/, '');

  if (path === '/journey' || hash === 'journey') {
    return { page: 'journey', sectionId: null };
  }
  if (
    path === '/projects' ||
    hash === 'projects-page' ||
    path.startsWith('/project')
  ) {
    return { page: 'projects', sectionId: null };
  }
  return {
    page: 'home',
    sectionId: hash || null,
  };
}

const pageTitles = {
  home: 'Tharanithan Santhirathas | Aspiring Software Developer',
  journey: 'My Journey | Tharanithan Santhirathas',
  projects: 'Projects | Tharanithan Santhirathas',
};

export default function App() {
  const [routeState, setRouteState] = useState(() => parseLocation());

  const scrollToSection = useCallback((sectionId) => {
    if (!sectionId || sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    requestAnimationFrame(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }, []);

  useEffect(() => {
    document.title = pageTitles[routeState.page] || pageTitles.home;
  }, [routeState.page]);

  useEffect(() => {
    const syncRoute = () => {
      const next = parseLocation();
      setRouteState(next);
      if (next.page === 'home' && next.sectionId) {
        setTimeout(() => scrollToSection(next.sectionId), 50);
      } else {
        window.scrollTo(0, 0);
      }
    };

    // Initial hash scroll if loaded with /#contact
    const initial = parseLocation();
    if (initial.page === 'home' && initial.sectionId) {
      setTimeout(() => scrollToSection(initial.sectionId), 60);
    }

    window.addEventListener('popstate', syncRoute);
    window.addEventListener('hashchange', syncRoute);
    return () => {
      window.removeEventListener('popstate', syncRoute);
      window.removeEventListener('hashchange', syncRoute);
    };
  }, [scrollToSection]);

  const handleNavigate = useCallback(
    (page, sectionId = null) => {
      if (page === 'journey') {
        try {
          window.history.pushState({ page: 'journey' }, '', '/journey');
        } catch {
          window.location.hash = 'journey';
        }
        setRouteState({ page: 'journey', sectionId: null });
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (page === 'projects') {
        try {
          window.history.pushState({ page: 'projects' }, '', '/projects');
        } catch {
          window.location.hash = 'projects-page';
        }
        setRouteState({ page: 'projects', sectionId: null });
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const targetHash =
        sectionId && sectionId !== 'home' ? `#${sectionId}` : '';
      try {
        window.history.pushState(
          { page: 'home', sectionId },
          '',
          `/${targetHash}`
        );
      } catch {
        window.location.hash = sectionId || '';
      }

      setRouteState({ page: 'home', sectionId });
      setTimeout(() => scrollToSection(sectionId), 40);
    },
    [scrollToSection]
  );

  return (
    <>
      <Navbar currentPage={routeState.page} onNavigate={handleNavigate} />
      <main id="main-content">
        {routeState.page === 'journey' && (
          <Journey onNavigate={handleNavigate} />
        )}
        {routeState.page === 'projects' && (
          <Projects onNavigate={handleNavigate} />
        )}
        {routeState.page === 'home' && <Home onNavigate={handleNavigate} />}
      </main>
      <Footer onNavigate={handleNavigate} />
    </>
  );
}
