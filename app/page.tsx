"use client";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [confidence, setConfidence] = useState<number | "">("");

  const analyzeMessage = async () => {
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data: { result?: string; confidence?: number } = await res.json();

      // ✅ MAIN FIX (Error handling)
      if (!data.result) {
        setResult("⚠️ Unable to analyze");
        setConfidence("");
        return;
      }

      setResult(data.result);
      setConfidence(data.confidence ?? "");
    } catch (err) {
      console.error(err);
      setResult("❌ Server Error");
      setConfidence("");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4">
      <div className="bg-gray-900 p-6 rounded-2xl w-full max-w-md text-center shadow-lg">
        
        <h1 className="text-2xl font-bold mb-4">🚨 Scam Detector AI</h1>

        <textarea
          className="w-full p-3 rounded-lg text-black"
          placeholder="Paste suspicious message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          onClick={analyzeMessage}
          className="mt-4 w-full bg-purple-600 p-3 rounded-lg"
        >
          Analyze Message
        </button>

        {result && (
          <div className="mt-6 bg-gray-800 p-4 rounded-xl">
            <h2 className="text-lg font-semibold">{result}</h2>

            {confidence !== "" && (
              <p className="text-sm mt-2">
                Confidence: {confidence}%
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}