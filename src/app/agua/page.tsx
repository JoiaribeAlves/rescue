import type { Metadata } from "next";

import { WaterList } from "./components/WaterList";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Lista de locais com água potável - Enchentes RS",
	description: "Aqui você encontrará os endereços dos locais com água potável",
};

export default function Shelter() {
	return (
		<div className="py-8 px-4 lg:px-8 flex flex-col gap-6">
			<h1 className="font-semibold text-lg">Lista de locais com água potável</h1>

			<p>
				Ajude-me a atualizar esta lista, conhece um local com água potável?{" "}
				<Link href="https://wa.me/556993390705" className="font-medium text-primary">Envie o endereço aqui</Link>
			</p>

			<WaterList />
		</div>
	);
}
