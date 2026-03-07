"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { Clock3, Facebook, Instagram, MapPin, MessageCircle, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactCards = [
  {
    title: "Ubicacion",
    value: "Bernardo O'Higgins 433, Gimnasio IND segundo piso, Puerto Aysen.",
    href: "https://maps.google.com/?q=Bernardo+OHiggins+433,+Puerto+Aysen,+Aysen",
    icon: MapPin,
  },
  {
    title: "WhatsApp",
    value: "+56 9 7222 8872",
    href: "https://wa.me/56972228872",
    icon: MessageCircle,
  },
  {
    title: "Instagram",
    value: "@salud.hoi",
    href: "https://www.instagram.com/salud.hoi",
    icon: Instagram,
  },
  {
    title: "Facebook",
    value: "Salud Hoi",
    href: null,
    icon: Facebook,
  },
];

export default function ContactoPage() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const API = process.env.NEXT_PUBLIC_API_URL;

  async function enviarCorreo() {
    try {
      if (!nombre || !email || !mensaje) {
        return toast.error("Completa todos los campos para enviar tu mensaje.");
      }

      const res = await fetch(`${API}/correo/contacto`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, email, mensaje }),
        mode: "cors",
        cache: "no-cache",
      });

      if (!res.ok) {
        return toast.error("No se pudo enviar tu solicitud. Intenta nuevamente.");
      }

      const respuestaBackend = await res.json();

      if (respuestaBackend.message === true) {
        setNombre("");
        setEmail("");
        setMensaje("");
        return toast.success("Tu consulta fue enviada correctamente.");
      }

      return toast.error("Correo no valido. Verifica e intenta otra vez.");
    } catch (error) {
      console.error(error);
      return toast.error("Ocurrio un error inesperado. Intenta nuevamente.");
    }
  }

  return (
    <main className="bg-[#ecf3ff]/76 text-slate-900">
      <section className="relative overflow-hidden py-24 md:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(120,154,224,0.22),transparent_35%),radial-gradient(circle_at_88%_2%,rgba(96,139,224,0.18),transparent_42%)]" />

        <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-6 md:px-10 lg:grid-cols-[1fr_1.05fr] xl:px-12 xl:gap-14">
          <aside className="rounded-[2rem] border border-[#ccdcfa] bg-white/85 p-7 shadow-[0_24px_70px_-45px_rgba(35,64,120,0.48)] backdrop-blur md:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6485c3]">
              Contacto
            </p>
            <h1 className="mt-4 text-4xl leading-[1.02] text-[#1f3f76] sm:text-5xl">
              Agenda tu evaluacion con atencion personalizada
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-slate-700 sm:text-base">
              Escribenos y te ayudaremos a resolver dudas sobre servicios, horarios y
              disponibilidad por profesional.
            </p>

            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {contactCards.map((item) => {
                const Icon = item.icon;
                const content = (
                  <>
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#eaf1ff] text-[#457ddf]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6e8ec6]">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">
                      {item.value}
                    </p>
                  </>
                );

                if (!item.href) {
                  return (
                    <article key={item.title} className="rounded-2xl border border-[#d4e2fb] bg-[#f8fbff] p-5">
                      {content}
                    </article>
                  );
                }

                return (
                  <a
                    key={item.title}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                    className="rounded-2xl border border-[#d4e2fb] bg-[#f8fbff] p-5 transition hover:-translate-y-0.5 hover:border-[#bdd3fa]"
                  >
                    {content}
                  </a>
                );
              })}
            </div>

            <div className="mt-8 rounded-2xl border border-[#d4e2fb] bg-[#f8fbff] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6e8ec6]">
                Horario de atencion
              </p>
              <div className="mt-3 flex items-start gap-3 text-sm text-slate-700">
                <Clock3 className="mt-0.5 h-4 w-4 text-[#5e82c7]" />
                <div className="space-y-1.5">
                  <p>Agenda segun disponibilidad de cada profesional.</p>
                  <p>Selecciona especialista y horario en la agenda online.</p>
                </div>
              </div>
            </div>
          </aside>

          <div className="rounded-[2rem] border border-[#ccdcfa] bg-white p-7 shadow-[0_24px_70px_-45px_rgba(35,64,120,0.48)] md:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6485c3]">
              Formulario de contacto
            </p>
            <h2 className="mt-4 text-3xl leading-tight text-[#1f3f76] sm:text-4xl">
              Cuentanos tu caso y te responderemos a la brevedad
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-700">
              Si prefieres, indicanos en tu mensaje si quieres respuesta por WhatsApp o
              llamada telefonica.
            </p>

            <form
              className="mt-8 space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                enviarCorreo();
              }}
            >
              <div className="space-y-2">
                <label htmlFor="nombre" className="text-sm font-medium text-slate-700">
                  Nombre
                </label>
                <Input
                  id="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej: Camila Perez"
                  className="h-11 rounded-xl border-[#cfdffb] bg-white"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-700">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ej: correo@ejemplo.com"
                  className="h-11 rounded-xl border-[#cfdffb] bg-white"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="mensaje" className="text-sm font-medium text-slate-700">
                  Mensaje
                </label>
                <Textarea
                  id="mensaje"
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  placeholder="Escribe tu consulta..."
                  className="min-h-[150px] rounded-xl border-[#cfdffb] bg-white"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-[#4e84e8] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#3e75dd]"
              >
                Enviar mensaje
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
