"use client";
import { useParams } from "next/navigation";
import AsignarServicio from "@/app/components/AsignarServicio";

export default function Page() {
    const { vehiculoId } = useParams();
    return <AsignarServicio vehiculoId={vehiculoId} />;
}