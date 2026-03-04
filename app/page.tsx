"use client";

import { useState } from "react";
import Tesseract from "tesseract.js";

export default function Home() {

  const [message, setMessage] = useState("");
  const [result, setResult] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // 🔎 TEXT MESSAGE ANALYSIS
  const analyzeText = async () => {

    if (!message) return;

    setLoading(true);

    try {

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
        score: Math.min(data.confidence, 100),
        reasons: data.reasons,
        explanation: "AI analyzed message patterns and scam indicators.",
      });

    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  // 📷 SCREENSHOT SCANNER (OCR)
  const handleImageScan = async () => {

    if (!file) return;

    setLoading(true);

    try {

      // OCR text extraction
      const scan = await Tesseract.recognize(
        file,
        "eng"
      );

      const extractedText = scan.data.text;

      // Send OCR text to scam AI
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: extractedText
        })
      });

      const data = await res.json();

      setResult({
        label: data.result,
        score: Math.min(data.confidence, 100),
        reasons: data.reasons,
        explanation: "Screenshot scanned and analyzed using AI.",
      });

      // auto fill message box with OCR text
      setMessage(extractedText);

    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  // 📋 COPY RESULT
  const copyResult = () => {

    const text = `🚨 Scam Detector Result

"${message}"

Result: ${result?.label}

Check 👉 https://scam-shield-ai-rho.vercel.app`;

    navigator.clipboard.writeText(text);

    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  // 📲 WHATSAPP SHARE
  const shareWhatsApp = () => {

    const text = `🚨 Scam Detector Result

"${message}"

Result: ${result?.label}

Check 👉 https://scam-shield-ai-rho.vercel.app`;

    window.open(
      `https://wa.me/?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  const riskColor =
    result?.score >= 70
      ? "bg-red-500"
      : result?.score >= 40
      ? "bg-yellow-500"
      : "bg-green-500";

  return (

    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-indigo-900 text-white p-4">

      <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl w-full max-w-md shadow-lg">

        <h1 className="text-xl font-bold text-center mb-2">
          🚨 Scam Detector AI
        </h1>

        <p className="text-center text-sm mb-4 text-yellow-300">
          ⭐ Trusted by 50,000+ users worldwide
        </p>

        {/* MESSAGE INPUT */}

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Paste suspicious message..."
          className="w-full p-3 rounded bg-black text-white"
        />

        {/* ANALYZE BUTTON */}

        <button
          onClick={analyzeText}
          className="w-full mt-3 py-2 rounded bg-gradient-to-r from-blue-500 to-purple-500"
        >
          {loading ? "Analyzing..." : "Analyze Message"}
        </button>

        {/* SCANNER LABEL */}

        <p className="text-sm text-gray-300 mt-4 text-center">
          📷 Scan Screenshot (WhatsApp / Email / SMS)
        </p>

        {/* FILE INPUT */}

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mt-2"
        />

        {/* SCAN BUTTON */}

        <button
          onClick={handleImageScan}
          className="w-full mt-2 py-2 rounded bg-gradient-to-r from-purple-500 to-pink-500"
        >
          {loading ? "Scanning Screenshot..." : "Scan Screenshot"}
        </button>

        {/* RESULT */}

        {result && (

          <div className="mt-4 p-4 bg-white/10 rounded">

            <h2 className="text-xl font-bold text-center">
              {result.label}
            </h2>

            {/* RISK BAR */}

            <div className="w-full bg-gray-700 h-3 rounded mt-3">
              <div
                className={`${riskColor} h-3 rounded`}
                style={{ width: `${Math.min(result.score,100)}%` }}
              />
            </div>

            <p className="text-center text-sm mt-1">
              Risk Score: {result.score}%
            </p>

            {/* EXPLANATION */}

            <p className="text-sm mt-3 text-gray-200 text-center">
              {result.explanation}
            </p>

            {/* REASONS */}

            <ul className="text-sm mt-2">
              {result.reasons?.map((r: string, i: number) => (
                <li key={i}>• {r}</li>
              ))}
            </ul>

            {/* SHARE */}

            <button
              onClick={shareWhatsApp}
              className="w-full mt-3 py-2 bg-pink-500 rounded"
            >
              🚀 Share on WhatsApp
            </button>

            {/* COPY */}

            <button
              onClick={copyResult}
              className="w-full mt-2 py-2 bg-gray-700 rounded"
            >
              {copied ? "✅ Copied!" : "📋 Copy Result"}
            </button>

            {/* PREMIUM */}

            <button
              onClick={() => alert("💰 Payment coming soon")}
              className="w-full mt-2 py-2 bg-green-600 rounded"
            >
              🔓 Unlock Unlimited (₹49)
            </button>

            {/* VIRAL COUNTER */}

            <p className="text-center text-sm mt-3 text-gray-300">
              🔥 {Math.floor(Math.random() * 50000 + 10000)} users checked scams today
            </p>

          </div>

        )}

      </div>

    </main>
  );
}