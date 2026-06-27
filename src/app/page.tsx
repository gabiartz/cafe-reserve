"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Clock,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { CheckoutButton, Timeline } from "@/components";
import { EVENT_CONFIG } from "@/lib/event-config";

const HUBLA_CHECKOUT_URL = "https://pay.hub.la/Xx1ZEszBgoJjbT2u4N7p";

export default function HomePage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section with Video */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            onPlay={() => setIsVideoPlaying(true)}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${
              isVideoPlaying ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src="/evento-local.mov" type="video/mp4" />
            <source src="/evento-local.mov" type="video/quicktime" />
          </video>
          <div className="video-overlay absolute inset-0" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-4 -mt-[2.5rem] md:-mt-12">
              <Image
                src="/logo-allexclusive.png"
                alt="All Exclusive"
                width={70}
                height={70}
                className="mx-auto rounded-full object-cover aspect-square"
              />
            </div>
            <div className="inline-block px-8 py-3 bg-[#0a0a0a]/95 backdrop-blur-sm rounded-full mb-4 -mt-4 md:-mt-4">
              <p className="text-[#c9a86c] text-sm tracking-[0.3em] uppercase">
                Convite Exclusivo
              </p>
            </div>

            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
              style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.8))" }}
            >
              <span className="text-gold-gradient">{EVENT_CONFIG.name}</span>
            </h1>

            <p
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
              style={{ textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000" }}
            >
              {EVENT_CONFIG.tagline}
            </p>

            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
              style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.8))" }}
            >
              <div className="flex items-center gap-2 text-white">
                <Calendar className="w-5 h-5 text-[#c9a86c]" />
                <span>{EVENT_CONFIG.date}</span>
              </div>
              <span className="hidden sm:block text-gray-600">|</span>
              <div className="flex items-center gap-2 text-white">
                <Clock className="w-5 h-5 text-[#c9a86c]" />
                <span>
                  {EVENT_CONFIG.startTime} - {EVENT_CONFIG.endTime}
                </span>
              </div>
            </div>

            <motion.a
              href="#checkout"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#c9a86c] to-[#d4b87a] text-[#0a0a0a] font-semibold rounded-full hover:shadow-lg hover:shadow-[#c9a86c]/30 transition-all duration-300"
            >
              Reservar Minha Vaga
            </motion.a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ChevronDown className="w-8 h-8 text-[#c9a86c]" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Promise Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              <span className="text-gold-gradient">O Que Te Espera</span>
            </h2>

            <div className="space-y-4 text-lg text-gray-300">
              <p>
                Um dia inteiro de <span className="text-white">estratégias diferenciadas</span> para
                você se posicionar como <span className="text-[#c9a86c]">referência</span> no seu mercado.
              </p>
              <p>
                <span className="text-white">Networking intencional</span> com pessoas que estão no mesmo nível
                de comprometimento que você.
              </p>
              <p>
                <span className="text-white">Fotos em uma casa espetacular</span> para elevar sua autoridade e presença digital.
              </p>
              <p>
                E surpresas que você <span className="text-[#c9a86c]">não pode perder</span>.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-10 px-4 bg-[#0d0d0d]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass border-gold-gradient rounded-2xl p-8"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-[#c9a86c]/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-8 h-8 text-[#c9a86c]" />
              </div>

              <div className="text-center md:text-left flex-1">
                <h3 className="text-xl font-medium text-white mb-2">
                  {EVENT_CONFIG.location.name}
                </h3>
                <p className="text-gray-400">
                  {EVENT_CONFIG.location.address}
                </p>
                <p className="text-gray-400">
                  {EVENT_CONFIG.location.city}, {EVENT_CONFIG.location.state}
                </p>
              </div>

              <div className="flex flex-col gap-3 items-center">
                <Link
                  href="/completo"
                  className="px-4 py-2 bg-[#c9a86c] rounded-xl text-[#0a0a0a] font-medium flex items-center justify-center gap-2 hover:bg-[#d4b87a] transition-colors text-sm"
                >
                  Trajeto, Hotéis e Dress Code
                  <ExternalLink className="w-3 h-3" />
                </Link>
                <div className="flex gap-3 justify-center">
                  <a
                    href={EVENT_CONFIG.location.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#1a1a1a] border border-[#333] rounded-xl text-white flex items-center gap-2 hover:border-[#c9a86c] transition-colors text-sm"
                  >
                    Maps
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href={EVENT_CONFIG.location.wazeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#1a1a1a] border border-[#333] rounded-xl text-white flex items-center gap-2 hover:border-[#c9a86c] transition-colors text-sm"
                  >
                    Waze
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              <span className="text-gold-gradient">Programação do Dia</span>
            </h2>
            <p className="text-gray-400">
              Um dia completo de experiências exclusivas
            </p>
          </motion.div>

          <Timeline />
        </div>
      </section>

      {/* Checkout Section */}
      <section id="checkout" className="py-12 px-4 bg-[#0d0d0d]">
        <div className="max-w-md mx-auto">
          <CheckoutButton hublaUrl={HUBLA_CHECKOUT_URL} />
        </div>
      </section>

      {/* Link to Complete Version */}
      <section className="py-10 px-4 text-center">
        <Link
          href="/completo"
          className="inline-flex items-center gap-3 px-6 py-3 bg-[#1a1a1a] border border-[#c9a86c] rounded-full text-[#c9a86c] hover:bg-[#c9a86c] hover:text-[#0a0a0a] transition-all duration-300 font-medium"
        >
          Ver Trajeto, Hotéis e Dress Code
          <ExternalLink className="w-4 h-4" />
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-[#1a1a1a]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            Um evento exclusivo por{" "}
            <span className="text-[#c9a86c]">Gabriela Artz</span> | <span className="text-[#c9a86c]">Grupo All Exclusive</span>
          </p>
        </div>
      </footer>
    </main>
  );
}
