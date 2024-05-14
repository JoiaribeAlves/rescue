export function capitalizeWords(text: string) {
	if (!text) return "";

	const words = text.split(" ");

	const capitalizedWords = words.map((word, index) => {
		if (index === 0) {
			return word.charAt(0).toUpperCase() + word.slice(1);
		} else {
			if (word.length > 3) {
				return word.charAt(0).toUpperCase() + word.slice(1);
			}
		}

		return word;
	});

	return capitalizedWords.join(" ");
}
