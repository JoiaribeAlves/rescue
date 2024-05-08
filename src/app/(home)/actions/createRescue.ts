"use server";

import { revalidatePath } from "next/cache";
import { uglify } from "phone-fns";

import { db } from "@/lib/db";

interface ICreateRescue {
	contactInfo: {
		name: string;
		phoneNumber: string;
	};
	peopleQuantity: string;
	address: {
		number: string;
		street: string;
		district: string;
		referencePoint: string;
		state: string;
		city: string;
	};
	note: string;
}

export async function createRescue(data: ICreateRescue) {
	try {
		const rescue = await db.rescue.create({
			data: {
				contactName: data.contactInfo.name,
				phoneNumber: uglify(data.contactInfo.phoneNumber),
				peopleQuantity: Number(data.peopleQuantity),
				note: data.note,
			}
		});

		await db.address.create({
			data: {
				street: data.address.street,
				number: data.address.number,
				district: data.address.district,
				referencePoint: data.address.referencePoint,
				state: data.address.state,
				city: data.address.city,
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
