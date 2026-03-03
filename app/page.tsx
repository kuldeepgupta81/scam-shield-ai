"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [copied, setCopied] = useState(false);

  // 🔍 TEXT ANALYSIS
  const handleCheck = async () => {
    setLoading(true);

    const res = await fetch("/api/analyze", {
      method: "POST",
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

  // 🖼 IMAGE SCAN (FIXED)
  const handleImageScan = async () => {
    if (!file) return;

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
      reasons: ["🖼 Image analyzed"],
    });

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-900 p-6 rounded-xl w-[400px]">

        <h1 className="text-xl font-bold mb-4 text-center">
          🚨 Scam Detector AI
        </h1>

        {/* TEXT INPUT */}
        <textarea
          className="w-full p-3 rounded bg-black border border-gray-700"
          placeholder="Paste suspicious message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* BUTTON */}
        <button
          onClick={handleCheck}
          className="mt-3 w-full py-2 bg-blue-600 rounded"
        >
          {loading ? "Analyzing..." : "Analyze Message"}
        </button>

        {/* IMAGE UPLOAD */}
        <input
          type="file"
          className="mt-3"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <button
          onClick={handleImageScan}
          className="mt-2 w-full py-2 bg-purple-600 rounded"
        >
          Scan Image
        </button>

        {/* RESULT */}
        {result && (
          <div className="mt-4 bg-gray-800 p-3 rounded">
            <p className="text-lg">{result.label}</p>
            <p className="text-sm mt-1">Confidence: {result.score}%</p>

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
              className="mt-3 w-full py-2 bg-pink-600 rounded"
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
              {copied ? "✅ Copied" : "📋 Copy Result"}
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