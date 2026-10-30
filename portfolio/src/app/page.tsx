import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ProjectGrid from "@/components/ProjectGrid";
import Contact from "@/components/Contact";

const skills: [string, string[]][] = [
  ["Frontend", ["React", "Next.js", "Tailwind CSS", "Hooks", "Responsive UI"]],
  ["Backend", ["Node.js", "REST APIs", "JWT auth", "API integration"]],
  ["Data", ["MongoDB", "Atlas", "Mongoose", "Database design"]],
  ["AI", ["Gemini", "RAG", "Vector search"]],
  ["Workflow", ["Git", "GitHub", "Vercel", "Debugging"]],
];

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <section id="work"><div className="w">
        <h2 className="rv">Projects you can <span className="g">open right now</span></h2>
        <p className="sub rv">A selection from 100+ projects, 60+ of them live on Vercel. Open any card for details and a screenshot.</p>
        <ProjectGrid />
      </div></section>
      <section id="skills"><div className="w">
        <h2 className="rv">The stack I <span className="g">ship with</span></h2>
        <p className="sub rv">TypeScript-first, from interface to deployment.</p>
        <div className="sk">
          {skills.map(([h, items], i) => (
            <div className="rv" key={h} style={{ "--dl": `${i * 0.1}s` } as React.CSSProperties}>
              <h3>{h}</h3>{items.map((x) => <span key={x}>{x}</span>)}
            </div>
          ))}
        </div>
      </div></section>
      <section id="edu"><div className="w">
        <h2 className="rv">Learning <span className="g">while shipping</span></h2>
        <div className="ed" style={{ marginTop: 40 }}>
          <div className="rv"><h3>BS in Artificial Intelligence</h3><p>Four semesters completed</p></div>
          <div className="rv" style={{ "--dl": ".1s" } as React.CSSProperties}><h3>FSC</h3><p>Completed</p></div>
        </div>
      </div></section>
      <Contact />
    </>
  );
}
