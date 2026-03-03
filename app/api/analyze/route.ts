import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { message } = await req.json();

  try {
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
            content: "You are a scam detection AI. Detect if message is Safe, Suspicious, or Scam. Give short reason.",
          },
          {
            role: "user",
            content: message,
          },
        ],
      }),
    });

    const data = await res.json();

    const output = data.choices[0].message.content;

    return NextResponse.json({
      result: output,
    });
  } catch (err) {
    return NextResponse.json({ error: "AI failed" });
  }
}