"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Check, Loader2, User, Phone, AlertCircle } from "lucide-react";

interface RSVPFormProps {
  onSuccess?: (data: { name: string; phone: string; qrCode: string }) => void;
}

export function RSVPForm({ onSuccess }: RSVPFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 11) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
    }
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Por favor, informe seu nome";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Nome deve ter pelo menos 3 caracteres";
    }

    const phoneNumbers = formData.phone.replace(/\D/g, "");
    if (!phoneNumbers) {
      newErrors.phone = "Por favor, informe seu telefone";
    } else if (phoneNumbers.length < 10 || phoneNumbers.length > 11) {
      newErrors.phone = "Telefone inválido. Use o formato (XX) XXXXX-XXXX";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.replace(/\D/g, ""),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        if (onSuccess) {
          onSuccess({
            name: formData.name,
            phone: formData.phone,
            qrCode: data.qrCode,
          });
        }
        // Redirect to confirmation page with QR code
        setTimeout(() => {
          router.push(`/confirmado?id=${data.confirmationId}`);
        }, 1500);
      } else {
        setErrors({ submit: data.error || "Erro ao confirmar. Tente novamente." });
        setSubmitStatus("error");
      }
    } catch {
      setErrors({ submit: "Erro de conexão. Tente novamente." });
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto"
    >
      <div className="relative glass rounded-2xl p-6 md:p-8 border border-[#c9a86c]/50 overflow-hidden">
        {/* Shimmer effect */}
        <div className="absolute inset-0 shimmer pointer-events-none" />

        <div className="relative z-10">
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="text-center mb-2"
          >
            <h3 className="text-xl md:text-2xl font-bold whitespace-nowrap">
              <span className="text-gold-gradient">✨ Confirme sua Presença ✨</span>
            </h3>
          </motion.div>
          <p className="text-white text-center text-base font-semibold mb-2">
            Preencha seus dados para garantir seu lugar
          </p>
          <p className="text-center text-sm text-[#c9a86c] mb-6">
            Ao confirmar, você receberá um <span className="font-semibold text-white">QR Code exclusivo</span> para check-in no dia do evento
          </p>

          <div className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Nome completo
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, name: e.target.value }));
                  if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                }}
                placeholder="Seu nome"
                className={`w-full pl-12 pr-4 py-3 bg-[#1a1a1a] border rounded-xl text-white placeholder:text-gray-500 ${
                  errors.name ? "border-red-500" : "border-[#333]"
                }`}
              />
            </div>
            <AnimatePresence>
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-400 text-xs mt-1 flex items-center gap-1"
                >
                  <AlertCircle className="w-3 h-3" />
                  {errors.name}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Telefone (WhatsApp)
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    phone: formatPhone(e.target.value),
                  }));
                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
                }}
                placeholder="(11) 99999-9999"
                className={`w-full pl-12 pr-4 py-3 bg-[#1a1a1a] border rounded-xl text-white placeholder:text-gray-500 ${
                  errors.phone ? "border-red-500" : "border-[#333]"
                }`}
              />
            </div>
            <AnimatePresence>
              {errors.phone && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-400 text-xs mt-1 flex items-center gap-1"
                >
                  <AlertCircle className="w-3 h-3" />
                  {errors.phone}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Submit Error */}
          <AnimatePresence>
            {errors.submit && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl"
              >
                <p className="text-red-400 text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {errors.submit}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || submitStatus === "success"}
            className="btn-gold w-full py-4 bg-gradient-to-r from-[#c9a86c] to-[#d4b87a] text-[#0a0a0a] font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Confirmando...
              </span>
            ) : submitStatus === "success" ? (
              <span className="flex items-center justify-center gap-2">
                <Check className="w-5 h-5" />
                Presença Confirmada!
              </span>
            ) : (
              "Confirmar Minha Presença"
            )}
          </button>

          </div>
        </div>
      </div>
    </motion.form>
  );
}
