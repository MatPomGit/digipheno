import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DataCellMorph from '../components/effects/DataCellMorph';
import { Microscope, BookOpen, FlaskConical } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SCIENTIFIC_POINTS = [
  {
    icon: Microscope,
    title: 'Metodologia Onnela & Torous',
    content:
      'Platforma Beiwe, opracowana przez Jukka-Pekka Onnelę i Johna Torousa z Harvard Medical School, to jedno z najważniejszych narzędzi w fenotypowaniu cyfrowym. Umożliwia zbieranie danych pasywnych (GPS, akcelerometr, dzienniki połączeń, użycie ekranu) oraz aktywnych (kwestionariusze, próbki głosu) w sposób ciągły przez miesiące. W badaniu pilotażowym na 17 pacjentach ze schizofrenią wykazano, że anomalia w danych behawioralnych może poprzedzać nawrót choroby z wyprzedzeniem umożliwiającym interwencję.',
  },
  {
    icon: BookOpen,
    title: 'Informatyka Afektywna',
    content:
      'Affective Computing — dziedzina łącząca informatykę, psychologię i kognitywistykę — dostarcza algorytmów rozpoznawania emocji z mowy, tekstu i ekspresji twarzy. W kontekście fenotypowania cyfrowego, analiza prozodii głosu (zmiany częstotliwości podstawowej F0, zakres melodiczy, energia sygnału) pozwala wnioskować o stanie nastrojowym. Schuller & Schuller (2020) wykazali, że cechy głosu mogą predykować symptomy depresji z istotną precyzją statystyczną.',
  },
  {
    icon: FlaskConical,
    title: 'Biomarker HRV',
    content:
      'Heart Rate Variability (zmienność rytmu serca) to kluczowy biomarker cyfrowy w psychiatrii. Zmniejszona HRV odzwierciedla zmniejszoną aktywność układu nerwowego parasympatycznego i wiąże się z depresją, lękiem oraz zaburzeniami stresu pourazowego. Wearables (Apple Watch, Fitbit, Garmin) umożliwiają ciągły pomiar HRV w naturalnym środowisku pacjenta, eliminując efekt laboratorium.',
  },
];

