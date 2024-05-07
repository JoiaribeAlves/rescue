"use server";

import { db } from "@/lib/db";
import { IAddress } from "@/interfaces";

interface ICreateWater {
	waterName: string;
	address: IAddress;
}

export async function createWater(data: ICreateWater) {
	try {
		const water = await db.water.create({
			data: {
				name: data.waterName,
			},
		});

		await db.address.create({
			data: {
				street: data.address.street,
				number: data.address.number,
				district: data.address.district,
				city: data.address.city,
				state: data.address.state,
				waterId: water.id,
			},
		});

		return true;
	} catch (error) {
		console.log(error);
		return false;
	} finally {
		await db.$disconnect();
	}
}
