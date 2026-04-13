// Muestra el formulario de registro de Clerk en /sign-up
"use client";

import { useEffect } from "react";
import { SignUp, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    const { isLoaded, userId } = useAuth();

    useEffect(() => {
        if (isLoaded && userId) {
            router.replace("/dashboard");
        }
    }, [isLoaded, router, userId]);

    if (!isLoaded) {
        return (
            <main className="min-h-screen flex items-center justify-center p-4">
                <p className="text-sm text-slate-400">Cargando...</p>
            </main>
        );
    }

    if (userId) {
        return (
            <main className="min-h-screen flex items-center justify-center p-4">
                <p className="text-sm text-slate-400">Redirigiendo al dashboard...</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen flex items-center justify-center p-4">
            <SignUp />
        </main>
    );
}
