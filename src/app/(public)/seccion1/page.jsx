import RevealOnScroll from "@/Componentes/RevealOnScroll";
import InformacionesHoyCarousel from "@/Componentes/InformacionesHoyCarousel";

const fallbackCards = [
  {
    id: "fallback-1",
    title: "PAS: Primeros auxilios psicologicos. Que hacer y como ayudar?",
    image: "/logo42.png",
  },
  {
    id: "fallback-2",
    title: "Dolor lumbar: ejercicios practicos para aliviar el dolor",
    image: "/logo41.png",
  },
  {
    id: "fallback-3",
    title: "Hablemos sobre: mitos sobre la depresion",
    image: "/logo42.png",
  },
];

function cfToSrc(imageId, hash, variant = "full") {
  if (!imageId) return "";
  if (typeof imageId === "string" && imageId.startsWith("http")) return imageId;
  return `https://imagedelivery.net/${hash}/${imageId}/${variant}`;
}

async function getInformacionesCards() {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const CLOUDFLARE_HASH = process.env.NEXT_PUBLIC_CLOUDFLARE_HASH || "aCBUhLfqUcxA2yhIBn1fNQ";

  if (!API) return fallbackCards;

  try {
    const res = await fetch(`${API}/publicaciones/seleccionarPublicaciones`, {
      method: "GET",
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
    });

    if (!res.ok) return fallbackCards;

    const publicaciones = await res.json();
    if (!Array.isArray(publicaciones) || publicaciones.length === 0) return fallbackCards;

    const mapped = publicaciones
      .map((item) => ({
        id: `publicacion-${item.id_publicaciones}`,
        title: item.descripcionPublicaciones?.trim() || "Informacion HOI",
        image:
          cfToSrc(item.imagenPublicaciones_primera, CLOUDFLARE_HASH, "full") ||
          cfToSrc(item.imagenPublicaciones_primera, CLOUDFLARE_HASH, "card"),
      }))
      .filter((item) => item.image);

    return mapped.length ? mapped : fallbackCards;
  } catch (err) {
    console.error("Error al cargar publicaciones para Informaciones HOI:", err);
    return fallbackCards;
  }
}

export default async function Seccion1() {
  const cards = await getInformacionesCards();

  return (
    <section
      id="informaciones-hoy"
      className="scroll-mt-24 bg-[linear-gradient(180deg,rgba(233,240,253,0.86)_0%,rgba(202,219,244,0.82)_100%)] py-20 text-slate-900 sm:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-7 md:px-8 lg:px-10">
        <RevealOnScroll>
          <div className="text-center">
            <p className="mt-6 text-[2.05rem] font-black uppercase tracking-tight text-slate-900 sm:text-[2.5rem]">
              Informaciones <span className="text-[#4580e1]">HOI</span>
            </p>
            <div className="mx-auto mt-5 flex max-w-4xl items-center gap-3">
              <span className="h-3 w-3 rounded-sm bg-[#f4f6fb]" />
              <span className="h-[2px] flex-1 bg-[#f4f6fb]" />
              <span className="h-3 w-3 rounded-sm bg-[#f4f6fb]" />
            </div>
          </div>
        </RevealOnScroll>

        <InformacionesHoyCarousel cards={cards} />
      </div>
    </section>
  );
}
