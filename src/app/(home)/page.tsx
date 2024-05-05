import type { Metadata } from "next";

import { HelpForm } from "./components/HelpForm";

export const metadata: Metadata = {
  title: "Pedir resgate - Enchentes RS",
  description: "Aqui você poderá pedir por resgate",
};

export default function Home() {
  return (
    <div className="py-8 px-4 lg:px-8">
      <HelpForm />
    </div>
  );
}
