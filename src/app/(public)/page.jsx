import Portada from "@/app/(public)/portada/page";
import Seccion1 from "@/app/(public)/seccion1/page";
import Seccion2 from "@/app/(public)/seccion2/page";
import Seccion3 from "@/app/(public)/seccion3/page";

const HERO_TONES = [
  "from-[#f7fbff] via-[#e7effe] to-[#cfdff8]",
  "from-[#f6f9ff] via-[#e6eeff] to-[#c9daf6]",
  "from-[#f8fbff] via-[#e9f1ff] to-[#d1e1f9]",
];

function cfToSrc(imageId, hash, variant = "portada") {
  if (!imageId) return "";
  if (typeof imageId === "string" && imageId.startsWith("http")) return imageId;
  return `https://imagedelivery.net/${hash}/${imageId}/${variant}`;
}

async function getHeroSlides() {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const CLOUDFLARE_HASH = process.env.NEXT_PUBLIC_CLOUDFLARE_HASH || "aCBUhLfqUcxA2yhIBn1fNQ";

  if (!API) return [];

  try {
    const res = await fetch(`${API}/carruselPortada/seleccionarCarruselPortada`, {
      method: "GET",
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
    });

    if (!res.ok) return [];

    const carrusel = await res.json();
    if (!Array.isArray(carrusel) || carrusel.length === 0) return [];

    return carrusel.map((item, index) => ({
      id: `hero-${item.id_publicacionesPortada ?? index + 1}`,
      title: item.tituloPortadaCarrusel?.trim() || "Salud HOI",
      text: item.descripcionPublicacionesPortada?.trim() || "",
      cta: "Reserva Aqui",
      tone: HERO_TONES[index % HERO_TONES.length],
      image: cfToSrc(item.imagenPortada, CLOUDFLARE_HASH, "portada"),
    }));
  } catch {
    return [];
  }
}

export default async function Home() {
  const heroSlides = await getHeroSlides();

  return (
    <main className="overflow-x-clip">
      <Portada slides={heroSlides} />
      <Seccion1 />
      <Seccion2 />
      <Seccion3 />
    </main>
  );
}
