export interface IAddress {
	street: string;
	number: string;
	district: string;
	referencePoint: string | null;
	zipCode: string | null;
	city: string;
	state: string;
	mapUrl: string | null;
}
