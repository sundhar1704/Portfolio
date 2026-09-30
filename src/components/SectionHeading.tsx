import Reveal from "./Reveal";

const MONO = "'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace";

interface Props {
  label: string;
  lines: string[];
  desc?: string;
}

export default function SectionHeading({ label, lines, desc }: Props) {
  return (
    <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="text-[11px] font-medium tracking-wide text-slate-900" style={{ fontFamily: MONO }}>
          {label}
        </p>
        <h2 className="mt-3 text-5xl font-extrabold leading-[0.95] tracking-tighter text-slate-950 sm:text-[64px]">
          {lines.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </h2>
      </div>
      {desc && <p className="max-w-xs text-sm leading-relaxed text-slate-600">{desc}</p>}
    </Reveal>
  );
}