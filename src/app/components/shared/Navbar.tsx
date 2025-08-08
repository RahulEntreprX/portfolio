'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center gap-6">
      {links.map((link) => {
        const active = pathname === link.href || pathname.startsWith(link.href + "/");
        return (
          <Link key={link.href} href={link.href} className={active ? "text-brand font-medium" : "text-gray-700 hover:text-gray-900"}>
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

