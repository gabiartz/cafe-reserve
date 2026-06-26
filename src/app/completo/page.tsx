"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  CheckoutButton,
  DressCode,
  Hotels,
  Airports,
} from "@/components";

const HUBLA_CHECKOUT_URL = "https://pay.hub.la/Xx1ZEszBgoJjbT2u4N7p";

export default function CompletoPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Back Link */}
      <div className="fixed top-4 left-4 z-50">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 glass rounded-full text-[#c9a86c] hover:text-[#d4b87a] transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Link>
      </div>

      {/* Dress Code Section */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <DressCode />
        </div>
      </section>

      {/* Hotels Section */}
      <section className="py-12 px-4 bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto">
          <Hotels />
        </div>
      </section>

      {/* Airports Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Airports />
        </div>
      </section>

      {/* Checkout Section */}
      <section id="checkout" className="py-12 px-4 bg-[#0d0d0d]">
        <div className="max-w-md mx-auto">
          <CheckoutButton hublaUrl={HUBLA_CHECKOUT_URL} />
        </div>
      </section>
    </main>
  );
}
