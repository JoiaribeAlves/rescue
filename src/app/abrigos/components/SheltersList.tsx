"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";

import { getSheltersList } from "../actions/getSheltersList";
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
import { IShelter } from "@/interfaces";

const formSchema = z.object({
	cityName: z.string().min(1, "Nome da cidade é obrigatório"),
});

export function SheltersList() {
	const [notFound, setNotFound] = useState(false);
	const [shelters, setShelters] = useState<IShelter[]>([]);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			cityName: "",
		},
	});

	const onSubmit = async ({ cityName }: z.infer<typeof formSchema>) => {
		const shelters = await getSheltersList(cityName);

		if (!shelters) return null;

		if (shelters.length === 0) {
			setNotFound(true);
		}

		setShelters(shelters);
	};

	return (
		<>
			<Form {...form}>
				<form
					className="bg-muted flex flex-col gap-4 lg:flex-row rounded-md p-3"
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

			{notFound ? (
				<h2 className="font-semibold text-sm opacity-75">
					Nenhum abrigo foi encontrado
				</h2>
			) : (
				<ul className="grid gap-4 grid-cols-1 lg:grid-cols-4">
					<ShelterItem shelters={shelters} />
				</ul>
			)}
		</>
	);
}
