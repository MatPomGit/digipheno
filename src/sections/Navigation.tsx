import { useEffect, useRef, useState } from 'react';

const NAV_LINKS = [
  { label: '[01] Sensorium', href: '#sensorium' },
  { label: '[02] The Stream', href: '#stream' },
  { label: '[03] The Phenotype', href: '#phenotype' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 clamp(16px, 4vw, 48px)',
        zIndex: 100,
        backgroundColor: scrolled ? 'rgba(5, 5, 7, 0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'background-color 0.3s, backdrop-filter 0.3s',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
      }}
    >
      <a
        href="#sensorium"
        onClick={(e) => handleClick(e, '#sensorium')}
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 16,
          fontWeight: 700,
          color: '#E0E0E0',
          textDecoration: 'none',
          letterSpacing: '0.1em',
        }}
      >
        DP-LAB
      </a>

      <div style={{ display: 'flex', gap: 32 }}>
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleClick(e, link.href)}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              color: '#8A8A93',
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              transition: 'color 0.3s',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = '#2EB872';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color = '#8A8A93';
            }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}