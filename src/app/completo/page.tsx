"use client";

import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  RSVPForm,
  VacancyCounter,
  DressCode,
  Hotels,
  Airports,
} from "@/components";
import { EVENT_CONFIG } from "@/lib/event-config";

export default function CompletoPage() {
  const [confirmedSpots, setConfirmedSpots] = useState(0);

  useEffect(() => {
    fetch("/api/rsvp")
      .then((res) => res.json())
      .then((data) => {
        setConfirmedSpots(data.confirmedSpots || 0);
      })
      .catch(() => {});
  }, []);

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

      {/* Vacancy Counter */}
      <section className="py-10 px-4 bg-[#0d0d0d]">
        <div className="max-w-md mx-auto">
          <VacancyCounter
            totalSpots={EVENT_CONFIG.totalSpots}
            confirmedSpots={confirmedSpots}
          />
        </div>
      </section>

      {/* RSVP Section */}
      <section id="rsvp" className="py-12 px-4">
        <div className="max-w-md mx-auto">
          <RSVPForm />
        </div>
      </section>
    </main>
  );
}
