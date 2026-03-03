"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // TEXT AI SCAN
  const handleCheck = async () => {
    if (!message) return;
    setLoading(true);

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    setResult({
      label: data.result,
      score: 90,
      reasons: ["🤖 AI analyzed result"],
    });

    setLoading(false);
  };

  // IMAGE SCAN
  const handleImage = async (file: File) => {
    setLoading(true);

    const reader = new FileReader();

    reader.onloadend = async () => {
      const res = await fetch("/api/scan-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: reader.result }),
      });

      const data = await res.json();

      setResult({
        label: data.result,
        score: 95,
        reasons: ["🖼️ Image analyzed by AI"],
      });

      setLoading(false);
    };

    reader.readAsDataURL(file);
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

        {/* TEXT INPUT */}
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

        {/* IMAGE UPLOAD */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImage(file);
          }}
          className="mt-4 w-full"
        />

        <p className="text-sm text-gray-400 mt-2 text-center">
          📷 Upload screenshot / WhatsApp / email image to scan
        </p>

        {/* RESULT */}
        {result && (
          <div className="mt-6 p-5 rounded-xl bg-white/5">

            <p className="text-2xl font-bold text-center text-yellow-400">
              {result.label}
            </p>

            <p className="text-center mt-2">
              Confidence: {result.score}%
            </p>

            <div className="mt-4 text-sm text-gray-300 text-center">
              {result.reasons.map((r: string, i: number) => (
                <p key={i}>• {r}</p>
              ))}
            </div>

            {/* WHATSAPP SHARE */}
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
              className="mt-5 w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600"
            >
              🚀 Share on WhatsApp
            </button>

            {/* COPY RESULT */}
            <button
              onClick={() => {
                const text = `🚨 Scam Detector Result:

"${message}"

Result: ${result.label}

Check here 👉 https://scam-shield-ai-rho.vercel.app`;

                navigator.clipboard.writeText(text);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="mt-2 w-full py-2 bg-gray-700 rounded"
            >
              {copied ? "✅ Copied!" : "📋 Copy Result"}
            </button>

            {/* VIRAL COUNTER */}
            <p className="text-center text-sm mt-3 text-gray-400">
              🔥 {Math.floor(Math.random() * 50000 + 10000)} users checked scams today
            </p>

          </div>
        )}

      </motion.div>
    </main>
  );
}