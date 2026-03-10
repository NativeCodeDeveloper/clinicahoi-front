"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Brain,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  HandHeart,
  Salad,
  StretchHorizontal,
} from "lucide-react";

const defaultHeroSlides = [
  {
    id: "hero-1",
    title: "¿Quieres mejorar tu estado de salud?",
    text: "Obten un 10% de descuento en tu evaluacion nutricional, reserva ahora.",
    cta: "Reserva Aquí",
    tone: "from-[#f7fbff] via-[#e7effe] to-[#cfdff8]",
    image: "/logo41.png",
  },
  {
    id: "hero-2",
    title: "Atención integral para tu bienestar",
    text: "Kinesiologia, nutricion, psicologia, masoterapia y entrenamiento en un solo lugar.",
    cta: "Ver Profesionales",
    tone: "from-[#f6f9ff] via-[#e6eeff] to-[#c9daf6]",
    image: "/logo41.png",
  },
  {
    id: "hero-3",
    title: "Agenda por profesional en pocos pasos",
    text: "Elige especialista, horario y confirma tu hora online desde cualquier dispositivo.",
    cta: "Agendar Ahora",
    tone: "from-[#f8fbff] via-[#e9f1ff] to-[#d1e1f9]",
    image: "/logo41.png",
  },
];

const serviceIcons = [
  { label: "Kinesiología", icon: StretchHorizontal, image: "/kine.png" },
  { label: "Entrenamientos", icon: Dumbbell, image: "/entrenamiento.png" },
  { label: "Nutrición", icon: Salad, image: "/nutri.png" },
  { label: "Masoterapia", icon: HandHeart, image: "/masotera.png" },
  { label: "Psicología", icon: Brain, image: "/psico.png" },
];

const passthroughLoader = ({ src }) => src;

