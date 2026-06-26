"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

interface VacancyCounterProps {
  totalSpots?: number;
  confirmedSpots?: number;
}

export function VacancyCounter({ }: VacancyCounterProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="glass rounded-2xl p-6 border-2 border-[#c9a86c] pulse-glow">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-14 h-14 rounded-full bg-[#c9a86c]/20 flex items-center justify-center"
            >
              <AlertCircle className="w-7 h-7 text-[#c9a86c]" />
            </motion.div>
          </div>

          <h3 className="text-2xl font-bold text-[#c9a86c] mb-2">
            ⚠️ Vagas Limitadas
          </h3>

          <p className="text-white leading-relaxed font-medium">
            Confirme sua presença apenas se você realmente puder comparecer.
          </p>

          <p className="text-gray-400 text-sm mt-3">
            Ao confirmar e não ir, você estará tirando a oportunidade de alguém que adoraria participar.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
