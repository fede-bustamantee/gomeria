'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

function ProtectedLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === 'loading') return;

    // Si está en /iniciar-sesion, no hacer nada
    if (pathname === '/iniciar-sesion') return;

    // Si no hay sesión y no estamos en /iniciar-sesion, redirigir
    if (!session) {
      router.push('/iniciar-sesion');
    }
  }, [session, status, router, pathname]);

  if (status === 'loading') {
    return <div>Cargando...</div>;
  }

  // Mientras no haya sesión y no sea /iniciar-sesion, no renderizar
  if (!session && pathname !== '/iniciar-sesion') {
    return null;
  }

  return <>{children}</>;
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <SessionProvider>
          <ProtectedLayout>
            {children}
          </ProtectedLayout>
        </SessionProvider>
      </body>
    </html>
  );
}
