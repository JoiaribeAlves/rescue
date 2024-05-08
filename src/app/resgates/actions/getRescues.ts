"use server";

import { db } from "@/lib/db";

export async function getRescues() {
	try {
		const requests = await db.rescue.findMany({
			where: {
				accomplished: false,
			},
			include: {
				address: true,
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		return requests;
	} catch (error) {
		console.error(error);
		return null;
	} finally {
		db.$disconnect();
	}
}
