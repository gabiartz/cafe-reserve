"use client";

import { motion } from "framer-motion";
import {
  Coffee,
  Target,
  Users,
  Gift,
  Camera,
  Sparkles,
  Wine,
  UtensilsCrossed,
} from "lucide-react";
import { EVENT_CONFIG } from "@/lib/event-config";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  coffee: Coffee,
  target: Target,
  users: Users,
  gift: Gift,
  camera: Camera,
  sparkles: Sparkles,
  wine: Wine,
  utensils: UtensilsCrossed,
};

export function Timeline() {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-[27px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#c9a86c] via-[#c9a86c]/50 to-transparent" />

      <div className="space-y-6">
        {EVENT_CONFIG.timeline.map((item, index) => {
          const Icon = iconMap[item.icon] || Coffee;

          return (
            <motion.div
              key={item.time}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative flex items-start gap-4 group"
            >
              {/* Time badge */}
              <div className="relative z-10 flex-shrink-0 w-14 h-14 rounded-full bg-[#1a1a1a] border-2 border-[#c9a86c] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-6 h-6 text-[#c9a86c]" />
              </div>

              {/* Content */}
              <div className="flex-1 glass border-gold-gradient rounded-xl p-4 group-hover:border-[#c9a86c] transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[#c9a86c] font-semibold text-lg">
                    {item.time}
                  </span>
                  <span className="h-[1px] flex-1 bg-gradient-to-r from-[#c9a86c]/50 to-transparent" />
                </div>
                <h3 className="text-white font-medium text-lg mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
