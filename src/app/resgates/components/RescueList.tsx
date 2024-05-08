"use client";

import { useState } from "react";
import Link from "next/link";
import { Prisma } from "@prisma/client";

import { phoneMask } from "@/helpers/phoneMask";
import { Input } from "@/components/ui/input";
import { CompleteRescueButton } from "./CompleteRescueButton";
import { FilterIcon } from "lucide-react";

interface IRescueList {
	rescueList: Prisma.RescueGetPayload<{
		include: {
			address: true,
		}
	}>[];
}

export function RescueList({ rescueList }: IRescueList) {
	const [cityFilter, setCityFilter] = useState("");
	const [streetFilter, setStreetFilter] = useState("");
	const [districtFilter, setDistrictFilter] = useState("");

	const filteredList = rescueList.filter(request => {
		return (
			(cityFilter === "" || request.address?.city.toLowerCase().includes(cityFilter.toLowerCase())) &&
			(streetFilter === "" || request.address?.street.toLowerCase().includes(streetFilter.toLowerCase())) &&
			(districtFilter === "" || request.address?.district.toLowerCase().includes(districtFilter.toLowerCase()))
		);
	});

	return (
		<>
			<div className="flex flex-col gap-3 bg-muted p-3 rounded-md">
				<div className="flex items-center gap-1">
					<FilterIcon size={16} />

					<h2 className="font-semibold text-sm">Filtros</h2>
				</div>

				<div className="bg-muted flex flex-col gap-3 lg:flex-row">
					<div className="grow">
						<Input
							type="text"
							placeholder="Filtrar por Cidade"
							className="p-3 outline-none rounded-md"
							value={cityFilter}
							onChange={(e) => setCityFilter(e.target.value)}
						/>
					</div>

					<div className="grow">
						<Input
							type="text"
							placeholder="Filtrar por Rua"
							className="p-3 outline-none rounded-md grow"
							value={streetFilter}
							onChange={(e) => setStreetFilter(e.target.value)}
						/>
					</div>

					<div className="grow">
						<Input
							type="text"
							placeholder="Filtrar por Bairro"
							className="p-3 outline-none rounded-md grow"
							value={districtFilter}
							onChange={(e) => setDistrictFilter(e.target.value)}
						/>
					</div>
				</div>
			</div>

			{filteredList.length === 0 ? (
				<h2 className="font-semibold text-sm opacity-75">
					Sua busca não retornou dados
				</h2>
			) : (
				<ul className="grid gap-3 grid-cols-1 lg:grid-cols-4">
					{filteredList.map(request => (
						<li
							key={request.id}
							className="p-3 rounded-md shadow-lg bg-white flex flex-col gap-3"
						>
							<div className="flex flex-col gap-2 grow">
								<div>
									<strong className="font-medium">Nome: </strong>
									<p className="inline text-opacity-75 text-sm">
										{request.contactName}
									</p>
								</div>

								<div className="font-medium">
									<strong className="font-medium">Telefone: </strong>
									<Link
										href={`https://wa.me/55${request.phoneNumber}`}
										className="text-sm opacity-75 text-primary"
									>
										{phoneMask(request.phoneNumber)}
									</Link>
								</div>

								<div>
									<strong className="font-medium">Endereço:</strong>
									<p className="text-sm opacity-75">{request.address?.street}, {request.address?.number} - {request.address?.district}, {request.address?.city}, {request.address?.state}</p>
								</div>

								<div>
									<strong className="font-medium">Quantidade de pessoas: </strong>
									<p className="text-sm opacity-75 inline">{request.peopleQuantity}</p>
								</div>

								{request.note && (
									<div>
										<strong className="font-medium">Observações:</strong>
										<p className="text-sm opacity-75">
											{request.note}
										</p>
									</div>
								)}
							</div>

							<CompleteRescueButton
								rescueId={request.id}
								disabled={request.accomplished}
							/>
						</li>
					))}
				</ul>
			)}
		</>
	);
}
