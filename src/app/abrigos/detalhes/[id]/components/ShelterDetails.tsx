import Image from "next/image";
import { notFound } from "next/navigation";

import { calculatePercentage } from "@/helpers/calculatePercentage";
import { formatAddress } from "@/helpers/formatAddress";
import { getShelterById } from "@/app/abrigos/actions/getShelterById";
import { ProgressBar } from "@/app/abrigos/components/ProgressBar";

interface IShelterDetails {
	id: string;
}

export async function ShelterDetails({ id }: IShelterDetails) {
	const shelter = await getShelterById(id);

	if (!shelter) {
		notFound();
	}

	return (
		<div className="grid lg:px-8 lg:grid-cols-2">
			<div className="relative h-[200px] lg:h-[300px] bg-muted lg:rounded-md overflow-hidden">
				<Image
					src={shelter.imageUrl ?? "/bandeira-rs.png"}
					alt={shelter.name}
					fill
					sizes="100%"
					className="object-cover"
				/>
			</div>

			<div className="px-4 pt-4 flex flex-col gap-2 lg:pt-0">
				<h1 className="font-semibold text-xl">
					{shelter.name}
				</h1>

				<p><strong className="font-semibold">Responsável:</strong> Não informado</p>

				<p><strong className="font-semibold">Chave PIX:</strong> Não informada</p>

				<p><strong className="font-semibold">Endereço:</strong> {formatAddress(shelter.address)}</p>

				<div className="flex items-center gap-1">
					<strong className="font-semibold">Lotação:</strong>
					{shelter.capacity && shelter.shelteredPeople ? (
						<ProgressBar
							capacity={shelter.capacity}
							shelteredPeople={shelter.shelteredPeople}
							percentage={calculatePercentage({
								capacity: shelter.capacity,
								shelteredPeople: shelter.shelteredPeople
							})}
						/>
					) : (
						<p>Não informada</p>
					)}
				</div>
			</div>
		</div>
	);
}
