import type { Metadata } from "next";

import { WaterList } from "./components/WaterList";
import { ContactList } from "@/components/ContactList";

export const metadata: Metadata = {
	title: "Lista de locais com água potável - Enchentes RS",
	description: "Aqui você encontrará os endereços dos locais com água potável",
};

export default function Shelter() {
	return (
		<div className="py-8 px-4 lg:px-8 flex flex-col gap-6">
			<h1 className="font-semibold text-lg">Lista de locais com água potável</h1>

			<ContactList />

			<WaterList />
		</div>
	);
}
