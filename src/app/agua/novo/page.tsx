import type { Metadata } from "next";
import { CreateWaterForm } from "./components/CreateWaterForm";

export const metadata: Metadata = {
	title: "Cadastrar local com água potável - Enchentes RS",
	description: "Aqui você pode cadastrar endereços que estão distribuindo água potável",
};

export default function page() {
	return (
		<div className="py-8 px-4 lg:px-8 flex flex-col gap-6">
			<h1 className="font-semibold text-lg">Novo local com Água Potável</h1>

			<CreateWaterForm />
		</div>
	);
}
