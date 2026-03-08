import Link from "next/link";
import { BadgeCheck, Building2, CircleCheck, FileText, Handshake, Users } from "lucide-react";

const conveniosActivos = [
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
      {/* Hero */}
      <section className="mx-auto w-full max-w-7xl px-6 pb-12 pt-24 md:px-10 md:pt-28 xl:px-12">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6485c3]">Convenios</p>
        <h1 className="mt-5 max-w-5xl text-4xl font-semibold leading-tight text-[#1f3f76] sm:text-5xl">
          Convenios y beneficios Salud HOI
        </h1>
        <p className="mt-6 max-w-4xl text-base leading-relaxed text-slate-700">
          Revisa los convenios vigentes, opciones para empresas, beneficios para afiliados y cómo unirte.
          Si necesitas confirmar cobertura, te ayudamos por WhatsApp o en contacto directo.
        </p>
      </section>

      {/* Convenio empresa */}
      <section
        id="convenio-empresa"
        className="scroll-mt-28 mx-auto w-full max-w-7xl px-6 pb-10 md:px-10 xl:px-12"
      >
        <div className="rounded-3xl border border-[#cadbf9] bg-white/92 p-7 shadow-[0_18px_40px_-30px_rgba(28,65,130,0.75)] sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#688ac6]">Empresas</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#1f3f76]">
                Convenio empresa
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
                ¿Tienes una empresa o institución interesada en otorgar beneficios de salud a tus colaboradores?
                En Salud HOI contamos con opciones de convenio empresarial adaptadas a tus necesidades.
                Contáctanos para conocer las condiciones y comenzar el proceso.
              </p>
            </div>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eaf1ff] text-[#497fdf]">
              <Building2 className="h-6 w-6" />
            </span>
          </div>
          <div className="mt-6">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 rounded-full bg-[#4d83e8] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#3e76de]"
            >
              Consultar por convenio empresa
            </Link>
          </div>
        </div>
      </section>

      {/* Afiliados */}
      <section
        id="afiliados"
        className="scroll-mt-28 mx-auto w-full max-w-7xl px-6 pb-10 md:px-10 xl:px-12"
      >
        <div className="rounded-3xl border border-[#cadbf9] bg-white/92 p-7 shadow-[0_18px_40px_-30px_rgba(28,65,130,0.75)] sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#688ac6]">Afiliados</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#1f3f76]">
                Beneficios para afiliados
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
                Si eres parte de una institución con convenio activo en Salud HOI, accede a tus beneficios
                con solo identificarte al momento de tu atención. Disponemos de agenda preferencial
                y descuentos en las prestaciones incluidas en tu convenio.
              </p>
            </div>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eaf1ff] text-[#497fdf]">
              <Users className="h-6 w-6" />
            </span>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {conveniosActivos.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2 rounded-2xl border border-[#d5e3fb] bg-[#f6f9ff] px-4 py-3 text-sm font-semibold text-slate-700"
              >
                <BadgeCheck className="h-4 w-4 shrink-0 text-[#4a81e0]" />
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo afiliarse */}
      <section
        id="como-afiliarse"
        className="scroll-mt-28 mx-auto w-full max-w-7xl px-6 pb-10 md:px-10 xl:px-12"
      >
        <div className="rounded-3xl border border-[#cadbf9] bg-white/92 p-7 shadow-[0_18px_40px_-30px_rgba(28,65,130,0.75)] sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#688ac6]">Proceso</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#1f3f76]">
                Cómo afiliarse
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
                El proceso de afiliación es simple. Contáctanos indicando tu institución o empresa,
                revisamos las condiciones disponibles y coordinamos el inicio de tu convenio.
                Próximamente más información disponible en esta sección.
              </p>
            </div>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eaf1ff] text-[#497fdf]">
              <FileText className="h-6 w-6" />
            </span>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 rounded-full bg-[#4d83e8] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#3e76de]"
            >
              Iniciar proceso de afiliación
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

      {/* Opciones incluidas */}
      <section className="mx-auto w-full max-w-7xl px-6 pb-20 md:px-10 xl:px-12">
        <div className="rounded-3xl border border-[#cadbf9] bg-white/92 p-7 shadow-[0_18px_40px_-30px_rgba(28,65,130,0.75)] sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#688ac6]">Opciones</p>
              <h3 className="mt-3 text-3xl font-semibold tracking-tight text-[#1f3f76]">
                Opciones incluidas en convenios
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
                Selecciona la especialidad que necesitas y te derivamos al profesional tratante disponible.
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
