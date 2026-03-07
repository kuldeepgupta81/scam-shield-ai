"use client"

import { useState } from "react"

import Sidebar from "@/components/Sidebar"
import StatsCard from "@/components/StatsCard"
import ScanBox from "@/components/ScanBox"
import ResultCard from "@/components/ResultCard"
import RecentScans from "@/components/RecentScans"
import UrlScanner from "@/components/UrlScanner"

export default function Dashboard() {

  const [result, setResult] = useState({
    result: "No result yet",
    confidence: 0,
    reason: "Scan a message to see result"
  })

  const [history, setHistory] = useState<string[]>([])

  const handleResult = (data: any, message: string) => {

    setResult(data)

    setHistory(prev => [
      `${message} → ${data.result}`,
      ...prev
    ])

  }

  return (

    <div className="flex min-h-screen bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a] text-white">

      <Sidebar />

      <div className="flex-1 p-10 max-w-[1200px] mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          🛡 Scam Detector Dashboard
        </h1>

        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <StatsCard title="Total Scans" value="124" />
          <StatsCard title="Scams Detected" value="32" />
          <StatsCard title="Safe Messages" value="92" />

        </div>

        <div className="bg-slate-900/60 backdrop-blur border border-slate-800 rounded-xl p-6 mb-6">
          <ScanBox setResult={handleResult} />
        </div>

        <div className="bg-slate-900/60 backdrop-blur border border-slate-800 rounded-xl p-6 mb-6">
          <ResultCard
            result={result.result}
            confidence={result.confidence}
            reason={result.reason}
          />
        </div>

        <div className="bg-slate-900/60 backdrop-blur border border-slate-800 rounded-xl p-6 mb-6">
          <UrlScanner />
        </div>

        <div className="bg-slate-900/60 backdrop-blur border border-slate-800 rounded-xl p-6">
          <RecentScans scans={history} />
        </div>

      </div>

    </div>

  )

}