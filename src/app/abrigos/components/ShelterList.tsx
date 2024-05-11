"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FilterIcon, Loader2Icon } from "lucide-react";

import { getShelterList } from "../actions/getShelterList";
import { IShelter } from "@/interfaces";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage
} from "@/components/ui/form";
import { ShelterItem } from "./ShelterItem";

const formSchema = z.object({
	cityName: z.string().trim().min(1, "Nome da cidade é obrigatório"),
	district: z.string().trim().min(0),
});

export function ShelterList() {
	const [shelters, setShelters] = useState<IShelter[]>([]);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			cityName: "",
			district: "",
		},
	});

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		const shelters = await getShelterList(data);

		if (!shelters) return null;

		setShelters(shelters);
	};

	return (
		<>
			<div className="flex flex-col gap-3 bg-muted p-3 rounded-md">
				<div className="flex items-center gap-1">
					<FilterIcon size={16} />

					<h2 className="font-semibold text-sm">Filtros</h2>
				</div>

				<Form {...form}>
					<form
						className="bg-muted flex flex-col gap-3 lg:flex-row"
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<FormField
							control={form.control}
							name="cityName"
							render={({ field }) => (
								<FormItem className="grow">
									<FormControl>
										<Input
											type="text"
											placeholder="Pesquise abrigos na sua cidade"
											{...field}
										/>
									</FormControl>
									<FormMessage className="text-xs" />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="district"
							render={({ field }) => (
								<FormItem className="grow">
									<FormControl>
										<Input
											type="text"
											placeholder="Nome do bairro (deixe em branco para mostrar todos)"
											{...field}
										/>
									</FormControl>
									<FormMessage className="text-xs" />
								</FormItem>
							)}
						/>

						<Button
							type="submit"
							disabled={form.formState.isSubmitting}
							className="w-full lg:w-[140px] h-fit"
						>
							{form.formState.isSubmitting ? (
								<>
									<Loader2Icon className="h-4 w-4 mr-1 animate-spin" />
									Pesquisando
								</>
							) : (
								<>
									Pesquisar
								</>
							)}
						</Button>
					</form>
				</Form>
			</div>

			<ul className="grid gap-3 grid-cols-1 lg:grid-cols-4">
				<ShelterItem shelters={shelters} />
			</ul>
		</>
	);
}
