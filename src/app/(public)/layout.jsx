import Navbar from "@/Componentes/Navbar";
import FooterPremiumMedico from "@/Componentes/Footer";
import ToasterClient from "@/Componentes/ToasterClient";
import WhatsAppFloatButton from "@/Componentes/WhatsAppFloatButton";
import CarritoProvider from "@/ContextosGlobales/CarritoContext";
import ObjetoPagarProvider from "@/ContextosGlobales/ObjetoPagarContext";
import Image from "next/image";

export default function PublicLayout({ children }) {
  return (
    <CarritoProvider>
      <ObjetoPagarProvider>
        <div className="relative min-h-screen overflow-x-clip text-slate-900">
          <div className="pointer-events-none fixed inset-0 -z-10">
            <Image
              src="/logo41.png"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-[0.38]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(241,246,255,0.52)_0%,rgba(224,236,255,0.46)_45%,rgba(243,248,255,0.54)_100%)]" />
          </div>

          <ToasterClient />
          <Navbar />
          <main className="relative pt-20">{children}</main>
          <FooterPremiumMedico />
          <WhatsAppFloatButton />
        </div>
      </ObjetoPagarProvider>
    </CarritoProvider>
  );
}
