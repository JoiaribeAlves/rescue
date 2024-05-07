"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { MobileMenu } from "./MobileMenu";
import { Button } from "./ui/button";

export function Header() {
	const path = usePathname();

	return (
		<header className="flex justify-between items-center px-4 bg-primary text-primary-foreground lg:px-8 h-16">
			<Link href="/" className="relative h-8 w-10 lg:h-10 lg:w-12">
				<Image src="/logo-white.png" alt="Logo" fill sizes="100%" />
			</Link>

			<nav className="hidden lg:block">
				<ul className="flex gap-1">
					<li>
						<Link
							href="/"
							className={`p-2 rounded-md ${path === "/" ? "bg-white text-primary" : "text-white"}`}
						>
							Solicitar resgate
						</Link>
					</li>

					<li>
						<Link
							href="/resgates"
							className={`p-2 rounded-md ${path === "/resgates" ? "bg-white text-primary" : "text-white"}`}
						>
							Solicitações de resgate
						</Link>
					</li>

					<li>
						<Link
							href="/abrigos"
							className={`p-2 rounded-md ${path === "/abrigos" ? "bg-white text-primary" : "text-white"}`}
						>
							Abrigos
						</Link>
					</li>

					<li>
						<Link
							href="/desaparecidos"
							className={`p-2 rounded-md ${path === "/desaparecidos" ? "bg-white text-primary" : "text-white"}`}
						>
							Desaparecidos
						</Link>
					</li>
				</ul>
			</nav>

			<Sheet>
				<SheetTrigger asChild>
					<Button variant="default" size="icon" className="lg:hidden">
						<MenuIcon size={24} />
					</Button>
				</SheetTrigger>

				<SheetContent>
					<SheetHeader>
						<SheetTitle>Menu</SheetTitle>
					</SheetHeader>

					<MobileMenu />
				</SheetContent>
			</Sheet>
		</header>
	);
}
