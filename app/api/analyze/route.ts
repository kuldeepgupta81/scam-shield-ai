import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a scam detection AI. Analyze message and reply only: Safe / Suspicious / Scam",
          },
          {
            role: "user",
            content: message,
          },
        ],
      }),
    });

    const data = await res.json();

    return NextResponse.json({
      result: data.choices?.[0]?.message?.content || "Error",
    });
  } catch (err) {
    return NextResponse.json({ result: "Server Error" });
  }
}