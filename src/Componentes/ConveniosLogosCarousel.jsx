"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

const EMPTY_ITEMS = [];

function StoryCard({ story }) {
  return (
    <motion.div
      className="group relative h-[22rem] w-[18rem] min-w-[18rem] flex-none overflow-hidden rounded-xl border border-[#cfe0fb] bg-white shadow-[0_18px_36px_-28px_rgba(41,76,142,0.85)]"
      whileHover={{
        y: -8,
        transition: { type: "spring", stiffness: 300 },
      }}
    >
      <div className="flex h-full flex-col">
        <div className="flex min-h-16 items-center justify-center border-b border-[#d6e5fb] bg-[#eef4ff] px-3 py-2">
          <h3 className="line-clamp-2 text-center text-sm font-semibold leading-tight tracking-wide text-[#1f3f76]">
            {story.title}
          </h3>
        </div>

        <div className="flex-1 bg-[#f4f8ff] p-3">
          <img
            src={story.src}
            alt={story.alt}
            className="pointer-events-none h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function ConveniosLogosCarousel({ items = EMPTY_ITEMS }) {
  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const [dragConstraint, setDragConstraint] = useState(0);

  const parsedItems = useMemo(() => {
    return (items || [])
      .filter((item) => item && typeof item.src === "string" && item.src.trim().length > 0)
      .map((item, index) => ({
        id: item.id || `${item.src}-${index + 1}`,
        src: item.src,
        alt: item.alt || item.title || `Convenio ${index + 1}`,
        title: item.title || `Convenio ${index + 1}`,
      }));
  }, [items]);

  useEffect(() => {
    const calculateConstraints = () => {
      if (containerRef.current && trackRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const trackWidth = trackRef.current.scrollWidth;
        const limit = containerWidth - trackWidth;
        setDragConstraint(limit < 0 ? limit : 0);
      }
    };

    calculateConstraints();
    window.addEventListener("resize", calculateConstraints);
    return () => window.removeEventListener("resize", calculateConstraints);
  }, [parsedItems.length]);

  if (!parsedItems.length) {
    return (
      <div className="mt-7 rounded-2xl border border-dashed border-[#c8dafc] bg-white/70 px-4 py-6 text-center text-sm text-slate-600">
        Pronto mostraremos los convenios activos.
      </div>
    );
  }

  return (
    <div className="mt-7 w-full">
      <motion.div
        ref={containerRef}
        className="cursor-grab overflow-hidden"
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div
          ref={trackRef}
          className="flex flex-nowrap items-stretch gap-6 px-4 pb-6"
          drag="x"
          dragConstraints={{ right: 0, left: dragConstraint }}
          dragElastic={0.15}
        >
          {parsedItems.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
