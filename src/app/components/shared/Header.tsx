'use client';
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import TopNav from "./TopNav";

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50">
      <div className="container mt-4 flex justify-center"><TopNav /></div>
    </header>
  );
}

