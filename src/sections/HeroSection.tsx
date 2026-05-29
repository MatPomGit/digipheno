import BiometricTypingCanvas from '../components/effects/BiometricTypingCanvas';

export default function HeroSection() {
  return (
    <section id="sensorium" style={{ position: 'relative', zIndex: 10 }}>
      <BiometricTypingCanvas />
    </section>
  );
}