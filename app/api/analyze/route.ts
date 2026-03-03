import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are an advanced scam detection AI.

Classify the message strictly as:
SCAM or SAFE

Rules:
- Lottery / prize / winning money = SCAM
- Urgent links or click now = SCAM
- Asking OTP / bank details = SCAM

IMPORTANT:
Respond ONLY in valid JSON format. No extra text.

Example:
{
  "status": "SCAM",
  "reason": "Lottery scam message",
  "confidence": "90%"
}
`,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const text = response.choices[0]?.message?.content || "";

    let result;

    // ✅ SAFE PARSE (NO CRASH)
    try {
      result = JSON.parse(text);
    } catch (err) {
      console.log("Parse failed:", text);

      // fallback detection
      result = {
        status: text.toLowerCase().includes("scam") ? "SCAM" : "SAFE",
        reason: "Fallback detection (AI format issue)",
        confidence: "70%",
      };
    }

    return Response.json(result);

  } catch (error) {
    console.log("API ERROR:", error);

    return Response.json({
      status: "ERROR",
      reason: "Server failed",
      confidence: "0%",
    });
  }
}