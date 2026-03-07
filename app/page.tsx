"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {

const [message,setMessage] = useState("");
const [result,setResult] = useState<any>(null);
const [loading,setLoading] = useState(false);
const [history,setHistory] = useState<string[]>([]);

function analyze(){

if(!message) return;

setLoading(true);

setTimeout(()=>{

let risk = 0;
let reasons:string[] = [];
let explanation = "";

const text = message.toLowerCase();

/* OTP */
if(text.includes("otp")){
risk += 40;
reasons.push("OTP request detected");
}

/* Verification */
if(text.includes("verify") || text.includes("verification")){
risk += 25;
reasons.push("Verification request detected");
}

/* Urgency */
if(text.includes("urgent") || text.includes("immediately")){
risk += 20;
reasons.push("Urgent language used");
}

/* Suspicious link */
if(text.includes("http") || text.includes("bit.ly")){
risk += 30;
reasons.push("Suspicious link detected");
}

/* Bank / payment */
if(text.includes("bank") || text.includes("payment")){
risk += 20;
reasons.push("Financial request detected");
}

/* Lottery scam detection 1 */
if (
  text.includes("lottery") ||
  text.includes("won") ||
  text.includes("winner") ||
  text.includes("prize")
) {
  risk += 40;
  reasons.push("Lottery scam pattern detected");
}

/* Fee / pay scam */
if(text.includes("fee") || text.includes("pay")){
risk += 25;
reasons.push("Suspicious payment request");
}

let status = "Safe Message";

if(risk >= 40) status = "⚠ Suspicious Message";
if(risk >= 70) status = "🚨 High Risk Scam";

if(risk >= 40){

explanation =
"This message appears suspicious because it contains common scam indicators such as OTP requests, lottery claims, urgent language, links, or payment requests. Legitimate companies usually do not ask for sensitive data or fees via random messages.";

}

if (risk > 100) {
risk = 100;
}

setResult({
status,
risk,
reasons,
explanation
});

setHistory(prev => [
`${message} → ${status}`,
...prev.slice(0,4)
]);

setLoading(false);

},1000);

}

function reset(){
setResult(null);
setMessage("");
}

function shareResult(){

const text = `Scam Check Result 🚨

Message: ${message}

Result: ${result?.status}
Risk Score: ${result?.risk}%

Checked using Scam Shield AI`;

if(navigator.share){

navigator.share({
title:"Scam Result",
text:text
});

}else{

navigator.clipboard.writeText(text);
alert("Result copied. Share anywhere.");

}

}

function copyResult(){

const text = `Message: ${message}

Result: ${result?.status}
Risk Score: ${result?.risk}%`;

navigator.clipboard.writeText(text);
alert("Result copied");

}

return(

<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#0f172a] text-white">

<div className="w-[520px] bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">

<h1 className="text-3xl font-bold text-center mb-2">
🚨 Scam Shield AI
</h1>

<p className="text-center text-gray-300 mb-6">
AI Cyber Security Tool
</p>

<textarea
placeholder="Paste suspicious message..."
className="w-full p-4 rounded-lg bg-black border border-gray-700 mb-4"
value={message}
onChange={(e)=>setMessage(e.target.value)}
/>

<button
onClick={analyze}
className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 transition mb-6"
>

{loading ? "Analyzing..." : "Analyze Message"}

</button>

<div className="grid grid-cols-3 gap-3 mb-6">

<Link href="/dashboard">
<button className="w-full py-2 rounded-lg bg-indigo-500 hover:scale-105 transition">
Dashboard
</button>
</Link>

<Link href="/url-scanner">
<button className="w-full py-2 rounded-lg bg-purple-500 hover:scale-105 transition">
URL Scanner
</button>
</Link>

<Link href="/scan-image">
<button className="w-full py-2 rounded-lg bg-pink-500 hover:scale-105 transition">
Image Scan
</button>
</Link>

</div>

{result &&(

<div className="bg-white/10 border border-white/20 rounded-xl p-6">

<h2 className="text-xl font-semibold mb-3">
{result.status}
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

<p className="text-sm mb-2">
Detected indicators:
</p>

<ul className="text-sm text-yellow-300 list-disc ml-5">

{result.reasons.map((r:string,i:number)=>(
<li key={i}>{r}</li>
))}

</ul>

<p className="text-gray-300 text-sm mt-4">
💡 {result.explanation}
</p>

<button
onClick={shareResult}
className="w-full mt-5 py-3 rounded-lg bg-green-500 hover:scale-105 transition"
>
Share Result
</button>

<button
onClick={copyResult}
className="w-full mt-3 py-3 rounded-lg bg-gray-600 hover:scale-105 transition"
>
Copy Result
</button>

<button
onClick={reset}
className="w-full mt-3 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 hover:scale-105 transition"
>
Scan Another Message
</button>

</div>

)}

{history.length>0 &&(

<div className="mt-6 bg-white/10 border border-white/20 rounded-xl p-4">

<h3 className="text-sm mb-2">
Recent Scans
</h3>

<ul className="text-xs text-gray-300 space-y-1">

{history.map((h,i)=>(
<li key={i}>{h}</li>
))}

</ul>

</div>

)}

</div>

</div>

)

}