import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="flex flex-col gap-6 pb-8 lg:pt-8">
			<div className="grid lg:px-8 lg:grid-cols-2">
				<Skeleton className="h-[200px] lg:h-[300px] lg:rounded-md" />
				<div className="px-4 pt-4 flex flex-col gap-2 lg:pt-0">
					<Skeleton className="h-4" />
					<Skeleton className="h-3 w-[250px]" />
					<Skeleton className="h-3 w-[170px]" />
					<Skeleton className="h-3 w-[200px]" />
				</div>
			</div>

			<div className="grid gap-3 px-4 lg:px-8">
				<Skeleton className="h-10" />
				<Skeleton className="h-10" />
				<Skeleton className="h-10" />
			</div>
		</div>
	);
}
