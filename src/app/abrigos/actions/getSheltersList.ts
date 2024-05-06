"use server";

import { db } from "@/lib/db";

export async function getSheltersList(city: string) {
  try {
    const sheltersList = await db.shelter.findMany({
      where: {
        address: {
          city,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return sheltersList;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await db.$disconnect();
  }
}
