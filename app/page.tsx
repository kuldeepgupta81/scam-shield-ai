"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {

const [message, setMessage] = useState("");
const [result, setResult] = useState<any>(null);
const [loading, setLoading] = useState(false);

function analyze() {


if (!message) return;

setLoading(true);

setTimeout(() => {

  let risk = 0;
  const reasons: string[] = [];

  const text = message.toLowerCase();

  if (text.includes("otp")) {
    risk += 40;
    reasons.push("OTP related content detected");
  }

  if (text.includes("verify") || text.includes("verification")) {
    risk += 25;
    reasons.push("Verification request detected");
  }

  if (
    text.includes("urgent") ||
    text.includes("immediately") ||
    text.includes("now")
  ) {
    risk += 20;
    reasons.push("Urgency pattern detected");
  }

  if (text.includes("http") || text.includes("bit.ly")) {
    risk += 30;
    reasons.push("Suspicious link detected");
  }

  if (
    text.includes("bank") ||
    text.includes("account") ||
    text.includes("payment")
  ) {
    risk += 20;
    reasons.push("Financial request detected");
  }

  let status = "✅ Safe Message";

  if (risk >= 40) {
    status = "⚠ Suspicious Message";
  }

  if (risk >= 70) {
    status = "🚨 High Risk Scam";
  }

  setResult({
    status,
    risk,
    reasons,
  });

  setLoading(false);

}, 1000);


}

function reset() {
setResult(null);
setMessage("");
}

return (


<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#0f172a] text-white">

  <div className="w-[500px] bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">

    <h1 className="text-3xl font-bold text-center mb-2">
      🚨 Scam Detector AI
    </h1>

    <p className="text-center text-gray-300 mb-6">
      AI-powered scam detection tool
    </p>

    {/* MESSAGE INPUT */}

    <textarea
      placeholder="Paste suspicious message..."
      className="w-full p-4 rounded-lg bg-black text-white border border-gray-700 mb-4"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
    />

    <button
      onClick={analyze}
      className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 transition mb-6"
    >
      {loading ? "🔍 Analyzing..." : "Analyze Message"}
    </button>

    {/* RESULT */}

    {result && (

      <div className="bg-white/10 border border-white/20 rounded-xl p-6 mb-6">

        <h2 className="text-xl font-semibold mb-3">
          {result.status}
        </h2>

        <div className="w-full bg-gray-700 rounded-full h-3 mb-3">
          <div
            className="bg-yellow-400 h-3 rounded-full transition-all"
            style={{ width: `${result.risk}%` }}
          />
        </div>

        <p className="text-sm mb-3">
          Risk Score: {result.risk}%
        </p>

        <p className="text-gray-300 text-sm mb-2">
          AI detected indicators:
        </p>

        <ul className="text-sm text-yellow-300 list-disc ml-5">
          {result.reasons.map((r: string, i: number) => (
            <li key={i}>{r}</li>
          ))}
        </ul>

        <button
          onClick={reset}
          className="w-full mt-5 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 hover:scale-105 transition"
        >
          Scan Another Message
        </button>

      </div>

    )}

    {/* NAVIGATION BUTTONS */}

    <div className="grid grid-cols-3 gap-3">

      <Link href="/dashboard">
        <button className="w-full py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700">
          Dashboard
        </button>
      </Link>

      <Link href="/url-scanner">
        <button className="w-full py-2 bg-purple-600 rounded-lg hover:bg-purple-700">
          URL Scanner
        </button>
      </Link>

      <Link href="/scan-image">
        <button className="w-full py-2 bg-pink-600 rounded-lg hover:bg-pink-700">
          Image Scan
        </button>
      </Link>

    </div>

  </div>

</div>


);
}
