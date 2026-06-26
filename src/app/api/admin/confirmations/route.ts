import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data: confirmations, error } = await supabase
      .from("confirmations")
      .select("id, name, phone, confirmed_at")
      .order("confirmed_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ confirmations: [] });
    }

    // Format for frontend
    const formatted = confirmations?.map((c) => ({
      id: c.id,
      name: c.name,
      phone: c.phone,
      confirmedAt: c.confirmed_at,
    })) || [];

    return NextResponse.json({ confirmations: formatted });
  } catch {
    return NextResponse.json({ confirmations: [] });
  }
}
