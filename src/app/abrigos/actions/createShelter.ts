"use server";

import { db } from "@/lib/db";

interface ICreateShelter {
	shelter: {
		name: string;
		type: string;
		capacity: number | null;
		shelteredPeople: number | null;
		imageUrl: string | null;
		address: {
			street: string;
			number: string;
			district: string;
			referencePoint: string | null;
			zipCode: string | null;
			city: string;
			state: string;
			mapUrl: string | null;
		}
	}
}

export async function createShelter(data: ICreateShelter) {
	try {
		const shelter = await db.shelter.create({
			data: {
				name: data.shelter.name,
				type: data.shelter.type,
				capacity: data.shelter.capacity,
				shelteredPeople: data.shelter.shelteredPeople,
				imageUrl: data.shelter.imageUrl,
			},
		});

		await db.address.create({
			data: {
				street: data.shelter.address?.street ?? "",
				number: data.shelter.address?.number ?? "S/N",
				district: data.shelter.address?.district ?? "",
				zipCode: data.shelter.address?.zipCode,
				city: data.shelter.address?.city ?? "",
				state: data.shelter.address?.state,
				mapUrl: data.shelter.address?.mapUrl,
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
