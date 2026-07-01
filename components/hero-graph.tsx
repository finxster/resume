"use client";

// Animated "dependency graph" background field for the hero (design option 1d).
// Monochrome, cursor-reactive nodes + proximity edges that brighten near the
// pointer. Ported from the design handoff reference; motion constants and
// interaction radii are final and reproduced exactly.
//
// Sits as an absolute bottom layer inside the hero (which is position:relative).
// The canvas itself is pointer-events:none so the hero buttons stay clickable —
// mouse tracking is attached to the parent element and mapped to canvas coords.

import { useEffect, useRef } from "react";

const BASE_NODE_COUNT = 46; // tuned for an ~880×560 canvas; scaled by area below
const MAX_NODE_COUNT = 120; // guard rail on very large screens
const LINK_DIST = 130; // px: max distance to draw an edge
const HOT_DIST = 120; // px: cursor interaction radius
const SPEED = 0.25; // px/frame drift velocity range (±)
const INK = "20,20,22"; // #141416 as "r,g,b" for rgba()

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function HeroGraph({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const host = canvas.parentElement ?? canvas;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;
    const mouse = { x: -9999, y: -9999 };
    const nodes: Node[] = [];

    function seed() {
      nodes.length = 0;
      const target = Math.min(
        MAX_NODE_COUNT,
        Math.max(12, Math.round((BASE_NODE_COUNT * (w * h)) / (880 * 560)))
      );
      for (let i = 0; i < target; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 2 * SPEED,
          vy: (Math.random() - 0.5) * 2 * SPEED,
        });
      }
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed(); // re-seed so density matches the new area
    }

    function frame() {
      ctx!.clearRect(0, 0, w, h);

      // advance + bounce
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }

      // edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d >= LINK_DIST) continue;
          const near = Math.min(
            Math.hypot(a.x - mouse.x, a.y - mouse.y),
            Math.hypot(b.x - mouse.x, b.y - mouse.y)
          );
          const hot = near < HOT_DIST ? 1 - near / HOT_DIST : 0;
          ctx!.strokeStyle = `rgba(${INK},${(1 - d / LINK_DIST) * (0.12 + hot * 0.55)})`;
          ctx!.lineWidth = 0.8 + hot * 0.8;
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(b.x, b.y);
          ctx!.stroke();
        }
      }

      // nodes
      for (const n of nodes) {
        const near = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        const hot = near < HOT_DIST ? 1 - near / HOT_DIST : 0;
        ctx!.beginPath();
        ctx!.fillStyle = `rgba(${INK},${0.35 + hot * 0.55})`;
        ctx!.arc(n.x, n.y, 1.6 + hot * 2.4, 0, Math.PI * 2);
        ctx!.fill();
      }

      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (running || reduce) return;
      running = true;
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    function onMove(e: MouseEvent) {
      const r = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    }
    function onLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    resize();
    frame(); // draw one frame immediately (also the only frame under reduced-motion)
    if (reduce) cancelAnimationFrame(raf); // frame() queued a rAF; cancel it

    window.addEventListener("resize", resize);
    host.addEventListener("mousemove", onMove as EventListener);
    host.addEventListener("mouseleave", onLeave);

    // Pause the loop when the hero scrolls offscreen.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else stop();
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("resize", resize);
      host.removeEventListener("mousemove", onMove as EventListener);
      host.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}
