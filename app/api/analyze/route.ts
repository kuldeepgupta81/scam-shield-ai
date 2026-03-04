export async function POST(req: Request) {

  const { message } = await req.json();

  const text = message.toLowerCase();

  let score = 0;
  let reasons: string[] = [];

  // OTP
  if (text.includes("otp")) {
    score += 20;
    reasons.push("OTP verification message detected");
  }

  // Phone numbers
  if (/\+?\d{10,}/.test(text)) {
    score += 20;
    reasons.push("Phone number detected in message");
  }

  // Links
  if (text.includes("http") || text.includes("www")) {
    score += 40;
    reasons.push("Suspicious link detected");
  }

  // Phishing domains
  if (
    text.includes("bit.ly") ||
    text.includes("tinyurl") ||
    text.includes("verify-account")
  ) {
    score += 40;
    reasons.push("Shortened phishing link detected");
  }

  // Lottery scam
  if (text.includes("lottery") || text.includes("win money")) {
    score += 50;
    reasons.push("Lottery scam pattern");
  }

  // Urgency
  if (text.includes("urgent")) {
    score += 20;
    reasons.push("Urgent action requested");
  }

  let result = "✅ Safe";

  if (score >= 70) result = "🚨 Scam";
  else if (score >= 40) result = "⚠️ Suspicious";

  return Response.json({
    result,
    confidence: score,
    reasons,
  });
}