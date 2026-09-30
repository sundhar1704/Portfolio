import { metrics } from "../data/content";
import Reveal from "./Reveal";

export default function QuickMetrics() {
  return (
    <section className="mx-auto -mt-6 max-w-6xl px-6">
      <Reveal className="grid grid-cols-2 gap-6 rounded-3xl bg-white px-8 py-6 shadow-xl shadow-teal-900/5 ring-1 ring-slate-900/5 sm:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label}>
            <p className="text-3xl font-serif font-semibold text-slate-900">{m.value}</p>
            <p className="mt-1 text-sm text-slate-500">{m.label}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
