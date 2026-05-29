import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STREAM_TEXT = 'BEHAVIORAL BIOMARKERS • GPS MOBILITY • ACCELEROMETRY • HEART RATE VARIABILITY • SLEEP ARCHITECTURE • VOCAL PROSODY • TOUCH DYNAMICS • ';

export default function LivingDatastream() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const wrapper = wrapperRef.current;
    if (!track || !wrapper) return;

    // Constant slow movement
    const tween = gsap.to(track, {
      xPercent: -33.33,
      duration: 30,
      ease: 'none',
      repeat: -1,
    });

    // Speed up on scroll
    const st = ScrollTrigger.create({
      trigger: wrapper,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        const velocity = Math.abs(self.getVelocity());
        const speedMult = 1 + velocity / 3000;
        tween.timeScale(Math.min(speedMult, 4));
      },
    });

    return () => {
      tween.kill();
      st.kill();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{
        overflow: 'hidden',
        width: '100%',
        position: 'relative',
        height: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          width: 'max-content',
        }}
      >
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(60px, 8vw, 120px)',
            fontWeight: 700,
            color: 'rgba(18, 18, 26, 0.8)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            userSelect: 'none',
          }}
        >
          {STREAM_TEXT}&nbsp;
        </span>
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(60px, 8vw, 120px)',
            fontWeight: 700,
            color: 'rgba(18, 18, 26, 0.8)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            userSelect: 'none',
          }}
        >
          {STREAM_TEXT}&nbsp;
        </span>
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(60px, 8vw, 120px)',
            fontWeight: 700,
            color: 'rgba(18, 18, 26, 0.8)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            userSelect: 'none',
          }}
        >
          {STREAM_TEXT}&nbsp;
        </span>
      </div>
    </div>
  );
}