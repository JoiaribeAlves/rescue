"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";

export async function completeRescue(rescueId: string) {
	try {
		await db.rescue.update({
			where: {
				id: rescueId,
			},
			data: {
				accomplished: true,
			},
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
