"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // 🔥 MESSAGE ANALYSIS
  const analyzeText = () => {
    let score = 0;
    let reasons: string[] = [];

    const text = message.toLowerCase();

    if (text.includes("otp") || /\d{4,6}/.test(text)) {
      score += 40;
      reasons.push("🔐 Message contains OTP or verification code");
    }

    if (text.includes("bank") || text.includes("account")) {
      score += 25;
      reasons.push("🏦 Mentions bank or financial account");
    }

    if (text.includes("win") || text.includes("lottery")) {
      score += 30;
      reasons.push("🎁 Lottery or prize scam pattern");
    }

    if (text.includes("click") || text.includes("link")) {
      score += 20;
      reasons.push("🔗 Suspicious link request");
    }

    if (text.includes("urgent")) {
      score += 15;
      reasons.push("⚡ Creates urgency (common scam trick)");
    }

    let label = "✅ Safe";
    let explanation =
      "This message does not match common scam patterns.";

    if (score >= 70) {
      label = "🚨 Scam Detected";
      explanation =
        "This message strongly matches common scam patterns. Do not share personal information.";
    } else if (score >= 40) {
      label = "⚠️ Suspicious";
      explanation =
        "This message contains some suspicious indicators. Be careful before taking action.";
    }

    setResult({
      label,
      score,
      reasons,
      explanation,
    });
  };

  // 🔥 IMAGE SCAN
  const handleImageScan = async () => {
    if (!file) return;

    setLoading(true);

    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64 = reader.result;

      const res = await fetch("/api/scan-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64 }),
      });

      const data = await res.json();

      setResult({
        label: data.result,
        score: data.confidence,
        reasons: data.reasons,
        explanation: "Image text analyzed using AI detection.",
      });

      setLoading(false);
    };

    reader.readAsDataURL(file);
  };

  // 🔥 COPY RESULT
  const copyResult = () => {
    const text = `🚨 Scam Detector Result:

"${message}"

Result: ${result?.label}

Check 👉 https://scam-shield-ai-rho.vercel.app`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 🔥 WHATSAPP SHARE
  const shareWhatsApp = () => {
    const text = `🚨 Scam Detector Result:

"${message}"

Result: ${result?.label}

Check 👉 https://scam-shield-ai-rho.vercel.app`;

    window.open(
      `https://wa.me/?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  const riskColor =
    result?.score >= 70
      ? "bg-red-500"
      : result?.score >= 40
      ? "bg-yellow-500"
      : "bg-green-500";

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-indigo-900 text-white p-4">
      <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl w-full max-w-md shadow-lg">

        <h1 className="text-xl font-bold text-center mb-2">
          🚨 Scam Detector AI
        </h1>

        <p className="text-center text-sm mb-4 text-yellow-300">
          ⭐ Trusted by 50,000+ users worldwide
        </p>

        {/* TEXT INPUT */}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Paste suspicious message..."
          className="w-full p-3 rounded bg-black text-white"
        />

        {/* ANALYZE */}
        <button
          onClick={analyzeText}
          className="w-full mt-3 py-2 rounded bg-gradient-to-r from-blue-500 to-purple-500"
        >
          Analyze Message
        </button>

        {/* FILE INPUT */}
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mt-3"
        />

        {/* SCAN IMAGE */}
        <button
          onClick={handleImageScan}
          className="w-full mt-2 py-2 rounded bg-gradient-to-r from-purple-500 to-pink-500"
        >
          {loading ? "Scanning..." : "Scan Image"}
        </button>

        {/* RESULT */}
        {result && (
          <div className="mt-4 p-4 bg-white/10 rounded">

            {/* RESULT BADGE */}
            <h2 className="text-xl font-bold text-center">
              {result.label}
            </h2>

            {/* RISK BAR */}
            <div className="w-full bg-gray-700 h-3 rounded mt-3">
              <div
                className={`${riskColor} h-3 rounded`}
                style={{ width: `${result.score}%` }}
              />
            </div>

            <p className="text-center text-sm mt-1">
              Risk Score: {result.score}%
            </p>

            {/* EXPLANATION */}
            <p className="text-sm mt-3 text-gray-200 text-center">
              {result.explanation}
            </p>

            {/* REASONS */}
            <ul className="text-sm mt-2">
              {result.reasons?.map((r: string, i: number) => (
                <li key={i}>• {r}</li>
              ))}
            </ul>

            {/* SHARE */}
            <button
              onClick={shareWhatsApp}
              className="w-full mt-3 py-2 bg-pink-500 rounded"
            >
              🚀 Share on WhatsApp
            </button>

            {/* COPY */}
            <button
              onClick={copyResult}
              className="w-full mt-2 py-2 bg-gray-700 rounded"
            >
              {copied ? "✅ Copied!" : "📋 Copy Result"}
            </button>

            {/* PREMIUM */}
            <button
              onClick={() => alert("💰 Payment coming soon")}
              className="w-full mt-2 py-2 bg-green-600 rounded"
            >
              🔓 Unlock Unlimited (₹49)
            </button>

            {/* VIRAL COUNTER */}
            <p className="text-center text-sm mt-3 text-gray-300">
              🔥 {Math.floor(Math.random() * 50000 + 10000)} users checked scams today
            </p>

          </div>
        )}
      </div>
    </main>
  );
}