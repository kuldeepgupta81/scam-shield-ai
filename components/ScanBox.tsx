"use client"

import { useState } from "react"

export default function ScanBox({ setResult }: any) {

const [message, setMessage] = useState("")
const [image, setImage] = useState<File | null>(null)

const scan = () => {


if (!message && !image) return

const text = message.toLowerCase()

let risk = 0
let reasons: string[] = []

// OTP detection
if (text.includes("otp")) {
  risk += 40
  reasons.push("OTP related content detected")
}

// bank / money
if (text.includes("bank") || text.includes("account")) {
  risk += 25
  reasons.push("Financial request detected")
}

// urgency
if (text.includes("urgent") || text.includes("immediately")) {
  risk += 20
  reasons.push("Urgency pattern detected")
}

// lottery scam
if (text.includes("lottery") || text.includes("winner")) {
  risk += 35
  reasons.push("Lottery scam pattern detected")
}

// link phishing
if (text.includes("http") || text.includes("bit.ly")) {
  risk += 30
  reasons.push("Suspicious link detected")
}

let resultText = "✅ Safe Message"
let confidence = 95

if (risk >= 40) {
  resultText = "⚠️ Suspicious Message"
  confidence = 80
}

if (risk >= 70) {
  resultText = "🚨 High Risk Scam"
  confidence = 60
}

setResult({
  result: resultText,
  confidence,
  reason: reasons.join(", ") || "No scam indicators"
}, message)


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

  {/* Image Scanner */}

  <input
    type="file"
    className="mb-4"
    onChange={(e) => setImage(e.target.files?.[0] || null)}
  />

  <p className="text-sm text-gray-400 mb-4">
    Upload WhatsApp screenshot to detect scam messages
  </p>

  <button
    onClick={scan}
    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg hover:scale-105 transition"
  >
    Analyze Message
  </button>

</div>


)

}
