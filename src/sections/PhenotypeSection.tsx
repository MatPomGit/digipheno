import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DataCellMorph from '../components/effects/DataCellMorph';
import { Microscope, BookOpen, FlaskConical, BrainCircuit, ShieldCheck, Clock3 } from 'lucide-react';

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
      'Affective Computing — dziedzina łącząca informatykę, psychologię i kognitywistykę — dostarcza algorytmów rozpoznawania emocji z mowy, tekstu i ekspresji twarzy. W kontekście fenotypowania cyfrowego, analiza prozodii głosu (zmiany częstotliwości podstawowej F0, zakres melodyczny, energia sygnału) pozwala wnioskować o stanie nastrojowym. Schuller & Schuller (2020) wykazali, że cechy głosu mogą predykować symptomy depresji z istotną precyzją statystyczną.',
  },
  {
    icon: FlaskConical,
    title: 'Biomarker HRV',
    content:
      'Heart Rate Variability (zmienność rytmu serca) to kluczowy biomarker cyfrowy w psychiatrii. Zmniejszona HRV odzwierciedla zmniejszoną aktywność układu nerwowego parasympatycznego i wiąże się z depresją, lękiem oraz zaburzeniami stresu pourazowego. Wearables (Apple Watch, Fitbit, Garmin) umożliwiają ciągły pomiar HRV w naturalnym środowisku pacjenta, eliminując efekt laboratorium.',
  },
  {
    icon: BrainCircuit,
    title: 'Modele osobiste zamiast populacyjnych',
    content:
      'Coraz częściej odchodzi się od jednego progu alarmowego dla wszystkich. Lepsze wyniki daje uczenie bazowej rutyny konkretnej osoby, a następnie wykrywanie zmian: krótszego snu, mniejszej mobilności, innego tonu głosu lub nagłego wzrostu nocnej aktywności telefonu.',
  },
  {
    icon: ShieldCheck,
    title: 'Prywatność jako element metody',
    content:
      'Nowoczesne projekty zakładają minimalizację danych: przechowywanie cech pochodnych zamiast surowych nagrań, pseudonimizację identyfikatorów, szyfrowanie transmisji i jasną zgodę uczestnika. Bez zaufania użytkownika nawet najlepszy model traci wartość kliniczną.',
  },
];

const TIMELINE_STEPS = [
  {
    year: '2015',
    title: 'Smartfon jako sensor kliniczny',
    text: 'Badania nad mobilnością i nastrojem pokazały, że wzorce GPS mogą uzupełniać klasyczne kwestionariusze depresji.',
  },
  {
    year: '2016',
    title: 'Definicja fenotypowania cyfrowego',
    text: 'Torous i współautorzy opisali pomiar fenotypu człowieka „moment po momencie” za pomocą urządzeń osobistych.',
  },
  {
    year: '2020+',
    title: 'Przejście do modeli ciągłych',
    text: 'Nacisk przesuwa się z pojedynczej diagnozy na monitoring trajektorii: ryzyka nawrotu, regeneracji i reakcji na leczenie.',
  },
];

const ETHICAL_RULES = [
  'Zbieraj tylko dane potrzebne do konkretnego pytania klinicznego lub badawczego.',
  'Pokazuj użytkownikowi, jakie sygnały są mierzone i jak długo będą przechowywane.',
  'Oddzielaj alerty wspierające decyzję od automatycznej diagnozy — człowiek pozostaje w pętli.',
  'Projektuj systemy tak, aby przerwa w noszeniu urządzenia nie była interpretowana automatycznie jako pogorszenie stanu.',
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
              fontSize: '0.8125rem',
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
              fontSize: 14.5,
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
                fontSize: 11.5,
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
                fontSize: 13.5,
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
                fontSize: 11.5,
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
                        fontSize: 16,
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
                      fontSize: 12.5,
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

          <div
            style={{
              marginTop: 44,
              padding: '24px',
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(18, 18, 26, 0.72)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Clock3 size={18} color="#00E5FF" strokeWidth={1.5} />
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11.5,
                  color: '#00E5FF',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
              >
                Krótka oś rozwoju
              </span>
            </div>
            <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {TIMELINE_STEPS.map((step) => (
                <div
                  key={step.year}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '72px 1fr',
                    gap: 16,
                    paddingBottom: 14,
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: 14.5,
                      color: '#2EB872',
                    }}
                  >
                    {step.year}
                  </span>
                  <div>
                    <h3
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 15,
                        fontWeight: 500,
                        color: '#E0E0E0',
                        margin: 0,
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 12.5,
                        color: '#8A8A93',
                        marginTop: 6,
                        lineHeight: 1.6,
                      }}
                    >
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional content below grid */}
          <div style={{ marginTop: 48 }}>
            <h3
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 24,
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
                      fontSize: 14.5,
                      fontWeight: 500,
                      color: '#2EB872',
                    }}
                  >
                    {item.label}
                  </span>
                  <p
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 12.5,
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
                  fontSize: 11.5,
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
                      fontSize: 12.5,
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

            <div
              style={{
                marginTop: 32,
                padding: '28px',
                border: '1px solid rgba(46, 184, 114, 0.18)',
                background: 'rgba(46, 184, 114, 0.04)',
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11.5,
                  color: '#2EB872',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
              >
                Etyka projektowania
              </span>
              <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {ETHICAL_RULES.map((rule, idx) => (
                  <p
                    key={rule}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 12.5,
                      color: '#8A8A93',
                      lineHeight: 1.6,
                    }}
                  >
                    <span style={{ color: '#2EB872', marginRight: 8 }}>{String(idx + 1).padStart(2, '0')}</span>
                    {rule}
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