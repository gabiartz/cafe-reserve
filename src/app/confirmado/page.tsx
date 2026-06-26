"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Check,
  Calendar,
  MapPin,
  Clock,
  Download,
  Share2,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { EVENT_CONFIG } from "@/lib/event-config";

interface ConfirmationData {
  id: string;
  name: string;
  confirmedAt: string;
  qrCode: string;
}

function ConfirmadoContent() {
  const searchParams = useSearchParams();
  const confirmationId = searchParams.get("id");
  const [data, setData] = useState<ConfirmationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (confirmationId) {
      fetch(`/api/rsvp?id=${confirmationId}`)
        .then((res) => res.json())
        .then((result) => {
          if (result.error) {
            setError(result.error);
          } else {
            setData(result);
          }
          setLoading(false);
        })
        .catch(() => {
          setError("Erro ao carregar confirmação");
          setLoading(false);
        });
    } else {
      setError("ID de confirmação não fornecido");
      setLoading(false);
    }
  }, [confirmationId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="w-12 h-12 border-4 border-[#c9a86c] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] px-4">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">Ops!</h1>
          <p className="text-gray-400 mb-6">{error || "Confirmação não encontrada"}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#c9a86c] hover:text-[#d4b87a]"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao convite
          </Link>
        </div>
      </div>
    );
  }

  const handleDownload = async () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Card dimensions
    canvas.width = 600;
    canvas.height = 900;

    // Background
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Gold border
    ctx.strokeStyle = "#c9a86c";
    ctx.lineWidth = 3;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    // Title - Presença Confirmada
    ctx.fillStyle = "#c9a86c";
    ctx.font = "bold 36px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Presença Confirmada", canvas.width / 2, 80);

    // Decorative line
    ctx.beginPath();
    ctx.moveTo(150, 110);
    ctx.lineTo(450, 110);
    ctx.strokeStyle = "#c9a86c";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Name
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 28px Inter, sans-serif";
    ctx.fillText(data.name, canvas.width / 2, 160);

    // Event name
    ctx.fillStyle = "#c9a86c";
    ctx.font = "20px Inter, sans-serif";
    ctx.fillText(EVENT_CONFIG.name, canvas.width / 2, 200);

    // QR Code
    const qrImg = document.createElement("img");
    qrImg.src = data.qrCode;

    await new Promise((resolve) => {
      qrImg.onload = resolve;
    });

    const qrSize = 280;
    const qrX = (canvas.width - qrSize) / 2;
    const qrY = 240;

    // QR background
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(qrX - 15, qrY - 15, qrSize + 30, qrSize + 30);

    ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);

    // Decorative line below QR
    ctx.beginPath();
    ctx.moveTo(150, 560);
    ctx.lineTo(450, 560);
    ctx.strokeStyle = "#c9a86c";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Date
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 24px Inter, sans-serif";
    ctx.fillText(EVENT_CONFIG.date, canvas.width / 2, 610);

    // Day of week
    ctx.fillStyle = "#888888";
    ctx.font = "18px Inter, sans-serif";
    ctx.fillText(EVENT_CONFIG.dayOfWeek, canvas.width / 2, 640);

    // Time
    ctx.fillStyle = "#c9a86c";
    ctx.font = "bold 22px Inter, sans-serif";
    ctx.fillText(`${EVENT_CONFIG.startTime} - ${EVENT_CONFIG.endTime}`, canvas.width / 2, 690);

    // Address
    ctx.fillStyle = "#ffffff";
    ctx.font = "18px Inter, sans-serif";
    ctx.fillText(EVENT_CONFIG.location.address, canvas.width / 2, 750);

    ctx.fillStyle = "#888888";
    ctx.font = "16px Inter, sans-serif";
    ctx.fillText(`${EVENT_CONFIG.location.city}, ${EVENT_CONFIG.location.state}`, canvas.width / 2, 780);

    // Footer
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 18px Inter, sans-serif";
    ctx.fillText("Apresente este QR Code na entrada do evento", canvas.width / 2, 840);

    // Download
    const link = document.createElement("a");
    link.download = `cafe-conexoes-${data.name.replace(/\s+/g, "-").toLowerCase()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: EVENT_CONFIG.name,
          text: `Minha presença está confirmada no ${EVENT_CONFIG.name}!`,
          url: window.location.href,
        });
      } catch {
        // User cancelled sharing
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-12 px-4">
      <div className="max-w-lg mx-auto">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#c9a86c] to-[#d4b87a] flex items-center justify-center"
        >
          <Check className="w-10 h-10 text-[#0a0a0a]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-semibold mb-2">
            <span className="text-gold-gradient">Presença Confirmada!</span>
          </h1>
          <p className="text-gray-400">
            Ola, <span className="text-white">{data.name}</span>! Sua presença está
            confirmada.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass border-gold-gradient rounded-2xl p-6 mb-6"
        >
          <h2 className="text-lg font-medium text-center mb-4 text-[#c9a86c]">
            Seu QR Code de Check-in
          </h2>

          <div className="flex justify-center mb-4">
            <div className="p-4 bg-[#0a0a0a] rounded-xl pulse-glow">
              <Image
                src={data.qrCode}
                alt="QR Code"
                width={200}
                height={200}
                className="rounded-lg"
              />
            </div>
          </div>

          <p className="text-center text-gray-400 text-sm mb-4">
            Apresente este QR Code na entrada do evento
          </p>

          <p className="text-center text-xs text-gray-500 mb-4">
            Código: <span className="text-[#c9a86c] font-mono">{data.id}</span>
          </p>

          <div className="flex gap-3">
            <button
              onClick={handleDownload}
              className="flex-1 py-3 bg-[#1a1a1a] border border-[#333] rounded-xl text-white flex items-center justify-center gap-2 hover:border-[#c9a86c] transition-colors"
            >
              <Download className="w-4 h-4" />
              Salvar
            </button>
            <button
              onClick={handleShare}
              className="flex-1 py-3 bg-[#1a1a1a] border border-[#333] rounded-xl text-white flex items-center justify-center gap-2 hover:border-[#c9a86c] transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Compartilhar
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass border-gold-gradient rounded-2xl p-6 mb-6"
        >
          <h2 className="text-lg font-medium mb-4 text-center">
            <span className="text-gold-gradient">Detalhes do Evento</span>
          </h2>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#c9a86c]/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[#c9a86c]" />
              </div>
              <div>
                <p className="text-white font-medium">{EVENT_CONFIG.date}</p>
                <p className="text-gray-500 text-sm">{EVENT_CONFIG.dayOfWeek}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#c9a86c]/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#c9a86c]" />
              </div>
              <div>
                <p className="text-white font-medium">
                  {EVENT_CONFIG.startTime} - {EVENT_CONFIG.endTime}
                </p>
                <p className="text-gray-500 text-sm">Horário do evento</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#c9a86c]/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-[#c9a86c]" />
              </div>
              <div>
                <p className="text-white font-medium">
                  {EVENT_CONFIG.location.address}
                </p>
                <p className="text-gray-500 text-sm">
                  {EVENT_CONFIG.location.city}, {EVENT_CONFIG.location.state}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <a
              href={EVENT_CONFIG.location.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 bg-[#1a1a1a] border border-[#333] rounded-xl text-white text-center hover:border-[#c9a86c] transition-colors text-sm"
            >
              Google Maps
            </a>
            <a
              href={EVENT_CONFIG.location.wazeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 bg-[#1a1a1a] border border-[#333] rounded-xl text-white text-center hover:border-[#c9a86c] transition-colors text-sm"
            >
              Waze
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Link
            href="/completo"
            className="text-[#c9a86c] hover:text-[#d4b87a] text-sm"
          >
            Ver informações completas (hotéis, trajetos)
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default function ConfirmadoPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
          <div className="w-12 h-12 border-4 border-[#c9a86c] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ConfirmadoContent />
    </Suspense>
  );
}
