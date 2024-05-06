'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Prisma } from '@prisma/client';

import { phoneMask } from '@/helpers/phoneMask';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card';
import { CompleteRescueButton } from './CompleteRescueButton';

interface IRequestList {
  requestList: Prisma.RescueGetPayload<{
    include: {
      addresses: true,
    }
  }>[];
}

export function RequestList({ requestList }: IRequestList) {
  const [filters, setFilters] = useState({
    city: '',
    street: '',
    district: '',
  });

  const filteredList = requestList.filter(request => {
    const { city, street, district } = filters;
    if (city && !request.addresses.some(address => address.city.toLowerCase().includes(city.toLowerCase()))) return false;
    if (street && !request.addresses.some(address => address.street.toLowerCase().includes(street.toLowerCase()))) return false;
    if (district && !request.addresses.some(address => address.district.toLowerCase().includes(district.toLowerCase()))) return false;
    return true;
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  return (
    <>
      <div className="flex gap-4 mb-4 bg-muted p-4 rounded-lg">
        <input
          type="text"
          placeholder="Cidade"
          value={filters.city}
          onChange={e => handleFilterChange('city', e.target.value)}
          className="bg-white p-3 grow rounded-md outline-none"
        />
        <input
          type="text"
          placeholder="Rua"
          value={filters.street}
          onChange={e => handleFilterChange('street', e.target.value)}
          className="bg-white p-3 grow rounded-md outline-none"
        />
        <input
          type="text"
          placeholder="Bairro"
          value={filters.district}
          onChange={e => handleFilterChange('district', e.target.value)}
          className="bg-white p-3 grow rounded-md outline-none"
        />
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-4">
        {filteredList.map((request, index) => (
          <div key={index} className="flex flex-col gap-4 shadow-lg p-4 rounded-md">
            <Card className={`grow ${request.status === "Aguardando" ? "bg-red-100" : "bg-green-100"}`}>
              <CardHeader>
                <CardTitle>Endereço:</CardTitle>
                <CardDescription>
                  {request.addresses[0].street}{", "}
                  {request.addresses[0].number}{", "}
                  {request.addresses[0].district}{", "}
                  {request.addresses[0]?.referencePoint}{", "}
                  {request.addresses[0].city}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p>Quantidade de pessoas:{" "}
                  <span className="font-medium">
                    {request.peopleQuantity}
                  </span>
                </p>

                <p>Número de telefone:{" "}
                  <Link
                    href={`https://wa.me/55${request.phoneNumber}`}
                    className="font-medium">
                    {phoneMask(request.phoneNumber)}
                  </Link>
                </p>
              </CardContent>

              <CardFooter>
                <p>{request.note}</p>
              </CardFooter>
            </Card>

            <CompleteRescueButton
              rescueId={request.id}
              disabled={request.status !== "Aguardando"}
            />
          </div>
        ))}
      </div>
    </>
  )
}
