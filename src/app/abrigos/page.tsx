import type { Metadata } from "next";

import { SheltersList } from "./components/SheltersList";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Lista de abrigos - Enchentes RS",
	description: "Aqui você encontrará os endereços dos abrigos",
};

export default function Shelter() {
	return (
		<div className="py-8 px-4 lg:px-8 flex flex-col gap-6">
			<h1 className="font-semibold text-lg">Lista de abrigos</h1>

			<p>
				Ajude-me a atualizar esta lista, conhece um abrigo?{" "}
				<Link href="https://wa.me/556993390705" className="font-medium">Envie o endereço aqui</Link>
			</p>

			<SheltersList />
		</div>
	);
}
