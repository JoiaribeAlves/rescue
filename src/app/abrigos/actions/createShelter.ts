"use server";

import { db } from "@/lib/db";
import { IAddress } from "@/interfaces";

interface ICreateShelter {
  shelterName: string;
  address: IAddress;
}

export async function createShelter(data: ICreateShelter) {
  try {
    const shelter = await db.shelter.create({
      data: {
        name: data.shelterName,
      },
    });

    await db.address.create({
      data: {
        street: data.address.street,
        number: data.address.number,
        district: data.address.district,
        city: data.address.city,
        state: data.address.state,
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
