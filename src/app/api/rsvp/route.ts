import { NextRequest, NextResponse } from "next/server";
import { generateQRCode, generateConfirmationId } from "@/lib/qr-generator";
import { EVENT_CONFIG } from "@/lib/event-config";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Nome e telefone são obrigatórios" },
        { status: 400 }
      );
    }

    // Check for duplicates
    const { data: existing } = await supabase
      .from("confirmations")
      .select("id")
      .eq("phone", phone)
      .single();

    if (existing) {
      return NextResponse.json(
        {
          error: "Este telefone já foi utilizado para confirmar presença",
          confirmationId: existing.id,
        },
        { status: 409 }
      );
    }

    // Check vacancy
    const { count } = await supabase
      .from("confirmations")
      .select("*", { count: "exact", head: true });

    if ((count || 0) >= EVENT_CONFIG.totalSpots) {
      return NextResponse.json(
        { error: "Desculpe, todas as vagas foram preenchidas" },
        { status: 410 }
      );
    }

    // Generate confirmation
    const confirmationId = generateConfirmationId();
    const confirmedAt = new Date().toISOString();

    const qrCode = await generateQRCode({
      id: confirmationId,
      name,
      phone,
      confirmedAt,
      eventDate: EVENT_CONFIG.dateISO,
    });

    // Save to Supabase
    const { error: insertError } = await supabase.from("confirmations").insert({
      id: confirmationId,
      name,
      phone,
      confirmed_at: confirmedAt,
      qr_code: qrCode,
    });

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return NextResponse.json(
        { error: "Erro ao salvar confirmação. Tente novamente." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      confirmationId,
      qrCode,
      spotsRemaining: EVENT_CONFIG.totalSpots - ((count || 0) + 1),
    });
  } catch (error) {
    console.error("RSVP error:", error);
    return NextResponse.json(
      { error: "Erro interno. Tente novamente." },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const { data: confirmation } = await supabase
      .from("confirmations")
      .select("*")
      .eq("id", id)
      .single();

    if (!confirmation) {
      return NextResponse.json(
        { error: "Confirmação não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: confirmation.id,
      name: confirmation.name,
      confirmedAt: confirmation.confirmed_at,
      qrCode: confirmation.qr_code,
    });
  }

  // Return stats only
  const { count } = await supabase
    .from("confirmations")
    .select("*", { count: "exact", head: true });

  return NextResponse.json({
    totalSpots: EVENT_CONFIG.totalSpots,
    confirmedSpots: count || 0,
    spotsRemaining: EVENT_CONFIG.totalSpots - (count || 0),
  });
}
