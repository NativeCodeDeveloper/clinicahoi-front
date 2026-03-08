"use client";

import Image from "next/image";
import Link from "next/link";

export default function MisionVisionPage() {
  return (
    <main className="bg-transparent text-slate-900">
      <section className="relative overflow-hidden py-24 md:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(140,168,224,0.2),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(91,138,223,0.2),transparent_42%)]" />

        <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-6 md:px-10 lg:grid-cols-[1.1fr_1fr] lg:items-center xl:px-12 xl:gap-16">
          <div className="rounded-[2rem] border border-[#cedefb] bg-white/90 p-8 shadow-[0_20px_55px_-35px_rgba(30,62,120,0.65)]">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6788c6]">
              Salud HOI
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-tight text-[#1f3f76] sm:text-5xl">
              Mision y Vision
            </h1>
            <p className="mt-7 text-justify text-sm leading-relaxed text-slate-700 sm:text-base">
              Nuestra mision es entregar atencion de salud integral, cercana y profesional,
              promoviendo el bienestar fisico y emocional de cada persona mediante planes
              personalizados y trabajo interdisciplinario.
            </p>
            <p className="mt-5 text-justify text-sm leading-relaxed text-slate-700 sm:text-base">
              Nuestra vision es consolidarnos como un referente en Puerto Aysen por la
              calidad humana, excelencia tecnica y continuidad del cuidado, acercando
              servicios de salud especializados a toda la comunidad.
            </p>

            <Link
              href="/agendaProfesionales"
              className="mt-10 inline-flex rounded-full bg-[#4d83e8] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#3e76de]"
            >
              Reservar evaluacion
            </Link>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border-[#d0defa] bg-[#eef4ff] bg-transparent shadow-[0_24px_70px_-38px_rgba(15,23,42,0.5)]">
            <Image
              src="/logofullcolor.png"
              alt="Sello Salud HOI"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-contain object-left"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
