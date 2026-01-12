"use client";

import Link from "next/link";
import WhatsAppIcon from "./WhatsAppIcon";

type WhatsAppButtonProps = {
  phoneNumber: string; // country code + number (no +, no spaces)
  message?: string;
};

export default function WhatsAppButton({
  phoneNumber,
  message = "Hi, I'd like to know more about your services.",
}: WhatsAppButtonProps) {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="
        fixed bottom-6 right-6 z-50
        flex items-center justify-center
        w-14 h-14
        rounded-full
        bg-[#25D366]
        text-white text-2xl
        shadow-lg
        transition-transform duration-300
        hover:scale-110
        focus:outline-none
      "
    >
    <WhatsAppIcon size={26} />
    </Link>
  );
}