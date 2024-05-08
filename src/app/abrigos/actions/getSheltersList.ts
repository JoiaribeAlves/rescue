"use server";

import { db } from "@/lib/db";
import { IShelter } from "@/interfaces";

interface IGetSheltersList {
	cityName: string;
	district: string;
}

export async function getSheltersList(data: IGetSheltersList): Promise<IShelter[] | null> {
	let whereCondition = {};

	if ((data.cityName.length > 0) && (data.district.length > 0)) {
		console.log(data.cityName, data.district);

		whereCondition = {
			address: {
				city: {
					contains: data.cityName,
					mode: "insensitive",
				},
				district: {
					contains: data.district,
					mode: "insensitive",
				},
			},
		};
	} else if (data.cityName.length > 0) {
		console.log(data.cityName, data.district);

		whereCondition = {
			address: {
				city: {
					contains: data.cityName,
					mode: "insensitive",
				},
			},
		};
	}

	try {
		const sheltersList = await db.shelter.findMany({
			where: whereCondition,
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
