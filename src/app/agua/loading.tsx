import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="py-8 px-4 lg:px-8 flex flex-col gap-6">
			<Skeleton className="font-semibold text-lg lg:w-96 sm:w-80 h-7" />
			<Skeleton className="lg:w-[40rem] sm:w-80 h-7" />
			<Skeleton
				className="bg-muted flex flex-col gap-4 lg:flex-row rounded-md p-3"
			>
				<Skeleton className="w-full h-11 bg-white" />
				<Skeleton
					className="w-full lg:w-[140px] h-11 bg-primary/20"
				>
				</Skeleton>
			</Skeleton>
		</div>
	);
}
