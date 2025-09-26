"use client";
import { useParams } from "next/navigation";
import AsignarServicio from "@/app/components/AsignarServicio";

export default function Page() {
    const { flotaId, choferId, vehiculoId } = useParams();
    return (
        <AsignarServicio vehiculoId={vehiculoId} flotaId={flotaId} choferId={choferId} />
    );
}
