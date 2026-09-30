import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Code2, Smartphone, Loader2 } from "lucide-react";
import { projects, type Project } from "../data/content";
import SectionHeading from "./SectionHeading";

const SANS = "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif";

const filters = [
  { id: "all", label: "All (5)" },
  { id: "react", label: "React (2)" },
  { id: "react-native", label: "React Native (1)" },
  { id: "js-html", label: "JS / HTML (2)" },
] as const;

// Renders the ACTUAL live site, scaled down to thumbnail size, instead of a
// third-party screenshot service — always current, no external dependency.
function LivePreview({ project }: { project: Project }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative h-64 w-full overflow-hidden bg-slate-100">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center text-slate-400">
          <Loader2 size={20} className="animate-spin" />
        </div>
      )}
      <iframe
        src={project.liveUrl}
        title={project.title}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`pointer-events-none absolute left-0 top-0 border-0 transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ width: "300%", height: "300%", transform: "scale(0.3333)", transformOrigin: "0 0" }}
      />
      <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> {project.badge}
      </div>
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noreferrer"
        className="absolute inset-0"
        aria-label={`Open ${project.title} live site`}
      />
    </div>
  );
}

export default function Projects() {
  const [active, setActive] = useState<(typeof filters)[number]["id"]>("all");
  const visible = active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24" style={{ fontFamily: SANS }}>
      <SectionHeading
        label="03 / PROJECTS"
        lines={["Selected", "Work."]}
        desc="Complete, functional applications with live, real-time front views of each deployment."
      />

      <div className="mt-10 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setActive(f.id)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              active === f.id
                ? "bg-teal-800 text-white"
                : "bg-white text-slate-600 ring-1 ring-slate-900/10 hover:bg-slate-50"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        {visible.map((p, i) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
            className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-900/5"
          >
            <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
              <span className="ml-2 flex-1 truncate rounded-full bg-slate-50 px-3 py-1 text-center text-xs text-slate-500">
                {p.windowUrl}
              </span>
            </div>

            <LivePreview project={p} />

            <div className="p-6">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-teal-700">{p.tag}</span>
              </div>
              <h3 className="mt-2 text-lg font-bold text-slate-950">{p.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{p.desc}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span key={s} className="rounded-full bg-slate-50 px-2.5 py-1 text-xs text-slate-600 ring-1 ring-slate-900/5">
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between text-sm">
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-teal-800 hover:underline"
                >
                  {p.mobile ? <Smartphone size={14} /> : <ExternalLink size={14} />} Live Demo
                </a>
                {p.repoUrl && (
                  <a
                    href={p.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-800"
                  >
                    <Code2 size={14} /> Source Code
                  </a>
                )}
              </div>  
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}