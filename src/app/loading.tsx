import { LoaderCircleIcon } from "lucide-react";

export default function Loading() {
	return (
		<div className="flex w-full flex-1 items-center justify-center">
			<LoaderCircleIcon
				width={24}
				height={24}
				className="animate-spin text-primary"
			/>
		</div>
	);
}
