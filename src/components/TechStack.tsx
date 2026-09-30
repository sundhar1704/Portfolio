import { Sparkles } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const dev = (name: string, variant = "original") =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-${variant}.svg`;

type Skill = { name: string; sub: string; icon?: string };

const skills: Skill[] = [
  { name: "HTML5", sub: "Semantic markup", icon: dev("html5") },
  { name: "CSS3", sub: "Modern layouts", icon: dev("css3") },
  { name: "JavaScript", sub: "ES6+", icon: dev("javascript") },
  { name: "React.js", sub: "Component architecture", icon: dev("react") },
  { name: "Tailwind", sub: "Utility-first CSS", icon: dev("tailwindcss") },
  { name: "Bootstrap", sub: "Bootstrap 5", icon: dev("bootstrap") },
  { name: "React Native", sub: "Mobile apps", icon: dev("react") },
  { name: "Vercel", sub: "Deployment", icon: dev("vercel") },
  { name: "Python", sub: "Backend scripting", icon: dev("python") },
  { name: "Gen AI / LLMs", sub: "Prompting & APIs" },
  { name: "Git", sub: "Version control", icon: dev("git") },
  { name: "VS Code", sub: "Editor & tooling", icon: dev("vscode") },
];

// Make sure Inter is loaded in index.html.
const SANS = "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif";

export default function TechStack() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-24" style={{ fontFamily: SANS }}>
      <SectionHeading
        label="02 / SKILLS"
        lines={["My", "Skills."]}
        desc="The core web, mobile and AI technologies I use to design and build responsive, user-friendly products."
      />

      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {skills.map((s, i) => (
          <Reveal
            key={s.name}
            delay={i * 0.04}
            className="flex flex-col items-center rounded-lg border border-slate-200 bg-white px-4 py-6 text-center transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center">
              {s.icon ? (
                <img src={s.icon} alt={s.name} className="h-10 w-10 object-contain" loading="lazy" />
              ) : (
                <Sparkles size={34} className="text-teal-700" />
              )}
            </div>
            <p className="mt-4 text-[13px] font-bold text-slate-950">{s.name}</p>
            <p className="mt-1 text-[11px] font-normal text-slate-500">{s.sub}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}