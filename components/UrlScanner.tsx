"use client"

import { useState } from "react"

export default function UrlScanner(){

const [url,setUrl]=useState("")
const [result,setResult]=useState("")

function scan(){

let risk=0

if(url.includes("bit.ly") || url.includes("tinyurl")){
risk=70
}

if(url.includes("http")){
risk+=20
}

if(risk>50){
setResult("🚨 High Risk Phishing URL")
}else{
setResult("✅ Safe URL")
}

}

return(

<div className="mt-6">

<h2 className="text-lg mb-3">🔗 URL Scam Scanner</h2>

<input
value={url}
onChange={(e)=>setUrl(e.target.value)}
placeholder="Paste suspicious URL..."
className="w-full p-3 bg-black border border-gray-700 rounded mb-3"
/>

<button
onClick={scan}
className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded"
>

Scan URL

</button>

{result && (
<p className="mt-3 text-yellow-300">
{result}
</p>
)}

</div>

)

}