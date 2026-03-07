import "./globals.css";
import { AnimatedLayout } from "@/Componentes/AnimatedLayout";
import AgendaProvider from "@/ContextosGlobales/AgendaContext";
import { Inter, Lato, Michroma, Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["300", "400", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
});

const michroma = Michroma({
  subsets: ["latin"],
  variable: "--font-michroma",
  weight: ["400"],
});

export const metadataBase = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.saludhoi.cl"
);

export const metadata = {
  title: {
    default: "Salud HOI | Centro de Salud Integral",
    template: "%s | Salud HOI",
  },
  description:
    "Sitio oficial de Salud HOI en Puerto Aysen. Agenda de profesionales, atencion integral y servicios de salud.",
  keywords: [
    "Salud HOI",
    "centro de salud integral",
    "Puerto Aysen",
    "kinesiologia",
    "nutricion",
    "psicologia",
    "masoterapia",
    "agenda de profesionales",
  ],
  authors: [{ name: "Salud HOI", url: metadataBase.href }],
  publisher: "Salud HOI",
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  alternates: {
    canonical: metadataBase.href,
  },
  openGraph: {
    title: "Salud HOI | Centro de Salud Integral",
    description:
      "Atencion integral en salud con agenda por profesional en Puerto Aysen.",
    url: metadataBase.href,
    siteName: "Salud HOI",
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Salud HOI",
    description:
      "Centro de salud integral con agenda online por profesional.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${montserrat.variable} ${lato.variable} ${inter.variable} ${michroma.variable}`}>
      <body className="min-h-screen bg-white">
        <AnimatedLayout>
          <AgendaProvider>{children}</AgendaProvider>
        </AnimatedLayout>
      </body>
    </html>
  );
}
