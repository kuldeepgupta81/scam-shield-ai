"use client"

import { LayoutDashboard, ScanLine, Link, History, Settings } from "lucide-react"

export default function Sidebar() {

  const menu = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Scan Message", icon: ScanLine },
    { name: "URL Scanner", icon: Link },
    { name: "History", icon: History },
    { name: "Settings", icon: Settings },
  ]

  return (
    <div className="w-[250px] bg-[#020617] border-r border-slate-800 p-6">

      <h1 className="text-xl font-bold mb-10 text-white">
        Scam Detector AI
      </h1>

      <div className="space-y-4">

        {menu.map((item, i) => {

          const Icon = item.icon

          return (
            <div
              key={i}
              className="flex items-center gap-3 text-gray-400 hover:text-white hover:bg-slate-800 p-3 rounded-lg cursor-pointer transition"
            >
              <Icon size={18} />
              {item.name}
            </div>
          )

        })}

      </div>

    </div>
  )
}