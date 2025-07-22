import type { Route } from "./+types/home";
import { Title } from "~/components/Title";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Inicio - Ualá" },
    { name: "description", content: "Gestiona tus cobros con Ualá" },
  ];
}

export default function Home() {
  return (
    <div className="p-6">
      <Title 
        level={1} 
        content="Métricas" 
      />
    </div>
  );
}