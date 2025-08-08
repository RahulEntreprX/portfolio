import Link from 'next/link';

const linkGroups = [
  {
    title: 'Work',
    items: [
      { label: 'Projects', href: '/projects' },
      { label: 'Case studies', href: '/projects' },
      { label: 'Open source', href: 'https://github.com' },
      { label: 'Articles', href: '/about' },
    ],
  },
  {
    title: 'Company',
    items: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Start a project', href: '/contact' },
      { label: 'Privacy', href: '#' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { label: 'Playbooks', href: '/projects' },
      { label: 'Tech stack', href: '/about' },
      { label: 'Design system', href: '/about' },
      { label: 'Changelog', href: '#' },
    ],
  },
];

function SocialIcon({ name, href, children }: { name: string; href: string; children: React.ReactNode }) {
  return (
    <a
      aria-label={name}
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
      className="size-10 grid place-items-center rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-colors"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24">
      <div className="container relative overflow-hidden rounded-3xl bg-black/5 dark:bg-white/5 border border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 p-8 md:p-12">
          {/* Left intro */}
          <div className="md:col-span-3 flex flex-col justify-between">
            <div>
              <div className="text-sm opacity-80 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Available for collaborations
              </div>
              <div className="mt-2 text-xs opacity-60">Local time {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
              <p className="mt-6 text-sm opacity-80 max-w-xs">
                I build data products end‑to‑end — from reliable pipelines to AI systems in production. Let’s ship real outcomes.
              </p>
            </div>
          </div>

          {/* Middle link groups */}
          <div className="md:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-8">
            {linkGroups.map((group) => (
              <div key={group.title}>
                <h4 className="text-sm font-semibold tracking-wide mb-3 opacity-80">{group.title}</h4>
                <ul className="space-y-2 text-sm opacity-90">
                  {group.items.map((it) => (
                    <li key={it.label}>
                      {it.href.startsWith('/') ? (
                        <Link href={it.href} className="hover:text-brand">
                          {it.label}
                        </Link>
                      ) : (
                        <a href={it.href} target="_blank" rel="noreferrer" className="hover:text-brand">
                          {it.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Right contacts & CTA */}
          <div className="md:col-span-3 flex flex-col gap-6">
            <div>
              <div className="text-sm opacity-80">Contact</div>
              <div className="mt-2 text-sm opacity-90">
                <a href="mailto:UNLEASHERIN@GMAIL.COM" className="hover:text-brand">UNLEASHERIN@GMAIL.COM</a>
              </div>
              <div className="text-sm opacity-90">+91 8887862185</div>
            </div>
            <div className="flex items-center gap-3">
              <SocialIcon name="GitHub" href="https://github.com/RahulEntreprX">
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden><path fill="currentColor" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.69c-2.78.61-3.37-1.19-3.37-1.19c-.46-1.17-1.12-1.48-1.12-1.48c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.9 1.53 2.37 1.09 2.95.83c.09-.65.35-1.09.64-1.34c-2.22-.25-4.56-1.11-4.56-4.95c0-1.09.39-1.98 1.03-2.68c-.1-.25-.45-1.27.1-2.65c0 0 .84-.27 2.75 1.02c.8-.22 1.66-.33 2.51-.33s1.71.11 2.51.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.38.2 2.4.1 2.65c.64.7 1.03 1.59 1.03 2.68c0 3.85-2.34 4.7-4.57 4.95c.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" /></svg>
              </SocialIcon>
              <SocialIcon name="LinkedIn" href="https://linkedin.com/in/rahul-at-iitd">
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden><path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14Zm-9.65 6.65H7.35v7.7h2v-7.7Zm.2-2.6a1.18 1.18 0 1 0-2.36 0a1.18 1.18 0 0 0 2.36 0ZM18.3 14.6c0-2.2-1.17-3.22-2.74-3.22c-1.12 0-1.62.62-1.9 1.06v-0.91h-2v7.72h2v-4.3c0-1.14.62-1.89 1.62-1.89c.95 0 1.52.63 1.52 1.89v4.3h2v-4.65Z" /></svg>
              </SocialIcon>
              <SocialIcon name="Mail" href="mailto:UNLEASHERIN@GMAIL.COM">
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden><path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4l-8 5L4 8V6l8 5l8-5v2Z" /></svg>
              </SocialIcon>
            </div>
            <div className="flex items-center justify-between gap-3">
              <Link href="/contact" className="rounded-full border border-white/20 px-4 py-2 text-sm hover:bg-white/10">Get in touch</Link>
              <a href="#top" className="size-10 grid place-items-center rounded-full border border-white/20 hover:bg-white/10" aria-label="Back to top">
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden><path fill="currentColor" d="m7 14l5-5l5 5H7Z" /></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-8 md:mx-12 h-px bg-white/15" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 md:px-12">
          <div className="text-xs opacity-70">© {year} Rahul Pannalal. All rights reserved.</div>
          <div className="text-xs opacity-70">Crafted with performance, accessibility, and love.</div>
        </div>

        {/* Big wordmark */}
        <div className="pointer-events-none select-none px-6 pb-8">
          <p className="m-0 font-extrabold tracking-tight leading-[1.05] opacity-20 [text-shadow:0_6px_28px_rgba(0,0,0,0.18)] text-[clamp(1.5rem,5.5vw,4rem)]">
            <span className="bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-dark))] bg-clip-text text-transparent">MADE WITH</span>{' '}
            <span className="text-red-500 align-middle mx-1">❤</span>{' '}
            <span className="bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-dark))] bg-clip-text text-transparent text-[0.72em]">-BY RAHUL P.</span>
          </p>
          <div className="mt-1 text-xs opacity-40">IIT Delhi</div>
        </div>
      </div>
    </footer>
  );
}

