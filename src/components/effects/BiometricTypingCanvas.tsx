import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

const LINES = [
  'In the age of pervasive computing,',
  'the smartphone is no longer just a tool.',
  'It is a digital stethoscope,',
  'continuously measuring the phenotype.',
  'Welcome to the era of quantified behavior.',
];

const PARTICLE_COLORS = ['#2EB872', '#00E5FF', '#FFFFFF'];
const PARTICLE_LIFE = 60;
const PARTICLE_COUNT_PER_CHAR = 12;
const SHAKE_INTENSITY = 4;
const CHAR_DELAY = 3;
const LINE_DELAY = 15;

export default function BiometricTypingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const prevVisibleCountRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const shakeRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resize() {
      if (!canvas || !container) return;
      const dpr = Math.min(window.devicePixelRatio, 2);
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx!.scale(dpr, dpr);
    }

    resize();
    window.addEventListener('resize', resize);

    // Calculate total chars including delays
    const lineData: { start: number; end: number; text: string }[] = [];
    let cumulativeFrames = 0;

    LINES.forEach((line) => {
      const lineStart = cumulativeFrames;
      cumulativeFrames += line.length * CHAR_DELAY;
      const lineEnd = cumulativeFrames;
      lineData.push({ start: lineStart, end: lineEnd, text: line });
      cumulativeFrames += LINE_DELAY;
    });
    const totalFrames = cumulativeFrames;

    // ScrollTrigger
    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: '+=200%',
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        progressRef.current = self.progress;
      },
    });

    function spawnParticles(x: number, y: number) {
      for (let i = 0; i < PARTICLE_COUNT_PER_CHAR; i++) {
        const angle = (Math.PI * 2 * i) / PARTICLE_COUNT_PER_CHAR + Math.random() * 0.5;
        const speed = 1 + Math.random() * 3;
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: PARTICLE_LIFE,
          maxLife: PARTICLE_LIFE,
          color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
          size: 1 + Math.random() * 2,
        });
      }
    }

    function draw() {
      if (!canvas || !ctx || !container) return;
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      // Font
      const fontSize = Math.max(30, Math.min(58, width * 0.048));
      ctx.font = `500 ${fontSize}px 'Space Grotesk', sans-serif`;
      ctx.textBaseline = 'top';

      // Calculate visible chars based on progress
      const currentFrame = Math.floor(progressRef.current * totalFrames);
      let visibleChars = 0;

      for (const ld of lineData) {
        if (currentFrame >= ld.end) {
          visibleChars += ld.text.length;
        } else if (currentFrame > ld.start) {
          visibleChars += Math.floor((currentFrame - ld.start) / CHAR_DELAY);
        }
      }

      // Check for new characters
      if (visibleChars > prevVisibleCountRef.current) {
        const newCount = visibleChars - prevVisibleCountRef.current;
        shakeRef.current = SHAKE_INTENSITY;

        // Find position of newly revealed chars
        let charIdx = 0;
        const lineSpacing = fontSize * 1.6;
        const startY = height * 0.1;

        for (const ld of lineData) {
          let lineVisible = 0;
          if (currentFrame >= ld.end) {
            lineVisible = ld.text.length;
          } else if (currentFrame > ld.start) {
            lineVisible = Math.floor((currentFrame - ld.start) / CHAR_DELAY);
          }

          if (charIdx + lineVisible > prevVisibleCountRef.current) {
            // This line has newly revealed chars
            const newlyRevealedInLine = Math.min(
              lineVisible,
              prevVisibleCountRef.current - charIdx + newCount
            ) - Math.max(0, prevVisibleCountRef.current - charIdx);

            const startNewChar = Math.max(0, prevVisibleCountRef.current - charIdx);

            for (let c = 0; c < newlyRevealedInLine; c++) {
              const charPos = startNewChar + c;
              if (charPos < ld.text.length) {
                const prefix = ld.text.substring(0, charPos + 1);
                const metrics = ctx.measureText(prefix);
                const charX = metrics.width - ctx.measureText(ld.text[charPos]).width + 20;
                const charY = startY + LINES.indexOf(ld.text) * lineSpacing;
                spawnParticles(charX, charY + fontSize / 2);
              }
            }
          }

          charIdx += ld.text.length;
        }
      }
      prevVisibleCountRef.current = visibleChars;

      // Apply shake
      ctx.save();
      if (shakeRef.current > 0.1) {
        const sx = (Math.random() - 0.5) * shakeRef.current * 2;
        const sy = (Math.random() - 0.5) * shakeRef.current * 2;
        ctx.translate(sx, sy);
        shakeRef.current *= 0.85;
      }

      // Draw text
      const lineSpacing = fontSize * 1.6;
      let startY = height * 0.1;

      for (const ld of lineData) {
        let lineVisible = 0;
        if (currentFrame >= ld.end) {
          lineVisible = ld.text.length;
        } else if (currentFrame > ld.start) {
          lineVisible = Math.floor((currentFrame - ld.start) / CHAR_DELAY);
        }

        if (lineVisible > 0) {
          const visibleText = ld.text.substring(0, lineVisible);

          // Glow effect for latest char
          if (lineVisible < ld.text.length && visibleChars > 0) {
            const lastChar = visibleText[visibleText.length - 1];
            const prefix = visibleText.slice(0, -1);
            const prefixWidth = ctx.measureText(prefix).width;

            ctx.save();
            ctx.shadowColor = '#2EB872';
            ctx.shadowBlur = 20;
            ctx.fillStyle = '#2EB872';
            ctx.fillText(lastChar, 20 + prefixWidth, startY);
            ctx.restore();

            if (prefix) {
              ctx.fillStyle = '#E0E0E0';
              ctx.fillText(prefix, 20, startY);
            }
          } else {
            ctx.fillStyle = '#E0E0E0';
            ctx.fillText(visibleText, 20, startY);
          }
        }

        startY += lineSpacing;
      }

      // Update and draw particles
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.95;
        p.vy *= 0.95;
        p.life--;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.life / p.maxLife;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
        ctx.restore();
      }

      ctx.restore();

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      st.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100vh',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '60vh',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', marginTop: 40 }}>
        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(32px, 5vw, 64px)',
            fontWeight: 700,
            color: '#E0E0E0',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          FENOTYPOWANIE
          <br />
          <span style={{ color: '#2EB872' }}>CYFROWE</span>
        </h1>
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 14,
            color: '#8A8A93',
            marginTop: 16,
            lineHeight: 1.6,
          }}
        >
          Moment-by-moment quantification of the human phenotype
          <br />
          using data from personal digital devices.
        </p>
      </div>
    </div>
  );
}