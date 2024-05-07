"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

import { createWater } from "../actions/createWater";
import {
	Form,
	FormField,
	FormItem,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
	name: z.string().min(1, "Nome do abrigo é obrigatório"),
	address: z.object({
		street: z.string().min(1, "Nome da rua/avenida é obrigatória"),
		number: z.string().min(1, "Número é obrigatório"),
		district: z.string().min(1, "Bairro é obrigatório"),
		referencePoint: z.string().min(0),
		city: z.string().min(1, "Cidade é obrigatória"),
		state: z.string().length(2, "Informe apenas a UF"),
	})
});

export function CreateWaterForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			address: {
				street: "",
				number: "",
				district: "",
				referencePoint: "",
				state: "RS",
				city: "",
			}
		},
	});

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		const result = await createWater(data);

		if (result) {
			form.reset();

			toast.success("Local com Água Potável criado com sucesso!", {
				position: "top-center",
				duration: 3500,
			});
		} else {
			toast.error("Falha ao criar local com água potável. Tente novamente.", {
				position: "top-center",
				duration: 3500,
			});
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="bg-muted flex flex-col gap-6 rounded-lg p-3"
			>
				<div className="flex flex-col gap-2">
					<h2 className="font-medium">Nome do local com água potável</h2>

					<fieldset>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											type="text"
											placeholder="Ex: Ginásio poliesportivo"
											className="capitalize"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</fieldset>
				</div>

				<div className="flex flex-col gap-2">
					<h2 className="font-medium">Endereço</h2>

					<fieldset className="grid grid-cols-1 gap-3 lg:grid-cols-2">
						<FormField
							control={form.control}
							name="address.street"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											type="text"
											placeholder="Nome da rua/avenida"
											className="capitalize"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="address.number"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											type="number"
											placeholder="Número"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="address.district"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input type="text" placeholder="Bairro" className="capitalize" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="address.referencePoint"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											type="text"
											placeholder="Ponto de referência"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="address.state"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											type="text"
											placeholder="UF"
											className="uppercase"
											maxLength={2}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="address.city"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											type="text"
											placeholder="Cidade"
											className="capitalize"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</fieldset>
				</div>

				<Button type="submit" disabled={form.formState.isSubmitting}>
					{form.formState.isSubmitting ? (
						<>
							<Loader2Icon className="h-4 w-4 mr-1 animate-spin" />
							Cadastrando
						</>
					) : (
						<>
							Cadastrar local com água potável
						</>
					)}
				</Button>
			</form>
		</Form>
	);
}
