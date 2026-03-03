"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
    reasons.push("🏦 Mentions bank");
  }

  if (text.includes("click here")) {
    score += 25;
    reasons.push("⚠️ Click bait action");
  }

  if (text.includes("urgent")) {
    score += 20;
    reasons.push("⏳ Creates urgency");
  }

  if (text.includes("blocked")) {
    score += 20;
    reasons.push("🚫 Threat language used");
  }

  if (text.includes("lottery") || text.includes("won")) {
    score += 30;
    reasons.push("🎁 Lottery scam pattern");
  }

  if (text.includes("upi") || text.includes("send money")) {
    score += 30;
    reasons.push("💸 Money request detected");
  }

  if (hasOTP) {
    if (hasLink) {
      score += 40;
      reasons.push("🚨 OTP + link combo (high risk)");
    } else {
      score += 10;
      reasons.push("🔐 Contains OTP");
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
  const [history, setHistory] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (message.length > 5) {
      setResult(analyzeThreat(message));
    } else {
      setResult(null);
    }
  }, [message]);

  const handleCheck = () => {
    setLoading(true);

    setTimeout(() => {
      const res = analyzeThreat(message);
      setResult(res);

      setHistory((prev) => [
        { message, result: res },
        ...prev.slice(0, 4),
      ]);

      setLoading(false);
    }, 500);
  };

  const getBarColor = (score: number) => {
    if (score >= 70) return "from-red-500 to-red-700";
    if (score >= 40) return "from-yellow-400 to-orange-500";
    return "from-green-400 to-green-600";
  };

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
          onClick={handleCheck}
          className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600"
        >
          {loading ? "Analyzing..." : "Analyze Message"}
        </button>

        {result && (
          <div className="mt-6 p-5 rounded-xl bg-white/5">

            <p className={`text-2xl font-bold text-center ${result.color}`}>
              {result.label}
            </p>

            <div className="w-full bg-gray-700 h-3 rounded-full mt-4 overflow-hidden">
              <div
                className={`h-3 bg-gradient-to-r ${getBarColor(result.score)}`}
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

            {/* COPY */}
            <button
              onClick={() => {
                navigator.clipboard.writeText(message);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
              className="mt-4 px-3 py-1 bg-white/10 rounded-lg block mx-auto"
            >
              {copied ? "✅ Copied" : "📋 Copy"}
            </button>

            {/* 🔥 SHARE BUTTON */}
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    text: "Check karo ye message scam hai ya safe 🔥",
                    url: "https://scam-shield-ai-rho.vercel.app",
                  });
                } else {
                  alert("Sharing not supported on this device");
                }
              }}
              className="mt-3 w-full py-2 rounded-xl bg-white/10"
            >
              📤 Share App
            </button>

          </div>
        )}

        {history.length > 0 && (
          <div className="mt-6">
            <p className="text-gray-400 text-sm mb-2">Recent Checks</p>

            {history.map((item, i) => (
              <div key={i} className="bg-white/5 p-2 rounded-lg mb-2">
                <p className="truncate">{item.message}</p>
                <p className="text-gray-400">{item.result.label}</p>
              </div>
            ))}
          </div>
        )}

      </motion.div>
    </main>
  );
}