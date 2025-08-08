'use client';
import { useEffect, useRef } from 'react';

// Lightweight animated, theme-aware data-network background
export default function BackgroundViz() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);
    let raf = 0;

    const onResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    const onVisibility = () => {
      if (document.hidden && animationRef.current) cancelAnimationFrame(animationRef.current);
      else animate();
    };
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);

    const NODE_COUNT = Math.max(22, Math.floor((width * height) / 45000));
    const nodes: Array<{ x: number; y: number; vx: number; vy: number }> = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
    }));

    // moving data packets traveling along nearest-neighbour edges
    type Packet = { from: number; to: number; t: number; speed: number };
    const PACKET_COUNT = 10;
    const packets: Packet[] = [];
    const pickNeighbour = (i: number): number => {
      let best = -1, bestD2 = Number.POSITIVE_INFINITY;
      for (let j = 0; j < nodes.length; j++) if (j !== i) {
        const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
        const d2 = dx * dx + dy * dy;
        if (d2 < bestD2) { bestD2 = d2; best = j; }
      }
      return best === -1 ? (i + 1) % nodes.length : best;
    };
    for (let k = 0; k < PACKET_COUNT; k++) {
      const f = Math.floor(Math.random() * nodes.length);
      packets.push({ from: f, to: pickNeighbour(f), t: Math.random(), speed: 0.004 + Math.random() * 0.006 });
    }

    function toRGBList(value: string): string {
      // Convert "r g b" => "r, g, b"
      return value.trim().split(/\s+/).join(', ');
    }

    function animate() {
      const cs = getComputedStyle(document.documentElement);
      const accent = toRGBList(cs.getPropertyValue('--accent'));
      const accentDark = toRGBList(cs.getPropertyValue('--accent-dark') || cs.getPropertyValue('--accent'));
      const line = `rgba(${accent},0.18)`; // lighter lines
      const dot = `rgba(${accent},0.40)`; // brighter nodes
      const packet = `rgba(${accentDark},0.8)`;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';
      // draw connections
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = width + 20; else if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20; else if (n.y > height + 20) n.y = -20;
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x, dy = n.y - m.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 150 * 150) {
            const g = ctx.createLinearGradient(n.x, n.y, m.x, m.y);
            g.addColorStop(0, line);
            g.addColorStop(1, `rgba(${accentDark},0.22)`);
            ctx.strokeStyle = g;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();
          }
        }
      }
      // draw nodes
      for (const n of nodes) {
        // subtle glow
        const rg = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 10);
        rg.addColorStop(0, dot);
        rg.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = rg;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // animate packets along edges to emphasize "data flow"
      for (const p of packets) {
        p.t += p.speed;
        if (p.t >= 1) {
          p.from = p.to;
          p.to = pickNeighbour(p.from);
          p.t = 0;
        }
        const a = nodes[p.from], b = nodes[p.to];
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        ctx.fillStyle = packet;
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
      animationRef.current = requestAnimationFrame(animate);
    }

    animate();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden rounded-3xl">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}

