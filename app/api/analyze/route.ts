export async function POST(req: Request) {

  const { message } = await req.json();

  const text = message.toLowerCase();

  let score = 0;
  let reasons: string[] = [];

  // NLP token detection
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

  // OTP keyword
  if (text.includes("otp")) {
    score += 25;
    reasons.push("OTP related message detected");
  }

  // OTP number pattern
  if (/\d{4,6}/.test(text)) {
    score += 20;
    reasons.push("Verification code detected");
  }

  // Bank impersonation
  if (
    text.includes("bank") &&
    (text.includes("verify") || text.includes("login"))
  ) {
    score += 30;
    reasons.push("Possible bank impersonation");
  }

  // Urgent pressure
  if (
    text.includes("urgent") ||
    text.includes("act now") ||
    text.includes("immediately")
  ) {
    score += 25;
    reasons.push("Urgent pressure tactic detected");
  }

  // Suspicious links
  if (
    text.includes("http") ||
    text.includes("www") ||
    text.includes("link")
  ) {
    score += 25;
    reasons.push("Suspicious link mention");
  }

  // Short phishing links
  if (
    text.includes("bit.ly") ||
    text.includes("tinyurl") ||
    text.includes("t.co")
  ) {
    score += 40;
    reasons.push("Shortened phishing link detected");
  }

  // Fake domains
  if (
    text.includes(".xyz") ||
    text.includes(".top") ||
    text.includes(".click")
  ) {
    score += 30;
    reasons.push("Suspicious domain detected");
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

  // WhatsApp chain scam
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

  // OTP sharing request
  if (
    text.includes("share otp") ||
    text.includes("tell otp") ||
    text.includes("provide otp")
  ) {
    score += 50;
    reasons.push("OTP sharing request detected");
  }

  // Limit score
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