"use client";
import { useParams } from "next/navigation";
import AsignarServicio from "@/app/components/AsignarServicio";

export default function Page() {
  const { vehiculoId, cubiertaId } = useParams();
  return <AsignarServicio vehiculoId={vehiculoId} cubiertaId={cubiertaId} />;
}