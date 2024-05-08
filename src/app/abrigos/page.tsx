import type { Metadata } from "next";

import Link from "next/link";

import { PHONES } from "@/constants/phones";
import { SheltersList } from "./components/SheltersList";

export const metadata: Metadata = {
	title: "Lista de abrigos - Enchentes RS",
	description: "Aqui você encontrará os endereços dos abrigos",
};

export default function Shelter() {
	return (
		<div className="py-8 px-4 lg:px-8 flex flex-col gap-6">
			<h1 className="font-semibold text-lg">Lista de abrigos</h1>

			<p>Ajude a manter esta lista atualizada:{" "}
				<Link
					href={`https://wa.me/55${PHONES[0].phone}`}
					target="_blank"
					rel="noopener"
					className="font-medium text-primary"
				>
					fale com {PHONES[0].name}
				</Link>
				{" ou "}
				<Link
					href={`https://wa.me/55${PHONES[1].phone}`}
					target="_blank"
					rel="noopener"
					className="font-medium text-primary"
				>
					fale com {PHONES[1].name}
				</Link>
			</p>

			<SheltersList />
		</div>
	);
}
