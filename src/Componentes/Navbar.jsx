"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";

const navItems = [
  { label: "Inicio", href: "/#inicio" },
  {
    label: "Nosotros",
    children: [
      { label: "Sobre nosotros", href: "/nosotros" },
      { label: "Mision y vision", href: "/mision-y-vision" },
    ],
  },
  {
    label: "Servicios",
    children: [
      { label: "Ver todos los servicios", href: "/servicios" },
      { label: "Kinesiologia", href: "/servicios#kinesiologia" },
      { label: "Psicologia", href: "/servicios#psicologia" },
      { label: "Fonoaudiologia", href: "/servicios#fonoaudiologia" },
      { label: "Nutricion", href: "/servicios#nutricion" },
      { label: "Deportivo", href: "/servicios#deportivo" },
      { label: "Masoterapia", href: "/servicios#masoterapia" },
      { label: "Terapias complementarias", href: "/servicios#complementarias" },
    ],
  },
  {
    label: "Convenios",
    children: [
      { label: "Ver convenios", href: "/convenios" },
      { label: "ANFUP", href: "/convenios#anfup" },
      { label: "FENPRUSS", href: "/convenios#fenpruss" },
      { label: "FENATS", href: "/convenios#fenats" },
      { label: "Club Deportivo Lord Cochrane", href: "/convenios#lord-cochrane" },
    ],
  },
  { label: "Contacto", href: "/contacto" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDesktopDropdown, setOpenDesktopDropdown] = useState("");
  const [openMobileDropdown, setOpenMobileDropdown] = useState("");

  const closeMenus = () => {
    setIsOpen(false);
    setOpenDesktopDropdown("");
    setOpenMobileDropdown("");
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#c8d7f6] bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/#inicio" aria-label="Ir al inicio" className="group flex shrink-0 items-center" onClick={closeMenus}>
          <div className="relative h-11 w-[130px] sm:h-12 sm:w-[152px]">
            <Image
              src="/logofullcolor.png"
              alt="Salud HOI"
              fill
              priority
              sizes="(max-width: 640px) 130px, 152px"
              className="object-contain object-left transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
        </Link>

        <nav aria-label="Menu principal" className="hidden lg:block">
          <ul className="flex items-center gap-7 xl:gap-10">
            {navItems.map((item) => (
              <li
                key={item.label}
                className="relative"
                onMouseLeave={() => setOpenDesktopDropdown("")}
              >
                {item.children ? (
                  <>
                    <button
                      type="button"
                      onMouseEnter={() => setOpenDesktopDropdown(item.label)}
                      onClick={() =>
                        setOpenDesktopDropdown((prev) => (prev === item.label ? "" : item.label))
                      }
                      className="inline-flex items-center gap-1 text-[17px] font-medium text-slate-700 transition-colors duration-300 hover:text-[#3f7ee6]"
                    >
                      {item.label}
                      <ChevronDown
                        className={[
                          "h-4 w-4 transition-transform",
                          openDesktopDropdown === item.label ? "rotate-180" : "",
                        ].join(" ")}
                      />
                    </button>

                    <div
                      className={[
                        "absolute left-0 top-full mt-3 w-[330px] rounded-2xl border border-[#d2e0fb] bg-white p-2 shadow-[0_22px_40px_-28px_rgba(30,70,140,0.8)]",
                        openDesktopDropdown === item.label
                          ? "visible translate-y-0 opacity-100"
                          : "invisible -translate-y-1 opacity-0",
                        "transition-all duration-200",
                      ].join(" ")}
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={closeMenus}
                          className="block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-[#edf4ff] hover:text-[#3f7ee6]"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={closeMenus}
                    className="text-[17px] font-medium text-slate-700 transition-colors duration-300 hover:text-[#3f7ee6]"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2.5">
          <Link
            href="/agendaProfesionales"
            aria-label="Reservar hora"
            className="hidden rounded-full border border-[#d6e2fa] bg-[#f6f9ff] px-6 py-3 text-base font-semibold text-[#3f7ee6] shadow-[0_8px_20px_-16px_rgba(20,40,90,0.5)] transition hover:bg-[#ebf2ff] sm:inline-flex"
          >
            Reserva Aqui
          </Link>

          <button
            type="button"
            aria-label={isOpen ? "Cerrar menu" : "Abrir menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d6e2fa] bg-[#f6f9ff] text-slate-700 transition hover:bg-[#ebf2ff] lg:hidden"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={[
          "overflow-hidden border-t border-[#dbe6fa] bg-white lg:hidden",
          isOpen ? "max-h-[90vh] opacity-100" : "max-h-0 opacity-0 pointer-events-none",
          "transition-all duration-300 ease-out",
        ].join(" ")}
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
          {navItems.map((item) => (
            <div key={item.label}>
              {item.children ? (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenMobileDropdown((prev) => (prev === item.label ? "" : item.label))
                    }
                    className="flex w-full items-center justify-between rounded-xl border border-transparent px-4 py-3 text-left text-base font-medium text-slate-700 transition hover:border-[#d6e2fa] hover:bg-[#f5f8ff] hover:text-[#3f7ee6]"
                  >
                    {item.label}
                    <ChevronDown
                      className={[
                        "h-4 w-4 transition-transform",
                        openMobileDropdown === item.label ? "rotate-180" : "",
                      ].join(" ")}
                    />
                  </button>

                  <div
                    className={[
                      "grid transition-all duration-300",
                      openMobileDropdown === item.label
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0",
                    ].join(" ")}
                  >
                    <div className="overflow-hidden">
                      <div className="ml-4 space-y-1 border-l border-[#dce7fb] pl-3">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={closeMenus}
                            className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-[#edf4ff] hover:text-[#3f7ee6]"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={closeMenus}
                  className="block rounded-xl border border-transparent px-4 py-3 text-base font-medium text-slate-700 transition hover:border-[#d6e2fa] hover:bg-[#f5f8ff] hover:text-[#3f7ee6]"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
          <Link
            href="/agendaProfesionales"
            onClick={closeMenus}
            aria-label="Agendar hora desde menu movil"
            className="mt-2 rounded-xl border border-[#d6e2fa] bg-[#f6f9ff] px-4 py-3 text-center text-base font-semibold text-[#3f7ee6] transition hover:bg-[#ebf2ff]"
          >
            Reserva Aqui
          </Link>
        </div>
      </div>
    </header>
  );
}
