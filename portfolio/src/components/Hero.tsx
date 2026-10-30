"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const W = ["Full-Stack Engineer", "Next.js Developer", "AI App Builder", "Problem Solver"];
const S: [number, string, string][] = [[100, "+", "Projects built"], [60, "+", "Live on Vercel"], [4, "", "AI degree semesters done"]];

export default function Hero() {
  const cv = useRef<HTMLCanvasElement>(null);
  const root = useRef<HTMLElement>(null);
  const [role, setRole] = useState(W[0]);
  const [n, setN] = useState([0, 0, 0]);

  useEffect(() => {
    const R = matchMedia("(prefers-reduced-motion:reduce)").matches;
    const timers: ReturnType<typeof setInterval>[] = [];
    if (R) setN(S.map((s) => s[0]));
    else {
      const t = setInterval(() => setN((p) => p.map((v, i) => Math.min(v + Math.ceil(S[i][0] / 45), S[i][0]))), 35);
      timers.push(t); setTimeout(() => clearInterval(t), 2200);
      let w = 0, c = W[0].length, ph = 1, hold = 20;
      timers.push(setInterval(() => {
        if (hold > 0) { hold--; return; }
        if (ph) { c--; if (c < 0) { ph = 0; w = (w + 1) % W.length; c = 0; } }
        else { c++; if (c >= W[w].length) { ph = 1; hold = 20; } }
        setRole(W[w].slice(0, Math.max(c, 0)));
      }, 70));
    }
    const cleanups: (() => void)[] = [];
    if (!R) root.current?.querySelectorAll<HTMLElement>(".mg").forEach((b) => {
      const mv = (e: PointerEvent) => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.2}px,${(e.clientY - r.top - r.height / 2) * 0.3}px)`; };
      const lv = () => { b.style.transform = ""; };
      b.addEventListener("pointermove", mv); b.addEventListener("pointerleave", lv);
      cleanups.push(() => { b.removeEventListener("pointermove", mv); b.removeEventListener("pointerleave", lv); });
    });
    // particle network
    const canvas = cv.current!, x = canvas.getContext("2d")!;
    let pts: { x: number; y: number; vx: number; vy: number }[] = [], mx = -999, my = -999, cw = 0, ch = 0, raf = 0;
    const rs = () => {
      const d = devicePixelRatio || 1; cw = canvas.clientWidth; ch = canvas.clientHeight;
      canvas.width = cw * d; canvas.height = ch * d; x.setTransform(d, 0, 0, d, 0, 0);
      pts = Array.from({ length: Math.min(70, (cw / 16) | 0) }, () => ({ x: Math.random() * cw, y: Math.random() * ch, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4 }));
    };
    const dr = () => {
      x.clearRect(0, 0, cw, ch);
      const col = getComputedStyle(document.documentElement).getPropertyValue("--a2").trim() || "#22d3ee";
      x.fillStyle = col; x.strokeStyle = col;
      pts.forEach((p, i) => {
        if (!R) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > cw) p.vx *= -1; if (p.y < 0 || p.y > ch) p.vy *= -1; }
        x.globalAlpha = 0.7; x.beginPath(); x.arc(p.x, p.y, 1.6, 0, 7); x.fill();
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j], dd = Math.hypot(p.x - q.x, p.y - q.y);
          if (dd < 120) { x.globalAlpha = (1 - dd / 120) * 0.25; x.beginPath(); x.moveTo(p.x, p.y); x.lineTo(q.x, q.y); x.stroke(); }
        }
        const dm = Math.hypot(p.x - mx, p.y - my);
        if (dm < 160) { x.globalAlpha = (1 - dm / 160) * 0.6; x.beginPath(); x.moveTo(p.x, p.y); x.lineTo(mx, my); x.stroke(); }
      });
      if (!R) raf = requestAnimationFrame(dr);
    };
    const pm = (e: PointerEvent) => { const r = canvas.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; };
    const rz = () => { rs(); if (R) dr(); };
    rs(); dr();
    root.current?.addEventListener("pointermove", pm); addEventListener("resize", rz);
    return () => {
      timers.forEach(clearInterval); cleanups.forEach((f) => f()); cancelAnimationFrame(raf);
      root.current?.removeEventListener("pointermove", pm); removeEventListener("resize", rz);
    };
  }, []);

  return (
    <header className="hero" id="top" ref={root}>
      <canvas id="cv" ref={cv} aria-hidden="true" />
      <i className="au a" /><i className="au b" /><i className="au c" />
      <div className="w">
        <div className="av"><i><Image src="/bilal.jpg" alt="Bilal Hassan" width={132} height={132} priority /></i></div>
        <div className="pill"><b />Open to remote roles and global teams</div>
        <h1><span><em>Bilal Hassan</em></span><span><em className="g">Hassan</em></span></h1>
        <div className="role"><span>{role}</span><u /></div>
        <p className="lead">I build complete web apps, from the React interface to the API and database, and add AI features like retrieval-augmented search to products people use.</p>
        <div className="btns">
          <a className="btn p mg" href="#work">Explore my work</a>
          <a className="btn mg" href="#contact">Hire me</a>
          <a className="btn mg" href="https://github.com/bilalhassan1855786-debug" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
        <div className="st">{S.map((s, i) => <div key={s[2]}><b>{n[i]}{n[i] >= s[0] ? s[1] : ""}</b><span>{s[2]}</span></div>)}</div>
      </div>
    </header>
  );
}
