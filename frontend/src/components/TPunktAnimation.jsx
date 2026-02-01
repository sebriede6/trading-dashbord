import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

// Hilfsfunktion: Punkte für ein "T" generieren (Pixel-Matrix)
function getTPoints(width, height, count = 1200) {
  // "T" als Pixelmaske: Oben Balken, unten Mittelstrich
  const points = [];
  const barY = Math.round(height * 0.25);
  const barH = Math.round(height * 0.13);
  const barW = Math.round(width * 0.7);
  const barX = Math.round((width - barW) / 2);
  const stemW = Math.round(width * 0.18);
  const stemH = Math.round(height * 0.7); // länger!
  const stemX = Math.round((width - stemW) / 2);
  const stemY = barY + barH;
  // Parameter für den Splitter (abgespaltener Teil)
  const splitterW = Math.round(barW * 0.13);
  const splitterH = Math.round(barH * 0.7);
  const splitterCount = Math.round(count * 0.025); // ca. 2-3% der Punkte für den Splitter
  const splitterOffsetX = -Math.round(barW * 0.09); // nach links oben abgesetzt
  const splitterOffsetY = -Math.round(barH * 0.45);
  // 1. Splitter: kompakte, schräg versetzte Gruppe gelber Punkte
  for (let i = 0; i < splitterCount; ++i) {
    // Schräge, organische Form
    const fx = Math.pow(Math.random(), 1.2);
    const fy = Math.random() * (1 - fx * 0.6);
    const x = barX + splitterOffsetX + fx * splitterW + Math.random() * 1.2;
    const y = barY + splitterOffsetY + fy * splitterH + Math.random() * 1.2;
    points.push({ x, y, isSplitter: true });
  }
  // 2. Restliche Punkte
  while (points.length < count) {
    if (Math.random() < 0.5) {
      // Balken oben, aber Lücke für Splitter lassen
      const x = barX + Math.random() * barW;
      const y = barY + Math.random() * barH;
      // Lücke für Splitter
      if (!(x < barX + splitterW + 4 && y < barY + splitterH + 4 && (y - barY) < (splitterH - (x - barX) * (splitterH / splitterW)) + 4)) {
        points.push({ x, y, isSplitter: false });
      }
    } else {
      // Mittelstrich
      const x = stemX + Math.random() * stemW;
      const y = stemY + Math.random() * stemH;
      points.push({ x, y, isSplitter: false });
    }
  }
  return points;
}

export default function TPunktAnimation({ width = 320, height = 320, style }) {
  const canvasRef = useRef(null);
  const pointsRef = useRef([]);
  const animRef = useRef();
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = width;
    canvas.height = height;
    // Zielpunkte für "T"
    const targetPoints = getTPoints(width, height, 7000);
    pointsRef.current = targetPoints.map(pt => {
      // Startposition: zufällig am Rand
      const angle = Math.random() * Math.PI * 2;
      const r = Math.max(width, height) * (0.7 + Math.random() * 0.5);
      return {
        tx: pt.x,
        ty: pt.y,
        x: width / 2 + Math.cos(angle) * r,
        y: height / 2 + Math.sin(angle) * r,
        progress: 0,
        speed: 0.002 + Math.random() * 0.004,
        phase: Math.random() * Math.PI * 2,
      };
    });
    let t = 0;
    function easeOutCubic(x) {
      return 1 - Math.pow(1 - x, 3);
    }
    function animate() {
      t += 1;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, width, height);
      // Gesamtes T wabert: translate und rotate
      let wobbleX = Math.sin(t * 0.012) * 8;
      let wobbleY = Math.cos(t * 0.014) * 8;
      let wobbleR = Math.sin(t * 0.009) * 0.04;
      ctx.save();
      ctx.translate(width / 2 + wobbleX, height / 2 + wobbleY);
      ctx.rotate(wobbleR);
      ctx.translate(-width / 2, -height / 2);
      for (const p of pointsRef.current) {
        if (!p.arrived) {
          // Flug zur Zielposition mit Ease-Out
          p.progress += p.speed;
          if (p.progress > 1) p.progress = 1;
          const ease = easeOutCubic(p.progress);
          p.x += (p.tx - p.x) * ease * 0.08;
          p.y += (p.ty - p.y) * ease * 0.08;
          // Wenn sehr nah am Ziel, auf Wabern umschalten
          if (Math.abs(p.x - p.tx) < 0.7 && Math.abs(p.y - p.ty) < 0.7 && p.progress >= 1) {
            p.arrived = true;
            p.x = p.tx;
            p.y = p.ty;
          }
        } else {
          // Einzelpunkte wabern
          const amp = 1.2;
          p.x = p.tx + Math.sin(t * 0.018 + p.phase) * amp;
          p.y = p.ty + Math.cos(t * 0.021 + p.phase) * amp;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, 0.28, 0, 2 * Math.PI);
        // Farbverlauf von oben (gelb/orange) nach unten (türkis)
        // y=0...height: oben gelb/orange, unten türkis
        let colorArr;
        if (p.isSplitter) {
          colorArr = [255, 180, 0]; // noch leuchtenderes Gelb-Orange für Splitter
        } else {
          // Intensivere Farben für den Verlauf
          const topColor = [255, 200, 0];   // kräftiges Gelb
          const midColor = [0, 255, 220];   // leuchtendes Türkis
          const botColor = [0, 120, 255];   // kräftiges Blau
          let tNorm = Math.max(0, Math.min(1, p.ty / height));
          if (tNorm < 0.5) {
            // Interpoliere von gelb zu türkis
            const f = tNorm / 0.5;
            colorArr = [
              Math.round(topColor[0] + (midColor[0] - topColor[0]) * f),
              Math.round(topColor[1] + (midColor[1] - topColor[1]) * f),
              Math.round(topColor[2] + (midColor[2] - topColor[2]) * f)
            ];
          } else {
            // Interpoliere von türkis zu blau
            const f = (tNorm - 0.5) / 0.5;
            colorArr = [
              Math.round(midColor[0] + (botColor[0] - midColor[0]) * f),
              Math.round(midColor[1] + (botColor[1] - midColor[1]) * f),
              Math.round(midColor[2] + (botColor[2] - midColor[2]) * f)
            ];
          }
        }
        ctx.fillStyle = `rgb(${colorArr[0]},${colorArr[1]},${colorArr[2]})`;
        ctx.globalAlpha = 0.85;
        ctx.fill();
      }
      ctx.restore();
      animRef.current = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(animRef.current);
  }, [width, height]);
  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ display: 'block', margin: '0 auto', ...style }}
      aria-label="Animiertes T aus Punkten"
    />
  );
}

TPunktAnimation.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  style: PropTypes.object,
};
