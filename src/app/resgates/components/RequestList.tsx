"use client";

import { useState } from "react";
import Link from "next/link";
import { Prisma } from "@prisma/client";

import { phoneMask } from "@/helpers/phoneMask";
import { Input } from "@/components/ui/input";
import { CompleteRescueButton } from "./CompleteRescueButton";

interface IRequestList {
	requestList: Prisma.RescueGetPayload<{
		include: {
			addresses: true,
		}
	}>[];
}

export function RequestList({ requestList }: IRequestList) {
	const [cityFilter, setCityFilter] = useState("");
	const [streetFilter, setStreetFilter] = useState("");
	const [districtFilter, setDistrictFilter] = useState("");

	const filteredList = requestList.filter(request => {
		return (
			(cityFilter === "" || request.addresses?.city.toLowerCase().includes(cityFilter.toLowerCase())) &&
			(streetFilter === "" || request.addresses?.street.toLowerCase().includes(streetFilter.toLowerCase())) &&
			(districtFilter === "" || request.addresses?.district.toLowerCase().includes(districtFilter.toLowerCase()))
		);
	});

	return (
		<>
			<div className="flex flex-col lg:flex-row gap-4 mb-3 bg-muted p-3 rounded-md">
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

			{filteredList.length === 0 ? (
				<h2 className="font-semibold text-sm opacity-75">
					Sua busca não retornou dados
				</h2>
			) : (
				<ul className="grid gap-4 grid-cols-1 lg:grid-cols-4">
					{filteredList.map(request => (
						<li
							key={request.id}
							className="p-3 rounded-md shadow-lg bg-white flex flex-col gap-3"
						>
							<div className="flex flex-col gap-2 grow">
								<div className="font-medium">
									<strong className="font-medium">Telefone: </strong>
									<Link
										href={`https://wa.me/55${request.phoneNumber}`}
										className='text-sm opacity-75'
									>
										{phoneMask(request.phoneNumber)}
									</Link>
								</div>

								<div>
									<strong className="font-medium">Endereço:</strong>
									<p className='text-sm opacity-75'>{request.addresses?.street}, {request.addresses?.number} - {request.addresses?.district}, {request.addresses?.city}, {request.addresses?.state}</p>
								</div>

								<div>
									<strong className="font-medium">Quantidade de pessoas: </strong>
									<p className='text-sm opacity-75 inline'>{request.peopleQuantity}</p>
								</div>

								{request.note && (
									<div>
										<strong className="font-medium">Observações:</strong>
										<p className='text-sm opacity-75'>
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
