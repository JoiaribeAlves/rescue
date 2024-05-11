import { Metadata } from "next";

import { getShelterById } from "../../actions/getShelterById";
import { ShelterForm } from "../../components/ShelterForm";

export const metadata: Metadata = {
	title: "Atualizar abrigo - Enchentes RS",
	description: "Utilize o formulário nesta página para atualizar as informações do abrigo. Você poderá atualizar o nome, capacidade, endereço, entre outras informações.",
};

interface IPage {
	params: {
		id: string;
	}
}

export default async function Page({ params }: IPage) {
	const shelter = await getShelterById(params.id);

	if (!shelter) {
		return (
			<div className="py-8 px-4 lg:px-8 flex flex-col gap-6">
				<h1 className="font-semibold text-lg">
					Não foi possível obter as informações do abrigo
				</h1>
			</div>
		);
	}

	return (
		<div className="py-8 px-4 lg:px-8 flex flex-col gap-6">
			<h1 className="font-semibold text-lg">Atualizar abrigo</h1>

			<ShelterForm
				mode="update"
				defaultValues={{
					shelter: {
						id: params.id,
						name: shelter.name,
						capacity: shelter.capacity || null,
						shelteredPeople: shelter.shelteredPeople || null,
						imageUrl: shelter.imageUrl,
						type: shelter.type,
						address: {
							street: shelter.address?.street || "",
							number: shelter.address?.number || "",
							district: shelter.address?.district || "",
							referencePoint: shelter.address?.referencePoint || "",
							state: shelter.address?.state || "",
							city: shelter.address?.city || "",
							zipCode: shelter.address?.zipCode || "",
							mapUrl: shelter.address?.mapUrl || "",
						}
					}
				}}
			/>
		</div>
	);
}
