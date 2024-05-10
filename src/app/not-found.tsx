import Link from "next/link";
import { HomeIcon } from "lucide-react";

export default function NotFound() {
	return (
		<div className="flex flex-col grow gap-3 items-center justify-center">
			<h1 className="text-2xl lg:text-3xl font-semibold text-center">
				Ooops! página não encontrada
			</h1>

			<Link
				href="/"
				className="flex items-center gap-1 p-3 bg-primary font-medium text-primary-foreground hover:bg-primary/90 rounded-md transition-colors"
			>
				<HomeIcon size={14} className="text-sm" />
				Página inicial
			</Link>
		</div>
	);
}
