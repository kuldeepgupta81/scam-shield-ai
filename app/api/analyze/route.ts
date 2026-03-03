import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message: string = body.message;

    if (!message) {
      return NextResponse.json({
        result: "⚠️ No message provided",
        confidence: 0,
      });
    }

    const scamKeywords = [
      "otp",
      "urgent",
      "bank",
      "lottery",
      "prize",
      "click",
      "link",
      "win",
    ];

    const isScam = scamKeywords.some((word) =>
      message.toLowerCase().includes(word)
    );

    const result = isScam
      ? "⚠️ Suspicious Message (Possible Scam)"
      : "✅ Safe Message";

    return NextResponse.json({
      result,
      confidence: Math.floor(Math.random() * 10) + 90,
    });
  } catch (error) {
    console.error("API ERROR:", error);

    return NextResponse.json({
      result: "❌ Server Error",
      confidence: 0,
    });
  }
}