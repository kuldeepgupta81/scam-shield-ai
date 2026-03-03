"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function analyzeThreat(message: string) {
  const text = message.toLowerCase();

  let score = 0;
  let reasons: string[] = [];

  const hasLink = /(https?:\/\/|www\.)/.test(text);
  const hasOTP = /\b\d{4,6}\b/.test(text);

  if (hasLink) score += 40, reasons.push("🔗 Contains suspicious link");
  if (text.includes("bank")) score += 25, reasons.push("🏦 Mentions bank");
  if (text.includes("click here")) score += 25, reasons.push("⚠️ Click bait");
  if (text.includes("urgent")) score += 20, reasons.push("⏳ Urgency");
  if (text.includes("blocked")) score += 20, reasons.push("🚫 Threat");
  if (text.includes("lottery") || text.includes("won"))
    score += 30, reasons.push("🎁 Lottery scam");
  if (text.includes("upi") || text.includes("send money"))
    score += 30, reasons.push("💸 Money request");

  if (hasOTP) {
    if (hasLink) {
      score += 40;
      reasons.push("🚨 OTP + link combo");
    } else {
      score += 10;
      reasons.push("🔐 Contains OTP");
    }
  }

  if (score > 100) score = 100;

  let label = "✅ Safe";
  let color = "text-green-400";

  if (score >= 70) label = "🚨 Scam", (color = "text-red-500");
  else if (score >= 40) label = "⚠️ Suspicious", (color = "text-yellow-400");

  return { label, color, score, reasons };
}

export default function Home() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = () => {
    setLoading(true);
    setTimeout(() => {
      setResult(analyzeThreat(message));
      setLoading(false);
    }, 400);
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
          placeholder="Paste message..."
        />

        <button
          onClick={handleCheck}
          className="mt-4 w-full py-3 bg-blue-500 rounded"
        >
          {loading ? "Analyzing..." : "Analyze Message"}
        </button>

        {result && (
          <div className="mt-6 bg-white/5 p-4 rounded">

            <p className={`text-xl text-center ${result.color}`}>
              {result.label}
            </p>

            <p className="text-center mt-2">
              Confidence: {result.score}%
            </p>

            {/* SAFE SHARE */}
            <button
              onClick={() => {
                if (typeof window !== "undefined") {
                  const text = "🚀 Check this: https://scam-shield-ai-rho.vercel.app";
                  navigator.clipboard.writeText(text);
                  alert("Copied!");
                }
              }}
              className="mt-4 w-full py-2 bg-purple-600 rounded"
            >
              🚀 Share App
            </button>

          </div>
        )}

      </motion.div>
    </main>
  );
}