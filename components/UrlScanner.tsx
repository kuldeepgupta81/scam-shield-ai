"use client"

import { useState } from "react"

export default function UrlScanner() {

  const [url, setUrl] = useState("")
  const [result, setResult] = useState("")

  const scan = () => {

    if (url.includes("bit.ly") || url.includes("free")) {

      setResult("⚠️ Possible Phishing Link")

    } else {

      setResult("✅ Safe URL")

    }

  }

  return (

    <div>

      <h2 className="mb-4">
        🔗 URL Scam Scanner
      </h2>

      <input
        className="w-full bg-black border border-slate-800 rounded-lg p-3 mb-4"
        placeholder="Paste suspicious link..."
        onChange={(e) => setUrl(e.target.value)}
      />

      <button
        onClick={scan}
        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg"
      >
        Scan URL
      </button>

      <p className="mt-4 text-gray-300">
        {result}
      </p>

    </div>

  )
}