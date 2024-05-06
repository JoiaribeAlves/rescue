"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"

export function Header() {
  const path = usePathname();

  return (
    <header className="flex justify-between items-center bg-primary text-primary-foreground lg:px-8 h-16">
      <div className="relative h-[inherit] w-[70px]">
        <Link href="/">
          <Image src="/logo-white.png" alt="Logo" fill />
        </Link>
      </div>

      <nav className="hidden lg:block">
        <ul className="flex gap-1">
          <li>
            <Link
              href="/"
              className={`p-2 rounded-md ${path === '/' ? "bg-white text-primary" : "text-white"}`}
            >
              Solicitar resgate
            </Link>
          </li>

          <li>
            <Link
              href="/r
              sgates" className={`p-2 rounded-md ${path === '/resgates' ? "bg-white text-primary" : "text-white"}`}
            >
              Solicitações de resgate
            </Link>
          </li>

          <li>
            <Link
              href="/a
              rigos" className={`p-2 rounded-md ${path === '/abrigos' ? "bg-white text-primary" : "text-white"}`}
            >
              Abrigos
            </Link>
          </li>

          <li>
            <Link
              href="/desaparecidos"
              className={`p-2 rounded-md ${path === '/desaparecidos' ? "bg-white text-primary" : "text-white"}`}
            >
              Desaparecidos
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
