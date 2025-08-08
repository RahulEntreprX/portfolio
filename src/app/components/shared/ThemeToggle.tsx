'use client';
import { useEffect, useState } from 'react';

type SiteTheme = 'light' | 'dark' | 'mova' | 'blue';
type AccentTheme = 'emerald' | 'indigo' | 'rose' | 'amber' | 'purple' | 'cyan' | 'pink' | 'orange' | 'teal' | 'violet';

function getInitialTheme(): SiteTheme {
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage.getItem('siteTheme');
  if (stored === 'dark' || stored === 'light' || stored === 'mova' || stored === 'blue') return stored as SiteTheme;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getInitialAccent(): AccentTheme {
  if (typeof window === 'undefined') return 'emerald';
  const stored = window.localStorage.getItem('accent') as AccentTheme | null;
  return stored ?? 'emerald';
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<SiteTheme>(getInitialTheme());
  const [accent, setAccent] = useState<AccentTheme>(getInitialAccent());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-mova', 'theme-blue');
    if (theme === 'mova') {
      root.classList.add('dark');
      root.classList.add('theme-mova');
    } else if (theme === 'blue') {
      root.classList.add('theme-blue');
    } else if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    window.localStorage.setItem('siteTheme', theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-emerald','theme-indigo','theme-rose','theme-amber','theme-purple','theme-cyan','theme-pink','theme-orange','theme-teal','theme-violet');
    root.classList.add(`theme-${accent}`);
    window.localStorage.setItem('accent', accent);
  }, [accent]);

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <button
          aria-label="Theme"
          onClick={() => setOpen((v) => !v)}
          onMouseEnter={() => setOpen(true)}
          className="rounded-full px-3 py-2 text-sm glass hover:shadow transition bg-accent text-white hover:bg-accent-dark"
        >
          Theme
        </button>
      </div>
      {open && (
        <div
          className="absolute left-1/2 top-full z-50 -translate-x-1/2 mt-3"
          onMouseLeave={() => setOpen(false)}
        >
          {/* semicircle container */}
          <div className="relative h-28 w-56">
            <div className="absolute inset-x-0 bottom-0 mx-auto flex items-end justify-between px-4">
              {/* Light */}
              <ArcItem label="Light" onClick={() => setTheme('light')} color="white" />
              {/* Dark */}
              <ArcItem label="Dark" onClick={() => setTheme('dark')} color="#0f172a" />
              {/* Mova */}
              <ArcItem label="Mova" onClick={() => setTheme('mova')} color="#0c2622" />
              {/* Blue */}
              <ArcItem label="Blue" onClick={() => setTheme('blue')} color="#1e40af" />
            </div>
          </div>
          {/* accent row */}
          <div className="mt-2 flex justify-center gap-2 rounded-full glass px-3 py-2 flex-wrap max-w-xs">
            {(['emerald','indigo','rose','amber','purple','cyan','pink','orange','teal','violet'] as AccentTheme[]).map((opt) => (
              <button
                key={opt}
                aria-label={opt}
                title={opt}
                onClick={() => { setAccent(opt); }}
                className="h-8 w-8 rounded-full border border-white/20 transition transform hover:scale-105"
                style={{ backgroundColor: getAccentPreview(opt) }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function getAccentPreview(opt: AccentTheme): string {
  switch(opt){
    case 'emerald': return 'rgb(16 185 129)';
    case 'indigo': return 'rgb(99 102 241)';
    case 'rose': return 'rgb(244 63 94)';
    case 'amber': return 'rgb(245 158 11)';
    case 'purple': return 'rgb(147 51 234)';
    case 'cyan': return 'rgb(6 182 212)';
    case 'pink': return 'rgb(236 72 153)';
    case 'orange': return 'rgb(249 115 22)';
    case 'teal': return 'rgb(20 184 166)';
    case 'violet': return 'rgb(139 92 246)';
    default: return 'rgb(16 185 129)';
  }
}

function ArcItem({ label, onClick, color }: { label: string; onClick: () => void; color: string }) {
  return (
    <button
      onClick={onClick}
      title={label}
      className="relative h-12 w-12 rounded-full shadow ring-1 ring-white/20 transition-all duration-300 hover:scale-110 hover:opacity-90"
      style={{ backgroundColor: color }}
    >
      <span className="sr-only">{label}</span>
    </button>
  );
}

