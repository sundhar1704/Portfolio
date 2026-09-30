import { motion, type Variants } from "framer-motion";
import { ArrowDown, MessageSquare, Download } from "lucide-react";
import GithubIcon from "./GithubIcon";
import { profile } from "../data/content";

interface Props {
  onOpenAssistant: () => void;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function Hero({ onOpenAssistant }: Props) {
  return (
       <section id="home" className="relative overflow-hidden">
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-teal-200/30 blur-3xl" />
      <div className="absolute top-24 right-0 h-[32rem] w-[32rem] rounded-full bg-teal-300/20 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 py-20 grid gap-16 lg:grid-cols-[1fr_auto] items-center">
        <div>
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-sm text-teal-900 shadow-sm ring-1 ring-teal-900/10"
          >
            <span className="h-2 w-2 rounded-full bg-teal-500" />
            {profile.status}
            <span className="ml-2 rounded-full bg-teal-900 px-2 py-0.5 text-xs text-white">Active</span>
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-6 text-5xl font-serif font-medium leading-tight text-slate-900"
          >
            Hello, I'm <span className="italic text-teal-700">{profile.name}</span>
          </motion.h1>
          <motion.p custom={1.4} variants={fadeUp} initial="hidden" animate="show" className="mt-2 text-2xl font-semibold text-teal-700">
            {profile.title}
          </motion.p>
          <motion.p custom={1.8} variants={fadeUp} initial="hidden" animate="show" className="mt-4 max-w-xl text-slate-600">
            {profile.bio}
          </motion.p>

          <motion.div custom={2.2} variants={fadeUp} initial="hidden" animate="show" className="mt-6 flex flex-wrap gap-2">
            {profile.roles.map((r) => (
              <span
                key={r}
                className="rounded-full bg-teal-900/5 px-3 py-1 text-sm text-teal-900 ring-1 ring-teal-900/10"
              >
                {r}
              </span>
            ))}
          </motion.div>

          <motion.div custom={2.6} variants={fadeUp} initial="hidden" animate="show" className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-xl bg-teal-800 px-6 py-3 text-white font-medium shadow-lg shadow-teal-900/20 hover:bg-teal-900 transition"
            >
              View Projects <ArrowDown size={16} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-medium text-slate-800 hover:bg-white/70 transition"
            >
              Let's Talk
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-medium text-slate-800 shadow-sm ring-1 ring-slate-900/10 hover:bg-slate-50 transition"
            >
              <GithubIcon size={18} /> GitHub
            </a>
            <a
              href={profile.cvUrl}
              download
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-medium text-slate-800 shadow-sm ring-1 ring-slate-900/10 hover:bg-slate-50 transition"
            >
              <Download size={18} /> Download CV
            </a>
            <button
              onClick={onOpenAssistant}
              className="inline-flex items-center gap-2 rounded-xl bg-teal-50 px-5 py-3 font-medium text-teal-800 shadow-sm ring-1 ring-teal-800/20 hover:bg-teal-100 transition"
            >
              <MessageSquare size={18} /> Ask my AI assistant
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="relative h-[26rem] w-[26rem] shrink-0"
        >
          <div className="absolute inset-0 rounded-full bg-white shadow-xl ring-1 ring-teal-900/5" />
          <div className="absolute inset-2 rounded-full ring-1 ring-teal-900/10" />

          {/* Photo box: put your photo at /public/profile.jpg */}
          <div className="absolute left-1/2 top-10 h-52 w-44 -translate-x-1/2 overflow-hidden rounded-2xl ring-4 ring-white shadow-lg">
            <img
              src="/profile.png"
              alt={profile.name}
              className="h-full w-full object-cover object-top"
            />
          </div>

          <div className="absolute inset-x-0 top-64 text-center">
            <p className="text-lg font-semibold text-slate-900">{profile.name}</p>
            <p className="text-sm text-teal-700">{profile.location}</p>
            <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-teal-50 px-3 py-1 text-xs text-teal-800 ring-1 ring-teal-800/10">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-500" /> Open for Tech Roles
            </span>
          </div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-4 -left-4 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-medium shadow-md"
          >
            <span className="h-2 w-2 rounded-full bg-teal-500" /> Python + LLMs
          </motion.div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            className="absolute bottom-2 -right-6 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-medium shadow-md"
          >
            React &amp; Mobile UI
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}