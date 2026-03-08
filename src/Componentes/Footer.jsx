import Image from "next/image";
import Link from "next/link";
import { CalendarCheck2, Clock3, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

const socialLinks = [
  {
    label: "Salud hoi",
    href: "https://www.facebook.com/",
    icon: Facebook,
  },
  {
    label: "Salud.hoi",
    href: "https://www.instagram.com/salud.hoi",
    icon: Instagram,
  },
];

export default function FooterPremiumMedico() {
  return (
    <footer
      id="footer"
      className="relative overflow-hidden bg-[linear-gradient(180deg,rgba(237,244,255,0.94)_0%,rgba(216,230,251,0.92)_42%,rgba(185,209,242,0.90)_100%)] text-slate-900"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.55),transparent_40%)]" />
      <div className="pointer-events-none absolute -left-14 top-8 h-56 w-56 rounded-full bg-white/35 blur-3xl" />
      <div className="pointer-events-none absolute -right-12 bottom-6 h-60 w-60 rounded-full bg-[#5a86cf]/25 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-8 pt-12 sm:px-6 lg:px-8 lg:pb-10 lg:pt-14">
        <div className="mb-8 flex items-center justify-between gap-4 pb-3">
          <div className="relative h-14 w-44 sm:h-16 sm:w-52">
            <Image src="/logofullcolor.png" alt="Salud HOI" fill sizes="208px" className="object-contain object-left" />
          </div>

          <Link
            href="/reserva-hora"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d6e2fa] bg-[#f6f9ff] px-4 py-2.5 text-sm font-semibold text-[#3f7ee6] shadow-[0_8px_20px_-16px_rgba(20,40,90,0.5)] transition hover:bg-[#ebf2ff]"
          >
            <CalendarCheck2 className="h-4 w-4" />
            Reserva Aqui
          </Link>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-3">
          <section className="h-full rounded-3xl border border-[#d3dff4] bg-blue-400 p-5 shadow-[0_18px_36px_-30px_rgba(28,66,132,0.65)]">
            <h3 className="text-xl font-bold tracking-tight text-slate-800">Contactos</h3>

            <div className="mt-4 space-y-3">
              <a
                href="tel:+56972228872"
                className="flex items-center gap-3 rounded-2xl border border-[#dce6f8] bg-white px-3 py-3 transition hover:bg-[#f7faff]"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf4ff] text-[#3f7ee6]">
                  <Phone className="h-5 w-5" />
                </span>
                <span className="text-base font-semibold text-slate-800">+56 9 72228872</span>
              </a>

              <a
                href="mailto:admsaludhoi@gmail.com"
                className="flex items-center gap-3 rounded-2xl border border-[#dce6f8] bg-white px-3 py-3 transition hover:bg-[#f7faff]"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf4ff] text-[#3f7ee6]">
                  <Mail className="h-5 w-5" />
                </span>
                <span className="truncate text-base font-semibold text-slate-800">admsaludhoi@gmail.com</span>
              </a>

              <a
                href="https://maps.google.com/?q=Bernardo+OHiggins+433,+Puerto+Aysen,+Aysen"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-[#dce6f8] bg-white px-3 py-3 transition hover:bg-[#f7faff]"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf4ff] text-[#3f7ee6]">
                  <MapPin className="h-5 w-5" />
                </span>
                <span className="leading-snug min-w-0 text-base font-semibold text-slate-800">
                  Bernardo O&apos;Higgins 433, Puerto Aysen
                </span>
              </a>
            </div>
          </section>

          <section className="h-full rounded-3xl border border-[#d3dff4] bg-blue-400 p-2 shadow-[0_18px_36px_-30px_rgba(28,66,132,0.65)]">
            <div className="relative overflow-hidden rounded-2xl border border-[#dce6f8] bg-white h-[360px] md:h-full md:min-h-[420px]">
              <iframe
                title="Mapa ubicacion Salud HOI"
                src="https://www.google.com/maps?q=Bernardo%20OHiggins%20433%20Puerto%20Aysen%20Aysen&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full"
              />

              <div className="absolute inset-x-2 top-2 z-10 flex items-center justify-between">
                <span className="rounded-full border border-white/80 bg-white/90 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-slate-700">
                  Ubicacion
                </span>
                <a
                  href="https://maps.google.com/?q=Bernardo+OHiggins+433,+Puerto+Aysen,+Aysen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[#d6e2fa] bg-white/95 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#3f7ee6] hover:bg-white"
                >
                  Abrir mapa
                </a>
              </div>
            </div>
          </section>

          <section className="h-full rounded-3xl border border-[#d3dff4] bg-blue-400 p-5 shadow-[0_18px_36px_-30px_rgba(28,66,132,0.65)]">
            <h3 className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-800">
              <Clock3 className="h-5 w-5 text-[#3f7ee6]" />
              Horarios
            </h3>

            <div className="mt-4 rounded-2xl border border-[#dce6f8] bg-white px-4 py-4 text-slate-800">
              <p className="text-lg font-bold">Lunes a Viernes</p>
              <p className="text-lg font-semibold">15:00 - 20:00</p>
              <p className="mt-3 text-lg font-bold">Sabados</p>
              <p className="text-lg font-semibold">9:00 a 17:00</p>
              <p className="mt-3 text-lg font-bold">Domingos</p>
              <p className="text-lg font-semibold">Cerrados</p>
            </div>

            <div className="mt-4 flex gap-2">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#dce6f8] bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-[#f7faff] hover:text-[#3f7ee6]"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </a>
                );
              })}
            </div>
          </section>
        </div>

        <div className="mt-6 mb-4 flex flex-col gap-1 text-sm font-medium text-slate-700 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 - Salud HOI, Puerto Aysen. Todos los derechos reservados.</p>
          <p>
            Desarrollado por{" "}
            <a
              href="https://www.nativecode.cl/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#2e66c8] underline-offset-4 transition hover:underline"
            >
              nativecode.cl
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
