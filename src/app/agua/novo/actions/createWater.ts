"use server";

import { db } from "@/lib/db";
import { IAddress } from "@/interfaces/address";

interface ICreateWater {
	name: string;
	address: IAddress;
}

export async function createWater(data: ICreateWater) {
	try {
		const water = await db.water.create({
			data: {
				name: data.name,
			},
		});

		await db.address.create({
			data: {
				street: data.address.street,
				number: data.address.number,
				district: data.address.district,
				referencePoint: data.address.referencePoint,
				state: data.address.state,
				city: data.address.city,
				waterId: water.id,
			}
		});

		return true;
	} catch (error) {
		console.error(error);
		return false;
	} finally {
		await db.$disconnect();
	}
}

