"use server";

import { db } from "@/lib/db";
import { IWater } from "@/interfaces";

export async function getWaterList(cityName: string): Promise<IWater[] | null> {
	try {
		const watersList = await db.water.findMany({
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

		return watersList;
	} catch (error) {
		console.error(error);
		return null;
	} finally {
		await db.$disconnect();
	}
}
