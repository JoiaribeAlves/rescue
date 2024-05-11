"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

import { createShelter } from "../actions/createShelter";
import { updateShelter } from "../actions/updateShelter";
import { IShelter } from "@/interfaces";
import {
	Form,
	FormField,
	FormItem,
	FormControl,
	FormMessage,
	FormLabel,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
	name: z.string().trim().min(1, "Nome do abrigo é obrigatório"),
	type: z.string().trim().min(1, "Escolha uma opção"),
	capacity: z.string().trim().min(0),
	shelteredPeople: z.string().trim().min(0),
	imageUrl: z.string().trim().min(0),
	address: z.object({
		zipCode: z.string().trim().min(0),
		street: z
			.string().trim().min(1, "Nome da rua/avenida é obrigatória"),
		number: z
			.string().trim().min(1, "Número é obrigatório"),
		district: z
			.string().trim().min(1, "Bairro é obrigatório"),
		referencePoint: z.string().trim().min(0),
		city: z
			.string().trim().min(1, "Cidade é obrigatória"),
		state: z
			.string().trim().toUpperCase().length(2, "Informe apenas a UF"),
		mapUrl: z.string().trim().min(0),
	})
});

interface IShelterForm {
	mode: "create" | "update";
	defaultValues?: {
		shelter: IShelter;
	}
}

export function ShelterForm({ mode, defaultValues }: IShelterForm) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: defaultValues?.shelter.name ?? "",
			capacity: String(defaultValues?.shelter.capacity || "") || undefined,
			shelteredPeople: String(defaultValues?.shelter.shelteredPeople || "") || undefined,
			imageUrl: defaultValues?.shelter.imageUrl ?? "",
			type: defaultValues?.shelter.type ?? "People",
			address: {
				zipCode: defaultValues?.shelter.address?.zipCode ?? "",
				street: defaultValues?.shelter.address?.street ?? "",
				number: defaultValues?.shelter.address?.number ?? "",
				district: defaultValues?.shelter.address?.district ?? "",
				referencePoint: defaultValues?.shelter.address?.referencePoint ?? "",
				state: defaultValues?.shelter.address?.state ?? "RS",
				city: defaultValues?.shelter.address?.city ?? "",
				mapUrl: defaultValues?.shelter.address?.mapUrl ?? "",
			},
		},
	});

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		if (mode === "create") {
			const result = await createShelter({
				shelter: {
					...data,
					id: "",
					capacity: Number(data.capacity),
					shelteredPeople: Number(data.shelteredPeople),
				},
			});

			if (result) {
				form.reset();
				// @ts-ignore
				form.setValue("capacity", "");
				// @ts-ignore
				form.setValue("shelteredPeople", "");

				toast.success("Abrigo cadastrado com sucesso", {
					position: "top-center",
					duration: 3500,
				});
			} else {
				toast.error("Falha ao cadastrar abrigo. Tente novamente", {
					position: "top-center",
					duration: 3500,
				});
			}
		} else {
			const result = await updateShelter({
				shelter: {
					...data,
					id: defaultValues?.shelter.id ?? "",
					capacity: Number(data.capacity),
					shelteredPeople: Number(data.shelteredPeople),
				}
			});

			if (result) {
				toast.success("Abrigo atualizado com sucesso", {
					position: "top-center",
					duration: 3500,
				});
			} else {
				toast.error("Falha ao atualizar abrigo. Tente novamente", {
					position: "top-center",
					duration: 3500,
				});
			}
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="bg-muted flex flex-col gap-6 rounded-lg p-3"
			>
				<fieldset className="pt-2 grid grid-cols-1 gap-3 lg:grid-cols-3">
					<legend className="font-medium">Dados do abrigo</legend>

					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										type="text"
										placeholder="Nome do abrigo"
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
						name="capacity"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										type="text"
										placeholder="Quantas pessoas/animais o abrigo comporta?"
										inputMode="numeric"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="shelteredPeople"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										type="text"
										placeholder="Quantas pessoas/animais estão abrigadas?"
										inputMode="numeric"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="imageUrl"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										type="text"
										placeholder="URL da imagem do abrigo"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="type"
						render={({ field }) => (
							<FormItem className="lg:col-span-2">
								<FormControl>
									<RadioGroup
										onValueChange={field.onChange}
										defaultValue={field.value}
										className="lg:flex lg:gap-3"
									>
										<FormItem className="flex items-end gap-1">
											<FormControl>
												<RadioGroupItem defaultValue="People" value="People" />
											</FormControl>
											<FormLabel className="font-normal">
												Abrigo para pessoas
											</FormLabel>
										</FormItem>
										<FormItem className="flex items-end gap-1">
											<FormControl>
												<RadioGroupItem value="Pets" />
											</FormControl>
											<FormLabel className="font-normal">
												Abrigo para animais
											</FormLabel>
										</FormItem>
										<FormItem className="flex items-end gap-1">
											<FormControl>
												<RadioGroupItem value="Hybrid" />
											</FormControl>
											<FormLabel className="font-normal">Abrigo para pessoas e animais</FormLabel>
										</FormItem>
									</RadioGroup>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</fieldset>

				<fieldset className="pt-2 grid grid-cols-1 gap-3 lg:grid-cols-3">
					<legend className="font-medium">Endereço do abrigo</legend>

					<FormField
						control={form.control}
						name="address.zipCode"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										type="text"
										maxLength={8}
										disabled
										placeholder="CEP (apenas números)"
										inputMode="numeric"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

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
										type="text"
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

					<FormField
						control={form.control}
						name="address.mapUrl"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										type="text"
										placeholder="URL do google maps"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</fieldset>

				<Button type="submit" disabled={form.formState.isSubmitting}>
					{form.formState.isSubmitting ? (
						<>
							<Loader2Icon className="h-4 w-4 mr-1 animate-spin" />
							{mode === "create" ? "Cadastrando" : "Atualizando"}
						</>
					) : (
						<>
							{mode === "create" ? "Cadastrar abrigo" : "Atualizar abrigo"}
						</>
					)}
				</Button>
			</form>
		</Form>
	);
}
