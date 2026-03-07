import Link from "next/link";
import { Building2, MapPin, MessageCircle, Phone } from "lucide-react";
import RevealOnScroll from "@/Componentes/RevealOnScroll";

const convenios = ["ANFUP", "FENPRUSS", "FENATS", "Club deportivo Lord Cochrane"];

export default function Seccion3() {
  return (
    <section
      id="convenios"
      className="scroll-mt-24 bg-[linear-gradient(180deg,rgba(220,233,253,0.88)_0%,rgba(176,199,233,0.84)_100%)] py-20 text-slate-900 sm:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <RevealOnScroll>
            <article className="h-full rounded-3xl border border-[#c9daf8] bg-white p-7 shadow-[0_20px_45px_-32px_rgba(45,78,145,0.85)] sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5e82c7]">Convenios</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#1f3f76] sm:text-4xl">
                Convenios activos Salud HOI
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                Beneficios disponibles para instituciones y agrupaciones con atencion en
                Puerto Aysen.
              </p>

              <ul className="mt-8 grid gap-3">
                {convenios.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-[#d2e0fb] bg-[#f6f9ff] px-4 py-3"
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#e5efff] text-[#477fe0]">
                      <Building2 className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-semibold text-slate-800 sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </RevealOnScroll>

          <RevealOnScroll>
            <article className="h-full rounded-3xl border border-[#c9daf8] bg-gradient-to-br from-[#dce9ff] via-[#edf3ff] to-[#f8fbff] p-7 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5e82c7]">Contacto</p>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-[#1f3f76] sm:text-3xl">
                Estamos en Puerto Aysen
              </h3>

              <div className="mt-6 space-y-4">
                <a
                  href="tel:+56972228872"
                  className="flex items-start gap-3 rounded-2xl border border-[#c8dafc] bg-white px-4 py-3"
                >
                  <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#e9f1ff] text-[#4a80e0]">
                    <Phone className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-semibold text-slate-700">+56 9 7222 8872</span>
                </a>

                <a
                  href="https://wa.me/56972228872"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3 rounded-2xl border border-[#c8dafc] bg-white px-4 py-3"
                >
                  <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#e9f1ff] text-[#4a80e0]">
                    <MessageCircle className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-semibold text-slate-700">WhatsApp Salud HOI</span>
                </a>

                <a
                  href="https://maps.google.com/?q=Bernardo+OHiggins+433,+Puerto+Aysen,+Aysen"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3 rounded-2xl border border-[#c8dafc] bg-white px-4 py-3"
                >
                  <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#e9f1ff] text-[#4a80e0]">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-semibold leading-6 text-slate-700">
                    Bernardo O&apos;Higgins 433, Gimnasio IND segundo piso, Puerto Aysen
                  </span>
                </a>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/convenios"
                  className="inline-flex items-center justify-center rounded-full border border-[#c7d9fb] bg-[#f2f7ff] px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-[#e9f1ff]"
                >
                  Ver convenios
                </Link>
                <Link
                  href="/agendaProfesionales"
                  className="inline-flex items-center justify-center rounded-full border border-[#c7d9fb] bg-white px-5 py-3 text-sm font-semibold text-[#3f7ee6] transition hover:bg-[#edf4ff]"
                >
                  Reserva Aqui
                </Link>
                <Link
                  href="/contacto"
                  className="inline-flex items-center justify-center rounded-full border border-[#c7d9fb] bg-[#f2f7ff] px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-[#e9f1ff]"
                >
                  Ir a contacto
                </Link>
              </div>
            </article>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
