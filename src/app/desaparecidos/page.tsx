import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lista de desaparecidos - Enchentes RS",
  description: "Aqui você encontrará a lista de pessoas desaparecidas",
};

export default function Missing() {
  return (
    <div className="py-8 px-4 lg:px-8 flex flex-col gap-6">
      <h1 className="font-semibold text-lg">Lista de desaparecidos</h1>
      <p>Em breve...</p>
    </div >
  )
}
