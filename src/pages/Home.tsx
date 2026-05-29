import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NeuralVoidShader from '../components/effects/NeuralVoidShader';
import CustomCursor from '../components/CustomCursor';
import Navigation from '../sections/Navigation';
import HeroSection from '../sections/HeroSection';
import DatastreamSection from '../sections/DatastreamSection';
import PhenotypeSection from '../sections/PhenotypeSection';
import FooterSection from '../sections/FooterSection';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div style={{ backgroundColor: '#050507', minHeight: '100vh' }}>
      <NeuralVoidShader />
      <CustomCursor />
      <Navigation />
      <main>
        <HeroSection />
        <DatastreamSection />
        <PhenotypeSection />
      </main>
      <FooterSection />
    </div>
  );
}