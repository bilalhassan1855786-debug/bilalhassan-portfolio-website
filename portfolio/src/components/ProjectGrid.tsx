"use client";
import { useState } from "react";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";

export default function ProjectGrid() {
  const [all, setAll] = useState(false);
  const list = all ? projects : projects.slice(0, 6);
  return (
    <>
      <div className="pg">{list.map((p, i) => <ProjectCard key={p.slug} p={p} i={i} />)}</div>
      <div className="btns" style={{ marginTop: 36 }}>
        <button className="btn" onClick={() => setAll(!all)}>{all ? "Show fewer" : `Show all ${projects.length} projects`}</button>
        <a className="btn" href="https://github.com/bilalhassan1855786-debug" target="_blank" rel="noopener noreferrer">More on GitHub</a>
      </div>
    </>
  );
}
