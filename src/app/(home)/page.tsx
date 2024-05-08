import type { Metadata } from "next";

import { RescueForm } from "./components/RescueForm";

export const metadata: Metadata = {
	title: "Solicitar resgate - Enchentes RS",
	description: "Aqui você poderá pedir por resgate",
};

export default function Home() {
	return (
		<div className="py-8 px-4 lg:px-8 flex flex-col gap-6">
			<h1 className="font-semibold text-lg">Solicitar resgate</h1>

			<RescueForm />
		</div>
	);
}
