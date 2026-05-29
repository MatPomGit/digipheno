import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Activity,
  MapPin,
  Heart,
  Brain,
  Smartphone,
  AudioWaveform,
  Moon,
  MessageSquare,
  Footprints,
  Sun,
  Users,
  Timer,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CELL_DATA = [
  { icon: Heart, label: 'HRV', value: '42ms', desc: 'Heart Rate Variability' },
  { icon: MapPin, label: 'MOBILITY', value: '4.2km', desc: 'Daily movement radius' },
  { icon: Activity, label: 'STEPS', value: '8,432', desc: 'Accelerometer count' },
  { icon: Brain, label: 'COGNITION', value: '0.87', desc: 'Cognitive load index' },
  { icon: Smartphone, label: 'SCREEN', value: '3.2h', desc: 'Active screen time' },
  { icon: AudioWaveform, label: 'PROSODY', value: '2.1kHz', desc: 'Vocal frequency range' },
  { icon: Moon, label: 'SLEEP', value: '6.8h', desc: 'Total sleep duration' },
  { icon: MessageSquare, label: 'SOCIAL', value: '24', desc: 'Daily interactions' },
  { icon: Footprints, label: 'GAIT', value: '0.92', desc: 'Gait regularity index' },
  { icon: Sun, label: 'LIGHT', value: '340lux', desc: 'Ambient light exposure' },
  { icon: Users, label: 'PROXIMITY', value: '8', desc: 'Bluetooth encounters' },
  { icon: Timer, label: 'LATENCY', value: '180ms', desc: 'Touch response time' },
];

export default function DataCellMorph() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cells = gsap.utils.toArray<HTMLDivElement>(grid.querySelectorAll('.data-cell'));

    gsap.set(cells, {
      transformPerspective: 1200,
      transformStyle: 'preserve-3d',
      force3D: true,
      willChange: 'transform, opacity',
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: grid,
        start: 'top 85%',
        end: 'top 25%',
        scrub: 0.65,
      },
    });

    tl.from(
      cells,
      {
        z: () => gsap.utils.random(-360, 360),
        rotationX: () => gsap.utils.random(-26, 26),
        rotationY: () => gsap.utils.random(-26, 26),
        autoAlpha: 0,
        stagger: 0.04,
        ease: 'power3.out',
      }
    );

    return () => {
      tl.kill();
    };
  }, []);

  const flipCell = (cell: HTMLDivElement, rotationY: number) => {
    const flipper = cell.querySelector<HTMLDivElement>('.data-cell-flipper');
    if (!flipper) return;

    gsap.killTweensOf(flipper);
    gsap.to(flipper, {
      rotationY,
      duration: 0.85,
      ease: 'power3.inOut',
      overwrite: 'auto',
      force3D: true,
    });
  };

  const handleMouseEnter = (cell: HTMLDivElement) => {
    flipCell(cell, 180);
  };

  const handleMouseLeave = (cell: HTMLDivElement) => {
    flipCell(cell, 0);
  };

  return (
    <div
      ref={gridRef}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
        gap: 20,
        perspective: 1200,
        perspectiveOrigin: '50% 40%',
      }}
    >
      {CELL_DATA.map((cell, idx) => {
        const Icon = cell.icon;
        return (
          <div
            key={idx}
            className="data-cell"
            onMouseEnter={(e) => {
              handleMouseEnter(e.currentTarget);
            }}
            onMouseLeave={(e) => {
              handleMouseLeave(e.currentTarget);
            }}
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '1',
              transformStyle: 'preserve-3d',
              cursor: 'none',
            }}
          >
            <div
              className="data-cell-flipper"
              style={{
                position: 'absolute',
                inset: 0,
                transformStyle: 'preserve-3d',
              }}
            >
            {/* Front */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backfaceVisibility: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)',
                background: '#12121A',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 16,
              }}
            >
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 11.5,
                  color: '#8A8A93',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
              >
                {cell.label}
              </span>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 'clamp(21px, 3vw, 32px)',
                  fontWeight: 700,
                  color: '#E0E0E0',
                  marginTop: 8,
                }}
              >
                {cell.value}
              </span>
            </div>

            {/* Back */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                border: '1px solid rgba(46, 184, 114, 0.3)',
                background: '#0a0a12',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 16,
                gap: 8,
              }}
            >
              <Icon size={28} color="#2EB872" strokeWidth={1.5} />
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12.5,
                  color: '#8A8A93',
                  textAlign: 'center',
                  lineHeight: 1.4,
                }}
              >
                {cell.desc}
              </span>
            </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}