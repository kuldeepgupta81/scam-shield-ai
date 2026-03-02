"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// 🔥 ADVANCED DETECTION FUNCTION + REASONS
function analyzeThreat(message: string) {
  const text = message.toLowerCase();

  let score = 0;
  let reasons: string[] = [];

  const hasLink = /(https?:\/\/|www\.)/.test(text);
  const hasOTP = /\b\d{4,6}\b/.test(text);

  if (hasLink) {
    score += 40;
    reasons.push("Contains suspicious link");
  }

  if (text.includes("bank")) {
    score += 25;
    reasons.push("Mentions bank");
  }

  if (text.includes("click here")) {
    score += 25;
    reasons.push("Urgent call-to-action (click here)");
  }

  if (text.includes("urgent")) {
    score += 20;
    reasons.push("Creates urgency");
  }

  if (text.includes("blocked")) {
    score += 20;
    reasons.push("Threat language (account blocked)");
  }

  if (text.includes("lottery") || text.includes("won")) {
    score += 30;
    reasons.push("Lottery / reward scam pattern");
  }

  if (text.includes("upi") || text.includes("send money")) {
    score += 30;
    reasons.push("Money request detected");
  }

  if (hasOTP) {
    if (hasLink) {
      score += 40;
      reasons.push("OTP + link combo (very dangerous)");
    } else {
      score += 10;
      reasons.push("Contains OTP");
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
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

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

      // 🔥 HISTORY SAVE
      setHistory((prev) => [
        { message, result: res },
        ...prev.slice(0, 4),
      ]);

      setLoading(false);
    }, 600);
  };

  const getBarColor = (score: number) => {
    if (score >= 70) return "from-red-500 to-red-700";
    if (score >= 40) return "from-yellow-400 to-orange-500";
    return "from-green-400 to-green-600";
  };

  const getBadge = (score: number) => {
    if (score >= 70) return "🔴 Dangerous";
    if (score >= 40) return "🟡 Risky";
    return "🟢 Trusted";
  };

  return (
    <main className="relative flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-black via-slate-900 to-black text-white overflow-hidden">

      {/* 🔥 BACKGROUND */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full top-10 left-10 animate-pulse" />
      <div className="absolute w-[400px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full bottom-10 right-10 animate-pulse" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl w-full max-w-xl"
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
          className="w-full p-3 rounded-xl bg-black/40 border border-blue-400 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* SUGGESTIONS */}
        <div className="flex gap-2 mt-3 flex-wrap">
          {[
            "Your bank account is blocked, click here",
            "You won lottery claim now",
            "Your OTP is 123456",
            "Verify your account urgently",
          ].map((msg, i) => (
            <button
              key={i}
              onClick={() => setMessage(msg)}
              className="text-xs px-3 py-1 bg-white/10 rounded-full"
            >
              {msg}
            </button>
          ))}
        </div>

        {/* BUTTON */}
        <button
          onClick={handleCheck}
          className="mt-5 w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600"
        >
          {loading ? "Analyzing..." : "Analyze Message"}
        </button>

        {/* RESULT */}
        {result && (
          <div className="mt-6 p-5 rounded-xl bg-white/5">
            <p className={`text-2xl font-bold text-center ${result.color}`}>
              {result.label}
            </p>

            {/* BADGE */}
            <p className="text-center text-sm mt-1">
              {getBadge(result.score)}
            </p>

            {/* BAR */}
            <div className="w-full bg-gray-700 h-3 rounded-full mt-4 overflow-hidden">
              <div
                className={`h-3 bg-gradient-to-r ${getBarColor(
                  result.score
                )}`}
                style={{ width: `${result.score}%` }}
              />
            </div>

            <p className="text-sm mt-2 text-center">
              Confidence Score: {result.score}%
            </p>

            {/* REASONS */}
            <div className="mt-4">
              <p className="text-sm text-gray-400 mb-1 text-center">
                Why this result?
              </p>
              <ul className="text-xs text-gray-300 space-y-1 text-center">
                {result.reasons.map((r: string, i: number) => (
                  <li key={i}>• {r}</li>
                ))}
              </ul>
            </div>

            {/* COPY */}
            <button
              onClick={() => {
                navigator.clipboard.writeText(message);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
              className="mt-4 text-xs px-3 py-1 bg-white/10 rounded-lg block mx-auto"
            >
              {copied ? "✅ Copied!" : "📋 Copy"}
            </button>

            {/* SHARE */}
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `Result: ${result.label} (${result.score}%)\nMessage: ${message}`
                );
                alert("Copied for sharing!");
              }}
              className="mt-2 text-xs px-3 py-1 bg-purple-600 rounded-lg block mx-auto"
            >
              🚀 Share Result
            </button>
          </div>
        )}

        {/* HISTORY */}
        {history.length > 0 && (
          <div className="mt-6">
            <p className="text-sm text-gray-400 mb-2">🕘 Recent Checks</p>

            <div className="space-y-2 text-xs">
              {history.map((item, i) => (
                <div key={i} className="bg-white/5 p-2 rounded-lg">
                  <p className="truncate">{item.message}</p>
                  <p className="text-gray-400">{item.result.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </main>
  );
}