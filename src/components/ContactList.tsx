import Link from "next/link";

import { PHONES } from "@/constants/phones";

export function ContactList() {
	return (
		<p>Ajude a manter esta lista atualizada:{" "}
			<Link
				href={`https://wa.me/55${PHONES[0].phone}`}
				target="_blank"
				rel="noopener"
				className="font-medium text-primary"
			>
				fale com {PHONES[0].name}
			</Link>
			{" ou "}
			<Link
				href={`https://wa.me/55${PHONES[1].phone}`}
				target="_blank"
				rel="noopener"
				className="font-medium text-primary"
			>
				fale com {PHONES[1].name}
			</Link>
		</p>
	);
}
