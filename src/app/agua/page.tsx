import type { Metadata } from "next";

import { WaterList } from "./components/WaterList";
import Link from "next/link";
import { PHONES } from "@/constants/phones";

export const metadata: Metadata = {
	title: "Lista de locais com água potável - Enchentes RS",
	description: "Aqui você encontrará os endereços dos locais com água potável",
};

export default function Shelter() {
	return (
		<div className="py-8 px-4 lg:px-8 flex flex-col gap-6">
			<h1 className="font-semibold text-lg">Lista de locais com água potável</h1>

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

			<WaterList />
		</div>
	);
}
