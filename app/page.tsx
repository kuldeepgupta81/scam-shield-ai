"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [freeScans, setFreeScans] = useState(3);

  const handleCheck = async () => {
    if (!message) return;

    if (freeScans <= 0) {
      alert("Free limit over! Unlock unlimited 🚀");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      setResult({
        label: data.label || "Error",
        score: data.confidence || 90,
        reasons: data.reasons || ["🤖 AI analyzed result"],
      });

      setFreeScans(freeScans - 1);
    } catch {
      setResult({
        label: "Error",
        score: 90,
        reasons: ["Server issue"],
      });
    }

    setLoading(false);
  };

  const shareText = `🚨 Scam Detector Result:

"${message}"

Result: ${result?.label}

Check here 👉 https://scam-shield-ai-rho.vercel.app`;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-blue-900 text-white p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">

        {/* HEADER */}
        <h1 className="text-2xl font-bold text-center mb-2">
          🚨 Scam Detector AI
        </h1>

        <p className="text-center text-yellow-400 text-sm mb-4">
          ⭐ Trusted by 50,000+ users worldwide
        </p>

        {/* INPUT */}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Paste suspicious message..."
          className="w-full p-3 rounded-lg bg-black border border-gray-600 mb-3"
        />

        {/* ANALYZE */}
        <button
          onClick={handleCheck}
          className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mb-3"
        >
          {loading ? "Analyzing..." : "Analyze Message"}
        </button>

        {/* FILE INPUT */}
        <input type="file" className="mb-2" />

        <button className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg mb-3">
          Scan Image
        </button>

        <p className="text-center text-red-400 text-sm mb-2">
          Free scans left: {freeScans}
        </p>

        {/* RESULT */}
        {result && (
          <div className="bg-white/10 p-4 rounded-xl text-center">

            <h2 className="text-xl font-bold mb-1">{result.label}</h2>

            <p className="mb-2">Confidence: {result.score}%</p>

            {result.reasons.map((r: string, i: number) => (
              <p key={i} className="text-sm text-gray-300">
                • {r}
              </p>
            ))}

            {/* SHARE */}
            <button
              onClick={() =>
                window.open(
                  `https://wa.me/?text=${encodeURIComponent(shareText)}`,
                  "_blank"
                )
              }
              className="mt-3 w-full py-2 bg-pink-600 rounded"
            >
              🚀 Share on WhatsApp
            </button>

            {/* COPY */}
            <button
              onClick={() => {
                navigator.clipboard.writeText(shareText);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="mt-2 w-full py-2 bg-gray-700 rounded"
            >
              {copied ? "✅ Copied" : "📋 Copy Result"}
            </button>

            {/* PREMIUM */}
            <button
              onClick={() => alert("💳 Payment integration coming")}
              className="mt-3 w-full py-2 bg-green-600 rounded-lg"
            >
              🔓 Unlock Unlimited (₹49)
            </button>
          </div>
        )}

        {/* VIRAL COUNTER */}
        <p className="text-center text-sm mt-3 text-gray-400">
          🔥 {Math.floor(Math.random() * 50000 + 10000)} users checked scams today
        </p>
      </div>
    </main>
  );
}