const T = ["Next.js", "React", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS", "Gemini AI", "RAG", "JWT Auth", "REST APIs", "Vercel", "Git & GitHub"];
export default function Marquee() {
  return <div className="mq" aria-hidden="true"><div className="tr">{[...T, ...T].map((x, i) => <span key={i}>{x}</span>)}</div></div>;
}
