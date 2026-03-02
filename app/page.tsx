"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// 🔥 ULTRA PRO DETECTION FUNCTION
function analyzeThreat(message: string) {
  const text = message.toLowerCase();

  let score = 0;

  const hasLink = /(https?:\/\/|www\.)/.test(text);
  const hasOTP = /\b\d{4,6}\b/.test(text);

  // 🚨 BASIC SIGNALS
  if (hasLink) score += 40;
  if (hasOTP) score += 10;

  // 🚨 KEYWORDS
  const keywords = [
    "bank", "account", "blocked", "suspended",
    "click here", "urgent", "verify", "confirm",
    "password", "login", "otp", "security",
    "lottery", "won", "prize", "claim",
    "upi", "send money", "payment", "transfer",
    "free", "offer", "limited time"
  ];

  keywords.forEach((word) => {
    if (text.includes(word)) score += 15;
  });

  // 🚨 COMBO LOGIC (SMART AI FEEL)
  if (hasOTP && hasLink) score += 40;
  if (text.includes("verify") && hasLink) score += 25;
  if (text.includes("bank") && text.includes("urgent")) score += 25;

  // LIMIT
  if (score > 100) score = 100;

  if (score >= 70) {
    return { label: "🚨 Scam", color: "text-red-500", score };
  }
  if (score >= 40) {
    return { label: "⚠️ Suspicious", color: "text-yellow-400", score };
  }
  return { label: "✅ Safe", color: "text-green-400", score };
}

export default function Home() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

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
    }, 700);
  };

  const getBarColor = (score: number) => {
    if (score >= 70) return "from-red-500 to-red-700";
    if (score >= 40) return "from-yellow-400 to-orange-500";
    return "from-green-400 to-green-600";
  };

  return (
    <main className="relative flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-black via-slate-900 to-black text-white overflow-hidden">

      {/* 🔥 Animated Background */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full top-10 left-10 animate-pulse" />
      <div className="absolute w-[400px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full bottom-10 right-10 animate-pulse" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl w-full max-w-xl"
      >

        <h1 className="text-3xl font-bold text-center mb-6 tracking-wide">
          🚨 Scam Detector AI
        </h1>

        {/* INPUT */}
        <textarea
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Paste suspicious message here..."
          className="w-full p-3 rounded-xl bg-black/40 border border-blue-400 focus:ring-2 focus:ring-blue-500 transition outline-none"
        />

        {/* QUICK EXAMPLES */}
        <div className="flex gap-2 mt-3 flex-wrap">
          {[
            "Your bank account is blocked, click here",
            "You won lottery claim now",
            "Your OTP is 123456",
            "Verify your account urgently"
          ].map((msg, i) => (
            <button
              key={i}
              onClick={() => setMessage(msg)}
              className="text-xs px-3 py-1 bg-white/10 rounded-full hover:bg-white/20 transition"
            >
              {msg}
            </button>
          ))}
        </div>

        {/* AI THINKING */}
        {message.length > 5 && !loading && (
          <p className="text-xs text-gray-400 mt-2 animate-pulse">
            🤖 AI analyzing message...
          </p>
        )}

        {/* BUTTON */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={handleCheck}
          className="mt-5 w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 transition shadow-lg"
        >
          {loading ? "🤖 AI Thinking..." : "Analyze Message"}
        </motion.button>

        {/* CLEAR */}
        <button
          onClick={() => {
            setMessage("");
            setResult(null);
          }}
          className="mt-2 text-xs text-gray-400 hover:text-white"
        >
          Clear
        </button>

        {/* RESULT */}
        {result && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mt-6 p-5 rounded-xl bg-white/5 border border-white/10 shadow-lg hover:shadow-blue-500/30 transition"
          >
            <p className={`text-2xl font-bold text-center ${result.color}`}>
              {result.label}
            </p>

            {/* BAR */}
            <div className="w-full bg-gray-700 h-3 rounded-full mt-4 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${result.score}%` }}
                className={`h-3 bg-gradient-to-r ${getBarColor(result.score)}`}
              />
            </div>

            <p className="text-sm mt-2 text-center text-gray-300">
              Confidence Score: {result.score}%
            </p>

            {/* SMART MESSAGE */}
            <p className="text-xs mt-3 text-center text-gray-400 italic">
              {result.score >= 70
                ? "🚨 High risk scam detected. Do not click or share any info."
                : result.score >= 40
                ? "⚠️ Suspicious message. Verify before trusting."
                : "✅ Looks safe, but stay cautious always."}
            </p>

            {/* COPY */}
            <button
              onClick={() => {
                navigator.clipboard.writeText(message);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
              className="mt-4 text-xs px-3 py-1 bg-white/10 rounded-lg hover:bg-white/20 block mx-auto"
            >
              {copied ? "✅ Copied!" : "📋 Copy Message"}
            </button>

            <p className="text-[10px] text-gray-500 text-center mt-2">
              Powered by AI heuristic analysis • Not 100% accurate
            </p>

          </motion.div>
        )}

      </motion.div>
    </main>
  );
}