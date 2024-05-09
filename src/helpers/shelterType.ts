/* eslint-disable */

export function shelterType(type: string) {
	switch (type) {
		case "People":
			return "Abrigo para pessoas";

		case "Pets":
			return "Abrigo para animais";

		default:
			return "Abrigo para pessoas e animais";
	}
}
