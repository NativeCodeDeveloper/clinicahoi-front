import Link from "next/link";
import { BadgeCheck, Building2, CircleCheck, Handshake, Users } from "lucide-react";

const convenios = [
  {
    id: "anfup",
    name: "ANFUP",
    description:
      "Convenio vigente para afiliados, con acceso a atencion integral y coordinacion por profesional.",
  },
  {
    id: "fenpruss",
    name: "FENPRUSS",
    description:
      "Beneficios de convenio para usuarios asociados, con opciones de evaluacion y seguimiento.",
  },
  {
    id: "fenats",
    name: "FENATS",
    description:
      "Atencion por convenio para afiliados, con agenda organizada por especialidad y tratante.",
  },
  {
    id: "lord-cochrane",
    name: "Club Deportivo Lord Cochrane",
    description:
      "Acceso a prestaciones orientadas a salud y rendimiento fisico para integrantes del club.",
  },
];

const opciones = [
  "Kinesiologia",
  "Entrenamientos",
  "Nutricion",
  "Masoterapia",
  "Psicologia",
];

export default function ConveniosPage() {
  return (
    <main className="bg-transparent text-slate-900">
      <section className="mx-auto w-full max-w-7xl px-6 pb-12 pt-24 md:px-10 md:pt-28 xl:px-12">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6485c3]">Convenios</p>
        <h1 className="mt-5 max-w-5xl text-4xl font-semibold leading-tight text-[#1f3f76] sm:text-5xl">
          Convenios activos y opciones de atencion Salud HOI
        </h1>
        <p className="mt-6 max-w-4xl text-base leading-relaxed text-slate-700">
          Revisa los convenios vigentes y las opciones disponibles. Si necesitas
          confirmacion de cobertura, te ayudamos por WhatsApp o en contacto.
        </p>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-5 px-6 pb-10 md:grid-cols-2 md:px-10 xl:px-12">
        {convenios.map((item) => (
          <article
            id={item.id}
            key={item.id}
            className="scroll-mt-28 rounded-3xl border border-[#cadbf9] bg-white/92 p-7 shadow-[0_18px_40px_-30px_rgba(28,65,130,0.75)] sm:p-8"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf1ff] text-[#467edc]">
              <Building2 className="h-6 w-6" />
            </span>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[#1f3f76]">{item.name}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">{item.description}</p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#d5e3fb] bg-[#f6f9ff] px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#497fdf]">
              <BadgeCheck className="h-4 w-4" />
              Convenio vigente
            </div>
          </article>
        ))}
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-20 md:px-10 xl:px-12">
        <div className="rounded-3xl border border-[#cadbf9] bg-white/92 p-7 shadow-[0_18px_40px_-30px_rgba(28,65,130,0.75)] sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#688ac6]">Opciones</p>
              <h3 className="mt-3 text-3xl font-semibold tracking-tight text-[#1f3f76]">
                Opciones incluidas en convenios
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
                Estas son las opciones principales informadas por el cliente en la propuesta
                visual: selecciona la que necesitas y te derivamos al profesional tratante.
              </p>
            </div>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eaf1ff] text-[#497fdf]">
              <Handshake className="h-6 w-6" />
            </span>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {opciones.map((opcion) => (
              <div
                key={opcion}
                className="flex items-center gap-2 rounded-2xl border border-[#d5e3fb] bg-[#f6f9ff] px-4 py-3 text-sm font-semibold text-slate-700"
              >
                <CircleCheck className="h-4 w-4 text-[#4a81e0]" />
                {opcion}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/servicios"
              className="inline-flex items-center gap-2 rounded-full bg-[#4d83e8] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#3e76de]"
            >
              Ver especialidades
              <Users className="h-4 w-4" />
            </Link>
            <Link
              href="/agendaProfesionales"
              className="rounded-full border border-[#cadbf9] bg-white px-7 py-3 text-sm font-semibold text-slate-700 transition hover:bg-[#f1f6ff]"
            >
              Ir a agenda
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
