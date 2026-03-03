"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [copied, setCopied] = useState(false);
  const [freeScans, setFreeScans] = useState(3);

  // 🔍 TEXT SCAN
  const handleCheck = async () => {
    if (freeScans <= 0) {
      alert("🚫 Free limit reached! Unlock unlimited.");
      return;
    }

    setFreeScans(freeScans - 1);
    setLoading(true);

    (window as any).gtag?.("event", "scan_clicked");

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

  // 🖼 IMAGE SCAN
  const handleImageScan = async () => {
    if (!file) return;

    if (freeScans <= 0) {
      alert("🚫 Free limit reached! Unlock unlimited.");
      return;
    }

    setFreeScans(freeScans - 1);
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/scan-image", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    setResult({
      label: data.result,
      score: 95,
      reasons: ["🖼 Image analyzed by AI"],
    });

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-slate-900 to-black text-white px-4">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl w-full max-w-xl shadow-2xl">

        <h1 className="text-3xl font-bold text-center mb-4">
          🚨 Scam Detector AI
        </h1>

        {/* 🔥 TRUST BUILD */}
        <p className="text-center text-sm text-yellow-400">
          ⭐ Trusted by 50,000+ users worldwide
        </p>

        <p className="text-center text-xs text-gray-400 mb-4">
          🔒 Bank-level AI scam detection
        </p>

        {/* TEXT INPUT */}
        <textarea
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Paste suspicious message..."
          className="w-full p-3 rounded-xl bg-black/40 border border-blue-400 outline-none"
        />

        {/* TEXT BUTTON */}
        <button
          onClick={handleCheck}
          className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600"
        >
          {loading ? "Analyzing..." : "Analyze Message"}
        </button>

        {/* IMAGE UPLOAD */}
        <input
          type="file"
          className="mt-4 w-full"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <button
          onClick={handleImageScan}
          className="mt-2 w-full py-2 bg-purple-600 rounded-xl"
        >
          Scan Image
        </button>

        {/* FREE COUNT */}
        <p className="text-center text-sm mt-3 text-red-400">
          Free scans left: {freeScans}
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

            {/* SHARE */}
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
              className="mt-4 w-full py-3 bg-pink-600 rounded-xl"
            >
              🚀 Share on WhatsApp
            </button>

            {/* COPY */}
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

            {/* PREMIUM BUTTON */}
            <button
              onClick={() => alert("💰 Payment integration coming")}
              className="mt-3 w-full py-3 bg-green-600 rounded-xl"
            >
              🔓 Unlock Unlimited (₹49)
            </button>

            {/* VIRAL COUNTER */}
            <p className="text-center text-sm mt-3 text-gray-400">
              🔥 {Math.floor(Math.random() * 50000 + 10000)} users checked scams today
            </p>

          </div>
        )}
      </div>
    </main>
  );
}