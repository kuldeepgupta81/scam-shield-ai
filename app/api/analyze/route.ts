import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const text = message.toLowerCase();

    let score = 0;
    let reasons: string[] = [];

    if (text.includes("won")) {
      score += 30;
      reasons.push("Lottery scam");
    }

    if (text.includes("click")) {
      score += 25;
      reasons.push("Click bait");
    }

    if (text.includes("otp")) {
      score += 40;
      reasons.push("OTP scam");
    }

    let label = "Safe";

    if (score >= 60) label = "Scam";
    else if (score >= 30) label = "Suspicious";

    return NextResponse.json({
      label,
      confidence: score,
      reasons,
    });

  } catch (error) {
    return NextResponse.json({
      label: "Error",
      confidence: 0,
      reasons: ["Server error"],
    });
  }
}