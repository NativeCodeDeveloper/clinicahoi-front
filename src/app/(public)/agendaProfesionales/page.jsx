'use client'
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Image from "next/image";

// import {useRouter} from "next/navigation"; // reactivar junto con irAgendaProfesional



export default function AgendaProfesionales() {
    const API = process.env.NEXT_PUBLIC_API_URL;
    // const router = useRouter(); // reactivar junto con irAgendaProfesional
    const [listaProfesionales, setListaProfesionales] = useState([]);

    // Agenda online — comentado temporalmente, reactivar si se habilita
    // function irAgendaProfesional(id_profesional) {
    //     router.push(`/agendaEspecificaProfersional/${id_profesional}`);
    // }

    async function seleccionarProfesionales() {
        try {
            const res = await fetch(`${API}/profesionales/seleccionarTodosProfesionales`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                mode: "cors",
            });

            const dataProfesionales = await res.json();
            setListaProfesionales(dataProfesionales);

        } catch (err) {
            return toast.error('No ha sido posible listar profesionales, contacte a soporte IT');
        }
    }

    useEffect(() => {
        seleccionarProfesionales()
    }, [])

    return (
        <div className="relative min-h-screen overflow-hidden px-4 py-24 sm:px-6 sm:py-32 lg:px-8">

            <div className="mx-auto max-w-5xl">

                {/* Header */}
                <div className="animate-reveal-up text-center">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#6485c3]">
                        Nuestros servicios disponibles
                    </p>
                    <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#1f3f76] sm:text-5xl lg:text-6xl">
                        Tenemos diferentes especialides para tus requerimientos.
                    </h1>
                    <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-slate-600">
                        Selecciona un servicio para ver su disponibilidad y agenda.
                    </p>
                    <div className="mx-auto mt-6 flex items-center justify-center gap-2">
                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#3881f4]/30"></div>
                        <div className="h-1.5 w-1.5 rounded-full bg-[#3881f4]/50"></div>
                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#3881f4]/30"></div>
                    </div>
                </div>

                {/* Cards */}
                <div className="animate-reveal-up-delay mt-14 grid auto-rows-fr grid-cols-1 items-stretch justify-items-center gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {listaProfesionales.map((profesional, index) => (
                        <div
                            key={profesional.id_profesional}
                            style={{ animationDelay: `${index * 120}ms` }}
                            className="animate-reveal-up group relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-[#c9daf8] bg-white p-7 opacity-0 text-left shadow-[0_8px_30px_-18px_rgba(28,65,130,0.55)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#3881f4]/40 hover:shadow-[0_20px_45px_-20px_rgba(56,129,244,0.35)] sm:p-8"
                        >
                            {/* Línea superior decorativa */}
                            <div className="absolute left-0 top-0 h-[3px] w-0 rounded-t-3xl bg-gradient-to-r from-[#3881f4] to-[#7aaef8] transition-all duration-500 group-hover:w-full"></div>

                            {/* Inicial */}
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border-transparent border-[#c9daf8] bg-gradient-to-br from-[#eaf1ff] to-[#dce9ff] shadow-[0_4px_12px_-6px_rgba(56,129,244,0.3)] transition-all duration-300 group-hover:from-[#3881f4] group-hover:to-[#5a9cf8] group-hover:shadow-[0_6px_18px_-6px_rgba(56,129,244,0.5)]">
                                <Image src="/logo41.png"
                                    alt="Clínica HOI"
                                    width={50}
                                    height={40}
                                    className="object-contain" />
                            </div>


                            {/* Contenido */}
                            <div className="mt-5 flex flex-1 flex-col">
                                <h2 className="text-base text-justify font-semibold tracking-wide text-[#1f3f76] transition-colors duration-300 group-hover:text-[#3881f4]">
                                    {profesional.nombreProfesional}
                                </h2>
                                <p className="min-w-0 mt-2 text-justify text-[13px] leading-snug text-slate-500 transition-colors duration-300 group-hover:text-slate-600">
                                    {profesional.descripcionProfesional}
                                </p>
                            </div>

                            {/* CTA */}
                            <div className="mt-auto flex w-full items-center justify-between border-t border-[#e8f0fd] pt-5">
                                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400 transition-colors duration-300 group-hover:text-[#3881f4]">
                                    Reservar por WhatsApp
                                </span>
                                {/* Botón agenda — comentado temporalmente, reactivar si se habilita agenda online
                        <div
                            onClick={() => irAgendaProfesional(profesional.id_profesional)}
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-[#d2e0fb] bg-[#f4f8ff] transition-all duration-300 group-hover:border-[#3881f4]/40 group-hover:bg-[#3881f4] group-hover:shadow-[0_4px_12px_-4px_rgba(56,129,244,0.4)]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[#3881f4] transition-all duration-300 group-hover:translate-x-px group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                        </div>
                        */}
                                <a
                                    href="https://wa.me/56972228872"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-7 w-7 items-center justify-center rounded-full border border-[#d2e0fb] bg-[#f4f8ff] transition-all duration-300 group-hover:border-[#3881f4]/40 group-hover:bg-[#3881f4] group-hover:shadow-[0_4px_12px_-4px_rgba(56,129,244,0.4)]"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[#3881f4] transition-all duration-300 group-hover:translate-x-px group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}
