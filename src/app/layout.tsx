import { Inter } from "next/font/google";
import type { Metadata } from "next";

import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
	robots: "index,follow",
	keywords: [
		"Resgate",
		"Desabrigados",
		"Desastres",
		"Ajuda",
		"Abrigos",
		"Recursos",
		"vítimas",
		"Solidariedade",
		"Rio Grande do Sul",
		"Enchentes",
	],
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-br">
			<body className={inter.className}>
				<Header />
				<main className="grow">
					{children}
					<Toaster />
				</main>
				<Footer />
			</body>
		</html>
	);
}
