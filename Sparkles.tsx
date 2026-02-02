import React, { useEffect, useRef } from 'react';

// GOVERNANCE: Visual Flourish
// Adds depth to the "Cinematic" design pillar without overwhelming the content.
// Pure Canvas implementation for high performance (optimizing expensive layout operations).

export const Sparkles: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Array<{ x: number; y: number; size: number; speedY: number; opacity: number }> = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const count = Math.floor(window.innerWidth / 15); // Density based on width
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2,
          speedY: Math.random() * 0.5 + 0.1,
          opacity: Math.random() * 0.5 + 0.1
        });
      }
    };

    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.y -= p.speedY;
        if (p.y < 0) p.y = canvas.height;

        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    createParticles();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className={`absolute inset-0 pointer-events-none opacity-30 ${className}`} />;
};