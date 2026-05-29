import { useEffect, useRef } from 'react';
import { ExternalLink } from 'lucide-react';

const REFERENCES = [
  { label: 'Torous et al. (2016)', url: 'https://pubmed.ncbi.nlm.nih.gov/27142550/' },
  { label: 'Onnela (2021)', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8451276/' },
  { label: 'Saeb et al. (2015)', url: 'https://pubmed.ncbi.nlm.nih.gov/26565213/' },
  { label: 'Schuller & Schuller (2020)', url: 'https://www.sciencedirect.com/science/article/pii/S0167639320301594' },
  { label: 'Insel (2018)', url: 'https://www.nimh.gov/about/directors/thomas-insel' },
  { label: 'Jain et al. (2015)', url: 'https://pubmed.ncbi.nlm.nih.gov/26181146/' },
];

export default function FooterSection() {
  const eyeRef = useRef<SVGSVGElement>(null);
  const pupilRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!eyeRef.current || !pupilRef.current) return;
      const rect = eyeRef.current.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;
      const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
      const distance = Math.min(8, Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 20);
      const px = Math.cos(angle) * distance;
      const py = Math.sin(angle) * distance;
      pupilRef.current.setAttribute('transform', `translate(${px}, ${py})`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 10,
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '80px 24px',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 80,
          alignItems: 'start',
        }}
      >
        {/* Left: References */}
        <div>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.75rem',
              color: '#2EB872',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            Referencje naukowe
          </span>
          <div
            style={{
              marginTop: 24,
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            {REFERENCES.map((ref, idx) => (
              <a
                key={idx}
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12.5,
                  color: '#8A8A93',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  transition: 'color 0.3s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = '#2EB872';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = '#8A8A93';
                }}
              >
                {ref.label}
                <ExternalLink size={10} />
              </a>
            ))}
          </div>

          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.75rem',
              color: 'rgba(138, 138, 147, 0.5)',
              marginTop: 48,
            }}
          >
            Digital Phenotyping Lab — Educational resource on moment-by-moment
            quantification of the human phenotype.
          </p>
        </div>

        {/* Right: Animated eye */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <svg
            ref={eyeRef}
            width="120"
            height="80"
            viewBox="0 0 120 80"
            fill="none"
            style={{ opacity: 0.6 }}
          >
            {/* Eye outline */}
            <path
              d="M10 40C10 40 30 10 60 10C90 10 110 40 110 40C110 40 90 70 60 70C30 70 10 40 10 40Z"
              stroke="#8A8A93"
              strokeWidth="1"
              fill="none"
            />
            {/* Iris */}
            <circle cx="60" cy="40" r="18" stroke="#8A8A93" strokeWidth="1" fill="none" />
            {/* Pupil */}
            <circle
              ref={pupilRef}
              cx="60"
              cy="40"
              r="8"
              fill="#2EB872"
              opacity="0.8"
            />
          </svg>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10.5,
              color: 'rgba(138, 138, 147, 0.4)',
              letterSpacing: '0.1em',
            }}
          >
            The phenotype is watching
          </span>
        </div>
      </div>
    </footer>
  );
}