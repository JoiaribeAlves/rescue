"use server";

import { db } from "@/lib/db";
import { IAddress } from "@/interfaces/address";

interface ICreateShelter {
	name: string;
	type: string;
	address: IAddress;
}

export async function createShelter(data: ICreateShelter) {
	try {
		const shelter = await db.shelter.create({
			data: {
				name: data.name,
				type: data.type,
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
				shelterId: shelter.id,
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

