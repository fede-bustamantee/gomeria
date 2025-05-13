'use client'

import { signOut, useSession } from "next-auth/react";

export default function Home() {
    const { data: session } = useSession();
    
    return (
        <div className="container mx-auto p-4">
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">
                    Home
                </h1>
                <div className="flex items-center gap-4">
                    <span>Hola, {session?.user?.nombre || 'Usuario'}</span>
                    <button 
                        onClick={() => signOut({ callbackUrl: '/iniciar-sesion' })}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Cerrar sesión
                    </button>
                </div>
            </header>
            
            <main>
                {/* Contenido principal de tu página */}
                <p>Contenido de la página principal</p>
            </main>
        </div>
    );
}