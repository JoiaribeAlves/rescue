import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solicitações de resgate - Enchentes RS",
  description: "Aqui você encontrará os endereços das pessoas que estão precisando ser resgatadas",
};

import { getRequests } from "./actions/getRequests"
import { RequestList } from "./components/RequestList";

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

      <RequestList requestList={requests} />
    </div >
  )
}
