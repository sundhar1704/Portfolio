import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const links = [
  { id: "home", label: "Home" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    /* storage blocked: fall through */
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function Navbar() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [active, setActive] = useState("home");
  const dark = theme === "dark";

  // Apply theme to <html> and remember it
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* ignore */
    }
  }, [theme, dark]);

  // Highlight the section currently at the top of the screen
  useEffect(() => {
    const update = () => {
      const line = window.innerHeight * 0.35;
      let current = links[0].id;
      let bestTop = -Infinity;
      let lowestId = links[0].id;
      let lowestTop = -Infinity;

      for (const l of links) {
        const el = document.getElementById(l.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        // the section whose top edge is closest above the reading line
        if (top <= line && top > bestTop) {
          bestTop = top;
          current = l.id;
        }
        // the section that sits lowest on the page (used at the very bottom)
        if (top > lowestTop) {
          lowestTop = top;
          lowestId = l.id;
        }
      }

      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      setActive(atBottom ? lowestId : current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <header className="fixed left-1/2 top-4 z-50 w-max max-w-[calc(100vw-1rem)] -translate-x-1/2">
      <nav
        aria-label="Main"
        className="flex items-center gap-0.5 rounded-full bg-[#ffffffe6] px-2 py-2 shadow-lg shadow-teal-900/10 ring-1 ring-slate-900/5 backdrop-blur dark:bg-[#0b3b37e6] dark:shadow-black/30 dark:ring-white/10 sm:gap-1.5 sm:px-3"
      >
        {links.map((l) => {
          const isActive = active === l.id;
          return (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`relative px-2.5 py-2 text-[13px] font-medium transition-colors sm:px-3.5 sm:text-sm ${
                isActive
                  ? "text-teal-800 dark:text-teal-300"
                  : "text-slate-600 hover:text-slate-900 dark:text-teal-100/60 dark:hover:text-teal-100"
              }`}
            >
              {l.label}
              {isActive && (
                <span className="absolute inset-x-2.5 bottom-0.5 h-0.5 rounded-full bg-teal-700 dark:bg-teal-400 sm:inset-x-3.5" />
              )}
            </a>
          );
        })}

        {/* Day / night switch: both icons stay visible.
            Active icon sits in the white thumb (teal), the other stays gray on the track. */}
        <button
          type="button"
          role="switch"
          aria-checked={dark}
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          onClick={() => setTheme(dark ? "light" : "dark")}
          className="relative ml-1 h-7 w-14 shrink-0 rounded-full bg-teal-100 transition-colors dark:bg-[#05211e] sm:ml-2"
        >
          <Sun size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
          <Moon size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" />
          <span
            className={`absolute left-0.5 top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow transition-transform duration-300 ${
              dark ? "translate-x-7" : "translate-x-0"
            }`}
          >
            {dark ? (
              <Moon size={14} className="text-teal-600" />
            ) : (
              <Sun size={14} className="text-teal-600" />
            )}
          </span>
        </button>
      </nav>
    </header>
  );
}