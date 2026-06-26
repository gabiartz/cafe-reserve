import QRCode from "qrcode";

export interface ConfirmationData {
  id: string;
  name: string;
  phone: string;
  confirmedAt: string;
  eventDate: string;
}

export async function generateQRCode(data: ConfirmationData): Promise<string> {
  const qrData = JSON.stringify({
    type: "cafe-conexoes-checkin",
    id: data.id,
    name: data.name,
    phone: data.phone,
    event: "cafe-conexoes-2025",
  });

  const qrCodeDataUrl = await QRCode.toDataURL(qrData, {
    width: 300,
    margin: 2,
    color: {
      dark: "#c9a86c",
      light: "#0a0a0a",
    },
    errorCorrectionLevel: "H",
  });

  return qrCodeDataUrl;
}

export function generateConfirmationId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `CC-${timestamp}-${random}`.toUpperCase();
}
