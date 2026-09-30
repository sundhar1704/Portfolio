import { useState, type FormEvent } from "react";
import { Mail, MapPin, Send, Loader2, CheckCircle2, XCircle } from "lucide-react";
import GithubIcon from "./GithubIcon";
import Reveal from "./Reveal";
import { profile } from "../data/content";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Request failed");
      setStatus("sent");
      form.reset();
    } catch (err) {
      console.error(err);
      setErrorMsg(err instanceof Error ? err.message : "");
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal className="grid gap-10 overflow-hidden rounded-3xl bg-slate-900 p-10 text-white lg:grid-cols-2 lg:p-16">
        <div>
          <p className="text-xs font-semibold tracking-wider text-teal-300">INITIATE DIALOGUE</p>
          <h2 className="mt-2 text-3xl font-serif font-medium">Let's Build Something Exceptional</h2>
          <p className="mt-4 max-w-md text-sm text-slate-300">
            Whether you have an opening for a Frontend/React Developer, a Python intern, or want to
            discuss generative web applications, my inbox is open.
          </p>

          <div className="mt-8 space-y-4">
            <a href={`mailto:${profile.email}`} className="flex items-center gap-4 rounded-xl bg-white/5 p-4 hover:bg-white/10">
              <span className="rounded-lg bg-white/10 p-2.5"><Mail size={18} /></span>
              <div>
                <p className="text-xs text-slate-400">Direct Email</p>
                <p className="text-sm font-medium">{profile.email}</p>
              </div>
            </a>
            <div className="flex items-center gap-4 rounded-xl bg-white/5 p-4">
              <span className="rounded-lg bg-white/10 p-2.5"><MapPin size={18} /></span>
              <div>
                <p className="text-xs text-slate-400">Location</p>
                <p className="text-sm font-medium">{profile.location}, India</p>
              </div>
            </div>
            <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-xl bg-white/5 p-4 hover:bg-white/10">
              <span className="rounded-lg bg-white/10 p-2.5"><GithubIcon size={18} /></span>
              <div>
                <p className="text-xs text-slate-400">Repositories</p>
                <p className="text-sm font-medium">github.com/sundhar1704</p>
              </div>
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-8 text-slate-800 shadow-xl">
          {/* Honeypot: hidden from people, bots fill it and get ignored */}
          <input
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-500">Your Name</label>
              <input name="from_name" required maxLength={80} placeholder="e.g. Steve Milner" className="mt-1.5 w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-teal-600" />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">Your Email Address</label>
              <input name="from_email" type="email" required maxLength={120} placeholder="steve@company.com" className="mt-1.5 w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-teal-600" />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-xs font-medium text-slate-500">Topic / Inquired Opportunity</label>
            <select name="topic" className="mt-1.5 w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-teal-600">
              <option>Frontend / React Developer Role</option>
              <option>Python / Gen AI Internship</option>
              <option>Freelance Project</option>
              <option>General Inquiry</option>
            </select>
          </div>

          <div className="mt-4">
            <label className="text-xs font-medium text-slate-500">Message</label>
            <textarea name="message" required minLength={5} maxLength={2000} rows={4} placeholder="Share project details, team requirements, or an introductory note..." className="mt-1.5 w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-teal-600" />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-teal-800 px-6 py-3 font-medium text-white shadow-lg shadow-teal-900/20 hover:bg-teal-900 disabled:opacity-60"
          >
            {status === "sending" ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>

          {status === "sent" && (
            <p className="mt-3 flex items-center gap-1.5 text-sm text-emerald-600">
              <CheckCircle2 size={16} /> Message sent. I'll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p className="mt-3 flex items-center gap-1.5 text-sm text-red-600">
              <XCircle size={16} /> {errorMsg || "Couldn't send right now."} You can also email me at {profile.email}.
            </p>
          )}
        </form>
      </Reveal>
    </section>
  );
}