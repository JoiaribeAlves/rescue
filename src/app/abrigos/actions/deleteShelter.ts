"use server";

import { db } from "@/lib/db";

interface IDeleteShelter {
	shelterId: string;
	verificationCode: string;
}

export async function deleteShelter({ shelterId, verificationCode }: IDeleteShelter) {
	if (!shelterId || !verificationCode) {
		return false;
	}

	if (verificationCode !== process.env.VERIFICATION_CODE) {
		return false;
	}

	try {
		const shelter = await db.shelter.findUnique({
			where: {
				id: shelterId,
			},
		});

		if (!shelter) {
			return false;
		}

		await db.address.delete({
			where: {
				shelterId,
			},
		});

		await db.shelter.delete({
			where: {
				id: shelterId,
			},
		});

		return true;
	} catch (error) {
		console.error(error);
		return false;
	} finally {
		await db.$disconnect();
	}
}
