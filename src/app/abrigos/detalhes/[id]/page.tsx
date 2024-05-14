import type { Metadata } from "next";

import { ShelterSupplies } from "./components/ShelterSupplies";
import { ShelterDetails } from "./components/ShelterDetails";

export const metadata: Metadata = {
	title: "Detalhes do abrigo - Enchentes RS",
	description: "Aqui você encontrará todas as informações referentes a um abrigo específico",
};

interface IParams {
	params: {
		id: string;
	}
}

export default async function Page({ params }: IParams) {
	return (
		<div className="flex flex-col gap-6 pb-8 lg:pt-8">
			<ShelterDetails id={params.id} />

			<ShelterSupplies />
		</div>
	);
}