export default function PhenotypeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const text = textRef.current;
    if (text) {
      gsap.from(text, {
        x: -40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: text,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }

    pointsRef.current.forEach((point) => {
      if (!point) return;
      gsap.from(point, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: point,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      id="phenotype"
      ref={sectionRef}
      style={{
        position: 'relative',
        zIndex: 10,
        minHeight: '200vh',
        paddingTop: 'clamp(80px, 12vh, 160px)',
        paddingBottom: 'clamp(80px, 12vh, 160px)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
          display: 'grid',
          gridTemplateColumns: 'minmax(300px, 1fr) minmax(400px, 1.5fr)',
          gap: 80,
        }}
      >
        {/* Left: Sticky text */}
        <div ref={textRef} style={{ position: 'sticky', top: 120, alignSelf: 'start' }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: '#2EB872',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            [03] The Phenotype
          </span>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(32px, 4vw, 56px)',
              fontWeight: 700,
              color: '#E0E0E0',
              marginTop: 16,
              lineHeight: 1.1,
            }}
          >
            The Digital
            <br />
            <span style={{ color: '#2EB872' }}>Mirror</span>
          </h2>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              color: '#8A8A93',
              marginTop: 24,
              lineHeight: 1.8,
              maxWidth: 400,
            }}
          >
            Twoje urządzenie wie, kiedy śpisz, gdzie chodzisz i jak mówisz. 
            Kwantyfikując te strumienie, konstruujemy wysokorozdzielczą mapę 
            czasową stanów psychicznych — obiektywną, ciągłą i pozbawioną 
            błędu wspomnienia.
          </p>

          <div
            style={{
              marginTop: 40,
              padding: '20px',
              border: '1px solid rgba(46, 184, 114, 0.2)',
              background: 'rgba(46, 184, 114, 0.05)',
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                color: '#2EB872',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              Definicja naukowa
            </span>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: '#E0E0E0',
                marginTop: 8,
                lineHeight: 1.7,
                fontStyle: 'italic',
              }}
            >
              "Digital phenotyping is the moment-by-moment quantification of 
              the individual-level human phenotype in situ using data from 
              smartphones and other personal digital devices."
            </p>
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 10,
                color: '#8A8A93',
                marginTop: 8,
                display: 'block',
              }}
            >
              — Torous et al., 2016
            </span>
          </div>

          {/* Scientific deep-dive points */}
          <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 24 }}>
            {SCIENTIFIC_POINTS.map((point, idx) => {
              const Icon = point.icon;
              return (
                <div
                  key={idx}
                  ref={(el) => { pointsRef.current[idx] = el; }}
                  style={{
                    padding: '20px 0',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Icon size={16} color="#2EB872" strokeWidth={1.5} />
                    <span
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 14,
                        fontWeight: 500,
                        color: '#E0E0E0',
                      }}
                    >
                      {point.title}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11,
                      color: '#8A8A93',
                      marginTop: 8,
                      lineHeight: 1.7,
                    }}
                  >
                    {point.content}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Data cell grid */}
        <div>
          <DataCellMorph />

          {/* Additional content below grid */}
          <div style={{ marginTop: 48 }}>
            <h3
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 22,
                fontWeight: 500,
                color: '#E0E0E0',
                marginBottom: 16,
              }}
            >
              Zastosowania kliniczne
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                {
                  label: 'Depresja',
                  desc: 'Wzorce mobilności (redukcja odległości podróży, czas spędzony w domu) korelują z nasileniem symptomów depresji. Saeb et al. (2015) wykazali istotną korelację między wzorami GPS a wynikami PHQ-9.',
                },
                {
                  label: 'Choroba afektywna dwubiegunowa',
                  desc: 'Zmiany w czasie użycia ekranu, wzorach snu i aktywności socjalnej mogą poprzedzać epizody manii lub depresji. Systemy wczesnego ostrzegania oparte na teorii systemów dynamicznych wykrywają zbliżające się epizody.',
                },
                {
                  label: 'Schizofrenia',
                  desc: 'Analiza anomalii w danych behawioralnych (zmniejszona socjalizacja, nieregularny sen) może predykować nawrót z wyprzedzeniem umożliwiającym interwencję farmakologiczną.',
                },
                {
                  label: 'Zaburzenia lękowe',
                  desc: 'HRV, wzorce mobilności i częstotliwość interakcji społecznych dostarczają obiektywnych markerów nasilenia lęku, uzupełniając subiektywne raporty pacjenta.',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '16px 20px',
                    background: '#12121A',
                    borderLeft: '2px solid #2EB872',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 13,
                      fontWeight: 500,
                      color: '#2EB872',
                    }}
                  >
                    {item.label}
                  </span>
                  <p
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11,
                      color: '#8A8A93',
                      marginTop: 6,
                      lineHeight: 1.6,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Technical deep dive for specialists */}
            <div
              style={{
                marginTop: 48,
                padding: '28px',
                border: '1px solid rgba(0, 229, 255, 0.15)',
                background: 'rgba(0, 229, 255, 0.03)',
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: '#00E5FF',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
              >
                Dla specjalistów — Wyzwania metodologiczne
              </span>
              <div
                style={{
                  marginTop: 16,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                {[
                  'Brak standaryzacji częstotliwości próbkowania sensorów między studiami utrudnia replikację.',
                  'Battery drain: ciągłe zbieranie danych z GPS i akcelerometru zwiększa zużycie baterii 3-4x.',
                  'Class imbalance w danych klinicznych wymaga zastosowania technik resamplingu lub ważonych funkcji straty.',
                  'Black box problem: modele LSTM i Random Forest osiągają balanced accuracy 58-73%, ale ich interpretowalność pozostaje ograniczona.',
                  'Prywatność: 81% aplikacji zdrowia psychicznego wysyła dane do Facebooka lub Google.',
                ].map((point, idx) => (
                  <p
                    key={idx}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11,
                      color: '#8A8A93',
                      lineHeight: 1.6,
                    }}
                  >
                    <span style={{ color: '#00E5FF', marginRight: 8 }}>→</span>
                    {point}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}