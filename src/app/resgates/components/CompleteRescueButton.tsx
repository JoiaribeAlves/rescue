"use client";

import { toast } from "sonner";

import { completeRescue } from "../actions/completeRescue";
import { Button } from "@/components/ui/button";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ICompleteRescueButton {
	rescueId: string;
	disabled: boolean;
}

export function CompleteRescueButton({ rescueId, disabled }: ICompleteRescueButton) {
	async function handleCompleteRescue() {
		const result = await completeRescue(rescueId);

		if (result) {
			toast.success("Pedido de resgate marcado como concluído!", {
				position: "top-center",
				duration: 3500,
			});
		} else {
			toast.error("Falha ao marcar pedido de resgate como concluído. Tente novamente.", {
				position: "top-center",
				duration: 3500,
			});
		}
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					variant="default"
					className="w-full"
					disabled={disabled}
				>
					Marcar como resgatado
				</Button>
			</AlertDialogTrigger>

			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Você realmente deseja marcar este resgate como concluído?
					</AlertDialogTitle>

					<AlertDialogDescription>
						Esta ação não pode ser desfeita
					</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter>
					<AlertDialogCancel>
						Voltar
					</AlertDialogCancel>

					<AlertDialogAction onClick={handleCompleteRescue}>
						Continuar
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
