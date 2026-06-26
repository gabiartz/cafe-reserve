"use client";

import { motion } from "framer-motion";
import { Star, MapPin, Phone, ExternalLink } from "lucide-react";
import { EVENT_CONFIG } from "@/lib/event-config";

export function Hotels() {
  const { hotels } = EVENT_CONFIG;

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          <span className="text-gold-gradient">Hospedagem</span>
        </h2>
        <p className="text-gray-400 max-w-md mx-auto">
          Sugestões de hotéis próximos ao local do evento
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hotels.map((hotel, index) => (
          <motion.div
            key={hotel.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="glass border-gold-gradient rounded-2xl p-5 hover:border-[#c9a86c] transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-medium text-white group-hover:text-[#c9a86c] transition-colors">
                {hotel.name}
              </h3>
              <div className="flex">
                {Array.from({ length: hotel.stars }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-3 h-3 fill-[#c9a86c] text-[#c9a86c]"
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2 text-gray-400">
                <MapPin className="w-4 h-4 text-[#c9a86c] flex-shrink-0 mt-0.5" />
                <div>
                  <p>{hotel.address}</p>
                  <p className="text-[#c9a86c]">{hotel.distance} do evento</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-400">
                <Phone className="w-4 h-4 text-[#c9a86c] flex-shrink-0" />
                <a
                  href={`tel:${hotel.phone.replace(/\D/g, "")}`}
                  className="hover:text-[#c9a86c] transition-colors"
                >
                  {hotel.phone}
                </a>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#333]">
                <span className="text-gray-500">{hotel.priceRange}</span>
                <a
                  href={hotel.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#c9a86c] hover:text-[#d4b87a] transition-colors text-sm"
                >
                  Ver site
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
