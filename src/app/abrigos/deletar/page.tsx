import type { Metadata } from "next";
import { SheltersList } from "../components/SheltersList";

export const metadata: Metadata = {
	title: "Deletar abrigo - Enchentes RS",
	description: "Aqui você pode deletar um abrigo",
};

export default function page() {
	return (
		<div className="py-8 px-4 lg:px-8 flex flex-col gap-6">
			<h1 className="font-semibold text-lg">Deletar abrigo</h1>

			<SheltersList />
		</div>
	);
}
