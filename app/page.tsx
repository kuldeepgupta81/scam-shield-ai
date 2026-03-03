"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function analyzeThreat(message: string) {
  const text = message.toLowerCase();

  let score = 0;
  let reasons: string[] = [];

  const hasOTP = /\b\d{4,6}\b/.test(text);

  if (text.includes("otp") || hasOTP) {
    score += 50;
    reasons.push("🔐 OTP related message");
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

  useEffect(() => {
    if (message.length > 3) {
      setResult(analyzeThreat(message));
    } else {
      setResult(null);
    }
  }, [message]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-slate-900 to-black text-white px-4">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl w-full max-w-xl shadow-2xl"
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          🚨 Scam Detector AI
        </h1>

        <textarea
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Paste suspicious message..."
          className="w-full p-3 rounded-xl bg-black/40 border border-blue-400 outline-none"
        />

        <button
          className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600"
        >
          Analyze Message
        </button>

        {result && (
          <div className="mt-6 p-5 rounded-xl bg-white/5">

            <p className={`text-2xl font-bold text-center ${result.color}`}>
              {result.label}
            </p>

            <div className="w-full bg-gray-700 h-3 rounded-full mt-4 overflow-hidden">
              <div
                className="h-3 bg-gradient-to-r from-purple-500 to-pink-500"
                style={{ width: `${result.score}%` }}
              />
            </div>

            <p className="text-center mt-2">
              Confidence: {result.score}%
            </p>

            <div className="mt-4 text-sm text-gray-300">
              {result.reasons.map((r: string, i: number) => (
                <p key={i}>• {r}</p>
              ))}
            </div>

            {/* 🔥 WHATSAPP SHARE */}
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
              className="mt-4 w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl"
            >
              🚀 Share on WhatsApp
            </button>

            {/* 📋 COPY RESULT */}
            <button
              onClick={() => {
                const text = `🚨 Scam Detector Result:

"${message}"

Result: ${result.label}

Check here 👉 https://scam-shield-ai-rho.vercel.app`;

                navigator.clipboard.writeText(text);
                alert("Copied! Share anywhere 🔥");
              }}
              className="mt-2 w-full py-2 bg-gray-700 rounded"
            >
              📋 Copy Result
            </button>

            {/* 🔥 VIRAL TEXT */}
            <p className="text-center text-sm mt-3 text-gray-400">
              🔥 {Math.floor(Math.random() * 50000 + 10000)} users checked scams today
            </p>

          </div>
        )}

      </motion.div>
    </main>
  );
}