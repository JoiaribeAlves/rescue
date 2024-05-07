"use server";

import { db } from "@/lib/db";
import { IShelter } from "@/interfaces";

export async function getSheltersList(cityName: string): Promise<IShelter[] | null> {
	try {
		const sheltersList = await db.shelter.findMany({
			where: {
				address: {
					city: {
						contains: cityName,
						mode: "insensitive",
					},
				},
			},
			select: {
				name: true,
				address: {
					select: {
						street: true,
						number: true,
						district: true,
						referencePoint: true,
						state: true,
						city: true,
					},
				},
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		return sheltersList;
	} catch (error) {
		console.error(error);
		return null;
	} finally {
		await db.$disconnect();
	}
}
