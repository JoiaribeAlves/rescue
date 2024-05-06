import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pedidos de resgate - Enchentes RS",
  description: "Aqui você encontra os pedidos de resgate",
};

import { getRequests } from "./actions/getRequests"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { phoneMask } from "@/helpers/phoneMask";
import Link from "next/link";
import { CompleteRescueButton } from "./components/CompleteRescueButton";

export default async function Requests() {
  const requests = await getRequests();

  if (!requests) return null;

  if (requests.length === 0) {
    return (
      <div className="py-8 px-4 lg:px-8">
        <h1 className="font-semibold text-lg">Nenhum pedido de resgate foi encontrado</h1>
      </div>
    )
  }

  return (
    <div className="py-8 px-4 lg:px-8 flex flex-col gap-6">
      <h1 className="font-semibold text-lg">Pedidos de resgate</h1>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-4">
        {requests.map((request, index) => (
          <div key={index} className="flex flex-col gap-4 shadow-lg p-4 rounded-md">
            <Card className={`grow ${request.status === "Aguardando" ? "bg-red-100" : "bg-green-100"}`}>
              <CardHeader>
                <CardTitle>Endereço:</CardTitle>
                <CardDescription>
                  {request.addresses[0].street}{", "}
                  {request.addresses[0].number}{", "}
                  {request.addresses[0].district}{", "}
                  {request.addresses[0].referencePoint}
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
    </div >
  )
}
