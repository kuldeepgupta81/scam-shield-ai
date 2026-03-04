export async function POST(req: Request) {

  const { message } = await req.json();

  const text = message.toLowerCase();

  let score = 0;
  let reasons: string[] = [];

  // OTP detection
  if (text.includes("otp")) {
    score += 20;
    reasons.push("OTP verification detected");
  }

  // Bank phishing
  if (
    text.includes("bank") ||
    text.includes("account") ||
    text.includes("verify account")
  ) {
    score += 30;
    reasons.push("Bank verification message");
  }

  // Urgency pressure
  if (
    text.includes("urgent") ||
    text.includes("immediately") ||
    text.includes("act now")
  ) {
    score += 25;
    reasons.push("Urgent pressure tactic");
  }

  // Lottery / prize scams
  if (
    text.includes("lottery") ||
    text.includes("won") ||
    text.includes("prize") ||
    text.includes("reward")
  ) {
    score += 40;
    reasons.push("Lottery / prize scam pattern");
  }

  // Phishing URLs
  if (
    text.includes("http") ||
    text.includes("www") ||
    text.includes(".xyz") ||
    text.includes(".top")
  ) {
    score += 30;
    reasons.push("Suspicious link detected");
  }

  // Short links (phishing)
  if (
    text.includes("bit.ly") ||
    text.includes("tinyurl") ||
    text.includes("t.co")
  ) {
    score += 40;
    reasons.push("Shortened phishing link");
  }

  // WhatsApp scam pattern
  if (
    text.includes("whatsapp") ||
    text.includes("send this to") ||
    text.includes("forward this message")
  ) {
    score += 25;
    reasons.push("WhatsApp viral scam pattern");
  }

  // Fake support impersonation
  if (
    text.includes("customer care") ||
    text.includes("support team") ||
    text.includes("helpline")
  ) {
    score += 25;
    reasons.push("Fake support impersonation");
  }

  // Cap score
  score = Math.min(score, 100);

  let result = "✅ Safe";

  if (score >= 70) result = "🚨 Scam";
  else if (score >= 30) result = "⚠️ Suspicious";

  return Response.json({
    result,
    confidence: score,
    reasons,
  });
}