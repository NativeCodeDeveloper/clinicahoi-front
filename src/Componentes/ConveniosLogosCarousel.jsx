"use client";

import { useEffect, useMemo, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

export default function ConveniosLogosCarousel({ items = [], intervalMs = 2800 }) {
  const parsedItems = useMemo(() => {
    return (items || [])
      .filter((item) => item && typeof item.src === "string" && item.src.trim().length > 0)
      .map((item, index) => ({
        src: item.src,
        title: item.title || `Convenio ${index + 1}`,
        alt: item.alt || item.title || `Logo convenio ${index + 1}`,
      }));
  }, [items]);

  // @ts-ignore
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api || parsedItems.length <= 1) return;

    const id = setTimeout(() => {
      const snaps = api.scrollSnapList();
      if (!snaps?.length) return;

      const lastIndex = snaps.length - 1;
      const nextIndex = api.selectedScrollSnap() >= lastIndex ? 0 : api.selectedScrollSnap() + 1;

      api.scrollTo(nextIndex);
      setCurrent(nextIndex);
    }, intervalMs);

    return () => clearTimeout(id);
  }, [api, current, intervalMs, parsedItems.length]);

  if (!parsedItems.length) {
    return (
      <div className="mt-7 rounded-2xl border border-dashed border-[#c8dafc] bg-white/70 px-4 py-6 text-center text-sm text-slate-600">
        Pronto mostraremos los logos de convenios activos.
      </div>
    );
  }

  return (
    <div className="mt-7 rounded-3xl border border-[#c9daf8] bg-[#f7faff] p-4 sm:p-5">
      <Carousel setApi={setApi} opts={{ align: "start", loop: parsedItems.length > 2 }} className="w-full">
        <CarouselContent className="-ml-3 sm:-ml-4">
          {parsedItems.map((item, index) => (
            <CarouselItem key={`${item.src}-${index}`} className="pl-3 sm:pl-4 basis-1/2 sm:basis-1/3 lg:basis-1/4">
              <article className="rounded-2xl border border-[#d8e6fd] bg-white p-3 text-center shadow-[0_10px_26px_-20px_rgba(45,78,145,0.7)]">
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="h-14 w-full object-contain sm:h-16"
                />
                <p className="mt-2 line-clamp-2 text-xs font-semibold text-slate-700 sm:text-sm">
                  {item.title}
                </p>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
