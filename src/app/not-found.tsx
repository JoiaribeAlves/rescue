import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex flex-1 items-center justify-center ">
			<div className="flex flex-col w-fit gap-5 items-center justify-center ">
				<h2 className="text-3xl lg:text-4xl font-semibold text-center">Oooops, página não encontrada!</h2>
				<Link href="/" className="">
					<Button className="w-full">Voltar para tela inicial</Button></Link>
			</div>
		</div>
	);
}
