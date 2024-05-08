export interface IWater {
	name: string;
	address: {
		street: string;
		number: string;
		district: string;
		referencePoint: string | null;
		state: string;
		city: string;
	} | null;
}
