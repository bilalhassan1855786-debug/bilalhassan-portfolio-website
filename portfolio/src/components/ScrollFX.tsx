"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollFX() {
  const path = usePathname();
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("on"); io.unobserve(e.target); }
    }), { threshold: 0.15 });
    document.querySelectorAll(".rv:not(.on)").forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [path]);
  useEffect(() => {
    const pr = document.getElementById("pr")!, cg = document.getElementById("cg")!;
    const s = () => { pr.style.transform = `scaleX(${scrollY / (document.documentElement.scrollHeight - innerHeight) || 0})`; };
    const m = (e: PointerEvent) => { cg.style.transform = `translate(${e.clientX}px,${e.clientY}px)`; };
    addEventListener("scroll", s, { passive: true });
    addEventListener("pointermove", m);
    return () => { removeEventListener("scroll", s); removeEventListener("pointermove", m); };
  }, []);
  return null;
}
