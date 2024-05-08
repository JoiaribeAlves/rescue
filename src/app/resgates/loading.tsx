import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="py-8 px-4 lg:px-8 flex flex-col gap-6">
			<Skeleton className="font-semibold text-lg w-52 h-7" />

			<Skeleton className="flex flex-col lg:flex-row gap-4 mb-3 bg-muted p-3 rounded-md">
				<Skeleton className="grow h-11 bg-white" />
				<Skeleton className="grow h-11 bg-white" />
				<Skeleton className="grow h-11 bg-white" />
			</Skeleton>

			<Skeleton className="grid gap-4 grid-cols-1 lg:grid-cols-4">
				{Array.from({ length: 4 }).map((_, index) => (
					<li
						key={index}
						className="p-3 rounded-md shadow-lg bg-white flex flex-col gap-3"
					>
						<div className="flex flex-col gap-2 grow">
							<div className="font-medium">
								<Skeleton className="font-medium h-5" />
							</div>
							<div className="flex flex-col gap-1">
								<Skeleton className="font-medium h-5 w-20" />
								<Skeleton className="text-sm opacity-75 h-5" />
							</div>
							<div >
								<Skeleton className="font-medium h-5 " />
							</div>
							<div className="flex flex-col gap-1">
								<Skeleton className="font-medium h-5 w-28" />
								<Skeleton className="text-sm opacity-75 h-10" />
							</div>
						</div>
						<Skeleton className="h-11 bg-primary/20 w-full" />
					</li>
				))}
			</Skeleton>
		</div >
	);
}




