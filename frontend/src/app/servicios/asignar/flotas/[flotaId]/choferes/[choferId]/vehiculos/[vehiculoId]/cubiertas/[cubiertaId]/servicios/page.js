"use client";
import { useParams } from "next/navigation";
import AsignarServicio from "@/app/components/AsignarServicio";

export default function Page() {
    const { flotaId, choferId, vehiculoId, cubiertaId } = useParams();
    return (
        <AsignarServicio
            vehiculoId={vehiculoId}
            cubiertaId={cubiertaId}
            flotaId={flotaId}
            choferId={choferId}
        />
    );
}
