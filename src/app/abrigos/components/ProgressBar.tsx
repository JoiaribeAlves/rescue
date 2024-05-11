interface IProgressBar {
	capacity: number;
	shelteredPeople: number;
	percentage: number;
}

export function ProgressBar({ capacity, percentage, shelteredPeople }: IProgressBar) {
	return (
		<div className="relative w-full h-[14px] bg-primary/25 rounded-full overflow-hidden">
			<div
				className="absolute top-0 left-0 bg-primary text-[0.625rem] text-center h-full"
				style={{ width: `${percentage}%` }}
			/>
			<span className="absolute top-1/2 left-1/2 text-foreground font-medium text-xs -translate-x-1/2 -translate-y-1/2">
				{`${shelteredPeople}/${capacity}`}
			</span>
		</div>
	);
}
