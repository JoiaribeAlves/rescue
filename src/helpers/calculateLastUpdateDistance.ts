import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export function calculateLastUpdateDistance(date: Date) {
	const lastUpdate = formatDistanceToNow(date, { locale: ptBR });

	return lastUpdate;
}
