interface ICalculatePercentage {
	capacity: number;
	shelteredPeople: number;
}

export function calculatePercentage({ capacity, shelteredPeople }: ICalculatePercentage) {
	const result = (shelteredPeople / capacity) * 100;

	return Math.round(result);
}
