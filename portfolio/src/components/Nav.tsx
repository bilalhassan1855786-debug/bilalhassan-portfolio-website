"use client";
import Link from "next/link";

export default function Nav() {
  const toggle = () => {
    const r = document.documentElement;
    const dark = r.dataset.theme ? r.dataset.theme === "dark" : matchMedia("(prefers-color-scheme:dark)").matches;
    const n = dark ? "light" : "dark";
    r.dataset.theme = n;
    try { localStorage.setItem("theme", n); } catch {}
  };
  return (
    <nav>
      <div className="w">
        <Link className="logo" href="/"><span className="g">bilal.dev</span></Link>
        <div className="lk">
          <Link className="h" href="/#work">Projects</Link>
          <Link className="h" href="/#skills">Skills</Link>
          <Link className="h" href="/#edu">Education</Link>
          <Link href="/#contact">Contact</Link>
          <button id="th" onClick={toggle} aria-label="Switch theme">◐</button>
        </div>
      </div>
    </nav>
  );
}
