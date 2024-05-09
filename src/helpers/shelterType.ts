/* eslint-disable */

export function shelterType(type: string) {
	switch (type) {
		case "Human":
			return "Aceita somente pessoas";

		case "Pets":
			return "Aceita somente animais";

		default:
			return "Aceita pessoas e animais";
	}
}
