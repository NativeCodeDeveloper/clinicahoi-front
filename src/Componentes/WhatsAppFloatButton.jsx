import { MessageCircle } from "lucide-react";

export default function WhatsAppFloatButton() {
  return (
    <a
      href="https://wa.me/56972228872"
      target="_blank"
      rel="noreferrer"
      aria-label="Abrir WhatsApp"
      className="fixed bottom-5 right-5 z-[70] inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#c5d8fb] bg-[#4f84e8] text-white shadow-[0_18px_36px_-20px_rgba(32,72,145,0.95)] transition duration-300 ease-out hover:scale-105 hover:bg-[#3f76de]"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
