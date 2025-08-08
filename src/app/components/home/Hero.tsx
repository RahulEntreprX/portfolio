'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import BackgroundViz from './BackgroundViz';

function BenefitIcon({ type }: { type: 'trends' | 'personalize' | 'revenue' }) {
  const color = 'rgb(var(--accent))';
  if (type === 'trends') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden className="shrink-0" style={{ color }}>
        <path fill="currentColor" d="M3 3v18h18v-2H5V3H3Zm5 12l3-4l3 3l5-7l1.6 1.2L14 17l-3-3l-3 4l-2-1Z" />
      </svg>
    );
  }
  if (type === 'personalize') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden className="shrink-0" style={{ color }}>
        <path fill="currentColor" d="M12 2a5 5 0 0 1 5 5c0 2.761-2.239 5-5 5a5 5 0 0 1-5-5c0-2.761 2.239-5 5-5Zm0 12c4.418 0 8 1.79 8 4v4H4v-4c0-2.21 3.582-4 8-4Z" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden className="shrink-0" style={{ color }}>
      <path fill="currentColor" d="M3 17h4v-6H3v6Zm7 0h4V7h-4v10Zm7 0h4V11h-4v6Z" />
    </svg>
  );
}

function MiniChart() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const mx = (e.clientX - rect.left) / rect.width - 0.5;
      const my = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({ x: mx * 6, y: -my * 6 });
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  const bars = useMemo(() => Array.from({ length: 8 }, () => 30 + Math.random() * 60), []);
  const accent = 'rgb(var(--accent))';

  return (
    <div ref={ref} aria-hidden className="glass p-4 rounded-2xl w-full max-w-sm md:max-w-md">
      <div
        className="relative h-48 transition-transform duration-200"
        style={{ transform: `perspective(700px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` }}
      >
        <svg viewBox="0 0 320 180" className="absolute inset-0">
          {bars.map((h, i) => (
            <rect
              key={i}
              x={20 + i * 35}
              y={170 - h}
              width={20}
              height={h}
              rx={4}
              fill={accent}
              opacity={0.85}
            />
          ))}
          <polyline
            points={bars.map((h, i) => `${30 + i * 35},${170 - h}`).join(' ')}
            fill="none"
            stroke={accent}
            strokeWidth={2}
            opacity={0.6}
          />
        </svg>
      </div>
    </div>
  );
}

export default function Hero() {
  const [visible, setVisible] = useState([false, false, false]);
  const [greeting, setGreeting] = useState('');
  const [stats, setStats] = useState({ projects: 0, datasets: 0, coffee: 0 });
  
  useEffect(() => {
    const timeouts = [0, 200, 400].map((d, idx) => setTimeout(() => setVisible((v) => v.map((b, i) => (i === idx ? true : b))), d));
    return () => timeouts.forEach(clearTimeout);
  }, []);

  // Dynamic greeting based on time of day
  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      let newGreeting = '';
      
      if (hour >= 5 && hour < 12) {
        newGreeting = "Good morning, let's make data work for you.";
      } else if (hour >= 12 && hour < 17) {
        newGreeting = "Good afternoon, ready to turn numbers into stories?";
      } else {
        newGreeting = "Good evening, let's craft something extraordinary with data.";
      }
      
      setGreeting(newGreeting);
    };

    updateGreeting();
    const interval = setInterval(updateGreeting, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  // Animated stat counter
  useEffect(() => {
    const animateStats = () => {
      const targetStats = { projects: 11, datasets: 1.3, coffee: 999 };
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeOut = 1 - Math.pow(1 - progress, 3); // Easing function

        setStats({
          projects: Math.floor(targetStats.projects * easeOut),
          datasets: Math.round((targetStats.datasets * easeOut) * 10) / 10,
          coffee: Math.floor(targetStats.coffee * easeOut)
        });

        if (currentStep >= steps) {
          clearInterval(interval);
          setStats(targetStats);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    };

    const timer = setTimeout(animateStats, 1000); // Start after 1 second
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative overflow-hidden rounded-3xl glass p-8 md:p-14">
      <BackgroundViz />
      <div className="relative grid gap-12 md:grid-cols-[1fr,380px] md:items-center">
        <div>
          <h1 className="font-display text-[2.9rem] leading-tight md:text-[4.25rem] md:leading-[1.05] font-extrabold tracking-tight">
            <span className="title-gradient">Rahul Pannalal</span>
          </h1>
          <h2 className="font-display underline-fade mt-3 text-2xl md:text-[2.125rem] font-semibold text-gray-900 dark:text-white">Engineering Data-Driven Possibilities</h2>
          
          {/* Dynamic Greeting */}
          {greeting && (
            <p className="mt-4 text-lg font-medium text-accent animate-pulse">
              {greeting}
            </p>
          )}
          
          <p className="mt-4 text-gray-700 dark:text-slate-300 md:text-lg max-w-prose">
            I build systems that move data from raw to remarkable — designing robust pipelines, engineering real-time analytics, and automating intelligence at scale.
          </p>
          <p className="mt-3 text-gray-700 dark:text-slate-300 md:text-lg max-w-prose">
            From data engineering to AI integration, I turn complex infrastructure into seamless, revenue-driving products.
          </p>

          <p className="mt-5 inline-block rounded-full border border-white/30 px-3 py-1 text-[11px] tracking-wide text-gray-600 dark:text-slate-400">
            3rd Year Undergraduate • IIT Delhi • Mathematics & Computing
          </p>

          {/* Live Stat Counter */}
          <div className="mt-6 p-4 glass rounded-xl2">
            <p className="text-sm text-gray-600 dark:text-slate-400 mb-2">Live Stats</p>
            <p className="text-sm font-mono text-gray-800 dark:text-slate-200">
              Projects Delivered: <span className="text-accent font-bold">{stats.projects}</span> | 
              Datasets Processed: <span className="text-accent font-bold">{stats.datasets} TB</span> | 
              Cups of Coffee: <span className="text-accent font-bold">{stats.coffee === 999 ? '∞' : stats.coffee}</span>
            </p>
          </div>

          <ul className="mt-8 space-y-3">
            {[
              { key: 'pipelines', text: 'Architect scalable data pipelines', icon: 'trends' as const },
              { key: 'automation', text: 'Automate workflows with Python, SQL, Airflow, and dbt', icon: 'personalize' as const },
              { key: 'deploy', text: 'Deploy AI and analytics systems with FastAPI, Postgres, and cloud infrastructure', icon: 'revenue' as const },
            ].map((b, idx) => (
              <li
                key={b.key}
                className={`flex items-center gap-3 rounded-xl2 px-3 py-2 transition-all duration-300 hover:scale-[1.05] hover:bg-white/20 dark:hover:bg-white/10 ${
                  visible[idx] ? 'fade-up-enter' : 'fade-up-pre'
                }`}
              >
                <BenefitIcon type={b.icon} />
                <span className="text-gray-900 dark:text-slate-200">{b.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="justify-self-center md:justify-self-end">
          <MiniChart />
        </div>
      </div>
    </section>
  );
}