export default function Portada({ slides = defaultHeroSlides }) {
  const safeSlides = slides.length > 0 ? slides : defaultHeroSlides;
  // Clone first slide at end for seamless forward loop
  const extendedSlides = [...safeSlides, safeSlides[0]];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const touchStartX = useRef(null);

  // Dot indicator maps clone index back to 0
  const activeDotIndex = activeIndex >= safeSlides.length ? 0 : activeIndex;

  useEffect(() => {
    if (safeSlides.length <= 1) return undefined;

    const intervalId = setInterval(() => {
      setActiveIndex((current) => current >= safeSlides.length ? 1 : current + 1);
    }, 5500);

    return () => clearInterval(intervalId);
  }, [safeSlides.length]);

  // Re-enable transition after snap
  useEffect(() => {
    if (!isTransitioning) {
      const t = setTimeout(() => setIsTransitioning(true), 20);
      return () => clearTimeout(t);
    }
  }, [isTransitioning]);

  // When clone finishes transitioning, snap silently back to real first slide
  const handleTransitionEnd = () => {
    if (activeIndex === safeSlides.length) {
      setIsTransitioning(false);
      setActiveIndex(0);
    }
  };

  const goPrev = () => {
    setIsTransitioning(true);
    setActiveIndex((current) =>
      current <= 0 ? safeSlides.length - 1 : current - 1
    );
  };

  const goNext = () => {
    setIsTransitioning(true);
    setActiveIndex((current) => current >= safeSlides.length ? 1 : current + 1);
  };

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current == null) return;

    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const distance = endX - touchStartX.current;

    if (Math.abs(distance) > 45) {
      if (distance > 0) goPrev();
      else goNext();
    }

    touchStartX.current = null;
  };

  return (
    <section
      id="inicio"
      className="scroll-mt-24 bg-[linear-gradient(180deg,rgba(227,236,251,0.86)_0%,rgba(190,208,236,0.8)_100%)] pt-6 pb-14 text-slate-900 sm:pt-8 sm:pb-16"
    >
      <div className="mx-auto w-full max-w-8xl px-3 sm:px-5 md:px-8 lg:px-10">
        <div
          className="relative overflow-hidden rounded-[1.5rem] border border-white/70 bg-white shadow-[0_30px_70px_-45px_rgba(30,70,145,0.55)] sm:rounded-[1.8rem]"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex"
            style={{
              transform: `translateX(-${activeIndex * 100}%)`,
              transition: isTransitioning ? "transform 700ms ease-out" : "none",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedSlides.map((slide, index) => (
              <article
                key={`${slide.id}-${index}`}
                className={[
                  "relative min-h-[300px] min-w-full px-5 py-8 sm:min-h-[360px] sm:px-8 sm:py-10 md:min-h-[390px] md:px-12",
                  "bg-gradient-to-br",
                  slide.tone,
                ].join(" ")}
              >
                <div className="pointer-events-none absolute inset-0">
                  <Image
                    src={slide.image || "/logo41.png"}
                    alt=""
                    fill
                    unoptimized
                    loader={passthroughLoader}
                    sizes="100vw"
                    className="object-cover opacity-[0.82]"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.28)_0%,rgba(255,255,255,0.18)_40%,rgba(255,255,255,0.32)_100%)]" />
                </div>

                <div className="relative mx-auto flex h-full max-w-4xl flex-col items-center justify-center text-center">
                  <h1 className="max-w-4xl text-balance text-[2rem] font-black uppercase leading-[1.02] tracking-[0.01em] text-[#5c8fe9] drop-shadow-[0_3px_0_rgba(255,255,255,0.8)] sm:text-[2.45rem] md:text-[3.1rem]">
                    {slide.title}
                  </h1>
                  <p className="mt-4 max-w-3xl text-base font-medium text-slate-800 sm:text-lg md:text-[1.65rem] md:leading-10">
                    {slide.text}
                  </p>

                  {/* CTA agenda — comentado temporalmente, reactivar si se habilita agenda online
                  <Link
                    href="/agendaProfesionales"
                    aria-label={slide.cta}
                    className="mt-6 inline-flex items-center justify-center rounded-full border border-[#d6e2fa] bg-[#f6f9ff] px-8 py-3 text-base font-semibold text-[#3f7ee6] shadow-[0_10px_20px_-16px_rgba(18,43,95,0.7)] transition hover:bg-[#ebf2ff]"
                  >
                    {slide.cta}
                  </Link>
                  */}
                  <a
                    href="https://wa.me/56972228872"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Reservar por WhatsApp"
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-[#d6e2fa] bg-[#f6f9ff] px-8 py-3 text-base font-semibold text-[#3f7ee6] shadow-[0_10px_20px_-16px_rgba(18,43,95,0.7)] transition hover:bg-[#ebf2ff]"
                  >
                    {slide.cta}
                  </a>
                </div>
              </article>
            ))}
          </div>

          <button
            type="button"
            aria-label="Slide anterior"
            onClick={goPrev}
            className="absolute left-2 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#d8e5fc] bg-[#f5f9ff] text-[#5a8ce7] transition hover:bg-[#e9f1ff] sm:left-4 sm:h-11 sm:w-11"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Siguiente slide"
            onClick={goNext}
            className="absolute right-2 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#d8e5fc] bg-[#f5f9ff] text-[#5a8ce7] transition hover:bg-[#e9f1ff] sm:right-4 sm:h-11 sm:w-11"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute inset-x-0 bottom-4 z-20 flex items-center justify-center gap-2.5 sm:bottom-5">
            {safeSlides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Mostrar slide ${index + 1}`}
                onClick={() => {
                  setIsTransitioning(true);
                  setActiveIndex(index);
                }}
                className={[
                  "h-2.5 rounded-full transition-all duration-300",
                  activeDotIndex === index ? "w-7 bg-[#6b97e8]" : "w-2.5 bg-[#c6d7f7]",
                ].join(" ")}
              />
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {serviceIcons.map((item) => (
            <article
              key={item.label}
              className="flex flex-col items-center rounded-3xl px-4 py-5 text-center"
            >
              <div className="relative h-44 w-44 overflow-hidden rounded-full border-[2px] border-[#7fa8ef]/30 shadow-[0_14px_30px_-18px_rgba(41,78,145,0.75)]">
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  sizes="176px"
                  priority
                  unoptimized
                  loader={passthroughLoader}
                  className="object-cover"
                />
              </div>

              <p className="mt-4 text-2xl font-semibold tracking-tight text-[#244a89]">
                {item.label}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
