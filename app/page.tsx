"use client"

import { useState } from "react"

export default function Home() {

const [message,setMessage]=useState("")
const [result,setResult]=useState<any>(null)

function analyze(){

if(!message) return

let risk=20
let reasons=[]

if(message.toLowerCase().includes("otp")){
risk+=30
reasons.push("OTP related content")
}

if(message.toLowerCase().includes("verify")){
risk+=20
reasons.push("Verification request")
}

if(message.toLowerCase().includes("urgent")){
risk+=20
reasons.push("Urgency pattern detected")
}

if(risk>60){
setResult({
status:"Suspicious Message",
risk:risk,
reasons
})
}else{
setResult({
status:"Safe Message",
risk:risk,
reasons
})
}

}

return(

<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#0f172a] text-white">

<div className="w-[500px] bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">

<h1 className="text-3xl font-bold text-center mb-2">
🚨 Scam Detector AI
</h1>

<p className="text-center text-gray-300 mb-6">
AI-powered scam detection tool
</p>

<textarea
placeholder="Paste suspicious message..."
className="w-full p-4 rounded-lg bg-black text-white border border-gray-700 mb-4"
value={message}
onChange={(e)=>setMessage(e.target.value)}
/>

<button
onClick={analyze}
className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 transition mb-6"
>
Analyze Message
</button>

{result && (

<div className="bg-white/10 border border-white/20 rounded-xl p-6">

<h2 className="text-xl font-semibold mb-2">
⚠ {result.status}
</h2>

<div className="w-full bg-gray-700 rounded-full h-3 mb-3">

<div
className="bg-yellow-400 h-3 rounded-full"
style={{width:`${result.risk}%`}}
/>

</div>

<p className="text-sm mb-3">
Risk Score: {result.risk}%
</p>

<p className="text-gray-300 text-sm mb-3">
AI analyzed message patterns:
</p>

<ul className="text-sm text-yellow-300 list-disc ml-5">

{result.reasons.map((r:any,i:number)=>(
<li key={i}>{r}</li>
))}

</ul>

<button className="w-full mt-5 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500">
Scan Another Message
</button>

</div>

)}

</div>

</div>

)

}