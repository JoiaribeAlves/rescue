"use server";

import { db } from "@/lib/db";

export async function getRequests() {
  try {
    const requests = await db.rescue.findMany({
      orderBy: [
        {
          status: "asc",
        },
        {
          createdAt: "desc",
        },
      ],
      include: {
        addresses: true,
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
