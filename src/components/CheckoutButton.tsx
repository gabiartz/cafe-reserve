"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface CheckoutButtonProps {
  hublaUrl?: string;
}

export function CheckoutButton({ hublaUrl = "#" }: CheckoutButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="relative glass rounded-2xl p-6 md:p-8 border border-[#c9a86c]/50 overflow-hidden">
        {/* Shimmer effect */}
        <div className="absolute inset-0 shimmer pointer-events-none" />

        <div className="relative z-10">
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="text-center mb-2"
          >
            <h3 className="text-xl md:text-2xl font-bold whitespace-nowrap">
              <span className="text-gold-gradient">✨ Reserve Sua Vaga ✨</span>
            </h3>
          </motion.div>

          <p className="text-white text-center text-base font-semibold mb-2">
            Garanta seu lugar neste evento exclusivo
          </p>

          <div className="text-center mb-6">
            <p className="text-gray-400 text-sm line-through">De R$ 2.990</p>
            <p className="text-3xl font-bold text-[#c9a86c]">R$ 1.990</p>
            <p className="text-gray-400 text-xs">ou 12x de R$ 199,17</p>
          </div>

          <a
            href={hublaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold w-full py-4 bg-gradient-to-r from-[#c9a86c] to-[#d4b87a] text-[#0a0a0a] font-semibold rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#c9a86c]/30 transition-all duration-300"
          >
            Reservar Minha Vaga
            <ExternalLink className="w-5 h-5" />
          </a>

          <div className="mt-6 p-4 bg-[#c9a86c]/10 border border-[#c9a86c]/30 rounded-xl">
            <p className="text-center text-sm text-[#c9a86c]">
              Pagamento seguro via <span className="font-semibold text-white">Hubla</span> - Cartão, Pix ou Boleto
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
