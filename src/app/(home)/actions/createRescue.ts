"use server";

import { revalidatePath } from "next/cache";
import { uglify } from "phone-fns";

import { db } from "@/lib/db";

interface ICreateRescue {
	street: string;
	number: string;
	district: string;
	referencePoint?: string;
	phoneNumber: string;
	city: string;
	peopleQuantity: string;
	note?: string;
}

export async function createRescue(data: ICreateRescue) {
	try {
		const rescue = await db.rescue.create({
			data: {
				peopleQuantity: Number(data.peopleQuantity),
				phoneNumber: uglify(data.phoneNumber),
				note: data.note,
			}
		});

		await db.address.create({
			data: {
				street: data.street,
				number: data.number,
				district: data.district,
				referencePoint: data.referencePoint,
				city: data.city,
				rescueId: rescue.id,
			}
		});

		revalidatePath("/resgates", "page");

		return true;
	} catch (error) {
		console.error(error);
		return false;
	} finally {
		await db.$disconnect();
	}
}
