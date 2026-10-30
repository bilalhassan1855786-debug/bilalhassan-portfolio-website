import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Shot from "@/components/Shot";
import { projects } from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return projects.map((p) => ({ slug: p.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: `${p.title} – Bilal Hassan`, description: p.desc } : {};
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = projects[i], prev = projects[(i + projects.length - 1) % projects.length], next = projects[(i + 1) % projects.length];
  return (
    <main className="w dt" style={{ "--h": p.hue } as CSSProperties}>
      <Link className="back" href="/#work">← All projects</Link>
      <h1 className="g">{p.title}</h1>
      <div className="grid items-start gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div className="sc big rv">
          <div><i /><i /><i /><span>{new URL(p.url).host}</span></div>
          <Shot slug={p.slug} url={p.url} alt={`${p.title} screenshot`} />
        </div>
        <aside className="pan rv" style={{ "--dl": ".12s" } as CSSProperties}>
          <p>{p.desc}</p>
          {p.points && <ul>{p.points.map((x) => <li key={x}>{x}</li>)}</ul>}
          <div className="tg">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
          <a className="btn p" href={p.url} target="_blank" rel="noopener noreferrer">Open live site ↗</a>
        </aside>
      </div>
      <div className="pn">
        <Link className="btn" href={`/projects/${prev.slug}`}>← {prev.title}</Link>
        <Link className="btn" href={`/projects/${next.slug}`}>{next.title} →</Link>
      </div>
    </main>
  );
}
