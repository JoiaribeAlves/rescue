import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

export function ShelterSupplies() {
	return (
		<Accordion type="single" collapsible className="grid gap-3 px-4 lg:px-8">
			<AccordionItem value="item-1" className="bg-red-100 rounded-md px-3">
				<AccordionTrigger>Suprimentos em estado crítico</AccordionTrigger>
				<AccordionContent>
					Não há dados para apresentar
				</AccordionContent>
			</AccordionItem>

			<AccordionItem value="item-2" className="bg-yellow-100 rounded-md px-3">
				<AccordionTrigger>Suprimentos em estado de alerta</AccordionTrigger>
				<AccordionContent>
					Não há dados para apresentar
				</AccordionContent>
			</AccordionItem>

			<AccordionItem value="item-3" className="bg-green-100 rounded-md px-3">
				<AccordionTrigger>Suprimentos em estado favorável</AccordionTrigger>
				<AccordionContent>
					Não há dados para apresentar
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
