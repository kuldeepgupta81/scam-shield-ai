import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    // 🧠 Fake AI logic (free)
    let label = "✅ Safe";
    let confidence = 90;

    if (image.includes("otp") || image.includes("bank")) {
      label = "🚨 Scam";
      confidence = 95;
    } else if (image.includes("win") || image.includes("offer")) {
      label = "⚠️ Suspicious";
      confidence = 70;
    }

    return NextResponse.json({
      result: label,
      confidence,
      reasons: ["📸 Image pattern analysis"],
    });
  } catch (err) {
    return NextResponse.json({
      result: "Error scanning image",
      confidence: 0,
    });
  }
}