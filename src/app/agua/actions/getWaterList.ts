"use server";

import { db } from "@/lib/db";
import { IWater } from "@/interfaces";

interface IGetWaterList {
	cityName: string;
	district: string;
}

export async function getWaterList(data: IGetWaterList): Promise<IWater[] | null> {
	let whereCondition = {};

	if (data.cityName && data.district.length) {
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
	} else if (data.cityName.length) {
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
		const watersList = await db.water.findMany({
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

		return watersList;
	} catch (error) {
		console.error(error);
		return null;
	} finally {
		await db.$disconnect();
	}
}
