"use client"

import { useState } from "react"

export default function ScanBox({ setResult }: any) {

  const [message, setMessage] = useState("")

  const scan = () => {

    if (!message) return

    const keywords = ["otp", "bank", "urgent", "lottery"]

    const scam = keywords.some(k =>
      message.toLowerCase().includes(k)
    )

    if (scam) {

      setResult({
        result: "⚠️ Suspicious Message",
        confidence: 85,
        reason: "Contains scam keywords"
      }, message)

    } else {

      setResult({
        result: "✅ Safe Message",
        confidence: 95,
        reason: "No scam indicators"
      }, message)

    }

  }

  return (

    <div>

      <h2 className="text-lg mb-4">
        🔍 Scan Message
      </h2>

      <textarea
        className="w-full bg-black border border-slate-800 rounded-lg p-4 mb-4"
        placeholder="Paste suspicious message..."
        rows={4}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={scan}
        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg hover:scale-105 transition"
      >
        Analyze Message
      </button>

    </div>

  )
}