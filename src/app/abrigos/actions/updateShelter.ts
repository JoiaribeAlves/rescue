"use server";

import { db } from "@/lib/db";

interface IUpdateShelter {
	shelter: {
		id: string;
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

export async function updateShelter(data: IUpdateShelter) {
	try {
		await db.shelter.update({
			where: {
				id: data.shelter.id,
			},
			data: {
				name: data.shelter.name,
				type: data.shelter.type,
				capacity: data.shelter.capacity,
				shelteredPeople: data.shelter.shelteredPeople,
				imageUrl: data.shelter.imageUrl,
			},
		});

		await db.address.update({
			where: {
				shelterId: data.shelter.id,
			},
			data: {
				zipCode: data.shelter.address?.zipCode,
				street: data.shelter.address?.street,
				number: data.shelter.address?.number,
				district: data.shelter.address?.district,
				referencePoint: data.shelter.address?.referencePoint,
				state: data.shelter.address?.state,
				city: data.shelter.address?.city,
				mapUrl: data.shelter.address?.mapUrl,
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
