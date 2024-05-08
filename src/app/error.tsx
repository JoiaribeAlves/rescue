"use client";

import { useEffect } from "react";

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
		<div>
			<h2 className="opacity-75 text-lg">Algo deu errado!</h2>

			<Button
				onClick={() => reset()}
			>
				Tentar novamente
			</Button>
		</div>
	);
}
