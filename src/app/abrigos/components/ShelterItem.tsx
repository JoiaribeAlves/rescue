"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

import { shelterType } from "@/helpers/shelterType";
import { deleteShelter } from "../actions/deleteShelter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { IShelter } from "@/interfaces";

interface IShelterItem {
	shelters: IShelter[];
}

export function ShelterItem({ shelters }: IShelterItem) {
	const path = usePathname();
	const [code, setCode] = useState("");

	async function handleDeleteShelter(id: string, code: string) {
		const result = await deleteShelter({
			shelterId: id,
			verificationCode: code,
		});

		if (result) {
			toast.success("Abrigo deletado com sucesso!", {
				description: "Refaça a busca para atualizar a lista",
				position: "top-center",
				duration: 3500,
			});
		} else {
			toast.error("Falha ao deletar o abrigo. Tente novamente.", {
				position: "top-center",
				duration: 3500,
			});
		}
	}

	return (
		<>
			{shelters.map((shelter, index) => (
				<li
					key={index}
					className="p-3 rounded-md shadow-lg bg-white flex flex-col gap-3"
				>
					<div className="flex flex-col gap-3 grow">
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
					</div>

					{path === "/abrigos/deletar" && (
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button
									variant="destructive"
									className="w-full"
								>
									Deletar abrigo
								</Button>
							</AlertDialogTrigger>

							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>
										Você realmente deseja deletar este abrigo?
									</AlertDialogTitle>

									<AlertDialogDescription>
										Esta ação não pode ser desfeita
									</AlertDialogDescription>
								</AlertDialogHeader>

								<div>
									<Input
										type="text"
										placeholder="Informe o código de verificação"
										maxLength={6}
										onChange={(e) => setCode(e.target.value)}
									/>
								</div>

								<AlertDialogFooter>
									<AlertDialogCancel>
										Voltar
									</AlertDialogCancel>

									<AlertDialogAction
										className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
										disabled={code.length !== 6}
										onClick={() => handleDeleteShelter(shelter.id, code)}
									>
										Deletar abrigo
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					)}
				</li>
			))}
		</>
	);
}
