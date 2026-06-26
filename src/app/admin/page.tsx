"use client";

import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Confirmation {
  id: string;
  name: string;
  phone: string;
  confirmedAt: string;
}

export default function AdminPage() {
  const [confirmations, setConfirmations] = useState<Confirmation[]>([]);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const checkPassword = () => {
    if (password === "gabi2026") {
      setAuthenticated(true);
      fetchConfirmations();
    } else {
      alert("Senha incorreta");
    }
  };

  const fetchConfirmations = async () => {
    try {
      const res = await fetch("/api/admin/confirmations");
      const data = await res.json();
      setConfirmations(data.confirmations || []);
    } catch (error) {
      console.error("Erro ao carregar confirmações:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
        <div className="glass rounded-2xl p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">
            Área Administrativa
          </h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && checkPassword()}
            placeholder="Digite a senha"
            className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#333] rounded-xl text-white mb-4"
          />
          <button
            onClick={checkPassword}
            className="w-full py-3 bg-[#c9a86c] text-[#0a0a0a] font-semibold rounded-xl"
          >
            Entrar
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#c9a86c] hover:text-[#d4b87a]"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </Link>
          <h1 className="text-2xl font-bold text-white">
            Confirmações ({confirmations.length}/40)
          </h1>
        </div>

        {loading ? (
          <p className="text-gray-400">Carregando...</p>
        ) : confirmations.length === 0 ? (
          <div className="glass rounded-2xl p-8 text-center">
            <p className="text-gray-400">Nenhuma confirmação ainda.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {confirmations.map((c, index) => (
              <div
                key={c.id}
                className="glass rounded-xl p-4 flex items-center justify-between"
              >
                <div>
                  <p className="text-white font-medium">
                    {index + 1}. {c.name}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {c.phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")}
                  </p>
                </div>
                <p className="text-gray-500 text-xs">
                  {new Date(c.confirmedAt).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
