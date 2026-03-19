'use client';

import { useRef, useState, useCallback } from 'react';

/**
 * MagicCard
 * Two-layer magic effect:
 *   1. Border glow — outer wrapper uses p-[1.5px] + gradient bg as a "border";
 *      a radial overlay follows the cursor to light up the border near the mouse.
 *   2. Inner fill — a soft radial gradient follows the cursor inside the card.
 *
 * Props:
 *   gradientColor    — inner fill gradient color (default: '#D9D9D955')
 *   borderGlowColor  — border highlight color on hover (default: '#6BB6E8')
 *   gradientSize     — radius in px for both gradients (default: 200)
 *   className        — extra classes on the outer border wrapper (shadow, etc.)
 *   children         — card content
 */
export default function MagicCard({
  gradientColor = '#D9D9D955',
  borderGlowColor = '#6BB6E8',
  gradientSize = 200,
  className = '',
  children,
}) {
  const outerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!outerRef.current) return;
    const rect = outerRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setMousePos({ x: -500, y: -500 });
  }, []);

  return (
    /* Outer wrapper — 1.5px padding creates the "border" gap */
    <div
      ref={outerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl p-[1.5px] bg-slate-200 h-full ${className}`}
    >
      {/* Border glow overlay — radial gradient that follows cursor */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(${gradientSize * 1.5}px circle at ${mousePos.x}px ${mousePos.y}px, ${borderGlowColor}, ${borderGlowColor}55 40%, transparent 70%)`,
        }}
      />

      {/* Inner card — solid bg covers the outer gradient except for the 1.5px border gap */}
      <div className="relative rounded-[22px] overflow-hidden bg-white/70 backdrop-blur-md h-full">
        {/* Inner fill gradient overlay — follows cursor */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(${gradientSize}px circle at ${mousePos.x}px ${mousePos.y}px, ${gradientColor}, transparent 100%)`,
          }}
        />
        {/* Content */}
        <div className="relative z-10 h-full">{children}</div>
      </div>
    </div>
  );
}
