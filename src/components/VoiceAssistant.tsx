import { useState } from "react";
import { X, Volume2, Loader2 } from "lucide-react";
import { profile, projects, skillGroups, experience } from "../data/content";

// Click once, AI speaks a full introduction about the portfolio.
// No microphone, no speech recognition — avoids network/firewall issues
// entirely. Uses the browser's built-in speechSynthesis (works offline
// for most system voices) to read the AI's answer aloud.

function buildContext(): string {
  return `
PROFILE:
Name: ${profile.name}
Title: ${profile.title}
Status: ${profile.status}
Location: ${profile.location}
Bio: ${profile.bio}
GitHub: ${profile.github}

EXPERIENCE:
Role: ${experience.role} at ${experience.company}
Started: ${experience.started}
Description: ${experience.desc}

EDUCATION:
${experience.education.degree}, ${experience.education.school} (${experience.education.year})
${experience.education.desc}

SKILLS:
${skillGroups.map((g) => `${g.title}: ${g.skills.join(", ")}`).join("\n")}

PROJECTS:
${projects.map((p) => `- ${p.title}: ${p.desc} (Stack: ${p.stack.join(", ")})`).join("\n")}
  `.trim();
}

type Phase = "idle" | "thinking" | "speaking";

export default function VoiceAssistant({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [phase, setPhase] = useState<Phase>("idle");

  async function handleExplain() {
    if (phase !== "idle") return;
    setPhase("thinking");

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question:
            "Give a friendly 1-2 minute spoken introduction to this portfolio — cover who this person is, their current role, their key skills, 2-3 standout projects, and how to get in touch. Speak as if welcoming a visitor to the site.",
          context: buildContext(),
        }),
      });
      const data = await res.json();
      speak(data.answer);
    } catch (err) {
      console.error(err);
      speak("Sorry, I couldn't generate the introduction right now.");
    }
  }

  function speak(text: string) {
    if (!("speechSynthesis" in window)) {
      setPhase("idle");
      return;
    }
    setPhase("speaking");
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1;
    utter.onend = () => setPhase("idle");
    utter.onerror = () => setPhase("idle");
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }

  if (!open) return null;

  const label =
    phase === "thinking" ? "Preparing…" : phase === "speaking" ? "Speaking…" : "Tell me about this portfolio";

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-slate-900/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-800">
          <Volume2 size={18} className="text-teal-700" />
          <p className="text-sm font-semibold">Portfolio AI Guide</p>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
          <X size={18} />
        </button>
      </div>

      <p className="mt-3 text-xs text-slate-500">
        Click below and I'll explain who Sundharavel is, his skills, and his projects — out loud, in under 2 minutes.
      </p>

      <button
        onClick={handleExplain}
        disabled={phase !== "idle"}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-800 px-4 py-3 text-sm font-medium text-white transition hover:bg-teal-900 disabled:opacity-60"
      >
        {phase !== "idle" && <Loader2 size={16} className="animate-spin" />}
        {label}
      </button>
    </div>
  );
}