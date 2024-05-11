import type { Metadata } from "next";
import { ShelterForm } from "../components/ShelterForm";

export const metadata: Metadata = {
	title: "Cadastrar abrigo - Enchentes RS",
	description: "Aqui você pode cadastrar endereços de abrigos",
};

export default function page() {
	return (
		<div className="py-8 px-4 lg:px-8 flex flex-col gap-6">
			<h1 className="font-semibold text-lg">Cadastrar abrigo</h1>

			<ShelterForm mode="create" />
		</div>
	);
}
