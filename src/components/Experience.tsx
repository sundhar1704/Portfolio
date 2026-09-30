import { Briefcase, GraduationCap, Sparkles, ShieldCheck, Award } from "lucide-react";
import { experience, learning } from "../data/content";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid gap-10 lg:grid-cols-2">
        <Reveal>
          <p className="text-xs font-semibold tracking-wider text-teal-700">PROFESSIONAL TRACK</p>
          <h2 className="mt-2 text-3xl font-serif font-medium text-slate-900">Work Experience</h2>

          <div className="mt-6 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-900/5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-800">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-500" /> Currently Working
              </span>
              <span className="text-xs text-slate-400">{experience.started}</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">{experience.role}</h3>
            <p className="text-sm text-teal-700">{experience.company}</p>
            <p className="mt-3 text-sm text-slate-500">{experience.desc}</p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              {experience.pillars.map((p) => (
                <div key={p.title} className="flex items-start gap-2">
                  {p.title === "Python Systems" ? (
                    <Briefcase size={18} className="mt-0.5 text-teal-700" />
                  ) : (
                    <Sparkles size={18} className="mt-0.5 text-teal-700" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-slate-800">{p.title}</p>
                    <p className="text-xs text-slate-500">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-900/5">
            <div className="flex items-center gap-2 text-slate-800">
              <GraduationCap size={20} className="text-teal-700" />
              <span className="text-xs font-semibold uppercase tracking-wide">Higher Education</span>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">{experience.education.degree}</h3>
              <span className="rounded-full bg-slate-50 px-3 py-1 text-xs text-slate-500 ring-1 ring-slate-900/5">
                {experience.education.year}
              </span>
            </div>
            <p className="text-sm text-slate-500">{experience.education.school}</p>
            <p className="mt-3 text-sm text-slate-500">{experience.education.desc}</p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-xs font-semibold tracking-wider text-teal-700">TRANSPARENT GROWTH</p>
          <h2 className="mt-2 text-3xl font-serif font-medium text-slate-900">Active Learning</h2>

          <div className="mt-6 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-900/5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Skills in Development</h3>
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                Honest Status
              </span>
            </div>
            <div className="mt-5 space-y-5">
              {learning.map((l) => (
                <div key={l.title}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 font-medium text-slate-800">
                      <Sparkles size={14} className="text-teal-600" /> {l.title}
                    </span>
                    <span className="text-xs text-teal-700">{l.status}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">{l.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-start gap-3 rounded-xl bg-slate-50 p-4 text-sm text-slate-600 ring-1 ring-slate-900/5">
              <ShieldCheck size={18} className="mt-0.5 text-teal-700" />
              <div>
                <p className="font-medium text-slate-800">Vetri IT Training Institute</p>
                <p className="text-xs text-slate-500">Enrolled in structured mentorship and enterprise engineering standard practices.</p>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-900/5">
            <div className="flex items-center gap-2 text-slate-800">
              <Award size={18} className="text-teal-700" />
              <h3 className="text-lg font-semibold">Certifications</h3>
            </div>
            <p className="mt-3 text-sm text-slate-500">
              No certifications added yet — in progress during current training at Vetri IT Training Institute.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-400" /> Formal assessments scheduled upon training completion
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
