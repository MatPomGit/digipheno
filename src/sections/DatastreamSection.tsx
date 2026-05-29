import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LivingDatastream from '../components/effects/LivingDatastream';
import { Radio, ClipboardCheck, Dna, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    icon: Radio,
    title: 'Passive Sensing',
    content:
      'Smartfony nieustannie rejestrują dane z sensorów — GPS śledzi wzorce mobilności, akcelerometr mierzy aktywność fizyczną, a mikrofon analizuje cechy głosu (prozodię). Nie wymaga to żadnej aktywności od użytkownika — dane płyną nieprzerwanie w tle.',
    detail:
      'Największa wartość nie leży w pojedynczym pomiarze, ale w rytmie: regularności tras, zmienności prędkości chodzenia, porach odblokowań telefonu i długości okresów bez aktywności.',
    offset: 100,
  },
  {
    icon: ClipboardCheck,
    title: 'Active Signals',
    content:
      'Ecological Momentary Assessment (EMA) to metoda, w której użytkownik kilka razy dziennie odpowiada na krótkie pytania o swój nastrój, poziom stresu czy jakość snu. Dane aktywne dostarczają kontekstu subiektywnego do obiektywnych pomiarów sensorów.',
    detail:
      'EMA ogranicza błąd pamięci: zamiast pytać po tygodniu „jak się czułeś?”, system pyta w chwili doświadczenia, gdy emocja, otoczenie i zachowanie są jeszcze zsynchronizowane.',
    offset: 250,
  },
  {
    icon: Dna,
    title: 'The Phenotype',
    content:
      'Fenotyp cyfrowy to zintegrowany model zachowania powstały z fuzji danych pasywnych i aktywnych. Umożliwia budowę wysokorozdzielczych, czasowych map stanów psychicznych — obiektywnych, ciągłych i pozbawionych błędu wspomnienia.',
    detail:
      'W praktyce to dynamiczny podpis funkcjonowania: model bazowy dla konkretnej osoby, od którego liczy się odchylenia, a nie uniwersalna norma pasująca do wszystkich.',
    offset: 400,
  },
];

const SIGNAL_FACTS = [
  {
    label: 'GPS nie musi oznaczać śledzenia adresu',
    value: 'Z surowych współrzędnych można wyliczać cechy pochodne, np. entropię mobilności, promień poruszania się lub czas spędzony poza domem.',
  },
  {
    label: 'Akcelerometr widzi więcej niż kroki',
    value: 'Mikrodrgania i sekwencje ruchu pomagają odróżniać bezruch, spacer, transport oraz nagłe spadki aktywności dobowej.',
  },
  {
    label: 'Klawiatura może być markerem poznawczym',
    value: 'Tempo pisania, pauzy i liczba poprawek bywają analizowane jako proxy spowolnienia psychoruchowego lub pobudzenia.',
  },
  {
    label: 'Kontekst jest ważniejszy niż liczba',
    value: 'Ten sam poziom aktywności może oznaczać zdrową rutynę, izolację albo odpoczynek — dlatego modele łączą wiele sygnałów naraz.',
  },
];

export default function DatastreamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);

    cards.forEach((card) => {
      if (!card) return;
      gsap.from(card, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (cards.includes(st.trigger as HTMLDivElement)) {
          st.kill();
        }
      });
    };
  }, []);

  return (
    <section
      id="stream"
      ref={sectionRef}
      style={{
        position: 'relative',
        zIndex: 10,
        minHeight: '150vh',
        paddingTop: 'clamp(80px, 12vh, 160px)',
        paddingBottom: 'clamp(80px, 12vh, 160px)',
      }}
    >
      {/* Section header */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', marginBottom: 80 }}>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12.5,
            color: '#2EB872',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          [02] The Datastream
        </span>
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(34px, 4.8vw, 58px)',
            fontWeight: 700,
            color: '#E0E0E0',
            marginTop: 16,
            lineHeight: 1.1,
            maxWidth: 600,
          }}
        >
          Strumień danych behawioralnych
        </h2>
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 16,
            color: '#8A8A93',
            marginTop: 20,
            lineHeight: 1.7,
            maxWidth: 560,
          }}
        >
          Każde Twoje dotknięcie ekranu, każdy krok i każda zmiana lokalizacji 
          generuje dane. W agregacie tworzą one cyfrowy odcisk palca Twojego 
          funkcjonowania psychicznego.
        </p>
      </div>

      {/* Datastream ticker */}
      <LivingDatastream />

      {/* Floating cards */}
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative',
          marginTop: -60,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 24,
          }}
        >
          {CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                ref={(el) => { cardsRef.current[idx] = el; }}
                style={{
                  background: '#12121A',
                  border: '1px solid rgba(255,255,255,0.08)',
                  padding: '32px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 3,
                    height: '100%',
                    background: 'linear-gradient(180deg, #2EB872 0%, #00E5FF 100%)',
                  }}
                />
                <Icon size={24} color="#2EB872" strokeWidth={1.5} />
                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 24,
                    fontWeight: 500,
                    color: '#E0E0E0',
                    marginTop: 16,
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 13.5,
                    color: '#8A8A93',
                    marginTop: 12,
                    lineHeight: 1.7,
                  }}
                >
                  {card.content}
                </p>
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12.5,
                    color: '#2EB872',
                    marginTop: 14,
                    lineHeight: 1.7,
                  }}
                >
                  {card.detail}
                </p>
              </div>
            );
          })}
        </div>

        <div
          style={{
            marginTop: 48,
            padding: '28px',
            border: '1px solid rgba(46, 184, 114, 0.18)',
            background: 'linear-gradient(135deg, rgba(46, 184, 114, 0.08), rgba(0, 229, 255, 0.03))',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Sparkles size={18} color="#2EB872" strokeWidth={1.5} />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11.5,
                color: '#2EB872',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              Ciekawostki o sygnałach
            </span>
          </div>
          <div
            style={{
              marginTop: 20,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 16,
            }}
          >
            {SIGNAL_FACTS.map((fact) => (
              <div
                key={fact.label}
                style={{
                  padding: '18px',
                  background: 'rgba(5, 5, 7, 0.55)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 15,
                    fontWeight: 500,
                    color: '#E0E0E0',
                    margin: 0,
                  }}
                >
                  {fact.label}
                </h3>
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12.5,
                    color: '#8A8A93',
                    marginTop: 10,
                    lineHeight: 1.6,
                  }}
                >
                  {fact.value}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}