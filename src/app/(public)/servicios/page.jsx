"use client";

import Link from "next/link";
import { ArrowRight, Stethoscope } from "lucide-react";

const specialties = [
  {
    id: "kinesiologia",
    area: "Area Kinesiologica",
    professional: "Camilo Flores Renin",
    services: ["Evaluacion Kinesiologica", "Terapia kinesiologica"],
    description:
      "Valoracion integral del movimiento, postura y funcionalidad para planificar rehabilitacion personalizada.",
  },
  {
    id: "psicologia",
    area: "Area Psicologica",
    professional: "Valentina Cortes Lagos",
    services: ["Terapia Psicologica Adulto", "Terapia Psicologica Infanto Juvenil"],
    description:
      "Acompanamiento emocional para adultos, ninas, ninos y adolescentes, con enfoque adaptado a cada etapa.",
  },
  {
    id: "fonoaudiologia",
    area: "Area Fonoaudiologica",
    professional: "Valentina Jofre Torres",
    services: ["Terapia fonoaudiologica", "Lavado de Oidos"],
    description:
      "Evaluacion e intervencion en habla, lenguaje, voz y comunicacion, en atencion de ninos y adultos.",
  },
  {
    id: "nutricion",
    area: "Area Nutricional",
    professional: "Vanessa Garcia Paillan",
    services: [
      "Evaluacion nutricional (composicion corporal)",
      "Evaluacion Nutricional + plan de alimentacion",
    ],
    description:
      "Analisis nutricional y plan personalizado segun objetivos de salud, habitos y estilo de vida.",
  },
  {
    id: "deportivo",
    area: "Area Deportiva",
    professional:
      "Carol Valderas Maldonado, Matias Oyarzun Andrade, Diego Aguilar Contreras, Nicolas Garces Piucol",
    services: ["Entrenamientos grupales", "Entrenamientos personalizados"],
    description:
      "Programas de entrenamiento guiados para mejorar condicion fisica, fuerza y bienestar general.",
  },
  {
    id: "masoterapia",
    area: "Area Masoterapia",
    professional: "Camila Villalobos Conejeros",
    services: [
      "Masaje relajante",
      "Masaje descontracturante",
      "Masaje mixto",
      "Masaje cervico craneal",
    ],
    description:
      "Terapias manuales orientadas a disminuir tension muscular, aliviar molestias y favorecer relajacion.",
  },
  {
    id: "complementarias",
    area: "Terapias Complementarias",
    professional: "Carola Quezada",
    services: ["Constelaciones Familiares"],
    description:
      "Terapia sistemica para comprender y armonizar dinamicas familiares que impactan el bienestar emocional.",
  },
];

export default function ServicioPage() {
  return (
    <main className="bg-transparent text-slate-900">
      <section className="mx-auto w-full max-w-7xl px-6 pb-12 pt-24 md:px-10 md:pt-28 xl:px-12">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6485c3]">Servicios</p>
        <h1 className="mt-5 max-w-5xl text-4xl font-semibold leading-tight text-[#1f3f76] sm:text-5xl">
          Especialidades de Salud HOI con agenda por profesional
        </h1>
        <p className="mt-6 max-w-4xl text-base leading-relaxed text-slate-700">
          Revisa cada area y su medico tratante. Puedes agendar online seleccionando
          directamente al profesional.
        </p>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-5 px-6 pb-20 md:px-10 xl:px-12">
        {specialties.map((item) => (
          <article
            id={item.id}
            key={item.id}
            className="scroll-mt-28 rounded-3xl border border-[#cadbf9] bg-white/92 p-7 shadow-[0_18px_40px_-30px_rgba(28,65,130,0.75)] sm:p-8"
          >
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#688ac6]">{item.area}</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#1f3f76] sm:text-3xl">
                  {item.professional}
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">{item.description}</p>
              </div>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eaf1ff] text-[#497fdf]">
                <Stethoscope className="h-6 w-6" />
              </span>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {item.services.map((service) => (
                <div
                  key={service}
                  className="rounded-2xl border border-[#d5e3fb] bg-[#f6f9ff] px-4 py-3 text-sm font-medium text-slate-700"
                >
                  {service}
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="border-t border-[#d2e1fb] bg-white/90">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-8 px-6 py-16 md:flex-row md:items-center md:px-10 md:py-18 xl:px-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6788c6]">
              Reserva online
            </p>
            <h3 className="mt-4 text-3xl leading-tight text-[#1f3f76]">
              Elige profesional y agenda tu hora
            </h3>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/agendaProfesionales"
              className="inline-flex items-center gap-2 rounded-full bg-[#4d83e8] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#3e76de]"
            >
              Ir a agenda
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contacto"
              className="rounded-full border border-[#cadbf9] bg-white px-7 py-3 text-sm font-semibold text-slate-700 transition hover:bg-[#f1f6ff]"
            >
              Contacto
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
