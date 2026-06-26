"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { EVENT_CONFIG } from "@/lib/event-config";

export function DressCode() {
  const { dressCode } = EVENT_CONFIG;

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="glass border-gold-gradient rounded-2xl p-8 text-center max-w-lg mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          <span className="text-gold-gradient">Dress Code</span>
        </h2>
        <p className="text-2xl text-white font-medium mb-4">
          {dressCode.style}
        </p>
        <p className="text-white text-sm flex items-center justify-center gap-2 font-semibold">
          <Sparkles className="w-4 h-4 text-[#c9a86c]" />
          {dressCode.note}
          <Sparkles className="w-4 h-4 text-[#c9a86c]" />
        </p>
      </motion.div>
    </div>
  );
}
