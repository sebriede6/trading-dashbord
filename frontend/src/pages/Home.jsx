


import React, { useEffect, useRef } from 'react';
import andromedaImg from '../assets/andromeda.jpg';
import { motion } from 'framer-motion';
import '../galaxy-bg.css';
import '../galaxy-photo-bg.css';

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const floatIn = (dir = 'up') => {
  const variants = {
    hidden: { opacity: 0, y: 0, x: 0, scale: 0.96 },
    show: { opacity: 1, y: 0, x: 0, scale: 1, transition: { type: 'spring', stiffness: 60, damping: 16 } },
  };
  if (dir === 'up') variants.hidden.y = 60;
  if (dir === 'down') variants.hidden.y = -60;
  if (dir === 'left') variants.hidden.x = 60;
  if (dir === 'right') variants.hidden.x = -60;
  return variants;
};


export default function Home() {
  // Canvas-Ref für animierte Sterne
  const starsRef = useRef(null);
  useEffect(() => {
    const canvas = starsRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    // Star-Objekte
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.2 + 0.3,
      o: Math.random() * 0.5 + 0.5,
      s: Math.random() * 0.2 + 0.05,
      tw: Math.random() * Math.PI * 2,
    }));
    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (const star of stars) {
        ctx.save();
        ctx.globalAlpha = star.o * (0.7 + 0.3 * Math.sin(star.tw));
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
        ctx.fillStyle = '#fff';
        ctx.shadowColor = '#fff';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
        // Bewegung und Twinkle
        star.y += star.s;
        if (star.y > h) star.y = 0;
        star.tw += 0.02 + Math.random() * 0.01;
      }
      animationId = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={container}
      className="relative flex flex-col items-center justify-center min-h-[80vh] md:min-h-screen overflow-hidden px-2 md:px-0 bg-black dark:bg-black"
    >
      {/* Galaxy/Universe Background */}
      <div className="galaxy-bg">
        <div className="galaxy-photo-bg" style={{ backgroundImage: `url(${andromedaImg})` }} />
        <canvas ref={starsRef} className="galaxy-stars" />
        <div className="galaxy-gradient" />
        <div className="galaxy-nebula" />
        <div className="galaxy-glow" />
      </div>



      {/* Hero Section with assembling animation */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-2 md:px-4 py-16 md:py-24 w-full max-w-4xl"
        variants={container}
      >
        <motion.div
          className="mb-6 md:mb-8"
          variants={floatIn('up')}
          transition={{ duration: 0.8, type: 'spring', stiffness: 80 }}
        >
          {/* Elegantes Galaxie-Icon (SVG) */}
          <svg width="92" height="92" viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto drop-shadow-2xl">
            <ellipse cx="46" cy="46" rx="38" ry="16" fill="url(#g1)" opacity="0.7"/>
            <ellipse cx="46" cy="46" rx="28" ry="8" fill="url(#g2)" opacity="0.5"/>
            <ellipse cx="46" cy="46" rx="12" ry="4" fill="url(#g3)" opacity="0.7"/>
            <circle cx="46" cy="46" r="6" fill="#fff" fillOpacity="0.95"/>
            <circle cx="66" cy="40" r="1.5" fill="#fbbf24"/>
            <circle cx="32" cy="52" r="1.2" fill="#60a5fa"/>
            <circle cx="56" cy="60" r="1" fill="#f472b6"/>
            <defs>
              <radialGradient id="g1" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5" gradientTransform="matrix(1 0 0 0.42 0 0.29)">
                <stop stopColor="#fff" stopOpacity="0.7"/>
                <stop offset="0.3" stopColor="#60a5fa" stopOpacity="0.5"/>
                <stop offset="0.7" stopColor="#0ea5e9" stopOpacity="0.3"/>
                <stop offset="1" stopColor="#020617" stopOpacity="0.1"/>
              </radialGradient>
              <radialGradient id="g2" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5" gradientTransform="matrix(1 0 0 0.28 0 0.36)">
                <stop stopColor="#fbbf24" stopOpacity="0.7"/>
                <stop offset="0.7" stopColor="#0ea5e9" stopOpacity="0.2"/>
                <stop offset="1" stopColor="#020617" stopOpacity="0.05"/>
              </radialGradient>
              <radialGradient id="g3" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5" gradientTransform="matrix(1 0 0 0.33 0 0.34)">
                <stop stopColor="#fff" stopOpacity="0.9"/>
                <stop offset="1" stopColor="#60a5fa" stopOpacity="0.1"/>
              </radialGradient>
            </defs>
          </svg>
        </motion.div>
        <motion.h1
          className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-4 md:mb-6 leading-tight drop-shadow-lg"
          variants={floatIn('left')}
        >
          Organisiere{' '}
          <span className="bg-linear-to-r from-blue-400 via-blue-700 to-gray-300 bg-clip-text text-transparent font-extrabold">dein Leben</span>
          <br className="hidden md:block" />
          mit Stil
        </motion.h1>
        <motion.p
          className="text-base xs:text-lg md:text-2xl text-gray-200 max-w-2xl mb-6 md:mb-10"
          variants={floatIn('right')}
        >
          Die moderne Todo-App – minimalistisch, augenfreundlich, inspirierend. Fokus auf das Wesentliche, mit zarten Effekten und hochwertigem Design.
        </motion.p>
        <motion.a
          href="/todos"
          className="inline-block px-6 md:px-8 py-3 md:py-4 rounded-full bg-linear-to-r from-blue-500 to-purple-500 text-white text-base md:text-lg font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
          variants={floatIn('down')}
          whileHover={{ scale: 1.07 }}
        >
          Starte jetzt
        </motion.a>
      </motion.div>

      {/* No more floating shapes, replaced by galaxy bg */}
    </motion.section>
  );
}
