import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    if (!image) {
      return NextResponse.json({
        result: "No image provided",
        confidence: 0,
        reasons: [],
      });
    }

    // 🔥 basic pattern detection (FREE - no API)
    const lower = image.toLowerCase();

    let label = "✅ Safe";
    let confidence = 40;
    let reasons: string[] = [];

    if (lower.includes("otp") || /\d{4,6}/.test(lower)) {
      label = "🚨 Scam";
      confidence = 90;
      reasons.push("🔐 OTP detected in image");
    }

    if (lower.includes("bank")) {
      label = "⚠️ Suspicious";
      confidence = 70;
      reasons.push("🏦 Bank related content");
    }

    if (lower.includes("win") || lower.includes("offer")) {
      label = "⚠️ Suspicious";
      confidence = 75;
      reasons.push("🎁 Offer / lottery pattern");
    }

    return NextResponse.json({
      result: label,
      confidence,
      reasons,
    });
  } catch (err) {
    return NextResponse.json({
      result: "Error scanning image",
      confidence: 0,
      reasons: [],
    });
  }
}