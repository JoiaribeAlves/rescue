"use server";

import { db } from "@/lib/db";

export async function getShelterById(shelterId: string) {
	try {
		const shelter = await db.shelter.findUnique({
			where: {
				id: shelterId,
			},
			select: {
				id: true,
				name: true,
				capacity: true,
				shelteredPeople: true,
				imageUrl: true,
				type: true,
				address: {
					select: {
						street: true,
						number: true,
						district: true,
						referencePoint: true,
						zipCode: true,
						city: true,
						state: true,
						mapUrl: true,
					},
				},
			},
		});

		return shelter;
	} catch (error) {
		console.error(error);
		return null;
	} finally {
		await db.$disconnect();
	}
}
