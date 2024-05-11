import type { Metadata } from "next";

import { ShelterList } from "./components/ShelterList";
import { ContactList } from "@/components/ContactList";

export const metadata: Metadata = {
	title: "Lista de abrigos - Enchentes RS",
	description: "Aqui você encontrará os endereços dos abrigos",
};

export default function Shelter() {
	return (
		<div className="py-8 px-4 lg:px-8 flex flex-col gap-6">
			<h1 className="font-semibold text-lg">Lista de abrigos</h1>

			<ContactList />

			<ShelterList />
		</div>
	);
}
