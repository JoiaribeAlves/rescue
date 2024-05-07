import { Inter } from "next/font/google";

import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

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
