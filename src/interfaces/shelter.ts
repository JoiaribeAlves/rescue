import { IAddress } from "@/interfaces/address";

export interface IShelter {
	id: string;
	name: string;
	type: string;
	capacity: number | null;
	shelteredPeople: number | null;
	imageUrl: string | null;
	address: IAddress | null;
	updateddAt: Date;
}
