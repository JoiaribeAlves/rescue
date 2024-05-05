"use server";

import { db } from "@/lib/db";

interface ICreateRescue {
  number: string;
  note: string;
  street: string;
  district: string;
  referencePoint: string;
  city: string;
  peopleNumber: string;
}

export async function createRescue(data: ICreateRescue) {
  try {
    const rescue = await db.rescue.create({
      data: {
        peopleQuantity: Number(data.peopleNumber),
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

    return true;
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    await db.$disconnect();
  }
}
