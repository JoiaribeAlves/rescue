import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Solicitações de resgate - Enchentes RS",
	description: "Aqui você encontrará os endereços das pessoas que estão precisando ser resgatadas",
};

import { getRescues } from "./actions/getRescues";
import { RescueList } from "./components/RescueList";

export default async function Requests() {
	const rescues = await getRescues();

	if (!rescues) return null;

	if (rescues.length === 0) {
		return (
			<div className="py-8 px-4 lg:px-8">
				<h1 className="font-semibold text-lg">
					Nenhum pedido de resgate foi encontrado
				</h1>
			</div>
		);
	}

	return (
		<div className="py-8 px-4 lg:px-8 flex flex-col gap-6">
			<h1 className="font-semibold text-lg">Pedidos de resgate</h1>

			<RescueList rescueList={rescues} />
		</div >
	);
}
