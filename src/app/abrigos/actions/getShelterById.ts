"use server";

import { IShelter } from "@/interfaces";

import { db } from "@/lib/db";

export async function getShelterById(shelterId: string) {
	try {
		const shelter: IShelter | null = await db.shelter.findUnique({
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
				updateddAt: true,
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
