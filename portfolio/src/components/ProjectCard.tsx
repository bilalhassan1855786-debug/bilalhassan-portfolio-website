"use client";
import Link from "next/link";
import type { CSSProperties, PointerEvent } from "react";
import Shot from "./Shot";
import type { Project } from "@/data/projects";

export default function ProjectCard({ p, i }: { p: Project; i: number }) {
  const move = (e: PointerEvent<HTMLAnchorElement>) => {
    const c = e.currentTarget, r = c.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    c.style.setProperty("--x", x * 100 + "%"); c.style.setProperty("--y", y * 100 + "%");
    c.style.setProperty("--ry", (x - 0.5) * 9 + "deg"); c.style.setProperty("--rx", (0.5 - y) * 150 + "deg");
  };
  const leave = (e: PointerEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.setProperty("--rx", "0deg"); e.currentTarget.style.setProperty("--ry", "0deg");
  };
  return (
    <Link href={`/projects/${p.slug}`} className={`cd rv${i >= 6 ? " on" : ""}`}
      style={{ "--h": p.hue, "--dl": `${(i % 3) * 0.12}s` } as CSSProperties} onPointerMove={move} onPointerLeave={leave}>
      <div className="in2">
        <div className="sc">
          <div><i /><i /><i /><span>{new URL(p.url).host}</span></div>
          <Shot slug={p.slug} url={p.url} alt={`${p.title} screenshot`} />
        </div>
        <h3><span>{p.title}</span>{p.badge && <small>{p.badge}</small>}</h3>
        <p className="d">{p.desc}</p>
        <div className="tg">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
        <span className="go">View project →</span>
      </div>
    </Link>
  );
}
