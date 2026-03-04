export async function POST(req: Request) {

  const { message } = await req.json();

  const text = message.toLowerCase();

  let score = 0;
  let reasons: string[] = [];

  // NLP style token detection
  const tokens = text.split(/\s+/);

  const suspiciousWords = [
    "otp",
    "verify",
    "account",
    "bank",
    "urgent",
    "immediately",
    "login",
    "password",
    "security",
    "click",
    "link"
  ];

  tokens.forEach(word => {
    if (suspiciousWords.includes(word)) {
      score += 5;
    }
  });

  // Bank impersonation
  if (
    text.includes("bank") &&
    (text.includes("verify") || text.includes("login"))
  ) {
    score += 30;
    reasons.push("Possible bank impersonation");
  }

  // Urgent pressure tactic
  if (
    text.includes("urgent") ||
    text.includes("act now") ||
    text.includes("immediately")
  ) {
    score += 25;
    reasons.push("Urgent pressure tactic detected");
  }

  // Phishing links
  if (
    text.includes("http") ||
    text.includes("www") ||
    text.includes(".xyz") ||
    text.includes(".top")
  ) {
    score += 30;
    reasons.push("Suspicious URL detected");
  }

  // Short links
  if (
    text.includes("bit.ly") ||
    text.includes("tinyurl") ||
    text.includes("t.co")
  ) {
    score += 40;
    reasons.push("Shortened phishing link");
  }

  // Lottery scams
  if (
    text.includes("lottery") ||
    text.includes("won") ||
    text.includes("prize") ||
    text.includes("reward") ||
    text.includes("congratulations")
  ) {
    score += 40;
    reasons.push("Lottery / prize scam pattern");
  }

  // WhatsApp chain scams
  if (
    text.includes("forward this") ||
    text.includes("share with") ||
    text.includes("send this to")
  ) {
    score += 35;
    reasons.push("WhatsApp chain scam detected");
  }

  // Fake support impersonation
  if (
    text.includes("customer care") ||
    text.includes("support team") ||
    text.includes("helpline")
  ) {
    score += 30;
    reasons.push("Fake support impersonation");
  }

  // OTP request scam
  if (
    text.includes("share otp") ||
    text.includes("tell otp") ||
    text.includes("provide otp")
  ) {
    score += 50;
    reasons.push("OTP sharing request");
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