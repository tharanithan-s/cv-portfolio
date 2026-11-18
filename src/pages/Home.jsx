import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Education from '../components/Education';
import Skills from '../components/Skills';
import Contact from '../components/Contact';

export default function Home({ onNavigate }) {
  return (
    <div id="page-home" className="view-animate">
      <Hero onNavigate={onNavigate} />
      <About />
      <Education />
      <Skills />
      <Contact />
    </div>
  );
}
