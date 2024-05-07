import { IShelter } from "@/interfaces";

interface IShelterItem {
	shelters: IShelter[];
}

export function ShelterItem({ shelters }: IShelterItem) {
	return (
		<>
			{shelters.map((item, index) => (
				<li
					key={index}
					className="p-3 rounded-md shadow-lg bg-white flex flex-col gap-3"
				>
					<h3 className="font-bold">Abrigo: {index + 1}</h3>

					<p><strong>Nome:</strong> {item.name}</p>

					<p>
						<strong>Endereço:</strong>{" "}
						{item.address?.street}{", "}
						{item.address?.number}{", "}
						{item.address?.district}{", "}
						{item.address?.referencePoint}
					</p>

					<p><strong>Cidade:</strong> {item.address?.city}</p>

					<p><strong>Estado:</strong> {item.address?.state}</p>
				</li>
			))}
		</>
	);
}
