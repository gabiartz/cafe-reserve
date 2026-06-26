"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image";

interface Testimonial {
  name: string;
  role: string;
  image?: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Em breve",
    role: "Participante",
    quote: "Depoimentos de participantes serão adicionados aqui após o evento.",
  },
];

export function Testimonials() {
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
          <span className="text-gold-gradient">Depoimentos</span>
        </h2>
        <p className="text-gray-400 max-w-md mx-auto">
          O que dizem sobre nossas experiências
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="glass border-gold-gradient rounded-2xl p-6 relative"
          >
            <Quote className="absolute top-4 right-4 w-8 h-8 text-[#c9a86c]/20" />

            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-[#c9a86c]/10 overflow-hidden flex items-center justify-center">
                {testimonial.image ? (
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={56}
                    height={56}
                    className="object-cover"
                  />
                ) : (
                  <span className="text-2xl text-[#c9a86c]">
                    {testimonial.name[0]}
                  </span>
                )}
              </div>
              <div>
                <h3 className="text-white font-medium">{testimonial.name}</h3>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed italic">
              &quot;{testimonial.quote}&quot;
            </p>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="text-center text-gray-500 text-sm mt-8"
      >
        Mais depoimentos serão adicionados após o evento
      </motion.p>
    </div>
  );
}
