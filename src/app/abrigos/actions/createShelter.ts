"use server";

import { db } from "@/lib/db";
import { IAddress } from "@/interfaces";

interface ICreateShelter {
	name: string;
	type: string;
	capacity: string;
	shelteredPeople: string;
	imageUrl: string;
	address: IAddress;
}

export async function createShelter(data: ICreateShelter) {
	try {
		const shelter = await db.shelter.create({
			data: {
				name: data.name,
				type: data.type,
				capacity: Number(data.capacity),
				shelteredPeople: Number(data.shelteredPeople),
				imageUrl: data.imageUrl,
			},
		});

		await db.address.create({
			data: {
				street: data.address.street,
				number: data.address.number,
				district: data.address.district,
				zipCode: data.address.zipCode,
				city: data.address.city,
				state: data.address.state,
				mapUrl: data.address.mapUrl,
				shelterId: shelter.id,
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
