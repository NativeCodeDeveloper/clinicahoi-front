"use client";

import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import RevealOnScroll from "@/Componentes/RevealOnScroll";

export default function InformacionesHoyCarousel({ cards = [] }) {
  const scrollerRef = useRef(null);

  // Duplicate cards for seamless infinite loop — backend cards se agregan normal via prop
  const displayCards = cards.length > 1 ? [...cards, ...cards] : cards;

  const getCardAmount = () => {
    const container = scrollerRef.current;
    if (!container) return 0;
    const firstCard = container.firstElementChild;
    const firstCardWidth = firstCard?.clientWidth ?? 0;
    const styles = window.getComputedStyle(container);
    const gap = parseFloat(styles.columnGap || styles.gap || "0");
    return firstCardWidth > 0
      ? Math.round(firstCardWidth + gap)
      : Math.round(container.clientWidth * 0.84);
  };

  const scrollByAmount = (direction) => {
    const container = scrollerRef.current;
    if (!container) return;
    const amount = getCardAmount();
    container.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  // Snap invisible de vuelta a la primera mitad cuando llega a la segunda
  useEffect(() => {
    const container = scrollerRef.current;
    if (!container || cards.length <= 1) return;

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const half = container.scrollWidth / 2;
        if (container.scrollLeft >= half) {
          container.scrollLeft -= half;
        } else if (container.scrollLeft < 0) {
          container.scrollLeft += half;
        }
        ticking = false;
      });
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [cards.length]);

  // Auto-avance
  useEffect(() => {
    const container = scrollerRef.current;
    if (!container || cards.length <= 1) return;

    const id = setInterval(() => scrollByAmount("right"), 5200);
    return () => clearInterval(id);
  }, [cards.length]);

  return (
    <div className="relative mt-12">
      <button
        type="button"
        onClick={() => scrollByAmount("left")}
        aria-label="Desplazar informaciones a la izquierda"
        className="absolute -left-2 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#d1e2fc] bg-white text-[#4c82e2] transition hover:bg-[#eef4ff] md:inline-flex"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div
        ref={scrollerRef}
        className="hide-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2"
      >
        {displayCards.map((item, index) => (
          <RevealOnScroll
            key={`${item.id}-${index}`}
            className="w-[86%] shrink-0 snap-start sm:w-[72%] md:w-[48%] lg:w-[calc((100%-2.5rem)/3)]"
            delayClass={index % 2 === 0 ? "delay-100" : "delay-150"}
          >
            <article className="h-full rounded-[2.1rem] border border-[#d4e3fc] bg-white/95 p-6 shadow-[0_22px_50px_-38px_rgba(41,76,142,0.8)] sm:p-7">
              <div className="overflow-hidden rounded-lg border border-[#dde8fd] bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-[230px] w-full object-contain sm:h-[250px]"
                />
              </div>
              <h3 className="mt-6 text-balance text-[2.1rem] font-black leading-[1.15] tracking-tight text-[#262323] sm:text-[2.55rem]">
                {item.title}
              </h3>
            </article>
          </RevealOnScroll>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scrollByAmount("right")}
        aria-label="Desplazar informaciones a la derecha"
        className="absolute -right-2 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#d1e2fc] bg-white text-[#4c82e2] transition hover:bg-[#eef4ff] md:inline-flex"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
