import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="py-8 px-4 lg:px-8 flex flex-col gap-6">
			<Skeleton className="font-semibold text-lg w-52 h-7" />
			<Skeleton className="w-96 h-7" />
			<Skeleton className="flex flex-col gap-2 bg-muted p-3 rounded-md">
				<div className="flex items-center gap-1">
					<Skeleton className="font-semibold text-sm w-24 h-7 bg-white" />
				</div>
				<Skeleton
					className="bg-muted flex flex-col gap-4 lg:flex-row rounded-md p-3"
				>
					<Skeleton className="w-full h-11 bg-white" />
					<Skeleton className="w-full h-11 bg-white" />
					<Skeleton className="w-full lg:w-[140px] h-11 bg-primary/20" />
				</Skeleton>
			</Skeleton>
		</div>
	);
}
