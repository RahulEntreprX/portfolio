'use client';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

const links = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
];

export default function TopNav() {
  return (
    <div className="mx-auto w-full md:w-auto">
      <div className="mx-auto flex items-center gap-5 rounded-full glass px-4 py-2 md:px-6 md:py-3 shadow-xl backdrop-saturate-150">
        <Link href="/" className="font-semibold tracking-tight text-gray-900 dark:text-slate-100">
          PROFILE
        </Link>
        <nav className="hidden md:flex items-center gap-5 text-sm">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-gray-700 dark:text-slate-300 hover:text-accent">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <ThemeToggle />
          <Link href="/contact" className="rounded-full bg-gray-900 px-4 py-2 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-slate-100">
            Start a Project
          </Link>
        </div>
      </div>
    </div>
  );
}

