"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.967C16.63 1.97 14.156.944 11.53.944c-5.437 0-9.87 4.37-9.874 9.8.001 2.12.553 4.19 1.6 5.996L2.2 21.8l5.184-1.353c1.782.973 3.633 1.488 5.617 1.488zM17.13 14.39c-.28-.14-1.65-.81-1.91-.9-.26-.1-.45-.14-.64.14-.19.28-.73.9-.9 1.09-.17.19-.34.21-.62.07-1.16-.58-1.92-1.03-2.68-2.33-.2-.35.2-.32.57-1.06.06-.12.03-.23-.01-.33-.05-.1-.45-1.09-.62-1.49-.17-.4-.36-.34-.5-.34-.13 0-.28 0-.43 0-.15 0-.4.06-.61.28-.21.22-.8.78-.8 1.9 0 1.12.82 2.2 1.01 2.33.19.14 1.62 2.47 3.92 3.47.55.24 1 .38 1.34.48.55.17 1.05.15 1.45.09.44-.06 1.65-.67 1.88-1.32.23-.65.23-1.21.16-1.32-.07-.11-.26-.18-.54-.32z"/>
  </svg>
);

export default function WhatsAppFloat() {
  const [hovered, setHovered] = useState(false);
  const phoneNumber = "918300074144";
  const defaultMessage = "Hi sir";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex items-center">
      {/* Tooltip Label */}
      <motion.div
        initial={{ opacity: 0, x: 15, scale: 0.9 }}
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 15, scale: hovered ? 1 : 0.9 }}
        transition={{ duration: 0.2 }}
        className="absolute right-16 bg-[#1a1a1a]/95 text-white border border-white/10 text-xs px-3.5 py-2 rounded-xl font-mono tracking-wide whitespace-nowrap shadow-xl pointer-events-none"
      >
        Chat on WhatsApp
      </motion.div>

      {/* Floating Pulsating Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white shadow-2xl relative"
        style={{
          background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
          boxShadow: "0 8px 30px rgba(37, 211, 102, 0.4)",
        }}
      >
        {/* Pulsating Ring Layer */}
        <span 
          className="absolute inset-0 rounded-full animate-ping opacity-25 pointer-events-none" 
          style={{ background: "#25D366", animationDuration: "2.5s" }}
        />

        <WhatsAppIcon />
      </motion.a>
    </div>
  );
}
