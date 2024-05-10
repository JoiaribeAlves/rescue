"use client";

import { useEffect } from "react";
import { RotateCwIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

interface IError {
	error: Error & { digest?: string }
	reset: () => void
}

export default function Error({ error, reset, }: IError) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="flex flex-col grow gap-3 items-center justify-center">
			<h1 className="text-2xl lg:text-3xl font-semibold text-center">
				Ah não! algo muito errado aconteceu
			</h1>

			<Button className="flex items-center gap-1" onClick={() => reset()}>
				<RotateCwIcon size={14} />
				Tentar novamente
			</Button>
		</div>
	);
}
