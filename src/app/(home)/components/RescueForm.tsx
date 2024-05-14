"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { NumericFormat, PatternFormat } from "react-number-format";

import { capitalizeWords } from "@/helpers/capitalizeWords";
import { createRescue } from "@/app/(home)/actions/createRescue";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormField,
	FormItem,
	FormControl,
	FormMessage,
} from "@/components/ui/form";

const regex = {
	onlyAllowsNumbers: /^\(\d{2}\) \d{5}-\d{4}$/,
	onlyNumbers: /\D/g,
	integerPositive: /^[1-9]\d*$/,
};

const formSchema = z.object({
	contactInfo: z.object({
		name: z
			.string()
			.trim()
			.min(1, "Nome do contato é obrigatório")
			.transform((value) => capitalizeWords(value)),
		phoneNumber: z
			.string()
			.trim()
			.length(15, "Número de telefone inválido")
			.regex(regex.onlyAllowsNumbers, "Número de telefone inválido")
			.transform((str) => str.replace(regex.onlyNumbers, "")),
	}),
	peopleQuantity: z
		.string()
		.trim()
		.min(1, "Número de pessoas é obrigatório")
		.regex(regex.integerPositive, "Digite apenas números"),
	address: z.object({
		street: z
			.string()
			.trim()
			.min(1, "Nome da rua é obrigatório")
			.transform((value) => capitalizeWords(value)),
		number: z.string().trim().min(1, "Número da casa é obrigatório"),
		district: z
			.string()
			.trim()
			.min(1, "Bairro é obrigatório")
			.transform((value) => capitalizeWords(value)),
		referencePoint: z
			.string()
			.trim()
			.min(0)
			.transform((value) => value.charAt(0).toUpperCase() + value.slice(1)),
		state: z.string().trim().toUpperCase().length(2, "Informe apenas a UF"),
		city: z
			.string()
			.trim()
			.min(1, "Cidade é obrigatória")
			.transform((value) => capitalizeWords(value)),
	}),
	note: z.string().trim().min(0),
});

export function RescueForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			contactInfo: {
				name: "",
				phoneNumber: "",
			},
			peopleQuantity: "",
			address: {
				street: "",
				number: "",
				district: "",
				referencePoint: "",
				state: "RS",
				city: "",
			},
			note: "",
		},
	});

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		const result = await createRescue(data);

		if (result) {
			form.reset();

			toast.success("Seu pedido de resgate foi registrado com sucesso!", {
				position: "top-center",
				duration: 3500,
			});
		} else {
			toast.error("Falha ao criar pedido de resgate. Tente novamente.", {
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
					<h2 className="font-medium">Informações do contato</h2>

					<fieldset className="grid grid-cols-1 gap-3 lg:grid-cols-3">
						<FormField
							control={form.control}
							name="contactInfo.name"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											type="text"
											placeholder="Nome do contato"
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
							name="contactInfo.phoneNumber"
							render={({ field: { onChange, name, value, ref, onBlur } }) => (
								<FormItem>
									<FormControl>
										<PatternFormat
											format="(##) #####-####"
											getInputRef={ref}
											onChange={onChange}
											name={name}
											value={value}
											onBlur={onBlur}
											autoComplete="tel-national"
											defaultValue={""}
											customInput={Input}
											placeholder="(99) 99999-9999"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="peopleQuantity"
							render={({ field: { onChange, name, value, ref, onBlur } }) => (
								<FormItem>
									<FormControl>
										<NumericFormat
											onChange={onChange}
											name={name}
											value={value}
											getInputRef={ref}
											onBlur={onBlur}
											allowNegative={false}
											decimalScale={0}
											thousandSeparator={false}
											defaultValue={""}
											customInput={Input}
											type="tel"
											placeholder="Quantidade de pessoas"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</fieldset>
				</div>

				<div className="flex flex-col gap-2">
					<h2 className="font-medium">Endereço para resgate</h2>

					<fieldset className="grid grid-cols-1 gap-3 lg:grid-cols-2">
						<FormField
							control={form.control}
							name="address.street"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											type="text"
											placeholder="Nome da rua"
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
											placeholder="Número da casa"
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
										<Input
											type="text"
											placeholder="Bairro"
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
											placeholder="Estado"
											maxLength={2}
											className="uppercase"
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

				<div className="flex flex-col gap-2">
					<h2 className="font-medium">Observações</h2>

					<fieldset>
						<FormField
							control={form.control}
							name="note"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Textarea
											placeholder="Digite uma observação (se houver)"
											className="h-[200px] resize-none"
											maxLength={500}
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
							Aguarde...
						</>
					) : (
						<>
							Pedir resgate
						</>
					)}
				</Button>
			</form>
		</Form>
	);
}
