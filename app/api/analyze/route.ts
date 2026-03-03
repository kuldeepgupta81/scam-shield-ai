import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ result: "No message provided" });
    }

    // Simple AI logic (for now)
    const scamKeywords = ["otp", "win", "lottery", "prize", "urgent", "click", "bank"];

    const isScam = scamKeywords.some(word =>
      message.toLowerCase().includes(word)
    );

    const result = isScam
      ? "⚠️ Suspicious Message (Possible Scam)"
      : "✅ Safe Message";

    return NextResponse.json({
      result,
      confidence: Math.floor(Math.random() * 10) + 90
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json({
      result: "Server Error",
      confidence: 0
    });
  }
}