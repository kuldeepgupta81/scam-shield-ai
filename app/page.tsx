"use client";
import { useState } from "react";
import { motion } from "framer-motion";

function analyzeThreat(message: string) {
  const text = message.toLowerCase();

  let score = 0;
  let reasons: string[] = [];

  if (text.includes("otp")) {
    score += 40;
    reasons.push("🔐 OTP scam risk");
  }

  if (text.includes("won") || text.includes("lottery")) {
    score += 30;
    reasons.push("🎁 Lottery scam");
  }

  if (text.includes("click")) {
    score += 25;
    reasons.push("⚠️ Click bait");
  }

  if (text.includes("bank")) {
    score += 25;
    reasons.push("🏦 Bank related message");
  }

  if (text.includes("upi") || text.includes("send money")) {
    score += 30;
    reasons.push("💸 Money request");
  }

  if (score > 100) score = 100;

  let label = "✅ Safe";
  let color = "text-green-400";

  if (score >= 70) {
    label = "🚨 Scam";
    color = "text-red-500";
  } else if (score >= 40) {
    label = "⚠️ Suspicious";
    color = "text-yellow-400";
  }

  return { label, color, score, reasons };
}

export default function Home() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<any>(null);

  const handleCheck = () => {
    const res = analyzeThreat(message);
    setResult(res);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white px-4">

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white/10 p-8 rounded-3xl w-full max-w-xl"
      >
        <h1 className="text-3xl text-center mb-6 font-bold">
          🚨 Scam Detector AI
        </h1>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-3 rounded bg-black/40 border"
          placeholder="Paste suspicious message..."
        />

        <button
          onClick={handleCheck}
          className="mt-4 w-full py-3 bg-blue-500 rounded"
        >
          Analyze Message
        </button>

        {result && (
          <div className="mt-6 bg-white/5 p-5 rounded-xl">

            <p className={`text-xl text-center ${result.color}`}>
              {result.label}
            </p>

            <p className="text-center mt-2">
              Confidence: {result.score}%
            </p>

            <div className="mt-3 text-sm text-gray-300">
              {result.reasons.map((r: string, i: number) => (
                <p key={i}>• {r}</p>
              ))}
            </div>

            {/* 🔥 WHATSAPP SHARE FINAL */}
            <button
              onClick={() => {
                const text = `🚨 Scam Detector Result:

"${message}"

Result: ${result.label}

Check here 👉 https://scam-shield-ai-rho.vercel.app`;

                window.open(
                  `https://wa.me/?text=${encodeURIComponent(text)}`,
                  "_blank"
                );
              }}
              className="mt-4 w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded"
            >
              🚀 Share on WhatsApp
            </button>

            {/* 🔥 VIRAL HOOK */}
            <p className="text-center text-sm mt-3 text-gray-400">
              🔥 10,000+ users checked scams today
            </p>

          </div>
        )}

      </motion.div>
    </main>
  );
}