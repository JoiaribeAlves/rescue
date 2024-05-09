import { shelterType } from "@/helpers/shelterType";
import { Badge } from "@/components/ui/badge";
import { IShelter } from "@/interfaces";

interface IShelterItem {
	shelters: IShelter[];
}

export function ShelterItem({ shelters }: IShelterItem) {
	return (
		<>
			{shelters.map((shelter, index) => (
				<li
					key={index}
					className="p-3 rounded-md shadow-lg bg-white flex flex-col gap-3"
				>
					<div className="flex items-center justify-between">
						<h3 className="font-bold">Abrigo: {index + 1}</h3>

						<Badge
							variant="secondary"
							className="bg-[#fff3cd] text-[#745c16] hover:bg-[#fff3cd]"
						>
							{shelterType(shelter.type)}
						</Badge>
					</div>

					<p><strong>Nome:</strong> {shelter.name}</p>

					<p>
						<strong>Endereço:</strong>{" "}
						{shelter.address?.street}{", "}
						{shelter.address?.number}{", "}
						{shelter.address?.district}{", "}
						{shelter.address?.referencePoint}
					</p>

					<p><strong>Cidade:</strong> {shelter.address?.city}</p>

					<p><strong>Estado:</strong> {shelter.address?.state}</p>
				</li>
			))}
		</>
	);
}
