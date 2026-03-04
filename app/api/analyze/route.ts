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

  // Bank related
  if (text.includes("bank") || text.includes("account")) {
    score += 30;
    reasons.push("Bank account related message");
  }

  // Urgent pressure
  if (text.includes("urgent") || text.includes("immediately")) {
    score += 30;
    reasons.push("Urgent action requested");
  }

  // Links
  if (text.includes("http") || text.includes("www")) {
    score += 40;
    reasons.push("Suspicious link detected");
  }

  // Phishing short links
  if (
    text.includes("bit.ly") ||
    text.includes("tinyurl") ||
    text.includes("verify-account")
  ) {
    score += 50;
    reasons.push("Phishing link detected");
  }

  // Lottery scam
  if (text.includes("lottery") || text.includes("win money")) {
    score += 60;
    reasons.push("Lottery scam pattern");
  }

  // Phone numbers
  if (/\+?\d{10,}/.test(text)) {
    score += 20;
    reasons.push("Phone number detected");
  }

  let result = "✅ Safe";

  if (score >= 70) result = "🚨 Scam";
  else if (score >= 30) result = "⚠️ Suspicious";

  return Response.json({
    result,
    confidence: score,
    reasons,
  });
}