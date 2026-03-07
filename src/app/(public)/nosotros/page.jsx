import { Activity, Ear, HandHeart, Salad, Sparkles, Users } from "lucide-react";
import RevealOnScroll from "@/Componentes/RevealOnScroll";

const areas = [
  {
    title: "Area Kinesiologica",
    lead: "Camilo Flores Renin",
    text: "Evaluacion y terapia para reducir dolor, recuperar movilidad y mejorar funcionalidad fisica.",
    icon: Activity,
  },
  {
    title: "Area Psicologica",
    lead: "Valentina Cortes Lagos",
    text: "Terapia para adultos, ninas, ninos y adolescentes, con enfoque emocional y acompanamiento familiar.",
    icon: Users,
  },
  {
    title: "Area Fonoaudiologica",
    lead: "Valentina Jofre Torres",
    text: "Atencion en habla, lenguaje, voz y comunicacion, con servicio adicional de lavado de oidos.",
    icon: Ear,
  },
  {
    title: "Area Nutricional",
    lead: "Vanessa Garcia Paillan",
    text: "Evaluacion de composicion corporal y plan de alimentacion personalizado segun objetivos.",
    icon: Salad,
  },
  {
    title: "Area Masoterapia",
    lead: "Camila Villalobos Conejeros",
    text: "Masaje relajante, descontracturante, mixto y cervico craneal para bienestar integral.",
    icon: HandHeart,
  },
  {
    title: "Terapias Complementarias",
    lead: "Carola Quezada",
    text: "Constelaciones familiares para abordar dinamicas relacionales y fortalecer salud emocional.",
    icon: Sparkles,
  },
];

export default function NosotrosPage() {
  return (
    <main className="bg-transparent text-slate-900">
      <section className="scroll-mt-24 py-20 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10">
          <RevealOnScroll>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5e82c7]">Nosotros</p>
            <h1 className="mt-4 max-w-4xl text-balance text-3xl font-semibold leading-tight tracking-tight text-[#1a376b] sm:text-4xl lg:text-5xl">
              Centro de salud integral en Puerto Aysen con agenda por profesional.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-700">
              En Salud HOI trabajamos con equipos interdisciplinarios para abordar prevencion,
              tratamiento y bienestar con atencion cercana y planes personalizados.
            </p>
          </RevealOnScroll>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {areas.map((item, index) => {
              const Icon = item.icon;

              return (
                <RevealOnScroll
                  key={item.title}
                  className="h-full"
                  delayClass={
                    index % 3 === 0 ? "delay-75" : index % 3 === 1 ? "delay-100" : "delay-150"
                  }
                >
                  <article className="h-full rounded-3xl border border-[#cbdcf8] bg-white/95 p-6 shadow-[0_20px_40px_-30px_rgba(45,78,145,0.8)]">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf3ff] text-[#4a80e0]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold tracking-tight text-[#1f3f76]">{item.title}</h3>
                    <p className="mt-2 text-sm font-semibold uppercase tracking-[0.09em] text-[#6787c5]">
                      {item.lead}
                    </p>
                    <p className="mt-4 text-sm leading-7 text-slate-700">{item.text}</p>
                  </article>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
