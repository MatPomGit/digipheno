import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.data-cell') ||
        target.classList.contains('data-cell')
      ) {
        isHoveringRef.current = true;
      }
    };

    const handleMouseOut = () => {
      isHoveringRef.current = false;
    };

    function animate() {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.15;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.15;

      if (cursor) {
        const size = isHoveringRef.current ? 32 : 6;
        cursor.style.transform = `translate(${posRef.current.x - size / 2}px, ${posRef.current.y - size / 2}px)`;
        cursor.style.width = `${size}px`;
        cursor.style.height = `${size}px`;
        cursor.style.borderRadius = isHoveringRef.current ? '0%' : '50%';
        cursor.style.border = isHoveringRef.current ? '1px solid #2EB872' : 'none';
        cursor.style.backgroundColor = isHoveringRef.current ? 'transparent' : '#2EB872';
      }

      rafRef.current = requestAnimationFrame(animate);
    }

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 6,
        height: 6,
        backgroundColor: '#2EB872',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        transition: 'width 0.3s, height 0.3s, border-radius 0.3s, background-color 0.3s, border 0.3s',
        mixBlendMode: 'difference',
      }}
    />
  );
}