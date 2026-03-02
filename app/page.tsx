"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// 🔥 PRO DETECTION WITH REASONS
function analyzeThreat(message: string) {
  const text = message.toLowerCase();

  let score = 0;
  let reasons: string[] = [];

  const hasLink = /(https?:\/\/|www\.)/.test(text);
  const hasOTP = /\b\d{4,6}\b/.test(text);

  if (hasLink) {
    score += 40;
    reasons.push("🔗 Contains suspicious link");
  }

  if (text.includes("bank")) {
    score += 25;
    reasons.push("🏦 Mentions bank (financial risk)");
  }

  if (text.includes("click here")) {
    score += 25;
    reasons.push("👉 Uses 'click here' (phishing tactic)");
  }

  if (text.includes("urgent")) {
    score += 20;
    reasons.push("⚡ Creates urgency");
  }

  if (text.includes("blocked")) {
    score += 20;
    reasons.push("🚫 Threat language (account blocked)");
  }

  if (text.includes("lottery") || text.includes("won")) {
    score += 30;
    reasons.push("🎁 Fake reward / lottery");
  }

  if (text.includes("claim")) {
    score += 20;
    reasons.push("📢 Asks to claim reward");
  }

  if (text.includes("upi") || text.includes("send money")) {
    score += 30;
    reasons.push("💰 Payment request detected");
  }

  if (hasOTP) {
    if (hasLink) {
      score += 40;
      reasons.push("🔐 OTP + link combo (very dangerous)");
    } else if (
      text.includes("share") ||
      text.includes("verify") ||
      text.includes("confirm")
    ) {
      score += 25;
      reasons.push("🔐 OTP misuse attempt");
    } else {
      score += 10;
      reasons.push("🔢 OTP detected");
    }
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (message.length > 5) {
      const res = analyzeThreat(message);
      setResult(res);
    } else {
      setResult(null);
    }
  }, [message]);

  const handleCheck = () => {
    setLoading(true);
    setTimeout(() => {
      const res = analyzeThreat(message);
      setResult(res);
      setLoading(false);
    }, 500);
  };

  const getBarColor = (score: number) => {
    if (score >= 70) return "from-red-500 to-red-700";
    if (score >= 40) return "from-yellow-400 to-orange-500";
    return "from-green-400 to-green-600";
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-black text-white px-4">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl w-full max-w-xl"
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          🚨 Scam Detector AI
        </h1>

        {/* INPUT */}
        <textarea
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Paste suspicious message here..."
          className="w-full p-3 rounded-xl bg-black/40 border border-blue-400 outline-none"
        />

        {/* BUTTON */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleCheck}
          className="mt-5 w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600"
        >
          {loading ? "Analyzing..." : "Analyze Message"}
        </motion.button>

        {/* RESULT */}
        {result && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mt-6 p-5 rounded-xl bg-white/5 border border-white/10"
          >
            <p className={`text-2xl font-bold text-center ${result.color}`}>
              {result.label}
            </p>

            {/* SCORE BAR */}
            <div className="w-full bg-gray-700 h-3 rounded-full mt-4 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${result.score}%` }}
                className={`h-3 bg-gradient-to-r ${getBarColor(result.score)}`}
              />
            </div>

            <p className="text-sm mt-2 text-center text-gray-300">
              Confidence: {result.score}%
            </p>

            {/* 🔥 REASONS SECTION */}
            <div className="mt-4">
              <p className="text-sm text-gray-400 mb-2 text-center">
                🔍 Why this result?
              </p>

              <ul className="text-xs space-y-1 text-gray-300">
                {result.reasons.map((r: string, i: number) => (
                  <li key={i}>• {r}</li>
                ))}
              </ul>
            </div>

          </motion.div>
        )}
      </motion.div>
    </main>
  );
}