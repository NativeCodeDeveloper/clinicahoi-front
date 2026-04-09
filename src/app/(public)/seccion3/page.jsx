import Link from "next/link";
import { BadgeCheck, Building2, FileText, Users } from "lucide-react";
import RevealOnScroll from "@/Componentes/RevealOnScroll";
import ConveniosLogosCarousel from "@/Componentes/ConveniosLogosCarousel";

function cfToSrc(imageId, hash, variant = "full") {
  if (!imageId) return "";
  if (typeof imageId === "string" && imageId.startsWith("http")) return imageId;
  return `https://imagedelivery.net/${hash}/${imageId}/${variant}`;
}

async function getConveniosLogos() {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const CLOUDFLARE_HASH = process.env.NEXT_PUBLIC_CLOUDFLARE_HASH || "aCBUhLfqUcxA2yhIBn1fNQ";

  if (!API) return { title: "", items: [] };

  try {
    const res = await fetch(`${API}/publicacionesTituloDetalle/seleccionarPublicacionesTituloDetalle`, {
      method: "GET",
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
    });

    if (!res.ok) return { title: "", items: [] };

    const publicaciones = await res.json();
    if (!Array.isArray(publicaciones) || publicaciones.length === 0) return { title: "", items: [] };

    const items = publicaciones
      .map((item, index) => ({
        src: cfToSrc(item?.publicacionesTituloDescripcionImagen, CLOUDFLARE_HASH, "full"),
        title: item?.publicacionesTitulo?.trim() || `Convenio ${index + 1}`,
        alt: item?.publicacionesTitulo?.trim() || `Logo convenio ${index + 1}`,
      }))
      .filter((item) => item.src);

    return {
      title: items.length ? "Convenios y alianzas" : "",
      items,
    };
  } catch (err) {
    console.error("Error al cargar logos de convenios (carrusel 1):", err);
    return { title: "", items: [] };
  }
}

export default async function Seccion3() {
  const conveniosCarrusel = await getConveniosLogos();

  return (
    <section
      id="convenios"
      className="scroll-mt-24 bg-[linear-gradient(180deg,rgba(220,233,253,0.88)_0%,rgba(176,199,233,0.84)_100%)] py-20 text-slate-900 sm:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10">
        <div className="space-y-6">
          <RevealOnScroll>
            <article className="rounded-3xl border border-[#c9daf8] bg-white p-7 shadow-[0_20px_45px_-32px_rgba(45,78,145,0.85)] sm:p-8">
              <p className="text-xs text-center font-semibold uppercase tracking-[0.24em] text-[#5e82c7]">Convenios</p>
              <h2 className="mt-4 text-center text-3xl font-semibold tracking-tight text-[#1f3f76] sm:text-4xl">
                Convenios activos Salud HOI
              </h2>
              <p className="mt-4 text-center text-sm leading-7 text-slate-700 sm:text-base">
                Beneficios disponibles para instituciones y agrupaciones con atencion en
                Puerto Aysen.
              </p>

              <div className="mt-8">
                
                {conveniosCarrusel.title ? (
                  <h3 className="mt-2 text-base font-semibold text-[#1f3f76] sm:text-lg">
                    {conveniosCarrusel.title}
                  </h3>
                ) : null}
                <ConveniosLogosCarousel items={conveniosCarrusel.items} variant="large" />
              </div>
            </article>
          </RevealOnScroll>

          <RevealOnScroll>
            <article className="rounded-3xl border border-[#c9daf8] bg-gradient-to-br from-[#dce9ff] via-[#edf3ff] to-[#f8fbff] p-7 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5e82c7]">¿Tienes convenio?</p>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-[#1f3f76] sm:text-3xl">
                Accede a tus beneficios
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                Si eres parte de una empresa con convenio, afiliado a una institución o quieres unirte, revisa las opciones disponibles.
              </p>

              <div className="mt-6 space-y-3">
                <Link
                  href="/convenios#convenio-empresa"
                  className="flex items-center gap-3 rounded-2xl border border-[#c8dafc] bg-white px-4 py-3 transition hover:bg-[#edf4ff]"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#e9f1ff] text-[#4a80e0]">
                    <Building2 className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-semibold text-slate-700">Convenio empresa</span>
                </Link>

                <Link
                  href="/convenios#afiliados"
                  className="flex items-center gap-3 rounded-2xl border border-[#c8dafc] bg-white px-4 py-3 transition hover:bg-[#edf4ff]"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#e9f1ff] text-[#4a80e0]">
                    <Users className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-semibold text-slate-700">Afiliados</span>
                </Link>

                <Link
                  href="/convenios#como-afiliarse"
                  className="flex items-center gap-3 rounded-2xl border border-[#c8dafc] bg-white px-4 py-3 transition hover:bg-[#edf4ff]"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#e9f1ff] text-[#4a80e0]">
                    <FileText className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-semibold text-slate-700">Cómo afiliarse</span>
                </Link>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/convenios"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#4d83e8] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3e76de]"
                >
                  <BadgeCheck className="h-4 w-4" />
                  Ver todos los convenios
                </Link>
                {/* CTA agenda — comentado temporalmente, reactivar si se habilita agenda online
                <Link
                  href="/agendaProfesionales"
                  className="inline-flex items-center justify-center rounded-full border border-[#c7d9fb] bg-white px-5 py-3 text-sm font-semibold text-[#3f7ee6] transition hover:bg-[#edf4ff]"
                >
                  Reserva Aquí
                </Link>
                */}
                <a
                  href="https://wa.me/56972228872"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-[#c7d9fb] bg-white px-5 py-3 text-sm font-semibold text-[#3f7ee6] transition hover:bg-[#edf4ff]"
                >
                  Reserva Aquí
                </a>
              </div>
            </article>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
