"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FilterIcon, Loader2Icon } from "lucide-react";

import { getWaterList } from "../actions/getWaterList";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage
} from "@/components/ui/form";
import { WaterItem } from "./WaterItem";
import { IWater } from "@/interfaces";

const formSchema = z.object({
	cityName: z.string().min(1, "Nome da cidade é obrigatório"),
});

export function WaterList() {
	const [notFound, setNotFound] = useState(false);
	const [water, setWater] = useState<IWater[]>([]);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			cityName: "",
		},
	});

	const onSubmit = async ({ cityName }: z.infer<typeof formSchema>) => {
		const water = await getWaterList(cityName);

		if (!water) return null;

		if (water.length === 0) {
			setNotFound(true);
		} else {
			setNotFound(false);
		}

		setWater(water);
	};

	return (
		<>
			<div className="flex flex-col gap-3 bg-muted p-3 rounded-md">
				<div className="flex items-center gap-1">
					<FilterIcon size={16} />

					<h2 className="font-semibold text-sm">Filtro</h2>
				</div>

				<Form {...form}>
					<form
						className="flex flex-col gap-3 lg:flex-row"
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
											placeholder="Pesquise locais com água potável na sua cidade"
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

			{notFound ? (
				<h2 className="font-semibold text-sm opacity-75">
					Nenhum local com água potável foi encontrado
				</h2>
			) : (
				<ul className="grid gap-4 grid-cols-1 lg:grid-cols-4">
					<WaterItem waters={water} />
				</ul>
			)}
		</>
	);
}
