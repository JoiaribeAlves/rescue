import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";

import { shelterType } from "@/helpers/shelterType";
import { calculatePercentage } from "@/helpers/calculatePercentage";
import { calculateLastUpdateDistance } from "@/helpers/calculateLastUpdateDistance";
import { IShelter } from "@/interfaces";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "./ProgressBar";

interface IShelterItem {
	shelters: IShelter[];
}

export function ShelterItem({ shelters }: IShelterItem) {
	if (shelters.length === 0) {
		return (
			<li>
				<h2 className="font-semibold text-sm opacity-75">
					Não há dados para apresentar
				</h2>
			</li>
		);
	}

	return (
		<>
			{shelters.map((shelter, index) => (
				<li
					key={index}
					className="p-3 rounded-md shadow-lg bg-white flex flex-col gap-3 text-sm"
				>
					<div className="flex flex-col gap-3 grow">
						<Badge
							variant="secondary"
							className="bg-[#fff3cd] text-[#745c16] hover:bg-[#fff3cd] justify-center"
						>
							{shelterType(shelter.type)}
						</Badge>

						<p><strong className="font-semibold">Nome:</strong> {shelter.name}</p>

						<p>
							<strong className="font-semibold">Endereço:</strong>{" "}
							{shelter.address?.street}{", "}
							{shelter.address?.number}{", "}
							{shelter.address?.district}
							{shelter.address?.referencePoint
								? `, ${shelter.address?.referencePoint}`
								: ""}
						</p>

						<p><strong className="font-semibold">Cidade:</strong> {shelter.address?.city}</p>

						<p><strong className="font-semibold">Estado:</strong> {shelter.address?.state}</p>

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

						<p>
							<strong className="font-semibold">Atualizado há:</strong>{" "}
							{calculateLastUpdateDistance(shelter.updateddAt)}
						</p>

						<div className="text-right">
							<Link
								href={`/abrigos/detalhes/${shelter.id}`}
								className="inline-flex items-center gap-1 text-primary hover:underline">
								Ver detalhes
								<ChevronRightIcon size={14} />
							</Link>
						</div>
					</div>
				</li>
			))}
		</>
	);
}
