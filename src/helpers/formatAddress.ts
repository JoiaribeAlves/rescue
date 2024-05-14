import { IAddress } from "@/interfaces";

export function formatAddress(props: IAddress | null) {
	if (!props) return "";

	if (props.referencePoint) {
		return `${props.street}, ${props.number}, ${props.district}, ${props.referencePoint}, ${props.city}-${props.state}`;
	}

	return `${props.street}, ${props.number}, ${props.district}, ${props.city}-${props.state}`;
}
