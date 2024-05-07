import Link from "next/link";

export function Footer() {
	return (
		<footer className=" flex justify-between bg-primary text-primary-foreground p-4 lg:px-8">
			<div>
				<h4 className="font-medium">Páginas</h4>

				<ul className="pl-1">
					<li>
						<Link href="/" className="text-xs hover:underline">
							Solicitar resgate
						</Link>
					</li>

					<li>
						<Link href="/resgates" className="text-xs hover:underline">
							Solicitações de resgate
						</Link>
					</li>

					<li>
						<Link href="/abrigos" className="text-xs hover:underline">
							Abrigos
						</Link>
					</li>

					<li>
						<Link href="/agua" className="text-xs hover:underline">
							Água Potável
						</Link>
					</li>

					<li>
						<Link href="/desaparecidos" className="text-xs hover:underline">
							Desaparecidos
						</Link>
					</li>
				</ul>
			</div>

			<div>
				<h4 className="font-medium">Telefones úteis</h4>

				<ul className="pl-1">
					<li>
						<Link href="tel:199" className="text-xs hover:underline">Defesa Civil (199)</Link>
					</li>

					<li>
						<Link href="tel:193" className="text-xs hover:underline">Bombeiros (193)</Link>
					</li>
				</ul>
			</div>
		</footer>
	);
}
