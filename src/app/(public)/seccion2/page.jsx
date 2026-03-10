import Link from "next/link";
import { ArrowRight } from "lucide-react";
import RevealOnScroll from "@/Componentes/RevealOnScroll";

const services = [
  "Evaluacion Kinesiologica",
  "Terapia kinesiologica",
  "Terapia Psicologica Adulto",
  "Terapia Psicologica Infanto Juvenil",
  "Terapia fonoaudiologica",
  "Lavado de Oidos",
  "Evaluacion nutricional (composicion corporal)",
  "Evaluacion Nutricional + plan de alimentacion",
  "Entrenamientos grupales",
  "Entrenamientos personalizados",
  "Masaje relajante",
  "Masaje descontracturante",
  "Masaje Mixto",
  "Masaje cervico craneal",
  "Constelaciones Familiares",
];

export default function Seccion2() {
  return (
    <section
      id="servicios"
      className="scroll-mt-24 bg-[linear-gradient(180deg,rgba(225,236,253,0.88)_0%,rgba(187,208,239,0.84)_100%)] py-20 text-slate-900 sm:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10">
        <RevealOnScroll>

          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5e82c7]">Servicios</p>
          <h2 className="mt-4 max-w-4xl text-balance text-3xl font-semibold leading-tight tracking-tight text-[#19376c] sm:text-4xl lg:text-5xl">
            Revisa las diferentes prestaciones de salud con las cuales contamos, para la atencion integral y seguimiento profesional.
          </h2>
        </RevealOnScroll>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service, index) => (
            <RevealOnScroll
              key={service}
              delayClass={index % 2 === 0 ? "delay-100" : "delay-150"}
              className="h-full"
            >
              <article className="group flex h-full items-start gap-3 rounded-2xl border border-[#c5d8fb] bg-white px-4 py-4 transition hover:-translate-y-0.5 hover:border-[#a8c5f7]">
                <span className="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-[#5e8fe8]" />
                <p className="text-sm font-medium leading-6 text-slate-700">{service}</p>
              </article>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll>
          <div className="mt-12 rounded-3xl border border-[#bfd4fb] bg-white p-7 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5e82c7]">
              Atencion y Reserva
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[#1f3f76] sm:text-3xl">
              Agenda tu hora con el profesional de tu preferencia
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700 sm:text-base">
              Nuestra agenda online se organiza por profesional para que puedas elegir horario
              y especialidad segun tus necesidades.
            </p>
            <Link
              href="/agendaProfesionales"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#c8dafc] bg-[#f4f8ff] px-6 py-3 text-sm font-semibold text-[#3f7ee6] transition hover:bg-[#e9f1ff]"
            >
              Ir a servicios
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
