"use client";

import { motion } from "framer-motion";
import { Plane, Clock, Car, Navigation } from "lucide-react";
import { EVENT_CONFIG } from "@/lib/event-config";

export function Airports() {
  const { airports } = EVENT_CONFIG;

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
          <span className="text-gold-gradient">Como Chegar</span>
        </h2>
        <p className="text-gray-400 max-w-md mx-auto">
          Informações de trajeto dos aeroportos até o local do evento
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {airports.map((airport, index) => (
          <motion.div
            key={airport.code}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="glass border-gold-gradient rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#c9a86c]/10 flex items-center justify-center">
                <Plane className="w-6 h-6 text-[#c9a86c]" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">
                  {airport.name}
                </h3>
                <p className="text-[#c9a86c] text-sm">{airport.code}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <Navigation className="w-4 h-4 text-[#c9a86c]" />
                  <span>{airport.distance}</span>
                </div>
                <span className="text-gray-600">|</span>
                <div className="flex items-center gap-2 text-gray-400">
                  <Clock className="w-4 h-4 text-[#c9a86c]" />
                  <span>{airport.travelTime}</span>
                </div>
              </div>

              <div className="p-4 bg-[#1a1a1a] rounded-xl">
                <p className="text-gray-400 text-sm leading-relaxed">
                  {airport.directions}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-[#c9a86c] flex items-center gap-2">
                  <Car className="w-4 h-4" />
                  Estimativa de custos
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="p-3 bg-[#1a1a1a] rounded-lg">
                    <p className="text-gray-500 text-xs mb-1">Uber/99</p>
                    <p className="text-white">{airport.uber}</p>
                  </div>
                  <div className="p-3 bg-[#1a1a1a] rounded-lg">
                    <p className="text-gray-500 text-xs mb-1">Taxi</p>
                    <p className="text-white">{airport.taxi}</p>
                  </div>
                </div>
                {airport.shuttle && (
                  <div className="p-3 bg-[#1a1a1a] rounded-lg text-sm">
                    <p className="text-gray-500 text-xs mb-1">Shuttle/Ônibus</p>
                    <p className="text-white">{airport.shuttle}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
